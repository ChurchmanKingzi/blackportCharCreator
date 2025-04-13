// classSpellsHandler.js - Funktionalität für klassenspezifische Zauber-Slots

document.addEventListener('DOMContentLoaded', function() {
    // Referenzen auf DOM-Elemente
    const classSelect = document.getElementById('class');
    const secondClassSelect = document.getElementById('second-class');
    const spellSlotsContainer = document.getElementById('spell-slots-container');
    const spellSlotsInfo = document.getElementById('spell-slots-info');
    
    // Globale Variablen für Klassen-Zauber-Slots
    window.classSpellSlots = [];
    
    // Klassen und ihre speziellen Zauber
    const classSpells = {
        'illusionist': {
            id: 'illusion-erschaffen',
            name: 'Illusion erschaffen',
            level: 1,
            magieschule: 'magiekunst',
            mpKosten: 10,
            beschreibung: 'Erzeugt eine bist zu 1x1x2 Meter große optische Illusion, die absolut alles darstellen kann, was du dir vorstellst. Die Illusion kann halbtransparent oder komplett opak sein und hält bis zu eine Stunde. Die Dauer kann beliebig erhöht werden, kostet aber pro zusätzlicher Stunde wieder 10 MP. Du kannst die Illusion auch so einstellen, dass nur diejenigen sie sehen können, die von Magie wissen. Die Illusion kann jederzeit frühzeitig aufgehoben oder verändert werden. Solange du deine Augen geschlossen hältst und die Illusion Augen hat, kannst du durch ihre Augen sehen und sie fernsteuern. Sie kann keine Geräusche verursachen und ist rein optisch; man kann einfach durch sie hindurchgehen.'
        },
        'nekromant': {
            id: 'auferweckung',
            name: 'Auferweckung',
            level: 1,
            magieschule: 'beschwoerung',
            mpKosten: 20,
            beschreibung: 'Erweckt eine Leiche, die du berührst, als Untoten wieder. Die Kampfwerte der Leiche variieren je nach Beschaffenheit (Zustand, Spezies, Größe usw.) stark. Der Untote gehorcht dir aufs Wort, hat aber keinerlei Intelligenz. Er kann nicht sprechen, hat keine Erinnerung an sein altes Leben, kann keine Zauber wirken usw. Für jeden Untoten, den du kontrollierst, sind deine maximalen MP um 10 reduziert. Diese Reduzierung wird aufgehoben, sobald ein Untoter vernichtet wird. Eine "gefallene" Leiche kann erneut erweckt werden, sofern ihr Zustand es erlaubt.'
        },
        'paladin': {
            id: 'lichtfessel',
            name: 'Lichtfessel',
            level: 1,
            magieschule: 'beschwoerung',
            mpKosten: 0,
            beschreibung: 'Erzeugt eine dicke Kette aus reinem Licht zwischen zwei Zielen und/oder Objekten in Sichtweite. Die Kette kann bis zu 10 Meter lang sein und ist hart und fest wie Stahl. Du musst dich aktiv konzentrieren, um die Kette aufrechtzuerhalten. Wenn ein Ziel versucht, auszubrechen, würfelst du eine MA-Probe und das Ziel eine KÖ-Probe und der höhere Wurf gewinnt. Ein Versuch, auszubrechen, kostet eine Aktion.'
        },
        'pyromant': {
            id: 'feuerball',
            name: 'Feuerball',
            level: 1,
            magieschule: 'zerstoerung',
            mpKosten: 6,
            beschreibung: 'Schleudert einen Feuerball auf ein Ziel. Der Feuerball detoniert bei Kontakt und trifft alle Ziele in einem 3x3-Meter-Gebiet für (ZK+4)W6 Schaden. Kann so weit geschossen werden, wie du gucken kannst, große Distanzen erschweren aber exponentiell die GENA-Probe.'
        },
        'technomague': {
            id: 'poltergeist',
            name: 'Poltergeist',
            level: 1,
            magieschule: 'magiekunst',
            mpKosten: 2,
            beschreibung: 'Erweckt einen Gegenstand zum Leben. Während du den Zauber wirkst, gibst du dem Gegenstand einen simplen Befehl (maximal ein Satz). Sobald der Gegenstand zum Leben erweckt ist, folgt er deinem Befehl mit ganzer Kraft. Er hat 1 KP und wird wieder leblos, wenn er Schaden nimmt oder deinen Befehl vollständig ausgeführt hat. Du kannst maximal drei Gegenstände zur Zeit zum Leben erweckt haben, den Effekt aber jederzeit abbrechen, wenn du andere erwecken willst. Gegebene Befehle müssen ein klares Ziel/einen klaren Endpunkt haben, du kannst einem Gegenstand nicht befehlen "dir zu dienen".'
        }
    };
    
    // Flag für laufende Aktualisierung, um Rekursion zu vermeiden
    let isUpdating = false;
    
    // Wir erstellen auch eine Version des classSpells Objekts für spellService
    // Dies ermöglicht das Abrufen durch getZauberById
    initializeSpellService();
    
    // Event-Listener für Klassenänderungen
    if (classSelect) {
        classSelect.addEventListener('change', function() {
            if (!isUpdating) {
                checkClassSpells();
            }
        });
    }
    
    // Bei Doppelklasse auch die zweite Klasse überwachen
    if (secondClassSelect) {
        secondClassSelect.addEventListener('change', function() {
            if (!isUpdating) {
                checkClassSpells();
            }
        });
    }
    
    // Abgeschwächter Observer für Änderungen am Zauberbuch
    setupSpellbookObserver();
    
    // Initial prüfen, ob eine Klasse mit speziellem Zauber bereits ausgewählt ist
    setTimeout(checkClassSpells, 500);
    
    /**
     * Fügt die Klassen-Zauber dem spellService hinzu, falls sie noch nicht existieren
     */
    function initializeSpellService() {
        // Sicherstellen, dass der spellService verfügbar ist
        if (typeof spellService === 'undefined' || !spellService.getAllZauber) {
            console.warn('spellService nicht gefunden. Klassen-Zauber werden nicht initialisiert.');
            return;
        }
        
        // Überprüfen, ob die Zauber bereits existieren
        const allSpells = spellService.getAllZauber();
        
        // Für jede Klasse den speziellen Zauber hinzufügen, falls noch nicht vorhanden
        for (const className in classSpells) {
            const classSpell = classSpells[className];
            
            // Prüfen, ob dieser Zauber bereits im Service vorhanden ist
            const existingSpell = spellService.getZauberById(classSpell.id);
            
            if (!existingSpell) {
                // Den Zauber zum Service hinzufügen (falls möglich)
                if (Array.isArray(allSpells)) {
                    allSpells.push(classSpell);
                }
            }
        }
    }
    
    /**
     * Richtet den MutationObserver für Änderungen im Zauberbuch ein
     * mit verbesserter Logik zur Vermeidung von Duplikaten
     */
    function setupSpellbookObserver() {
        // Prüfen, ob der Container existiert
        if (!spellSlotsContainer) {
            console.warn('Zauberbuch-Container nicht gefunden. Klassen-Zauber-Handler wird nicht vollständig initialisiert.');
            return;
        }
        
        // Observer für Änderungen im Zauberbuch
        const observer = new MutationObserver(function(mutations) {
            // Nur relevant, wenn Slots hinzugefügt oder entfernt wurden
            // und wenn keine Aktualisierung bereits läuft
            if (isUpdating) return;
            
            const relevantMutation = mutations.some(mutation => 
                mutation.type === 'childList' && 
                (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)
            );
            
            if (relevantMutation) {
                // Verzögern, um sicherzustellen, dass alle DOM-Änderungen abgeschlossen sind
                setTimeout(() => {
                    // Prüfen, ob Klassen-Zauber dupliziert wurden
                    checkForDuplicateClassSpells();
                }, 50);
            }
        });
        
        // Beobachte alle Änderungen im Zauberbuch-Container
        observer.observe(spellSlotsContainer, { 
            childList: true,     // Beobachte hinzugefügte/entfernte Kinder
            subtree: true       // Auch alle Nachkommen beobachten
        });
    }

    /**
    * Prüft, ob Klassen-Zauber dupliziert wurden und entfernt Duplikate
    * Muss am Ende der setupSpellbookObserver-Funktion in classSpellsHandler.js hinzugefügt werden
    */
    function checkForDuplicateClassSpells() {
        // Alle Zauber-Slots erfassen
        const allSpellSlots = document.querySelectorAll('.spell-slot');
        
        // Klassen-Zauber IDs und deren Slots erfassen
        const classSpellIds = new Set();
        const classSpellSlots = Array.from(document.querySelectorAll('.class-spell-slot'));
        const duplicateSlots = [];
        
        // Erst alle Klassen-Zauber-IDs sammeln
        classSpellSlots.forEach(slot => {
            const spellSelect = slot.querySelector('.spell-select');
            if (spellSelect && spellSelect.value) {
                classSpellIds.add(spellSelect.value);
            }
        });
        
        // Dann reguläre Slots prüfen, ob sie Klassen-Zauber enthalten
        allSpellSlots.forEach(slot => {
            // Nur reguläre Slots überprüfen (keine Klassen-Slots)
            if (!slot.classList.contains('class-spell-slot')) {
                const spellSelect = slot.querySelector('.spell-select');
                if (spellSelect && spellSelect.value && classSpellIds.has(spellSelect.value)) {
                    // Dieser reguläre Slot enthält einen Klassen-Zauber - als Duplikat markieren
                    duplicateSlots.push(slot);
                }
            }
        });
        
        // Duplikate entfernen oder zurücksetzen
        if (duplicateSlots.length > 0) {
            console.log('Duplikate gefunden und werden entfernt:', duplicateSlots.length);
            
            duplicateSlots.forEach(slot => {
                const spellSelect = slot.querySelector('.spell-select');
                if (spellSelect) {
                    // Auswahl zurücksetzen statt den Slot zu entfernen
                    spellSelect.value = '';
                    
                    // Change-Event auslösen, um die Anzeige zu aktualisieren
                    const event = new Event('change', { bubbles: true });
                    spellSelect.dispatchEvent(event);
                }
            });
            
            // Zauber-Slots Info aktualisieren
            updateSpellSlotsInfo();
        }
    }
    
    /**
     * Prüft, ob Klassen mit speziellen Zaubern ausgewählt sind
     */
    function checkClassSpells() {
        // Verhindert rekursive Aufrufe während einer Aktualisierung
        if (isUpdating) return;
        isUpdating = true;
        
        try {
            // Aktuelle Klassen abrufen
            const classes = getSelectedClasses();
            
            // Die neuen Klassenzauber bestimmen, die wir haben sollten
            const desiredClassSpells = [];
            
            // Für jede ausgewählte Klasse, wenn sie einen Spezialzauber hat, hinzufügen
            classes.forEach(className => {
                if (classSpells[className]) {
                    const spellId = classSpells[className].id;
                    
                    // Zum Array hinzufügen, wenn dieser Zauber noch nicht vorhanden ist
                    if (!desiredClassSpells.some(item => item.spellId === spellId)) {
                        desiredClassSpells.push({
                            className: className,
                            spellId: spellId
                        });
                    }
                }
            });
            
            // Vergleiche mit den aktuellen Slots, um festzustellen, was hinzugefügt/entfernt werden muss
            const currentSpellSlots = Array.from(spellSlotsContainer.querySelectorAll('.class-spell-slot'));
            const currentSpellIds = currentSpellSlots.map(slot => {
                const select = slot.querySelector('.spell-select');
                return select ? select.value : null;
            }).filter(id => id);
            
            // Bestimme Zauber, die entfernt werden müssen (weil die Klasse nicht mehr ausgewählt ist)
            const toRemove = currentSpellSlots.filter(slot => {
                const select = slot.querySelector('.spell-select');
                const spellId = select ? select.value : null;
                return spellId && !desiredClassSpells.some(item => item.spellId === spellId);
            });
            
            // Bestimme Zauber, die hinzugefügt werden müssen (weil die Klasse neu ausgewählt wurde)
            const toAdd = desiredClassSpells.filter(item => 
                !currentSpellIds.includes(item.spellId)
            );
            
            // Entferne nicht mehr benötigte Slots
            toRemove.forEach(slot => {
                const select = slot.querySelector('.spell-select');
                const spellId = select ? select.value : null;
                if (spellId) {
                    // Finde die Klasse zu diesem Zauber
                    for (const className in classSpells) {
                        if (classSpells[className].id === spellId) {
                            // Benachrichtigung zeigen, dass der Zauber entfernt wurde
                            showClassSpellNotification(className, false);
                            break;
                        }
                    }
                }
                slot.remove();
            });
            
            // Füge neue Slots hinzu
            toAdd.forEach(item => {
                createClassSpellSlot(item.className, item.spellId);
                // Benachrichtigung zeigen, dass der Zauber hinzugefügt wurde
                showClassSpellNotification(item.className, true);
            });
            
            // Aktualisiere das globale classSpellSlots Array
            window.classSpellSlots = desiredClassSpells;
            
            // Nach Änderungen die Zauber-Slots Info aktualisieren
            updateSpellSlotsInfo();
            
        } finally {
            // Immer das Flag zurücksetzen, wenn wir fertig sind
            isUpdating = false;
        }
    }
    
    /**
     * Prüft, ob ein bestimmter Klassenzauber bereits existiert
     * @param {string} spellId - Die ID des zu prüfenden Zaubers
     * @returns {boolean} true, wenn der Zauber bereits existiert
     */
    function classSpellExists(spellId) {
        // Überprüfe, ob der Zauber bereits in einem Slot existiert
        const existingSlots = document.querySelectorAll('.class-spell-slot');
        for (let slot of existingSlots) {
            const spellSelect = slot.querySelector('.spell-select');
            if (spellSelect && spellSelect.value === spellId) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * Gibt die aktuell ausgewählten Klassen zurück
     * @returns {Array} Array mit den Klassen-IDs
     */
    function getSelectedClasses() {
        const classes = [];
        
        // Erste Klasse
        if (classSelect && classSelect.value) {
            classes.push(classSelect.value);
        }
        
        // Zweite Klasse (wenn sichtbar und ausgewählt)
        if (secondClassSelect && 
            secondClassSelect.value && 
            secondClassSelect.parentElement.style.display !== 'none') {
            classes.push(secondClassSelect.value);
        }
        
        return classes;
    }
    
    /**
     * Aktualisiert die Klassen-Zauber-Slots im Zauberbuch
     * Diese Funktion wird vereinfacht, da checkClassSpells die Hauptlogik übernimmt
     */
    function updateClassSpellSlots() {
        // Prüfen, ob Container existiert
        if (!spellSlotsContainer) return;
        
        // Aktualisiere die Zauber-Slots Info
        updateSpellSlotsInfo();
    }
    
    /**
     * Aktualisiert die Anzeige der verfügbaren Zauberslots
     */
    function updateSpellSlotsInfo() {
        const spellSlotsInfoElement = document.getElementById('spell-slots-info');
        if (!spellSlotsInfoElement) return;
    
        // Zähle die regulären Zauber-Slots
        const regularSlots = document.querySelectorAll('.spell-slot:not(.class-spell-slot)').length;
        
        // Zähle die Klassen-Zauber-Slots
        const classSlots = document.querySelectorAll('.class-spell-slot').length;
        
        // Aktualisiere die Info-Anzeige
        spellSlotsInfoElement.textContent = `(${regularSlots + classSlots} Plätze verfügbar)`;
    }
    
    /**
     * Erstellt einen Zauber-Slot für einen Klassen-Zauber
     * @param {string} className - Die Klassen-ID
     * @param {string} spellId - Die Zauber-ID
     */
    function createClassSpellSlot(className, spellId) {
        // Prüfen, ob der Zauber bereits existiert
        if (classSpellExists(spellId)) {
            return; // Nicht duplizieren
        }
        
        // Prüfen, ob der Zauber existiert
        const spell = classSpells[className];
        if (!spell) return;
        
        // Container für den Slot erstellen
        const slotContainer = document.createElement('div');
        slotContainer.className = 'spell-slot class-spell-slot';
        slotContainer.style.position = 'relative';
        slotContainer.style.borderLeft = '3px solid #4a90e2';
        slotContainer.style.backgroundColor = 'rgba(74, 144, 226, 0.05)';
        slotContainer.dataset.className = className; // Klassen-ID speichern
        slotContainer.dataset.spellId = spellId; // Zauber-ID speichern für einfachere Identifikation
        
        // Zusätzliches Dropdown und Info-Box erstellen
        const slotContent = `
            <div class="class-spell-badge" style="position: absolute; top: 8px; right: 8px; font-size: 12px; color: #4a90e2; font-weight: bold; display: none;">
                Klassenzauber
            </div>
            <div class="select-container" style="margin-bottom: 10px;">
                <select class="spell-select" disabled>
                    <option value="${spell.id}" selected>${spell.name} (Lvl ${spell.level}, ${spell.mpKosten} MP)</option>
                </select>
            </div>
            <div class="spell-info" style="background-color: #f0f7ff; border-left: 4px solid #4a90e2; padding: 10px; border-radius: 0 4px 4px 0;">
                <p><strong>${spell.name}</strong> | Level ${spell.level} | ${spell.mpKosten} MP | ${getReadableMagieschule(spell.magieschule)}</p>
                <p>${spell.beschreibung}</p>
            </div>
        `;
        
        slotContainer.innerHTML = slotContent;
        
        // Slot zum Zauberbuch hinzufügen (immer am Anfang)
        if (spellSlotsContainer.firstChild) {
            spellSlotsContainer.insertBefore(slotContainer, spellSlotsContainer.firstChild);
        } else {
            spellSlotsContainer.appendChild(slotContainer);
        }
    }
    
    /**
     * Wandelt einen Magieschule-Code in einen lesbaren Namen um
     * @param {string} code - Der Code der Magieschule
     * @returns {string} Der lesbare Name
     */
    function getReadableMagieschule(code) {
        switch (code) {
            case "zerstoerung": return "Zerstörung";
            case "unterstuetzung": return "Unterstützung";
            case "verfall": return "Verfall";
            case "magiekunst": return "Zauberkunst";
            case "beschwoerung": return "Beschwörung";
            default: return code;
        }
    }
    
    /**
     * Zeigt eine Benachrichtigung über hinzugefügte/entfernte Klassen-Zauber an
     * @param {string} className - Die Klassen-ID
     * @param {boolean} added - Ob der Zauber hinzugefügt (true) oder entfernt (false) wurde
     */
    function showClassSpellNotification(className, added) {
        // Klassenname in lesbarer Form
        let readableClassName = className.charAt(0).toUpperCase() + className.slice(1);
        
        // Zauber-Name abrufen
        const spellName = classSpells[className] ? classSpells[className].name : "Spezieller Zauber";
        
        // Erstelle ein Benachrichtigungselement
        const notification = document.createElement('div');
        notification.className = 'class-spell-notification';
        
        if (added) {
            notification.innerHTML = `
                <p><strong>${readableClassName}:</strong> Du erhältst den Zauber "${spellName}"!</p>
            `;
            notification.style.backgroundColor = 'rgba(74, 144, 226, 0.9)';
        } else {
            notification.innerHTML = `
                <p>Der Zauber "${spellName}" wurde entfernt, da du nicht mehr die Klasse ${readableClassName} hast.</p>
            `;
            notification.style.backgroundColor = 'rgba(244, 67, 54, 0.9)';
        }
        
        // Styling für die Benachrichtigung
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        notification.style.zIndex = '1000';
        notification.style.animation = 'fadeInOut 3s forwards';
        notification.style.maxWidth = '80%';
        notification.style.textAlign = 'center';
        
        // Animationsstil hinzufügen
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -20px); }
                10% { opacity: 1; transform: translate(-50%, 0); }
                80% { opacity: 1; transform: translate(-50%, 0); }
                100% { opacity: 0; transform: translate(-50%, -20px); }
            }
        `;
        document.head.appendChild(style);
        
        // Zum DOM hinzufügen
        document.body.appendChild(notification);
        
        // Nach 3 Sekunden automatisch entfernen
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }
    
    // Event-Listener für Aktualisierungen durch MA-Wert-Änderungen
    document.addEventListener('ma-value-changed', function(event) {
        // Nur die Zauber-Slots Info aktualisieren, um Duplikate zu vermeiden
        setTimeout(updateSpellSlotsInfo, 200);
    });
    
    // Öffentliche Methoden für andere Module
    window.updateClassSpellSlots = updateClassSpellSlots;
    window.checkClassSpells = checkClassSpells;
    window.classSpellExists = classSpellExists;
});
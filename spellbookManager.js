document.addEventListener('DOMContentLoaded', function() {
    // Referenzen auf DOM-Elemente
    const spellSlotsContainer = document.getElementById('spell-slots-container');
    const spellSlotsInfo = document.getElementById('spell-slots-info');
    const magicSchoolSelect = document.getElementById('magic-school');
    const advantageSelect = document.getElementById('advantage');
    const disadvantageSelect = document.getElementById('disadvantage');
    const classSelect = document.getElementById('class'); // Klassenauswahl hinzugefügt
    const secondClassSelect = document.getElementById('second-class'); // Zweite Klassenauswahl hinzugefügt
    
    // Überwachung der MA-Änderung und Vorteil/Nachteil-Auswahl
    const maInput = document.querySelector('.attribute-column:nth-child(4) h3:nth-of-type(2) .main-attribute-value');
    // CH-Input für die Scharlatan-Klasse
    const chInput = document.querySelector('.attribute-column:nth-child(3) .main-attribute-value');
    
    // Liste der klassenspezifischen Zauber-IDs, die wir aus regulären Dropdown-Menüs ausschließen
    const classSpellIds = [
        'illusion-erschaffen', // Illusionist
        'auferweckung',        // Nekromant
        'lichtfessel',         // Paladin
        'feuerball',           // Pyromant
        'poltergeist'          // Technomague
    ];
    
    // Überwachen der MA-Änderung - korrigiert Event-Listener
    if (maInput) {
        // Entfernen der alten Event-Listener, falls vorhanden
        maInput.removeEventListener('input', updateSpellSlots);
        maInput.removeEventListener('change', updateSpellSlots);
        maInput.removeEventListener('blur', updateSpellSlots);
        
        // Hinzufügen der neuen Event-Listener mit der verbesserten Funktion
        maInput.addEventListener('input', onMAValueChanged);
        maInput.addEventListener('change', onMAValueChanged);
        maInput.addEventListener('blur', onMAValueChanged);
    }

    // Überwachen der CH-Änderung für Scharlatan-Klasse
    if (chInput) {
        // Event-Listener für CH-Änderungen hinzufügen
        chInput.addEventListener('input', onAttributeValueChanged);
        chInput.addEventListener('change', onAttributeValueChanged);
        chInput.addEventListener('blur', onAttributeValueChanged);
    }
    
    // Überwachen der Vorteil/Nachteil-Änderung
    if (advantageSelect) {
        advantageSelect.addEventListener('change', function() {
            // Prüfen, ob es sich um eine klassenrelevante Änderung handelt
            const oldValue = this.dataset.oldValue || "";
            const newValue = this.value;
            const isClassRelated = (oldValue === 'doppelte klasse' || newValue === 'doppelte klasse');
            
            // Alten Wert für zukünftige Vergleiche speichern
            this.dataset.oldValue = newValue;
            
            if (isClassRelated && typeof window.checkClassSpells === 'function') {
                // Bei klassenrelevanten Änderungen (z.B. Doppelte Klasse) den checkClassSpells aufrufen
                window.checkClassSpells();
            } else {
                // Bei anderen Änderungen nur die regulären Slots aktualisieren,
                // ohne die Klassenzauber neu zu generieren
                updateSpellSlots(false);
            }
        });
    }
    
    if (disadvantageSelect) {
        disadvantageSelect.addEventListener('change', function() {
            // Nur reguläre Slots aktualisieren, ohne Klassenzauber neu zu generieren
            updateSpellSlots(false);
        });
    }

    // Überwachen der Klassenänderung
    if (classSelect) {
        classSelect.addEventListener('change', function() {
            // Bei Klassenänderungen reguläre Slots aktualisieren
            updateSpellSlots(false);
            // Zusätzlich den checkClassSpells aufrufen, wenn er existiert
            if (typeof window.checkClassSpells === 'function') {
                window.checkClassSpells();
            }
        });
    }

    // Überwachen der zweiten Klassenänderung
    if (secondClassSelect) {
        secondClassSelect.addEventListener('change', function() {
            // Bei Klassenänderungen reguläre Slots aktualisieren
            updateSpellSlots(false);
            // Zusätzlich den checkClassSpells aufrufen, wenn er existiert
            if (typeof window.checkClassSpells === 'function') {
                window.checkClassSpells();
            }
        });
    }
    
    // Überwachen der Magieschule-Änderung
    if (magicSchoolSelect) {
        magicSchoolSelect.addEventListener('change', function() {
            // Nur die Zauberkosten aktualisieren, ohne die Slots neu zu erstellen
            updateSpellCosts();
        });
    }
    
    // Initialisierung der Zauberslots
    updateSpellSlots(true);
    
    /**
     * Aktualisiert die Anzahl der Zauberslots basierend auf MA und Vorteilen
     * @param {boolean} updateClassSpells - Soll checkClassSpells aufgerufen werden?
     */
    function updateSpellSlots(updateClassSpells = false) {
        // MA-Wert auslesen
        const maValue = parseInt(maInput.value) || 1;
        // CH-Wert für Scharlatan auslesen
        const chValue = parseInt(chInput.value) || 1;
        
        // Prüfen, ob der Vorteil "Gelehrig" gewählt ist
        const hasGelehrigVorteil = advantageSelect && advantageSelect.value === 'gelehrig';
        
        // Berechne Anzahl der Slots: 2 + MA + (3 wenn Gelehrig)
        let totalSlots = 2 + maValue;
        if (hasGelehrigVorteil) {
            totalSlots += 3;
        }
        
        // Grimoire-Bonus hinzufügen, falls vorhanden
        const grimoireBonus = window.grimoireSlots || 0;
        totalSlots += grimoireBonus;
        
        // Bestehende Klassenzauber temporär speichern
        const classSpellSlots = Array.from(document.querySelectorAll('.class-spell-slot'));
        
        // Bestehende reguläre Zauber-Daten speichern
        const existingSpells = [];
        const spellSelects = document.querySelectorAll('.spell-slot:not(.class-spell-slot) .spell-select');
        
        spellSelects.forEach(select => {
            const spell = {
                id: select.value || ""
            };
            existingSpells.push(spell);
        });
        
        // Klassenzauber-Slots vorübergehend aus dem DOM entfernen, um sie zu bewahren
        classSpellSlots.forEach(slot => {
            if (slot.parentNode === spellSlotsContainer) {
                spellSlotsContainer.removeChild(slot);
            }
        });
        
        // Jetzt alle verbleibenden (regulären) Zauberslots entfernen
        while (spellSlotsContainer.firstChild) {
            spellSlotsContainer.removeChild(spellSlotsContainer.firstChild);
        }
        
        // Klassen-Zauber wieder zum Container hinzufügen (am Anfang)
        classSpellSlots.forEach(slot => {
            spellSlotsContainer.appendChild(slot);
        });
        
        // Reguläre Zauberslots neu erzeugen
        for (let i = 0; i < totalSlots; i++) {
            createSpellSlot(i, existingSpells[i] ? existingSpells[i].id : "");
        }
        
        // Slot-Info aktualisieren
        updateSpellSlotsInfo();
        
        // Zauberkosten aktualisieren wenn die Funktion existiert
        if (typeof updateSpellCosts === 'function') {
            updateSpellCosts();
        }

        // Ermitteln, ob der Charakter die Klasse "Scharlatan" hat
        // Wir müssen beide Klassenselects überprüfen
        const isScharlatan = classSelect.value === 'scharlaten' || secondClassSelect.value === 'scharlaten';

        // Zauberlevel-Einschränkungen aktualisieren - für Scharlatan mit CH statt MA
        if (isScharlatan) {
            updateSpellLevelRestrictions(chValue); // Für Scharlatan basierend auf CH
        } else {
            updateSpellLevelRestrictions(maValue); // Für normale Charaktere basierend auf MA
        }
        
        // Nur wenn explizit angefordert, checkClassSpells aufrufen
        if (updateClassSpells && typeof window.checkClassSpells === 'function') {
            window.checkClassSpells();
        }
        
        // Nach allen Änderungen prüfen, ob Klassen-Zauber dupliziert wurden
        if (typeof window.checkForDuplicateClassSpells === 'function') {
            setTimeout(window.checkForDuplicateClassSpells, 50);
        }
    }
    
    /**
     * Aktualisiert die Anzeige der verfügbaren Zauberslots
     */
    function updateSpellSlotsInfo() {
        if (!spellSlotsInfo) return;
    
        // Zähle alle Zauber-Slots (reguläre und Klassenzauber)
        const totalSlots = document.querySelectorAll('.spell-slot').length;
        
        // Aktualisiere die Info-Anzeige
        spellSlotsInfo.textContent = `(${totalSlots} Plätze verfügbar)`;
    }
    
    /**
     * Aktualisiert die Level-Einschränkungen für Zauber basierend auf dem MA-Wert
     * (oder CH-Wert bei Scharlatan)
     * @param {number} maxLevel - Der maximale Zauber-Level (MA oder CH bei Scharlatan)
     */
    function updateSpellLevelRestrictions(maxLevel) {
        // Prüfen, ob der Nachteil "Einarmig" gewählt ist
        const hasOneArmDisadvantage = disadvantageSelect.value === 'einarmig';
        
        // Alle Zauber-Selects durchgehen
        const spellSelects = document.querySelectorAll('.spell-select');
        spellSelects.forEach(select => {
            // Alle Optionen in diesem Select durchgehen
            Array.from(select.options).forEach(option => {
                // Nur relevante Optionen bearbeiten (mit Level-Attribut)
                if (option.dataset && option.dataset.level) {
                    const spellLevel = parseInt(option.dataset.level);
                    
                    // Bei "Einarmig" darf der Zauber-Level auch nicht gleich dem maxLevel sein
                    if ((hasOneArmDisadvantage && spellLevel >= maxLevel) || 
                        (!hasOneArmDisadvantage && spellLevel > maxLevel)) {
                        // Zauber ist zu hoch-levelig
                        option.disabled = true;
                        option.classList.add('spell-too-high-level');
                    } else {
                        // Zauber ist verfügbar
                        option.disabled = false;
                        option.classList.remove('spell-too-high-level');
                    }
                }
            });
            
            // Prüfen, ob die aktuelle Auswahl noch gültig ist
            if (select.value) {
                const selectedOption = select.options[select.selectedIndex];
                if (selectedOption && selectedOption.disabled) {
                    // Aktuell ausgewählter Zauber ist zu hoch-levelig - zurücksetzen
                    select.value = '';
                    
                    // Change-Event manuell auslösen
                    const event = new Event('change', { bubbles: true });
                    select.dispatchEvent(event);
                }
            }
        });
    }
    
    /**
     * Erstellt einen einzelnen Zauberslot
     * @param {number} index - Index des Zauberslots
     * @param {string} selectedSpellId - ID des vorausgewählten Zaubers (wenn vorhanden)
     */
    function createSpellSlot(index, selectedSpellId) {
        // Ermitteln, ob der Charakter die Klasse "Scharlatan" hat
        const isScharlatan = classSelect.value === 'scharlaten' || secondClassSelect.value === 'scharlaten';
        
        // MA oder CH-Wert abrufen für Level-Beschränkung
        const maxLevel = isScharlatan ? 
            (parseInt(chInput.value) || 1) : // Für Scharlatan CH verwenden
            (parseInt(maInput.value) || 1);  // Für alle anderen MA verwenden
        
        // Container für den Slot erstellen
        const slotContainer = document.createElement('div');
        slotContainer.className = 'spell-slot';
        
        // Dropdown für Zauberauswahl erstellen
        const spellSelect = document.createElement('select');
        spellSelect.className = 'spell-select';
        spellSelect.id = `spell-select-${index}`;
                
        // Prüfen, ob der Nachteil "Einarmig" gewählt ist
        const hasOneArmDisadvantage = disadvantageSelect.value === 'einarmig';
        
        // Platzhalter-Option
        const placeholderOption = document.createElement('option');
        placeholderOption.value = "";
        placeholderOption.textContent = `-- Zauber ${index + 1} wählen --`;
        spellSelect.appendChild(placeholderOption);
        
        // Zauber-Optionen hinzufügen, gruppiert nach Magieschulen
        // WICHTIG: Nur Zauber aus dem spellService verwenden und klassenbezogene Zauber filtern
        const allSpells = spellService.getAllZauber().filter(spell => !classSpellIds.includes(spell.id));
        
        // Sortiere Zauber nach Magieschulen in der gewünschten Reihenfolge
        const magieSchulen = ["zerstoerung", "unterstuetzung", "verfall", "magiekunst", "beschwoerung"];
        const schulFarben = {
            "zerstoerung": "red",
            "unterstuetzung": "gold", 
            "verfall": "purple",
            "magiekunst": "blue",
            "beschwoerung": "green"
        };
        const schulNamen = {
            "zerstoerung": "Zerstörung",
            "unterstuetzung": "Unterstützung", 
            "verfall": "Verfall",
            "magiekunst": "Zauberkunst",
            "beschwoerung": "Beschwörung"
        };
        
        // Gruppiere Zauber nach Schulen
        magieSchulen.forEach(schule => {
            // Erstelle einen Separator für die Schule
            const separator = document.createElement('option');
            separator.disabled = true;
            separator.value = "";
            separator.textContent = "═══ " + schulNamen[schule] + " ═══";
            separator.style.fontWeight = "bold";
            separator.style.backgroundColor = schulFarben[schule];
            separator.style.color = (schule === "unterstuetzung") ? "black" : "white"; // Bei gelb schwarzer Text
            spellSelect.appendChild(separator);
            
            // Füge alle Zauber der aktuellen Schule hinzu
            // Filtere die klassenbezogenen Zauber heraus
            const schulZauber = allSpells.filter(zauber => zauber.magieschule === schule);
            
            // Sortiere Zauber innerhalb der Schule nach Level und dann nach Namen
            schulZauber.sort((a, b) => {
                if (a.level !== b.level) {
                    return a.level - b.level;
                }
                return a.name.localeCompare(b.name);
            });
            
            schulZauber.forEach(spell => {
                const option = document.createElement('option');
                option.value = spell.id;
                option.textContent = `${spell.name} (Lvl ${spell.level}, ${spell.mpKosten} MP)`;
                option.dataset.spellId = spell.id;
                option.dataset.magieschule = spell.magieschule;
                option.dataset.level = spell.level;
                
                // Prüfen, ob Zauber-Level zu hoch ist (oder bei "Einarmig" auch, wenn er gleich ist)
                if ((hasOneArmDisadvantage && spell.level >= maxLevel) || (!hasOneArmDisadvantage && spell.level > maxLevel)) {
                    option.disabled = true;
                    option.classList.add('spell-too-high-level');
                }
                
                spellSelect.appendChild(option);
            });
        });
        
        // Vorausgewählten Zauber setzen, falls vorhanden
        if (selectedSpellId) {
            spellSelect.value = selectedSpellId;
            
            // Prüfen, ob der ausgewählte Zauber aufgrund des Level-Limits noch erlaubt ist
            const selectedSpell = allSpells.find(spell => spell.id === selectedSpellId);
            if (selectedSpell) {
                // Bei "Einarmig" darf der Zauber-Level auch nicht gleich dem maxLevel sein
                if ((hasOneArmDisadvantage && selectedSpell.level >= maxLevel) || 
                    (!hasOneArmDisadvantage && selectedSpell.level > maxLevel)) {
                    // Zauber ist zu hoch-levelig für aktuellen Level-Wert
                    spellSelect.classList.add('invalid-selection');
                    
                    // Infobox zeigen, dass dieser Zauber nicht mehr gewirkt werden kann
                    const spellInfoBox = document.createElement('div');
                    spellInfoBox.className = 'spell-warning';
                    
                    // Text anpassen basierend auf Nachteil und Klasse
                    let warningText = "";
                    if (hasOneArmDisadvantage) {
                        if (isScharlatan) {
                            warningText = `<p><strong>Warnung:</strong> Dieser Zauber erfordert einen CH-Wert von mindestens ${selectedSpell.level + 1} mit dem Nachteil "Einarmig".</p>`;
                        } else {
                            warningText = `<p><strong>Warnung:</strong> Dieser Zauber erfordert einen MA-Wert von mindestens ${selectedSpell.level + 1} mit dem Nachteil "Einarmig".</p>`;
                        }
                    } else {
                        if (isScharlatan) {
                            warningText = `<p><strong>Warnung:</strong> Dieser Zauber erfordert einen CH-Wert von mindestens ${selectedSpell.level}.</p>`;
                        } else {
                            warningText = `<p><strong>Warnung:</strong> Dieser Zauber erfordert einen MA-Wert von mindestens ${selectedSpell.level}.</p>`;
                        }
                    }
                    
                    spellInfoBox.innerHTML = warningText;
                    slotContainer.appendChild(spellInfoBox);
                }
            }
        }
        
        // Info-Box für Zauberdetails
        const spellInfoBox = document.createElement('div');
        spellInfoBox.className = 'spell-info';
        spellInfoBox.id = `spell-info-${index}`;
        
        // Event-Listener für Änderungen der Zauberauswahl
        spellSelect.addEventListener('change', function() {
            updateSpellInfo(index, this.value);
            
            // Entferne mögliche Warnungsklasse
            this.classList.remove('invalid-selection');
            
            // Entferne mögliche Warnungsbox
            const existingWarning = slotContainer.querySelector('.spell-warning');
            if (existingWarning) {
                slotContainer.removeChild(existingWarning);
            }
        });
        
        // Elemente zum Container hinzufügen
        slotContainer.appendChild(spellSelect);
        slotContainer.appendChild(spellInfoBox);
        
        // Container zum Hauptcontainer hinzufügen
        spellSlotsContainer.appendChild(slotContainer);
        
        // Initial die Zauberinfo aktualisieren, falls ein Zauber vorausgewählt ist
        if (selectedSpellId) {
            updateSpellInfo(index, selectedSpellId);
        }
    }
    
    /**
     * Aktualisiert die Anzeige der Zauberdetails
     * @param {number} index - Index des Zauberslots
     * @param {string} spellId - ID des ausgewählten Zaubers
     */
    function updateSpellInfo(index, spellId) {
        const infoBox = document.getElementById(`spell-info-${index}`);
        
        if (!spellId) {
            infoBox.innerHTML = '';
            return;
        }
        
        // Zauberdetails abrufen
        const spell = spellService.getZauberById(spellId);
        if (!spell) {
            infoBox.innerHTML = '<p>Zauber nicht gefunden.</p>';
            return;
        }
        
        // MP-Kosten basierend auf Vorteil/Nachteil und Magieschule berechnen
        let mpKosten = spell.mpKosten;
        let kostenstil = '';
        
        // Prüfen, ob primäre Magieschule ausgewählt ist
        const selectedSchule = magicSchoolSelect.value;
        const isMatchingSchool = selectedSchule === spell.magieschule;
        
        // Prüfen, ob Nachteil "Ineffizient" ausgewählt ist
        const hasIneffizientNachteil = disadvantageSelect.value === 'ineffizient';
        
        // MP-Kosten anpassen
        if (isMatchingSchool) {
            mpKosten = Math.ceil(mpKosten / 2); // Halbiert und aufgerundet
            kostenstil = 'class="mp-reduced"';
        }
        
        if (hasIneffizientNachteil) {
            mpKosten *= 2; // Verdoppelt
            if (!isMatchingSchool) {
                kostenstil = 'class="mp-increased"';
            }
        }
        
        // Magieschule in lesbarer Form
        let magieschuleText = "";
        switch (spell.magieschule) {
            case "zerstoerung": magieschuleText = "Zerstörung"; break;
            case "unterstuetzung": magieschuleText = "Unterstützung"; break;
            case "verfall": magieschuleText = "Verfall"; break;
            case "magiekunst": magieschuleText = "Zauberkunst"; break;
            case "beschwoerung": magieschuleText = "Beschwörung"; break;
            default: magieschuleText = spell.magieschule;
        }
        
        // HTML für die Zauberdetails
        infoBox.innerHTML = `
            <p><strong>${spell.name}</strong> | Level ${spell.level} | <span ${kostenstil}>${mpKosten} MP</span> | ${magieschuleText}</p>
            <p>${spell.beschreibung}</p>
        `;
    }
    
    /**
     * Aktualisiert die MP-Kosten aller angezeigten Zauber
     */
    function updateSpellCosts() {
        const spellSelects = document.querySelectorAll('.spell-select');
        
        spellSelects.forEach((select, index) => {
            if (select.value) {
                updateSpellInfo(index, select.value);
            }
        });
    }

    // Hilfsfunktion: Event-Handler für Änderungen am MA-Wert
    function onMAValueChanged() {
        // Zauberslots aktualisieren, ohne Klassenzauber neu zu generieren
        updateSpellSlots(false);
    }

    // Hilfsfunktion: Event-Handler für Änderungen am CH-Wert (für Scharlatan)
    function onAttributeValueChanged() {
        // Überprüfen, ob der Spieler die Scharlatan-Klasse hat
        const isScharlatan = classSelect.value === 'scharlaten' || secondClassSelect.value === 'scharlaten';
        
        // Zauberslots nur aktualisieren, wenn Scharlatan-Klasse ausgewählt ist
        if (isScharlatan) {
            // Aktualisieren ohne Klassenzauber neu zu generieren
            updateSpellSlots(false);
        }
    }

    // Die Funktionen explizit global verfügbar machen
    window.updateSpellSlots = updateSpellSlots;
    window.updateSpellCosts = updateSpellCosts;
    window.onMAValueChanged = onMAValueChanged;
    window.updateSpellLevelRestrictions = updateSpellLevelRestrictions;
});
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
        advantageSelect.addEventListener('change', updateSpellSlots);
    }
    
    if (disadvantageSelect) {
        disadvantageSelect.addEventListener('change', updateSpellSlots);
    }

    // Überwachen der Klassenänderung
    if (classSelect) {
        classSelect.addEventListener('change', updateSpellSlots);
    }

    // Überwachen der zweiten Klassenänderung
    if (secondClassSelect) {
        secondClassSelect.addEventListener('change', updateSpellSlots);
    }
    
    // Überwachen der Magieschule-Änderung
    if (magicSchoolSelect) {
        magicSchoolSelect.addEventListener('change', updateSpellCosts);
    }
    
    // Initialisierung der Zauberslots
    updateSpellSlots();
    
    /**
     * Aktualisiert die Anzahl der Zauberslots basierend auf MA und Vorteilen
     */
    function updateSpellSlots() {
        // MA-Wert auslesen
        const maValue = parseInt(maInput.value) || 1;
        // CH-Wert für Scharlatan auslesen
        const chValue = parseInt(chInput.value) || 1;
        
        // Prüfen, ob der Vorteil "Gelehrig" gewählt ist
        const advantageSelect = document.getElementById('advantage');
        const hasGelehrigVorteil = advantageSelect && advantageSelect.value === 'gelehrig';
        
        // Berechne Anzahl der Slots: 2 + MA + (3 wenn Gelehrig)
        let totalSlots = 2 + maValue;
        if (hasGelehrigVorteil) {
            totalSlots += 3;
        }
        
        // Grimoire-Bonus hinzufügen, falls vorhanden
        const grimoireBonus = window.grimoireSlots || 0;
        totalSlots += grimoireBonus;
        
        // Bestehende Zauber speichern (ohne Klassenzauber)
        const existingSpells = [];
        const spellSelects = document.querySelectorAll('.spell-slot:not(.class-spell-slot) .spell-select');
        
        spellSelects.forEach(select => {
            const spell = {
                id: select.value || ""
            };
            existingSpells.push(spell);
        });
        
        // Anzahl vorhandener Klassenzauber-Slots zählen, die beibehalten werden sollen
        const classSpellSlots = document.querySelectorAll('.class-spell-slot').length;
        
        // Speichere die vorhandenen Klassenzauber-Slots, um sie später wiederherzustellen
        const classSpellElements = Array.from(document.querySelectorAll('.class-spell-slot'));
        
        // Zauber-Container leeren
        spellSlotsContainer.innerHTML = '';
        
        // Info-Text aktualisieren (zeige Gesamtzahl der Slots inkl. Klassenzauber)
        spellSlotsInfo.textContent = `(${totalSlots + classSpellSlots} Plätze verfügbar)`;
        
        // WICHTIG: Falls Klassenzauber vorhanden, zuerst diese wiederherstellen
        classSpellElements.forEach(element => {
            spellSlotsContainer.appendChild(element.cloneNode(true));
        });
        
        // Reguläre Zauberslots erzeugen
        for (let i = 0; i < totalSlots; i++) {
            createSpellSlot(i, existingSpells[i] ? existingSpells[i].id : "");
        }
        
        // Jetzt erneut die Klassen-Zauber aktualisieren, um sicherzustellen, dass sie korrekt erscheinen
        if (typeof window.updateClassSpellSlots === 'function') {
            setTimeout(window.updateClassSpellSlots, 50);
        }
        
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
     * Speichert die aktuellen Zauberauswahlen
     * @returns {Array} Array mit den aktuellen Zauber-IDs
     */
    function getExistingSpellSelections() {
        const selections = [];
        const spellSelects = document.querySelectorAll('.spell-select');
        
        spellSelects.forEach(select => {
            selections.push(select.value || "");
        });
        
        return selections;
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
        // WICHTIG: Nur Zauber aus dem spellService verwenden
        const allSpells = spellService.getAllZauber();
        
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
            // SICHERSTELLEN, dass wir nur aus dem offiziellen spellService-Zauber nehmen
            const schulZauber = allSpells.filter(zauber => {
                // Prüfen, ob der Zauber wirklich aus dem spellService stammt
                // und nicht ein Klassen-Zauber ist
                return zauber.magieschule === schule && 
                    // Sicherstellen, dass der Zauber in der ursprünglichen spellService.zauber Liste ist
                    spellService.getZauberById(zauber.id) === zauber;
            });
            
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
        // Zauberslots aktualisieren
        updateSpellSlots();
        
        // Danach sicherstellen, dass Klassenzauber korrekt angezeigt werden
        if (typeof window.checkClassSpells === 'function') {
            setTimeout(window.checkClassSpells, 50);
        }
    }

    // Hilfsfunktion: Event-Handler für Änderungen am CH-Wert (für Scharlatan)
    function onAttributeValueChanged() {
        // Überprüfen, ob der Spieler die Scharlatan-Klasse hat
        const isScharlatan = classSelect.value === 'scharlaten' || secondClassSelect.value === 'scharlaten';
        
        // Zauberslots nur aktualisieren, wenn Scharlatan-Klasse ausgewählt ist
        if (isScharlatan) {
            updateSpellSlots();
            
            // Klassenzauber aktualisieren, falls nötig
            if (typeof window.checkClassSpells === 'function') {
                setTimeout(window.checkClassSpells, 50);
            }
        }
    }

    // Die Funktionen explizit global verfügbar machen
    window.updateSpellSlots = updateSpellSlots;
    window.updateSpellCosts = updateSpellCosts;
    window.onMAValueChanged = onMAValueChanged;
    window.updateSpellLevelRestrictions = updateSpellLevelRestrictions;
});
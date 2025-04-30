// randomizer.js - Funktionalität zur zufälligen Charaktererstellung

document.addEventListener('DOMContentLoaded', function() {
    // Referenz auf Charakter-Container und Head
    const characterContainer = document.querySelector('.character-container');
    const h1Element = characterContainer.querySelector('h1');

    // Button erstellen
    createRandomizeButton();

    /**
     * Erstellt den Randomize-Button und fügt ihn zur Seite hinzu
     */
    function createRandomizeButton() {
        const randomizeButton = document.createElement('button');
        randomizeButton.id = 'randomize-button';
        randomizeButton.textContent = 'Randomize!';
        randomizeButton.title = 'Zufälligen Charakter erstellen';
        
        // Styling für den Button
        randomizeButton.style.backgroundColor = '#8B0000';
        randomizeButton.style.color = 'white';
        randomizeButton.style.border = 'none';
        randomizeButton.style.padding = '10px 20px';
        randomizeButton.style.fontSize = '18px';
        randomizeButton.style.fontWeight = 'bold';
        randomizeButton.style.borderRadius = '5px';
        randomizeButton.style.cursor = 'pointer';
        randomizeButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
        randomizeButton.style.transition = 'all 0.2s ease';
        randomizeButton.style.position = 'absolute';
        randomizeButton.style.left = '20px';
        randomizeButton.style.top = '30px';
        
        // Hover-Effekte
        randomizeButton.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#A52A2A';
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
        });
        
        randomizeButton.addEventListener('mouseout', function() {
            this.style.backgroundColor = '#8B0000';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
        });
        
        // Klick-Effekt
        randomizeButton.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(1px)';
            this.style.boxShadow = '0 1px 3px rgba(0,0,0,0.3)';
        });
        
        randomizeButton.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
        });
        
        // Klick-Event-Handler
        randomizeButton.addEventListener('click', randomizeCharacter);
        
        // Button zur Seite hinzufügen
        if (h1Element) {
            h1Element.style.position = 'relative';
            characterContainer.insertBefore(randomizeButton, h1Element);
        }
    }

    /**
     * Hauptfunktion zur zufälligen Charaktererstellung
     */
    function randomizeCharacter() {
        // Setze Animation für den Button während der Verarbeitung
        const button = document.getElementById('randomize-button');
        if (button) {
            button.disabled = true;
            button.textContent = 'Generiere...';
            button.style.backgroundColor = '#666';
        }
    
        // Verzögerung, um UI-Updates zu ermöglichen
        setTimeout(() => {
            try {
                // 1. Klassenauswahl zurücksetzen (für den Fall einer neuen Randomisierung)
                resetSelections();
                
                // 2. Zufällige Klasse auswählen
                selectRandomClass();
                
                // 3. Vor- und Nachteile auswählen
                selectRandomAdvantageAndDisadvantage();
                
                // 4. Zufällige Magieschule auswählen
                selectRandomMagicSchool();
                
                // 5. Zweite Klasse oder Magieschule auswählen, wenn nötig
                handleSecondarySelections();
                
                // 6. Attribute und Fertigkeiten zufällig verteilen
                distributeRandomAttributes();
                
                // 7. Zufällige Items auswählen
                selectRandomItems();
                
                // 8. Zufällige Zauber auswählen
                selectRandomSpells();
                
                // 9. Zufälliges Alter bestimmen
                setRandomAge();
                
                // 10. Zufälligen Namen bestimmen
                generateRandomName();
                
                // 11. Kampfwerte neu berechnen
                updateCombatStats();
                
                // Button zurücksetzen
                if (button) {
                    button.disabled = false;
                    button.textContent = 'Randomize!';
                    button.style.backgroundColor = '#8B0000';
                }
                
                // Erfolgsmeldung anzeigen
                showNotification('Charakter erfolgreich zufällig erstellt!', true);
            } catch (error) {
                console.error('Fehler bei der Zufallsgenerierung:', error);
                
                // Button zurücksetzen
                if (button) {
                    button.disabled = false;
                    button.textContent = 'Randomize!';
                    button.style.backgroundColor = '#8B0000';
                }
                
                // Fehlermeldung anzeigen
                showNotification('Fehler bei der Zufallsgenerierung: ' + error.message, false);
            }
        }, 50);
    }

    /**
     * Setzt alle Selektionen zurück
     */
    function resetSelections() {
        // Selects zurücksetzen
        const selects = [
            document.getElementById('class'),
            document.getElementById('second-class'),
            document.getElementById('advantage'),
            document.getElementById('disadvantage'),
            document.getElementById('magic-school'),
            document.getElementById('second-magic-school')
        ];
        
        selects.forEach(select => {
            if (select) select.value = '';
        });
        
        // Event auslösen, um UI zu aktualisieren
        if (document.getElementById('class')) {
            triggerEvent(document.getElementById('class'), 'change');
        }
    }

    /**
     * Wählt eine zufällige Klasse aus
     */
    function selectRandomClass() {
        const classSelect = document.getElementById('class');
        if (!classSelect) return;
        
        // Alle Klassen abrufen
        const klassen = klasseService.getAllKlassen();
        if (!klassen || klassen.length === 0) {
            console.warn('Keine Klassen gefunden');
            return;
        }
        
        // Zufällige Klasse auswählen
        const randomIndex = getRandomInt(0, klassen.length - 1);
        const selectedClass = klassen[randomIndex];
        
        // Klasse auswählen
        classSelect.value = selectedClass.id;
        
        // Event auslösen, um UI-Elemente zu aktualisieren
        triggerEvent(classSelect, 'change');
        
        console.log('Zufällige Klasse ausgewählt:', selectedClass.name);
    }

    /**
     * Wählt zufällige Vor- und Nachteile aus
     * Berücksichtigt Kompatibilität: manche Vorteile schließen bestimmte Nachteile aus
     */
    function selectRandomAdvantageAndDisadvantage() {
        // Referenzen auf Selektboxen
        const advantageSelect = document.getElementById('advantage');
        const disadvantageSelect = document.getElementById('disadvantage');
        
        if (!advantageSelect || !disadvantageSelect) return;
        
        // 1. Zuerst Vorteil auswählen
        const vorteile = vorteilService.getAllVorteile();
        if (!vorteile || vorteile.length === 0) {
            console.warn('Keine Vorteile gefunden');
            return;
        }
        
        const randomAdvantageIndex = getRandomInt(0, vorteile.length - 1);
        const selectedAdvantage = vorteile[randomAdvantageIndex];
        
        advantageSelect.value = selectedAdvantage.id;
        triggerEvent(advantageSelect, 'change');
        
        console.log('Zufälliger Vorteil ausgewählt:', selectedAdvantage.name);
        
        // 2. Dann Nachteil auswählen, der mit dem Vorteil kompatibel ist
        const nachteile = nachteilService.getAllNachteile();
        if (!nachteile || nachteile.length === 0) {
            console.warn('Keine Nachteile gefunden');
            return;
        }
        
        // Filtere Nachteile basierend auf Kompatibilität
        let compatibleDisadvantages = nachteile;
        
        // Bekannte Inkompatibilitäten überprüfen
        // Beispiel: "Fantastische Eignung" ist nicht mit "Ineffizient" kompatibel
        if (selectedAdvantage.id === 'fantastische eignung') {
            compatibleDisadvantages = nachteile.filter(nachteil => nachteil.id !== 'ineffizient');
        }
        // "Magieresistent" ist nicht mit "Ineffizient" kompatibel
        else if (selectedAdvantage.id === 'magieresistent') {
            compatibleDisadvantages = nachteile.filter(nachteil => nachteil.id !== 'ineffizient');
        }
        // "Arkane Meisterschaft" ist nicht mit "Ineffizient" kompatibel
        else if (selectedAdvantage.id === 'arkane meisterschaft') {
            compatibleDisadvantages = nachteile.filter(nachteil => nachteil.id !== 'ineffizient');
        }
        // "Gelehrig" ist nicht mit "Einarmig" kompatibel
        else if (selectedAdvantage.id === 'gelehrig') {
            compatibleDisadvantages = nachteile.filter(nachteil => nachteil.id !== 'einarmig');
        }
        
        // Zufälligen kompatiblen Nachteil auswählen
        if (compatibleDisadvantages.length > 0) {
            // TEST-MODUS: Immer "Phobie" auswählen
            const testMode = false; // Setze auf false, um zum normalen Zufallsmodus zurückzukehren
            
            let selectedDisadvantage;
            
            if (testMode) {
                // Im Test-Modus "Phobie" suchen und auswählen
                selectedDisadvantage = compatibleDisadvantages.find(nachteil => nachteil.id === 'phobie');
                
                // Falls "Phobie" nicht in den kompatiblen Nachteilen ist, nimm einen zufälligen
                if (!selectedDisadvantage) {
                    const randomDisadvantageIndex = getRandomInt(0, compatibleDisadvantages.length - 1);
                    selectedDisadvantage = compatibleDisadvantages[randomDisadvantageIndex];
                    console.log('HINWEIS: Phobie war nicht in den kompatiblen Nachteilen!');
                } else {
                    console.log('TEST-MODUS AKTIV: Phobie wurde ausgewählt');
                }
            } else {
                // Normaler Zufallsmodus
                const randomDisadvantageIndex = getRandomInt(0, compatibleDisadvantages.length - 1);
                selectedDisadvantage = compatibleDisadvantages[randomDisadvantageIndex];
            }
            
            // Variable für die mögliche Phobie-Modifikation
            let phobieType = null;
            
            // NEUE FUNKTIONALITÄT: Bei "Phobie" eine zufällige Phobie hinzufügen
            if (selectedDisadvantage.id === 'phobie') {
                // Liste der möglichen Phobien
                const phobien = ['Feuer', 'Höhe', 'Schmerzen/Verletzungen', 'Dunkelheit', 'Beschworene Wesen', 'Blut'];
                
                // Zufällige Phobie auswählen
                const randomPhobieIndex = getRandomInt(0, phobien.length - 1);
                phobieType = phobien[randomPhobieIndex];
                
                console.log(`Zufällige Phobie ausgewählt: ${phobieType}`);
            }
            
            // Nachteil auswählen
            disadvantageSelect.value = selectedDisadvantage.id;
            triggerEvent(disadvantageSelect, 'change');
            
            console.log('Zufälliger Nachteil ausgewählt:', selectedDisadvantage.name);
            
            // NEUE FUNKTIONALITÄT: Wenn "Phobie" ausgewählt wurde, die UI-Anzeige aktualisieren
            if (selectedDisadvantage.id === 'phobie' && phobieType) {
                // Nach dem Event-Trigger, die Beschreibungsanzeige aktualisieren
                setTimeout(() => {
                    // Tooltip-Container finden
                    const tooltipContainer = document.getElementById('tooltip-container');
                    if (!tooltipContainer) return;
                    
                    // Nachteil-Tooltip finden
                    const disadvantageTooltip = tooltipContainer.querySelector('[data-for="disadvantage"]');
                    if (!disadvantageTooltip) return;
                    
                    // Beschreibungstext aktualisieren
                    const beschreibungElement = disadvantageTooltip.querySelector('p');
                    if (beschreibungElement) {
                        // Ersetze in der Beschreibung "von dir gewählte" mit der konkreten Phobie
                        const originalBeschreibung = selectedDisadvantage.beschreibung;
                        beschreibungElement.textContent = originalBeschreibung.replace(
                            'von dir gewählte', 
                            `vor ${phobieType}`
                        );
                    }
                    
                    // Name aktualisieren
                    const labelElement = disadvantageTooltip.querySelector('label');
                    if (labelElement) {
                        labelElement.textContent = `Phobie (${phobieType}):`;
                    }
                    
                    // Dropdowntext aktualisieren (falls vorhanden)
                    // Zuerst das normale Dropdown-Element
                    const customDropdowns = document.querySelectorAll('.custom-select-button');
                    customDropdowns.forEach(button => {
                        if (button.textContent.includes('Phobie')) {
                            button.textContent = `Phobie (${phobieType})`;
                        }
                    });
                    
                }, 100);
            }
        }
    }

    /**
     * Wählt eine zufällige Magieschule aus
     */
    function selectRandomMagicSchool() {
        const magicSchoolSelect = document.getElementById('magic-school');
        if (!magicSchoolSelect) return;
        
        // Alle Magieschulen abrufen
        const magieschulen = magieschuleService.getAllMagieschulen();
        if (!magieschulen || magieschulen.length === 0) {
            console.warn('Keine Magieschulen gefunden');
            return;
        }
        
        // Zufällige Magieschule auswählen
        const randomIndex = getRandomInt(0, magieschulen.length - 1);
        const selectedMagicSchool = magieschulen[randomIndex];
        
        // Magieschule auswählen
        magicSchoolSelect.value = selectedMagicSchool.id;
        
        // Event auslösen, um UI-Elemente zu aktualisieren
        triggerEvent(magicSchoolSelect, 'change');
        
        console.log('Zufällige Magieschule ausgewählt:', selectedMagicSchool.name);
    }

    /**
     * Behandelt sekundäre Auswahlen (zweite Klasse, zweite Magieschule)
     */
    function handleSecondarySelections() {
        // Prüfen ob zweite Klasse aktiv ist (Vorteil "Doppelte Klasse")
        const secondClassContainer = document.getElementById('second-class-container');
        if (secondClassContainer && secondClassContainer.style.display === 'block') {
            selectRandomSecondClass();
        }
        
        // Prüfen ob zweite Magieschule aktiv ist (Vorteil "Arkane Meisterschaft")
        const secondMagicSchoolContainer = document.getElementById('second-magic-school-container');
        if (secondMagicSchoolContainer && secondMagicSchoolContainer.style.display === 'block') {
            selectRandomSecondMagicSchool();
        }
    }

    /**
     * Wählt eine zufällige zweite Klasse aus, die nicht mit der ersten übereinstimmt
     */
    function selectRandomSecondClass() {
        const firstClassSelect = document.getElementById('class');
        const secondClassSelect = document.getElementById('second-class');
        
        if (!firstClassSelect || !secondClassSelect) return;
        
        const firstClassValue = firstClassSelect.value;
        
        // Alle Klassen abrufen
        const klassen = klasseService.getAllKlassen();
        if (!klassen || klassen.length <= 1) {
            console.warn('Nicht genug Klassen für eine zweite Auswahl');
            return;
        }
        
        // Klassen filtern, um die erste auszuschließen
        const availableClasses = klassen.filter(klasse => klasse.id !== firstClassValue);
        
        // Zufällige zweite Klasse auswählen
        const randomIndex = getRandomInt(0, availableClasses.length - 1);
        const selectedSecondClass = availableClasses[randomIndex];
        
        // Zweite Klasse auswählen
        secondClassSelect.value = selectedSecondClass.id;
        
        // Event auslösen, um UI-Elemente zu aktualisieren
        triggerEvent(secondClassSelect, 'change');
        
        console.log('Zufällige zweite Klasse ausgewählt:', selectedSecondClass.name);
    }

    /**
     * Wählt eine zufällige zweite Magieschule aus, die nicht mit der ersten übereinstimmt
     */
    function selectRandomSecondMagicSchool() {
        const firstMagicSchoolSelect = document.getElementById('magic-school');
        const secondMagicSchoolSelect = document.getElementById('second-magic-school');
        
        if (!firstMagicSchoolSelect || !secondMagicSchoolSelect) return;
        
        const firstMagicSchoolValue = firstMagicSchoolSelect.value;
        
        // Alle Magieschulen abrufen
        const magieschulen = magieschuleService.getAllMagieschulen();
        if (!magieschulen || magieschulen.length <= 1) {
            console.warn('Nicht genug Magieschulen für eine zweite Auswahl');
            return;
        }
        
        // Magieschulen filtern, um die erste auszuschließen
        const availableMagicSchools = magieschulen.filter(schule => schule.id !== firstMagicSchoolValue);
        
        // Zufällige zweite Magieschule auswählen
        const randomIndex = getRandomInt(0, availableMagicSchools.length - 1);
        const selectedSecondMagicSchool = availableMagicSchools[randomIndex];
        
        // Zweite Magieschule auswählen
        secondMagicSchoolSelect.value = selectedSecondMagicSchool.id;
        
        // Event auslösen, um UI-Elemente zu aktualisieren
        triggerEvent(secondMagicSchoolSelect, 'change');
        
        console.log('Zufällige zweite Magieschule ausgewählt:', selectedSecondMagicSchool.name);
    }

    /**
     * Verteilt Attribut- und Fertigkeitspunkte zufällig
     */
    function distributeRandomAttributes() {
        // Hauptattribute (KÖ, WI, CH, GL, MA) zufällig verteilen
        distributeMainAttributes();
        
        // Fertigkeiten zufällig verteilen
        distributeSkillPoints();
    }

    /**
     * Verteilt die Hauptattributspunkte zufällig
     */
    function distributeMainAttributes() {
        // Hauptattribut-Inputs abrufen
        const mainAttributeInputs = document.querySelectorAll('.main-attribute-value');
        if (!mainAttributeInputs || mainAttributeInputs.length === 0) return;
        
        // Konstanten für Attributgrenzen
        const MIN_MAIN_ATTRIBUTE = 1;
        const MAX_MAIN_ATTRIBUTE = 5;
        
        // Verfügbare Punkte ermitteln (15 ist der Standard, kann durch Vorteile geändert werden)
        const availablePointsElement = document.getElementById('available-points');
        let availablePoints = 15; // Standardwert
        
        if (availablePointsElement) {
            const pointsText = availablePointsElement.textContent;
            const match = pointsText.match(/(\d+)/);
            if (match) {
                availablePoints = parseInt(match[1]) + mainAttributeInputs.length; // +5, da jedes Attribut bereits 1 hat
            }
        }
        
        // Alle Attribute auf Minimum setzen
        mainAttributeInputs.forEach(input => {
            input.value = MIN_MAIN_ATTRIBUTE;
            triggerEvent(input, 'input');
        });
        
        // Verfügbare Punkte verteilen (wobei jedes Attribut bereits MIN_MAIN_ATTRIBUTE hat)
        let remainingPoints = availablePoints;
        
        // Array mit Indices der Attribute erstellen
        const attributeIndices = Array.from({ length: mainAttributeInputs.length }, (_, i) => i);
        
        // Random-Verteilung mit Gewichtung: wichtigere Attribute bekommen mehr Punkte
        // Im Durchschnitt sollten die ersten beiden Attribute (KÖ, WI) sowie MA mehr bekommen
        const weights = [3, 3, 2, 1, 3]; // Gewichtung für KÖ, WI, CH, GL, MA
        
        while (remainingPoints > 0) {
            // Gewichtete Auswahl eines Attributs
            const selectedIndex = getWeightedRandomIndex(attributeIndices, weights);
            const selectedInput = mainAttributeInputs[selectedIndex];
            
            // Aktueller Wert des ausgewählten Attributs
            const currentValue = parseInt(selectedInput.value);
            
            // Nur erhöhen, wenn noch nicht am Maximum
            if (currentValue < MAX_MAIN_ATTRIBUTE) {
                selectedInput.value = currentValue + 1;
                triggerEvent(selectedInput, 'input');
                remainingPoints--;
            }
            
            // Wenn das Attribut jetzt am Maximum ist, aus den Kandidaten entfernen
            if (parseInt(selectedInput.value) >= MAX_MAIN_ATTRIBUTE) {
                const indexPosition = attributeIndices.indexOf(selectedIndex);
                if (indexPosition > -1) {
                    attributeIndices.splice(indexPosition, 1);
                    weights.splice(indexPosition, 1);
                }
            }
            
            // Sicherheitsausstieg, falls keine Attribute mehr erhöht werden können
            if (attributeIndices.length === 0) break;
        }
        
        console.log('Hauptattribute zufällig verteilt');
    }

    /**
     * Verteilt die Fertigkeitspunkte zufällig
     */
    function distributeSkillPoints() {
        // Fertigkeits-Inputs abrufen
        const skillInputs = document.querySelectorAll('.attribute-value');
        if (!skillInputs || skillInputs.length === 0) return;
        
        // Konstanten für Fertigkeitsgrenzen
        const MIN_SKILL_VALUE = 0;
        const MAX_SKILL_VALUE = 5;
        
        // Verfügbare Punkte ermitteln (45 ist der Standard, kann durch Vorteile geändert werden)
        const availableSkillPointsElement = document.getElementById('available-skill-points');
        let availableSkillPoints = 45; // Standardwert
        
        if (availableSkillPointsElement) {
            const pointsText = availableSkillPointsElement.textContent;
            const match = pointsText.match(/(\d+)/);
            if (match) {
                availableSkillPoints = parseInt(match[1]);
            }
        }
        
        // Alle Fertigkeiten auf Minimum setzen
        skillInputs.forEach(input => {
            input.value = MIN_SKILL_VALUE;
            triggerEvent(input, 'input');
        });
        
        // Verfügbare Punkte verteilen
        let remainingPoints = availableSkillPoints;
        
        // Wichtige Fertigkeiten identifizieren (für Gewichtung)
        const importantSkills = [
            'Akrobatik', 'Ausweichen', 'Kampfsport', 'Nahkampf', 'Schießen', // Kampf
            'Erste Hilfe', 'Sinnesschärfe', 'Stärke', 'Widerstand', // Überleben
            'Magiewahrnehmung', 'Magieresistenz' // Magie
        ];
        
        // Alle Fertigkeits-Inputs durchsuchen und wichtige identifizieren
        const skillWeights = Array(skillInputs.length).fill(1); // Standard-Gewichtung
        
        skillInputs.forEach((input, index) => {
            // Überprüfe den Text im übergeordneten Element
            const parentText = input.closest('.attribute-item')?.textContent.trim() || '';
            
            // Höhere Gewichtung für wichtige Fertigkeiten
            for (const skill of importantSkills) {
                if (parentText.includes(skill)) {
                    skillWeights[index] = 3; // Dreifache Gewichtung für wichtige Fertigkeiten
                    break;
                }
            }
        });
        
        // Array mit Indices der Fertigkeiten erstellen
        const skillIndices = Array.from({ length: skillInputs.length }, (_, i) => i);
        
        // Zufällige Fertigkeiten auswählen und Punkte verteilen
        while (remainingPoints > 0 && skillIndices.length > 0) {
            // Gewichtete Auswahl einer Fertigkeit
            const selectedIndex = getWeightedRandomIndex(skillIndices, skillWeights);
            const selectedInput = skillInputs[selectedIndex];
            
            // Aktueller Wert der ausgewählten Fertigkeit
            const currentValue = parseInt(selectedInput.value);
            
            // Nur erhöhen, wenn noch nicht am Maximum
            if (currentValue < MAX_SKILL_VALUE) {
                // Zufällig 1-2 Punkte hinzufügen (max bis zum Limit)
                const pointsToAdd = Math.min(
                    getRandomInt(1, 2), 
                    MAX_SKILL_VALUE - currentValue,
                    remainingPoints
                );
                
                selectedInput.value = currentValue + pointsToAdd;
                triggerEvent(selectedInput, 'input');
                remainingPoints -= pointsToAdd;
            }
            
            // Wenn die Fertigkeit jetzt am Maximum ist, aus den Kandidaten entfernen
            if (parseInt(selectedInput.value) >= MAX_SKILL_VALUE) {
                const indexPosition = skillIndices.indexOf(selectedIndex);
                if (indexPosition > -1) {
                    skillIndices.splice(indexPosition, 1);
                    skillWeights.splice(indexPosition, 1);
                }
            }
            
            // Mit niedriger Wahrscheinlichkeit auch Fertigkeiten entfernen, die noch nicht am Maximum sind
            // Dies sorgt für eine bessere Verteilung (nicht alle Fertigkeiten bekommen Punkte)
            else if (Math.random() < 0.1) { // 10% Chance
                const indexPosition = skillIndices.indexOf(selectedIndex);
                if (indexPosition > -1) {
                    skillIndices.splice(indexPosition, 1);
                    skillWeights.splice(indexPosition, 1);
                }
            }
            
            // Sicherheitsausstieg, falls keine Fertigkeiten mehr erhöht werden können
            if (skillIndices.length === 0) break;
        }
        
        console.log('Fertigkeitspunkte zufällig verteilt');
    }

    /**
     * Wählt zufällige Items für das Inventar aus
     */
    function selectRandomItems() {
        // Alle Item-Selects im Inventar abrufen
        const itemSelects = document.querySelectorAll('.item-select');
        if (!itemSelects || itemSelects.length === 0) return;
        
        // Alle verfügbaren Items abrufen
        const allItems = itemService.getAllItems();
        if (!allItems || allItems.length === 0) {
            console.warn('Keine Items gefunden');
            return;
        }
        
        // Für jeweils ein Item auswählen (oder keins mit 20% Wahrscheinlichkeit)
        itemSelects.forEach(select => {
            
            // Zufälliges Item auswählen
            const randomIndex = getRandomInt(0, allItems.length - 1);
            const selectedItem = allItems[randomIndex];
            
            // Item auswählen
            select.value = selectedItem.id;
            
            // Event auslösen, um UI-Elemente zu aktualisieren
            triggerEvent(select, 'change');
        });
        
        console.log('Zufällige Items ausgewählt');
    }

    /**
     * Wählt zufällige Zauber für das Zauberbuch aus und stellt sicher, dass keine Slots leer bleiben
     */
    function selectRandomSpells() {
        // Alle Zauber-Selects im Zauberbuch abrufen (nur reguläre Slots, keine Klassenzauber)
        const spellSelects = document.querySelectorAll('.spell-slot:not(.class-spell-slot) .spell-select');
        if (!spellSelects || spellSelects.length === 0) {
            console.log('Keine Zauberslots gefunden');
            return;
        }
        
        // Aktuelle Magieschule(n) abrufen
        const primaryMagicSchool = document.getElementById('magic-school')?.value;
        const secondaryMagicSchool = document.getElementById('second-magic-school')?.value;
        
        // Alle verfügbaren Zauber abrufen
        let allSpells = spellService.getAllZauber();
        if (!allSpells || allSpells.length === 0) {
            console.warn('Keine Zauber gefunden');
            return;
        }
        
        // MA-Wert (oder CH für Scharlatan) für Level-Beschränkungen abrufen
        const maInput = document.querySelector('.attribute-column:nth-child(4) h3:nth-of-type(2) .main-attribute-value');
        const chInput = document.querySelector('.attribute-column:nth-child(3) .main-attribute-value');
        const classSelects = [document.getElementById('class'), document.getElementById('second-class')];
        
        const isScharlatan = classSelects.some(select => select && select.value === 'scharlaten');
        const maxLevel = isScharlatan ? 
            (parseInt(chInput?.value) || 1) : 
            (parseInt(maInput?.value) || 1);
        
        // Prüfen, ob der Nachteil "Einarmig" gewählt ist
        const hasOneArmDisadvantage = document.getElementById('disadvantage')?.value === 'einarmig';
        
        // Zauber nach Level filtern
        let availableSpells = allSpells.filter(spell => {
            // Bei "Einarmig" darf der Zauber-Level auch nicht gleich dem maxLevel sein
            return hasOneArmDisadvantage ? 
                spell.level < maxLevel : 
                spell.level <= maxLevel;
        });
        
        // Klassenzauber-IDs ausfiltern
        const classSpellIds = [
            'illusion-erschaffen', 'auferweckung', 'lichtfessel', 
            'feuerball', 'poltergeist'
        ];
        
        availableSpells = availableSpells.filter(spell => !classSpellIds.includes(spell.id));
        
        // Zauber der ausgewählten Magieschule(n) identifizieren
        const primarySchoolSpells = availableSpells.filter(spell => 
            spell.magieschule === primaryMagicSchool
        );
        
        const secondarySchoolSpells = secondaryMagicSchool ? 
            availableSpells.filter(spell => spell.magieschule === secondaryMagicSchool) : 
            [];
        
        // Vereinigte Liste der Zauber aus beiden Schulen
        const preferredSchoolSpells = [...primarySchoolSpells];
        secondarySchoolSpells.forEach(spell => {
            if (!preferredSchoolSpells.some(s => s.id === spell.id)) {
                preferredSchoolSpells.push(spell);
            }
        });
        
        // Andere Zauber (nicht aus den ausgewählten Schulen)
        const otherSpells = availableSpells.filter(spell => 
            spell.magieschule !== primaryMagicSchool && 
            (secondaryMagicSchool ? spell.magieschule !== secondaryMagicSchool : true)
        );
        
        // Verfügbare Slots zählen (ohne die bereits mit Klassenzaubern belegten)
        const availableSlots = Array.from(spellSelects).filter(select => !select.disabled);
        const totalAvailableSlots = availableSlots.length;
        
        // Zuerst alle Zauber-Selects zurücksetzen
        availableSlots.forEach(select => {
            select.value = '';
            triggerEvent(select, 'change');
        });
        
        // Wenn keine Slots verfügbar sind, gibt es nichts zu tun
        if (totalAvailableSlots === 0) {
            console.log('Keine freien Zauberslots verfunden');
            return;
        }
        
        // VERBESSERTE LOGIK: Sicherstellen, dass alle Slots gefüllt werden
        
        // 1. Mindestens die Hälfte der Slots (aufgerundet) mit Zaubern der bevorzugten Schulen füllen
        const minPreferredSlots = Math.ceil(totalAvailableSlots / 2);
        const preferredSlotsToFill = Math.min(minPreferredSlots, preferredSchoolSpells.length);
        
        // 2. Die restlichen Slots mit anderen Zaubern füllen
        const remainingSlotsToFill = totalAvailableSlots - preferredSlotsToFill;
        
        // 3. Wenn nicht genug "andere Zauber" verfügbar sind, mit bevorzugten Zaubern auffüllen
        let additionalPreferredSlots = 0;
        if (remainingSlotsToFill > otherSpells.length) {
            additionalPreferredSlots = Math.min(
                remainingSlotsToFill - otherSpells.length,
                Math.max(0, preferredSchoolSpells.length - preferredSlotsToFill)
            );
        }
        
        // 4. Wenn immer noch nicht genug Zauber verfügbar sind, Zauber wiederverwenden
        const totalSpellsNeeded = totalAvailableSlots;
        const totalSpellsAvailable = preferredSchoolSpells.length + otherSpells.length;
        const needDuplicates = totalSpellsNeeded > totalSpellsAvailable;
        
        // Erstelle einen Pool mit allen verfügbaren Zaubern
        let spellPool = [];
        
        // Zuerst bevorzugte Zauber hinzufügen (so viele wie benötigt)
        const totalPreferredNeeded = preferredSlotsToFill + additionalPreferredSlots;
        if (preferredSchoolSpells.length > 0) {
            // Wenn Duplikate benötigt werden, fülle den Pool mehrfach
            if (needDuplicates && totalPreferredNeeded > preferredSchoolSpells.length) {
                // Füge alle bevorzugten Zauber so oft hinzu, wie nötig
                while (spellPool.length < totalPreferredNeeded) {
                    spellPool = spellPool.concat([...preferredSchoolSpells]);
                }
                // Auf die exakte Anzahl trimmen
                spellPool = spellPool.slice(0, totalPreferredNeeded);
            } else {
                // Einfach zufällige bevorzugte Zauber ohne Duplikate wählen
                spellPool = shuffle(preferredSchoolSpells).slice(0, totalPreferredNeeded);
            }
        }
        
        // Dann andere Zauber hinzufügen, bis der Pool vollständig ist
        const otherSlotsNeeded = totalAvailableSlots - spellPool.length;
        if (otherSlotsNeeded > 0 && (otherSpells.length > 0 || needDuplicates)) {
            if (needDuplicates && otherSlotsNeeded > otherSpells.length) {
                // Füge alle anderen Zauber so oft hinzu, wie nötig
                let otherSpellPool = [];
                while (otherSpellPool.length < otherSlotsNeeded) {
                    otherSpellPool = otherSpellPool.concat([...otherSpells]);
                }
                // Auf die exakte Anzahl trimmen
                otherSpellPool = otherSpellPool.slice(0, otherSlotsNeeded);
                // Zum Haupt-Pool hinzufügen
                spellPool = spellPool.concat(otherSpellPool);
            } else {
                // Einfach zufällige andere Zauber ohne Duplikate wählen
                const selectedOtherSpells = shuffle(otherSpells).slice(0, otherSlotsNeeded);
                spellPool = spellPool.concat(selectedOtherSpells);
            }
        }
        
        // Wenn der Pool immer noch kleiner ist als benötigt, fülle ihn mit allen verfügbaren Zaubern auf
        if (spellPool.length < totalAvailableSlots) {
            // Alle Zauber für den absoluten Notfall
            const allAvailableSpells = [...availableSpells];
            while (spellPool.length < totalAvailableSlots) {
                // Mische alle Zauber und füge sie hinzu, bis genug da sind
                spellPool = spellPool.concat(shuffle(allAvailableSpells));
            }
            // Auf die exakte Anzahl trimmen
            spellPool = spellPool.slice(0, totalAvailableSlots);
        }
        
        // Mische den finalen Pool nochmal
        spellPool = shuffle(spellPool);
        
        // Setze die Zauber in die Slots
        availableSlots.forEach((select, index) => {
            if (index < spellPool.length) {
                select.value = spellPool[index].id;
                triggerEvent(select, 'change');
            }
        });
        
        console.log('Zufällige Zauber ausgewählt und alle Slots gefüllt');
    }

    /**
     * Mischt ein Array nach dem Fisher-Yates (Knuth) Algorithmus
     * @param {Array} array - Das zu mischende Array
     * @returns {Array} Das gemischte Array
     */
    function shuffle(array) {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }

    /**
     * Aktualisiert die Kampfwerte
     */
    function updateCombatStats() {
        // Falls eine spezielle Funktion für die Kampfwertberechnung verfügbar ist
        if (typeof window.updateCombatStats === 'function') {
            window.updateCombatStats();
        } else {
            // Alternativ: Triggere Events auf den Hauptattributen, um Neuberechnung zu erzwingen
            const mainAttributeInputs = document.querySelectorAll('.main-attribute-value');
            mainAttributeInputs.forEach(input => {
                triggerEvent(input, 'change');
            });
        }
        
        console.log('Kampfwerte aktualisiert');
    }

    /**
     * Zeigt eine Benachrichtigung an
     * @param {string} message - Die anzuzeigende Nachricht
     * @param {boolean} success - Ob es eine Erfolgs- oder Fehlermeldung ist
     */
    function showNotification(message, success) {
        // Erstelle ein Benachrichtigungselement
        const notification = document.createElement('div');
        notification.className = 'randomize-notification';
        notification.textContent = message;
        
        // Styling für die Benachrichtigung
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.backgroundColor = success ? 'rgba(76, 175, 80, 0.9)' : 'rgba(244, 67, 54, 0.9)';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        notification.style.zIndex = '1000';
        notification.style.animation = 'fadeInOut 3s forwards';
        
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

    // ====== Hilfsfunktionen ======

    /**
     * Erzeugt eine Zufallszahl zwischen min und max (inklusive)
     * @param {number} min - Untere Grenze (inklusive)
     * @param {number} max - Obere Grenze (inklusive)
     * @returns {number} Zufallszahl
     */
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Wählt einen zufälligen Index basierend auf Gewichtungen
     * @param {Array} indices - Array mit verfügbaren Indices
     * @param {Array} weights - Array mit Gewichtungen für jeden Index
     * @returns {number} Zufällig ausgewählter Index
     */
    function getWeightedRandomIndex(indices, weights) {
        // Wenn keine Gewichtungen gegeben sind oder nicht genügend Elemente vorhanden sind
        if (!weights || weights.length !== indices.length || indices.length === 0) {
            return indices[getRandomInt(0, indices.length - 1)];
        }
        
        // Summe aller Gewichtungen berechnen
        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
        
        // Zufallszahl zwischen 0 und der Gesamtgewichtung wählen
        let random = Math.random() * totalWeight;
        
        // Durch die Indices iterieren und den entsprechenden Index auswählen
        for (let i = 0; i < indices.length; i++) {
            random -= weights[i];
            if (random <= 0) {
                return indices[i];
            }
        }
        
        // Fallback: letzten Index zurückgeben (sollte nicht vorkommen)
        return indices[indices.length - 1];
    }

    /**
     * Löst ein Ereignis auf einem Element aus
     * @param {HTMLElement} element - Das Element, auf dem das Ereignis ausgelöst werden soll
     * @param {string} eventType - Typ des Ereignisses (z.B. 'change', 'input')
     */
    function triggerEvent(element, eventType) {
        if (!element) return;
        
        // Event erstellen und auslösen
        const event = new Event(eventType, { bubbles: true });
        element.dispatchEvent(event);
    }


    /**
     * Generiert ein zufälliges Alter zwischen 8 und 120 Jahren mit einer angepassten Verteilung
     * um den Bereich 25-40, wobei die extremen Enden (8 und 120) selten vorkommen.
     * @returns {number} Zufälliges Alter
     */
    function generateRandomAge() {
        // Parameter für die Verteilung
        const minAge = 8;   // Absolute Untergrenze
        const maxAge = 120; // Absolute Obergrenze
        const peakMin = 25; // Beginn des Häufigkeitspeaks
        const peakMax = 40; // Ende des Häufigkeitspeaks
        
        // Wahrscheinlichkeit für extreme Werte (0.05%)
        const extremeProbability = 0.0005;
        
        // 1. Ermittle, ob einer der extremen Randwerte gewählt werden soll
        if (Math.random() < extremeProbability) {
            return minAge; // 0.05% Chance für das Mindestalter (8)
        } else if (Math.random() < extremeProbability) {
            return maxAge; // 0.05% Chance für das Höchstalter (120)
        }
        
        // 2. Benutzerdefinierte Wahrscheinlichkeitsverteilung anwenden
        
        // Wir definieren verschiedene Altersgruppen mit ihrer Wahrscheinlichkeit
        const ageGroups = [
            { min: 9, max: 16, weight: 0.03 },    // Kinder (selten)
            { min: 17, max: 24, weight: 0.10 },   // Junge Erwachsene
            { min: 25, max: 40, weight: 0.67 },   // Hauptzielgruppe (~67%)
            { min: 41, max: 59, weight: 0.18 },   // Mittleres Alter
            { min: 60, max: 79, weight: 0.016 },  // Ältere
            { min: 80, max: 119, weight: 0.004 }  // Sehr alte (selten)
        ];
        
        // Zufällig eine Altersgruppe basierend auf den Gewichtungen auswählen
        const random = Math.random();
        let cumulativeWeight = 0;
        let selectedGroup = null;
        
        for (const group of ageGroups) {
            cumulativeWeight += group.weight;
            if (random < cumulativeWeight) {
                selectedGroup = group;
                break;
            }
        }
        
        // Fallback (sollte nicht passieren, aber zur Sicherheit)
        if (!selectedGroup) {
            selectedGroup = ageGroups[2]; // Default: Hauptzielgruppe
        }
        
        // 3. Innerhalb der Gruppe eine weitere Verteilung anwenden
        let age;
        
        if (selectedGroup.min === 25 && selectedGroup.max === 40) {
            // Bei der Hauptaltersgruppe: gleichmäßigere Verteilung mit leichter Tendenz zur Mitte
            const mid = (selectedGroup.min + selectedGroup.max) / 2;
            const range = selectedGroup.max - selectedGroup.min;
            
            // Triangularverteilung für mehr Werte in der Mitte
            const u = Math.random();
            const v = Math.random();
            const triangular = selectedGroup.min + range * (u + v) / 2;
            
            age = Math.round(triangular);
        } else if (selectedGroup.min >= 60) {
            // Bei älteren: exponentiell abnehmende Wahrscheinlichkeit
            const lambda = 1 / ((selectedGroup.max - selectedGroup.min) / 4); // Parameter für Exponentialverteilung
            const offset = Math.log(Math.random()) / -lambda;
            age = Math.round(selectedGroup.min + offset);
            
            // Auf den zulässigen Bereich begrenzen
            age = Math.min(age, selectedGroup.max);
        } else {
            // Bei anderen Gruppen: einfache gleichmäßige Verteilung
            age = Math.round(selectedGroup.min + Math.random() * (selectedGroup.max - selectedGroup.min));
        }
        
        return age;
    }

    /**
     * Diese Funktion setzt ein zufälliges Alter für den Charakter
     */
    function setRandomAge() {
        const ageInput = document.getElementById('age');
        if (!ageInput) {
            console.warn('Alters-Input nicht gefunden');
            return;
        }
        
        // Zufälliges Alter generieren
        const randomAge = generateRandomAge();
        
        // Alter in das Eingabefeld setzen
        ageInput.value = randomAge;
        
        // Event triggern, um Änderungen zu registrieren
        triggerEvent(ageInput, 'input');
        triggerEvent(ageInput, 'change');
        
        console.log(`Zufälliges Alter gesetzt: ${randomAge}`);
    }

    /**
     * Generiert einen zufälligen Namen und trägt ihn in das Namensfeld ein
     */
    function generateRandomName() {
        // Zuerst den Geschlechtstyp bestimmen (gleichmäßige Verteilung)
        const genderTypes = ['masculine', 'feminine', 'neutral'];
        const selectedGenderType = genderTypes[getRandomInt(0, genderTypes.length - 1)];
        
        // Kulturellen Stil für den Namen bestimmen (für Konsistenz)
        const cultures = ['germanic', 'romance', 'slavic', 'nordic', 'celtic', 'mixed'];
        const selectedCulture = cultures[getRandomInt(0, cultures.length - 1)];
        
        // Anzahl der Vornamen (1-3)
        const numFirstNames = getRandomInt(1, 3);
        
        // Anzahl der Nachnamen (1-2)
        const numLastNames = getRandomInt(1, 2);
        
        // Vornamen generieren (alle mit dem gleichen Geschlecht)
        const firstNames = [];
        for (let i = 0; i < numFirstNames; i++) {
            firstNames.push(generateFirstName(selectedGenderType, selectedCulture));
        }
        
        // Nachnamen generieren
        const lastNames = [];
        for (let i = 0; i < numLastNames; i++) {
            lastNames.push(generateLastName(selectedCulture));
        }
        
        // Namen zusammensetzen
        const firstName = firstNames.join(' ');
        const lastName = lastNames.join('-');
        const fullName = firstName + ' ' + lastName;
        
        // Längenausgleich anwenden - wenn der Name zu lang ist, kürzen
        const maxNameLength = 30;
        let finalName = fullName;
        if (fullName.length > maxNameLength) {
            // Wenn zu lang, reduziere auf einen Vornamen und einen Nachnamen
            finalName = firstNames[0] + ' ' + lastNames[0];
        }
        
        // Namen in das Namensfeld eintragen
        const nameInput = document.getElementById('name');
        if (nameInput) {
            nameInput.value = finalName;
            // Event auslösen, um sicherzustellen, dass die Änderung registriert wird
            triggerEvent(nameInput, 'input');
            triggerEvent(nameInput, 'change');
        }
        
        console.log(`Zufälliger Name generiert: ${finalName} (${selectedGenderType}, ${selectedCulture})`);
        return finalName;
    }

    /**
     * Generiert einen zufälligen Vornamen basierend auf dem gewählten Geschlecht und Kultur
     * @param {string} genderType - 'masculine', 'feminine', oder 'neutral'
     * @param {string} culture - 'germanic', 'romance', 'slavic', 'nordic', 'celtic', 'mixed'
     * @returns {string} Ein zufällig generierter Vorname
     */
    function generateFirstName(genderType, culture) {
        // Anzahl der Silben für den Vornamen (1-3, meistens 2)
        let numSyllables;
        const syllableRoll = Math.random();
        if (syllableRoll < 0.2) {
            numSyllables = 1;      // 20% Wahrscheinlichkeit für einsilbig
        } else if (syllableRoll < 0.8) {
            numSyllables = 2;      // 60% Wahrscheinlichkeit für zweisilbig
        } else {
            numSyllables = 3;      // 20% Wahrscheinlichkeit für dreisilbig
        }
        
        // Silben generieren mit kulturellem Kontext
        const dominantVowelGroup = selectDominantVowelGroup();
        
        let name = '';
        let previousSyllable = '';
        
        for (let i = 0; i < numSyllables; i++) {
            // Für die erste Silbe die spezielle Regel anwenden
            let syllable;
            if (i === 0) {
                syllable = generateSyllable(true, culture, dominantVowelGroup); // erste Silbe
            } else {
                // Sicherstellen, dass die Silbe gut mit der vorherigen harmoniert
                syllable = generateSyllable(false, culture, dominantVowelGroup, previousSyllable);
            }
            
            // Vermeiden von Wiederholungen der gleichen Silbe
            if (syllable !== previousSyllable) {
                name += syllable;
                previousSyllable = syllable;
            } else {
                // Bei Wiederholung erneut generieren
                i--;
            }
        }
        
        // Erste Buchstabe groß schreiben
        name = name.charAt(0).toUpperCase() + name.slice(1);
        
        // Dreifache Buchstaben reduzieren (z.B. "aaa" -> "aa")
        name = reduceTripleLetters(name);
        
        // Endung basierend auf dem Geschlecht anpassen
        name = applyGenderEnding(name, genderType, culture);
        
        // 10% Chance für einen vordefinierten Namen
        if (Math.random() < 0.1) {
            return getCommonFirstName(genderType, culture);
        }
        
        return name;
    }

    /**
     * Generiert einen zufälligen Nachnamen basierend auf der Kultur
     * @param {string} culture - 'germanic', 'romance', 'slavic', 'nordic', 'celtic', 'mixed'
     * @returns {string} Ein zufällig generierter Nachname
     */
    function generateLastName(culture) {
        // Anzahl der Silben für den Nachnamen (2-3, meist 2)
        const numSyllables = Math.random() < 0.7 ? 2 : 3;
        
        // Dominante Vokalgruppe für Harmonisierung
        const dominantVowelGroup = selectDominantVowelGroup();
        
        // Silben generieren
        let name = '';
        let previousSyllable = '';
        
        for (let i = 0; i < numSyllables; i++) {
            // Für die erste Silbe die spezielle Regel anwenden
            let syllable;
            if (i === 0) {
                syllable = generateSyllable(true, culture, dominantVowelGroup); // erste Silbe
            } else {
                // Sicherstellen, dass die Silbe gut mit der vorherigen harmoniert
                syllable = generateSyllable(false, culture, dominantVowelGroup, previousSyllable);
            }
            
            // Vermeiden von Wiederholungen der gleichen Silbe
            if (syllable !== previousSyllable) {
                name += syllable;
                previousSyllable = syllable;
            } else {
                // Bei Wiederholung erneut generieren
                i--;
            }
        }
        
        // Erste Buchstabe groß schreiben
        name = name.charAt(0).toUpperCase() + name.slice(1);
        
        // Dreifache Buchstaben reduzieren
        name = reduceTripleLetters(name);
        
        // Kulturspezifische Präfixe und Suffixe hinzufügen (40% Chance)
        if (Math.random() < 0.4) {
            const modifier = getCulturalModifier(culture);
            if (modifier) {
                name = modifier.prefix + name + modifier.suffix;
            }
        }
        
        // Häufige berufsbezogene oder bedeutungsvolle Nachnamen einmischen (20% Chance)
        if (Math.random() < 0.2) {
            return getCommonLastName(culture);
        }
        
        // Namenslänge begrenzen (maximal 15 Zeichen für Nachnamen)
        if (name.length > 15) {
            name = name.substring(0, 15);
        }
        
        return name;
    }

    /**
     * Generiert eine zufällige Silbe nach den Regeln, mit Berücksichtigung von Kultur und Vokalharmonie
     * @param {boolean} isFirstSyllable - Gibt an, ob es sich um die erste Silbe eines Namens handelt
     * @param {string} culture - Kultureller Stil des Namens
     * @param {string} dominantVowelGroup - Die dominante Vokalgruppe für Vokalharmonie
     * @param {string} previousSyllable - Die vorherige Silbe für bessere Übergänge
     * @returns {string} Eine zufällig generierte Silbe
     */
    function generateSyllable(isFirstSyllable = false, culture = 'mixed', dominantVowelGroup = 'neutral', previousSyllable = '') {
        // Silbenmuster definieren, abhängig davon, ob es die erste Silbe ist
        let patterns;
        let patternWeights;
        
        if (isFirstSyllable) {
            // Für die erste Silbe: maximal einen Konsonanten am Anfang
            patterns = [
                'KV',    // Konsonant-Vokal (am häufigsten)
                'V',     // Vokal
                'KVK',   // Konsonant-Vokal-Konsonant
                'VK',    // Vokal-Konsonant
            ];
            patternWeights = [5, 2, 3, 2];
        } else {
            // Für andere Silben: ausgewogenere Muster
            patterns = [
                'KV',    // Konsonant-Vokal (am häufigsten)
                'KVK',   // Konsonant-Vokal-Konsonant
                'V',     // Vokal (selten allein)
                'VK',    // Vokal-Konsonant
                'KKV',   // Konsonant-Konsonant-Vokal (nur für nicht-erste Silben)
            ];
            patternWeights = [5, 4, 1, 2, 2];
        }
        
        // Kulturabhängige Anpassung der Muster-Wahrscheinlichkeiten
        adjustPatternWeightsByCulture(patternWeights, culture);
        
        // Zufälliges Muster auswählen
        const patternIndex = getWeightedRandomIndex(
            Array.from({ length: patterns.length }, (_, i) => i),
            patternWeights
        );
        const pattern = patterns[patternIndex];
        
        // Konsonanten und Vokale passend zur Kultur auswählen
        const { consonants, vowels, initialConsonants, finalConsonants } = getCharactersByLanguage(culture);
        
        // Spezielle Konsonanten für die erste Silbe
        const firstSyllableSpecialConsonants = ['sh', 'ch', 'sch'];
        
        // Konsonantengruppen für reguläre Silben (kulturspezifisch filtern)
        const doubleConsonants = getDoubleConsonantsByLanguage(culture);
        
        // Vokalgruppen basierend auf dominanter Vokalgruppe
        const vowelGroups = getVowelGroupsByDominantGroup(dominantVowelGroup);
        
        // Vorangehender Konsonant für bessere Silbenübergänge
        let precedingConsonant = '';
        if (previousSyllable && previousSyllable.length > 0) {
            const lastChar = previousSyllable.charAt(previousSyllable.length - 1);
            if (!isVowel(lastChar)) {
                precedingConsonant = lastChar;
            }
        }
        
        let syllable = '';
        let patternIndex2 = 0;
        
        while (patternIndex2 < pattern.length) {
            if (pattern[patternIndex2] === 'K') {
                // Behandlung für die erste Silbe mit speziellen Regeln
                if (isFirstSyllable && syllable === '' && pattern.startsWith('K')) {
                    // Bei der ersten Silbe und am Anfang, spezielle Regeln anwenden
                    // 15% Chance für spezielle Konsonanten wie "sh", "ch", "sch"
                    if (Math.random() < 0.15) {
                        syllable += firstSyllableSpecialConsonants[getRandomInt(0, firstSyllableSpecialConsonants.length - 1)];
                    } else {
                        // Sonst einen einzelnen initialen Konsonanten (kulturspezifisch)
                        syllable += initialConsonants[getRandomInt(0, initialConsonants.length - 1)];
                    }
                    patternIndex2++; // Einen Buchstaben im Pattern überspringen
                }
                // Für nicht-erste Silben oder nicht am Anfang stehende Konsonanten
                else if (!isFirstSyllable || syllable !== '') {
                    // Wenn der nächste Buchstabe ebenfalls 'K' ist, verwende eine Konsonantengruppe
                    if (patternIndex2 + 1 < pattern.length && pattern[patternIndex2 + 1] === 'K') {
                        // Wähle eine Konsonantengruppe, die gut mit vorherigem Konsonanten harmoniert
                        const compatibleDoubleConsonants = getCompatibleDoubleConsonants(doubleConsonants, precedingConsonant);
                        syllable += compatibleDoubleConsonants[getRandomInt(0, compatibleDoubleConsonants.length - 1)];
                        patternIndex2 += 2; // Überspringe beide 'K's
                    }
                    // Wenn es sich um einen finalen Konsonanten handelt
                    else if (patternIndex2 === pattern.length - 1) {
                        // Wähle einen erlaubten Endkonsonanten (kulturspezifisch)
                        syllable += finalConsonants[getRandomInt(0, finalConsonants.length - 1)];
                        patternIndex2++;
                    }
                    // Sonst verwende einen einzelnen Konsonanten
                    else {
                        syllable += consonants[getRandomInt(0, consonants.length - 1)];
                        patternIndex2++;
                    }
                }
            } else if (pattern[patternIndex2] === 'V') {
                // Vokalharmonie anwenden
                // Wenn der nächste Buchstabe ebenfalls 'V' ist, verwende eine Vokalgruppe
                if (patternIndex2 + 1 < pattern.length && pattern[patternIndex2 + 1] === 'V') {
                    syllable += vowelGroups[getRandomInt(0, vowelGroups.length - 1)];
                    patternIndex2 += 2; // Überspringe beide 'V's
                }
                // Sonst verwende einen einzelnen Vokal
                else {
                    const harmonizedVowels = getHarmonizedVowels(vowels, dominantVowelGroup);
                    syllable += harmonizedVowels[getRandomInt(0, harmonizedVowels.length - 1)];
                    patternIndex2++;
                }
            }
        }
        
        // Überprüfe und verbessere die Aussprechbarkeit der Silbe
        return improvePronounciation(syllable);
    }

    /**
     * Wählt eine dominante Vokalgruppe für die Vokalharmonie aus
     * @returns {string} Eine der Vokalgruppen: 'front', 'back', 'neutral'
     */
    function selectDominantVowelGroup() {
        const groups = ['front', 'back', 'neutral'];
        const weights = [4, 4, 2]; // Front und Back sind häufiger
        
        const groupIndex = getWeightedRandomIndex(
            Array.from({ length: groups.length }, (_, i) => i),
            weights
        );
        
        return groups[groupIndex];
    }

    /**
     * Passt die Muster-Gewichtungen basierend auf der Kultur an
     * @param {Array} weights - Array mit Mustergewichtungen
     * @param {string} culture - Kulturtyp
     */
    function adjustPatternWeightsByCulture(weights, culture) {
        switch (culture) {
            case 'germanic':
                // Germanische Sprachen: mehr Konsonanten am Ende
                weights[1] += 2; // KVK erhöhen
                weights[3] += 1; // VK erhöhen
                break;
            case 'romance':
                // Romanische Sprachen: eher offene Silben
                weights[0] += 2; // KV erhöhen
                weights[2] += 1; // V erhöhen
                break;
            case 'slavic':
                // Slawische Sprachen: mehr Konsonantengruppen
                if (weights.length > 4) weights[4] += 2; // KKV erhöhen
                break;
            case 'nordic':
                // Nordische Sprachen: mehr geschlossene Silben
                weights[1] += 1; // KVK erhöhen
                weights[3] += 1; // VK erhöhen
                break;
            case 'celtic':
                // Keltische Sprachen: mehr Konsonanten, weniger Vokale allein
                weights[0] += 1; // KV erhöhen
                weights[2] -= 1; // V verringern (min. 0)
                if (weights[2] < 0) weights[2] = 0;
                break;
        }
    }

    /**
     * Liefert Zeichen basierend auf der Kultur zurück
     * @param {string} culture - Kulturtyp
     * @returns {Object} Objekt mit verschiedenen Zeichensätzen
     */
    function getCharactersByLanguage(culture) {
        // Basis-Zeichensätze
        const baseConsonants = 'bcdfghjklmnpqrstvwxz';
        const baseVowels = 'aeiouy';
        
        // Standard Endkonsonanten
        const baseFinalConsonants = ['m', 'n', 'l', 'r', 's', 't', 'ch', 'th', 'nd'];
        
        // Kulturspezifische Anpassungen
        switch (culture) {
            case 'germanic':
                return {
                    consonants: 'bcdfghjklmnpqrstvwz',
                    vowels: 'aeiouy',
                    initialConsonants: 'bdfghjklmnprstvw'.split(''),
                    finalConsonants: [...baseFinalConsonants, 'ck', 'ff', 'ss', 'tz']
                };
            case 'romance':
                return {
                    consonants: 'bcdfghjlmnpqrstvz',
                    vowels: 'aeiou',
                    initialConsonants: 'bcdfglmnprst'.split(''),
                    finalConsonants: [...baseFinalConsonants, 'nt', 'll', 'nn']
                };
            case 'slavic':
                return {
                    consonants: 'bcdfghjklmnprstvz',
                    vowels: 'aeiouy',
                    initialConsonants: 'bdfgklmnprstz'.split(''),
                    finalConsonants: [...baseFinalConsonants, 'ch', 'ski', 'sky', 'v']
                };
            case 'nordic':
                return {
                    consonants: 'bdfghjklmnprstvø',
                    vowels: 'aeiouyø',
                    initialConsonants: 'bdfghjklmnprst'.split(''),
                    finalConsonants: [...baseFinalConsonants, 'rd', 'sen', 'son', 'rk']
                };
            case 'celtic':
                return {
                    consonants: 'bcdfghjlmnprstvw',
                    vowels: 'aeiouy',
                    initialConsonants: 'bcdfgklmnprstw'.split(''),
                    finalConsonants: [...baseFinalConsonants, 'nn', 'dd', 'gh', 'th']
                };
            case 'mixed':
            default:
                return {
                    consonants: baseConsonants,
                    vowels: baseVowels,
                    initialConsonants: baseConsonants.split(''),
                    finalConsonants: baseFinalConsonants
                };
        }
    }

    /**
     * Liefert Doppelkonsonanten basierend auf der Kultur
     * @param {string} culture - Kultureller Stil
     * @returns {Array} Liste mit erlaubten Doppelkonsonanten
     */
    function getDoubleConsonantsByLanguage(culture) {
        // Basisset von Doppelkonsonanten (in den meisten Sprachen üblich)
        const baseDoubleConsonants = ['bl', 'br', 'ch', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'gr', 
                                    'kl', 'kr', 'ph', 'pl', 'pr', 'qu', 'sc', 'sh', 'sk', 'sl', 
                                    'sp', 'st', 'tr'];
        
        // Kulturspezifische Anpassungen
        switch (culture) {
            case 'germanic':
                return [...baseDoubleConsonants, 'sch', 'pf', 'tz', 'zw'];
            case 'romance':
                return [...baseDoubleConsonants, 'll', 'gn', 'cc', 'rrh'];
            case 'slavic':
                return [...baseDoubleConsonants, 'cz', 'sz', 'zk', 'vl', 'zh'];
            case 'nordic':
                return [...baseDoubleConsonants, 'bj', 'fj', 'kj', 'sj', 'tj'];
            case 'celtic':
                return [...baseDoubleConsonants, 'mh', 'bh', 'dh', 'gh', 'th'];
            case 'mixed':
            default:
                return baseDoubleConsonants;
        }
    }

    /**
     * Gibt Vokalgruppen basierend auf der dominanten Vokalgruppe zurück
     * @param {string} dominantGroup - Dominante Vokalgruppe ('front', 'back', 'neutral')
     * @returns {Array} Liste mit passenden Vokalgruppen
     */
    function getVowelGroupsByDominantGroup(dominantGroup) {
        // Basis-Vokalgruppen
        const frontVowelGroups = ['ei', 'ie', 'ee', 'ay', 'ey'];
        const backVowelGroups = ['oo', 'au', 'ou', 'oa', 'ow'];
        const neutralVowelGroups = ['ai', 'ea', 'oe', 'ui', 'eu'];
        
        // Je nach dominanter Gruppe andere Wahrscheinlichkeiten
        switch (dominantGroup) {
            case 'front':
                return [...frontVowelGroups, ...neutralVowelGroups.slice(0, 2)];
            case 'back':
                return [...backVowelGroups, ...neutralVowelGroups.slice(0, 2)];
            case 'neutral':
            default:
                return neutralVowelGroups;
        }
    }

    /**
     * Gibt harmonisierte Vokale basierend auf der dominanten Gruppe zurück
     * @param {string} vowels - Verfügbare Vokale
     * @param {string} dominantGroup - Dominante Vokalgruppe
     * @returns {Array} Harmonisierte Vokale
     */
    function getHarmonizedVowels(vowels, dominantGroup) {
        const frontVowels = ['e', 'i', 'y'];
        const backVowels = ['a', 'o', 'u'];
        
        switch (dominantGroup) {
            case 'front':
                // Höhere Wahrscheinlichkeit für vordere Vokale
                return [...frontVowels, ...backVowels.slice(0, 1)];
            case 'back':
                // Höhere Wahrscheinlichkeit für hintere Vokale
                return [...backVowels, ...frontVowels.slice(0, 1)];
            case 'neutral':
            default:
                // Alle Vokale gleich wahrscheinlich
                return vowels.split('');
        }
    }

    /**
     * Filtert Doppelkonsonanten, die gut mit dem vorherigen Konsonanten harmonieren
     * @param {Array} doubleConsonants - Liste verfügbarer Doppelkonsonanten
     * @param {string} previousConsonant - Vorheriger Konsonant
     * @returns {Array} Gefilterte Doppelkonsonanten
     */
    function getCompatibleDoubleConsonants(doubleConsonants, previousConsonant) {
        if (!previousConsonant) {
            return doubleConsonants;
        }
        
        // Filtere Doppelkonsonanten, die gut an den vorherigen anschließen
        return doubleConsonants.filter(dc => {
            // Vermeide schwierige Übergänge
            const badCombos = [
                previousConsonant + dc.charAt(0), // z.B. wenn vorheriger 'k' und dc beginnt mit 'p' -> 'kp'
            ];
            
            // Liste von schwierigen Übergängen
            const hardCombinations = ['kp', 'gb', 'tp', 'dt', 'lr', 'rl', 'nm', 'mn', 'kx', 'xs', 'zp'];
            
            // Prüfe, ob der Übergang schwierig ist
            return !hardCombinations.includes(badCombos[0]);
        });
    }

    /**
     * Prüft, ob ein Zeichen ein Vokal ist
     * @param {string} char - Zu prüfendes Zeichen
     * @returns {boolean} True, wenn es ein Vokal ist
     */
    function isVowel(char) {
        return 'aeiouyøæ'.includes(char.toLowerCase());
    }

    /**
     * Verbessert die Aussprache einer Silbe
     * @param {string} syllable - Die zu verbessernde Silbe
     * @returns {string} Verbesserte Silbe
     */
    function improvePronounciation(syllable) {
        // Vermeide drei gleiche Buchstaben in Folge
        syllable = reduceTripleLetters(syllable);
        
        // Stelle sicher, dass die Silbe einen Vokal enthält
        if (!hasVowel(syllable)) {
            // Füge einen zufälligen Vokal in der Mitte ein
            const vowel = 'aeiou'.charAt(getRandomInt(0, 4));
            const middle = Math.floor(syllable.length / 2);
            syllable = syllable.substring(0, middle) + vowel + syllable.substring(middle);
        }
        
        return syllable;
    }

    /**
     * Reduziert dreifache Buchstaben auf zweifache
     * @param {string} text - Der zu bereinigende Text
     * @returns {string} Bereinigter Text
     */
    function reduceTripleLetters(text) {
        // Regex für drei gleiche Zeichen in Folge
        return text.replace(/(.)\1\1+/g, '$1$1');
    }

    /**
     * Prüft, ob ein Text mindestens einen Vokal enthält
     * @param {string} text - Der zu prüfende Text
     * @returns {boolean} True, wenn mindestens ein Vokal enthalten ist
     */
    function hasVowel(text) {
        return /[aeiouyøæ]/i.test(text);
    }

    /**
     * Fügt eine geschlechtsspezifische Endung an den Namen an, falls notwendig
     * @param {string} name - Der Name
     * @param {string} genderType - Geschlechtstyp
     * @param {string} culture - Kultureller Stil
     * @returns {string} Name mit passender Endung
     */
    function applyGenderEnding(name, genderType, culture) {
        // Prüfen, ob der Name bereits eine passende Endung hat
        if (hasGenderSpecificEnding(name, genderType)) {
            return name;
        }
        
        // Geschlechtsspezifische Endungen nach Kultur
        const endings = getCultureSpecificGenderEndings(culture, genderType);
        
        // Zufällige Endung auswählen
        const ending = endings[getRandomInt(0, endings.length - 1)];
        
        // Wenn der Name mit Konsonant endet und die Endung mit Konsonant beginnt,
        // füge einen Vokal dazwischen ein
        if (!isVowel(name.charAt(name.length - 1)) && ending.length > 0 && !isVowel(ending.charAt(0))) {
            const connectingVowel = 'aeiou'.charAt(getRandomInt(0, 4));
            return name + connectingVowel + ending;
        }
        
        return name + ending;
    }

    /**
     * Prüft, ob ein Name bereits eine geschlechtsspezifische Endung hat
     * @param {string} name - Der zu prüfende Name
     * @param {string} genderType - Geschlechtstyp
     * @returns {boolean} True, wenn bereits eine passende Endung vorhanden
     */
    function hasGenderSpecificEnding(name, genderType) {
        if (genderType === 'feminine') {
            return /[ae]$|(ne|ia|ine|elle|ette|lyn|anne|ina)$/i.test(name);
        } else if (genderType === 'masculine') {
            return /(er|us|o|an|en|in|ard|bert|mund|ik|on|ey|ian|rick)$/i.test(name);
        }
        return true; // Neutrale Namen brauchen keine spezifische Endung
    }

    /**
     * Gibt kulturspezifische geschlechtsspezifische Endungen zurück
     * @param {string} culture - Kultureller Stil
     * @param {string} genderType - Geschlechtstyp
     * @returns {Array} Liste von passenden Endungen
     */
    function getCultureSpecificGenderEndings(culture, genderType) {
        // Basis-Endungen
        const baseFeminineEndings = ['a', 'ia', 'ne', 'ine', 'elle', 'ette', 'ie', 'ah', 'lyn'];
        const baseMasculineEndings = ['er', 'us', 'o', 'an', 'en', 'in', 'ard', 'ik', 'on'];
        const baseNeutralEndings = ['ley', 'son', 'ten', 'er', 'on'];
        
        // Kulturspezifische Anpassungen
        switch (culture) {
            case 'germanic':
                if (genderType === 'feminine') {
                    return [...baseFeminineEndings, 'e', 'ilde', 'ina'];
                } else if (genderType === 'masculine') {
                    return [...baseMasculineEndings, 'bert', 'wald', 'rich', 'mund'];
                }
                return baseNeutralEndings;
                
            case 'romance':
                if (genderType === 'feminine') {
                    return [...baseFeminineEndings, 'etta', 'ella', 'ina', 'ita'];
                } else if (genderType === 'masculine') {
                    return [...baseMasculineEndings, 'io', 'ino', 'ero', 'ico'];
                }
                return baseNeutralEndings;
                
            case 'slavic':
                if (genderType === 'feminine') {
                    return [...baseFeminineEndings, 'ya', 'ova', 'ka', 'ina'];
                } else if (genderType === 'masculine') {
                    return [...baseMasculineEndings, 'sky', 'ski', 'vich', 'mir'];
                }
                return baseNeutralEndings;
                
            case 'nordic':
                if (genderType === 'feminine') {
                    return [...baseFeminineEndings, 'dottir', 'borg', 'lind', 'hild'];
                } else if (genderType === 'masculine') {
                    return [...baseMasculineEndings, 'son', 'sen', 'heim', 'thor'];
                }
                return baseNeutralEndings;
                
            case 'celtic':
                if (genderType === 'feminine') {
                    return [...baseFeminineEndings, 'wen', 'wyn', 'eth', 'ona'];
                } else if (genderType === 'masculine') {
                    return [...baseMasculineEndings, 'wyn', 'ach', 'bran', 'dor'];
                }
                return baseNeutralEndings;
                
            default:
                if (genderType === 'feminine') {
                    return baseFeminineEndings;
                } else if (genderType === 'masculine') {
                    return baseMasculineEndings;
                }
                return baseNeutralEndings;
        }
    }

    /**
     * Gibt einen kulturellen Modifikator für Nachnamen zurück
     * @param {string} culture - Kultureller Stil
     * @returns {Object|null} Präfix und Suffix oder null
     */
    function getCulturalModifier(culture) {
        switch (culture) {
            case 'germanic':
                const germanicModifiers = [
                    {prefix: 'von ', suffix: ''},
                    {prefix: '', suffix: 'mann'},
                    {prefix: '', suffix: 'berg'},
                    {prefix: '', suffix: 'stein'},
                    {prefix: '', suffix: 'wald'},
                    {prefix: '', suffix: 'feld'}
                ];
                return germanicModifiers[getRandomInt(0, germanicModifiers.length - 1)];
                
            case 'romance':
                const romanceModifiers = [
                    {prefix: '', suffix: 'ez'},
                    {prefix: '', suffix: 'elli'},
                    {prefix: 'di', suffix: ''},
                    {prefix: '', suffix: 'ini'},
                    {prefix: 'de ', suffix: ''},
                    {prefix: '', suffix: 'ola'}
                ];
                return romanceModifiers[getRandomInt(0, romanceModifiers.length - 1)];
                
            case 'slavic':
                const slavicModifiers = [
                    {prefix: '', suffix: 'ov'},
                    {prefix: '', suffix: 'ski'},
                    {prefix: '', suffix: 'ich'},
                    {prefix: '', suffix: 'enko'},
                    {prefix: '', suffix: 'insky'},
                    {prefix: '', suffix: 'ko'}
                ];
                return slavicModifiers[getRandomInt(0, slavicModifiers.length - 1)];
                
            case 'nordic':
                const nordicModifiers = [
                    {prefix: '', suffix: 'son'},
                    {prefix: '', suffix: 'dottir'},
                    {prefix: '', suffix: 'sen'},
                    {prefix: '', suffix: 'heim'},
                    {prefix: '', suffix: 'dal'},
                    {prefix: '', suffix: 'borg'}
                ];
                return nordicModifiers[getRandomInt(0, nordicModifiers.length - 1)];
                
            case 'celtic':
                const celticModifiers = [
                    {prefix: 'Mc', suffix: ''},
                    {prefix: 'O\'', suffix: ''},
                    {prefix: 'Ap', suffix: ''},
                    {prefix: '', suffix: 'ach'},
                    {prefix: 'Mac', suffix: ''},
                    {prefix: '', suffix: 'bane'}
                ];
                return celticModifiers[getRandomInt(0, celticModifiers.length - 1)];
                
            case 'mixed':
                // Bei gemischter Kultur eine zufällige aus allen Kulturen wählen
                const allModifiers = [
                    {prefix: 'von ', suffix: ''},
                    {prefix: '', suffix: 'mann'},
                    {prefix: '', suffix: 'ez'},
                    {prefix: '', suffix: 'elli'},
                    {prefix: '', suffix: 'ov'},
                    {prefix: '', suffix: 'ski'},
                    {prefix: '', suffix: 'son'},
                    {prefix: 'Mc', suffix: ''},
                    {prefix: 'O\'', suffix: ''}
                ];
                return allModifiers[getRandomInt(0, allModifiers.length - 1)];
                
            default:
                return null;
        }
    }

    /**
     * Gibt einen häufigen Vornamen basierend auf Geschlecht und Kultur zurück
     * @param {string} genderType - Geschlechtstyp
     * @param {string} culture - Kultureller Stil
     * @returns {string} Ein gebräuchlicher Vorname
     */
    function getCommonFirstName(genderType, culture) {
        // Gemeinsame Namen für jede Kultur
        const names = {
            'germanic': {
                'masculine': ['Hans', 'Otto', 'Karl', 'Friedrich', 'Wilhelm', 'Heinrich', 'Ludwig', 'Walter', 'Max'],
                'feminine': ['Anna', 'Helga', 'Gerda', 'Heidi', 'Ingrid', 'Frieda', 'Ursula', 'Greta', 'Maria'],
                'neutral': ['Kim', 'Alex', 'Kai', 'Robin', 'Mika']
            },
            'romance': {
                'masculine': ['Marco', 'Giovanni', 'Antonio', 'Roberto', 'Miguel', 'Carlos', 'Pierre', 'Louis', 'Paulo'],
                'feminine': ['Maria', 'Sofia', 'Isabella', 'Lucia', 'Carmen', 'Sophia', 'Elena', 'Juliette', 'Francesca'],
                'neutral': ['Andrea', 'Simone', 'Dominique', 'Claude', 'Michele']
            },
            'slavic': {
                'masculine': ['Ivan', 'Dmitri', 'Sergei', 'Vladimir', 'Alexei', 'Mikhail', 'Nikolai', 'Boris', 'Yuri'],
                'feminine': ['Olga', 'Tatiana', 'Svetlana', 'Natasha', 'Anya', 'Ekaterina', 'Irina', 'Anastasia', 'Yelena'],
                'neutral': ['Sasha', 'Vanya', 'Valya', 'Zhenya', 'Misha']
            },
            'nordic': {
                'masculine': ['Erik', 'Lars', 'Sven', 'Bjorn', 'Thor', 'Olaf', 'Magnus', 'Leif', 'Harald'],
                'feminine': ['Astrid', 'Ingrid', 'Frida', 'Freya', 'Sigrid', 'Helga', 'Solveig', 'Elin', 'Karin'],
                'neutral': ['Kim', 'Mika', 'Kaj', 'Tove', 'Rune']
            },
            'celtic': {
                'masculine': ['Liam', 'Sean', 'Patrick', 'Connor', 'Aidan', 'Brennan', 'Declan', 'Cormac', 'Rowan'],
                'feminine': ['Siobhan', 'Erin', 'Fiona', 'Bridget', 'Niamh', 'Maeve', 'Eileen', 'Roisin', 'Saoirse'],
                'neutral': ['Kerry', 'Quinn', 'Riley', 'Casey', 'Morgan']
            },
            'mixed': {
                'masculine': ['John', 'Michael', 'David', 'Robert', 'Thomas', 'Mark', 'Peter', 'James', 'William'],
                'feminine': ['Mary', 'Emma', 'Sarah', 'Emily', 'Laura', 'Lisa', 'Julia', 'Sophie', 'Hannah'],
                'neutral': ['Alex', 'Sam', 'Robin', 'Taylor', 'Jordan', 'Casey', 'Quinn', 'Morgan', 'Riley']
            }
        };
        
        // Fallback für unbekannte Kulturen
        const actualCulture = names[culture] ? culture : 'mixed';
        
        // Namen für das angegebene Geschlecht abrufen
        const genderNames = names[actualCulture][genderType] || names[actualCulture]['neutral'];
        
        // Zufälligen Namen zurückgeben
        return genderNames[getRandomInt(0, genderNames.length - 1)];
    }

    /**
     * Gibt einen häufigen Nachnamen basierend auf der Kultur zurück
     * @param {string} culture - Kultureller Stil
     * @returns {string} Ein gebräuchlicher Nachname
     */
    function getCommonLastName(culture) {
        // Gemeinsame Nachnamen für jede Kultur
        const surnames = {
            'germanic': [
                'Schmidt', 'Müller', 'Weber', 'Schneider', 'Fischer', 'Meyer', 'Wagner', 'Becker', 'Hoffmann', 
                'Schulz', 'Koch', 'Bauer', 'Wolf', 'Schröder', 'Klein', 'Neumann', 'Schwarz', 'Zimmermann'
            ],
            'romance': [
                'Rossi', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Garcia', 'Martinez', 'Rodriguez', 'Lopez',
                'Fernandez', 'Moreau', 'Dubois', 'Bernard', 'Petit', 'Durand', 'Leroy', 'Simon', 'Martin'
            ],
            'slavic': [
                'Ivanov', 'Smirnov', 'Kuznetsov', 'Popov', 'Sokolov', 'Lebedev', 'Kozlov', 'Novikov', 'Morozov',
                'Petrov', 'Volkov', 'Solovyov', 'Vasilyev', 'Zaytsev', 'Pavlov', 'Semyonov', 'Golubev'
            ],
            'nordic': [
                'Johansson', 'Andersson', 'Karlsson', 'Nilsson', 'Eriksson', 'Larsson', 'Olsson', 'Persson',
                'Svensson', 'Gustafsson', 'Hansen', 'Nielsen', 'Jensen', 'Pedersen', 'Kristiansen'
            ],
            'celtic': [
                'Murphy', 'Kelly', 'O\'Sullivan', 'Walsh', 'O\'Brien', 'McCarthy', 'Ryan', 'O\'Connor', 'Doyle',
                'McDonnell', 'McLaughlin', 'O\'Neill', 'Gallagher', 'Quinn', 'Lynch', 'Doherty', 'Kennedy'
            ],
            'mixed': [
                'Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Taylor',
                'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Lee'
            ]
        };
        
        // Fallback für unbekannte Kulturen
        const actualCulture = surnames[culture] ? culture : 'mixed';
        
        // Zufälligen Nachnamen zurückgeben
        return surnames[actualCulture][getRandomInt(0, surnames[actualCulture].length - 1)];
    }
});
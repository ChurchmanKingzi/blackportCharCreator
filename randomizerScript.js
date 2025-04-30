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
                // 1. Alle vorherigen Auswahloptionen zurücksetzen
                resetSelections();
                
                // 2. Kurze Verzögerung, um sicherzustellen, dass UI-Updates abgeschlossen sind
                setTimeout(() => {
                    // 3. Hauptattribute und Fertigkeiten auf Minimum setzen
                    resetAllAttributes();
                    
                    // 4. Weitere Verzögerung für UI-Updates
                    setTimeout(() => {
                        // 5. Zufällige Klasse auswählen
                        selectRandomClass();
                        
                        // 6. Kurze Verzögerung für UI-Updates nach Klassenauswahl
                        setTimeout(() => {
                            // 7. Vor- und Nachteile auswählen
                            selectRandomAdvantageAndDisadvantage();
                            
                            // 8. Verzögerung für UI-Updates nach Vor-/Nachteilauswahl
                            setTimeout(() => {
                                // 9. Zufällige Magieschule auswählen
                                selectRandomMagicSchool();
                                
                                // 10. Verzögerung für UI-Updates nach Magieschulauswahl
                                setTimeout(() => {
                                    // 11. Zweite Klasse oder Magieschule auswählen, wenn nötig
                                    handleSecondarySelections();
                                    
                                    // 12. Verzögerung für UI-Updates nach sekundären Auswahloptionen
                                    setTimeout(() => {
                                        // 13. Attribute und Fertigkeiten zufällig verteilen
                                        distributeRandomAttributes();
                                        
                                        // 14. Verzögerung für UI-Updates nach Attributverteilung
                                        setTimeout(() => {
                                            // 15. Zufällige Items auswählen
                                            selectRandomItems();
                                            
                                            // 16. Verzögerung für UI-Updates nach Item-Auswahl
                                            setTimeout(() => {
                                                // 17. Zufällige Zauber auswählen
                                                selectRandomSpells();
                                                
                                                // 18. Verzögerung für UI-Updates nach Zauberauswahl
                                                setTimeout(() => {
                                                    // 19. Zufälliges Alter bestimmen
                                                    setRandomAge();
                                                    
                                                    // 20. Zufälligen Namen bestimmen
                                                    generateRandomName();
                                                    
                                                    // 21. Kampfwerte neu berechnen
                                                    updateCombatStats();
                                                    
                                                    // Button zurücksetzen
                                                    if (button) {
                                                        button.disabled = false;
                                                        button.textContent = 'Randomize!';
                                                        button.style.backgroundColor = '#8B0000';
                                                    }
                                                    
                                                    // Erfolgsmeldung anzeigen
                                                    showNotification('Charakter erfolgreich zufällig erstellt!', true);
                                                }, 100);
                                            }, 100);
                                        }, 100);
                                    }, 100);
                                }, 100);
                            }, 100);
                        }, 100);
                    }, 100);
                }, 100);
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
        }, 100);
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

    // Hauptfunktion zur zufälligen Charaktererstellung - überarbeitete Version
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
                // 1. Alle vorherigen Auswahloptionen zurücksetzen
                resetSelections();
                
                // 2. Kurze Verzögerung, um sicherzustellen, dass UI-Updates abgeschlossen sind
                setTimeout(() => {
                    // 3. Hauptattribute und Fertigkeiten auf Minimum setzen
                    resetAllAttributes();
                    
                    // 4. Weitere Verzögerung für UI-Updates
                    setTimeout(() => {
                        // 5. Zufällige Klasse auswählen
                        selectRandomClass();
                        
                        // 6. Kurze Verzögerung für UI-Updates nach Klassenauswahl
                        setTimeout(() => {
                            // 7. Vor- und Nachteile auswählen
                            selectRandomAdvantageAndDisadvantage();
                            
                            // 8. Verzögerung für UI-Updates nach Vor-/Nachteilauswahl
                            setTimeout(() => {
                                // 9. Zufällige Magieschule auswählen
                                selectRandomMagicSchool();
                                
                                // 10. Verzögerung für UI-Updates nach Magieschulauswahl
                                setTimeout(() => {
                                    // 11. Zweite Klasse oder Magieschule auswählen, wenn nötig
                                    handleSecondarySelections();
                                    
                                    // 12. Verzögerung für UI-Updates nach sekundären Auswahloptionen
                                    setTimeout(() => {
                                        // 13. Attribute und Fertigkeiten zufällig verteilen
                                        distributeRandomAttributes();
                                        
                                        // 14. Verzögerung für UI-Updates nach Attributverteilung
                                        setTimeout(() => {
                                            // 15. Zufällige Items auswählen
                                            selectRandomItems();
                                            
                                            // 16. Verzögerung für UI-Updates nach Item-Auswahl
                                            setTimeout(() => {
                                                // 17. Zufällige Zauber auswählen
                                                selectRandomSpells();
                                                
                                                // 18. Verzögerung für UI-Updates nach Zauberauswahl
                                                setTimeout(() => {
                                                    // 19. Zufälliges Alter bestimmen
                                                    setRandomAge();
                                                    
                                                    // 20. Zufälligen Namen bestimmen
                                                    generateRandomName();
                                                    
                                                    // 21. Kampfwerte neu berechnen
                                                    updateCombatStats();
                                                    
                                                    // Button zurücksetzen
                                                    if (button) {
                                                        button.disabled = false;
                                                        button.textContent = 'Randomize!';
                                                        button.style.backgroundColor = '#8B0000';
                                                    }
                                                    
                                                    // Erfolgsmeldung anzeigen
                                                    showNotification('Charakter erfolgreich zufällig erstellt!', true);
                                                }, 10);
                                            }, 10);
                                        }, 10);
                                    }, 10);
                                }, 10);
                            }, 10);
                        }, 10);
                    }, 10);
                }, 10);
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
        }, 100);
    }

    /**
     * Setzt alle Attributwerte auf ihre Minimalwerte zurück
     */
    function resetAllAttributes() {
        // 1. Alle Hauptattribute auf Minimum (1) setzen
        const mainAttributeInputs = document.querySelectorAll('.main-attribute-value');
        mainAttributeInputs.forEach(input => {
            input.value = 1;
            triggerEvent(input, 'input');
            triggerEvent(input, 'change');
        });
        
        // 2. Alle Fertigkeiten auf Minimum (0) setzen
        const attributeInputs = document.querySelectorAll('.attribute-value');
        attributeInputs.forEach(input => {
            input.value = 0;
            triggerEvent(input, 'input');
            triggerEvent(input, 'change');
        });
        
        // 3. Verfügbare Punkte aktualisieren
        if (typeof updateAvailablePointsDisplay === 'function') {
            updateAvailablePointsDisplay();
        }
        
        if (typeof updateAvailableSkillPointsDisplay === 'function') {
            updateAvailableSkillPointsDisplay();
        }
        
        console.log('Alle Attribute und Fertigkeiten auf Minimalwerte zurückgesetzt');
    }

    /**
     * Setzt alle Selektionen zurück und stellt sicher, dass die UI richtig aktualisiert wird
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
        
        // Alle Selects zurücksetzen und Event triggern
        selects.forEach(select => {
            if (select) {
                select.value = '';
                triggerEvent(select, 'change');
            }
        });
        
        // Container für zweite Klasse und zweite Magieschule zurücksetzen
        const secondClassContainer = document.getElementById('second-class-container');
        const secondMagicSchoolContainer = document.getElementById('second-magic-school-container');
        
        if (secondClassContainer) secondClassContainer.style.display = 'none';
        if (secondMagicSchoolContainer) secondMagicSchoolContainer.style.display = 'none';
        
        // Trigger für Custom-Dropdowns
        selects.forEach(select => {
            if (select) {
                const event = new CustomEvent('optionsChanged');
                select.dispatchEvent(event);
            }
        });
        
        // Tooltips entfernen
        const tooltipContainer = document.getElementById('tooltip-container');
        if (tooltipContainer) {
            tooltipContainer.innerHTML = '';
        }
        
        console.log('Alle Auswahloptionen zurückgesetzt');
    }

    /**
     * Verteilt die Hauptattributspunkte zufällig, mit korrektem Event-Handling
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
            triggerEvent(input, 'change');
        });
        
        // Kurze Verzögerung für UI-Updates
        setTimeout(() => {
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
                    triggerEvent(selectedInput, 'change');
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
        }, 100);
    }

    /**
     * Verteilt die Fertigkeitspunkte zufällig mit korrektem Event-Handling
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
            triggerEvent(input, 'change');
        });
        
        // Kurze Verzögerung für UI-Updates
        setTimeout(() => {
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
                    triggerEvent(selectedInput, 'change');
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
        }, 150);
    }

    /**
     * Verbesserte Event-Trigger-Funktion mit verbesserter Unterstützung für Custom-Elemente
     */
    function triggerEvent(element, eventType) {
        if (!element) return;
        
        // Event erstellen und auslösen
        const event = new Event(eventType, { bubbles: true });
        element.dispatchEvent(event);
        
        // Zusätzlich für Custom-Dropdowns (falls vorhanden)
        if (eventType === 'change' && element.tagName === 'SELECT') {
            // Suchen nach einem möglicherweise vorhandenen Custom-Dropdown
            const parent = element.closest('.custom-select-container');
            if (parent) {
                const customButton = parent.querySelector('.custom-select-button');
                if (customButton && element.selectedIndex >= 0) {
                    customButton.textContent = element.options[element.selectedIndex].textContent;
                }
                
                // Auslösen des optionsChanged-Events für Custom-Dropdowns
                const optionsEvent = new CustomEvent('optionsChanged');
                element.dispatchEvent(optionsEvent);
            }
        }
    }

    /**
     * Verteilt Attribut- und Fertigkeitspunkte zufällig mit verbessertem Event-Handling
     */
    function distributeRandomAttributes() {
        // Hauptattribute (KÖ, WI, CH, GL, MA) zufällig verteilen
        distributeMainAttributes();
        
        // Verzögerung vor Verteilung der Fertigkeiten
        setTimeout(() => {
            // Fertigkeiten zufällig verteilen
            distributeSkillPoints();
        }, 150);
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
    function generateFirstName(genderType, culture, dominantVowelGroup) {
        // Erhöhte Chance auf einen vordefinierten, wohlklingenden Namen (30%)
        if (Math.random() < 0.3) {
            return getCommonFirstName(genderType, culture);
        }
        
        // Kulturspezifische Namensbestandteile verwenden (50%)
        if (Math.random() < 0.5) {
            return generateNameFromMorphemes(genderType, culture, dominantVowelGroup, 'first');
        }
        
        // Anzahl der Silben für den Vornamen (1-3, meistens 2)
        let numSyllables;
        const syllableRoll = Math.random();
        if (syllableRoll < 0.2) {
            numSyllables = 1;      // 20% Wahrscheinlichkeit für einsilbig
        } else if (syllableRoll < 0.9) {
            numSyllables = 2;      // 70% Wahrscheinlichkeit für zweisilbig
        } else {
            numSyllables = 3;      // 10% Wahrscheinlichkeit für dreisilbig
        }
        
        // Kulturspezifische Anpassung der Silbenanzahl
        numSyllables = adjustSyllableCountByCulture(numSyllables, culture, 'first');
        
        // Silben generieren mit kulturellem Kontext und Rhythmus
        let name = '';
        let previousSyllable = '';
        let syllableStress = true; // Erste Silbe ist betont
        
        for (let i = 0; i < numSyllables; i++) {
            // Silbe basierend auf Rhythmus und Position generieren
            const syllable = generateImprovedSyllable(
                i === 0, // erste Silbe?
                culture, 
                dominantVowelGroup,
                previousSyllable,
                syllableStress,
                i === numSyllables - 1 // letzte Silbe?
            );
            
            // Vermeiden von Wiederholungen oder Ähnlichkeiten zur vorherigen Silbe
            if (!isSimilarSyllable(syllable, previousSyllable)) {
                name += syllable;
                previousSyllable = syllable;
                syllableStress = !syllableStress; // Wechsel zwischen betont und unbetont
            } else {
                // Bei zu großer Ähnlichkeit erneut generieren
                i--;
            }
        }
        
        // Erste Buchstabe groß schreiben
        name = name.charAt(0).toUpperCase() + name.slice(1);
        
        // Dreifache Buchstaben reduzieren (z.B. "aaa" -> "aa")
        name = reduceTripleLetters(name);
        
        // Überprüfen der Vokal-Konsonant-Verteilung
        if (!hasBalancedPhonetics(name)) {
            // Bei unausgeglichener Verteilung erneut versuchen
            return generateFirstName(genderType, culture, dominantVowelGroup);
        }
        
        // Aussprachefreundlichkeit prüfen
        if (!isPronounceable(name)) {
            // Bei schlecht aussprechbarem Namen erneut versuchen
            return generateFirstName(genderType, culture, dominantVowelGroup);
        }
        
        // Endung basierend auf dem Geschlecht anpassen
        name = applyGenderEnding(name, genderType, culture);
        
        // Länge kontrollieren
        const culturalMaxLength = getMaxFirstNameLength(culture);
        if (name.length > culturalMaxLength) {
            name = name.substring(0, culturalMaxLength);
        }
        
        // Lesbarkeits-Score prüfen
        const readabilityScore = calculateReadabilityScore(name);
        if (readabilityScore < 60) {
            // Bei niedriger Lesbarkeit erneut versuchen
            return generateFirstName(genderType, culture, dominantVowelGroup);
        }
        
        return name;
    }

    /**
     * Generiert einen zufälligen Nachnamen basierend auf der Kultur
     * @param {string} culture - 'germanic', 'romance', 'slavic', 'nordic', 'celtic', 'mixed'
     * @returns {string} Ein zufällig generierter Nachname
     */
    function generateLastName(culture, dominantVowelGroup) {
        // Erhöhte Chance auf einen vordefinierten, wohlklingenden Nachnamen (40%)
        if (Math.random() < 0.4) {
            return getCommonLastName(culture);
        }
        
        // Kulturspezifische Bestandteile verwenden (60%)
        if (Math.random() < 0.6) {
            return generateNameFromMorphemes(null, culture, dominantVowelGroup, 'last');
        }
        
        // Anzahl der Silben für den Nachnamen (2-3, meist 2)
        const numSyllables = Math.random() < 0.8 ? 2 : 3;
        
        // Kulturspezifische Anpassung der Silbenanzahl
        const adjustedSyllables = adjustSyllableCountByCulture(numSyllables, culture, 'last');
        
        // Silben generieren
        let name = '';
        let previousSyllable = '';
        let syllableStress = true; // Erste Silbe ist betont
        
        for (let i = 0; i < adjustedSyllables; i++) {
            // Silbe basierend auf Rhythmus und Position generieren
            const syllable = generateImprovedSyllable(
                i === 0, // erste Silbe?
                culture, 
                dominantVowelGroup,
                previousSyllable,
                syllableStress,
                i === adjustedSyllables - 1 // letzte Silbe?
            );
            
            // Vermeiden von Wiederholungen oder Ähnlichkeiten zur vorherigen Silbe
            if (!isSimilarSyllable(syllable, previousSyllable)) {
                name += syllable;
                previousSyllable = syllable;
                syllableStress = !syllableStress; // Wechsel zwischen betont und unbetont
            } else {
                // Bei zu großer Ähnlichkeit erneut generieren
                i--;
            }
        }
        
        // Erste Buchstabe groß schreiben
        name = name.charAt(0).toUpperCase() + name.slice(1);
        
        // Dreifache Buchstaben reduzieren
        name = reduceTripleLetters(name);
        
        // Überprüfen der Vokal-Konsonant-Verteilung
        if (!hasBalancedPhonetics(name)) {
            // Bei unausgeglichener Verteilung erneut versuchen
            return generateLastName(culture, dominantVowelGroup);
        }
        
        // Aussprachefreundlichkeit prüfen
        if (!isPronounceable(name)) {
            // Bei schlecht aussprechbarem Namen erneut versuchen
            return generateLastName(culture, dominantVowelGroup);
        }
        
        // Kulturspezifische Präfixe und Suffixe hinzufügen (60% Chance)
        if (Math.random() < 0.6) {
            const modifier = getCulturalModifier(culture);
            if (modifier) {
                // Wenn das Präfix nicht leer ist, zuerst die Großschreibung anpassen
                let prefix = modifier.prefix;
                if (prefix && prefix.length > 0) {
                    name = name.charAt(0).toLowerCase() + name.slice(1);
                    prefix = prefix.charAt(0).toUpperCase() + prefix.slice(1);
                }
                name = prefix + name + modifier.suffix;
            }
        }
        
        // Lesbarkeits-Score prüfen
        const readabilityScore = calculateReadabilityScore(name);
        if (readabilityScore < 60) {
            // Bei niedriger Lesbarkeit erneut versuchen
            return generateLastName(culture, dominantVowelGroup);
        }
        
        // Namenslänge begrenzen (maximal 15 Zeichen für Nachnamen)
        if (name.length > 15) {
            name = name.substring(0, 15);
        }
        
        return name;
    }

    /**
     * Passt die Silbenanzahl basierend auf der Kultur an
     * @param {number} syllableCount - Ursprüngliche Silbenanzahl
     * @param {string} culture - Kultureller Stil
     * @param {string} nameType - 'first' oder 'last'
     * @returns {number} Angepasste Silbenanzahl
     */
    function adjustSyllableCountByCulture(syllableCount, culture, nameType) {
        if (nameType === 'first') {
            // Kulturspezifische Anpassungen für Vornamen
            switch (culture) {
                case 'germanic':
                    // Germanische Vornamen sind tendenziell kürzer
                    return Math.min(syllableCount, 2);
                case 'romance':
                    // Romanische Vornamen können länger sein
                    return Math.max(2, syllableCount);
                case 'slavic':
                    // Slawische Vornamen meist 2-3 Silben
                    return Math.min(3, Math.max(2, syllableCount));
                case 'nordic':
                    // Nordische Namen eher kurz
                    return Math.min(syllableCount, 2);
                case 'celtic':
                    // Keltische Namen variabel
                    return syllableCount;
                default:
                    return syllableCount;
            }
        } else {
            // Kulturspezifische Anpassungen für Nachnamen
            switch (culture) {
                case 'germanic':
                    // Germanische Nachnamen oft 2 Silben
                    return 2;
                case 'romance':
                    // Romanische Nachnamen oft 2-3 Silben
                    return Math.min(3, Math.max(2, syllableCount));
                case 'slavic':
                    // Slawische Nachnamen können länger sein
                    return Math.min(3, syllableCount);
                case 'nordic':
                    // Nordische Nachnamen meist 2 Silben
                    return 2;
                case 'celtic':
                    // Keltische Nachnamen oft kurz
                    return Math.min(syllableCount, 2);
                default:
                    return syllableCount;
            }
        }
    }

    /**
     * Berechnet einen Lesbarkeits-Score für einen Namen
     * @param {string} name - Der zu bewertende Name
     * @returns {number} Lesbarkeits-Score (0-100)
     */
    function calculateReadabilityScore(name) {
        if (!name || name.length === 0) return 0;
        
        let score = 100;
        
        // 1. Länge (optimal: 4-10 Zeichen)
        const length = name.length;
        if (length < 3) score -= 30;
        else if (length > 12) score -= (length - 12) * 5;
        
        // 2. Vokal-Konsonant-Verteilung
        const vowels = name.split('').filter(char => isVowel(char)).length;
        const vowelRatio = vowels / length;
        
        // Optimale Verteilung: 40-50% Vokale
        const optimalVowelRatio = 0.45;
        score -= Math.abs(vowelRatio - optimalVowelRatio) * 100;
        
        // 3. Konsonantenhäufungen
        const consonantGroups = name.match(/[^aeiouyøæ]{2,}/gi) || [];
        for (const group of consonantGroups) {
            if (group.length > 2) score -= (group.length - 1) * 10;
        }
        
        // 4. Vokalgruppen
        const vowelGroups = name.match(/[aeiouyøæ]{2,}/gi) || [];
        for (const group of vowelGroups) {
            if (group.length > 2) score -= (group.length - 1) * 10;
        }
        
        // 5. Rhythmus (Wechsel zwischen Vokalen und Konsonanten)
        let rhythmPenalty = 0;
        for (let i = 1; i < name.length; i++) {
            const isCurrentVowel = isVowel(name[i]);
            const isPreviousVowel = isVowel(name[i-1]);
            
            if (isCurrentVowel === isPreviousVowel) {
                rhythmPenalty += 1;
            }
        }
        score -= rhythmPenalty * 2;
        
        // Begrenzen des Scores auf 0-100
        return Math.max(0, Math.min(100, score));
    }

    /**
     * Prüft, ob ein Name gut auszusprechen ist
     * @param {string} name - Der zu prüfende Name
     * @returns {boolean} True, wenn der Name gut auszusprechen ist
     */
    function isPronounceable(name) {
        if (!name || name.length === 0) return false;
        
        // 1. Prüfen auf angemessene Vokalverteilung
        if (!hasBalancedPhonetics(name)) return false;
        
        // 2. Keine 3+ Konsonanten in Folge
        if (/[^aeiouyøæ]{3,}/i.test(name)) return false;
        
        // 3. Keine 3+ Vokale in Folge (Ausnahme: gewisse Kombinationen)
        const allowedVowelGroups = ['aeu', 'aei', 'iou', 'eau', 'oui', 'aie'];
        const vowelGroups = name.match(/[aeiouyøæ]{3,}/gi) || [];
        
        for (const group of vowelGroups) {
            let isAllowed = false;
            for (const allowedGroup of allowedVowelGroups) {
                if (group.includes(allowedGroup)) {
                    isAllowed = true;
                    break;
                }
            }
            if (!isAllowed) return false;
        }
        
        // 4. Keine schwierigen Konsonantenübergänge
        const hardConsonantGroups = getHardConsonantGroups();
        for (const group of hardConsonantGroups) {
            if (name.toLowerCase().includes(group)) return false;
        }
        
        return true;
    }

    /**
     * Prüft, ob ein Text eine ausgewogene Verteilung von Vokalen und Konsonanten hat
     * @param {string} text - Der zu prüfende Text
     * @returns {boolean} True, wenn die Phonetik ausgewogen ist
     */
    function hasBalancedPhonetics(text) {
        const vowels = text.split('').filter(char => isVowel(char)).length;
        const total = text.length;
        
        if (total === 0) return false;
        
        // Vokalanteil zwischen 30% und 60% ist ausgewogen
        const vowelRatio = vowels / total;
        return vowelRatio >= 0.3 && vowelRatio <= 0.6;
    }

    /**
     * Prüft, ob zwei Silben zu ähnlich sind
     * @param {string} syllable1 - Erste Silbe
     * @param {string} syllable2 - Zweite Silbe
     * @returns {boolean} true, wenn die Silben zu ähnlich sind
     */
    function isSimilarSyllable(syllable1, syllable2) {
        if (!syllable1 || !syllable2) return false;
        
        // Exakte Gleichheit
        if (syllable1 === syllable2) return true;
        
        // Sehr ähnliche Länge und gleicher Anfang oder Ende
        if (Math.abs(syllable1.length - syllable2.length) <= 1) {
            // Gleicher Anfang mit mindestens 2 Zeichen
            if (syllable1.substring(0, 2) === syllable2.substring(0, 2)) return true;
            
            // Gleiches Ende mit mindestens 2 Zeichen
            if (syllable1.slice(-2) === syllable2.slice(-2)) return true;
        }
        
        // Hohe Ähnlichkeit der Buchstaben (über 70%)
        const s1 = syllable1.split('');
        const s2 = syllable2.split('');
        const common = s1.filter(char => s2.includes(char)).length;
        const similarity = common / Math.max(s1.length, s2.length);
        
        return similarity > 0.7;
    }

    /**
     * Generiert einen Namen aus vordefinierten kulturspezifischen Morphemen
     * @param {string|null} genderType - Geschlechtstyp (null für Nachnamen)
     * @param {string} culture - Kultureller Stil
     * @param {string} dominantVowelGroup - Dominante Vokalgruppe
     * @param {string} nameType - 'first' oder 'last'
     * @returns {string} Generierter Name aus Morphemen
     */
    function generateNameFromMorphemes(genderType, culture, dominantVowelGroup, nameType) {
        const morphemes = getMorphemesByCulture(culture, genderType, nameType);
        
        // 1-3 Morpheme verwenden, abhängig vom Namenstyp
        const numMorphemes = nameType === 'first' ? 
            (Math.random() < 0.7 ? 1 : 2) : 
            (Math.random() < 0.6 ? 2 : Math.random() < 0.8 ? 1 : 3);
        
        let name = '';
        let previousMorpheme = '';
        
        // Morpheme auswählen und kombinieren
        for (let i = 0; i < numMorphemes; i++) {
            let selectedMorpheme;
            
            if (i === 0) {
                // Erstes Morphem: Präfixe bevorzugen
                const prefixes = morphemes.filter(m => m.position === 'prefix' || m.position === 'any');
                if (prefixes.length > 0) {
                    selectedMorpheme = prefixes[getRandomInt(0, prefixes.length - 1)].value;
                } else {
                    selectedMorpheme = morphemes[getRandomInt(0, morphemes.length - 1)].value;
                }
            } else if (i === numMorphemes - 1) {
                // Letztes Morphem: Suffixe bevorzugen
                const suffixes = morphemes.filter(m => m.position === 'suffix' || m.position === 'any');
                if (suffixes.length > 0) {
                    selectedMorpheme = suffixes[getRandomInt(0, suffixes.length - 1)].value;
                } else {
                    selectedMorpheme = morphemes[getRandomInt(0, morphemes.length - 1)].value;
                }
            } else {
                // Mittlere Morpheme: beliebige Position
                selectedMorpheme = morphemes[getRandomInt(0, morphemes.length - 1)].value;
            }
            
            // Vermeiden von Wiederholungen
            if (selectedMorpheme !== previousMorpheme) {
                // Verbindungsvokal bei Bedarf hinzufügen
                if (name.length > 0 && 
                    !isVowel(name.charAt(name.length - 1)) && 
                    !isVowel(selectedMorpheme.charAt(0))) {
                    // Füge einen Vokal ein, der zur dominanten Vokalgruppe passt
                    const connectingVowels = getHarmonizedVowels('aeiou', dominantVowelGroup);
                    name += connectingVowels[getRandomInt(0, connectingVowels.length - 1)];
                }
                
                name += selectedMorpheme;
                previousMorpheme = selectedMorpheme;
            } else {
                // Bei Wiederholung: erneut versuchen
                i--;
            }
        }
        
        // Erste Buchstabe groß schreiben
        name = name.charAt(0).toUpperCase() + name.slice(1);
        
        // Geschlechtsspezifische Endung für Vornamen hinzufügen
        if (nameType === 'first' && genderType) {
            name = applyGenderEnding(name, genderType, culture);
        }
        
        // Namenslänge begrenzen
        const maxLength = nameType === 'first' ? getMaxFirstNameLength(culture) : 15;
        if (name.length > maxLength) {
            name = name.substring(0, maxLength);
        }
        
        return name;
    }

    /**
     * Liefert kulturspezifische Namenmorpheme
     * @param {string} culture - Kultureller Stil
     * @param {string|null} genderType - Geschlechtstyp (oder null für Nachnamen)
     * @param {string} nameType - 'first' oder 'last'
     * @returns {Array} Liste von Morphemen mit Position
     */
    function getMorphemesByCulture(culture, genderType, nameType) {
        // Basis-Morpheme für Vornamen
        const baseMorphemes = [
            {value: 'an', position: 'any'},
            {value: 'en', position: 'any'},
            {value: 'mar', position: 'prefix'},
            {value: 'el', position: 'any'},
            {value: 'ar', position: 'any'},
            {value: 'on', position: 'suffix'},
            {value: 'al', position: 'any'},
            {value: 'rin', position: 'any'},
            {value: 'tin', position: 'any'}
        ];
        
        // Basis-Morpheme für Nachnamen
        const baseLastNameMorphemes = [
            {value: 'son', position: 'suffix'},
            {value: 'man', position: 'suffix'},
            {value: 'er', position: 'suffix'},
            {value: 'berg', position: 'suffix'},
            {value: 'ton', position: 'suffix'},
            {value: 'field', position: 'suffix'},
            {value: 'land', position: 'suffix'},
            {value: 'wood', position: 'suffix'}
        ];
        
        // Geschlechtsspezifische Morpheme
        const masculineMorphemes = [
            {value: 'rik', position: 'any'},
            {value: 'bert', position: 'suffix'},
            {value: 'jos', position: 'prefix'},
            {value: 'dor', position: 'any'},
            {value: 'jan', position: 'any'},
            {value: 'alex', position: 'prefix'}
        ];
        
        const feminineMorphemes = [
            {value: 'ell', position: 'any'},
            {value: 'ann', position: 'any'},
            {value: 'mar', position: 'prefix'},
            {value: 'lis', position: 'prefix'},
            {value: 'ia', position: 'suffix'},
            {value: 'eth', position: 'suffix'}
        ];
        
        // Kulturspezifische Anpassungen
        let morphemes = [];
        
        if (nameType === 'first') {
            // Für Vornamen
            morphemes = [...baseMorphemes];
            
            // Geschlechtsspezifische Morpheme hinzufügen
            if (genderType === 'masculine') {
                morphemes = [...morphemes, ...masculineMorphemes];
            } else if (genderType === 'feminine') {
                morphemes = [...morphemes, ...feminineMorphemes];
            }
            
            // Kulturspezifische Morpheme für Vornamen
            switch (culture) {
                case 'germanic':
                    morphemes.push(
                        {value: 'hel', position: 'prefix'},
                        {value: 'wald', position: 'suffix'},
                        {value: 'fried', position: 'any'},
                        {value: 'helm', position: 'suffix'},
                        {value: 'ger', position: 'any'}
                    );
                    break;
                case 'romance':
                    morphemes.push(
                        {value: 'gio', position: 'prefix'},
                        {value: 'ell', position: 'any'},
                        {value: 'franc', position: 'prefix'},
                        {value: 'enzo', position: 'suffix'},
                        {value: 'io', position: 'suffix'}
                    );
                    break;
                case 'slavic':
                    morphemes.push(
                        {value: 'mir', position: 'suffix'},
                        {value: 'slav', position: 'any'},
                        {value: 'vla', position: 'prefix'},
                        {value: 'ana', position: 'suffix'},
                        {value: 'ina', position: 'suffix'}
                    );
                    break;
                case 'nordic':
                    morphemes.push(
                        {value: 'thor', position: 'prefix'},
                        {value: 'bjorn', position: 'any'},
                        {value: 'gard', position: 'suffix'},
                        {value: 'ulf', position: 'suffix'},
                        {value: 'lind', position: 'suffix'}
                    );
                    break;
                case 'celtic':
                    morphemes.push(
                        {value: 'bran', position: 'prefix'},
                        {value: 'wen', position: 'suffix'},
                        {value: 'gwyn', position: 'any'},
                        {value: 'conn', position: 'prefix'},
                        {value: 'fin', position: 'prefix'}
                    );
                    break;
            }
        } else {
            // Für Nachnamen
            morphemes = [...baseLastNameMorphemes];
            
            // Kulturspezifische Morpheme für Nachnamen
            switch (culture) {
                case 'germanic':
                    morphemes.push(
                        {value: 'schmidt', position: 'any'},
                        {value: 'meyer', position: 'any'},
                        {value: 'hoff', position: 'prefix'},
                        {value: 'stein', position: 'suffix'},
                        {value: 'wald', position: 'suffix'}
                    );
                    break;
                case 'romance':
                    morphemes.push(
                        {value: 'mont', position: 'prefix'},
                        {value: 'bell', position: 'prefix'},
                        {value: 'etti', position: 'suffix'},
                        {value: 'ini', position: 'suffix'},
                        {value: 'ez', position: 'suffix'}
                    );
                    break;
                case 'slavic':
                    morphemes.push(
                        {value: 'ov', position: 'suffix'},
                        {value: 'ski', position: 'suffix'},
                        {value: 'sky', position: 'suffix'},
                        {value: 'enko', position: 'suffix'},
                        {value: 'ich', position: 'suffix'}
                    );
                    break;
                case 'nordic':
                    morphemes.push(
                        {value: 'son', position: 'suffix'},
                        {value: 'sen', position: 'suffix'},
                        {value: 'gaard', position: 'suffix'},
                        {value: 'holm', position: 'suffix'},
                        {value: 'fjeld', position: 'suffix'}
                    );
                    break;
                case 'celtic':
                    morphemes.push(
                        {value: 'mac', position: 'prefix'},
                        {value: 'mc', position: 'prefix'},
                        {value: "o'", position: 'prefix'},
                        {value: 'ach', position: 'suffix'},
                        {value: 'lynn', position: 'suffix'}
                    );
                    break;
            }
        }
        
        return morphemes;
    }

    /**
     * Bestimmt die maximale Länge für einen Vornamen je nach Kultur
     * @param {string} culture - Kultureller Stil
     * @returns {number} Maximale Namenslänge
     */
    function getMaxFirstNameLength(culture) {
        switch (culture) {
            case 'germanic':
                return 9;
            case 'romance':
                return 10;
            case 'slavic':
                return 12;
            case 'nordic':
                return 8;
            case 'celtic':
                return 10;
            default:
                return 10;
        }
    }


    /**
     * Generiert eine verbesserte Silbe mit höherer Klangqualität
     * @param {boolean} isFirstSyllable - Gibt an, ob es sich um die erste Silbe eines Namens handelt
     * @param {string} culture - Kultureller Stil des Namens
     * @param {string} dominantVowelGroup - Die dominante Vokalgruppe für Vokalharmonie
     * @param {string} previousSyllable - Die vorherige Silbe für bessere Übergänge
     * @param {boolean} isStressed - Gibt an, ob es sich um eine betonte Silbe handelt
     * @param {boolean} isLastSyllable - Gibt an, ob es sich um die letzte Silbe handelt
     * @returns {string} Eine wohlklingende Silbe
     */
    function generateImprovedSyllable(
        isFirstSyllable = false, 
        culture = 'mixed', 
        dominantVowelGroup = 'neutral', 
        previousSyllable = '',
        isStressed = true,
        isLastSyllable = false
    ) {
        // Silbenmuster definieren, abhängig davon, ob es die erste Silbe ist
        let patterns;
        let patternWeights;
        
        if (isFirstSyllable) {
            // Für die erste Silbe: klar und leicht auszusprechen
            patterns = [
                'KV',    // Konsonant-Vokal (am häufigsten)
                'KVK',   // Konsonant-Vokal-Konsonant
                'V',     // Vokal 
                'VK',    // Vokal-Konsonant
            ];
            patternWeights = [6, 3, 1, 2]; // KV bevorzugen für den Anfang
        } else if (isLastSyllable) {
            // Für die letzte Silbe: mehr geschlossene Muster
            patterns = [
                'KV',    // Konsonant-Vokal
                'KVK',   // Konsonant-Vokal-Konsonant (häufiger für Endsilben)
                'VK',    // Vokal-Konsonant
                'V',     // Vokal (selten allein)
            ];
            patternWeights = [3, 5, 3, 1]; // KVK für Endsilben bevorzugen
        } else {
            // Für Silben in der Mitte: ausgewogene Muster
            patterns = [
                'KV',    // Konsonant-Vokal (am häufigsten)
                'KVK',   // Konsonant-Vokal-Konsonant
                'V',     // Vokal (selten allein)
                'VK',    // Vokal-Konsonant
                'KKV',   // Konsonant-Konsonant-Vokal (nur für nicht-erste Silben)
            ];
            patternWeights = [5, 3, 1, 2, 2];
        }
        
        // Kulturabhängige Anpassung der Muster-Wahrscheinlichkeiten
        adjustPatternWeightsByCulture(patternWeights, culture, isLastSyllable);
        
        // Für betonte Silben andere Muster bevorzugen
        if (isStressed) {
            // Betonte Silben haben häufiger einen klaren Konsonant-Vokal-Anfang
            for (let i = 0; i < patterns.length; i++) {
                if (patterns[i].startsWith('K')) {
                    patternWeights[i] += 2;
                }
            }
        }
        
        // Zufälliges Muster auswählen
        const patternIndex = getWeightedRandomIndex(
            Array.from({ length: patterns.length }, (_, i) => i),
            patternWeights
        );
        const pattern = patterns[patternIndex];
        
        // Konsonanten und Vokale passend zur Kultur auswählen
        const { consonants, vowels, initialConsonants, finalConsonants } = getImprovedCharactersByLanguage(culture);
        
        // Spezielle Konsonanten für die erste Silbe
        const firstSyllableSpecialConsonants = getSpecialConsonantsByCulture(culture);
        
        // Konsonantengruppen für reguläre Silben (kulturspezifisch filtern)
        const doubleConsonants = getImprovedDoubleConsonantsByLanguage(culture);
        
        // Vokalgruppen basierend auf dominanter Vokalgruppe
        const vowelGroups = getVowelGroupsByDominantGroup(dominantVowelGroup);
        
        // Letztes Zeichen der vorherigen Silbe für bessere Übergänge
        let precedingChar = '';
        if (previousSyllable && previousSyllable.length > 0) {
            precedingChar = previousSyllable.charAt(previousSyllable.length - 1);
        }
        
        // Verbesserte Übergänge sicherstellen
        const compatibleInitialConsonants = getCompatibleInitialConsonants(initialConsonants, precedingChar);
        const compatibleDoubleConsonants = getCompatibleDoubleConsonants(doubleConsonants, precedingChar);
        
        let syllable = '';
        let patternIndex2 = 0;
        
        while (patternIndex2 < pattern.length) {
            if (pattern[patternIndex2] === 'K') {
                // Behandlung für die erste Silbe mit speziellen Regeln
                if (isFirstSyllable && syllable === '' && pattern.startsWith('K')) {
                    // Bei der ersten Silbe und am Anfang, spezielle Regeln anwenden
                    if (Math.random() < 0.15) {
                        // 15% Chance für spezielle Konsonanten (kulturspezifisch)
                        syllable += firstSyllableSpecialConsonants[getRandomInt(0, firstSyllableSpecialConsonants.length - 1)];
                    } else {
                        // Sonst einen einzelnen initialen Konsonanten (kulturspezifisch)
                        syllable += compatibleInitialConsonants[getRandomInt(0, compatibleInitialConsonants.length - 1)];
                    }
                    patternIndex2++; // Einen Buchstaben im Pattern überspringen
                }
                // Für nicht-erste Silben oder nicht am Anfang stehende Konsonanten
                else if (!isFirstSyllable || syllable !== '') {
                    // Wenn der nächste Buchstabe ebenfalls 'K' ist, verwende eine Konsonantengruppe
                    if (patternIndex2 + 1 < pattern.length && pattern[patternIndex2 + 1] === 'K') {
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
                        syllable += getHarmonizedConsonant(consonants, syllable);
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
                    // Vokalauswahl basierend auf betonter oder unbetonter Silbe
                    const harmonizedVowels = getHarmonizedVowels(vowels, dominantVowelGroup, isStressed);
                    syllable += harmonizedVowels[getRandomInt(0, harmonizedVowels.length - 1)];
                    patternIndex2++;
                }
            }
        }
        
        // Silbenlänge kontrollieren (2-4 Zeichen ideal)
        if (syllable.length > 4) {
            // Bei zu langer Silbe: verkürzen oder erneut generieren
            if (syllable.length === 5 && !isFirstSyllable) {
                // Bei 5 Zeichen: letztes Zeichen entfernen, wenn es kein Vokal ist
                const lastChar = syllable.charAt(syllable.length - 1);
                if (!isVowel(lastChar)) {
                    syllable = syllable.substring(0, syllable.length - 1);
                }
            } else {
                // Bei mehr als 5 Zeichen: erneut generieren
                return generateImprovedSyllable(
                    isFirstSyllable, 
                    culture, 
                    dominantVowelGroup, 
                    previousSyllable,
                    isStressed,
                    isLastSyllable
                );
            }
        }
        
        // Überprüfe und verbessere die Aussprechbarkeit der Silbe
        return improvePronounciation(syllable, culture);
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
     * Liefert spezielle Konsonantenkombinationen für erste Silben je nach Kultur
     * @param {string} culture - Kultureller Stil
     * @returns {Array} Liste mit speziellen Konsonanten für erste Silben
     */
    function getSpecialConsonantsByCulture(culture) {
        // Basis-Konsonanten für Silbenanfänge
        const baseSpecialConsonants = ['sh', 'ch', 'th'];
        
        // Kulturspezifische Anpassungen
        switch (culture) {
            case 'germanic':
                return [...baseSpecialConsonants, 'sch', 'kn', 'ph'];
            case 'romance':
                return [...baseSpecialConsonants, 'qu', 'gi', 'ci'];
            case 'slavic':
                return [...baseSpecialConsonants, 'cz', 'sz', 'zh'];
            case 'nordic':
                return [...baseSpecialConsonants, 'hj', 'bj', 'fj'];
            case 'celtic':
                return [...baseSpecialConsonants, 'rh', 'gw', 'pw'];
            default:
                return baseSpecialConsonants;
        }
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
    function adjustPatternWeightsByCulture(weights, culture, isLastSyllable = false) {
        switch (culture) {
            case 'germanic':
                // Germanische Sprachen: mehr Konsonanten am Ende
                weights[1] += 2; // KVK erhöhen
                if (isLastSyllable) {
                    weights[3] += 2; // VK für Endsilben erhöhen
                }
                break;
            case 'romance':
                // Romanische Sprachen: eher offene Silben
                weights[0] += 2; // KV erhöhen
                if (!isLastSyllable) {
                    weights[2] += 1; // V erhöhen für nicht-letzte Silben
                }
                break;
            case 'slavic':
                // Slawische Sprachen: mehr Konsonantengruppen
                if (weights.length > 4) weights[4] += 2; // KKV erhöhen
                weights[1] += 1; // KVK erhöhen
                break;
            case 'nordic':
                // Nordische Sprachen: mehr geschlossene Silben
                weights[1] += 1; // KVK erhöhen
                if (isLastSyllable) {
                    weights[3] += 2; // VK für Endsilben erhöhen
                }
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
     * Liefert verbesserte Zeichen basierend auf der Kultur zurück
     * @param {string} culture - Kulturtyp
     * @returns {Object} Objekt mit verschiedenen Zeichensätzen
     */
    function getImprovedCharactersByLanguage(culture) {
        // Basis-Zeichensätze
        const baseVowels = 'aeiouy';
        
        // Standard Endkonsonanten
        const baseFinalConsonants = ['m', 'n', 'l', 'r', 's', 't', 'ch', 'th', 'nd'];
        
        // Kulturspezifische Anpassungen
        switch (culture) {
            case 'germanic':
                return {
                    consonants: 'bcdfghjklmnprstvwz'.split(''),
                    vowels: 'aeiouy'.split(''),
                    initialConsonants: 'bdfghjklmnprstvw'.split(''),
                    finalConsonants: [...baseFinalConsonants, 'ck', 'ff', 'ss', 'tz', 'ng', 'd', 'g', 'b']
                };
            case 'romance':
                return {
                    consonants: 'bcdfghjlmnpqrstvz'.split(''),
                    vowels: 'aeiou'.split(''),
                    initialConsonants: 'bcdfglmnprst'.split(''),
                    finalConsonants: [...baseFinalConsonants, 'nt', 'll', 'nn', 'o', 'e', 'a', 'i']
                };
            case 'slavic':
                return {
                    consonants: 'bcdfghjklmnprstvz'.split(''),
                    vowels: 'aeiouy'.split(''),
                    initialConsonants: 'bdfgklmnprstz'.split(''),
                    finalConsonants: [...baseFinalConsonants, 'ch', 'ski', 'sky', 'v', 'k', 'j', 'c', 'z']
                };
            case 'nordic':
                return {
                    consonants: 'bdfghjklmnprstvø'.split(''),
                    vowels: 'aeiouyø'.split(''),
                    initialConsonants: 'bdfghjklmnprst'.split(''),
                    finalConsonants: [...baseFinalConsonants, 'rd', 'sen', 'son', 'rk', 'k', 'g', 'r', 't']
                };
            case 'celtic':
                return {
                    consonants: 'bcdfghjlmnprstvw'.split(''),
                    vowels: 'aeiouy'.split(''),
                    initialConsonants: 'bcdfgklmnprstw'.split(''),
                    finalConsonants: [...baseFinalConsonants, 'nn', 'dd', 'gh', 'th', 'ch', 'n', 'c', 'h']
                };
            case 'mixed':
            default:
                return {
                    consonants: 'bcdfghjklmnpqrstvwxz'.split(''),
                    vowels: baseVowels.split(''),
                    initialConsonants: 'bcdfghjklmnprstvw'.split(''),
                    finalConsonants: baseFinalConsonants
                };
        }
    }

    /**
     * Liefert verbesserte Doppelkonsonanten basierend auf der Kultur
     * @param {string} culture - Kultureller Stil
     * @returns {Array} Liste mit erlaubten Doppelkonsonanten
     */
    function getImprovedDoubleConsonantsByLanguage(culture) {
        // Basisset von Doppelkonsonanten (in den meisten Sprachen üblich)
        const baseDoubleConsonants = ['bl', 'br', 'ch', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'gr', 
                                    'kl', 'kr', 'ph', 'pl', 'pr', 'sc', 'sh', 'sk', 'sl', 
                                    'sp', 'st', 'tr'];
        
        // Kulturspezifische Anpassungen mit Vermeidung schwer aussprechbarer Kombinationen
        switch (culture) {
            case 'germanic':
                return [...baseDoubleConsonants, 'sch', 'pf', 'zw', 'kn', 'gn'];
            case 'romance':
                return [...baseDoubleConsonants, 'll', 'gn', 'cc', 'nn', 'mm', 'tt'];
            case 'slavic':
                return [...baseDoubleConsonants, 'cz', 'sz', 'zh', 'vl', 'kr', 'pr', 'gr', 'br'];
            case 'nordic':
                return [...baseDoubleConsonants, 'bj', 'fj', 'kj', 'sj', 'tj', 'sk', 'ld', 'nd'];
            case 'celtic':
                return [...baseDoubleConsonants, 'mh', 'bh', 'dh', 'gh', 'th', 'rh', 'wh', 'wr'];
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
    function getVowelsForCulture(culture) {
        switch (culture) {
            case 'germanic':
                return ['a', 'e', 'i', 'o', 'u', 'e'];
            case 'romance':
                return ['a', 'e', 'i', 'o', 'u', 'a', 'e'];
            case 'slavic':
                return ['a', 'e', 'i', 'o', 'u', 'y', 'e'];
            case 'nordic':
                return ['a', 'e', 'i', 'o', 'u', 'ø', 'a', 'e'];
            case 'celtic':
                return ['a', 'e', 'i', 'o', 'u', 'y', 'a', 'e'];
            default:
                return ['a', 'e', 'i', 'o', 'u', 'e'];
        }
    }

    /**
     * Liefert harmonisierte Vokale basierend auf der dominanten Gruppe zurück
     * @param {string} vowels - Verfügbare Vokale
     * @param {string} dominantGroup - Dominante Vokalgruppe
     * @param {boolean} isStressed - Ob die Silbe betont ist
     * @returns {Array} Harmonisierte Vokale
     */
    function getHarmonizedVowels(vowels, dominantGroup, isStressed = true) {
        const frontVowels = ['e', 'i', 'y'];
        const backVowels = ['a', 'o', 'u'];
        
        // Stelle sicher, dass vowels ein Array ist
        const allVowels = Array.isArray(vowels) ? vowels : vowels.split('');
        
        // Bei betonter Silbe klare Vokale bevorzugen
        let preferredVowels;
        
        if (isStressed) {
            // Klare Vokale für betonte Silben
            preferredVowels = ['a', 'e', 'i', 'o', 'u'];
        } else {
            // Für unbetonte Silben neutralere Vokale
            preferredVowels = ['e', 'a', 'i'];
        }
        
        // Dominante Gruppe berücksichtigen
        switch (dominantGroup) {
            case 'front':
                // Höhere Wahrscheinlichkeit für vordere Vokale
                return preferredVowels.filter(v => frontVowels.includes(v) || Math.random() < 0.3);
            case 'back':
                // Höhere Wahrscheinlichkeit für hintere Vokale
                return preferredVowels.filter(v => backVowels.includes(v) || Math.random() < 0.3);
            case 'neutral':
            default:
                // Bei neutraler Gruppe eine ausgewogene Mischung
                return preferredVowels.length > 0 ? preferredVowels : allVowels;
        }
    }

    /**
     * Wählt einen Konsonanten, der gut zum bisherigen Silbeninhalt passt
     * @param {Array} consonants - Verfügbare Konsonanten
     * @param {string} currentSyllable - Aktueller Inhalt der Silbe
     * @returns {string} Ein harmonisierter Konsonant
     */
    function getHarmonizedConsonant(consonants, currentSyllable) {
        // Prüfen, ob die Silbe bereits einen harten oder weichen Konsonanten enthält
        const hardConsonants = ['k', 't', 'p', 'g', 'd', 'b'];
        const softConsonants = ['l', 'm', 'n', 'r', 'w'];
        
        let hasHardConsonant = false;
        let hasSoftConsonant = false;
        
        for (const char of currentSyllable) {
            if (hardConsonants.includes(char.toLowerCase())) {
                hasHardConsonant = true;
            } else if (softConsonants.includes(char.toLowerCase())) {
                hasSoftConsonant = true;
            }
        }
        
        // Bevorzugte Konsonanten basierend auf dem Silbeninhalt
        let preferredConsonants;
        
        if (hasHardConsonant && !hasSoftConsonant) {
            // Nach hartem Konsonant bevorzugt einen weichen
            preferredConsonants = consonants.filter(c => softConsonants.includes(c.toLowerCase()));
        } else if (!hasHardConsonant && hasSoftConsonant) {
            // Nach weichem Konsonant bevorzugt einen harten
            preferredConsonants = consonants.filter(c => hardConsonants.includes(c.toLowerCase()));
        } else {
            // Keine Präferenz
            preferredConsonants = consonants;
        }
        
        // Falls keine passenden Konsonanten gefunden wurden, verwende alle
        if (preferredConsonants.length === 0) {
            preferredConsonants = consonants;
        }
        
        return preferredConsonants[getRandomInt(0, preferredConsonants.length - 1)];
    }

    /**
     * Wählt kompatible Anlautkonsonanten basierend auf dem vorherigen Zeichen
     * @param {Array} initialConsonants - Verfügbare Anlautkonsonanten
     * @param {string} precedingChar - Vorheriges Zeichen
     * @returns {Array} Gefilterte Anlautkonsonanten
     */
    function getCompatibleInitialConsonants(initialConsonants, precedingChar) {
        if (!precedingChar) {
            return initialConsonants;
        }
        
        // Wenn das vorherige Zeichen ein Vokal ist, sind alle Konsonanten kompatibel
        if (isVowel(precedingChar)) {
            return initialConsonants;
        }
        
        // Definiere problematische Übergänge
        const hardTransitions = {
            'k': ['g', 'q', 'c', 'k'],
            'g': ['k', 'q', 'c', 'g'],
            't': ['d', 't'],
            'd': ['t', 'd'],
            'p': ['b', 'p'],
            'b': ['p', 'b'],
            's': ['z', 's', 'c'],
            'z': ['s', 'z'],
            'r': ['l', 'r'],
            'l': ['r', 'l'],
            'n': ['m', 'n'],
            'm': ['n', 'm']
        };
        
        // Liste der zu vermeidenden Konsonanten für den aktuellen Übergang
        const avoidConsonants = hardTransitions[precedingChar.toLowerCase()] || [];
        
        // Filtere kompatible Konsonanten
        return initialConsonants.filter(consonant => {
            const firstChar = consonant.charAt(0).toLowerCase();
            return !avoidConsonants.includes(firstChar);
        });
    }

    /**
     * Filtert Doppelkonsonanten, die gut mit dem vorherigen Konsonanten harmonieren
     * @param {Array} doubleConsonants - Liste verfügbarer Doppelkonsonanten
     * @param {string} previousConsonant - Vorheriger Konsonant
     * @returns {Array} Gefilterte Doppelkonsonanten
     */
    function getCompatibleDoubleConsonants(doubleConsonants, precedingChar) {
        if (!precedingChar) {
            return doubleConsonants;
        }
        
        // Wenn das vorherige Zeichen ein Vokal ist, sind alle Kombinationen erlaubt
        if (isVowel(precedingChar)) {
            return doubleConsonants;
        }
        
        // Liste schwieriger Übergänge zwischen Konsonanten
        const hardCombinations = [
            'kp', 'gb', 'tp', 'dt', 'lr', 'rl', 'nm', 'mn', 'kx', 'xs', 'zp',
            'bp', 'pb', 'td', 'dt', 'kg', 'gk', 'cs', 'sc', 'jj', 'qk', 'kq',
            'vf', 'fv', 'vw', 'wv', 'mx', 'xm', 'zs', 'sz', 'pc', 'cp'
        ];
        
        // Vermeidung ähnlicher Konsonanten in Folge
        return doubleConsonants.filter(dc => {
            const combination = precedingChar.toLowerCase() + dc.charAt(0).toLowerCase();
            return !hardCombinations.includes(combination);
        });
    }

    /**
     * Verbessert die Aussprache einer Silbe unter Berücksichtigung der Kultur
     * @param {string} syllable - Die zu verbessernde Silbe
     * @param {string} culture - Kultureller Stil
     * @returns {string} Verbesserte Silbe
     */
    function improvePronounciation(syllable, culture) {
        // Vermeide drei gleiche Buchstaben in Folge
        syllable = reduceTripleLetters(syllable);
        
        // Stelle sicher, dass die Silbe einen Vokal enthält
        if (!hasVowel(syllable)) {
            // Füge einen passenden Vokal in der Mitte ein
            const vowelsForCulture = getVowelsForCulture(culture);
            const vowel = vowelsForCulture[getRandomInt(0, vowelsForCulture.length - 1)];
            const middle = Math.floor(syllable.length / 2);
            syllable = syllable.substring(0, middle) + vowel + syllable.substring(middle);
        }
        
        // Vermeidung schwer auszusprechender Konsonantengruppen
        const hardConsonantGroups = getHardConsonantGroups();
        
        for (const group of hardConsonantGroups) {
            if (syllable.includes(group)) {
                // Ersetze durch eine besser aussprechbare Alternative
                const replacements = getConsonantGroupReplacements(group, culture);
                const replacement = replacements[getRandomInt(0, replacements.length - 1)];
                syllable = syllable.replace(group, replacement);
            }
        }
        
        return syllable;
    }

    /**
     * Liefert Ersetzungen für schwierige Konsonantengruppen
     * @param {string} group - Schwierige Konsonantengruppe
     * @param {string} culture - Kultureller Stil
     * @returns {Array} Mögliche Ersetzungen
     */
    function getConsonantGroupReplacements(group, culture) {
        // Basis-Ersetzungen
        const baseReplacements = {
            'tl': ['t', 'tr', 'tl'],
            'kp': ['k', 'kl', 'p'],
            'gb': ['g', 'b'],
            'tp': ['t', 'p'],
            'dt': ['t', 'd'],
            'lr': ['l', 'r'],
            'rl': ['r', 'l'],
            'nm': ['n', 'm'],
            'mn': ['m', 'n'],
            'kx': ['k', 'x'],
            'xs': ['s', 'x'],
            'zp': ['z', 'p'],
            'bp': ['b', 'p'],
            'pb': ['p', 'b'],
            'td': ['t', 'd'],
            'dt': ['d', 't'],
            'kg': ['k', 'g'],
            'gk': ['g', 'k'],
            'cs': ['c', 's'],
            'qk': ['k', 'qu'],
            'kq': ['k', 'q'],
            'vf': ['v', 'f'],
            'fv': ['f', 'v'],
            'jj': ['j']
        };
        
        // Fallback
        if (!baseReplacements[group]) {
            return [group.charAt(0)];
        }
        
        // Kulturspezifische Anpassungen hinzufügen
        let replacements = [...baseReplacements[group]];
        
        switch (culture) {
            case 'germanic':
                // In germanischen Sprachen bestimmte Kombinationen bevorzugen
                if (group === 'kp') replacements.push('kf');
                if (group === 'dt') replacements.push('tt');
                break;
            case 'romance':
                // In romanischen Sprachen andere Konsonanten bevorzugen
                if (group === 'cs') replacements.push('cc');
                if (group === 'lr') replacements.push('ll');
                break;
            case 'slavic':
                // In slawischen Sprachen bestimmte Kombinationen erlauben
                if (group === 'kp') replacements.push('kp');
                if (group === 'zp') replacements.push('zp');
                break;
        }
        
        return replacements;
    }

    /**
     * Liefert schwer auszusprechende Konsonantengruppen
     * @returns {Array} Schwierige Konsonantengruppen
     */
    function getHardConsonantGroups() {
        return ['tl', 'kp', 'gb', 'tp', 'dt', 'lr', 'rl', 'nm', 'mn', 'kx', 'xs', 'zp',
                'bp', 'pb', 'td', 'dt', 'kg', 'gk', 'cs', 'qk', 'kq', 'vf', 'fv', 'jj'];
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
     * Wendet eine geschlechtsspezifische Endung auf einen Namen an (verbessert)
     * @param {string} name - Der Name
     * @param {string} genderType - Geschlechtstyp
     * @param {string} culture - Kultureller Stil
     * @returns {string} Name mit passender Endung
     */
    function applyGenderEnding(name, genderType, culture) {
        // Prüfen, ob der Name bereits eine passende Endung hat
        if (hasGenderSpecificEnding(name, genderType, culture)) {
            return name;
        }
        
        // Geschlechtsspezifische Endungen nach Kultur
        const endings = getCultureSpecificGenderEndings(culture, genderType);
        
        // Keine Endungen verfügbar oder neutrales Geschlecht
        if (endings.length === 0 || genderType === 'neutral') {
            return name;
        }
        
        // Zufällige Endung auswählen
        const ending = endings[getRandomInt(0, endings.length - 1)];
        
        // Entfernen problematischer Endungen, die die Aussprache erschweren würden
        let baseName = name;
        const problematicEndChars = 2; // Anzahl der zu prüfenden Endzeichen
        
        if (name.length > problematicEndChars) {
            const nameEnd = name.slice(-problematicEndChars);
            
            // Prüfen auf Endungen, die mit der neuen Endung Konflikte erzeugen würden
            const problematicEndings = getProblematicEndingsForCulture(culture, ending);
            
            for (const problematicEnd of problematicEndings) {
                if (nameEnd.endsWith(problematicEnd)) {
                    // Endung entfernen, die Konflikte erzeugen würde
                    baseName = name.slice(0, -problematicEnd.length);
                    break;
                }
            }
        }
        
        // Verbindungsvokal bei Bedarf hinzufügen
        if (baseName.length > 0 && 
            !isVowel(baseName.charAt(baseName.length - 1)) && 
            ending.length > 0 && !isVowel(ending.charAt(0))) {
            // Füge einen Vokal ein, der zur Kultur passt
            const connectingVowels = getVowelsForCulture(culture);
            const connectingVowel = connectingVowels[getRandomInt(0, connectingVowels.length - 1)];
            baseName += connectingVowel;
        }
        
        return baseName + ending;
    }

    /**
     * Liefert problematische Endungen, die mit einer neuen Endung Konflikte erzeugen würden
     * @param {string} culture - Kultureller Stil
     * @param {string} newEnding - Neue Endung, die hinzugefügt werden soll
     * @returns {Array} Liste problematischer Endungen
     */
    function getProblematicEndingsForCulture(culture, newEnding) {
        // Allgemeine problematische Endungen
        const baseProblematicEndings = ['a', 'e', 'i', 'o', 'u'];
        
        // Wenn die neue Endung mit einem Vokal beginnt, sind Endkonsonanten weniger problematisch
        if (newEnding.length > 0 && isVowel(newEnding[0])) {
            return baseProblematicEndings;
        }
        
        // Kulturspezifische Anpassungen
        switch (culture) {
            case 'germanic':
                return [...baseProblematicEndings, 'er', 'en', 'el', 'in'];
            case 'romance':
                return [...baseProblematicEndings, 'o', 'i', 'e', 'a'];
            case 'slavic':
                return [...baseProblematicEndings, 'ov', 'ev', 'in', 'na'];
            case 'nordic':
                return [...baseProblematicEndings, 'son', 'sen', 'dottir'];
            case 'celtic':
                return [...baseProblematicEndings, 'an', 'on', 'yn', 'en'];
            default:
                return baseProblematicEndings;
        }
    }

    /**
     * Prüft, ob ein Zeichen ein Vokal ist (verbessert)
     * @param {string} char - Zu prüfendes Zeichen
     * @returns {boolean} True, wenn es ein Vokal ist
     */
    function isVowel(char) {
        return /[aeiouyøæäöüåèéêëìíîïòóôõùúûüÿ]/i.test(char);
    }

    /**
     * Prüft, ob ein Name bereits eine geschlechtstypische Endung hat
     * @param {string} name - Der zu prüfende Name
     * @param {string} genderType - Geschlechtstyp
     * @param {string} culture - Kultureller Stil
     * @returns {boolean} True, wenn bereits eine passende Endung vorhanden
     */
    function hasGenderSpecificEnding(name, genderType, culture) {
        if (name.length < 2) return false;
        
        // Kulturspezifische Endungsüberprüfung
        const endings = getCultureSpecificGenderEndings(culture, genderType);
        
        // Prüfen, ob der Name bereits mit einer der Endungen endet
        for (const ending of endings) {
            if (ending.length > 0 && name.toLowerCase().endsWith(ending.toLowerCase())) {
                return true;
            }
        }
        
        // Allgemeine Endungsprüfung
        if (genderType === 'feminine') {
            return /[ae]$|(ne|ia|ine|elle|ette|lyn|anne|ina|ita|ella)$/i.test(name);
        } else if (genderType === 'masculine') {
            return /(er|us|o|an|en|in|ard|bert|mund|ik|on|ey|ian|rick|io|or)$/i.test(name);
        }
        
        return true; // Neutrale Namen brauchen keine spezifische Endung
    }

    /**
     * Gibt kulturspezifische geschlechtsspezifische Endungen zurück (erweitert)
     * @param {string} culture - Kultureller Stil
     * @param {string} genderType - Geschlechtstyp
     * @returns {Array} Liste von passenden Endungen
     */
    function getCultureSpecificGenderEndings(culture, genderType) {
        // Für neutrale Namen keine spezifischen Endungen
        if (genderType === 'neutral') {
            return [];
        }
        
        // Basis-Endungen
        const baseFeminineEndings = ['a', 'ia', 'ina', 'elle'];
        const baseMasculineEndings = ['o', 'us', 'an', 'in', 'er'];
        
        // Kulturspezifische Anpassungen
        switch (culture) {
            case 'germanic':
                if (genderType === 'feminine') {
                    return [...baseFeminineEndings, 'e', 'ilde', 'ina', 'hild', 'traud', 'gard'];
                } else if (genderType === 'masculine') {
                    return [...baseMasculineEndings, 'bert', 'wald', 'rich', 'mund', 'helm', 'mar', 'win'];
                }
                break;
                
            case 'romance':
                if (genderType === 'feminine') {
                    return [...baseFeminineEndings, 'etta', 'ella', 'ina', 'ita', 'ice', 'ette', 'iana'];
                } else if (genderType === 'masculine') {
                    return [...baseMasculineEndings, 'io', 'ino', 'ero', 'ico', 'iano', 'etto', 'ando'];
                }
                break;
                
            case 'slavic':
                if (genderType === 'feminine') {
                    return [...baseFeminineEndings, 'ya', 'ova', 'ka', 'ina', 'ana', 'aya', 'eva'];
                } else if (genderType === 'masculine') {
                    return [...baseMasculineEndings, 'ov', 'sky', 'ski', 'vich', 'mir', 'slav', 'ko'];
                }
                break;
                
            case 'nordic':
                if (genderType === 'feminine') {
                    return [...baseFeminineEndings, 'dottir', 'borg', 'lind', 'hild', 'veig', 'frid', 'gerd'];
                } else if (genderType === 'masculine') {
                    return [...baseMasculineEndings, 'son', 'sen', 'heim', 'thor', 'ulf', 'sten', 'bjorn'];
                }
                break;
                
            case 'celtic':
                if (genderType === 'feminine') {
                    return [...baseFeminineEndings, 'wen', 'wyn', 'eth', 'ona', 'een', 'iona', 'anna'];
                } else if (genderType === 'masculine') {
                    return [...baseMasculineEndings, 'wyn', 'ach', 'bran', 'dor', 'gan', 'lan', 'dyn'];
                }
                break;
                
            default:
                if (genderType === 'feminine') {
                    return baseFeminineEndings;
                } else if (genderType === 'masculine') {
                    return baseMasculineEndings;
                }
                break;
        }
        
        return [];
    }

    /**
     * Gibt einen kulturellen Modifikator für Nachnamen zurück (verbessert)
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
                    {prefix: '', suffix: 'feld'},
                    {prefix: '', suffix: 'bach'},
                    {prefix: '', suffix: 'hoff'}
                ];
                return germanicModifiers[getRandomInt(0, germanicModifiers.length - 1)];
                
            case 'romance':
                const romanceModifiers = [
                    {prefix: 'de ', suffix: ''},
                    {prefix: 'di ', suffix: ''},
                    {prefix: '', suffix: 'ez'},
                    {prefix: '', suffix: 'elli'},
                    {prefix: '', suffix: 'ini'},
                    {prefix: '', suffix: 'ola'},
                    {prefix: '', suffix: 'ino'},
                    {prefix: '', suffix: 'etti'}
                ];
                return romanceModifiers[getRandomInt(0, romanceModifiers.length - 1)];
                
            case 'slavic':
                const slavicModifiers = [
                    {prefix: '', suffix: 'ov'},
                    {prefix: '', suffix: 'ev'},
                    {prefix: '', suffix: 'ski'},
                    {prefix: '', suffix: 'sky'},
                    {prefix: '', suffix: 'ich'},
                    {prefix: '', suffix: 'enko'},
                    {prefix: '', suffix: 'in'},
                    {prefix: '', suffix: 'ko'}
                ];
                return slavicModifiers[getRandomInt(0, slavicModifiers.length - 1)];
                
            case 'nordic':
                const nordicModifiers = [
                    {prefix: '', suffix: 'son'},
                    {prefix: '', suffix: 'sen'},
                    {prefix: '', suffix: 'dottir'},
                    {prefix: '', suffix: 'gaard'},
                    {prefix: '', suffix: 'holm'},
                    {prefix: '', suffix: 'dal'},
                    {prefix: '', suffix: 'lund'},
                    {prefix: '', suffix: 'fjord'}
                ];
                return nordicModifiers[getRandomInt(0, nordicModifiers.length - 1)];
                
            case 'celtic':
                const celticModifiers = [
                    {prefix: 'Mc', suffix: ''},
                    {prefix: 'Mac', suffix: ''},
                    {prefix: 'O\'', suffix: ''},
                    {prefix: 'Ap ', suffix: ''},
                    {prefix: '', suffix: 'ach'},
                    {prefix: '', suffix: 'ley'},
                    {prefix: '', suffix: 'an'},
                    {prefix: '', suffix: 'ey'}
                ];
                return celticModifiers[getRandomInt(0, celticModifiers.length - 1)];
                
            case 'mixed':
                // Bei gemischter Kultur eine zufällige aus allen Kulturen wählen
                const cultures = ['germanic', 'romance', 'slavic', 'nordic', 'celtic'];
                const randomCulture = cultures[getRandomInt(0, cultures.length - 1)];
                return getCulturalModifier(randomCulture);
                
            default:
                return null;
        }
    }

    /**
     * Gibt einen häufigen Vornamen basierend auf Geschlecht und Kultur zurück (erweitert)
     * @param {string} genderType - Geschlechtstyp
     * @param {string} culture - Kultureller Stil
     * @returns {string} Ein gebräuchlicher Vorname
     */
    function getCommonFirstName(genderType, culture) {
        // Gemeinsame Namen für jede Kultur
        const names = {
            'germanic': {
                'masculine': ['Hans', 'Otto', 'Karl', 'Friedrich', 'Wilhelm', 'Heinrich', 'Ludwig', 'Walter', 'Max', 
                            'Kurt', 'Dieter', 'Thomas', 'Wolfgang', 'Markus', 'Stefan', 'Klaus', 'Peter', 'Johann',
                            'Albert', 'August', 'Axel', 'Bernd', 'Bernhard', 'Bruno', 'Christian', 'Christoph', 'Conrad',
                            'David', 'Dennis', 'Dirk', 'Eberhard', 'Edmund', 'Eduard', 'Egon', 'Elias', 'Emil', 'Erhard',
                            'Erik', 'Ernst', 'Erwin', 'Eugen', 'Fabian', 'Felix', 'Ferdinand', 'Florian', 'Frank',
                            'Franz', 'Frederik', 'Georg', 'Gerald', 'Gerhard', 'Günter', 'Günther', 'Gustav', 'Hannes',
                            'Harald', 'Hartmut', 'Heiko', 'Heinz', 'Helmut', 'Herbert', 'Herman', 'Holger', 'Horst',
                            'Hubert', 'Hugo', 'Ingo', 'Jakob', 'Jan', 'Jens', 'Joachim', 'Jonas', 'Josef', 'Jörg',
                            'Jürgen', 'Karsten', 'Kaspar', 'Kilian', 'Konrad', 'Konstantin', 'Leonhard', 'Lothar',
                            'Lukas', 'Manfred', 'Marcel', 'Martin', 'Mathias', 'Matthias', 'Michael', 'Moritz',
                            'Nico', 'Niklas', 'Nils', 'Norbert', 'Oliver', 'Oskar', 'Paul', 'Rainer', 'Ralf',
                            'Reiner', 'Richard', 'Robert', 'Rolf', 'Rudolph', 'Rüdiger', 'Sebastian', 'Siegfried',
                            'Simon', 'Theodor', 'Thorsten', 'Tobias', 'Ulrich', 'Uwe', 'Viktor', 'Werner', 'Winfried'],
                'feminine': ['Anna', 'Helga', 'Gerda', 'Heidi', 'Ingrid', 'Frieda', 'Ursula', 'Greta', 'Maria',
                            'Brigitte', 'Monika', 'Claudia', 'Sabine', 'Katharina', 'Elisabeth', 'Johanna', 'Emma',
                            'Adelheid', 'Agnes', 'Alexandra', 'Amalia', 'Andrea', 'Angelika', 'Anita', 'Anke', 'Annegret',
                            'Annelies', 'Annette', 'Antje', 'Barbara', 'Beate', 'Berta', 'Bertha', 'Bettina', 'Birgit',
                            'Brunhilde', 'Caroline', 'Charlotte', 'Christa', 'Christina', 'Christine', 'Christiane', 'Clara',
                            'Dagmar', 'Daniela', 'Dora', 'Dorothea', 'Edith', 'Eleonore', 'Elfriede', 'Elisa',
                            'Elke', 'Ella', 'Ellen', 'Elsa', 'Emilie', 'Erika', 'Erna', 'Eva', 'Evelyn',
                            'Franziska', 'Frederike', 'Gabriele', 'Gertrud', 'Gisela', 'Gudrun', 'Hannelore', 'Hedwig',
                            'Helena', 'Helene', 'Henriette', 'Hermine', 'Herta', 'Hildegard', 'Ilse', 'Inge',
                            'Irmgard', 'Jana', 'Jennifer', 'Julia', 'Juliane', 'Jutta', 'Karin', 'Karla', 'Karoline',
                            'Katja', 'Klara', 'Kornelia', 'Kristina', 'Lena', 'Lieselotte', 'Lina', 'Lisa', 'Lore',
                            'Lotte', 'Louise', 'Luise', 'Magda', 'Magdalena', 'Margarete', 'Margot', 'Marianne', 'Martha',
                            'Martina', 'Mathilde', 'Mechthild', 'Minna', 'Miriam', 'Nadine', 'Nina', 'Olga', 'Paula', 'Ruth'],
                'neutral': ['Kim', 'Alex', 'Kai', 'Robin', 'Mika', 'Luca', 'Sascha', 'Toni', 'Nikita', 'René',
                           'Adrian', 'Alexis', 'Andy', 'Arin', 'Ashley', 'Benny', 'Björn', 'Charlie', 'Chris', 'Conny',
                           'Dana', 'Deniz', 'Dominique', 'Eden', 'Eli', 'Elia', 'Emery', 'Emi', 'Flo', 'Fin',
                           'Francis', 'Frankie', 'Gabriel', 'Glenn', 'Hadar', 'Hayden', 'Henni', 'Inge', 'Ilya',
                           'Jamie', 'Jan', 'Jesse', 'Jo', 'Jody', 'Joey', 'Jules', 'Julian', 'Kaya', 'Kerry',
                           'Kris', 'Lee', 'Leonie', 'Lenny', 'Leslie', 'Lian', 'Liv', 'Loki', 'Lou', 'Loup',
                           'Lucky', 'Lynn', 'Mani', 'Marie', 'Marion', 'Marlow', 'Max', 'Mel', 'Melle', 'Merry',
                           'Michele', 'Mio', 'Morgan', 'Nicki', 'Nico', 'Noel', 'Nour', 'Nuri', 'Odell', 'Ollie',
                           'Pam', 'Parker', 'Pascal', 'Pat', 'Peace', 'Phoenix', 'Quinn', 'Rain', 'Raven', 'Ray',
                           'Reese', 'Reggie', 'River', 'Rowan', 'Sage', 'Sam', 'Shay', 'Sidney', 'Sky', 'Skye',
                           'Sunny', 'Sven', 'Tari', 'Taylor', 'Tilian', 'Timmy', 'Tobi', 'Tony', 'Vic', 'Wave']
            },
            'romance': {
                'masculine': ['Marco', 'Giovanni', 'Antonio', 'Roberto', 'Miguel', 'Carlos', 'Pierre', 'Louis', 'Paulo',
                            'Francesco', 'Luigi', 'Matteo', 'Ricardo', 'Diego', 'Jean', 'Philippe', 'Emilio', 'Dominic',
                            'Adriano', 'Alberto', 'Alejandro', 'Alessandro', 'Alfonso', 'Alfredo', 'Alonso', 'Amadeo', 'André',
                            'Angelo', 'Armando', 'Arnaud', 'Arturo', 'Augusto', 'Baptiste', 'Benito', 'Bernardo', 'Bruno',
                            'Carmine', 'César', 'Christian', 'Claudio', 'Cristiano', 'Damiano', 'Daniele', 'Dante', 'Dario',
                            'David', 'Eduardo', 'Enrico', 'Enzo', 'Esteban', 'Fabio', 'Fabrizio', 'Federico', 'Felipe',
                            'Felix', 'Fernando', 'Filippo', 'Flavio', 'Florence', 'Franco', 'Gabriel', 'Giacomo', 'Gianluigi',
                            'Gilles', 'Giorgio', 'Giulio', 'Gonzalo', 'Gregorio', 'Guillermo', 'Gustavo', 'Henri', 'Hernando',
                            'Hugo', 'Ignacio', 'Javier', 'Jorge', 'José', 'Jules', 'Julian', 'Laurent', 'Leonardo',
                            'Lorenzo', 'Luca', 'Lucas', 'Luciano', 'Manuel', 'Marcello', 'Marcelo', 'Mario', 'Massimo',
                            'Maurizio', 'Mauro', 'Maxime', 'Michel', 'Nicolás', 'Olivier', 'Pablo', 'Pascal', 'Pasquale',
                            'Patricio', 'Rafael', 'Raúl', 'Rémy', 'Renato', 'Renzo', 'Riccardo', 'Rodrigo', 'Romano',
                            'Rubén', 'Salvador', 'Santiago', 'Sergio', 'Silvio', 'Stefano', 'Théo', 'Tomás', 'Umberto', 'Vincenzo'],
                'feminine': ['Maria', 'Sofia', 'Isabella', 'Lucia', 'Carmen', 'Sophia', 'Elena', 'Juliette', 'Francesca',
                            'Valentina', 'Chiara', 'Carmela', 'Gabriella', 'Adriana', 'Alessia', 'Bianca', 'Nicole',
                            'Adela', 'Agata', 'Agnès', 'Alba', 'Alicia', 'Alma', 'Amalia', 'Amélie', 'Ana', 'Angelica',
                            'Antonia', 'Antonella', 'Aria', 'Arianna', 'Aurora', 'Beatrice', 'Béatrice', 'Benedetta',
                            'Benita', 'Camila', 'Carla', 'Carolina', 'Catalina', 'Caterina', 'Cecilia', 'Celeste', 'Céline',
                            'Clara', 'Claudia', 'Concetta', 'Constanza', 'Cristina', 'Daniela', 'Delphine', 'Diana', 'Dolores',
                            'Donatella', 'Dulce', 'Eleonora', 'Elisa', 'Elisabetta', 'Emanuela', 'Emilia', 'Esmeralda', 'Estela',
                            'Estelle', 'Eva', 'Fabiola', 'Federica', 'Felicia', 'Fernanda', 'Fiamma', 'Fiorella', 'Flavia',
                            'Flora', 'Franca', 'Gemma', 'Gianna', 'Giovanna', 'Giulia', 'Gloria', 'Graciela', 'Greta',
                            'Ida', 'Inés', 'Irene', 'Isabel', 'Josefina', 'Josephine', 'Laura', 'Liliana', 'Livia',
                            'Lorena', 'Lourdes', 'Lucía', 'Luciana', 'Luisa', 'Luna', 'Manuela', 'Marcela', 'Margherita',
                            'Margot', 'Mariana', 'Mariangela', 'Marie', 'Mariella', 'Marina', 'Marisol', 'Marta', 'Martina',
                            'Mercedes', 'Michela', 'Milena', 'Monica', 'Natalia', 'Nina', 'Noemi', 'Paola', 'Patricia', 'Paula'],
                'neutral': ['Andrea', 'Simone', 'Dominique', 'Claude', 'Michele', 'Noël', 'Alex', 'Lou', 'Camille',
                           'Amour', 'Ariel', 'Alix', 'Bellamy', 'Benoît', 'Brice', 'Ciel', 'Clément', 'Coeur', 'Constant',
                           'Corentin', 'Dale', 'Dani', 'Danièle', 'Eli', 'Elian', 'Elio', 'Ely', 'Enzo', 'Fidèle',
                           'Fleur', 'France', 'Gabi', 'Gaël', 'Germain', 'Gianni', 'Gigi', 'Gino', 'Giulio', 'Grace',
                           'Hélène', 'Innocent', 'Iry', 'Italo', 'Jackie', 'Jade', 'Jamie', 'Jamy', 'Joey', 'Jordi',
                           'José', 'Jule', 'Julien', 'Kari', 'Kilian', 'Lael', 'Lenny', 'Leone', 'Lesley', 'Lian',
                           'Lior', 'Loren', 'Lucien', 'Manon', 'Manu', 'Marcel', 'Marley', 'Marti', 'Matisse', 'Maxime',
                           'Michel', 'Morgan', 'Neri', 'Nico', 'Nino', 'Nova', 'Océane', 'Oli', 'Olivie', 'Orso',
                           'Pascal', 'Patrice', 'Phoenix', 'Pino', 'Quinn', 'René', 'Rio', 'Roan', 'Robin', 'Roma',
                           'Romy', 'Rosario', 'Sam', 'Samy', 'Saša', 'Saul', 'Sidney', 'Sol', 'Tatum', 'Vanni',
                           'Vidal', 'Vivien', 'Yan', 'Yuki', 'Yuri', 'Yves', 'Zen', 'Zeno', 'Zephyr', 'Zion']
            },
            'slavic': {
                'masculine': ['Ivan', 'Dmitri', 'Sergei', 'Vladimir', 'Alexei', 'Mikhail', 'Nikolai', 'Boris', 'Yuri',
                            'Pavel', 'Oleg', 'Andrei', 'Igor', 'Vasily', 'Pyotr', 'Leonid', 'Stanislav', 'Grigori',
                            'Adam', 'Anatoly', 'Anton', 'Arkady', 'Artem', 'Artur', 'Bogdan', 'Bronislav', 'Danil',
                            'Denis', 'Eduard', 'Evgeny', 'Fedor', 'Filip', 'Gavril', 'Gleb', 'Goran', 'Ilya',
                            'Innokenty', 'Ioann', 'Isidor', 'Jaroslav', 'Josef', 'Kazimir', 'Kirill', 'Kliment', 'Konstantin',
                            'Kuzma', 'Lev', 'Lubor', 'Luka', 'Lubomir', 'Makar', 'Maksim', 'Matvei', 'Miloš',
                            'Miroslav', 'Miron', 'Modest', 'Nestor', 'Nikifor', 'Nikita', 'Orest', 'Osip', 'Platon',
                            'Radimir', 'Radoslav', 'Radomir', 'Ratimir', 'Rodion', 'Roman', 'Rostislav', 'Rudolf', 'Ruslan',
                            'Savva', 'Semyon', 'Simeon', 'Spartak', 'Stepan', 'Svyatoslav', 'Taras', 'Teodor', 'Timofey',
                            'Trofim', 'Vadim', 'Valentin', 'Valery', 'Veniamin', 'Victor', 'Vitaly', 'Vlad', 'Vladislav',
                            'Vsevolod', 'Vyacheslav', 'Yan', 'Yaroslav', 'Yegor', 'Yefim', 'Yerofey', 'Zakhar', 'Zinovy',
                            'Zoran', 'Bronisław', 'Casimir', 'Dariusz', 'Grzegorz', 'Jakub', 'Jerzy', 'Józef', 'Karol',
                            'Leszek', 'Łukasz', 'Maciej', 'Marcin', 'Marek', 'Mariusz', 'Michał', 'Piotr', 'Radek', 'Tomasz'],
                'feminine': ['Olga', 'Tatiana', 'Svetlana', 'Natasha', 'Anya', 'Ekaterina', 'Irina', 'Anastasia', 'Yelena',
                            'Lyudmila', 'Oksana', 'Polina', 'Marina', 'Vera', 'Nadia', 'Galina', 'Ksenia', 'Daria',
                            'Ada', 'Agafia', 'Agata', 'Agnessa', 'Albina', 'Aleksandra', 'Alina', 'Alla', 'Alona', 'Anzhela',
                            'Antonina', 'Bronislava', 'Daryna', 'Diana', 'Dominika', 'Dorota', 'Dunja', 'Elizaveta', 'Eva',
                            'Evdokia', 'Faina', 'Fedora', 'Feodosia', 'Halina', 'Helena', 'Inna', 'Iskra', 'Ivanna',
                            'Izabela', 'Jana', 'Janina', 'Jaroslava', 'Jasna', 'Jelena', 'Joanna', 'Kalina', 'Kamila',
                            'Karina', 'Karolina', 'Katarzyna', 'Kira', 'Klara', 'Klementina', 'Kristina', 'Lada', 'Lara',
                            'Larisa', 'Lenka', 'Lilia', 'Lilja', 'Ljubov', 'Ludmila', 'Luiza', 'Magdalena', 'Malina',
                            'Marfa', 'Margarita', 'Marija', 'Marta', 'Milana', 'Milena', 'Milica', 'Mira', 'Miroslava',
                            'Natalija', 'Nika', 'Nina', 'Olivera', 'Petra', 'Radmila', 'Radomira', 'Raisa', 'Renata',
                            'Rita', 'Rozalija', 'Ruslana', 'Sabina', 'Senta', 'Serafima', 'Slavica', 'Snezhana', 'Sofia',
                            'Stanislava', 'Stefania', 'Tamara', 'Tanya', 'Taras', 'Ulyana', 'Valeriya', 'Varvara', 'Vesna',
                            'Victoria', 'Vladimira', 'Vlasta', 'Yelizaveta', 'Yulia', 'Zara', 'Zarya', 'Zdenka', 'Zina',
                            'Zinaida', 'Zlata', 'Zora', 'Zoya', 'Żaneta', 'Agnieszka', 'Beata', 'Ewa', 'Małgorzata', 'Wanda'],
                'neutral': ['Sasha', 'Vanya', 'Valya', 'Zhenya', 'Misha', 'Nikita', 'Yasha', 'Slava', 'Zoya',
                           'Alek', 'Aleks', 'Aljo', 'Anđelko', 'Ari', 'Arsenije', 'Avdey', 'Banja', 'Bodhan', 'Borya',
                           'Branko', 'Dale', 'Danya', 'Dasha', 'Dimi', 'Dobry', 'Dragana', 'Drago', 'Duci', 'Dusya',
                           'Fedya', 'Felka', 'Gabi', 'Gavra', 'Grisha', 'Grusha', 'Ilarija', 'Ily', 'Ira', 'Iskra',
                           'Jagoda', 'Jasha', 'Katya', 'Kolya', 'Kostya', 'Krasimir', 'Kuzya', 'Lada', 'Lera', 'Lesya',
                           'Ljuba', 'Luka', 'Lyova', 'Lyuba', 'Lyuda', 'Malina', 'Mirko', 'Misha', 'Mitya', 'Nadya',
                           'Nastya', 'Nebojša', 'Nika', 'Niko', 'Olesya', 'Pahom', 'Pasha', 'Petya', 'Rada', 'Radka',
                           'Raya', 'Rina', 'Roma', 'Rostya', 'Sanja', 'Sava', 'Senya', 'Shura', 'Sim', 'Slavka',
                           'Sonya', 'Stepa', 'Sveta', 'Tolya', 'Valery', 'Vanja', 'Varya', 'Vasya', 'Venya', 'Vera',
                           'Vida', 'Vitya', 'Vlada', 'Volya', 'Vonya', 'Yura', 'Zare', 'Zary', 'Zheka', 'Zina', 
                           'Zlata', 'Zora', 'Zorya', 'Zosya', 'Zoya', 'Žarko', 'Żenja', 'Aljoša', 'Saša', 'Toša']
            },
            'nordic': {
                'masculine': ['Erik', 'Lars', 'Sven', 'Bjorn', 'Thor', 'Olaf', 'Magnus', 'Leif', 'Harald',
                            'Axel', 'Gustav', 'Johan', 'Nils', 'Fredrik', 'Henrik', 'Anders', 'Mikkel', 'Jens',
                            'Aksel', 'Alf', 'Alvar', 'Anker', 'Anton', 'Arne', 'Arvid', 'Asger', 'Asmund', 'Atle',
                            'Baldur', 'Bard', 'Bengt', 'Birger', 'Bo', 'Brage', 'Brandt', 'Brynjar', 'Dag', 'Egil',
                            'Einar', 'Elias', 'Erland', 'Erlend', 'Eskil', 'Espen', 'Finn', 'Flemming', 'Frode', 'Geir',
                            'Gunnar', 'Haakon', 'Halvar', 'Hans', 'Helge', 'Hemming', 'Hjalmar', 'Holger', 'Ib', 'Ingmar',
                            'Ingvar', 'Ivar', 'Jakob', 'Jannik', 'Jarle', 'Jesper', 'Joakim', 'Jon', 'Jorgen', 'Jorund',
                            'Kalle', 'Keld', 'Kjell', 'Knut', 'Kristian', 'Kristoffer', 'Lasse', 'Lennart', 'Loke',
                            'Ludvig', 'Mads', 'Magne', 'Malthe', 'Martin', 'Morten', 'Njal', 'Odd', 'Ole', 'Orvar',
                            'Oskar', 'Otto', 'Ove', 'Peder', 'Per', 'Pontus', 'Preben', 'Ragnar', 'Rasmus', 'Reidar',
                            'Rolf', 'Ruben', 'Rune', 'Sigurd', 'Simon', 'Sivert', 'Sixten', 'Snorre', 'Sten', 'Stian',
                            'Stig', 'Sturla', 'Svante', 'Terje', 'Tobias', 'Torbjorn', 'Tord', 'Tore', 'Torsten', 'Trygve',
                            'Ulf', 'Valdemar', 'Vemund', 'Viggo', 'Vilhelm', 'Yngve', 'Örjan', 'Östen', 'Øyvind', 'Åke'],
                'feminine': ['Astrid', 'Ingrid', 'Frida', 'Freya', 'Sigrid', 'Helga', 'Solveig', 'Elin', 'Karin',
                            'Linnea', 'Ida', 'Lina', 'Ebba', 'Annika', 'Freja', 'Maja', 'Signe', 'Greta',
                            'Agda', 'Agnes', 'Agneta', 'Alma', 'Amalia', 'Amanda', 'Ane', 'Anette', 'Anja', 'Ann',
                            'Anna', 'Anneli', 'Arnhild', 'Asta', 'Aud', 'Barbro', 'Beata', 'Benedicte', 'Berit', 'Birgit',
                            'Birgitte', 'Birte', 'Bodil', 'Borghild', 'Britt', 'Camilla', 'Carina', 'Cecilia', 'Dagmar',
                            'Dagny', 'Disa', 'Ditte', 'Dorte', 'Edle', 'Edna', 'Eir', 'Elinor', 'Elisabet', 'Ellinor',
                            'Elsa', 'Elsie', 'Embla', 'Emma', 'Erika', 'Ester', 'Eva', 'Fjola', 'Gunilla', 'Gunvor',
                            'Hanna', 'Hedda', 'Hedvig', 'Hege', 'Heidrun', 'Helle', 'Hertha', 'Hilde', 'Hildur', 'Hjördis',
                            'Inga', 'Inger', 'Ingeborg', 'Johanne', 'Jonna', 'Jytte', 'Kaja', 'Karen', 'Karita', 'Karla',
                            'Katja', 'Kirsten', 'Klara', 'Kristin', 'Laila', 'Lea', 'Lene', 'Lise', 'Liv', 'Lone',
                            'Lotte', 'Louise', 'Lovisa', 'Lykke', 'Maiken', 'Malene', 'Margareta', 'Mari', 'Maria', 'Marianne',
                            'Marit', 'Marlene', 'Mette', 'Nanna', 'Nora', 'Oda', 'Pernille', 'Ragna', 'Ragnhild', 'Ranveig',
                            'Rebecka', 'Rigmor', 'Ronja', 'Runa', 'Sara', 'Selma', 'Sif', 'Sofia', 'Sonja', 'Svea', 
                            'Sylvi', 'Thea', 'Thyra', 'Tilde', 'Tora', 'Tove', 'Trine', 'Tuva', 'Ulla', 'Unni'],
                'neutral': ['Kim', 'Mika', 'Kaj', 'Tove', 'Rune', 'Vega', 'Lo', 'Eli', 'Saga', 'Viggo',
                           'Aki', 'Alex', 'Alva', 'Amund', 'Are', 'Ariel', 'Arve', 'Ask', 'Aslak', 'Asle',
                           'Atle', 'Bjørk', 'Bo', 'Charlie', 'Chris', 'Dana', 'Didrik', 'Eide', 'Elis', 'Elvin',
                           'Embla', 'Emil', 'Erika', 'Frej', 'Frøy', 'Glenn', 'Gry', 'Guri', 'Hanne', 'Heike',
                           'Helle', 'Henny',                            'Hilmar', 'Hylke', 'Indra', 'Inge', 'Ingvild', 'Iver', 'Jackie', 'Janne',
                           'Jannik', 'Jari', 'Jerri', 'Joar', 'Jone', 'Jonne', 'Juni', 'Kai', 'Kelly', 'Kipp',
                           'Lind', 'Loke', 'Lumi', 'Ly', 'Magne', 'Mani', 'Mardy', 'Marley', 'Mille', 'Mio',
                           'Moa', 'Morten', 'My', 'Nemi', 'Nicky', 'Nikki', 'Nor', 'Oddny', 'Olve', 'Ove',
                           'Pim', 'Py', 'Rikke', 'Rio', 'Ronja', 'Ronny', 'Rudy', 'Sofie', 'Sol', 'Sondre',
                           'Søren', 'Storm', 'Sture', 'Sunna', 'Sven', 'Tage', 'Terje', 'Terry', 'Tiril', 'Tjelle',
                           'Torin', 'Tove', 'Unn', 'Vidar', 'Vide', 'Vide', 'Ville', 'Vimme', 'Viol', 'Ylva']
            },
            'celtic': {
                'masculine': ['Liam', 'Sean', 'Patrick', 'Connor', 'Aidan', 'Brennan', 'Declan', 'Cormac', 'Rowan',
                            'Kieran', 'Finn', 'Eoin', 'Conall', 'Niall', 'Cian', 'Lorcan', 'Conan', 'Oisin'],
                'feminine': ['Siobhan', 'Erin', 'Fiona', 'Bridget', 'Niamh', 'Maeve', 'Eileen', 'Roisin', 'Saoirse',
                            'Aoife', 'Caoimhe', 'Orla', 'Ciara', 'Sinead', 'Clodagh', 'Grainne', 'Deirdre', 'Mairead'],
                'neutral': ['Kerry', 'Quinn', 'Riley', 'Casey', 'Morgan', 'Finley', 'Teagan', 'Rory', 'Shannon', 'Reilly']
            },
            'mixed': {
                'masculine': ['John', 'Michael', 'David', 'Robert', 'Thomas', 'Mark', 'Peter', 'James', 'William',
                            'Daniel', 'Alexander', 'Paul', 'Christian', 'Joseph', 'Andrew', 'Jonathan', 'George', 'Richard'],
                'feminine': ['Mary', 'Emma', 'Sarah', 'Emily', 'Laura', 'Lisa', 'Julia', 'Sophie', 'Hannah',
                            'Jennifer', 'Catherine', 'Christina', 'Rebecca', 'Jessica', 'Olivia', 'Grace', 'Anna', 'Elizabeth'],
                'neutral': ['Alex', 'Sam', 'Robin', 'Taylor', 'Jordan', 'Casey', 'Quinn', 'Morgan', 'Riley', 'Avery']
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
     * Gibt einen häufigen Nachnamen basierend auf der Kultur zurück (erweitert)
     * @param {string} culture - Kultureller Stil
     * @returns {string} Ein gebräuchlicher Nachname
     */
    function getCommonLastName(culture) {
        // Gemeinsame Nachnamen für jede Kultur
        const surnames = {
            'germanic': [
                'Schmidt', 'Müller', 'Weber', 'Schneider', 'Fischer', 'Meyer', 'Wagner', 'Becker', 'Hoffmann', 
                'Schulz', 'Koch', 'Bauer', 'Wolf', 'Schröder', 'Klein', 'Neumann', 'Schwarz', 'Zimmermann',
                'Braun', 'Hofmann', 'Hartmann', 'Krause', 'Werner', 'Schmitz', 'Lange', 'Schmitt', 'Meier'
            ],
            'romance': [
                'Rossi', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Garcia', 'Martinez', 'Rodriguez', 'Lopez',
                'Fernandez', 'Moreau', 'Dubois', 'Bernard', 'Petit', 'Durand', 'Leroy', 'Simon', 'Martin',
                'Ricci', 'Costa', 'Fontana', 'Santos', 'Pereira', 'Mancini', 'Russo', 'Lefebvre', 'Mercier'
            ],
            'slavic': [
                'Ivanov', 'Smirnov', 'Kuznetsov', 'Popov', 'Sokolov', 'Lebedev', 'Kozlov', 'Novikov', 'Morozov',
                'Petrov', 'Volkov', 'Solovyov', 'Vasilyev', 'Zaytsev', 'Pavlov', 'Semyonov', 'Golubev', 'Vinogradov',
                'Bogdanov', 'Vorobev', 'Fedorov', 'Mikhailov', 'Belyakov', 'Kovalev', 'Sobolev', 'Kiselev'
            ],
            'nordic': [
                'Johansson', 'Andersson', 'Karlsson', 'Nilsson', 'Eriksson', 'Larsson', 'Olsson', 'Persson',
                'Svensson', 'Gustafsson', 'Hansen', 'Nielsen', 'Jensen', 'Pedersen', 'Kristiansen', 'Lindberg',
                'Lund', 'Berg', 'Jakobsen', 'Holm', 'Bjørklund', 'Nygaard', 'Fjeld', 'Solberg', 'Bakke'
            ],
            'celtic': [
                'Murphy', 'Kelly', 'O\'Sullivan', 'Walsh', 'O\'Brien', 'McCarthy', 'Ryan', 'O\'Connor', 'Doyle',
                'McDonnell', 'McLaughlin', 'O\'Neill', 'Gallagher', 'Quinn', 'Lynch', 'Doherty', 'Kennedy',
                'Byrne', 'Brennan', 'Fitzgerald', 'McGuire', 'O\'Donnell', 'MacLeod', 'Campbell', 'MacKenzie'
            ],
            'mixed': [
                'Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Taylor',
                'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Lee',
                'Lewis', 'Walker', 'Hall', 'Allen', 'Young', 'King', 'Wright', 'Hill', 'Scott', 'Green'
            ]
        };
        
        // Fallback für unbekannte Kulturen
        const actualCulture = surnames[culture] ? culture : 'mixed';
        
        // Zufälligen Nachnamen zurückgeben
        return surnames[actualCulture][getRandomInt(0, surnames[actualCulture].length - 1)];
    }
});
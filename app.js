// app.js - Hauptskript für den Charakter-Editor

document.addEventListener('DOMContentLoaded', function() {
    // Konstanten für die Punkteberechnung
    const MIN_MAIN_ATTRIBUTE = 1;
    const MAX_MAIN_ATTRIBUTE = 5;
    const MIN_SKILL_VALUE = 0;
    const MAX_SKILL_VALUE = 5;

    let BASE_ATTRIBUTE_POINTS = 15; // Basiswert
    let CURRENT_ATTRIBUTE_POINTS = 15; // Aktueller Wert
    let BASE_SKILL_POINTS = 45; // Basiswert
    let CURRENT_SKILL_POINTS = 45; // Aktueller Wert
    
    // DOM-Elemente referenzieren
    const elements = {
        // Dropdown-Menüs
        classSelect: document.getElementById('class'),
        secondClassSelect: document.getElementById('second-class'),
        secondClassContainer: document.getElementById('second-class-container'),
        advantageSelect: document.getElementById('advantage'),
        disadvantageSelect: document.getElementById('disadvantage'),
        magicSchoolSelect: document.getElementById('magic-school'),
        secondMagicSchoolSelect: document.getElementById('second-magic-school'),
        secondMagicSchoolContainer: document.getElementById('second-magic-school-container'),
        tooltipContainer: document.getElementById('tooltip-container'),
        
        // Kampfwerte-Elemente
        genaInput: document.getElementById('gena'),
        paInput: document.getElementById('pa'),
        kpInput: document.getElementById('kp'),
        mpInput: document.getElementById('mp'),
        zkInput: document.getElementById('zk'),
        initInput: document.getElementById('init'),
        bwInput: document.getElementById('bw'),
        luckTokensInput: document.getElementById('luck-tokens'),
        
        // Wunden-Tracker-Elemente
        woundCircles: document.querySelectorAll('.wound-circle, .wound-skull'),
        
        // Attribut-Elemente
        attributeInputs: document.querySelectorAll('.attribute-value'),
        mainAttributeInputs: document.querySelectorAll('.main-attribute-value'),
        availablePointsDisplay: document.getElementById('available-points'),
        availableSkillPointsDisplay: document.getElementById('available-skill-points'),
        
        // Reset-Button
        resetButton: document.getElementById('reset-attributes')
    };
    
    // Zustandsvariablen
    let state = {
        currentWoundLevel: 0
    };

    // Wunden-Tracker Initialisierung
    initWoundTracker();
    
    // Dropdown-Menüs initialisieren
    initDropdowns();
    
    // Attributeingaben initialisieren
    initAttributeInputs();
    
    // Initialisierung der Anzeigen
    updateAvailablePointsDisplay();
    updateAvailableSkillPointsDisplay();
    
    // Initialisiere Kampfwerte
    updateCombatStats();
    
    // Reset-Button Event-Listener
    initResetButton();
    
    // ===== FUNKTIONEN =====
    
    // Initialisierung des Wunden-Trackers
    function initWoundTracker() {
        elements.woundCircles.forEach((circle, index) => {
            circle.addEventListener('click', function() {
                setWoundLevel(index + 1);
            });
        });
    }
    
    // Funktion zum Setzen des Wundenlevels
    function setWoundLevel(level) {
        state.currentWoundLevel = level;
        
        elements.woundCircles.forEach((circle, index) => {
            if (index < level) {
                circle.classList.add('active');
            } else {
                circle.classList.remove('active');
            }
        });
    }

    // Funktion zum Aktualisieren der Punkte für "Fantastische Eignung"
    function updatePointsForFantasticAptitude() {
        const hasFantasticAptitude = elements.advantageSelect.value === 'fantastische eignung';
        
        // Punkte zurücksetzen auf Basiswerte
        CURRENT_ATTRIBUTE_POINTS = BASE_ATTRIBUTE_POINTS;
        CURRENT_SKILL_POINTS = BASE_SKILL_POINTS;
        
        // Punkte erhöhen, wenn der Vorteil aktiv ist
        if (hasFantasticAptitude) {
            CURRENT_ATTRIBUTE_POINTS += 1;
            CURRENT_SKILL_POINTS += 5;
        }
        
        // Anzeige aktualisieren
        updateAvailablePointsDisplay();
        updateAvailableSkillPointsDisplay();
    }
    
    // Initialisierung der Dropdown-Menüs
    function initDropdowns() {
        // Daten aus den Services laden
        const klassen = klasseService.getAllKlassen();
        const vorteile = vorteilService.getAllVorteile();
        const nachteile = nachteilService.getAllNachteile();
        const magieschulen = magieschuleService.getAllMagieschulen();
        
        // Dropdown-Menüs befüllen
        loadDropdown(elements.classSelect, klassen);
        loadDropdown(elements.secondClassSelect, klassen);
        loadDropdown(elements.advantageSelect, vorteile);
        loadDropdown(elements.disadvantageSelect, nachteile);
        loadDropdown(elements.magicSchoolSelect, magieschulen);
        loadDropdown(elements.secondMagicSchoolSelect, magieschulen);
        
        // Event-Listener für Tooltips und Auswahl hinzufügen
        setupSelectWithTooltips(elements.classSelect, klassen);
        setupSelectWithTooltips(elements.secondClassSelect, klassen);
        setupSelectWithTooltips(elements.advantageSelect, vorteile);
        setupSelectWithTooltips(elements.disadvantageSelect, nachteile);
        setupSelectWithTooltips(elements.magicSchoolSelect, magieschulen);
        setupSelectWithTooltips(elements.secondMagicSchoolSelect, magieschulen);
        
        // Doppelte-Klasse-Funktionalität initialisieren
        initDoubleClassFeature();
        
        // Zweite-Magieschule-Funktionalität initialisieren
        initSecondMagicSchoolFeature();
        
        // Event-Listener für Vorteil "Fantastische Eignung" hinzufügen
        elements.advantageSelect.addEventListener('change', updatePointsForFantasticAptitude);
        
        // Event-Listener für Nachteil-Änderung, um Kampfwerte zu aktualisieren
        elements.disadvantageSelect.addEventListener('change', updateCombatStats);
    }
    
    // Funktion zum Befüllen der Dropdown-Menüs
    function loadDropdown(selectElement, items) {
        if (!selectElement) {
            console.error("Konnte Element nicht finden:", selectElement);
            return;
        }
        
        // Bestehende Optionen entfernen (außer die erste)
        while(selectElement.options.length > 1) {
            selectElement.remove(1);
        }
        
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.name;
            option.dataset.beschreibung = item.beschreibung;
            selectElement.appendChild(option);
        });
    }
    
    // Funktion zum Initialisieren der zweiten Magieschule
    function initSecondMagicSchoolFeature() {
        // Einstellungen
        const ARKANE_MEISTERSCHAFT_ID = 'arkane meisterschaft';
        
        // Funktion zum Prüfen, ob "Arkane Meisterschaft" ausgewählt ist
        function checkArkaneMeisterschaft() {
            const selectedAdvantage = elements.advantageSelect.value;
            if (selectedAdvantage === ARKANE_MEISTERSCHAFT_ID) {
                elements.secondMagicSchoolContainer.style.display = 'block';
                updateMagicSchoolOptions();
            } else {
                elements.secondMagicSchoolContainer.style.display = 'none';
            }
        }
        
        // Funktion zum Aktualisieren der Magieschul-Optionen in beiden Dropdowns
        function updateMagicSchoolOptions() {
            const firstMagicSchool = elements.magicSchoolSelect.value;
            const secondMagicSchool = elements.secondMagicSchoolSelect.value;
            
            // Aktualisiere die Optionen im ersten Dropdown
            Array.from(elements.magicSchoolSelect.options).forEach(option => {
                if (option.value === secondMagicSchool && option.value !== '') {
                    option.classList.add('magic-school-disabled');
                    option.disabled = true;
                } else {
                    option.classList.remove('magic-school-disabled');
                    option.disabled = false;
                }
            });
            
            // Aktualisiere die Optionen im zweiten Dropdown
            Array.from(elements.secondMagicSchoolSelect.options).forEach(option => {
                if (option.value === firstMagicSchool && option.value !== '') {
                    option.classList.add('magic-school-disabled');
                    option.disabled = true;
                } else {
                    option.classList.remove('magic-school-disabled');
                    option.disabled = false;
                }
            });
        }
        
        // Event-Listener für den Vorteil-Dropdown
        elements.advantageSelect.addEventListener('change', checkArkaneMeisterschaft);
        
        // Event-Listener für Änderungen an den Magieschul-Dropdowns
        elements.magicSchoolSelect.addEventListener('change', updateMagicSchoolOptions);
        elements.secondMagicSchoolSelect.addEventListener('change', updateMagicSchoolOptions);
        
        // Initialen Zustand prüfen
        checkArkaneMeisterschaft();
    }
    
    // Initialisierung der Doppelte-Klasse-Funktionalität
    function initDoubleClassFeature() {
        // Prüfen, ob der Vorteil "Doppelte Klasse" ausgewählt ist
        elements.advantageSelect.addEventListener('change', function() {
            const hasDoubleClassAdvantage = this.value === 'doppelte klasse';
            console.log("Vorteil geändert:", this.value, "Doppelte Klasse aktiv:", hasDoubleClassAdvantage);
            
            // Zweites Klassen-Dropdown anzeigen/ausblenden
            elements.secondClassContainer.style.display = hasDoubleClassAdvantage ? 'block' : 'none';
            
            if (hasDoubleClassAdvantage) {
                // Lade Klassen neu für das zweite Dropdown
                console.log("Lade zweite Klasse Optionen");
                const klassen = klasseService.getAllKlassen();
                
                // Bestehende Optionen entfernen (außer die erste)
                while(elements.secondClassSelect.options.length > 1) {
                    elements.secondClassSelect.remove(1);
                }
                
                // Füge alle Klassen hinzu, deaktiviere die aktuelle Klasse
                const firstClassValue = elements.classSelect.value;
                klassen.forEach(klasse => {
                    const option = document.createElement('option');
                    option.value = klasse.id;
                    option.textContent = klasse.name;
                    option.dataset.beschreibung = klasse.beschreibung;
                    option.disabled = (klasse.id === firstClassValue && klasse.id !== '');
                    elements.secondClassSelect.appendChild(option);
                });
                
                // Benutzerdefinierte Dropdowns aktualisieren
                setTimeout(() => {
                    const event = new CustomEvent('optionsChanged');
                    elements.secondClassSelect.dispatchEvent(event);
                }, 0);
            } else {
                // Wenn das zweite Dropdown ausgeblendet wird, dessen Wert zurücksetzen
                elements.secondClassSelect.value = '';
                
                // Alle Optionen im ersten Dropdown wieder aktivieren
                Array.from(elements.classSelect.options).forEach(option => {
                    option.disabled = false;
                });
                
                // Tooltip für die zweite Klasse entfernen, falls vorhanden
                const existingTooltip = document.querySelector(`[data-for="second-class"]`);
                if (existingTooltip && elements.tooltipContainer) {
                    elements.tooltipContainer.removeChild(existingTooltip);
                }
                
                // Event auslösen, um die benutzerdefinierten Dropdowns zu aktualisieren
                const event = new CustomEvent('optionsChanged');
                elements.classSelect.dispatchEvent(event);
            }
            
            // Aktualisiere die Kampfwerte, da eine zweite Klasse sie beeinflussen könnte
            updateCombatStats();
        });
        
        // First class change handler - deaktiviere die gewählte Klasse im zweiten Dropdown
        elements.classSelect.addEventListener('change', function() {
            const selectedClass = this.value;
            console.log("Erste Klasse geändert:", selectedClass);
            
            // Prüfen, ob das zweite Dropdown aktiv ist
            if (elements.secondClassContainer.style.display === 'block') {
                // Bei den vorhandenen Optionen die entsprechende deaktivieren
                Array.from(elements.secondClassSelect.options).forEach(option => {
                    option.disabled = (option.value === selectedClass && option.value !== '');
                });
                
                // Event auslösen, um die benutzerdefinierten Dropdowns zu aktualisieren
                const event = new CustomEvent('optionsChanged');
                elements.secondClassSelect.dispatchEvent(event);
            }
            
            // Aktualisiere die Kampfwerte nach Klassenänderung
            updateCombatStats();
        });
        
        // Second class change handler - deaktiviere die gewählte Klasse im ersten Dropdown
        elements.secondClassSelect.addEventListener('change', function() {
            const selectedClass = this.value;
            console.log("Zweite Klasse geändert:", selectedClass);
            
            // Alle Optionen im ersten Dropdown aktivieren außer der im zweiten gewählten
            Array.from(elements.classSelect.options).forEach(option => {
                option.disabled = (option.value === selectedClass && option.value !== '');
            });
            
            // Event auslösen, um die benutzerdefinierten Dropdowns zu aktualisieren
            const event = new CustomEvent('optionsChanged');
            elements.classSelect.dispatchEvent(event);
            
            // Aktualisiere die Kampfwerte, da die zweite Klasse sie beeinflussen könnte
            updateCombatStats();
            
            // Wenn eine Klasse ausgewählt wurde, zeige ihre Beschreibung an
            if (selectedClass) {
                const klassen = klasseService.getAllKlassen();
                const selectedKlasse = klassen.find(klasse => klasse.id === selectedClass);
                if (selectedKlasse) {
                    showTooltip('second-class', selectedKlasse.name, selectedKlasse.beschreibung);
                }
            } else {
                // Tooltip entfernen, wenn keine Klasse ausgewählt ist
                const existingTooltip = document.querySelector(`[data-for="second-class"]`);
                if (existingTooltip && elements.tooltipContainer) {
                    elements.tooltipContainer.removeChild(existingTooltip);
                }
            }
        });
        
        // Initialen Zustand prüfen
        if (elements.advantageSelect.value === 'doppelte klasse') {
            console.log("Initiale Prüfung: Doppelte Klasse ist bereits ausgewählt");
            elements.secondClassContainer.style.display = 'block';
            
            // Lade alle Klassen für das zweite Dropdown
            const klassen = klasseService.getAllKlassen();
            
            // Bestehende Optionen entfernen (außer die erste)
            while(elements.secondClassSelect.options.length > 1) {
                elements.secondClassSelect.remove(1);
            }
            
            // Füge alle Klassen hinzu, deaktiviere die aktuelle Klasse
            const firstClassValue = elements.classSelect.value;
            console.log("Erste Klasse ist:", firstClassValue);
            
            klassen.forEach(klasse => {
                const option = document.createElement('option');
                option.value = klasse.id;
                option.textContent = klasse.name;
                option.dataset.beschreibung = klasse.beschreibung;
                option.disabled = (klasse.id === firstClassValue && klasse.id !== '');
                elements.secondClassSelect.appendChild(option);
            });
            
            // Benutzerdefinierte Dropdowns aktualisieren
            setTimeout(() => {
                const event = new CustomEvent('optionsChanged');
                elements.secondClassSelect.dispatchEvent(event);
                
                // Falls eine zweite Klasse bereits ausgewählt ist, deren Tooltip anzeigen
                const secondClassValue = elements.secondClassSelect.value;
                if (secondClassValue) {
                    const selectedKlasse = klassen.find(klasse => klasse.id === secondClassValue);
                    if (selectedKlasse) {
                        showTooltip('second-class', selectedKlasse.name, selectedKlasse.beschreibung);
                    }
                }
            }, 0);
        }
    }
    
    // Funktion für erweiterte Select-Elemente mit Tooltips
    function setupSelectWithTooltips(selectElement, items) {
        if (!selectElement) return; // Sicherheitsprüfung
        
        // Container für das benutzerdefinierte Dropdown erstellen
        const selectContainer = document.createElement('div');
        selectContainer.className = 'custom-select-container';
        selectContainer.style.position = 'relative';
        selectContainer.style.width = '100%';
        
        // Verstecke das originale Select-Element, behalte es aber für Form-Submission
        selectElement.style.display = 'none';
        selectElement.parentNode.insertBefore(selectContainer, selectElement);
        selectContainer.appendChild(selectElement);
        
        // Erstelle den sichtbaren Select-Button
        const selectButton = document.createElement('div');
        selectButton.className = 'custom-select-button';
        selectButton.innerHTML = selectElement.options[0].text;
        selectContainer.appendChild(selectButton);
        
        // Erstelle die Dropdown-Liste
        const dropdownList = document.createElement('div');
        dropdownList.className = 'custom-select-dropdown';
        dropdownList.style.display = 'none';
        selectContainer.appendChild(dropdownList);
        
        // Erstelle Tooltip-Element
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip-text';
        tooltip.style.display = 'none';
        document.body.appendChild(tooltip);
        
        // Füge die Optionen zur Dropdown-Liste hinzu
        const options = Array.from(selectElement.options).slice(1); // Überspringe den Platzhalter
        options.forEach((option, index) => {
            // Stelle sicher, dass wir genügend Items haben
            if (index >= items.length) return;
            
            const item = items[index];
            const optionElement = document.createElement('div');
            optionElement.className = 'custom-select-option';
            optionElement.textContent = item.name;
            optionElement.dataset.value = item.id;
            optionElement.dataset.beschreibung = item.beschreibung;
            
            // Prüfen, ob die Option deaktiviert werden soll
            if (option.disabled) {
                optionElement.classList.add('disabled');
            }
            
            // Hover-Effekt für Optionen
            optionElement.addEventListener('mouseenter', function() {
                // Nur Stil ändern, wenn die Option nicht deaktiviert ist
                if (!this.classList.contains('disabled')) {
                    this.style.backgroundColor = '#f0f0f0';
                    
                    // Tooltip anzeigen
                    tooltip.textContent = this.dataset.beschreibung;
                    tooltip.style.display = 'block';
                    
                    // Position des Tooltips aktualisieren
                    const updateTooltipPosition = function(e) {
                        tooltip.style.position = 'fixed';
                        tooltip.style.top = (e.clientY + 10) + 'px';
                        tooltip.style.left = (e.clientX + 15) + 'px';
                    };
                    
                    updateTooltipPosition(window.event);
                    document.addEventListener('mousemove', updateTooltipPosition);
                    
                    // Event-Listener für mousemove speichern, um ihn später zu entfernen
                    this.updateTooltipPosition = updateTooltipPosition;
                }
            });
            
            optionElement.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
                tooltip.style.display = 'none';
                
                // Event-Listener entfernen
                if (this.updateTooltipPosition) {
                    document.removeEventListener('mousemove', this.updateTooltipPosition);
                }
            });
            
            // Klick-Event für Optionen
            optionElement.addEventListener('click', function() {
                // Nur reagieren, wenn die Option nicht deaktiviert ist
                if (!this.classList.contains('disabled')) {
                    selectElement.value = this.dataset.value;
                    selectButton.innerHTML = this.textContent;
                    dropdownList.style.display = 'none';
                    
                    // Manuelles Auslösen des change-Events für das Original-Select
                    const event = new Event('change', { bubbles: true });
                    selectElement.dispatchEvent(event);
                    
                    // Permanente Beschreibung anzeigen
                    const selectedItem = items.find(item => item.id === this.dataset.value);
                    if (selectedItem) {
                        showTooltip(selectElement.id, selectedItem.name, selectedItem.beschreibung);
                    }
                    
                    // Aktualisiere Kampfwerte nach Änderung von Klasse, Vorteil oder Nachteil
                    updateCombatStats();
                }
            });
            
            dropdownList.appendChild(optionElement);
        });
        
        // Aktualisiere die angezeigten deaktivierten Optionen basierend auf dem select-Element
        const updateDisabledOptions = function() {
            const customOptions = dropdownList.querySelectorAll('.custom-select-option');
            Array.from(selectElement.options).slice(1).forEach((option, index) => {
                if (index < customOptions.length) {
                    const optionElement = customOptions[index];
                    if (option.disabled) {
                        optionElement.classList.add('disabled');
                    } else {
                        optionElement.classList.remove('disabled');
                    }
                }
            });
        };
        
        // Event-Listener für Änderungen am Original-Select hinzufügen
        selectElement.addEventListener('optionsChanged', updateDisabledOptions);
        
        // Dropdown öffnen/schließen
        selectButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = dropdownList.style.display === 'block';
            // Alle anderen Dropdowns schließen
            document.querySelectorAll('.custom-select-dropdown').forEach(dropdown => {
                dropdown.style.display = 'none';
            });
            
            if (!isOpen) {
                dropdownList.style.display = 'block';
                // Aktualisiere die deaktivierten Optionen beim Öffnen des Dropdowns
                updateDisabledOptions();
            }
        });
        
        // Schließen bei Klick außerhalb
        document.addEventListener('click', function() {
            dropdownList.style.display = 'none';
        });
        
        // Change-Event für das Original-Select
        selectElement.addEventListener('change', function() {
            const selectedValue = this.value;
            if (!selectedValue) return;
            
            const selectedOption = Array.from(this.options).find(option => option.value === selectedValue);
            if (selectedOption) {
                selectButton.innerHTML = selectedOption.textContent;
            }
            
            const selectedItem = items.find(item => item.id === selectedValue);
            if (selectedItem) {
                showTooltip(this.id, selectedItem.name, selectedItem.beschreibung);
            }
        });
    }
    
    // Funktion zum Anzeigen einer permanenten Beschreibung bei Auswahl
    function showTooltip(elementId, name, beschreibung) {
        const existingTooltip = document.querySelector(`[data-for="${elementId}"]`);
        if (existingTooltip) {
            elements.tooltipContainer.removeChild(existingTooltip);
        }
        
        const tooltipElement = document.createElement('div');
        tooltipElement.className = 'form-row';
        tooltipElement.dataset.for = elementId;
        tooltipElement.innerHTML = `
            <label>${name}:</label>
            <p style="margin-top: 5px; color: #666;">${beschreibung}</p>
        `;
        
        elements.tooltipContainer.appendChild(tooltipElement);
    }
    
    // Initialisierung der Attributeingabefelder
    function initAttributeInputs() {
        // Normale Attributwerte (0-5) mit Fertigkeitspunktebegrenzung
        elements.attributeInputs.forEach(input => {
            let lastValidValue = input.value; // Speichere den letzten gültigen Wert
            
            // Input-Event für sofortige Validierung
            input.addEventListener('input', function() {
                if (this.value === '') return;
                
                // Temporärer Wert für die Berechnung
                const newValue = parseInt(this.value) || 0;
                
                // Prüfe zunächst, ob der Wert im erlaubten Bereich liegt
                if (isNaN(newValue) || newValue < MIN_SKILL_VALUE || newValue > MAX_SKILL_VALUE) {
                    // Wert außerhalb des Bereichs - setze auf letzten gültigen Wert zurück
                    this.value = lastValidValue;
                    return;
                }
                
                // Temporär den Wert setzen, um die verfügbaren Punkte korrekt zu berechnen
                const oldValue = parseInt(lastValidValue) || 0;
                this.value = oldValue; // Setze temporär zurück auf alten Wert
                
                // Berechne verfügbare Punkte basierend auf aktuellem Zustand
                const currentAvailablePoints = calculateAvailableSkillPoints();
                
                // Prüfe, ob die neue Änderung möglich ist
                if (currentAvailablePoints + oldValue - newValue < 0) {
                    // Nicht genügend Punkte verfügbar - setze auf letzten gültigen Wert zurück
                    this.value = lastValidValue;
                } else {
                    // Gültiger Wert - aktualisiere den letzten gültigen Wert
                    this.value = newValue;
                    lastValidValue = newValue.toString();
                    // Aktualisiere die Anzeige der verfügbaren Fertigkeitspunkte
                    updateAvailableSkillPointsDisplay();
                }
            });
            
            // Blur-Event für die Validierung beim Verlassen des Feldes
            input.addEventListener('blur', function() {
                if (this.value === '') {
                    this.value = '0';
                    lastValidValue = '0';
                    updateAvailableSkillPointsDisplay();
                }
            });
        });
        
        // Hauptattribute (1-5 mit Punktelimit)
        elements.mainAttributeInputs.forEach(input => {
            let lastValidValue = input.value; // Speichere den letzten gültigen Wert (startet bei 1)
            
            // Input-Event für sofortige Validierung
            input.addEventListener('input', function() {
                if (this.value === '') return;
                
                // Temporärer Wert für die Berechnung
                const newValue = parseInt(this.value) || 0;
                
                // Prüfe zunächst, ob der Wert im erlaubten Bereich liegt
                if (isNaN(newValue) || newValue < MIN_MAIN_ATTRIBUTE || newValue > MAX_MAIN_ATTRIBUTE) {
                    // Wert außerhalb des Bereichs - setze auf letzten gültigen Wert zurück
                    this.value = lastValidValue;
                    return;
                }
                
                // Temporär den Wert setzen, um die verfügbaren Punkte korrekt zu berechnen
                const oldValue = parseInt(lastValidValue) || 0;
                this.value = oldValue; // Setze temporär zurück auf alten Wert
                
                // Berechne verfügbare Punkte basierend auf aktuellem Zustand
                const currentAvailablePoints = calculateAvailablePoints();
                
                // Prüfe, ob die neue Änderung möglich ist
                if (currentAvailablePoints + oldValue - newValue < 0) {
                    // Nicht genügend Punkte verfügbar - setze auf letzten gültigen Wert zurück
                    this.value = lastValidValue;
                } else {
                    // Gültiger Wert - aktualisiere den letzten gültigen Wert
                    this.value = newValue;
                    lastValidValue = newValue.toString();
                    // Aktualisiere die Anzeige der verfügbaren Punkte
                    updateAvailablePointsDisplay();
                    
                    // Aktualisiere die Kampfwerte direkt nach Änderung eines Hauptattributs
                    updateCombatStats();
                    
                    // Wenn es sich um das MA-Attribut handelt, Zauberslots und -beschränkungen aktualisieren
                    if (this.closest('.attribute-column:nth-child(4)') && 
                        this.closest('h3') && 
                        this.closest('h3').textContent.includes('MA')) {
                        
                        // Zauberslots aktualisieren
                        if (typeof window.updateSpellSlots === 'function') {
                            window.updateSpellSlots();
                        } else {
                            // Alternativ: Event auslösen
                            const event = new CustomEvent('ma-value-changed', { 
                                detail: { 
                                    value: parseInt(this.value) || 1,
                                    action: 'update'
                                } 
                            });
                            document.dispatchEvent(event);
                        }
                    }
                }
            });
            
            // Blur-Event für die Validierung beim Verlassen des Feldes
            input.addEventListener('blur', function() {
                if (this.value === '' || parseInt(this.value) < MIN_MAIN_ATTRIBUTE) {
                    this.value = MIN_MAIN_ATTRIBUTE.toString();
                    lastValidValue = MIN_MAIN_ATTRIBUTE.toString();
                    updateAvailablePointsDisplay();
                    
                    // Aktualisiere die Kampfwerte bei Verlassen des Feldes
                    updateCombatStats();
                    
                    // Wenn es sich um das MA-Attribut handelt, Zauberslots aktualisieren
                    if (this.closest('.attribute-column:nth-child(4)') && 
                        this.closest('h3') && 
                        this.closest('h3').textContent.includes('MA')) {
                        
                        // Zauberslots aktualisieren
                        if (typeof window.updateSpellSlots === 'function') {
                            window.updateSpellSlots();
                        } else {
                            // Alternativ: Event auslösen
                            const event = new CustomEvent('ma-value-changed', { 
                                detail: { 
                                    value: parseInt(this.value) || 1,
                                    action: 'update'
                                } 
                            });
                            document.dispatchEvent(event);
                        }
                    }
                }
            });
        });
    }
    
    function initResetButton() {
        elements.resetButton.addEventListener('click', function() {
            // Bestätigungsdialog anzeigen
            if (confirm('Möchtest du wirklich alle Attribute und Fertigkeiten zurücksetzen?')) {
                // Hauptattribute auf 1 zurücksetzen
                elements.mainAttributeInputs.forEach(input => {
                    input.value = '1';
                });
                
                // Fertigkeiten auf 0 zurücksetzen
                elements.attributeInputs.forEach(input => {
                    input.value = '0';
                });
                
                // Displays aktualisieren
                updateAvailablePointsDisplay();
                updateAvailableSkillPointsDisplay();
                
                // Kampfwerte aktualisieren
                updateCombatStats();
                
                // Zauberslots aktualisieren - direkt die Funktion aufrufen
                if (typeof window.updateSpellSlots === 'function') {
                    window.updateSpellSlots();
                }
                
                // Zauberslots aktualisieren, falls das MA-Attribut geändert wurde
                // Diese Zeilen können jetzt entfallen oder als Fallback bleiben
                if (typeof window.updateSpellSlots !== 'function') {
                    // Alternativ: Event auslösen
                    const event = new CustomEvent('ma-value-changed', { 
                        detail: { 
                            value: 1,
                            action: 'update'
                        } 
                    });
                    document.dispatchEvent(event);
                }
                
                // Zusätzlich: Grimoire-Check und Klassenzauber aktualisieren
                if (typeof window.checkGrimoireItems === 'function') {
                    window.checkGrimoireItems();
                }
                
                if (typeof window.checkClassSpells === 'function') {
                    window.checkClassSpells();
                }
            }
        });
    }
    
    // Hilfsfunktionen für Punkteberechnung
    
    // Funktion zur Berechnung der verfügbaren Attributpunkte
    function calculateAvailablePoints() {
        let usedPoints = 0;
        elements.mainAttributeInputs.forEach(input => {
            usedPoints += parseInt(input.value) || 0;
        });
        
        return CURRENT_ATTRIBUTE_POINTS - usedPoints;
    }
    
    function calculateAvailableSkillPoints() {
        let usedPoints = 0;
        elements.attributeInputs.forEach(input => {
            usedPoints += parseInt(input.value) || 0;
        });
        
        return CURRENT_SKILL_POINTS - usedPoints;
    }
    
    // Funktion zum Aktualisieren der Attributpunkte-Anzeige
    function updateAvailablePointsDisplay() {
        const availablePoints = calculateAvailablePoints();
        elements.availablePointsDisplay.textContent = availablePoints + " verfügbar";
        
        // Visuelle Hinweise zur Verfügbarkeit
        if (availablePoints < 0) {
            elements.availablePointsDisplay.style.backgroundColor = "#ffcccc";
            elements.availablePointsDisplay.style.color = "#cc0000";
        } else if (availablePoints === 0) {
            elements.availablePointsDisplay.style.backgroundColor = "#e6f7e6";
            elements.availablePointsDisplay.style.color = "#006600";
        } else {
            elements.availablePointsDisplay.style.backgroundColor = "#f0f0f0";
            elements.availablePointsDisplay.style.color = "#444";
        }
    }
    
    // Funktion zum Aktualisieren der Fertigkeitspunkte-Anzeige
    function updateAvailableSkillPointsDisplay() {
        const availableSkillPoints = calculateAvailableSkillPoints();
        elements.availableSkillPointsDisplay.textContent = availableSkillPoints + " Fertigkeitspunkte verfügbar";
        
        // Visuelle Hinweise zur Verfügbarkeit
        if (availableSkillPoints < 0) {
            elements.availableSkillPointsDisplay.style.backgroundColor = "#ffcccc";
            elements.availableSkillPointsDisplay.style.color = "#cc0000";
        } else if (availableSkillPoints === 0) {
            elements.availableSkillPointsDisplay.style.backgroundColor = "#e6f7e6";
            elements.availableSkillPointsDisplay.style.color = "#006600";
        } else {
            elements.availableSkillPointsDisplay.style.backgroundColor = "#f0f0f0";
            elements.availableSkillPointsDisplay.style.color = "#444";
        }
    }
    
    // Funktion zur Aktualisierung der Kampfwerte
    function updateCombatStats() {
        // Hauptattribute abrufen
        const körperAttribut = parseInt(document.querySelector('.attribute-column:nth-child(1) .main-attribute-value').value) || 1;
        const weisheitAttribut = parseInt(document.querySelector('.attribute-column:nth-child(2) .main-attribute-value').value) || 1;
        const charismaAttribut = parseInt(document.querySelector('.attribute-column:nth-child(3) .main-attribute-value').value) || 1;
        const glückAttribut = parseInt(document.querySelector('.attribute-column:nth-child(4) .main-attribute-value').value) || 1;
        
        // Magieattribut wird für MP und ZK berechnet
        const magieAttribut = parseInt(document.querySelector('.attribute-column:nth-child(4) h3:nth-of-type(2) .main-attribute-value').value) || 1;
        
        // Akrobatik-Wert abfragen
        // Wir suchen das Eingabefeld, das sich neben dem Akrobatik-Text befindet
        const akrobatikElement = findElementsContainingText('.attribute-item', 'Akrobatik')[0];
        const akrobatikWert = akrobatikElement ? parseInt(akrobatikElement.querySelector('.attribute-value').value) || 0 : 0;
        
        // Überprüfen, ob der Nachteil "Einbeinig" ausgewählt ist
        const hasOneLegDisadvantage = elements.disadvantageSelect.value === 'einbeinig';
        
        // Kampfwerte berechnen nach den neuen Formeln
        // Bei Division immer aufrunden (Math.ceil)
        const gena = Math.ceil((weisheitAttribut + weisheitAttribut + glückAttribut) / 2);
        const pa = Math.ceil((weisheitAttribut + charismaAttribut + glückAttribut) / 2);
        const kpMax = (körperAttribut + körperAttribut + glückAttribut) * 6;
        
        // Berechne INIT basierend auf "Einbeinig"-Nachteil
        let init;
        if (hasOneLegDisadvantage) {
            init = 1; // Fester Wert von 1 für "Einbeinig"
        } else {
            init = Math.ceil((körperAttribut + charismaAttribut + charismaAttribut) / 2);
        }
        
        // Berechne BW basierend auf "Einbeinig"-Nachteil
        let bw;
        if (hasOneLegDisadvantage) {
            bw = 5; // Fester Wert von 5 für "Einbeinig"
        } else {
            // Neue Berechnung für BW: Basis KÖ * 5 plus 5 * Akrobatikwert
            bw = körperAttribut * 5 + akrobatikWert * 5;
        }
        
        // Berechnung für MP nach der Formel WI*15 + MA*10 + CH*5
        const mpMax = weisheitAttribut * 15 + magieAttribut * 10 + charismaAttribut * 5;
        
        // Berechnung für ZK nach der Formel (MA+MA+WI)/3
        const zk = Math.ceil((magieAttribut + magieAttribut + weisheitAttribut) / 3);
        
        // Werte setzen
        elements.genaInput.value = gena;
        elements.paInput.value = pa;
        elements.kpInput.value = kpMax + "/" + kpMax;
        elements.mpInput.value = mpMax + "/" + mpMax;
        elements.zkInput.value = zk;
        elements.initInput.value = init;
        elements.bwInput.value = bw;
        elements.luckTokensInput.value = glückAttribut + "/" + glückAttribut;
    }
    
    // Hilfsfunktion für textbasierte Elementsuche
    function findElementsContainingText(selector, containsText) {
        const elements = document.querySelectorAll(selector);
        const results = [];
        
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].textContent.includes(containsText)) {
                results.push(elements[i]);
            }
        }
        
        return results;
    }
    
    // Nach dem Laden prüfen, ob doppelte Klasse korrekt aktiviert ist
    setTimeout(() => {
        // Wenn "Doppelte Klasse" bereits ausgewählt ist, aktualisiere die Anzeige
        if (elements.advantageSelect.value === 'doppelte klasse') {
            elements.secondClassContainer.style.display = 'block';
            
            // Initiale Synchronisierung der Klassen
            const firstClassValue = elements.classSelect.value;
            if (firstClassValue) {
                Array.from(elements.secondClassSelect.options).forEach(option => {
                    option.disabled = (option.value === firstClassValue && option.value !== '');
                });
                
                // Event auslösen, um die benutzerdefinierten Dropdowns zu aktualisieren
                const event = new CustomEvent('optionsChanged');
                elements.secondClassSelect.dispatchEvent(event);
            }
        }
        
        // Aktualisiere die Punkte für Fantastische Eignung
        updatePointsForFantasticAptitude();
    }, 500);
});
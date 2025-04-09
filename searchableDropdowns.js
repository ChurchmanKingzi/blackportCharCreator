// searchableDropdowns.js - Macht alle Dropdown-Menüs suchbar

document.addEventListener('DOMContentLoaded', function() {
    // Warten Sie etwas, um sicherzustellen, dass alle Dropdown-Menüs geladen sind
    setTimeout(initSearchableDropdowns, 500);
    
    /**
     * Initialisiert alle Dropdown-Menüs mit Suchfunktionalität
     */
    function initSearchableDropdowns() {
        // Alle select-Elemente auf der Seite auswählen
        const allSelects = document.querySelectorAll('select');
        
        allSelects.forEach(select => {
            makeSelectSearchable(select);
        });
        
        // MutationObserver starten, um neue select-Elemente zu überwachen
        observeNewDropdowns();
        
        // Enter-Tasten-Unterstützung hinzufügen
        addEnterKeySupport();
    }
    
    /**
     * Macht ein einzelnes select-Element suchbar
     * @param {HTMLSelectElement} select - Das zu verbessernde select-Element
     */
    function makeSelectSearchable(select) {
        // Prüfen, ob das Select-Element schon suchbar gemacht wurde
        if (select.dataset.searchable === 'true') {
            return;
        }
        
        // Als suchbar markieren
        select.dataset.searchable = 'true';
        
        // Suchpuffer und Timer für die Suche
        let searchBuffer = '';
        let searchTimer = null;
        
        // Event-Listener für Tastaturereignisse, wenn das Dropdown geöffnet ist
        select.addEventListener('keydown', function(e) {
            // Ignorieren, wenn:
            // - Dropdown nicht geöffnet ist (size 1)
            // - Es sich um Steuerungstasten handelt (Tab, Pfeiltasten etc.)
            if (this.size <= 1 || e.key.length > 1) {
                // Bei Escape-Taste auch den Suchpuffer leeren
                if (e.key === 'Escape') {
                    searchBuffer = '';
                }
                // Besondere Behandlung für Enter-Taste
                else if (e.key === 'Enter' || e.keyCode === 13) {
                    // Wenn eine Option ausgewählt ist und das Select geöffnet ist (size > 1)
                    if (this.selectedIndex >= 0 && this.size > 1) {
                        // Select schließen
                        this.size = 1;
                        // Fokus entfernen
                        this.blur();
                        e.preventDefault();
                    }
                }
                return;
            }
            
            // Verhindern Sie die Standardaktion, um Probleme zu vermeiden
            e.preventDefault();
            
            // Zeichen zum Suchpuffer hinzufügen
            searchBuffer += e.key.toLowerCase();
            
            // Timer zurücksetzen, um den Suchpuffer nach Inaktivität zu leeren
            clearTimeout(searchTimer);
            searchTimer = setTimeout(() => {
                searchBuffer = '';
            }, 1000); // 1 Sekunde Timeout
            
            // Suche nach passender Option
            const options = Array.from(this.options);
            for (let i = 0; i < options.length; i++) {
                const option = options[i];
                
                // Überspringen von deaktivierten Optionen und leeren Optionen
                if (option.disabled || !option.value) continue;
                
                const text = option.textContent.toLowerCase();
                
                // Wenn der Text mit dem Suchpuffer beginnt, diese Option auswählen
                if (text.startsWith(searchBuffer)) {
                    option.selected = true;
                    
                    // Sicherstellen, dass die Option sichtbar ist (bei langen Dropdown-Listen)
                    ensureOptionVisible(this, i);
                    
                    // Keine weiteren Optionen prüfen
                    break;
                }
            }
        });
        
        // Event für Dropdown-Öffnung
        select.addEventListener('focus', function() {
            // Suchpuffer bei Öffnung eines Dropdowns leeren
            searchBuffer = '';
        });
    }
    
    /**
     * Stellt sicher, dass eine Option im sichtbaren Bereich eines Dropdowns ist
     * @param {HTMLSelectElement} select - Das select-Element
     * @param {number} index - Der Index der zu zeigenden Option
     */
    function ensureOptionVisible(select, index) {
        // Berechnung basierend auf der Option-Höhe und sichtbaren Optionen
        const size = select.size || 1;
        
        // Wenn der Index außerhalb des sichtbaren Bereichs liegt, scrollen
        if (index < select.scrollTop || index >= select.scrollTop + size) {
            // Bei Browsern, die scrollIntoView unterstützen
            if (select.options[index].scrollIntoView) {
                select.options[index].scrollIntoView();
            } else {
                // Fallback: Manuelles Scrollen
                select.scrollTop = index - Math.floor(size / 2);
            }
        }
    }
    
    /**
     * Beobachtet das DOM auf neu hinzugefügte select-Elemente
     */
    function observeNewDropdowns() {
        // MutationObserver erstellen, um neue Elemente zu überwachen
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Nach neuen select-Elementen in den hinzugefügten Knoten suchen
                    mutation.addedNodes.forEach(function(node) {
                        // Prüfen, ob es ein Element-Knoten ist
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // Wenn es ein select-Element ist
                            if (node.tagName === 'SELECT') {
                                makeSelectSearchable(node);
                            }
                            // Oder wenn es select-Elemente enthält
                            const selects = node.querySelectorAll('select');
                            selects.forEach(select => {
                                makeSelectSearchable(select);
                            });
                        }
                    });
                }
            });
        });
        
        // Gesamtes Dokument beobachten für Änderungen
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    /**
     * Fügt Unterstützung für die Enter-Taste zu benutzerdefinierten Dropdown-Menüs hinzu
     */
    function addEnterKeySupport() {
        // Event-Listener für Tastaturtaste auf dem Dokument-Level
        document.addEventListener('keydown', function(e) {
            // Nur für Enter-Taste (Keycode 13) reagieren
            if (e.key === 'Enter' || e.keyCode === 13) {
                console.log('Enter-Taste gedrückt');
                
                // 1. Prüfen auf benutzerdefinierte Dropdown-Listen für Zauber
                // Wir prüfen zuerst auf alle sichtbaren custom-dropdown-list Elemente
                const allOpenDropdownLists = document.querySelectorAll('.custom-dropdown-list[style*="display: block"], .custom-dropdown-list:not([style*="display: none"])');
                
                if (allOpenDropdownLists.length > 0) {
                    console.log('Offene Dropdown-Listen gefunden:', allOpenDropdownLists.length);
                    
                    // Durch alle offenen Dropdown-Listen iterieren
                    for (const dropdownList of allOpenDropdownLists) {
                        // Versuche, eine hervorgehobene Option zu finden - mit verschiedenen Selektoren
                        let highlightedOption = 
                            // Der grüne Hintergrund für die Suchfunktion
                            dropdownList.querySelector('.custom-dropdown-option[style*="background-color: rgba(76, 175, 80"]') ||
                            // Erweiterte Hintergrundfarben für verschiedene Schattierungen von Grün
                            dropdownList.querySelector('.custom-dropdown-option[style*="background-color: rgb(76, 175, 80)"], .custom-dropdown-option[style*="background-color: rgba(76, 175"]') ||
                            // Allgemeiner Hintergrundfarben-Stil
                            dropdownList.querySelector('.custom-dropdown-option[style*="background-color"]:not(.disabled)');
                        
                        if (highlightedOption) {
                            console.log('Hervorgehobene Option gefunden:', highlightedOption.textContent);
                            
                            // Prüfen, ob die Option nicht deaktiviert ist
                            if (!highlightedOption.classList.contains('disabled')) {
                                console.log('Klick wird simuliert');
                                
                                // Simuliere einen Klick auf die Option
                                highlightedOption.click();
                                
                                // Verhindern, dass das Enter-Event woanders verarbeitet wird
                                e.preventDefault();
                                return;
                            } else {
                                console.log('Option ist deaktiviert');
                            }
                        } else {
                            console.log('Keine hervorgehobene Option gefunden in:', dropdownList);
                            
                            // Wenn keine hervorgehobene Option gefunden wurde, versuche die erste aktivierte Option zu finden
                            const firstEnabledOption = dropdownList.querySelector('.custom-dropdown-option:not(.disabled)');
                            if (firstEnabledOption) {
                                console.log('Erste aktivierte Option gefunden:', firstEnabledOption.textContent);
                                firstEnabledOption.click();
                                e.preventDefault();
                                return;
                            }
                        }
                    }
                }
                
                // 2. Für reguläre Dropdown-Listen (für andere UI-Elemente)
                const openRegularDropdown = document.querySelector('.custom-select-dropdown[style*="display: block"]');
                if (openRegularDropdown) {
                    console.log('Reguläre Dropdown-Liste gefunden');
                    
                    // Finde die aktuell hervorgehobene Option
                    const highlightedOption = openRegularDropdown.querySelector('.custom-select-option[style*="background-color"]');
                    
                    // Wenn eine Option hervorgehoben ist und nicht deaktiviert
                    if (highlightedOption && !highlightedOption.classList.contains('disabled')) {
                        console.log('Hervorgehobene reguläre Option gefunden:', highlightedOption.textContent);
                        
                        // Simuliere einen Klick auf die Option
                        highlightedOption.click();
                        
                        // Verhindern, dass das Enter-Event woanders verarbeitet wird
                        e.preventDefault();
                        return;
                    }
                }
                
                // 3. Für native select Dropdowns
                const focusedSelect = document.activeElement;
                if (focusedSelect && 
                    focusedSelect.tagName === 'SELECT' && 
                    focusedSelect.size > 1) {
                    
                    console.log('Natives Select-Element gefunden:', focusedSelect.id);
                    
                    // Die Standardaktion von Enter bei nativen Selects ist bereits die Auswahl,
                    // wir müssen nur sicherstellen, dass das Dropdown geschlossen wird
                    
                    // Select schließen
                    focusedSelect.size = 1;
                    
                    // Optional: Position zurücksetzen
                    focusedSelect.style.position = '';
                    focusedSelect.style.zIndex = '';
                    
                    // Fokus entfernen
                    focusedSelect.blur();
                    
                    // Verhindern, dass das Enter-Event woanders verarbeitet wird
                    e.preventDefault();
                }
            }
        });
    }
    
    // Funktion für manuelle Initialisierung eines select-Elements
    window.makeSelectSearchable = makeSelectSearchable;
    
    // Funktion für manuelle Neuinitialisierung aller select-Elemente
    window.reinitSearchableDropdowns = initSearchableDropdowns;
});

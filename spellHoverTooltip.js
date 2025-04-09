// spellHoverTooltip.js - Erweiterte Dropdown-Funktionalität für Zauber mit Tooltips

document.addEventListener('DOMContentLoaded', function() {
    // Tooltips für Zauber initialisieren, aber erst nach einer kurzen Verzögerung,
    // um sicherzustellen, dass der spellbookManager die Zauber-Dropdowns erstellt hat
    setTimeout(enhanceSpellDropdowns, 800);
    
    /**
     * Ersetzt Standard-Zauber-Dropdowns durch benutzerdefinierte Dropdowns mit Tooltip-Unterstützung
     */
    function enhanceSpellDropdowns() {
        // Überprüfen, ob der spellService verfügbar ist
        if (typeof spellService === 'undefined') {
            console.error('spellService ist nicht verfügbar!');
            return;
        }
        
        // Tooltip-Element erstellen, falls es noch nicht existiert
        let tooltip = document.querySelector('.spell-hover-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'spell-hover-tooltip';
            tooltip.style.display = 'none';
            
            // Tooltip-Stil definieren
            tooltip.style.position = 'fixed';
            tooltip.style.backgroundColor = 'rgba(28, 30, 34, 0.95)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '12px 15px';
            tooltip.style.borderRadius = '6px';
            tooltip.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.3)';
            tooltip.style.zIndex = '1100';
            tooltip.style.maxWidth = '350px';
            tooltip.style.pointerEvents = 'none';
            tooltip.style.fontSize = '14px';
            tooltip.style.lineHeight = '1.5';
            tooltip.style.border = '1px solid rgba(255, 255, 255, 0.1)';
            
            document.body.appendChild(tooltip);
        }
        
        // Alle Zauber-Dropdowns finden und durch benutzerdefinierte Dropdowns ersetzen
        const spellSelectElements = document.querySelectorAll('.spell-select');
        spellSelectElements.forEach(function(selectElement) {
            // Nur Dropdowns umwandeln, die noch nicht umgewandelt wurden
            if (selectElement.dataset.enhanced !== 'true') {
                convertToCustomDropdown(selectElement, tooltip);
            }
        });
        
        // Neuen Beobachter für das Hinzufügen weiterer Zauber-Slots erstellen
        setupMutationObserver();
    }
    
    /**
     * Konvertiert ein Standard-Select-Element zu einem benutzerdefinierten Dropdown mit Tooltips
     * @param {HTMLSelectElement} selectElement - Das zu konvertierende Select-Element
     * @param {HTMLElement} tooltip - Das Tooltip-Element
     */
    function convertToCustomDropdown(selectElement, tooltip) {
        // Markieren, dass dieses Element bereits verbessert wurde
        selectElement.dataset.enhanced = 'true';
        
        // Original-ID und Auswahl speichern
        const originalId = selectElement.id;
        const selectedValue = selectElement.value;
        
        // Container für das benutzerdefinierte Dropdown erstellen
        const customContainer = document.createElement('div');
        customContainer.className = 'custom-dropdown-container';
        customContainer.style.position = 'relative';
        customContainer.style.width = '100%';
        customContainer.style.marginBottom = '10px';
        
        // Das Select-Element verstecken und in den Container verschieben
        selectElement.style.display = 'none';
        selectElement.parentNode.insertBefore(customContainer, selectElement);
        customContainer.appendChild(selectElement);
        
        // Den Dropdown-Button erstellen
        const dropdownButton = document.createElement('div');
        dropdownButton.className = 'custom-dropdown-button';
        dropdownButton.style.width = '100%';
        dropdownButton.style.padding = '10px';
        dropdownButton.style.backgroundColor = 'white';
        dropdownButton.style.border = '1px solid #ddd';
        dropdownButton.style.borderRadius = '4px';
        dropdownButton.style.cursor = 'pointer';
        dropdownButton.style.position = 'relative';
        dropdownButton.style.boxSizing = 'border-box';
        dropdownButton.style.fontSize = '14px';
        
        // Pfeil hinzufügen
        dropdownButton.style.backgroundImage = 'url("data:image/svg+xml;charset=utf8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 4 5\'%3E%3Cpath fill=\'%23333\' d=\'M2 0L0 2h4zm0 5L0 3h4z\'/%3E%3C/svg%3E")';
        dropdownButton.style.backgroundRepeat = 'no-repeat';
        dropdownButton.style.backgroundPosition = 'right 10px center';
        dropdownButton.style.backgroundSize = '8px 10px';
        dropdownButton.style.paddingRight = '25px';
        
        // Ausgewählten Text festlegen
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        dropdownButton.textContent = selectedOption ? selectedOption.text : 'Zauber auswählen';
        
        customContainer.appendChild(dropdownButton);
        
        // Dropdown-Liste erstellen
        const dropdownList = document.createElement('div');
        dropdownList.className = 'custom-dropdown-list';
        dropdownList.style.display = 'none';
        dropdownList.style.position = 'absolute';
        dropdownList.style.left = '0';
        dropdownList.style.right = '0';
        // Position wird dynamisch festgelegt (oben oder unten)
        dropdownList.style.maxHeight = '500px';
        dropdownList.style.overflowY = 'auto';
        dropdownList.style.backgroundColor = 'white';
        dropdownList.style.border = '1px solid #ddd';
        dropdownList.style.borderRadius = '4px';
        dropdownList.style.zIndex = '10';
        dropdownList.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        
        customContainer.appendChild(dropdownList);
        
        // Optionen zum Dropdown hinzufügen
        Array.from(selectElement.options).forEach(function(option, index) {
            // Wenn es ein Separator ist (disabled option ohne Wert) oder die erste Option
            if (option.disabled && !option.value) {
                const separator = document.createElement('div');
                separator.className = 'custom-dropdown-separator';
                separator.innerHTML = option.textContent;
                separator.style.padding = '8px 10px';
                separator.style.fontSize = '14px';
                separator.style.fontWeight = 'bold';
                separator.style.borderBottom = '1px solid #eee';
                separator.style.color = option.style.color || 'black';
                separator.style.backgroundColor = option.style.backgroundColor || '#f0f0f0';
                
                dropdownList.appendChild(separator);
                return;
            }
            
            const optionElement = document.createElement('div');
            optionElement.className = 'custom-dropdown-option';
            optionElement.textContent = option.textContent;
            optionElement.dataset.value = option.value;
            optionElement.style.padding = '8px 10px';
            optionElement.style.cursor = 'pointer';
            optionElement.style.transition = 'background-color 0.2s';
            
            // Speichern der zusätzlichen Datenattribute
            if (option.dataset.spellId) {
                optionElement.dataset.spellId = option.dataset.spellId;
            }
            if (option.dataset.magieschule) {
                optionElement.dataset.magieschule = option.dataset.magieschule;
            }
            if (option.dataset.level) {
                optionElement.dataset.level = option.dataset.level;
            }
            
            // Stil basierend auf Magieschule und Level
            if (option.dataset.magieschule) {
                const magieschule = option.dataset.magieschule;
                let bgColor = '';
                let textColor = '';
                
                switch(magieschule) {
                    case 'zerstoerung':
                        bgColor = 'rgba(255, 0, 0, 0.05)';
                        textColor = '#cc0000'; // Rot
                        break;
                    case 'unterstuetzung':
                        bgColor = 'rgba(255, 215, 0, 0.05)';
                        textColor = '#b8860b'; // Goldgelb (DarkGoldenRod)
                        break;
                    case 'verfall':
                        bgColor = 'rgba(128, 0, 128, 0.05)';
                        textColor = '#800080'; // Lila
                        break;
                    case 'magiekunst':
                        bgColor = 'rgba(0, 0, 255, 0.05)';
                        textColor = '#0000cc'; // Blau
                        break;
                    case 'beschwoerung':
                        bgColor = 'rgba(0, 128, 0, 0.05)';
                        textColor = '#006400'; // Grün
                        break;
                }
                
                optionElement.style.backgroundColor = bgColor;
                optionElement.style.color = textColor;
                optionElement.style.fontWeight = 'bold';
            }
            
            // Markieren der ausgewählten Option
            if (option.value === selectedValue) {
                optionElement.classList.add('selected');
                optionElement.style.backgroundColor = '#e0e0e0';
            }
            
            // Falls die Option deaktiviert ist
            if (option.disabled) {
                optionElement.classList.add('disabled');
                optionElement.style.opacity = '0.5'; // Statt Farbe zu ändern, Transparenz erhöhen
                optionElement.style.fontStyle = 'italic';
                optionElement.style.cursor = 'not-allowed';
            }
            
            // Mouseover-Effekt
            optionElement.addEventListener('mouseenter', function(e) {
                // Bei disabled-Optionen nur den Hintergrund nicht ändern, aber Tooltip trotzdem anzeigen
                if (!this.classList.contains('disabled')) {
                    // Hintergrund dunkler machen, aber Textfarbe beibehalten
                    if (this.dataset.magieschule) {
                        const magieschule = this.dataset.magieschule;
                        let bgColor = '';
                        
                        switch(magieschule) {
                            case 'zerstoerung':
                                bgColor = 'rgba(255, 0, 0, 0.2)'; // Dunkleres Rot
                                break;
                            case 'unterstuetzung':
                                bgColor = 'rgba(255, 215, 0, 0.2)'; // Dunkleres Gold
                                break;
                            case 'verfall':
                                bgColor = 'rgba(128, 0, 128, 0.2)'; // Dunkleres Lila
                                break;
                            case 'magiekunst':
                                bgColor = 'rgba(0, 0, 255, 0.2)'; // Dunkleres Blau
                                break;
                            case 'beschwoerung':
                                bgColor = 'rgba(0, 128, 0, 0.2)'; // Dunkleres Grün
                                break;
                        }
                        
                        this.style.backgroundColor = bgColor;
                    } else {
                        this.style.backgroundColor = '#f0f0f0';
                    }
                }
                
                // Tooltip anzeigen wenn es eine Zauber-Option ist (auch für deaktivierte Optionen)
                if (this.dataset.spellId) {
                    const spell = spellService.getZauberById(this.dataset.spellId);
                    if (spell) {
                        // Magieschule in lesbarer Form und passende Farbe bestimmen
                        let magieschuleText = "";
                        let headerColor = ""; // Farbe für die Überschrift im Tooltip
                        
                        switch (spell.magieschule) {
                            case "zerstoerung": 
                                magieschuleText = "Zerstörung"; 
                                headerColor = "#cc0000"; // Rot
                                break;
                            case "unterstuetzung": 
                                magieschuleText = "Unterstützung"; 
                                headerColor = "#b8860b"; // Goldgelb
                                break;
                            case "verfall": 
                                magieschuleText = "Verfall"; 
                                headerColor = "#800080"; // Lila
                                break;
                            case "magiekunst": 
                                magieschuleText = "Zauberkunst"; 
                                headerColor = "#0000cc"; // Blau
                                break;
                            case "beschwoerung": 
                                magieschuleText = "Beschwörung"; 
                                headerColor = "#006400"; // Grün
                                break;
                            default: 
                                magieschuleText = spell.magieschule;
                                headerColor = "#4CAF50"; // Standardfarbe
                        }
                        
                        // Info über Sperrung hinzufügen, falls der Zauber deaktiviert ist
                        let disabledInfo = "";
                        if (this.classList.contains('disabled')) {
                            disabledInfo = `<p style="margin: 5px 0; color: #f44336;"><strong>Hinweis:</strong> Dieser Zauber ist für deinen Charakter derzeit nicht verfügbar. <strong>Erhöhe deinen MA-Wert!</strong></p>`;
                        }
                        
                        // Tooltip-Inhalt setzen
                        tooltip.innerHTML = `
                            <h4 style="margin: 0 0 8px 0; font-size: 16px; color: ${headerColor}; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 5px; text-shadow: 0 0 1px #fff, 0 0 2px rgba(255, 255, 255, 0.5);">
                                ${spell.name} (Lvl ${spell.level})
                            </h4>
                            <p style="margin: 5px 0;"><strong>Kosten:</strong> ${spell.mpKosten} MP | <strong>Schule:</strong> ${magieschuleText}</p>
                            ${disabledInfo}
                            <p style="margin: 5px 0;">${spell.beschreibung}</p>
                        `;
                        
                        // Tooltip anzeigen und positionieren
                        tooltip.style.display = 'block';
                        
                        // Position des Tooltips aktualisieren
                        updateTooltipPosition(e);
                        
                        // Event-Listener für Mausbewegung hinzufügen
                        document.addEventListener('mousemove', updateTooltipPosition);
                    }
                }
            });
            
            // Mouseleave-Effekt
            optionElement.addEventListener('mouseleave', function() {
                // Hintergrundfarbe zurücksetzen (für alle Elemente, auch disabled)
                if (this.classList.contains('selected')) {
                    this.style.backgroundColor = '#e0e0e0';
                } else if (this.dataset.magieschule) {
                    // Magieschule-Hintergrund wiederherstellen
                    const magieschule = this.dataset.magieschule;
                    let bgColor = '';
                    
                    switch(magieschule) {
                        case 'zerstoerung':
                            bgColor = 'rgba(255, 0, 0, 0.05)';
                            break;
                        case 'unterstuetzung':
                            bgColor = 'rgba(255, 215, 0, 0.05)';
                            break;
                        case 'verfall':
                            bgColor = 'rgba(128, 0, 128, 0.05)';
                            break;
                        case 'magiekunst':
                            bgColor = 'rgba(0, 0, 255, 0.05)';
                            break;
                        case 'beschwoerung':
                            bgColor = 'rgba(0, 128, 0, 0.05)';
                            break;
                    }
                    
                    this.style.backgroundColor = bgColor;
                    // Textfarbe bleibt unverändert
                } else {
                    this.style.backgroundColor = '';
                }
                
                // Tooltip ausblenden
                tooltip.style.display = 'none';
                
                // Event-Listener für Mausbewegung entfernen
                document.removeEventListener('mousemove', updateTooltipPosition);
            });
            
            // Click-Ereignis
            optionElement.addEventListener('click', function() {
                if (!this.classList.contains('disabled')) {
                    // Wert im Select-Element aktualisieren
                    selectElement.value = this.dataset.value;
                    
                    // Button-Text aktualisieren
                    dropdownButton.textContent = this.textContent;
                    
                    // Dropdown schließen
                    dropdownList.style.display = 'none';
                    
                    // Markieren der neu ausgewählten Option
                    Array.from(dropdownList.querySelectorAll('.custom-dropdown-option')).forEach(opt => {
                        opt.classList.remove('selected');
                        
                        // Farben zurücksetzen
                        if (opt.dataset.magieschule) {
                            const magieschule = opt.dataset.magieschule;
                            let bgColor = '';
                            let textColor = '';
                            
                            switch(magieschule) {
                                case 'zerstoerung':
                                    bgColor = 'rgba(255, 0, 0, 0.05)';
                                    textColor = '#cc0000'; // Rot
                                    break;
                                case 'unterstuetzung':
                                    bgColor = 'rgba(255, 215, 0, 0.05)';
                                    textColor = '#b8860b'; // Goldgelb
                                    break;
                                case 'verfall':
                                    bgColor = 'rgba(128, 0, 128, 0.05)';
                                    textColor = '#800080'; // Lila
                                    break;
                                case 'magiekunst':
                                    bgColor = 'rgba(0, 0, 255, 0.05)';
                                    textColor = '#0000cc'; // Blau
                                    break;
                                case 'beschwoerung':
                                    bgColor = 'rgba(0, 128, 0, 0.05)';
                                    textColor = '#006400'; // Grün
                                    break;
                            }
                            
                            opt.style.backgroundColor = bgColor;
                            opt.style.color = textColor;
                        } else {
                            opt.style.backgroundColor = '';
                            opt.style.color = '';
                        }
                    });
                    
                    this.classList.add('selected');
                    this.style.backgroundColor = '#e0e0e0';
                    
                    // Change-Event für das Original-Select auslösen
                    const event = new Event('change', { bubbles: true });
                    selectElement.dispatchEvent(event);
                }
            });
            
            dropdownList.appendChild(optionElement);
        });
        
        // Dropdown öffnen/schließen bei Klick auf den Button
        dropdownButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = dropdownList.style.display === 'block';
            
            // Alle Dropdowns schließen
            document.querySelectorAll('.custom-dropdown-list').forEach(list => {
                list.style.display = 'none';
            });
            
            // Dieses Dropdown öffnen, wenn es geschlossen war
            if (!isOpen) {
                // Prüfen, ob das Dropdown nach oben oder unten geöffnet werden soll
                const dropdownRect = dropdownButton.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const spaceBelow = windowHeight - dropdownRect.bottom;
                const spaceNeeded = Math.min(500, Array.from(dropdownList.children).length * 30); // Ca. 30px pro Option
                
                if (spaceBelow < spaceNeeded && dropdownRect.top > spaceNeeded) {
                    // Wenn unter dem Dropdown nicht genug Platz ist, aber oben schon, nach oben öffnen
                    dropdownList.style.top = 'auto';
                    dropdownList.style.bottom = '100%';
                    dropdownList.style.maxHeight = `${Math.min(500, dropdownRect.top - 10)}px`; // 10px Abstand zum oberen Rand
                } else {
                    // Ansonsten nach unten öffnen
                    dropdownList.style.top = '100%';
                    dropdownList.style.bottom = 'auto';
                    dropdownList.style.maxHeight = `${Math.min(500, windowHeight - dropdownRect.bottom - 10)}px`; // 10px Abstand zum unteren Rand
                }
                
                dropdownList.style.display = 'block';
            }
        });
        
        // Schließen bei Klick außerhalb
        document.addEventListener('click', function() {
            dropdownList.style.display = 'none';
        });

        if (typeof makeCustomDropdownSearchable === 'function') {
            makeCustomDropdownSearchable(dropdownList, selectElement);
        }
    }
    
    /**
     * Aktualisiert die Position des Tooltips basierend auf der Mausposition
     * @param {MouseEvent} e - Das Mausevent
     */
    function updateTooltipPosition(e) {
        const tooltip = document.querySelector('.spell-hover-tooltip');
        if (!tooltip) return;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Tooltip-Größe ermitteln
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;
        
        // Fenstergröße ermitteln
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Offset vom Mauszeiger
        const offsetX = 15;
        const offsetY = 20;
        
        // Prüfen, ob der Tooltip über den rechten Rand hinausragt
        let posX = mouseX + offsetX;
        if (posX + tooltipWidth > windowWidth) {
            posX = mouseX - tooltipWidth - offsetX;
        }
        
        // Prüfen, ob der Tooltip über den unteren Rand hinausragt
        let posY = mouseY + offsetY;
        if (posY + tooltipHeight > windowHeight) {
            posY = mouseY - tooltipHeight - offsetY;
        }
        
        // Tooltip positionieren
        tooltip.style.left = posX + 'px';
        tooltip.style.top = posY + 'px';
    }
    
    /**
     * Erstellt einen MutationObserver, um neue Zauber-Slots zu beobachten
     */
    function setupMutationObserver() {
        // Beobachter für das Hinzufügen neuer Zauber-Slots
        const observer = new MutationObserver(function(mutations) {
            let newSelectsFound = false;
            
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // Prüfen, ob es ein Zauber-Slot ist oder einen enthält
                            const selectElements = node.classList && node.classList.contains('spell-select') ? 
                                                  [node] : node.querySelectorAll('.spell-select');
                            
                            if (selectElements.length > 0) {
                                selectElements.forEach(function(select) {
                                    if (select.dataset.enhanced !== 'true') {
                                        newSelectsFound = true;
                                    }
                                });
                            }
                        }
                    });
                }
            });
            
            // Wenn neue Zauber-Slots gefunden wurden, verbessere sie
            if (newSelectsFound) {
                const tooltip = document.querySelector('.spell-hover-tooltip');
                const newSelects = document.querySelectorAll('.spell-select:not([data-enhanced="true"])');
                
                newSelects.forEach(function(select) {
                    convertToCustomDropdown(select, tooltip);
                });
            }
        });
        
        // Beobachten des Containers für Zauber-Slots
        const container = document.getElementById('spell-slots-container');
        if (container) {
            observer.observe(container, { childList: true, subtree: true });
        }
    }

    

    /**
     * Macht ein benutzerdefiniertes Dropdown-Menü suchbar und fügt Enter-Tasten-Unterstützung hinzu
     * @param {HTMLElement} dropdownList - Das Container-Element für die Dropdown-Optionen
     * @param {HTMLSelectElement} originalSelect - Das Original-Select-Element
     */
    function makeCustomDropdownSearchable(dropdownList, originalSelect) {
        // Suchpuffer und Timer für die Suche
        let searchBuffer = '';
        let searchTimer = null;
        let highlightedOption = null;
        
        // Event-Listener für Tastaturereignisse
        document.addEventListener('keydown', function(e) {
            // Nur aktiv, wenn das Dropdown sichtbar ist
            if (dropdownList.style.display !== 'block') {
                return;
            }
            
            // Behandlung der Enter-Taste
            if (e.key === 'Enter' || e.keyCode === 13) {
                console.log('Enter-Taste in Zauber-Dropdown erkannt');
                
                // Wenn eine Option hervorgehoben ist
                if (highlightedOption && !highlightedOption.classList.contains('disabled')) {
                    console.log('Hervorgehobene Option wird ausgewählt:', highlightedOption.textContent);
                    
                    // Simuliere einen Klick auf die Option
                    try {
                        // MouseEvent erstellen und dispatchen für robustere Interaktion
                        const clickEvent = new MouseEvent('click', {
                            view: window,
                            bubbles: true,
                            cancelable: true
                        });
                        highlightedOption.dispatchEvent(clickEvent);
                        
                        // Verhindere das Standard-Enter-Verhalten
                        e.preventDefault();
                        e.stopPropagation();
                        return true;
                    } catch (error) {
                        console.error('Fehler beim Klick-Simulieren:', error);
                        // Fallback: Native click()-Methode
                        highlightedOption.click();
                        e.preventDefault();
                        return true;
                    }
                } else {
                    console.log('Keine hervorgehobene Option oder Option deaktiviert');
                }
            }
            
            // Ignorieren, wenn es sich um andere Steuerungstasten handelt
            if (e.key.length > 1) {
                // Bei Escape-Taste auch den Suchpuffer leeren
                if (e.key === 'Escape') {
                    searchBuffer = '';
                    highlightedOption = null;
                }
                return;
            }
            
            // Zeichen zum Suchpuffer hinzufügen
            searchBuffer += e.key.toLowerCase();
            console.log('Suchbuffer:', searchBuffer);
            
            // Timer zurücksetzen, um den Suchpuffer nach Inaktivität zu leeren
            clearTimeout(searchTimer);
            searchTimer = setTimeout(() => {
                searchBuffer = '';
                highlightedOption = null;
            }, 1500); // 1,5 Sekunden Timeout
            
            // Alle suchbaren Optionen sammeln (keine Überschriften/Trennlinien)
            const allOptions = Array.from(dropdownList.children).filter(child => {
                return child.classList.contains('custom-dropdown-option') && 
                    !child.classList.contains('custom-dropdown-separator');
            });
            
            console.log("Durchsuchbare Optionen:", allOptions.length);
            
            // Jeden Zauber überprüfen
            let found = false;
            for (let i = 0; i < allOptions.length; i++) {
                const option = allOptions[i];
                const text = option.textContent.trim().toLowerCase();
                
                // Wenn der Text mit dem Suchpuffer beginnt, diese Option hervorheben
                if (text.startsWith(searchBuffer)) {                    
                    // Option speichern und hervorheben
                    highlightedOption = option;
                    highlightAndScrollToOption(option, allOptions, dropdownList);
                    
                    console.log('Gefundene Option:', option.textContent);
                    found = true;
                    break;
                }
            }
            
            if (!found) {
                console.log("Kein Treffer für:", searchBuffer);
                highlightedOption = null;
            }
        });
        
        // Beim Öffnen des Dropdowns Suchpuffer zurücksetzen
        const dropdownButton = dropdownList.previousElementSibling;
        if (dropdownButton) {
            dropdownButton.addEventListener('click', function() {
                searchBuffer = '';
                highlightedOption = null;
            });
        }
        
        // Event-Listener für Enter-Taste auf dem Dropdown selbst
        dropdownList.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.keyCode === 13) {
                console.log('Enter direkt im Dropdown erkannt');
                
                if (highlightedOption && !highlightedOption.classList.contains('disabled')) {
                    console.log('Dropdown-lokale Enter-Behandlung - Option wird geklickt');
                    highlightedOption.click();
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        });
        
        // Funktion zum Hervorheben und Scrollen
        function highlightAndScrollToOption(option, allOptions, container) {
            // Alle Optionen zurücksetzen
            allOptions.forEach(opt => {
                // Originale Hintergrundfarbe wiederherstellen
                if (opt.dataset.originalBgColor) {
                    opt.style.backgroundColor = opt.dataset.originalBgColor;
                } else if (opt.style.backgroundColor) {
                    // Speichern der original Hintergrundfarbe, falls sie noch nicht gespeichert wurde
                    opt.dataset.originalBgColor = opt.style.backgroundColor;
                } else {
                    // Leeren, falls keine Hintergrundfarbe gesetzt ist
                    opt.style.backgroundColor = '';
                }
            });
            
            // Ausgewählte Option hervorheben mit deutlicher Farbe
            option.style.backgroundColor = 'rgba(76, 175, 80, 0.5)'; // Kräftigeres Grün für bessere Sichtbarkeit
            
            // Zum Element scrollen
            option.scrollIntoView({ block: 'nearest', behavior: 'auto' });
        }
    }

    /**
     * Hebt eine benutzerdefinierte Option hervor und stellt sicher, dass sie sichtbar ist
     * @param {HTMLElement} option - Die hervorzuhebende Option
     * @param {Array} allOptions - Alle Optionen im Dropdown
     * @param {HTMLElement} container - Der Container mit dem Dropdown
     */
    function highlightCustomOption(option, allOptions, container) {
        // Zurücksetzen aller anderen Optionen
        allOptions.forEach(opt => {
            opt.style.backgroundColor = '';
            if (opt.classList.contains('selected')) {
                // Ursprüngliche Farbe für ausgewählte Optionen wiederherstellen
                opt.style.backgroundColor = '#e0e0e0';
            } else if (opt.dataset && opt.dataset.magieschule) {
                // Ursprüngliche Farben für Magieschul-Optionen wiederherstellen
                const magieschule = opt.dataset.magieschule;
                let bgColor = '';
                
                switch(magieschule) {
                    case 'zerstoerung':
                        bgColor = 'rgba(255, 0, 0, 0.05)';
                        break;
                    case 'unterstuetzung':
                        bgColor = 'rgba(255, 215, 0, 0.05)';
                        break;
                    case 'verfall':
                        bgColor = 'rgba(128, 0, 128, 0.05)';
                        break;
                    case 'magiekunst':
                        bgColor = 'rgba(0, 0, 255, 0.05)';
                        break;
                    case 'beschwoerung':
                        bgColor = 'rgba(0, 128, 0, 0.05)';
                        break;
                }
                
                opt.style.backgroundColor = bgColor;
            }
        });
        
        // Hervorheben der gefundenen Option
        option.style.backgroundColor = 'rgba(76, 175, 80, 0.2)'; // Leichtes Grün
        
        // Sicherstellen, dass die Option sichtbar ist
        const optionRect = option.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        if (optionRect.top < containerRect.top || optionRect.bottom > containerRect.bottom) {
            option.scrollIntoView({ block: 'nearest' });
        }
    }
});
// inventoryManager.js - Funktionalität für das Inventarsystem

document.addEventListener('DOMContentLoaded', function() {
    // Referenzen auf DOM-Elemente
    const inventoryContainer = document.getElementById('inventory-container');
    const itemSlotsContainer = document.getElementById('item-slots-container');
    const addItemButton = document.getElementById('add-item-button');
    
    // Initialisierung des Inventars
    initInventory();
    
    // Funktion zur Initialisierung des Inventars anpassen
    function initInventory() {
        // Standard-Anzahl an Slots
        let slotsCount = 3;
        
        // Vorteil "Reich" prüfen
        const advantageSelect = document.getElementById('advantage');
        if (advantageSelect && advantageSelect.value === 'reich') {
            slotsCount += 3; // 3 zusätzliche Slots für "Reich"
        }
        
        // Slots erstellen
        for (let i = 0; i < slotsCount; i++) {
            createItemSlot();
        }
        
        // Event-Listener für den Vorteil hinzufügen, um auf Änderungen zu reagieren
        if (advantageSelect) {
            advantageSelect.addEventListener('change', updateSlotsByAdvantage);
        }
    }

    // Funktion zum Aktualisieren der Slots basierend auf dem gewählten Vorteil
    function updateSlotsByAdvantage() {
        const advantageSelect = document.getElementById('advantage');
        const itemSlotsContainer = document.getElementById('item-slots-container');
        
        if (!advantageSelect || !itemSlotsContainer) return;
        
        const isRich = advantageSelect.value === 'reich';
        const currentSlots = itemSlotsContainer.querySelectorAll('.item-slot').length;
        
        // Standard-Anzahl: 3 Slots
        const standardSlots = 3;
        const richBonus = 3;
        
        if (isRich && currentSlots < standardSlots + richBonus) {
            // Wenn "Reich" gewählt und weniger als 6 Slots vorhanden, weitere hinzufügen
            const slotsToAdd = (standardSlots + richBonus) - currentSlots;
            for (let i = 0; i < slotsToAdd; i++) {
                createItemSlot();
            }
        } else if (!isRich && currentSlots > standardSlots) {
            // Wenn "Reich" nicht gewählt und mehr als 3 Slots vorhanden, überschüssige entfernen
            const slotsToRemove = currentSlots - standardSlots;
            const slotElements = itemSlotsContainer.querySelectorAll('.item-slot');
            
            // Entferne die letzten Slots (von unten nach oben)
            for (let i = 0; i < slotsToRemove; i++) {
                if (slotElements.length > standardSlots) {
                    itemSlotsContainer.removeChild(slotElements[slotElements.length - 1 - i]);
                }
            }
        }
    }
    
    /**
     * Erstellt einen neuen Item-Slot im Inventar
     * @param {string} selectedItemId - Optional: ID eines vorausgewählten Items
     */
    function createItemSlot(selectedItemId = "") {
        // Container für den Slot erstellen
        const slotContainer = document.createElement('div');
        slotContainer.className = 'item-slot';
        
        // Erstelle die Struktur des Item-Slots
        const slotContent = `
            <div class="item-row">
                <div class="item-select-container">
                    <select class="item-select">
                        <option value="">-- Item auswählen --</option>
                        <!-- Optionen werden durch JavaScript eingefügt -->
                    </select>
                </div>
                <div class="item-quantity-container">
                    <input type="number" class="item-quantity" value="1" min="1" readonly>
                </div>
                <div class="item-actions">
                    <button class="remove-item-button">X</button>
                </div>
            </div>
            <div class="item-effect-container">
                <textarea class="item-effect" readonly></textarea>
            </div>
        `;
        
        slotContainer.innerHTML = slotContent;
        
        // Referenzen auf die erstellten Elemente
        const itemSelect = slotContainer.querySelector('.item-select');
        const itemQuantity = slotContainer.querySelector('.item-quantity');
        const itemEffect = slotContainer.querySelector('.item-effect');
        const removeButton = slotContainer.querySelector('.remove-item-button');
        
        // Fülle das Dropdown mit Items
        const allItems = itemService.getAllItems();
        allItems.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.name;
            option.dataset.beschreibung = item.beschreibung;
            option.dataset.effekt = item.beschreibung;
            option.dataset.anzahl = item.anzahl || 1; // Standard: 1, falls keine Anzahl angegeben
            itemSelect.appendChild(option);
        });
        
        // Setze vorausgewähltes Item, falls angegeben
        if (selectedItemId) {
            itemSelect.value = selectedItemId;
            updateItemEffect(itemSelect, itemEffect);
            updateItemQuantity(itemSelect, itemQuantity);
        }
        
        // Event-Listener für Änderungen der Item-Auswahl
        itemSelect.addEventListener('change', function() {
            updateItemEffect(this, itemEffect);
            updateItemQuantity(this, itemQuantity);
        });
        
        // Event-Listener für den Entfernen-Button
        removeButton.addEventListener('click', function() {
            removeItemSlot(slotContainer);
        });
        
        // Füge den Slot zum Container hinzu
        itemSlotsContainer.appendChild(slotContainer);
        
        // Füge Tooltip-Funktionalität hinzu
        setupItemTooltip(itemSelect);
    }

    /**
     * Aktualisiert das Effekt-Textfeld basierend auf der Item-Auswahl
     * @param {HTMLSelectElement} selectElement - Das Select-Element
     * @param {HTMLTextAreaElement} effectElement - Das Effekt-Textfeld
     */
    function updateItemEffect(selectElement, effectElement) {
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        
        if (selectedOption && selectedOption.value) {
            effectElement.value = selectedOption.dataset.beschreibung || '';
        } else {
            effectElement.value = '';
        }
    }

    /**
     * Aktualisiert die Menge basierend auf der Item-Auswahl
     * @param {HTMLSelectElement} selectElement - Das Select-Element
     * @param {HTMLInputElement} quantityElement - Das Mengen-Eingabefeld
     */
    function updateItemQuantity(selectElement, quantityElement) {
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        
        if (selectedOption && selectedOption.value) {
            quantityElement.value = selectedOption.dataset.anzahl || 1;
        } else {
            quantityElement.value = 1;
        }
    }
    
    /**
     * Entfernt einen Item-Slot aus dem Inventar
     * @param {HTMLElement} slotContainer - Der zu entfernende Slot-Container
     */
    function removeItemSlot(slotContainer) {
        // Anstatt den Slot zu entfernen, setzen wir nur seine Werte zurück
        const itemSelect = slotContainer.querySelector('.item-select');
        const itemQuantity = slotContainer.querySelector('.item-quantity');
        const itemEffect = slotContainer.querySelector('.item-effect');
        
        // Werte zurücksetzen
        if (itemSelect) itemSelect.value = '';
        if (itemQuantity) itemQuantity.value = '1';
        if (itemEffect) itemEffect.value = '';
    }
    
    /**
     * Richtet Tooltip-Funktionalität für Item-Dropdowns ein
     * @param {HTMLSelectElement} selectElement - Das Select-Element
     */
    function setupItemTooltip(selectElement) {
        // Tooltip-Element erstellen, falls es noch nicht existiert
        let tooltip = document.querySelector('.item-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'item-tooltip';
            tooltip.style.display = 'none';
            tooltip.style.position = 'fixed';
            tooltip.style.backgroundColor = 'rgba(28, 30, 34, 0.95)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '12px 15px';
            tooltip.style.borderRadius = '6px';
            tooltip.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.3)';
            tooltip.style.zIndex = '1100';
            tooltip.style.maxWidth = '300px';
            tooltip.style.pointerEvents = 'none';
            tooltip.style.fontSize = '14px';
            tooltip.style.lineHeight = '1.5';
            tooltip.style.border = '1px solid rgba(255, 255, 255, 0.1)';
            document.body.appendChild(tooltip);
        }
        
        // Event-Listener für das Select-Element
        selectElement.addEventListener('mouseenter', function(e) {
            // Nur Tooltip anzeigen, wenn das Dropdown nicht geöffnet ist
            if (this.size === 1) {
                showTooltip(this, e, tooltip);
            }
        });
        
        selectElement.addEventListener('mouseleave', function() {
            hideTooltip(tooltip);
        });
        
        // Event-Listener für die Optionen im Dropdown
        selectElement.addEventListener('focus', function() {
            // Bei Fokus das Dropdown vergrößern
            this.size = Math.min(8, this.options.length);
        });
        
        selectElement.addEventListener('blur', function() {
            // Bei Verlust des Fokus das Dropdown normal machen
            this.size = 1;
        });
        
        selectElement.addEventListener('change', function() {
            // Bei Änderung das Dropdown normal machen
            this.size = 1;
        });
        
        // Event-Listener für Mouseover auf Optionen
        Array.from(selectElement.options).forEach(option => {
            option.addEventListener('mouseenter', function(e) {
                showOptionTooltip(this, e, tooltip);
            });
            
            option.addEventListener('mouseleave', function() {
                hideTooltip(tooltip);
            });
        });
    }
    
    /**
     * Zeigt den Tooltip für ein ausgewähltes Item an
     * @param {HTMLSelectElement} selectElement - Das Select-Element
     * @param {MouseEvent} event - Das Maus-Event
     * @param {HTMLElement} tooltip - Das Tooltip-Element
     */
    function showTooltip(selectElement, event, tooltip) {
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        
        if (selectedOption && selectedOption.value && selectedOption.dataset.beschreibung) {
            const itemName = selectedOption.textContent;
            const itemDescription = selectedOption.dataset.beschreibung;
            
            // Tooltip-Inhalt setzen
            tooltip.innerHTML = `
                <h4 style="margin: 0 0 8px 0; font-size: 16px; color: #4CAF50; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 5px;">${itemName}</h4>
                <p style="margin: 5px 0;">${itemDescription}</p>
            `;
            
            // Tooltip anzeigen und positionieren
            tooltip.style.display = 'block';
            updateTooltipPosition(event, tooltip);
            
            // Event-Listener für Mausbewegung hinzufügen
            document.addEventListener('mousemove', function moveHandler(e) {
                if (selectElement.contains(document.activeElement) || tooltip.style.display === 'none') {
                    document.removeEventListener('mousemove', moveHandler);
                    return;
                }
                updateTooltipPosition(e, tooltip);
            });
        }
    }
    
    /**
     * Zeigt den Tooltip für eine Option im Dropdown an
     * @param {HTMLOptionElement} optionElement - Das Option-Element
     * @param {MouseEvent} event - Das Maus-Event
     * @param {HTMLElement} tooltip - Das Tooltip-Element
     */
    function showOptionTooltip(optionElement, event, tooltip) {
        if (optionElement.value && optionElement.dataset.beschreibung) {
            const itemName = optionElement.textContent;
            const itemDescription = optionElement.dataset.beschreibung;
            
            // Tooltip-Inhalt setzen
            tooltip.innerHTML = `
                <h4 style="margin: 0 0 8px 0; font-size: 16px; color: #4CAF50; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 5px;">${itemName}</h4>
                <p style="margin: 5px 0;">${itemDescription}</p>
            `;
            
            // Tooltip anzeigen und positionieren
            tooltip.style.display = 'block';
            updateTooltipPosition(event, tooltip);
        }
    }
    
    /**
     * Versteckt den Tooltip
     * @param {HTMLElement} tooltip - Das Tooltip-Element
     */
    function hideTooltip(tooltip) {
        tooltip.style.display = 'none';
    }
    
    /**
     * Aktualisiert die Position des Tooltips basierend auf der Mausposition
     * @param {MouseEvent} e - Das Maus-Event
     * @param {HTMLElement} tooltip - Das Tooltip-Element
     */
    function updateTooltipPosition(e, tooltip) {
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
});

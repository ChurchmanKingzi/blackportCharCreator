// alchemistBonus.js - Funktionalität für den Alchemisten-Klassenbonus

document.addEventListener('DOMContentLoaded', function() {
    // Referenzen auf DOM-Elemente
    const classSelect = document.getElementById('class');
    const secondClassSelect = document.getElementById('second-class');
    const itemSlotsContainer = document.getElementById('item-slots-container');
    
    // Globale Variable für Alchemisten-Bonus-Slots
    let alchemistBonusSlots = [];
    
    // Event-Listener für Klassenänderungen
    if (classSelect) {
        classSelect.addEventListener('change', checkAlchemistClass);
    }
    
    // Bei Doppelklasse auch die zweite Klasse überwachen
    if (secondClassSelect) {
        secondClassSelect.addEventListener('change', checkAlchemistClass);
    }
    
    // Beobachter für Änderungen an der Klassenauswahl (für benutzerdefinierte Dropdowns)
    setupClassObserver();
    
    // Initial prüfen, ob Alchemist bereits ausgewählt ist
    setTimeout(checkAlchemistClass, 500);
    
    /**
     * Richtet den MutationObserver für Änderungen im Klassenauswahl-Container ein
     */
    function setupClassObserver() {
        // Prüfen, ob die Form-Grid für Klassen existiert
        const formGridLower = document.querySelector('.form-grid-lower');
        if (!formGridLower) return;
        
        // Observer für Änderungen in der unteren Form-Grid (wo die Klassen sind)
        const observer = new MutationObserver(function(mutations) {
            // Verzögerung hinzufügen, um sicherzustellen, dass Dropdowns vollständig geladen sind
            setTimeout(checkAlchemistClass, 100);
        });
        
        // Beobachte alle Änderungen im Form-Grid
        observer.observe(formGridLower, { 
            subtree: true,        // Beobachte alle Nachkommen
            childList: true,      // Beobachte hinzugefügte/entfernte Kinder
            attributes: true,     // Beobachte Attributänderungen
            attributeFilter: ['value', 'class'] // Nur diese Attribute sind relevant
        });
    }
    
    /**
     * Prüft, ob die Klasse "Alchemist" ausgewählt ist und passt das Inventar an
     */
    function checkAlchemistClass() {
        // Prüfe erste und zweite Klasse (falls vorhanden)
        const isFirstClassAlchemist = classSelect && classSelect.value === 'alchemist';
        const isSecondClassAlchemist = 
            secondClassSelect && 
            secondClassSelect.value === 'alchemist' && 
            secondClassSelect.parentElement.style.display !== 'none';
        
        const isAlchemistSelected = isFirstClassAlchemist || isSecondClassAlchemist;
        
        // Wenn Alchemist ausgewählt ist und bisher keine Boni vorhanden sind
        if (isAlchemistSelected && alchemistBonusSlots.length === 0) {
            addAlchemistItemSlots();
        } 
        // Wenn Alchemist nicht mehr ausgewählt ist, aber Boni vorhanden sind
        else if (!isAlchemistSelected && alchemistBonusSlots.length > 0) {
            removeAlchemistItemSlots();
        }
    }
    
    /**
     * Fügt die zusätzlichen Item-Slots für den Alchemisten hinzu
     */
    function addAlchemistItemSlots() {
        if (!itemSlotsContainer) return;
        
        // Neuen Container für Alchemisten-Slots erstellen
        const alchemistContainer = document.createElement('div');
        alchemistContainer.className = 'alchemist-bonus-container';
        alchemistContainer.style.marginTop = '15px';
        alchemistContainer.style.borderTop = '1px dashed #4CAF50';
        alchemistContainer.style.paddingTop = '15px';
        
        // Überschrift für die Alchemisten-Slots
        const alchemistTitle = document.createElement('div');
        alchemistTitle.innerHTML = `
            <h3 style="color: #4CAF50; font-size: 16px; margin-top: 0; margin-bottom: 10px;">
                Alchemisten-Bonus: Zusätzliche Gegenstände
            </h3>
        `;
        alchemistContainer.appendChild(alchemistTitle);
        
        // Slots erstellen
        // 1. Heiltränke (5 statt 3)
        const healingPotionSlot = createAlchemistItemSlot('heiltrank', '', true, updateToAlchemistAmount);
        alchemistContainer.appendChild(healingPotionSlot);
        alchemistBonusSlots.push(healingPotionSlot);
        
        // 2. Manatränke (5 statt 3)
        const manaPotionSlot = createAlchemistItemSlot('manatrank', '', true, updateToAlchemistAmount);
        alchemistContainer.appendChild(manaPotionSlot);
        alchemistBonusSlots.push(manaPotionSlot);
        
        // 3.-5. Elixier-Slots
        for (let i = 0; i < 3; i++) {
            const elixirSlot = createAlchemistItemSlot('', '', false, null, true);
            alchemistContainer.appendChild(elixirSlot);
            alchemistBonusSlots.push(elixirSlot);
        }
        
        // Container zum Inventar hinzufügen
        itemSlotsContainer.appendChild(alchemistContainer);
        
        // Zeige eine Benachrichtigung
        showAlchemistNotification(true);
    }
    
    /**
     * Entfernt die zusätzlichen Item-Slots des Alchemisten
     */
    function removeAlchemistItemSlots() {
        // Alle Alchemisten-Bonus-Slots aus dem DOM entfernen
        const container = document.querySelector('.alchemist-bonus-container');
        if (container) {
            container.remove();
        }
        
        // Array leeren
        alchemistBonusSlots = [];
        
        // Zeige eine Benachrichtigung
        showAlchemistNotification(false);
    }
    
    /**
     * Erstellt einen Alchemisten-Bonus-Item-Slot
     * @param {string} itemId - Die ID des vorausgewählten Items
     * @param {string} slotName - Bezeichnung des Slots
     * @param {boolean} locked - Ob der Slot gesperrt ist (nicht änderbar)
     * @param {Function} customizer - Funktion zur Anpassung des Items
     * @param {boolean} elixirOnly - Ob nur Elixiere ausgewählt werden dürfen
     * @returns {HTMLElement} Das erstellte Slot-Element
     */
    function createAlchemistItemSlot(itemId = "", slotName = "", locked = false, customizer = null, elixirOnly = false) {
        // Container für den Slot erstellen
        const slotContainer = document.createElement('div');
        slotContainer.className = 'item-slot alchemist-item-slot';
        slotContainer.style.position = 'relative';
        slotContainer.style.borderLeft = '3px solid #4CAF50';
        
        // Spezielle Kennzeichnung für Alchemisten-Slots
        if (locked) {
            slotContainer.dataset.locked = 'true';
        }
        if (elixirOnly) {
            slotContainer.dataset.elixirOnly = 'true';
        }
        
        // Marker für Alchemisten-Bonus oben rechts
        const alchemistMarker = document.createElement('div');
        alchemistMarker.className = 'alchemist-marker';
        alchemistMarker.textContent = slotName;
        alchemistMarker.style.position = 'absolute';
        alchemistMarker.style.top = '8px';
        alchemistMarker.style.right = '8px';
        alchemistMarker.style.fontSize = '12px';
        alchemistMarker.style.color = '#4CAF50';
        alchemistMarker.style.fontWeight = 'bold';
        slotContainer.appendChild(alchemistMarker);
        
        // Erstelle die Struktur des Item-Slots
        const slotContent = `
            <div class="item-row">
                <div class="item-select-container">
                    <select class="item-select" ${locked ? 'disabled' : ''}>
                        <option value="">-- ${elixirOnly ? 'Elixier' : 'Item'} auswählen --</option>
                        <!-- Optionen werden durch JavaScript eingefügt -->
                    </select>
                </div>
                <div class="item-quantity-container">
                    <input type="number" class="item-quantity" value="1" min="1" readonly>
                </div>
                <div class="item-actions">
                    ${locked ? '' : '<button class="remove-item-button">X</button>'}
                </div>
            </div>
            <div class="item-effect-container">
                <textarea class="item-effect" readonly></textarea>
            </div>
        `;
        
        slotContainer.innerHTML += slotContent;
        
        // Referenzen auf die erstellten Elemente
        const itemSelect = slotContainer.querySelector('.item-select');
        const itemQuantity = slotContainer.querySelector('.item-quantity');
        const itemEffect = slotContainer.querySelector('.item-effect');
        const removeButton = slotContainer.querySelector('.remove-item-button');
        
        // Fülle das Dropdown mit Items
        const allItems = itemService.getAllItems();
        
        // Filter für Elixier-only slots
        let itemsToShow = allItems;
        if (elixirOnly) {
            itemsToShow = allItems.filter(item => item.name.toLowerCase().includes('elixier'));
        }
        
        itemsToShow.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.name;
            option.dataset.beschreibung = item.beschreibung;
            option.dataset.anzahl = item.anzahl || 1;
            itemSelect.appendChild(option);
        });
        
        // Setze vorausgewähltes Item, falls angegeben
        if (itemId) {
            itemSelect.value = itemId;
            updateItemEffect(itemSelect, itemEffect);
            updateItemQuantity(itemSelect, itemQuantity);
            
            // Wende die Anpassungsfunktion an, falls vorhanden
            if (customizer && typeof customizer === 'function') {
                customizer(itemSelect, itemQuantity, itemEffect);
            }
        }
        
        // Event-Listener für Änderungen der Item-Auswahl
        itemSelect.addEventListener('change', function() {
            // Bei Elixier-Only-Slots prüfen, ob ein Elixier ausgewählt wurde
            if (elixirOnly && this.value) {
                const selectedItem = itemService.getItemById(this.value);
                if (selectedItem && !selectedItem.name.toLowerCase().includes('elixier')) {
                    // Kein Elixier - Auswahl zurücksetzen
                    this.value = '';
                    alert('In diesem Slot können nur Elixiere ausgewählt werden!');
                    return;
                }
            }
            
            updateItemEffect(this, itemEffect);
            updateItemQuantity(this, itemQuantity);
            
            // Alchemisten-spezifische Anpassungen
            if (customizer && typeof customizer === 'function') {
                customizer(itemSelect, itemQuantity, itemEffect);
            }
        });
        
        // Event-Listener für den Entfernen-Button
        if (removeButton) {
            removeButton.addEventListener('click', function() {
                resetItemSlot(slotContainer);
            });
        }
        
        // Füge Tooltip-Funktionalität hinzu
        if (typeof setupItemTooltip === 'function') {
            setupItemTooltip(itemSelect);
        }
        
        return slotContainer;
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
     * Setzt einen Item-Slot zurück
     * @param {HTMLElement} slotContainer - Der zurückzusetzende Slot-Container
     */
    function resetItemSlot(slotContainer) {
        const itemSelect = slotContainer.querySelector('.item-select');
        const itemQuantity = slotContainer.querySelector('.item-quantity');
        const itemEffect = slotContainer.querySelector('.item-effect');
        
        if (itemSelect) itemSelect.value = '';
        if (itemQuantity) itemQuantity.value = '1';
        if (itemEffect) itemEffect.value = '';
    }
    
    /**
     * Passt Tränke für den Alchemisten an (5 statt 3)
     * @param {HTMLSelectElement} selectElement - Das Select-Element
     * @param {HTMLInputElement} quantityElement - Das Mengen-Eingabefeld
     * @param {HTMLTextAreaElement} effectElement - Das Effekt-Textfeld
     */
    function updateToAlchemistAmount(selectElement, quantityElement, effectElement) {
        if (!selectElement.value) return;
        
        // Prüfe, ob es Heil- oder Manatrank ist
        const itemId = selectElement.value;
        if (itemId === 'heiltrank' || itemId === 'manatrank') {
            // Menge auf 5 erhöhen
            quantityElement.value = '5';
            
            // Beschreibung von "3" auf "5" ändern
            let description = effectElement.value;
            description = description.replace(/3 kleine Phiolen/g, "5 kleine Phiolen");
            description = description.replace(/3 Heiltränke/g, "5 Heiltränke");
            description = description.replace(/3 Manatränke/g, "5 Manatränke");
            effectElement.value = description;
            
            // Auch im select-Element den Namen ändern
            const selectedOption = selectElement.options[selectElement.selectedIndex];
            if (selectedOption) {
                selectedOption.textContent = selectedOption.textContent.replace(/3 /g, "5 ");
            }
        }
    }
    
    /**
     * Zeigt eine Benachrichtigung über den Alchemisten-Bonus an
     * @param {boolean} added - Ob der Bonus hinzugefügt (true) oder entfernt (false) wurde
     */
    function showAlchemistNotification(added) {
        // Erstelle ein Benachrichtigungselement
        const notification = document.createElement('div');
        notification.className = 'alchemist-notification';
        
        if (added) {
            notification.innerHTML = `
                <p>Alchemisten-Bonus aktiviert! Du erhältst 5 zusätzliche Gegenstände für dein Inventar.</p>
            `;
            notification.style.backgroundColor = 'rgba(76, 175, 80, 0.9)';
        } else {
            notification.innerHTML = `
                <p>Alchemisten-Bonus deaktiviert. Die zusätzlichen Gegenstände wurden entfernt.</p>
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
    
    // Globalen Zugriff auf die Prüffunktion ermöglichen
    window.checkAlchemistClass = checkAlchemistClass;
});
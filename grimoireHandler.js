// grimoireHandler.js - Funktionalität für Zaubergrimoire-Effekte

document.addEventListener('DOMContentLoaded', function() {
    // Globale Variablen
    const inventoryContainer = document.getElementById('item-slots-container');
    const spellSlotsContainer = document.getElementById('spell-slots-container');
    const spellSlotsInfo = document.getElementById('spell-slots-info');
    const maInput = document.querySelector('.attribute-column:nth-child(4) h3:nth-of-type(2) .main-attribute-value');
    
    // Globaler Zähler für Grimoire-Slots
    window.grimoireSlots = 0;
    
    // Überwache Änderungen im Inventar
    setupInventoryObserver();
    
    // Initialer Check für bereits vorhandene Grimoires
    setTimeout(checkGrimoireItems, 300);
    
    /**
     * Richtet den MutationObserver für Änderungen im Inventar ein
     */
    function setupInventoryObserver() {
        // Prüfen, ob der Container existiert
        if (!inventoryContainer) {
            console.warn('Inventar-Container nicht gefunden. Der Grimoire-Handler wird nicht initialisiert.');
            return;
        }
        
        // Observer für Änderungen im Inventar
        const observer = new MutationObserver(function(mutations) {
            // Verzögerung hinzufügen, um sicherzustellen, dass Item-Slots vollständig geladen sind
            setTimeout(checkGrimoireItems, 100);
        });
        
        // Beobachte alle Änderungen im Inventar-Container
        observer.observe(inventoryContainer, { 
            childList: true,     // Beobachte hinzugefügte/entfernte Kinder
            subtree: true,       // Beobachte alle Nachkommen
            attributes: true,    // Beobachte Attributänderungen
            attributeFilter: ['value'] // Nur value-Attribute sind relevant
        });
        
        // Event-Listener für Änderungen an Item-Selects
        inventoryContainer.addEventListener('change', function(e) {
            if (e.target && e.target.classList.contains('item-select')) {
                // Wenn ein Item-Select geändert wurde, prüfe Grimoires
                setTimeout(checkGrimoireItems, 100);
            }
        });
    }
    
    /**
     * Prüft, ob Grimoire-Gegenstände im Inventar vorhanden sind und passt Zauberslots an
     */
    function checkGrimoireItems() {
        // Zähle, wie viele Zaubergrimoires im Inventar sind
        const itemSelects = document.querySelectorAll('.item-select');
        let currentGrimoireCount = 0;
        
        itemSelects.forEach(select => {
            if (select.value === 'zaubergrimoire') {
                currentGrimoireCount++;
            }
        });
        
        // Wenn sich die Anzahl geändert hat, passe die Zauberslots an
        if (currentGrimoireCount !== grimoireSlots) {
            updateSpellSlotsByGrimoire(currentGrimoireCount);
        }
    }
    
    /**
     * Aktualisiert die Anzahl der Zauberslots basierend auf Grimoire-Gegenständen
     * @param {number} grimoireCount - Aktuelle Anzahl der Grimoire-Gegenstände
     */
    function updateSpellSlotsByGrimoire(grimoireCount) {
        // Speichere die alte Anzahl für Vergleich
        const oldGrimoireCount = grimoireSlots;
        grimoireSlots = grimoireCount;
        
        // Prüfe, ob wir die Zauberslots aktualisieren müssen
        if (!spellSlotsContainer || !maInput) {
            console.warn('Zauberslot-Container oder MA-Input nicht gefunden.');
            return;
        }
        
        // MA-Wert abrufen
        const maValue = parseInt(maInput.value) || 1;
        
        // Prüfen auf den Vorteil "Gelehrig"
        const advantageSelect = document.getElementById('advantage');
        const hasGelehrigVorteil = advantageSelect && advantageSelect.value === 'gelehrig';
        
        // Berechne Grundanzahl der Slots: 2 + MA + (3 wenn Gelehrig)
        // Dies entspricht der Berechnung in der spellbookManager.js
        let baseSlots = 2 + maValue;
        if (hasGelehrigVorteil) {
            baseSlots += 3;
        }
        
        // Gesamtzahl der Slots mit Grimoire-Bonus
        const totalSlots = baseSlots + grimoireCount;
        
        // Anzahl der aktuellen Slots zählen
        const currentSlotCount = document.querySelectorAll('.spell-slot').length;
        
        // Wenn sich die Anzahl der Slots geändert hat
        if (currentSlotCount !== totalSlots) {
            // Rufe die Standard-Aktualisierungsfunktion des SpellbookManagers auf
            if (typeof window.updateSpellSlots === 'function') {
                // Speichere temporär den Grimoire-Bonus für das window-Objekt
                window.grimoireBonus = grimoireCount;
                
                // Löse ein Ereignis aus, das die Zauberslots aktualisiert
                const inputEvent = new Event('input', { bubbles: true });
                maInput.dispatchEvent(inputEvent);
            } else {
                // Falls die Standardfunktion nicht verfügbar ist, erzwingen wir einen direkten Update
                updateSpellSlotsDirectly(totalSlots);
            }
        }
        
        // Wenn Grimoire-Anzahl gestiegen ist, zeige eine Benachrichtigung
        if (grimoireCount > oldGrimoireCount) {
            showGrimoireNotification(grimoireCount - oldGrimoireCount);
        }
    }
    
    /**
     * Aktualisiert Zauberslots direkt ohne Standard-Aktualisierungsfunktion
     * @param {number} totalSlots - Anzahl der gewünschten Slots
     */
    function updateSpellSlotsDirectly(totalSlots) {
        if (!spellSlotsContainer || !spellSlotsInfo) return;
        
        // Bestehende Zauber speichern
        const existingSpells = [];
        const spellSelects = document.querySelectorAll('.spell-select');
        
        spellSelects.forEach(select => {
            const spell = {
                id: select.value || ""
            };
            existingSpells.push(spell);
        });
        
        // Info-Text aktualisieren
        spellSlotsInfo.textContent = `(${totalSlots} Plätze verfügbar)`;
        
        // Zauber-Container leeren
        spellSlotsContainer.innerHTML = '';
        
        // Zauberslots neu erstellen
        for (let i = 0; i < totalSlots; i++) {
            const slotId = i < existingSpells.length ? existingSpells[i].id : "";
            createSpellSlot(i, slotId);
        }
    }
    
    /**
     * Erstellt einen Zauberslot (Minimale Implementierung, wenn updateSpellSlots nicht verfügbar)
     * @param {number} index - Index des Zauberslots
     * @param {string} selectedSpellId - ID des vorausgewählten Zaubers (wenn vorhanden)
     */
    function createSpellSlot(index, selectedSpellId) {
        // Container für den Slot erstellen
        const slotContainer = document.createElement('div');
        slotContainer.className = 'spell-slot';
        
        // Dropdown für Zauberauswahl erstellen
        const spellSelect = document.createElement('select');
        spellSelect.className = 'spell-select';
        spellSelect.id = `spell-select-${index}`;
        
        // Platzhalter-Option
        const placeholderOption = document.createElement('option');
        placeholderOption.value = "";
        placeholderOption.textContent = `-- Zauber ${index + 1} wählen --`;
        spellSelect.appendChild(placeholderOption);
        
        // Da wir nicht die komplette Funktionalität nachbilden können,
        // fügen wir nur den Container und das Select-Element hinzu
        slotContainer.appendChild(spellSelect);
        
        // Info-Box für Zauberdetails (minimal)
        const spellInfoBox = document.createElement('div');
        spellInfoBox.className = 'spell-info';
        spellInfoBox.id = `spell-info-${index}`;
        slotContainer.appendChild(spellInfoBox);
        
        // Container zum Hauptcontainer hinzufügen
        spellSlotsContainer.appendChild(slotContainer);
        
        return slotContainer;
    }
    
    /**
     * Zeigt eine Benachrichtigung über hinzugefügte Grimoire-Slots an
     * @param {number} addedSlots - Anzahl der neu hinzugefügten Slots
     */
    function showGrimoireNotification(addedSlots) {
        // Erstelle ein Benachrichtigungselement
        const notification = document.createElement('div');
        notification.className = 'grimoire-notification';
        notification.innerHTML = `
            <p>Du hast ${addedSlots} neue${addedSlots > 1 ? 'n' : ''} Zauberslot durch ${addedSlots > 1 ? 'deine Zaubergrimoires' : 'dein Zaubergrimoire'} erhalten!</p>
        `;
        
        // Styling für die Benachrichtigung
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.backgroundColor = 'rgba(76, 175, 80, 0.9)';
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
    
    // Event-Listener für Änderungen am MA-Wert
    if (maInput) {
        maInput.addEventListener('input', function() {
            // Bei MA-Änderung die Grimoires erneut prüfen
            setTimeout(checkGrimoireItems, 100);
        });
        
        maInput.addEventListener('change', function() {
            // Bei MA-Änderung die Grimoires erneut prüfen
            setTimeout(checkGrimoireItems, 100);
        });
    }
    
    // Event-Listener für spellbookManager.js Erweiterung
    document.addEventListener('ma-value-changed', function(event) {
        // MA-Wert wurde geändert, Grimoires erneut prüfen
        setTimeout(checkGrimoireItems, 100);
    });
    
    // Globalen Zugriff auf die Grimoire-Check-Funktion ermöglichen
    window.checkGrimoireItems = checkGrimoireItems;
    
    // Hängen wir uns auch in die bestehende updateSpellSlots-Funktion ein, 
    // falls sie später geladen wird
    const originalUpdateSpellSlots = window.updateSpellSlots;
    window.updateSpellSlots = function() {
        if (typeof originalUpdateSpellSlots === 'function') {
            // Original-Funktion aufrufen
            originalUpdateSpellSlots.call(this);
            
            // Sicherstellen, dass die Grimoire-Slots berücksichtigt werden
            if (grimoireSlots > 0) {
                // Ein bisschen warten, bis die ursprüngliche Funktion fertig ist
                setTimeout(checkGrimoireItems, 50);
            }
        }
    };
});
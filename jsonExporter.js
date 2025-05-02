// jsonExporter.js - Funktionalität für den JSON-Export des Charakterbogens

document.addEventListener('DOMContentLoaded', function() {
    // Füge einen Export-Button hinzu
    const exportButton = document.createElement('button');
    exportButton.id = 'export-json-button';
    exportButton.className = 'download-btn';
    exportButton.innerHTML = 'Download Charakter';
    
    // Füge den Button zur Seite hinzu
    const characterContainer = document.querySelector('.character-container');
    if (characterContainer) {
        characterContainer.appendChild(exportButton);
    }
    
    // Event-Listener für den Export-Button
    exportButton.addEventListener('click', exportCharacterAsJson);
});

/**
 * Exportiert den kompletten Charakter als JSON
 */
function exportCharacterAsJson() {
    // Erstelle ein Datenobjekt, um alle Charakterinformationen zu speichern
    const characterData = {
        // Grundlegende Informationen
        name: document.getElementById('name')?.value || '',
        player: document.getElementById('player')?.value || '',
        age: document.getElementById('age')?.value || '',
        image: document.getElementById('character-image').src || '',
        
        // Klassen und Eigenschaften
        classes: {
            primary: document.getElementById('class')?.value || '',
            secondary: document.getElementById('second-class')?.value || ''
        },
        advantage: document.getElementById('advantage')?.value || '',
        disadvantage: document.getElementById('disadvantage')?.value || '',
        magicSchools: {
            primary: document.getElementById('magic-school')?.value || '',
            secondary: document.getElementById('second-magic-school')?.value || ''
        },
        
        // Wunden-Level
        woundLevel: Array.from(document.querySelectorAll('.wound-circle.active, .wound-skull.active')).length,
        
        // Kampfwerte
        combatStats: {
            gena: document.getElementById('gena')?.value || '',
            pa: document.getElementById('pa')?.value || '',
            kp: document.getElementById('kp')?.value || '',
            mp: document.getElementById('mp')?.value || '',
            zk: document.getElementById('zk')?.value || '',
            init: document.getElementById('init')?.value || '',
            bw: document.getElementById('bw')?.value || '',
            luckTokens: document.getElementById('luck-tokens')?.value || ''
        },
        
        // Attribute
        attributes: {
            main: {
                ko: document.querySelector('.attribute-column:nth-child(1) .main-attribute-value')?.value || '1',
                wi: document.querySelector('.attribute-column:nth-child(2) .main-attribute-value')?.value || '1',
                ch: document.querySelector('.attribute-column:nth-child(3) .main-attribute-value')?.value || '1',
                gl: document.querySelector('.attribute-column:nth-child(4) .main-attribute-value')?.value || '1',
                ma: document.querySelector('.attribute-column:nth-child(4) h3:nth-of-type(2) .main-attribute-value')?.value || '1'
            },
            skills: {}
        },
        
        // Inventar
        inventory: [],
        
        // Zauber
        spells: []
    };
    
    // Sammele alle Fertigkeiten
    const attributeColumns = document.querySelectorAll('.attribute-column');
    attributeColumns.forEach((column, columnIndex) => {
        const attributeItems = column.querySelectorAll('.attribute-item');
        
        attributeItems.forEach(item => {
            const skillNameElement = item.firstChild;
            const skillName = skillNameElement ? skillNameElement.textContent.trim().split(' ')[0] : '';
            const valueInput = item.querySelector('.attribute-value');
            const skillValue = valueInput ? valueInput.value : '0';
            
            if (skillName) {
                // Gruppiere Fertigkeiten nach ihrer Attributspalte
                let attributeKey;
                if (columnIndex === 0) attributeKey = 'ko';
                else if (columnIndex === 1) attributeKey = 'wi';
                else if (columnIndex === 2) attributeKey = 'ch';
                else if (columnIndex === 3) {
                    // Diese Spalte enthält sowohl GL als auch MA, also muss man prüfen, unter welchem Attribut
                    // die Fertigkeit steht
                    const headings = column.querySelectorAll('h3');
                    if (headings.length >= 2) {
                        // Finde heraus, ob die Fertigkeit unter GL oder MA ist
                        const glHeading = headings[0];
                        const maHeading = headings[1];
                        const glHeadingPos = glHeading.getBoundingClientRect().bottom;
                        const maHeadingPos = maHeading.getBoundingClientRect().bottom;
                        const itemPos = item.getBoundingClientRect().top;
                        
                        // Je nachdem, welcher Überschrift die Fertigkeit näher ist
                        if (itemPos > maHeadingPos) {
                            attributeKey = 'ma';
                        } else {
                            attributeKey = 'gl';
                        }
                    } else {
                        attributeKey = 'gl_ma'; // Fallback
                    }
                }
                
                if (!characterData.attributes.skills[attributeKey]) {
                    characterData.attributes.skills[attributeKey] = {};
                }
                
                characterData.attributes.skills[attributeKey][skillName] = skillValue;
            }
        });
    });
    
    // Sammele Inventargegenstände
    const itemSlots = document.querySelectorAll('.item-slot');
    itemSlots.forEach(slot => {
        const itemSelect = slot.querySelector('.item-select');
        const itemQuantity = slot.querySelector('.item-quantity');
        const itemEffect = slot.querySelector('.item-effect');
        
        if (itemSelect && itemSelect.value) {
            const selectedOption = itemSelect.options[itemSelect.selectedIndex];
            characterData.inventory.push({
                id: itemSelect.value,
                name: selectedOption ? selectedOption.textContent : '',
                quantity: itemQuantity ? itemQuantity.value : '1',
                effect: itemEffect ? itemEffect.value : '',
                // Spezielle Eigenschaften für Alchemisten-Bonus
                isAlchemistBonus: slot.classList.contains('alchemist-item-slot'),
                isElixirOnly: slot.dataset.elixirOnly === 'true',
                isLocked: slot.dataset.locked === 'true'
            });
        }
    });
    
    // Sammele Zauber
    const spellSlots = document.querySelectorAll('.spell-slot');
    spellSlots.forEach(slot => {
        const spellSelect = slot.querySelector('.spell-select');
        
        if (spellSelect && spellSelect.value) {
            const selectedOption = spellSelect.options[spellSelect.selectedIndex];
            const spellInfo = slot.querySelector('.spell-info');
            
            let spellData = {
                id: spellSelect.value,
                name: selectedOption ? selectedOption.textContent : '',
                isClassSpell: slot.classList.contains('class-spell-slot'),
                info: spellInfo ? spellInfo.innerHTML : ''
            };
            
            // Wenn es ein Klassenzauber ist, speichere die zusätzlichen Informationen
            if (slot.classList.contains('class-spell-slot') && slot.dataset.className) {
                spellData.className = slot.dataset.className;
                spellData.spellId = slot.dataset.spellId;
            }
            
            characterData.spells.push(spellData);
        }
    });
    
    // Konvertiere die Charakterdaten in einen JSON-String
    const jsonString = JSON.stringify(characterData, null, 2);
    
    // Erstelle einen Dateinamen basierend auf dem Charakternamen
    const filename = (characterData.name ? characterData.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'charakter') + '.json';
    
    // Erstelle einen Blob mit den JSON-Daten
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    // Erstelle ein Link-Element
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = filename;
    
    // Füge den Link zum Dokument hinzu, klicke ihn und entferne ihn wieder
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

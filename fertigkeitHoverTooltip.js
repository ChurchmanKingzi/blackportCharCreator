// fertigkeit-hover.js - Tooltip-Funktionalität für Fertigkeitsbeschreibungen

document.addEventListener('DOMContentLoaded', function() {
    // Tooltips für Fertigkeiten initialisieren, aber erst nach einer kurzen Verzögerung,
    // um sicherzustellen, dass der fertigkeitenService geladen ist
    setTimeout(initFertigkeitenTooltips, 100);
    
    /**
     * Initialisiert die Tooltip-Funktionalität für alle Fertigkeiten
     * Nutzt den fertigkeitenService, um Beschreibungen zu erhalten
     */
    function initFertigkeitenTooltips() {
        // Überprüfen, ob der fertigkeitenService verfügbar ist
        if (typeof fertigkeitenService === 'undefined') {
            console.error('fertigkeitenService ist nicht verfügbar!');
            return;
        }
        // Alle Fertigkeits-Elemente auswählen
        const fertigkeitsElemente = document.querySelectorAll('.attribute-item');
        
        // Tooltip-Element erstellen, falls es noch nicht existiert
        let tooltip = document.querySelector('.fertigkeit-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'fertigkeit-tooltip';
            tooltip.style.display = 'none';
            document.body.appendChild(tooltip);
        }
        
        // Event-Listener für jede Fertigkeit hinzufügen
        fertigkeitsElemente.forEach(element => {
            // Lese den Fertigkeitsnamen aus dem Element
            const fertigkeitsName = element.textContent.trim().split(' ')[0];
            
            // Event-Listener für Mouseenter (Hover-Start)
            element.addEventListener('mouseenter', function(e) {
                // Hole die Beschreibung aus dem Service
                const beschreibung = fertigkeitenService.getBeschreibung(fertigkeitsName);
                
                // Tooltip-Inhalt setzen
                tooltip.textContent = beschreibung;
                
                // Tooltip anzeigen und positionieren
                tooltip.style.display = 'block';
                
                // Position des Tooltips aktualisieren
                updateTooltipPosition(e);
                
                // Event-Listener für Mausbewegung hinzufügen
                document.addEventListener('mousemove', updateTooltipPosition);
            });
            
            // Event-Listener für Mouseleave (Hover-Ende)
            element.addEventListener('mouseleave', function() {
                // Tooltip ausblenden
                tooltip.style.display = 'none';
                
                // Event-Listener für Mausbewegung entfernen
                document.removeEventListener('mousemove', updateTooltipPosition);
            });
        });
        
        /**
         * Aktualisiert die Position des Tooltips basierend auf der Mausposition
         * @param {MouseEvent} e - Das Mausevent
         */
        function updateTooltipPosition(e) {
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
            
            // Tooltip positionieren (mit fester Position, damit er nicht mit der Seite scrollt)
            tooltip.style.position = 'fixed';
            tooltip.style.left = posX + 'px';
            tooltip.style.top = posY + 'px';
        }
    }
});
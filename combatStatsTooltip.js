// Erstelle eine neue Datei "combatStatsTooltip.js"

document.addEventListener('DOMContentLoaded', function() {
    // Verzögerung, um sicherzustellen, dass alle DOM-Elemente geladen sind
    setTimeout(initCombatStatsTooltips, 100);

    function initCombatStatsTooltips() {
        // Tooltip-Element erstellen, falls es noch nicht existiert
        let tooltip = document.querySelector('.combat-stats-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'combat-stats-tooltip';
            tooltip.style.display = 'none';
            document.body.appendChild(tooltip);
        }

        // Kampfwerte-Elemente mit Tooltips versehen
        const combatStats = [
            {
                id: 'gena',
                label: 'GENA',
                formula: 'GENA = ⌈(WI + WI + GL) ÷ 2⌉',
                description: 'Genauigkeit. Du würfelst so viele W6, um Angriffe oder Zauber zu treffen.'
            },
            {
                id: 'pa',
                label: 'PA',
                formula: 'PA = ⌈(WI + CH + GL) ÷ 2⌉ + Ausweichen',
                description: 'Parade. Du würfelst so viele W6, um zu versuchen, auszuweichen.'
            },
            {
                id: 'kp',
                label: 'KP',
                formula: 'KP = (KÖ + KÖ + GL) × 6',
                description: 'Kraftpunkte. Stellen deine Gesundheit dar. Wenn sie auf 0 fallen, wirst du bewusstlos. Fallen sie unter 50% oder auf 0, nimmst du eine Wunde. Nimmst du 50%, 100%, 150% usw. Schaden auf einmal, gibst es nochmal je eine Wunde.'
            },
            {
                id: 'mp',
                label: 'MP',
                formula: 'MP = WI×15 + MA×10 + CH×5',
                description: 'Manapunkte. Werden für das Wirken von Zaubern verwendet. Regenerieren sich durch Ruhe und Schlaf.'
            },
            {
                id: 'zk',
                label: 'ZK',
                formula: 'ZK = ⌈(MA + MA + WI) ÷ 3⌉',
                description: 'Zauberkraft. Bestimmt die Stärke deiner Zauber. Viele skalieren damit, manche nutzen diesen Wert statt GENA, um zu wirken.'
            },
            {
                id: 'init',
                label: 'INIT',
                formula: 'INIT = ⌈(KÖ + CH + CH) ÷ 2⌉',
                description: 'Initiative. Bestimmt die Reihenfolge im Kampf. Du würfelst so viele W6 und addierst alle Augen.'
            },
            {
                id: 'bw',
                label: 'BW',
                formula: 'BW = KÖ×5 + Akrobatik×5',
                description: 'Bewegung. Gibt an, wie viele Meter du dich in einem Zug bewegen kannst.'
            },
            {
                id: 'luck-tokens',
                label: 'Glücks-Tokens',
                formula: 'Glücks-Tokens = GL',
                description: 'Können eingesetzt werden, um Proben zu wiederholen. Regenerieren sich nach 24 Stunden. Können nicht für GENA- und PA-Proben verwendet werden!'
            }
        ];

        // Event-Listener für jeden Kampfwert hinzufügen
        combatStats.forEach(stat => {
            const element = document.getElementById(stat.id);
            if (!element) return;

            const container = element.closest('.combat-stat');
            if (!container) return;

            // Event-Listener für Mouseenter (Hover-Start)
            container.addEventListener('mouseenter', function(e) {
                // Tooltip-Inhalt setzen
                tooltip.innerHTML = `
                    <h4>${stat.label}</h4>
                    <p><strong>Formel:</strong> ${stat.formula}</p>
                    <p>${stat.description}</p>
                `;

                // Tooltip anzeigen und positionieren
                tooltip.style.display = 'block';
                updateTooltipPosition(e);

                // Event-Listener für Mausbewegung hinzufügen
                document.addEventListener('mousemove', updateTooltipPosition);
            });

            // Event-Listener für Mouseleave (Hover-Ende)
            container.addEventListener('mouseleave', function() {
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

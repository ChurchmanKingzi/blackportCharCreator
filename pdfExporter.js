// pdfExporter.js - Funktionalität für den PDF-Export des Charakterbogens

document.addEventListener('DOMContentLoaded', function() {
    // Füge einen Export-Button hinzu
    const exportButton = document.createElement('button');
    exportButton.id = 'export-pdf-button';
    exportButton.className = 'download-btn';
    exportButton.innerHTML = 'Als PDF exportieren';
    
    // Füge den Button zur Seite hinzu
    const characterContainer = document.querySelector('.character-container');
    if (characterContainer) {
        characterContainer.appendChild(exportButton);
    }
    
    // Event-Listener für den Export-Button
    exportButton.addEventListener('click', exportToPDF);
});

/**
 * Exportiert den kompletten Charakter als PDF
 */
function exportToPDF() {
    // Lade jsPDF-Bibliothek dynamisch
    loadJsPDF().then(() => {
        // Erstelle ein neues PDF-Dokument im A4-Format
        const doc = new window.jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        // Konfiguration für das Dokument
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 15; // Seitenrand in mm
        const contentWidth = pageWidth - 2 * margin;
        
        // Startposition für den Inhalt
        let y = margin;
        
        // Funktionen für das Hinzufügen von Text und Rechtecken
        const addText = (text, x, y, options = {}) => {
            const defaultOptions = {
                align: 'left',
                fontSize: 10,
                fontStyle: 'normal',
                textColor: [0, 0, 0] // Standardfarbe: Schwarz
            };
            const mergedOptions = {...defaultOptions, ...options};
            
            doc.setFontSize(mergedOptions.fontSize);
            doc.setFont('helvetica', mergedOptions.fontStyle);
            doc.setTextColor(mergedOptions.textColor[0], mergedOptions.textColor[1], mergedOptions.textColor[2]);
            doc.text(text, x, y, { align: mergedOptions.align });
        };
        
        const addRect = (x, y, width, height, fillColor = [240, 240, 240]) => {
            doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
            doc.rect(x, y, width, height, 'F');
        };
        
        const addLine = (x1, y1, x2, y2, lineWidth = 0.1) => {
            doc.setLineWidth(lineWidth);
            doc.line(x1, y1, x2, y2);
        };
        
        // Funktion für Seitenumbrüche
        const checkPageBreak = (height) => {
            if (y + height > pageHeight - margin) {
                doc.addPage();
                y = margin;
                return true;
            }
            return false;
        };
        
        // Titel und Seitenheader
        addRect(margin, y, contentWidth, 12, [76, 175, 80]);
        addText('BLACKPORT-CHARAKTERBOGEN', pageWidth / 2, y + 8, { align: 'center', fontSize: 16, fontStyle: 'bold' });
        y += 16;
        
        // Grundinformationen des Charakters erfassen
        const charName = document.getElementById('name')?.value || 'Unbenannt';
        const playerName = document.getElementById('player')?.value || '';
        const charAge = document.getElementById('age')?.value || '';
        const charClass = document.getElementById('class')?.options[document.getElementById('class')?.selectedIndex]?.text || '';
        const secondClass = document.getElementById('second-class')?.style.display !== 'none' ? 
                         document.getElementById('second-class')?.options[document.getElementById('second-class')?.selectedIndex]?.text || '' : '';
        const advantage = document.getElementById('advantage')?.options[document.getElementById('advantage')?.selectedIndex]?.text || '';
        const disadvantage = document.getElementById('disadvantage')?.options[document.getElementById('disadvantage')?.selectedIndex]?.text || '';
        const magicSchool = document.getElementById('magic-school')?.options[document.getElementById('magic-school')?.selectedIndex]?.text || '';
        const secondMagicSchool = document.getElementById('second-magic-school')?.style.display !== 'none' ? 
                               document.getElementById('second-magic-school')?.options[document.getElementById('second-magic-school')?.selectedIndex]?.text || '' : '';
        
        // Grundinformationen hinzufügen
        // Erste Zeile: Name, Spieler, Alter
        addRect(margin, y, contentWidth, 8, [230, 230, 230]);
        addText('Charakter:', margin + 2, y + 5, { fontStyle: 'bold' });
        addText(charName, margin + 25, y + 5);
        
        addText('Spieler:', margin + 70, y + 5, { fontStyle: 'bold' });
        addText(playerName, margin + 90, y + 5);
        
        // Alter weiter links darstellen
        addText('Alter:', margin + 140, y + 5, { fontStyle: 'bold' });
        addText(charAge, margin + 155, y + 5);
        
        y += 12;
        
        // Zweite Zeile: Klasse(n) und Vorteil
        addRect(margin, y, contentWidth, 8, [230, 230, 230]);
        addText('Klasse:', margin + 2, y + 5, { fontStyle: 'bold' });
        addText(charClass + (secondClass ? ' / ' + secondClass : ''), margin + 25, y + 5);
        
        // Vorteil weiter nach links
        const advantageX = margin + 70;
        addText('Vorteil:', advantageX, y + 5, { fontStyle: 'bold' });
        addText(advantage, advantageX + 25, y + 5); 
        
        y += 10; // Kleinerer Abstand für die nächste Zeile
        
        // Dritte Zeile: Nachteil (direkt unter dem Vorteil)
        addRect(margin, y, contentWidth, 8, [230, 230, 230]);
        // Nachteil an derselben X-Position wie Vorteil
        addText('Nachteil:', advantageX, y + 5, { fontStyle: 'bold' });
        addText(disadvantage, advantageX + 25, y + 5);
        
        y += 12;
        
        // Dritte Zeile: Magieschule(n)
        if (magicSchool || secondMagicSchool) {
            addRect(margin, y, contentWidth, 8, [230, 230, 230]);
            addText('Magieschule:', margin + 2, y + 5, { fontStyle: 'bold' });
            addText(magicSchool + (secondMagicSchool ? ' / ' + secondMagicSchool : ''), margin + 40, y + 5);
            y += 12;
        }
        
        // Füge ein Charakterbild hinzu, wenn vorhanden
        const characterImage = document.getElementById('character-image');
        if (characterImage && characterImage.src && characterImage.style.display !== 'none') {
            try {
                // Bild in Base64 konvertieren und ins PDF einfügen
                const imgWidth = 40;  // Feste Breite für das Bild in mm
                const imgHeight = 50; // Feste Höhe für das Bild in mm
                
                // Bild zentriert in einem eigenen Bereich platzieren
                const imgX = pageWidth - margin - imgWidth - 5;
                const imgY = margin + 20; // Platzieren Sie das Bild unterhalb des Headers
                
                // Hintergrundfläche für das Bild
                addRect(imgX - 2, imgY - 2, imgWidth + 4, imgHeight + 4, [250, 250, 250]);
                
                // Bild hinzufügen
                doc.addImage(characterImage.src, 'JPEG', imgX, imgY, imgWidth, imgHeight, undefined, 'FAST');
                
                // y wird nicht erhöht, weil der vertikale Fluss beim nächsten Element weitergeht
            } catch (e) {
                console.warn('Bild konnte nicht in PDF eingefügt werden:', e);
            }
        }
        
        // Kampfwerte erfassen
        const gena = document.getElementById('gena')?.value || '';
        const pa = document.getElementById('pa')?.value || '';
        const kp = document.getElementById('kp')?.value || '';
        const mp = document.getElementById('mp')?.value || '';
        const zk = document.getElementById('zk')?.value || '';
        const init = document.getElementById('init')?.value || '';
        const bw = document.getElementById('bw')?.value || '';
        const luckTokens = document.getElementById('luck-tokens')?.value || '';
        
        // Kampfwerte hinzufügen
        addRect(margin, y, contentWidth, 8, [200, 220, 200]);
        addText('KAMPFWERTE', margin + contentWidth/2, y + 5, { align: 'center', fontStyle: 'bold' });
        y += 10;
        
        // Kampfwerte-Tabelle
        const combatStatsTable = [
            ['GENA', gena, 'PA', pa, 'KP', kp],
            ['MP', mp, 'ZK', zk, 'INIT', init],
            ['BW', bw, 'Glücks-Tokens', luckTokens, '', ''] // Doppelpunkt entfernt
        ];
        
        const cellWidth = contentWidth / 6;
        const cellHeight = 8;
        
        combatStatsTable.forEach(row => {
            for (let i = 0; i < row.length; i += 2) {
                const x = margin + (i/2) * cellWidth * 2;
                addRect(x, y, cellWidth * 2, cellHeight, [240, 245, 240]);
                addText(row[i] + (row[i] === 'Glücks-Tokens' ? '' : ':'), x + 2, y + 5, { fontStyle: 'bold' }); // Doppelpunkt nur hinzufügen, wenn es nicht "Glücks-Tokens" ist
                addText(row[i+1], x + cellWidth, y + 5);
            }
            y += cellHeight + 1;
        });
        
        y += 5;
        
        // Wunden-Tracker
        const activeWounds = document.querySelectorAll('.wound-circle.active, .wound-skull.active').length;
        
        addRect(margin, y, contentWidth, 8, [220, 200, 200]);
        addText('WUNDEN', margin + contentWidth/2, y + 5, { align: 'center', fontStyle: 'bold' });
        y += 10;
        
        const woundCellWidth = contentWidth / 10;
        const woundCellHeight = 8;
        
        for (let i = 0; i < 10; i++) {
            const x = margin + i * woundCellWidth;
            const isActive = i < activeWounds;
            const fillColor = isActive ? [139, 0, 0] : [240, 240, 240];
            const textColor = isActive ? 255 : 0;
            
            addRect(x, y, woundCellWidth, woundCellHeight, fillColor);
            
            doc.setTextColor(textColor);
            // Für die letzte Wunde (10) eine Zahl statt & verwenden
            addText(i === 9 ? '10' : (i + 1).toString(), x + woundCellWidth/2, y + 5, { align: 'center' });
            doc.setTextColor(0); // Zurück zu schwarz für den restlichen Text
        }
        
        y += woundCellHeight + 10;
        
        // Hauptattribute erfassen
        const ko = document.querySelector('.attribute-column:nth-child(1) .main-attribute-value')?.value || '1';
        const wi = document.querySelector('.attribute-column:nth-child(2) .main-attribute-value')?.value || '1';
        const ch = document.querySelector('.attribute-column:nth-child(3) .main-attribute-value')?.value || '1';
        const gl = document.querySelector('.attribute-column:nth-child(4) .main-attribute-value')?.value || '1';
        const ma = document.querySelector('.attribute-column:nth-child(4) h3:nth-of-type(2) .main-attribute-value')?.value || '1';
        
        // Hauptattribute hinzufügen
        addRect(margin, y, contentWidth, 8, [200, 200, 220]);
        addText('HAUPTATTRIBUTE', margin + contentWidth/2, y + 5, { align: 'center', fontStyle: 'bold' });
        y += 10;
        
        const attributeTable = [
            ['KÖ', ko, 'WI', wi],
            ['CH', ch, 'GL', gl],
            ['MA', ma, '', '']
        ];
        
        const attrCellWidth = contentWidth / 4;
        const attrCellHeight = 8;
        
        attributeTable.forEach(row => {
            for (let i = 0; i < row.length; i += 2) {
                if (!row[i]) continue; // Überspringe leere Zellen
                const x = margin + (i/2) * attrCellWidth * 2;
                addRect(x, y, attrCellWidth * 2, attrCellHeight, [235, 235, 245]);
                addText(row[i] + ':', x + 2, y + 5, { fontStyle: 'bold' });
                addText(row[i+1], x + 15, y + 5);
            }
            y += attrCellHeight + 1;
        });
        
        y += 5;
        
        // Fertigkeiten in Spalten erfassen
        // Prüfen auf Seitenumbruch, da die Fertigkeiten viel Platz benötigen
        checkPageBreak(60);
        
        addRect(margin, y, contentWidth, 8, [220, 220, 220]);
        addText('FERTIGKEITEN', margin + contentWidth/2, y + 5, { align: 'center', fontStyle: 'bold' });
        y += 10;
        
        // Arrays für die Fertigkeiten in den verschiedenen Attributspalten
        const koSkills = collectSkills('.attribute-column:nth-child(1) .attribute-item');
        const wiSkills = collectSkills('.attribute-column:nth-child(2) .attribute-item');
        const chSkills = collectSkills('.attribute-column:nth-child(3) .attribute-item');
        const glMaSkills = collectSkills('.attribute-column:nth-child(4) .attribute-item');
        
        // Maximale Anzahl der Fertigkeiten in einer Spalte bestimmen
        const maxSkillRows = Math.max(koSkills.length, wiSkills.length, chSkills.length, glMaSkills.length);
        
        // Überschriften für die Spalten
        const skillColumnWidth = contentWidth / 4;
        addRect(margin, y, skillColumnWidth, 7, [230, 230, 240]);
        addText('KÖ-Fertigkeiten', margin + skillColumnWidth/2, y + 5, { align: 'center', fontStyle: 'bold' });
        
        addRect(margin + skillColumnWidth, y, skillColumnWidth, 7, [230, 230, 240]);
        addText('WI-Fertigkeiten', margin + skillColumnWidth + skillColumnWidth/2, y + 5, { align: 'center', fontStyle: 'bold' });
        
        addRect(margin + skillColumnWidth*2, y, skillColumnWidth, 7, [230, 230, 240]);
        addText('CH-Fertigkeiten', margin + skillColumnWidth*2 + skillColumnWidth/2, y + 5, { align: 'center', fontStyle: 'bold' });
        
        addRect(margin + skillColumnWidth*3, y, skillColumnWidth, 7, [230, 230, 240]);
        addText('GL/MA-Fertigkeiten', margin + skillColumnWidth*3 + skillColumnWidth/2, y + 5, { align: 'center', fontStyle: 'bold' });
        
        y += 8;
        
        // Fertigkeiten in Spalten darstellen
        const skillRowHeight = 6;
        for (let i = 0; i < maxSkillRows; i++) {
            // Prüfe auf Seitenumbruch
            if (checkPageBreak(skillRowHeight + 2)) {
                // Wenn Seitenumbruch, Spaltenüberschriften auf der neuen Seite wiederholen
                addRect(margin, y, skillColumnWidth, 7, [230, 230, 240]);
                addText('KÖ-Fertigkeiten', margin + skillColumnWidth/2, y + 5, { align: 'center', fontStyle: 'bold' });
                
                addRect(margin + skillColumnWidth, y, skillColumnWidth, 7, [230, 230, 240]);
                addText('WI-Fertigkeiten', margin + skillColumnWidth + skillColumnWidth/2, y + 5, { align: 'center', fontStyle: 'bold' });
                
                addRect(margin + skillColumnWidth*2, y, skillColumnWidth, 7, [230, 230, 240]);
                addText('CH-Fertigkeiten', margin + skillColumnWidth*2 + skillColumnWidth/2, y + 5, { align: 'center', fontStyle: 'bold' });
                
                addRect(margin + skillColumnWidth*3, y, skillColumnWidth, 7, [230, 230, 240]);
                addText('GL/MA-Fertigkeiten', margin + skillColumnWidth*3 + skillColumnWidth/2, y + 5, { align: 'center', fontStyle: 'bold' });
                
                y += 8;
            }
            
            // Hintergrundfarbe abwechselnd für bessere Lesbarkeit
            const rowColor = i % 2 === 0 ? [248, 248, 248] : [240, 240, 240];
            
            // KÖ-Fertigkeit Zeile
            if (i < koSkills.length) {
                const skill = koSkills[i];
                addRect(margin, y, skillColumnWidth, skillRowHeight, rowColor);
                addText(skill.name, margin + 2, y + 4, { fontSize: 8 });
                addText(skill.value, margin + skillColumnWidth - 5, y + 4, { align: 'right', fontSize: 8 });
            } else {
                addRect(margin, y, skillColumnWidth, skillRowHeight, rowColor);
            }
            
            // WI-Fertigkeit Zeile
            if (i < wiSkills.length) {
                const skill = wiSkills[i];
                addRect(margin + skillColumnWidth, y, skillColumnWidth, skillRowHeight, rowColor);
                addText(skill.name, margin + skillColumnWidth + 2, y + 4, { fontSize: 8 });
                addText(skill.value, margin + skillColumnWidth*2 - 5, y + 4, { align: 'right', fontSize: 8 });
            } else {
                addRect(margin + skillColumnWidth, y, skillColumnWidth, skillRowHeight, rowColor);
            }
            
            // CH-Fertigkeit Zeile
            if (i < chSkills.length) {
                const skill = chSkills[i];
                addRect(margin + skillColumnWidth*2, y, skillColumnWidth, skillRowHeight, rowColor);
                addText(skill.name, margin + skillColumnWidth*2 + 2, y + 4, { fontSize: 8 });
                addText(skill.value, margin + skillColumnWidth*3 - 5, y + 4, { align: 'right', fontSize: 8 });
            } else {
                addRect(margin + skillColumnWidth*2, y, skillColumnWidth, skillRowHeight, rowColor);
            }
            
            // GL/MA-Fertigkeit Zeile
            if (i < glMaSkills.length) {
                const skill = glMaSkills[i];
                addRect(margin + skillColumnWidth*3, y, skillColumnWidth, skillRowHeight, rowColor);
                addText(skill.name, margin + skillColumnWidth*3 + 2, y + 4, { fontSize: 8 });
                addText(skill.value, margin + skillColumnWidth*4 - 5, y + 4, { align: 'right', fontSize: 8 });
            } else {
                addRect(margin + skillColumnWidth*3, y, skillColumnWidth, skillRowHeight, rowColor);
            }
            
            y += skillRowHeight;
        }
        
        y += 10;
        
        // Prüfen auf Seitenumbruch vor dem Zauberbuch
        checkPageBreak(40);
        
        // Zauberbuch hinzufügen
        const spells = collectSpells();
        
        if (spells.length > 0) {
            addRect(margin, y, contentWidth, 8, [200, 200, 240]);
            addText('ZAUBERBUCH', margin + contentWidth/2, y + 5, { align: 'center', fontStyle: 'bold' });
            y += 10;
            
            // Zauberheader
            addRect(margin, y, contentWidth * 0.65, 7, [220, 220, 240]); // Erhöht von 0.5 für breitere Beschreibung
            addText('Zauber', margin + 2, y + 5, { fontStyle: 'bold' });
            
            addRect(margin + contentWidth * 0.65, y, contentWidth * 0.1, 7, [220, 220, 240]); // Reduziert von 0.15
            addText('MP', margin + contentWidth * 0.65 + 2, y + 5, { fontStyle: 'bold' });
            
            addRect(margin + contentWidth * 0.75, y, contentWidth * 0.15, 7, [220, 220, 240]); // Reduziert von 0.2
            addText('Schule', margin + contentWidth * 0.75 + 2, y + 5, { fontStyle: 'bold' });
            
            addRect(margin + contentWidth * 0.9, y, contentWidth * 0.1, 7, [220, 220, 240]); // Reduziert von 0.15
            addText('Level', margin + contentWidth * 0.9 + 2, y + 5, { fontStyle: 'bold' });
            
            y += 8;
            
            // Zauber auflisten
            spells.forEach((spell, index) => {
                // Größere Zeile für die Zauber (mehr Platz für die Beschreibung)
                const rowHeight = 30; // Erhöht von 15 auf 30
                
                // Prüfe auf Seitenumbruch
                if (checkPageBreak(rowHeight + 5)) {
                    // Wenn Seitenumbruch, Header auf neuer Seite wiederholen
                    addRect(margin, y, contentWidth, 8, [200, 200, 240]);
                    addText('ZAUBERBUCH (Fortsetzung)', margin + contentWidth/2, y + 5, { align: 'center', fontStyle: 'bold' });
                    y += 10;
                    
                    // Zauberheader wiederholen
                    addRect(margin, y, contentWidth * 0.65, 7, [220, 220, 240]); // Angepasst für breitere Beschreibungen
                    addText('Zauber', margin + 2, y + 5, { fontStyle: 'bold' });
                    
                    addRect(margin + contentWidth * 0.65, y, contentWidth * 0.1, 7, [220, 220, 240]);
                    addText('MP', margin + contentWidth * 0.65 + 2, y + 5, { fontStyle: 'bold' });
                    
                    addRect(margin + contentWidth * 0.75, y, contentWidth * 0.15, 7, [220, 220, 240]);
                    addText('Schule', margin + contentWidth * 0.75 + 2, y + 5, { fontStyle: 'bold' });
                    
                    addRect(margin + contentWidth * 0.9, y, contentWidth * 0.1, 7, [220, 220, 240]);
                    addText('Level', margin + contentWidth * 0.9 + 2, y + 5, { fontStyle: 'bold' });
                    
                    y += 8;
                }
                
                const rowColor = index % 2 === 0 ? [248, 248, 248] : [240, 240, 240];
                
                // Zauberdetails
                addRect(margin, y, contentWidth, rowHeight, rowColor);
                
                // Name und Beschreibung
                addText(spell.name, margin + 2, y + 4, { fontStyle: 'bold' });
                
                // Mehr Platz für die Beschreibung und bis zu 4 Zeilen
                const descriptionY = y + 10;
                
                // Beschreibung in maximal 4 Zeilen einpassen - mit noch breiterer Darstellung
                const maxWidth = contentWidth * 0.85; // Erhöht von 0.48 - fast die gesamte Breite für Beschreibungen
                const description = doc.splitTextToSize(spell.description || '', maxWidth);
                for (let i = 0; i < Math.min(description.length, 4); i++) {
                    addText(description[i], margin + 4, descriptionY + i * 4, { fontSize: 7 });
                }
                
                // MP-Kosten - mit Farbunterscheidung
                // Verwende die im collectSpells berechnete isMatchingSchool-Eigenschaft
                const mpTextColor = spell.isMatchingSchool ? [46, 125, 50] : [0, 0, 0]; // Grün für übereinstimmende Schulen
                
                addText(spell.mp, margin + contentWidth * 0.65 + 2, y + 9, { textColor: mpTextColor });
                
                // Magieschule
                addText(spell.school, margin + contentWidth * 0.75 + 2, y + 9);
                
                // Level
                addText(spell.level, margin + contentWidth * 0.9 + 2, y + 9);
                
                y += rowHeight + 1;
            });
            
            y += 5;
        }
        
        // Prüfen auf Seitenumbruch vor dem Inventar
        checkPageBreak(40);
        
        // Inventar hinzufügen
        const items = collectItems();
        
        if (items.length > 0) {
            addRect(margin, y, contentWidth, 8, [220, 200, 190]);
            addText('INVENTAR', margin + contentWidth/2, y + 5, { align: 'center', fontStyle: 'bold' });
            y += 10;
            
            // Inventarheader
            addRect(margin, y, contentWidth * 0.85, 7, [230, 210, 200]);
            addText('Gegenstand', margin + 2, y + 5, { fontStyle: 'bold' });
            
            addRect(margin + contentWidth * 0.85, y, contentWidth * 0.15, 7, [230, 210, 200]);
            addText('Anzahl', margin + contentWidth * 0.85 + 2, y + 5, { fontStyle: 'bold' });
            
            y += 8;
            
            // Items auflisten
            items.forEach((item, index) => {
                // Größere Zeile für die Items (mehr Platz für die Beschreibung)
                const rowHeight = 30; // Erhöht von 15 auf 30
                
                // Prüfe auf Seitenumbruch
                if (checkPageBreak(rowHeight + 5)) {
                    // Wenn Seitenumbruch, Header auf neuer Seite wiederholen
                    addRect(margin, y, contentWidth, 8, [220, 200, 190]);
                    addText('INVENTAR (Fortsetzung)', margin + contentWidth/2, y + 5, { align: 'center', fontStyle: 'bold' });
                    y += 10;
                    
                    // Inventarheader wiederholen
                    addRect(margin, y, contentWidth * 0.85, 7, [230, 210, 200]);
                    addText('Gegenstand', margin + 2, y + 5, { fontStyle: 'bold' });
                    
                    addRect(margin + contentWidth * 0.85, y, contentWidth * 0.15, 7, [230, 210, 200]);
                    addText('Anzahl', margin + contentWidth * 0.85 + 2, y + 5, { fontStyle: 'bold' });
                    
                    y += 8;
                }
                
                const rowColor = index % 2 === 0 ? [255, 252, 245] : [250, 247, 240];
                
                // Itemdetails
                addRect(margin, y, contentWidth, rowHeight, rowColor);
                
                // Name und Beschreibung
                addText(item.name, margin + 2, y + 4, { fontStyle: 'bold' });
                
                // Mehr Platz für die Beschreibung und bis zu 4 Zeilen
                const descriptionY = y + 10;
                
                // Beschreibung in maximal 4 Zeilen einpassen - mit noch breiterer Darstellung für Items
                const maxWidth = contentWidth * 0.85; // Erhöht von 0.8 für maximale Breite
                const description = doc.splitTextToSize(item.description || '', maxWidth);
                for (let i = 0; i < Math.min(description.length, 4); i++) {
                    addText(description[i], margin + 4, descriptionY + i * 4, { fontSize: 7 });
                }
                
                // Anzahl - nach rechts verschoben wegen der breiteren Beschreibung
                addText(item.quantity, margin + contentWidth * 0.9, y + 9, { align: 'center' });
                
                y += rowHeight + 1;
            });
        }
        
        // Hinzufügen der Fußzeile auf jeder Seite
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            
            // Fußzeile mit Datum und Seitenzahl
            const currentDate = new Date().toLocaleDateString();
            addText(`Erstellt am: ${currentDate}`, margin, pageHeight - 10, { fontSize: 8 });
            addText(`Blackport-Charakterbogen - Seite ${i} von ${totalPages}`, pageWidth - margin, pageHeight - 10, { fontSize: 8, align: 'right' });
        }
        
        // Generiere den Dateinamen basierend auf dem Charakternamen
        const filename = (charName ? charName.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'charakter') + '.pdf';
        
        // PDF herunterladen
        doc.save(filename);
        
    }).catch(err => {
        console.error('Fehler beim Laden der jsPDF-Bibliothek:', err);
        alert('Fehler beim Erstellen des PDFs. Bitte versuchen Sie es später erneut.');
    });
}

/**
 * Sammelt alle Fertigkeiten aus einem Attribut-Container
 * @param {string} selector - CSS-Selektor für den Container
 * @returns {Array} Array mit Namen und Werten der Fertigkeiten
 */
function collectSkills(selector) {
    const skillElements = document.querySelectorAll(selector);
    const skills = [];
    
    skillElements.forEach(element => {
        const nameElement = element.childNodes[0];
        const valueElement = element.querySelector('.attribute-value');
        
        if (nameElement && valueElement) {
            // Name aus dem Textknoten extrahieren und bereinigen
            const fullText = nameElement.textContent.trim();
            const name = fullText.split(' ')[0]; // Nimm nur den ersten Teil (den Namen)
            const value = valueElement.value || '0';
            
            // Nur Fertigkeiten mit Wert > 0 oder mit speziellem Namen hinzufügen
            if (parseInt(value) > 0) {
                skills.push({
                    name: name,
                    value: value
                });
            }
        }
    });
    
    return skills;
}

/**
 * Sammelt alle Zauber aus dem Zauberbuch
 * @returns {Array} Array mit Zauberdetails
 */
function collectSpells() {
    const spellSlots = document.querySelectorAll('.spell-slot:not(.empty-spell-slot)');
    const spells = [];
    
    spellSlots.forEach(slot => {
        const spellSelect = slot.querySelector('.spell-select');
        const spellInfo = slot.querySelector('.spell-info');
        
        if (spellSelect && spellSelect.value && spellInfo) {
            // Basisinformationen aus dem Select-Element
            const selectedOption = spellSelect.options[spellSelect.selectedIndex];
            const name = selectedOption ? selectedOption.textContent.split('(')[0].trim() : '';
            
            if (!name) return; // Leeren Eintrag überspringen
            
            // Versuche, MP-Kosten und Level aus dem Text zu extrahieren
            let mpMatch = selectedOption ? selectedOption.textContent.match(/(\d+)\s*MP/) : null;
            let levelMatch = selectedOption ? selectedOption.textContent.match(/Lvl\s*(\d+)/) : null;
            
            // Aus dem Infotext weitere Informationen extrahieren
            const infoText = spellInfo.textContent || '';
            const mpInfoMatch = infoText.match(/(\d+)\s*MP/);
            const levelInfoMatch = infoText.match(/Level\s*(\d+)/);
            
            // Magieschule aus dem Infotext extrahieren
            let school = '';
            if (infoText.includes('Zerstörung')) school = 'Zerstörung';
            else if (infoText.includes('Unterstützung')) school = 'Unterstützung';
            else if (infoText.includes('Verfall')) school = 'Verfall';
            else if (infoText.includes('Zauberkunst')) school = 'Zauberkunst';
            else if (infoText.includes('Beschwörung')) school = 'Beschwörung';
            
            // Beschreibung extrahieren (alles nach dem ersten Paragraphen)
            const descriptionMatch = infoText.match(/(?:Zerstörung|Unterstützung|Verfall|Zauberkunst|Beschwörung).*?\n(.*)/s);
            const description = descriptionMatch ? descriptionMatch[1].trim() : '';
            
            spells.push({
                name: name,
                mp: mpInfoMatch ? mpInfoMatch[1] : (mpMatch ? mpMatch[1] : ''),
                level: levelInfoMatch ? levelInfoMatch[1] : (levelMatch ? levelMatch[1] : ''),
                school: school,
                description: description
            });
        }
    });
    
    return spells;
}

/**
 * Sammelt alle Gegenstände aus dem Inventar
 * @returns {Array} Array mit Gegenstandsdetails
 */
function collectItems() {
    const itemSlots = document.querySelectorAll('.item-slot');
    const items = [];
    
    itemSlots.forEach(slot => {
        const itemSelect = slot.querySelector('.item-select');
        const itemQuantity = slot.querySelector('.item-quantity');
        const itemEffect = slot.querySelector('.item-effect');
        
        if (itemSelect && itemSelect.value) {
            // Name aus dem Select-Element
            const selectedOption = itemSelect.options[itemSelect.selectedIndex];
            const name = selectedOption ? selectedOption.textContent : '';
            
            // Menge und Beschreibung
            const quantity = itemQuantity ? itemQuantity.value : '1';
            const description = itemEffect ? itemEffect.value : '';
            
            items.push({
                name: name,
                quantity: quantity,
                description: description
            });
        }
    });
    
    return items;
}

/**
 * Lädt die jsPDF-Bibliothek dynamisch
 * @returns {Promise} Promise, das erfüllt wird, wenn die Bibliothek geladen ist
 */
function loadJsPDF() {
    return new Promise((resolve, reject) => {
        // Wenn die Bibliothek bereits geladen ist
        if (window.jspdf) {
            resolve();
            return;
        }
        
        // Script-Element erstellen
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.async = true;
        
        // Event-Listener für erfolgreichen Load
        script.onload = () => {
            // Nach jsPDF laden wir die erforderlichen Schriftarten
            const fontScript = document.createElement('script');
            fontScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/polyfills.umd.js';
            fontScript.async = true;
            
            fontScript.onload = resolve;
            fontScript.onerror = reject;
            
            document.head.appendChild(fontScript);
        };
        
        // Event-Listener für Fehler
        script.onerror = reject;
        
        // Script zum Dokument hinzufügen
        document.head.appendChild(script);
    });
}

// Funktion global verfügbar machen
window.exportToPDF = exportToPDF;
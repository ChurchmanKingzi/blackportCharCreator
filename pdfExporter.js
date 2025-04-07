// PDF Export-Funktionalität

// Funktion zum Hinzufügen des Download-Buttons
function addDownloadButton() {
    // Button erstellen
    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'download-btn';
    downloadBtn.textContent = 'Charakter als PDF herunterladen';
    downloadBtn.id = 'download-pdf-btn';
    
    // Button vor dem Footer einfügen
    const footer = document.querySelector('.footer');
    footer.parentNode.insertBefore(downloadBtn, footer);
    
    // Event-Listener hinzufügen
    downloadBtn.addEventListener('click', exportToPDF);
}

// Funktion zum Exportieren als PDF
async function exportToPDF() {
    // Referenz auf den Button (um ihn temporär zu verstecken)
    const downloadBtn = document.getElementById('download-pdf-btn');
    
    // Elemente, die für den Export ausgeblendet werden sollen
    const header = document.querySelector('h1');
    const footer = document.querySelector('.footer');
    const uploadLabel = document.querySelector('.upload-label');
    const imageInstructions = document.querySelector('.image-instructions');
    const removeImageBtn = document.querySelector('.remove-image');
    
    try {
        // Lade die erforderlichen Bibliotheken
        if (typeof html2canvas === 'undefined' || typeof jspdf === 'undefined') {
            await loadScripts();
        }
        
        // Button und andere Elemente während des Exports ausblenden
        downloadBtn.style.display = 'none';
        if (header) header.style.display = 'none';
        if (footer) footer.style.display = 'none';
        if (uploadLabel) uploadLabel.style.display = 'none';
        if (imageInstructions) imageInstructions.style.display = 'none';
        if (removeImageBtn) removeImageBtn.style.display = 'none';
        
        // Container-Padding verringern für den Export
        const container = document.querySelector('.container');
        const originalPadding = container.style.padding;
        container.style.padding = '10px';
        
        // Bild für den PDF-Export anpassen
        const imageContainer = document.querySelector('.image-container');
        const characterImage = document.getElementById('character-image');
        
        // Originalpositionen und Größen speichern
        const originalImageContainerStyle = {
            width: imageContainer.style.width,
            position: imageContainer.style.position,
            right: imageContainer.style.right,
            top: imageContainer.style.top
        };
        
        const originalImageStyle = {
            maxWidth: characterImage.style.maxWidth,
            maxHeight: characterImage.style.maxHeight
        };
        
        // Wenn das Bild vorhanden ist, anpassen
        if (characterImage.src && characterImage.style.display !== 'none') {
            // Bildcontainer für PDF-Export anpassen
            imageContainer.style.position = 'absolute';
            imageContainer.style.width = '30%';  // Breiter machen
            imageContainer.style.right = '15%';  // Weiter nach rechts
            imageContainer.style.top = '100px';  // Höher platzieren
            
            // Bild selbst größer machen
            characterImage.style.maxWidth = '100%';
            characterImage.style.maxHeight = '250px';  // Höher für PDF
        }
        
        // Kurze Pause, um die Änderungen zu rendern
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // HTML zu Canvas
        const canvas = await html2canvas(container, {
            scale: 2, // Höhere Qualität
            useCORS: true,
            logging: false,
            windowWidth: container.scrollWidth,
            windowHeight: container.scrollHeight
        });
        
        // A4 Größe in Punkten (72 DPI)
        const pdfWidth = 595.28;
        const pdfHeight = 841.89;
        
        // PDF erzeugen im A4-Format
        const pdf = new jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4'
        });
        
        // Canvas auf die Seite skalieren, sodass alles auf eine Seite passt
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        
        // Skalierungsfaktor berechnen, um auf eine Seite zu passen
        const scaleX = pdfWidth / canvasWidth;
        const scaleY = pdfHeight / canvasHeight;
        const scale = Math.min(scaleX, scaleY) * 0.95; // 5% Rand lassen
        
        // Zentrieren auf der Seite
        const x = (pdfWidth - (canvasWidth * scale)) / 2;
        const y = (pdfHeight - (canvasHeight * scale)) / 2;
        
        // Canvas in verkleinerter Form ins PDF einfügen
        pdf.addImage(
            canvas.toDataURL('image/jpeg', 0.9), // Bessere Qualität
            'JPEG', 
            x, 
            y, 
            canvasWidth * scale, 
            canvasHeight * scale
        );
        
        // Charakter-Name aus dem Formular abrufen
        let characterName = document.getElementById('name').value.trim();
        if (!characterName) characterName = 'pokemon-charakter';
        
        // Sonderzeichen im Dateinamen bereinigen
        characterName = characterName.replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        
        // PDF speichern
        pdf.save(`${characterName}.pdf`);
        
        // Originalstyling wiederherstellen
        if (imageContainer) {
            imageContainer.style.width = originalImageContainerStyle.width;
            imageContainer.style.position = originalImageContainerStyle.position;
            imageContainer.style.right = originalImageContainerStyle.right;
            imageContainer.style.top = originalImageContainerStyle.top;
        }
        
        if (characterImage.src && characterImage.style.display !== 'none') {
            characterImage.style.maxWidth = originalImageStyle.maxWidth;
            characterImage.style.maxHeight = originalImageStyle.maxHeight;
        }
        
        // Elemente wieder anzeigen und Pad wiederherstellen
        downloadBtn.style.display = 'block';
        if (header) header.style.display = 'block';
        if (footer) footer.style.display = 'block';
        if (uploadLabel) uploadLabel.style.display = 'inline-block';
        if (imageInstructions) imageInstructions.style.display = 'block';
        if (removeImageBtn && document.getElementById('character-image').src) {
            removeImageBtn.style.display = 'block';
        }
        container.style.padding = originalPadding;
        
    } catch (error) {
        console.error('Fehler beim PDF-Export:', error);
        alert('Beim PDF-Export ist ein Fehler aufgetreten. Bitte versuche es erneut.');
        
        // Alles zurücksetzen
        downloadBtn.style.display = 'block';
        if (header) header.style.display = 'block';
        if (footer) footer.style.display = 'block';
        if (uploadLabel) uploadLabel.style.display = 'inline-block';
        if (imageInstructions) imageInstructions.style.display = 'block';
        if (removeImageBtn && document.getElementById('character-image').src) {
            removeImageBtn.style.display = 'block';
        }
    }
}

// Funktion zum dynamischen Laden der benötigten Bibliotheken
async function loadScripts() {
    const scripts = [
        'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
    ];
    
    const loadPromises = scripts.map(src => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Laden fehlgeschlagen: ${src}`));
            document.head.appendChild(script);
        });
    });
    
    await Promise.all(loadPromises);
    
    // Kurze Verzögerung, um sicherzustellen, dass die Bibliotheken geladen sind
    return new Promise(resolve => setTimeout(resolve, 300));
}

// Initialisierung beim Laden der Seite
document.addEventListener('DOMContentLoaded', function() {
    // Button dem DOM hinzufügen
    addDownloadButton();
});
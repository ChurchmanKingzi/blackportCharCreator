// fertigkeitenService.js - Service für die Verwaltung von Fertigkeitsbeschreibungen

const fertigkeitenService = {
    // Alle Fertigkeiten mit ihren Beschreibungen
    fertigkeiten: {
        // KÖ - Körper Fertigkeiten
        "Akrobatik": "Die Fähigkeit, komplexe Bewegungsabläufe auszuführen und Balance zu halten. Wird für Saltos, Körperbeherrschung und generell Geschicklichkeit verwendet.",
        "Angeln": "Das Wissen und die Technik, erfolgreich Fische und anderes aus dem Wasser zu fangen. Umfasst Köderauswahl, Gewässerkunde und den richtigen Umgang mit Angelgerät.",
        "Ausweichen": "Die Reaktionsfähigkeit, Angriffen zu entgehen. Wird auf den PA-Wert addiert.",
        "Handwerk": "Die Fähigkeit, Gegenstände zu reparieren oder herzustellen. Umfasst grundlegende handwerkliche Kenntnisse verschiedener Materialien.",
        "Horchen": "Die Fähigkeit, leise Geräusche wahrzunehmen und einzuordnen. Ermöglicht das Belauschen von Gesprächen oder das Bemerken von Annäherungen.",
        "Kampfsport": "Training in waffenloser Kampfkunst. Wird bei unbewaffneten Angriffen auf GENA addiert und erhöht Schaden von Nahkampfangriffen um 1W6 pro Punkt.",
        "Klettern": "Die Technik, Hindernisse und schwieriges Gelände vertikal zu überwinden. Je höher der Wert, desto steilere und schwierigere Wände können erklommen werden.",
        "Musizieren": "Die Fähigkeit, ein oder mehrere Instrumente zu spielen und Melodien zu komponieren. Kann zur Unterhaltung oder Ablenkung eingesetzt werden. Umfasst auch Gesang.",
        "Nahkampf": "Die Fertigkeit im Umgang mit Nahkampfwaffen wie Schwertern, Äxten oder Speeren. Wird bei Angriffen mit entsprechenden Waffen auf GENA addiert und erhöht Schaden von Nahkampfangriffen um 1W6 pro Punkt.",
        "Reiten": "Die Fähigkeit, Reit- und Lasttiere zu kontrollieren. Umfasst das grundlegende Reiten sowie fortgeschrittene Manöver im Kampf oder Gelände.",
        "Schießen": "Die Fertigkeit im Umgang mit Fernkampfwaffen wie Bögen, Armbrüsten oder Feuerwaffen. Wird bei Fernkampf-Angriffen auf GENA addiert und erhöht die Reichweite, in der effektiv geschossen werden kann.",
        "Schleichen/Verstecken": "Die Fähigkeit, sich geräuschlos zu bewegen und unentdeckt zu bleiben. Essentiell für Überraschungsangriffe und das Vermeiden von Gegnern.",
        "Schließtechnik": "Das Wissen über Schlösser und deren Überwindung. Ermöglicht das Öffnen von verschlossenen Türen und Behältnissen ohne passenden Schlüssel. Erfordert oft Werkzeug (z.B. Dietriche).",
        "Schwimmen": "Die Technik, sich im Wasser fortzubewegen und nicht unterzugehen. Höhere Werte erlauben schnelleres Schwimmen und längeres Tauchen.",
        "Sinnesschärfe": "Die allgemeine Wahrnehmungsfähigkeit der Sinne. Hilft beim Entdecken versteckter Gegenstände, Fallen oder Details in der Umgebung.",
        "Springen": "Die Fähigkeit, große Höhen oder Weiten zu überspringen. Nützlich zur Überwindung von Hindernissen oder kleinen Abgründen.",
        "Stärke": "Die rohe Körperkraft für das Heben, Tragen und Bewegen schwerer Objekte.",
        "Stehlen": "Die Fähigkeit, unbemerkt Gegenstände zu entwenden. Umfasst Taschendiebstahl und das heimliche Durchsuchen von Behältnissen.",
        "Tanzen": "Die Fähigkeit, rhythmische und koordinierte Bewegungen auszuführen. Kann in sozialen Situationen oder für bestimmte Rituale nützlich sein.",
        "Werfen": "Die Präzision und Kraft beim Werfen von Objekten. Wird für Wurfwaffen wie Messer, Speere oder Granaten verwendet und erhöht GENA mit solchen Waffen.",
        "Widerstand": "Die körperliche Zähigkeit gegen schädliche Einflüsse. Erhöht die Resistenz gegen Gifte, Krankheiten, Alkohol und extreme Umweltbedingungen.",
        
        // WI - Weisheit Fertigkeiten
        "Computernutzung": "Die Fähigkeit, Computer und digitale Geräte zu bedienen. Umfasst grundlegende Anwendungen bis hin zu komplexer Programmierung. Schließt auch Recherche im Netz mit ein.",
        "Erste": "Die Kenntnis medizinischer Grundversorgung. Ermöglicht die Stabilisierung von Verletzten und die Behandlung leichter Wunden.",
        "Fahrzeuge": "Die Fertigkeit, verschiedene Fahrzeuge zu steuern. Je höher der Wert, desto komplexere oder schnellere Fahrzeuge können beherrscht werden.",
        "Forensik": "Die Wissenschaft der Spurensicherung und -auswertung. Ermöglicht die Rekonstruktion von Ereignissen anhand kleinster Hinweise.",
        "Gefahreninstinkt": "Die intuitive Wahrnehmung von Bedrohungen. Warnt vor Hinterhalten, Fallen oder unsicheren Situationen. Muss angesagt werden (das heißt, du als Spieler musst sagen, dass du auf Gefahreninstinkt wüürfeln willst).",
        "Geschichte": "Das Wissen über historische Ereignisse, Persönlichkeiten und Entwicklungen. Bietet Kontext zu aktuellen Situationen und Kulturen.",
        "Kryptografie": "Die Kenntnis von Verschlüsselungstechniken. Ermöglicht das Erstellen und Entschlüsseln von Geheimcodes und verschlüsselten Nachrichten.",
        "Medizin": "Umfassendes Wissen über den menschlichen Körper. Befähigt zur Diagnose und Behandlung von Krankheiten und schweren Verletzungen.",
        "Meteorologie": "Die Kenntnis von Wetterphänomenen und -vorhersagen. Hilft bei der Navigation und Vorbereitung auf Wetterumschwünge.",
        "Naturwissenschaften": "Grundlegende Kenntnisse in Physik, Chemie und Biologie. Hilft beim Verstehen und Lösen wissenschaftlicher Probleme.",
        "Orientierung": "Die Fähigkeit, den eigenen Standort zu bestimmen und den Weg zu finden. Unerlässlich für Reisen in unbekanntem Terrain.",
        "Recherche": "Die Methodik, Informationen in Büchern und Archiven zu finden. Beschleunigt die Suche nach spezifischem Wissen z.B. in Bibliotheken.",
        "Reparieren": "Die Fertigkeit, defekte Geräte und Mechanismen instand zu setzen. Vom einfachen Werkzeug bis zu komplexen Maschinen.",
        "Wildnisleben/Survival": "Das Wissen über das Überleben in der Wildnis. Umfasst Nahrungssuche, Unterschlupfbau, Feuer machen und Spurenlesen.",
        
        // CH - Charisma Fertigkeiten
        "Anführen": "Die Fähigkeit, andere zu motivieren und zu leiten. Verbessert die Moral und Effizienz von Gruppen unter eigener Führung. Kann Verbündeten Advantage gewähren.",
        "Auftreten": "Die Präsenz und das Selbstbewusstsein bei öffentlichen Auftritten. Wichtig für Reden, Performances und formelle Anlässe.",
        "Beeindrucken": "Die Kunst, bei anderen einen positiven Eindruck zu hinterlassen. Nützlich für soziale Kontakte und Verhandlungen.",
        "Beruhigen": "Die Fähigkeit, aufgebrachte Personen zu besänftigen. Kann Konflikte entschärfen und aggressive Reaktionen verhindern.",
        "Betören": "Die Fertigkeit, andere durch Charme und Anziehungskraft zu beeinflussen. Kann Personen ablenken oder gefügig machen.",
        "Einschüchtern": "Die Kunst, durch Drohungen oder bedrohliches Auftreten Angst zu erzeugen. Kann Informationen oder Kooperation erzwingen.",
        "Etikette": "Die Kenntnis gesellschaftlicher Umgangsformen. Ermöglicht angemessenes Verhalten in verschiedenen sozialen Schichten und Kulturen.",
        "Feilschen": "Die Fertigkeit, vorteilhafte Handelsabschlüsse zu erzielen. Senkt Kaufpreise und erhöht Verkaufserlöse.",
        "Gaslighten": "Die manipulative Technik, die Realitätswahrnehmung anderer zu verzerren. Kann Verwirrung stiften oder Selbstzweifel säen.",
        "Lippenlesen": "Die Fähigkeit, Gespräche durch Beobachtung der Mundbewegungen zu verstehen. Ermöglicht das Belauschen ohne akustischen Zugang.",
        "Lügen": "Die Kunst der überzeugenden Unwahrheit. Je höher der Wert, desto schwieriger ist es, die Lüge zu durchschauen.",
        "Psychologie": "Das Verständnis menschlichen Verhaltens und Denkens. Hilft, Motive zu erkennen und Reaktionen vorherzusagen.",
        "Schauspielern": "Die Fähigkeit, Emotionen und Persönlichkeiten zu simulieren. Ermöglicht das Annehmen falscher Identitäten.",
        "Stimmen": "Die Technik, Stimmen anderer Personen zu imitieren. Nützlich für Täuschungsmanöver und Unterhaltung.",
        "Überreden": "Die Fertigkeit, andere zu bestimmten Handlungen zu bewegen. Funktioniert durch Beschwatzen und 'Fast Talk'.",
        "Überzeugen": "Die Fähigkeit, andere von der eigenen Meinung oder Sichtweise zu überzeugen. Basiert auf logischer Argumentation und Glaubwürdigkeit.",
        
        // GL - Glück Fertigkeiten
        "Spielen": "Die Fertigkeit in Glücks- und Strategiespielen. Erhöht die Gewinnchancen bei Karten, Würfeln und ähnlichen Spielen.",
        "Suchen": "Die glückliche Intuition beim Auffinden von versteckten Objekten. Willst du z.B. in einem Geräteschuppen ein bestimmtes Werkzeug finden, würfelst du hierauf.",
        
        // MA - Magie Fertigkeiten
        "Artefakte": "Die Fähigkeit, magische Gegenstände und ihre Funktionen zu identifizieren. Verrät Zweck und Kraft mystischer Objekte.",
        "Magieresistenz": "Die natürliche Widerstandskraft gegen magische Effekte. Hierauf würfelst du, wenn dich ein offensiver Zauber treffen würde, um entweder Schaden zu halbieren oder negative Effekte abzuwehren.",
        "Magiewahrnehmung": "Die Sensibilität für magische Energien und Phänomene. Ermöglicht das Spüren von Zaubern, verzauberten Objekten und magischen Wesen, auch noch über eine Stunde, nachdem der Zauber gewirkt wurde.",
        "Okkultismus": "Das Wissen über mystische Traditionen, Rituale und übernatürliche Wesen. Bietet Einblicke in magische Praktiken und deren Anwendung.",
        "Zauberkraft": "Die rohe Macht deiner Zauber. Wird auf GENA-Proben für Zauber draufaddiert und erhöht ihre Potenz abhängig vom Zauber."
    },
    
    /**
     * Gibt die Beschreibung einer Fertigkeit zurück
     * @param {string} fertigkeitName - Der Name der Fertigkeit
     * @returns {string} Die Beschreibung der Fertigkeit oder einen Hinweis, falls nicht gefunden
     */
    getBeschreibung: function(fertigkeitName) {
        return this.fertigkeiten[fertigkeitName] || "Keine Beschreibung verfügbar";
    },
    
    /**
     * Gibt ein Array mit allen Fertigkeitsnamen zurück
     * @returns {string[]} Array mit allen Fertigkeitsnamen
     */
    getAlleFertigkeiten: function() {
        return Object.keys(this.fertigkeiten);
    },
    
    /**
     * Gibt ein Objekt mit allen Fertigkeiten und ihren Beschreibungen zurück
     * @returns {Object} Objekt mit allen Fertigkeiten
     */
    getAlleFertigkeitenMitBeschreibung: function() {
        return this.fertigkeiten;
    }
};

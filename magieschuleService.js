// magieschuleService.js - Service für die Verwaltung von Magieschulen

const magieschuleService = {
    // Alle verfügbaren Magieschulen mit ihren Beschreibungen
    magieschulen: [
        {
            id: "zerstoerung",
            name: "Zerstörung",
            beschreibung: "Feuerwalzen, Explosionen, alles, was richtig wehtut."
        },
        {
            id: "unterstuetzung",
            name: "Unterstützung",
            beschreibung: "Heilung, Buffs, Schilde."
        },
        {
            id: "verfall",
            name: "Verfall",
            beschreibung: "Gift, Debuffs, Statuseffekte."
        },
        {
            id: "magiekunst",
            name: "Magiekunst",
            beschreibung: "Utility, Tricks und Überraschungen."
        },
        {
            id: "beschwoerung",
            name: "Beschwörung",
            beschreibung: "Helfer im Kampf, Spione, Gegenstände erschaffen."
        }
    ],
    
    /**
     * Gibt alle verfügbaren Magieschulen zurück
     * @returns {Array} Liste aller Magieschulen
     */
    getAllMagieschulen: function() {
        return this.magieschulen;
    },
    
    /**
     * Gibt eine bestimmte Magieschule anhand ihrer ID zurück
     * @param {string} id - Die ID der gesuchten Magieschule
     * @returns {Object|null} Die gefundene Magieschule oder null, wenn nicht gefunden
     */
    getMagieschuleById: function(id) {
        return this.magieschulen.find(schule => schule.id === id) || null;
    },
    
    /**
     * Gibt eine bestimmte Magieschule anhand ihres Namens zurück
     * @param {string} name - Der Name der gesuchten Magieschule
     * @returns {Object|null} Die gefundene Magieschule oder null, wenn nicht gefunden
     */
    getMagieschuleByName: function(name) {
        return this.magieschulen.find(schule => schule.name === name) || null;
    }
};

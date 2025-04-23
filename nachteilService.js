// nachteilService.js
const nachteilService = {
    getAllNachteile: function() {
        return [
            {
                id: 'abhängig',
                name: 'Abhängig',
                beschreibung: 'Du leidest an einer starken Drogenabhängigkeit. Die genaue Art der Substanz kannst du selbst bestimmen, sie muss aber negative gesundheitliche Nebeneffekte und vor allem Entzugserscheinungen beinhalten. Wenn du nicht mindestens einmal alle 8 Stunden (Schlaf nicht mitgerechnet) deine Drogen nimmst, beginnen die Entzugserscheinungen. Deine KP können in diesem Zustand nicht geheilt werden, alle KÖ-abhängigen Proben erhalten 2 automatische Patzer, im schlimmsten Fall nimmst du sogar Wunden.'
            },
            {
                id: 'absolut ehrlich',
                name: 'Absolut Ehrlich',
                beschreibung: 'Du kannst niemals lügen, egal, was passiert. Es ist dir physisch unmöglich.'
            },
            {
                id: 'alpträume',
                name: 'Alpträume',
                beschreibung: 'Du bist jede Nacht von schrecklichen Alpträumen geplagt. Statt KP und MP vollständig, heilt eine Nacht Schlaf nur KP ODER MP.'
            },
            {
                id: 'einarmig',
                name: 'Einarmig',
                beschreibung: 'Du hast nur einen Arm, wodurch manche magischen Rituale und Zauber für dich unmöglich zu wirken sind und das Kämpfen dir schwerer fällt. Nahkampf-Proben haben einen automatischen Patzer und du kannst generell keine Zauber deines MA-Levels wirken. Um Level-3-Zauber zu wirken, bräuchtest du z.B. eine MA von 4.'
            },
            {
                id: 'einbeinig',
                name: 'Einbeinig',
                beschreibung: 'Du hast nur ein Bein. Entsprechend bist du sehr langsam. Dein BW-Wert ist immer 5 und deine INIT immer 1. In einer Verfolgungsjagd hast du keine Chance...!'
            },
            {
                id: 'eisenallergie',
                name: 'Eisenallergie',
                beschreibung: 'Du reagierst extrem allergisch auf Eisen. Eisengegenstände verursachen Schmerzen bei Berührung (1W6 Schaden pro Runde bei Kontakt), und du kannst nicht durch Türrahmen oder andere Konstruktionen gehen, wenn diese signifikante Mengen Eisen enthalten. In modernen Gebäuden mit Stahlträgern erleidest du kontinuierlich 1W6 Schaden pro Minute.'
            },
            {
                id: 'emotionaler_auslöser',
                name: 'Emotionaler Auslöser',
                beschreibung: 'Eine bestimmte starke Emotion (Wut, Trauer oder Freude) löst bei dir unkontrollierte Magie aus. Immer wenn du diese Emotion intensiv erlebst, wirkt sich ein zufälliger Zauber aus deinem Repertoire in der Umgebung aus. Der Spielleiter bestimmt Ziel und genaue Wirkung.'
            },
            {
                id: 'gejagt',
                name: 'Gejagt',
                beschreibung: 'Du hast dir einen mächtigen Feind gemacht, der es aktiv auf dein Leben abgesehen hat und alles tun wird, um dich zu sabotieren und dir zu schaden. Dieser Feind kann z.B. eine Organisation, ein Dämonenlord oder ein besonders mächtiger Magier sein und muss in deiner Backstory erklärt werden!'
            },
            {
                id: 'glasknochen',
                name: 'Glasknochen',
                beschreibung: 'Immer, wenn du physischen Schaden nimmst (z.B. durch einen Schlag ins Gesicht oder einen Sturz aus 3 Metern Höhe) nimmst du automatisch mindestens eine Wunde.'
            },
            {
                id: 'halluzinationen',
                name: 'Halluzinationen',
                beschreibung: 'Du siehst und hörst oft Dinge, die einfach nicht da sind. Dir selbst ist das bewusst, aber trotzdem kannst du niemals sagen, wann die Realität aufhört und deine Hallus anfangen. Der Spielleiter kann dir nach Beliebigen Dinge sagen, die es gar nicht gibt.'
            },
            {
                id: 'ineffizient',
                name: 'Ineffizient',
                beschreibung: 'Du kannst unglaublich schlecht mit Mana umgehen. Alle deine MP-Kosten sind verdoppelt.'
            },
            {
                id: 'kein schmerzempfinden',
                name: 'Kein Schmerzempfinden',
                beschreibung: 'Du kannst keine Schmerzen spüren. Du kennst deine eigenen KP und Wunden nicht. Diese werden vom Spielleiter getracked und er sagt dir irgendwann plötzlich, dass du bewusstlos wirst oder stirbst. Du darfst deine KP nicht mitzählen!'
            },
            {
                id: 'langschläfer',
                name: 'Langschläfer',
                beschreibung: 'Du brauchst viel mehr Schlaf als andere. Wenn du nicht mindestens 12 Stunden am Stück schläfst, regenerieren sich deine KP und MP nicht und du bekommst schlechte Laune und einen automatischen Patzer auf alle Proben.'
            },
            {
                id: 'magieanfällig',
                name: 'Magieanfällig',
                beschreibung: 'Du darfst Proben auf Magieresistenz nicht würfeln; sie sind immer automatisch Misserfolge.'
            },
            {
                id: 'magischer-leuchtturm',
                name: 'Magischer Leuchtturm',
                beschreibung: 'Deine magische Signatur ist extrem auffällig. Jeder Magier in einem Umkreis von einem Kilometer spürt automatisch, wenn du einen Zauber wirkst, und weiß auch, zu welcher Schule er gehört. Magische Wesen werden von deiner Präsenz angezogen. Wenn du in einem Gebiet von 1x1 Kilometer mehr als drei Zauber innerhalb von 24 Stunden wirkst, hinterlässt du eine 24 Stunden anhaltende Spur, die immer zu deiner aktuellen Position führt, wodurch Magier dich spielend leicht verfolgen können.'
            },
            {
                id: 'manavergiftung',
                name: 'Manavergiftung',
                beschreibung: 'Dein Körper reagiert toxisch auf magische Energie. Immer, wenn du einen Zauber wirkst und dadurch Mana durch deinen Körper leitest, erleidest du 1W6 Schaden. Wenn du 0 MP erreichst, erleidest du automatisch eine Wunde durch die Vergiftungssymptome. Zauber zu wirken ist für dich grundsätzlich eine sehr unangenehme, schmerzhafte und generell nicht wünschenswerte Sache!'
            },
            {
                id: 'pazifist',
                name: 'Pazifist',
                beschreibung: 'Du hasst es, anderen Schaden zuzufügen, und würdest das (im Normalfall) niemals tun. Du kannst keine offensiven Zauber beherrschen. Wenn du jemandem Schaden zufügst, musst du eine Widerstand-Probe bestehen oder verfällst in Schockstarre. Natürlich ist es dir auch zuwider, wenn deine Verbündeten andere angreifen; Notwehr ist in dem Fall aber okay.'
            },
            {
                id: 'phobie',
                name: 'Phobie',
                beschreibung: 'Du hast eine von dir gewählte, häufig auftretende Angst (z.B. vor der Dunkelheit, vor Feuer, vor Höhe...). Es muss eine Angst vor etwas sein, das man überall finden kann, nicht so etwas wie "Angst vor giftigen Todes-Killerspinnen, die es nur in Australien gibt". Solange du mit deiner Angst konfrontiert bist, kannst du keine Proben versuchen; du bist in Schockstarre.'
            },
            {
                id: 'ritualgebunden',
                name: 'Ritualgebunden',
                beschreibung: 'Du musst täglich ein komplexes magisches Ritual durchführen, das mindestens 30 Minuten dauert. Das Ritual muss einen besonderen Gegenstand (z.B. ein Amulett) beinhalten, das zwar nicht unbedingt magisch, aber einmalig sein muss. Solltest du den Gegenstand verlieren, kannst du es also nicht durchführen! Außerdem muss es gesprochene Worte, Gesten und das Konsumieren von etwas (z.B. einer Form von Nahrung) beinhalten. Wenn du das Ritual versäumst, verlierst du für den gesamten folgenden Tag die Fähigkeit, Zauber zu wirken. Wird das Ritual drei Tage hintereinander versäumt, erleidest du zusätzlich jeden Tag eine Wunde, bis du das Ritual wieder durchführst.'
            },
            {
                id: 'schüchtern',
                name: 'Schüchtern',
                beschreibung: 'Du kannst so gar nicht mit anderen Menschen umgehen. Von CH abhängige Proben haben für dich immer 2 automatische Patzer. Solange du mehr als eine fremde Person in deiner Nähe hast, haben alle Proben, die du versuchst, einen automatischen Patzer pro zusätzlicher Person in der Nähe (max 3).'
            },
            {
                id: 'stur',
                name: 'Stur',
                beschreibung: 'Du kannst es absolut nicht akzeptieren, etwas nicht zu schaffen. Wenn du eine Probe forcieren kannst, musst du sie forcieren. Zusätzlich, wenn du bei einer Probe patzt, der Patzer aber nicht so schlimm war, dass er dich physisch davon abhalten würde, musst du die Probe direkt noch mal versuchen, falls möglich!'
            },
            {
                id: 'tödlich krank',
                name: 'Tödlich Krank',
                beschreibung: 'Du leidest an einer unheilbaren Krankheit und hast maximal noch ein Jahr zu leben. Aller gift- und krankheitsbasierter Schaden wird von deinen max KP abgezogen. Fallen diese auf 0, stirbst du an deiner Krankheit und kannst nicht wiederbelebt werden. Die Krankheit ist komplett unheilbar und übertrumpft sogar den Vorteil "Unsterblich".'
            },
            {
                id: 'unselbststaendig',
                name: 'Unselbstständig',
                beschreibung: 'Du kommst alleine einfach nicht klar. Solange du nicht jemanden bei dir hast, der dir sagt, was du tun sollst, oder dir zumindest aktiv moralischen Support gibt, kannst du aktiv keine Proben versuchen.'
            },
            {
                id: 'unterdrückte persönlichkeit',
                name: 'Unterdrückte Persönlichkeit',
                beschreibung: 'Tief in deinem Unterbewusstsein lebt ein zweites Du, das in jeder Hinsicht dein Gegenteil ist. Bist du vorsichtig, ist es risikofreudig. Bist du freundlich, ist es ein Arschloch. Und so weiter. Immer, wenn deine KP unter die Hälfte ihres Maximums fallen, kommt deine andere Persönlichkeit zum Vorschein und bleibt solange aktiv, bis du über 50% deiner max KP geheilt bist und dich nicht in einer Stresssituation (etwa im Kampf) befindest.'
            },
            {
                id: 'verflucht',
                name: 'Verflucht',
                beschreibung: 'Wenn du beim Wirken eines Zaubers patzt, trifft dieser dich automatisch selbst (auch, wenn das Ergebnis nur -1 war) für den vollen Schaden.'
            },
            {
                id: 'vorsichtig',
                name: 'Vorsichtig',
                beschreibung: 'Du bist übervorsichtig. Wenn eine Probe nicht auf Anhieb klappt, kannst du sie nicht forcieren.'
            }
        ];
    }
};

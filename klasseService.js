// klasseService.js
const klasseService = {
    getAllKlassen: function() {
        return [
            {
                id: 'aeromancer',
                name: 'Aeromancer',
                beschreibung: 'Immer, wenn du einen Zauber wirkst, kannst du einen starken Wind erzeugen. Im Kampf bleibt der Wind für bis zu eine Minute (12 Runden) als Serie heftiger Böen bestehen. Pro Instanz der Böen ist deine Initiative und die aller Ziele, die in dieselbe Richtung wie du gucken, um 5 erhöht und die aller Ziele, die dir gegenüberstehen, um 5 verringert (Rückenwind/Gegenwind). Wenn ein Ziel mindestens dreimal so viel Initiative hat wie alle Gegner, bekommt es zwei Runden im Kampf.'
            },
            {
                id: 'alchemist',
                name: 'Alchemist',
                beschreibung: 'Du beginnst das Spiel mit je 5 Heil- und Manatränken (stellen jeweils KP/MP vollständig wieder her) sowie 3 verschiedenen Elixieren deiner Wahl.'
            },
            {
                id: 'beschwörer',
                name: 'Beschwörer',
                beschreibung: 'Alles, was du mit einem Beschwörungszauber beschwörst, erhält +50% max KP (aufgerundet).'
            },
            {
                id: 'blutmagier',
                name: 'Blutmagier',
                beschreibung: 'Dein Blut hat magische Eigenschaften. Wähle zwei der folgenden: | Es trocknet sofort und schließt oberflächliche Verletzungen - du nimmst niemals Wunden durch Schnitte oder Stiche. | Es ist stark ätzend - jeder außer dir, der es berührt, nimmt jede Runde 1W6 Schaden, bis es entfernt wird. | Du kannst es manipulieren und formen, sobald es deinen Körper verlassen hat - du kannst Objekte aus deinem Blut erschaffen, die dann hart wie Eisen werden. | Es ist extrem potent, sodass du weniger davon im Körper brauchst als andere - es schadet dir fast nicht, auszubluten, sodass du keine Wunden dadurch nimmst, geringen Schaden zu nehmen, während du bewusstlos bist. | Es enthält Antikörper gegen jede Krankheit der Welt, ob natürlich oder künstlich - du bist komplett immun gegen Krankheiten und magische Gifte, egal, wie stark diese sind. | Es ist von Natur aus brennend heiß - deine Körpertemperatur liegt bei an die 50 Grad, du friest nie und bist immun gegen Effekte, die dich einfrieren oder dir Kälte-basierten Schaden zufügen würden.'
            },
            {
                id: 'chaos-magier',
                name: 'Chaos-Magier',
                beschreibung: 'Du kannst deine Aktion nutzen, um zwei Zauber statt einen einzusetzen, aber dann werden beide zufällig gewählt und müssen gegen dasselbe Ziel gehen.'
            },
            {
                id: 'druide',
                name: 'Druide',
                beschreibung: 'Du startest das Spiel mit einem kleinen Waldtier als Begleiter. Dein Begleiter hat 15 KP und stirbt sofort, wenn diese auf 0 fallen. Wenn du keinen Begleiter hast, kannst du ein neues kleines Tier fangen und in einem einstündigen Ritual zu deinem Begleiter machen. Du kannst mit deinem Begleiter sprechen und ihn verstehen, andere verstehen nicht, was ihr miteinander redet.'
            },
            {
                id: 'energie-vampir',
                name: 'Energie-Vampir',
                beschreibung: 'Immer, wenn in deiner Nähe Zauber gewirkt werden, regenerierst du sofort die Hälfte der für den Zauber ausgegebenen MP (abgerundet).'
            },
            {
                id: 'erzmagier',
                name: 'Erzmagier',
                beschreibung: 'Solange du mindestens einen Zauber jeder Magie-Schule beherrscht, haben alle Zauber für dich halbierte MP-Kosten. Dies ersetzt die Kostenreduzierung deiner primären Magieschule.'
            },
            {
                id: 'exorzist',
                name: 'Exorzist',
                beschreibung: 'Du kannst für 1 MP ein Ziel, das du berührst, auf negative Effekte wie Flüche, Gifte usw. untersuchen und sofort beliebig viele davon entfernen. Im Kampf kostet dich das entweder eine Aktion oder Reaktion.'
            },
            {
                id: 'geomant',
                name: 'Geomant',
                beschreibung: 'Du bist ein Experte für die natürlichen Flüsse und Ströme des Manas im Boden. Du kannst in jedem Gebiet, das du zum ersten Mal betritts, eine GL-Probe würfeln. Abhängig vom Ergebnis sind die Kosten aller Zauber in diesem Gebiet für dich um bis zu 50% verringert oder erhöht, da die Mana-Ströme hier besonders gut odér schlecht für dich sind. Ein "Gebiet" ist dabei ein zusammenhänges Biom, das mehrere Quadratkilometer umfasst. Hast du ein Gebiet einmal geprüft, gilt das Ergebnis dafür permanent.'
            },
            {
                id: 'hexendoktor',
                name: 'Hexendoktor',
                beschreibung: 'Du kannst einen einstündigen Tanz um ein Ziel herum aufführen, um dieses in perfekte körperliche Verfassung zu versetzen. Alle seine Wunden verschwinden, KP und MP werden voll aufgefüllt, es ist voller Energie, selbst wenn es lange nicht geschlafen hat. Wird der Tanz mittendrin unterbrochen, etwa durch einen Angriff, kann das katastrophale Folgen haben. Wenn ein Ziel zu Beginn des Tanzes seit weniger als 5 Minuten tot war, kann es so wiederbelebt werden. Nach Ende des Tanzes bist du völlig erschöpft, hast keine MP mehr und brauchst Schlaf, bevor du irgendetwas anderes tun kannst. Hast du ein Totes Ziel wiederbelebt, wirst du sofort bewusstlos.'
            },
            {
                id: 'hexer',
                name: 'Hexer',
                beschreibung: 'Aller Schaden, den du mit Zaubern anrichtest, wird am Ende um 2W6 erhöht.'
            },
            {
                id: 'illusionist',
                name: 'Illusionist',
                beschreibung: 'Du erhältst den exklusiven Zauber "Illusion erschaffen". Level 1, Zauberkunst, 10 MP. Erzeugt eine bist zu 1x1x2 Meter große optische Illusion, die absolut alles darstellen kann, was du dir vorstellst. Die Illusion kann halbtransparent oder komplett opak sein und hält bis zu eine Stunde. Die Dauer kann beliebig erhöht werden, kostet aber pro zusätzlicher Stunde wieder 10 MP. Du kannst die Illusion auch so einstellen, dass nur diejenigen sie sehen können, die von Magie wissen. Die Illusion kann jederzeit frühzeitig aufgehoben oder verändert werden. Solange du deine Augen geschlossen hältst und die Illusion Augen hat, kannst du durch ihre Augen sehen und sie fernsteuern. Sie kann keine Geräusche verursachen und ist rein optisch; man kann einfach durch sie hindurchgehen.'
            },
            {
                id: 'kampfmagier',
                name: 'Kampfmagier',
                beschreibung: 'Wenn du ein Ziel mit einem waffenlosen physischen Angriff triffst, kannst du sofort einen Zauber als zusätzliche Aktion gegen dasselbe Ziel einsetzen. Dieser erfordert eine separate GENA-Probe.'
            },
            {
                id: 'kannagi',
                name: 'Kannagi',
                beschreibung: 'Wenn du die KP eines Ziels mit Zaubern über ihr Maximum heilen würdest, werden die überschüssigen KP dem Ziel als halbtransparenter, kugelförmiger Schild angerechnet, den nur Menschen mit Magiewahrnehmung sehen können und der das Licht wie ein wunderschönes Prisma bricht. Dieser Schild verschwindet nach einer Stunde, aber es gibt kein Limit, wie stark er sein kann, wenn du nur genug Heilzauber in dieser Zeit wirkst.'
            },
            {
                id: 'kleriker',
                name: 'Kleriker',
                beschreibung: 'Deine Zauber haben niemals negative Effekte auf deine Verbündeten, weder in Form von Schaden noch durch Debuffs oder Statuseffekte. Das gilt sowohl, wenn du patzt, als auch, wenn verbündete Ziele in der Flugbahn deiner Zauber sind. Dieser Schutz gilt nur für Ziele, die du explizit als "Verbündete" ansiehst.'
            },
            {
                id: 'mönch',
                name: 'Mönch',
                beschreibung: 'Du musst niemals essen und nur 4 Stunden pro Nacht schlafen. Andere können mit Magiewahrnehmung nicht erkennen, dass du ein Magier bist.'
            },
            {
                id: 'nekromant',
                name: 'Nekromant',
                beschreibung: 'Du erhältst den exklusiven Zauber "Auferweckung". Level 1, Beschwörungsmagie, 20 MP. Erweckt eine Leiche, die du berührst, als Untoten wieder. Die Kampfwerte der Leiche variieren je nach Beschaffenheit (Zustand, Spezies, Größe usw.) stark. Der Untote gehorcht dir aufs Wort, hat aber keinerlei Intelligenz. Er kann nicht sprechen, hat keine Erinnerung an sein altes Leben, kann keine Zauber wirken usw. Für jeden Untoten, den du kontrollierst, sind deine maximalen MP um 10 reduziert. Diese Reduzierung wird aufgehoben, sobald ein Untoter vernichtet wird. Eine "gefallene" Leiche kann erneut erweckt werden, sofern ihr Zustand es erlaubt.'
            },
            {
                id: 'okkultist',
                name: 'Okkultist',
                beschreibung: 'Du kannst Verträge mit bist zu 3 Personen schließen, die dadurch deine "Anhänger" werden. Du kannst ein 5 Minuten langes Ritual durchführen, um beliebig viele deiner Anhänger über eine beliebige Distanz direkt an deine Seite zu teleportieren (auch gegen ihren Willen). Um jemandem zu deinem Anhänger zu machen, muss derjenige freiwillig deinen Vertrag unterschreiben! Wird der Vertrag physisch zerstört, endet der Anhänger-Status.'
            },
            {
                id: 'orakel',
                name: 'Orakel',
                beschreibung: 'Bevor du schlafen gehst, kannst du laut eine Frage stellen. Sofern dein Schlaf mindestens 6 Stunden andauert, erhältst du darin einen prophetischen Traum, der dir die Antwort auf diese Frage zeigt. Fragen können sowohl sein "Zeige mir, wo sich der und der versteckt hält", als auch "Wenn wir da und da angreifen würden, wie würde das ausgehen?", wobei Fragen, die die Zukunft betreffen, natürlich nur einen groben Eindruck vermitteln und keinesfalls eine unveränderbare Zukunft zeigen!'
            },
            {
                id: 'paladin',
                name: 'Paladin',
                beschreibung: 'Du erhältst den exklusiven Zauber "Lichtfessel". Level 1, Beschwörungsmagie, 0 MP. Erzeugt eine dicke Kette aus reinem Licht zwischen zwei Zielen und/oder Objekten in Sichtweite. Die Kette kann bis zu 10 Meter lang sein und ist hart und fest wie Stahl. Du musst dich aktiv konzentrieren, um die Kette aufrechtzuerhalten. Wenn ein Ziel versucht, auszubrechen, würfelst du eine MA-Probe und das Ziel eine KÖ-Probe und der höhere Wurf gewinnt. Ein Versuch, auszubrechen, kostet eine Aktion.'
            },
            {
                id: 'priester',
                name: 'Priester',
                beschreibung: 'Deine Zauber, die KP heilen, heilen die doppelte Menge.'
            },
            {
                id: 'pyromant',
                name: 'Pyromant',
                beschreibung: 'Du erhältst den exklusiven Zauber "Feuerball". Level 1, Zerstörungsmagie, 6 MP. Schleudert einen Feuerball auf ein Ziel. Der Feuerball detoniert bei Kontakt und trifft alle Ziele in einem 3x3-Meter-Gebiet für (ZK+4)W6 Schaden. Kann so weit geschossen werden, wie du gucken kannst, große Distanzen erschweren aber exponentiell die GENA-Probe.'
            },
            {
                id: 'runenmeister',
                name: 'Runenmeister',
                beschreibung: 'Du kannst deine Zauber in Runen bannen. Das heißt, du zeichnest eine magische Rune und bezahlst währenddessen die MP-Kosten des Zaubers, den du darin bannen willst. Das Zeichnen dauert etwa 10 Minuten. Danach kannst du die Rune jederzeit durch einen Gedanken "detonieren" lassen, wodurch der darin gebannte Zauber freigesetzt wird. Ist es ein Zauber, der ein Ziel anvisiert, zielt er automatisch auf das nächststehende Ziel, falls möglich. Im Kampf kannst du entweder beliebig viele Runen während deiner Runde detonieren lassen (ohne, dass das deine Aktion kostet), oder du kannst jederzeit deine Reaktion ausgeben, um dasselbe zu tun. Du kannst deine Runen auch so einstellen, dass sie bei Kontakt detonieren. Dann wählen sie automatisch das Ziel, das sie berührt hat, als Ziel ihres Zaubers.'
            },
            {
                id: 'schamane',
                name: 'Schamane',
                beschreibung: 'Du kannst, bevor du schlafen gehst, die Geister um einen prophetischen Traum bitten. Dabei spezifizierst du entweder eine Person, ein Objekt oder einen Ort, die, das oder den du schon einmal berührt hast. Während du schläfst, spähen die Geister für dich dein Ziel aus und zeigen dir durchgehend aus einer erhöhten Perspektive, was die Person gerade tut, wie die Umgebung des Objekts aussieht, oder was an dem Ort gerade vorgeht. Die Geister können mit Magiewahrnehmung bemerkt werden, aber nur ein Nekromant oder anderer Schamane kann mit ihnen interagieren.'
            },
            {
                id: 'scharlaten',
                name: 'Scharlatan',
                beschreibung: 'Für dich hängt es vom CH-Wert statt MA ab, welche Level an Zaubern du lernen kannst. Du bist außerdem extrem gut darin, deine magischen Fähigkeiten bei Bedarf unter den Scheffel zu stellen oder stark zu übertreiben. Wenn du nicht als Magier erkannt werden willst, ist es unmöglich, dich als solchen zu erkennen, solange du nicht gerade zauberst.'
            },
            {
                id: 'schnell-magier',
                name: 'Schnell-Magier',
                beschreibung: 'Du kannst im Kampf auf deine Reaktion verzichten, um während deiner Runde einen Zauber als zusätzliche Aktion auszuführen. Ein so ausgeführter Zauber hat seine Manakosten verdoppelt.'
            },
            {
                id: 'schreiber',
                name: 'Schreiber',
                beschreibung: 'Du kannst Zauber recherchieren und in magischen Schriftrollen bannen. Einen festgehaltenen Zauber einzusetzen, funktioniert genauso, wie den Zauber normal zu nutzen, außer, dass du die Schriftrolle laut vorlesen musst. Wird ein Zauber von einer Schriftrolle eingesetzt, verbrennt die Schriftrolle augenblicklich zu Asche und du musst eine neue schreiben, was 1W4 Stunden dauert und ausgiebige Nachschlagewerke voraussetzt. Du kannst mit Schriftrollen keine Zauber wirken, deren Level höher als dein MA-Wert ist. Du beginnst das Spiel mit Schriftrollen für drei verschiedene Zauber deine Wahl. Schriftrollen können auch an andere weitergegeben werden, solange diese sie lesen können, können sie die Magie freisetzen.'
            },
            {
                id: 'seelensammler',
                name: 'Seelensammler',
                beschreibung: 'Du besitzt ein besonderes, verfluchtes Buch, in dem du die Seelen der Toten sammeln kannst. Außerdem kannst du die Seelen der Toten sehen. Wenn jemand stirbt, steigt seine Seele in Richtung Himmel auf. Indem du dein Buch auf eine leere Seite öffnest und direkt auf die Seele richtest, kannst du sie wie mit einem Staubsauger einsaugen. Wenn du die Seele eines Magiers absorbierst, lernst du 1W4 zufällige Zauber, die dieser Magier beherrschte, und erhältst dauerhaft zusätzliche max MP in Höhe von 10% der max MP des Magiers (aufgerundet). Du musst das Buch berühren, um die Zauber wirken zu können.'
            },
            {
                id: 'technomagus',
                name: 'Technomagus',
                beschreibung: 'Du erhältst den exklusiven Zauber "Poltergeist". Level 1, Zauberkunst, 2 MP. Erweckt einen Gegenstand zum Leben. Während du den Zauber wirkst, gibst du dem Gegenstand einen simplen Befehl (maximal ein Satz). Sobald der Gegenstand zum Leben erweckt ist, folgt er deinem Befehl mit ganzer Kraft. Er hat 1 KP und wird wieder leblos, wenn er Schaden nimmt oder deinen Befehl vollständig ausgeführt hat. Du kannst maximal drei Gegenstände zur Zeit zum Leben erweckt haben, den Effekt aber jederzeit abbrechen, wenn du andere erwecken willst. Gegebene Befehle müssen ein klares Ziel/einen klaren Endpunkt haben, du kannst einem Gegenstand nicht befehlen "dir zu dienen".'
            },
            {
                id: 'telepath',
                name: 'Telepath',
                beschreibung: 'Du kannst telepathisch mit jedem Menschen sprechen, dessen Gesicht du direkt sehen kannst (Bilder und Videos zählen nicht, du musst das Gesicht vor dir sehen). Du überträgst dann deine Gedanken direkt in die Köpfe deiner Ziele hinein, wogegen diese sich nicht wehren können. Alle Gedanken, die als Antwort an dich gemeint sein (UND NUR DIESE) bekommst du in deinen Kopf übertragen. Du kannst damit NICHT frei die Gedanken von Menschen lesen.'
            },
            {
                id: 'Verzauberer',
                name: 'Verzauberer',
                beschreibung: 'Du kannst Gegenstände mit Level-1- und -2-Zaubern belegen, die dadurch verzaubert werden. Dabei definierst du eine Bedingung, wie der Zauber freigesetzt werden soll (z.B. bei einem Schwert immer, wenn es ein Ziel trifft). Ein Gegenstand kann beliebig oft verzaubert werden, sowohl mit beliebig vielen verschiedenen Zaubern, als auch mit beliebig vielen "Ladungen" eines Zaubers. Immer, wenn ein Zauber des Gegenstands freigesetzt wird, wird eine Ladung konsumiert. Sind keine Ladungen eines Zaubers auf dem Gegenstand übrig, funktioniert die Verzauberung nicht mehr, bis neue Ladungen hinzugefügt werden. Ladungen halten ewig, solange sie nicht konsumiert werden.'
            },
            {
                id: 'weissmagier',
                name: 'Weißmagier',
                beschreibung: 'Du erkennst sofort automatisch, wenn du oder ein Ziel, das du berührst, von negativen Effekten, Flüchen usw. betroffen sind. Außerdem erkennst du den Zauber oder Effekt, der dafür verantwortlich ist und weißt, wie man den Effekt beheben kann - allerdings beherrscht du nicht unbedingt Gegenmaßnahmen.'
            },
            {
                id: 'zauberdieb',
                name: 'Zauberdieb',
                beschreibung: 'Du kannst Zauber "stehlen", die du beobachtest. "Stehlen" heißt in diesem Fall eher "kopieren" - du stiehlst das Wissen. Du musst einen Zauber ausgiebig beobachten und genau verstanden haben und eine Probe auf WI ablegen, um den Zauber erfolgreich einsetzen zu können. Gestohlene Zauber erhalten weder eine Beschreibung noch MP-Kosten, diese musst du durch ausprobieren selbst herausfinden. Es gibt kein Limit dafür, wie viele Zauber du dir so aneignen kannst. Du kannst so keine Zauber lernen, deren Level höher ist als dein MA-Wert!'
            },
            {
                id: 'zeitzauberer',
                name: 'Zeitzauberer',
                beschreibung: 'Du kannst einmal pro Tag die Zeit um dich herum extrem verlangsamen, beziehungsweise deine eigene Zeit relativ zum Rest der Welt beschleunigen. Wenn du das tust, kannst du dich sofort viermal so schnell bewegen wie ein normaler Mensch. Du kannst dies nutzen, um zu Kampfbeginn deine gewürfelte Initiative zu vervierfachen ODER um im Kampf in einer Runde vier Aktionen durchzuführen. Nachdem du diesen Effekt aktiviert hast, bist du für den Rest des Tages extrem erschöpft und deine Zauber kosten doppelt so viel MP.'
            }
        ];
    }
};

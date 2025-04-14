// spellService.js - Service für die Verwaltung von Zaubern

const spellService = {
    // Alle verfügbaren Zauber mit ihren Beschreibungen
    zauber: [
        {
            id: "blitzeinschlag",
            name: "Blitzeinschlag",
            level: 3,
            mpKosten: 20,
            magieschule: "zerstoerung",
            beschreibung: "Lasse aus heiterem Himmel einen Blitz auf ein Ziel einschlagen! Kann nicht drauf reagiert werden und fügt (ZK+3)W6 Schaden zu."
        },
        {
            id: "blutkocher",
            name: "Blutkocher",
            level: 1,
            mpKosten: 8,
            magieschule: "zerstoerung",
            beschreibung: "Lässt das Blut in einem Ziel in Sichtweite kurzzeitig kochen, was diesem enorm wehtut und 2W6 Schaden verursacht. Dieser Zauber umgeht jeden Effekt, der Schaden reduzieren oder negieren würde, außer kompletter Magieimmunität."
        },
        {
            id: "brandblase",
            name: "Brandblase",
            level: 2,
            mpKosten: 10,
            magieschule: "zerstoerung",
            beschreibung: "Erzeugt eine etwa kopfgroße, gut sichtbare Blase aus Lava in der Luft vor dir, die sich sehr langsam in eine von dir definierte Richtung bewegt (etwa 1 Meter alle 10 Sekunden). Die Blase fliegt bis zu einem Zielpunkt, den du bestimmen kannst, den du aber im Moment des Zaubereinsatzes sehen musst, und zerplatzt dort. Berührt sie ein Hindernis oder Ziel, platzt sie stattdessen sofort. Die Blase fügt beim Platzen jedem Ziel in bis zu einem Meter Entfernung (ZK+5)W6 Schaden zu. Ein Ziel, das die Blase kommen sieht und sich bewegen kann, kann ihr mühelos und ohne eine PA-Probe ausweichen."
        },
        {
            id: "durchbruch",
            name: "Durchbruch",
            level: 3,
            mpKosten: 14,
            magieschule: "zerstoerung",
            beschreibung: "Schießt einen halbtransparenten Speer aus Mana in gerade Linie bis zu 200 Meter nach vorn. Der Speer penetriert absolut alles in seinem Weg, inklusive Stahlwände, magische Schilde und Rüstungen etc., und fügt jedem Ziel, das er durchbohrt, ZK W6 Schaden zu, der nicht verringert oder negiert werden kann, außer von Effekten, die Magie an sich negieren."
        },
        {
            id: "saeurenebel",
            name: "Säurenebel",
            level: 3,
            mpKosten: 14,
            magieschule: "zerstoerung",
            beschreibung: "Spuckt eine große Menge ätzenden Nebels aus deinem Mund aus in Blickrichtung, die vor dir eine bis zu 5x5x5 Meter große Wolke bildet. Gegenwind kann dazu führen, dass die Wolke direkt in dein Gesicht geweht wird! Ziele, die sich in dem Nebel befinden, nehmen jede Runde 4W6 Schaden, wenn ihre Lunge verätzt wird. Daraus resultierende Wunden können nur durch Magie geheilt werden. Dieser Zauber hält an, bis er verweht wird."
        },
        {
            id: "einaeschern",
            name: "Einäschern",
            level: 3,
            mpKosten: 60,
            magieschule: "zerstoerung",
            beschreibung: "Verwandelt sofort ein bis zu 50 Kilo schweres Objekt, das du mit einer Handfläche berührst, in Asche. Bei magischen Objekten musst du eine ZK-Probe mit Schwierigkeit 2 bestehen, bei ordinären Objekten funktioniert der Zauber immer. Hat keinerlei Effekt auf organisches Material!"
        },
        {
            id: "eisblitz",
            name: "Eisblitz",
            level: 3,
            mpKosten: 10,
            magieschule: "zerstoerung",
            beschreibung: "Schießt einen Strahl aus reiner Kälte auf ein Ziel in bis zu 10 Metern Entfernung. Das Ziel nimmt (ZK+1)W6 Schaden und wird für eine Runde eingefroren. Eingefroren: Das Ziel muss eine KÖ-Probe bestehen, um das Eis um sich herum zu brechen, sonst wird seine Runde übersprungen."
        },
        {
            id: "feuersphäre",
            name: "Feuerspähre",
            level: 2,
            mpKosten: 20,
            magieschule: "zerstoerung",
            beschreibung: "Umhülle dich selbst oder ein Ziel in Sichtweite mit einer Kugel aus Flammen. Die Sphäre bewegt sich mit dem Ziel mit, sodass das Ziel immer in ihrer Mitte bleibt. Jedes Ziel, das mit den Flammen in Kontakt kommt, nimmt 4W6 Schaden. Gegenstände, inklusive mancher Projektile (z.B. Pfeile), die mit dem Feuer in Kontakt kommen, fangen Feuer und werden (teilweise) zerstört. Die Sphäre hält bis zu eine Minute (12 Kampfrunden) an, du kannst sie aber vorzeitig „abschalten“. Die Sphäre kann außerdem durch andere Magie oder durch Wasser gelöscht werden."
        },
        {
            id: "feuerwand",
            name: "Feuerwand",
            level: 2,
            mpKosten: 12,
            magieschule: "zerstoerung",
            beschreibung: "Klatsche in die Hände und erschaffe bis zu einen Meter vor dir in Blickrichtung eine Wand aus reinem Feuer, die bis zu 15 Meter breit ist. Jedes Ziel, das die Wand berührt, nimmt 4W6 Schaden. Die Feuerwand bleibt bis zu eine Stunde bestehen, du kannst sie aber jederzeit ausschalten oder sie kann durch andere Zauber oder große Mengen Wasser gelöscht werden."
        },
        {
            id: "flammenfinger",
            name: "Flammenfinger",
            level: 1,
            mpKosten: 6,
            magieschule: "zerstoerung",
            beschreibung: "Du lädst deinen Finger mit Magie auf und lässt ihn mehrere 100 Grad heiß werden. Ein Ziel mit dem Finger zu berühren, fügt 2W6 Schaden zu. Durch die Hitze kannst du außerdem Gegenstände verbrennen oder schmelzen. Der Effekt hält für 5 Sekunden (eine Kampfrunde), du kannst aber jede Runde 3 weitere MP ausgeben, um den Effekt zu verlängern."
        },
        {
            id: "flammenpfeil",
            name: "Flammenpfeil",
            level: 1,
            mpKosten: 4,
            magieschule: "zerstoerung",
            beschreibung: "Schießt ein kleines Projektil aus Feuer auf ein Ziel in Sichtweite, das (ZK+1)W6 Schaden zufügt."
        },
        {
            id: "flammenvortex",
            name: "Flammenvortex",
            level: 5,
            mpKosten: 36,
            magieschule: "zerstoerung",
            beschreibung: "Erzeugt einen mächtigen Tornado aus Feuer vor dir, der sich mit zerstörerischer Gewalt in einer von dir bestimmten Bahn bewegt und dabei alles in seinem Weg erfasst, einäschert und durch die Gegend schleudert. Ziele, die mit dem Tornado in Kontakt kommen, nehmen 8W6 feuerelementaren Schaden und werden je nach ihrem Gewicht bis zu 200 Meter weit geschleudert, wobei sie beim Aufprall pro 50 Meter noch mal 2W6 Schaden nehmen. Der Tornado bleibt solange bestehen, wie du dich auf ihn konzentrierst und keine andere Aktion irgendeiner Art ausführst, oder bis du bewusstlos wirst. Wenn du eine Wunde nimmst, musst du eine Widerstand-Probe mit Schwierigkeit 2 bestehen oder der Tornado löst sich auf, da du die Konzentration nicht aufrechterhalten kannst. Während jeder deiner Runden kannst du den Tornado um bis zu 30 Meter in einer beliebigen Bahn bewegen, aber er hat einen großen Wendekreis. Jede Runde, die du den Tornado nach der ersten aufrechterhältst (alle 5 Sekunden) musst du 10 MP bezahlen. Wenn du das nicht kannst, verschwindet der Tornado. Dieser Zauber gilt als Tabu, weil er extrem auffällig ist und große Aufmerksamkeit von normalen Menschen auf sich (und auf dich) ziehen kann, nutze ihn mit Bedacht!"
        },
        {
            id: "finsterflamme",
            name: "Finsterflamme",
            level: 5,
            mpKosten: 80,
            magieschule: "zerstoerung",
            beschreibung: "Erzeugt schwarze Flammen in einem bis zu 1x1 Meter großen Bereich, den du komplett sehen können musst. Du kannst keine Flammen direkt an einem Lebewesen erscheinen Lassen. Die Flammen sind tief schwarz, geben kein Licht ab und sind in Dunkelheit nicht zu erkennen. Sie verbreiten sich relativ langsam, sind aber komplett unmöglich zu löschen, weder mit Wasser noch Magie. Sie können sich sogar auf Wasser ausbreiten. Die Flammen brennen für bis zu 24 Stunden, ehe ihnen das Mana ausgeht und sie einfach ersterben. Bei Kontakt setzen sie die Kleidung von Zielen in Flammen, aber niemals Haut oder andere lebende Masse. Jeder Kontakt mit den Flammen fügt pro Runde 4W6 Schaden zu. Sogar magische Schilde oder Rüstungen können in Brand gesetzt werden! Die Flammen erzeugen Rauch und Hitze wie normales Feuer, nur kein Licht."
        },
        {
            id: "himmelslaser",
            name: "Himmelslaser",
            level: 4,
            mpKosten: 26,
            magieschule: "zerstoerung",
            beschreibung: "Designiere einen 3x3 Meter großen Zielbereich und bereite diesen Zauber für eine Runde (5 Sekunden) vor. Zu Beginn deiner nächsten Runde (also nach den 5 Sekunden) bricht ein gewaltiger Energiestrahl mit 3 Metern Durchmesser aus dem Himmel gerade herunter auf den Zielbereich. In Innenräumen kommt der Laser durch die Decke gebrochen. Unterirdisch schlägt er stattdessen auf dem Boden über dir auf, er kann nicht mehrere Meter Erdboden durchbrechen. Ziele, die von dem Laser getroffen werden, nehmen (ZK+6)W6 Schaden. Bei Nacht wird dieser Schaden halbiert (abgerundet)."
        },
        {
            id: "hitzewelle",
            name: "Hitzewelle",
            level: 3,
            mpKosten: 16,
            magieschule: "zerstoerung",
            beschreibung: "Entfesslt eine Welle auf heißer, magisch aufgeladener Luft in alle Richtungen gleichzeitig. Die Luft schießt als mächtige Druckwelle bis zu 100 Meter weit. Ziele müssen eine KÖ-Probe bestehen, um nicht umgeworfen oder weggeweht zu werden. Jedes betroffene Ziel nimmt 2W6 Schaden durch die extreme Hitze."
        },
        {
            id: "kettenblitz",
            name: "Kettenblitz",
            level: 5,
            mpKosten: 30,
            magieschule: "zerstoerung",
            beschreibung: "Schießt einen Blitz auf ein Ziel, der (ZK+6)W6 Schaden verursacht. Der Blitz schlägt danach in das nächststehende Ziel ein und fügt diesem halb so viel Schaden zu (aufgerundet). Dieser Effekt wiederholt sich noch zweimal, wobei der Schaden jedes Mal halbiert wird (aufgerundet). Auf diesen Zauber kann man nicht reagieren und er trifft dasselbe Ziel nur einmal. Nur für das erste Ziel ist eine GENA-Probe nötig, die weiteren Ziele werden automatisch getroffen."
        },
        {
            id: "knallfrosch",
            name: "Knallfrosch",
            level: 1,
            mpKosten: 0,
            magieschule: "zerstoerung",
            beschreibung: "Speise eine beliebige Menge MP in einen Gegenstand, den du mit einer Hand transportieren kannst, ein. Das nächste Mal, wenn ein Lebewegen den Gegenstand berührt, nachdem du ihn losgelassen hast, wird das Mana schlagartig in einem lauten Knall und einer kleinen Explosion freigesetzt, die dem Berührenden halb so viel Schaden zufügt, wie MP eingespeist wurden (aufgerundet). Die Lautstärke skaliert mit der Anzahl MP."
        },
        {
            id: "knochenexplosion",
            name: "Knochenexplosion",
            level: 5,
            mpKosten: 100,
            magieschule: "zerstoerung",
            beschreibung: "Lässt einen Körperteil (einen Arm oder ein Bein) eines Ziels, das du berührst, detonieren. Reduziert die KP des Ziels sofort auf 1, fügt ihm 3 Wunden zu und gibt ihm entweder den Nachteil Einarmig oder Einbeinig."
        },
        {
            id: "laser",
            name: "Laser",
            level: 3,
            mpKosten: 18,
            magieschule: "zerstoerung",
            beschreibung: "Schießt einen Laser in einer geraden Linie, der allem in seinem Weg (ZK+2)W6 Schaden zufügt. Spiegelnde Oberflächen können den Laser umlenken. Auf diesen Zauber kann nicht reagiert werden."
        },
        {
            id: "lebensentzug",
            name: "Lebensentzug",
            level: 2,
            mpKosten: 10,
            magieschule: "zerstoerung",
            beschreibung: "Entzieht einem Ziel, das du mit deiner Handfläche berührst, 4W6 KP und heilt dich um denselben Betrag. Mit diesem Zauber KP zu heilen, entfernt außerdem Müdigkeit. Solange du alle 6 Stunden mindestens 20 KP stiehlst, musst du nicht schlafen (außer, um deine MP zu heilen)."
        },
        {
            id: "leichenexplosion",
            name: "Leichenexplosion",
            level: 1,
            mpKosten: 8,
            magieschule: "zerstoerung",
            beschreibung: "Lässt beliebig viele Leichen in Sichtweite detonieren. Die Kosten dieses Zaubers werden mit der Anzahl Leichen, die du detonieren lassen willst, multipliziert! Die Größen der Explosionen hängen von den Größen der Leichen ab. Jede einzelne Explosion richtet 4W6 Schaden an. Ein Ziel kann von mehreren dieser Explosionen gleichzeitig getroffen werden."
        },
        {
            id: "magischer pfeil",
            name: "Magischer Pfeil",
            level: 1,
            mpKosten: 4,
            magieschule: "zerstoerung",
            beschreibung: "Schießt ein simples kleines Magie-Projektil aus deiner Fingerspitze auf ein Ziel in Sichtweite ab. Das Projektil hat die Attribute von Wind, kann also durch jedes beliebige Objekt aufgehalten werden, und sieht aus wie ein buntes Flimmern in der Luft. Es fügt dem ersten Ziel, das es trifft, 3W6 Schaden zu."
        },
        {
            id: "mana-explosion",
            name: "Mana-Explosion",
            level: 5,
            mpKosten: 80,
            magieschule: "zerstoerung",
            beschreibung: "Lässt das Mana eines Ziels in Sichtweite explodieren. Das Ziel verliert 50% seiner aktuellen MP (aufgerundet) und nimmt dieselbe Menge an Schaden. Außerdem erzeugt der Zauber eine 2x2 Meter große Explosion mit dem Ziel im Zentrum. Andere Ziele in der Explosion nehmen denselben Schaden (verlieren aber keine MP). Hat nur einen Effekt auf Magier."
        },
        {
            id: "meteoritenschauer",
            name: "Meteoritenschauer",
            level: 4,
            mpKosten: 40,
            magieschule: "zerstoerung",
            beschreibung: "Lässt Felsen mit einem Meter Durchmesser über einem 5x5-Meter großen Zielgebiet herabregnen. Alle Ziele in dem Gebiet nehmen 2W6+1 mal 5W6 Schaden; das repräsentiert, wie viele Meteoriten das Ziel treffen. Wenn ein Ziel nicht auf diesen Zauber reagiert, kann es eine GL-Probe ablegen, um die Anzahl Meteoriten, die es treffen würden, zu halbieren (aufgerundet)."
        },
        {
            id: "schallwelle",
            name: "Schallwelle",
            level: 2,
            mpKosten: 10,
            magieschule: "zerstoerung",
            beschreibung: "Stößt eine extrem laute monodirektionale Schockwelle aus, die in bis zu 100 Metern Reichweite alles umwirft, Menschen durch die Gegend schleudert, was 1W6 bis 6W6 Schaden (abhängig von Distanz und Umgebung) zufügt und Fensterscheiben zerbrechen etc. kann. Anstatt zu versuchen auszuweichen, können Ziele versuchen, der Schockwelle zu widerstehen, indem sie eine KÖ-Probe ablegen. Dieser Zauber ist zwar monodirektional, aber in allen Richtungen sehr laut zu hören!"
        },
        {
            id: "seelenfresser",
            name: "Seelenfresser",
            level: 4,
            mpKosten: 16,
            magieschule: "zerstoerung",
            beschreibung: "Dieser Zauber muss sofort als Reaktion eingesetzt werden, wenn ein Ziel stirbt. Du absorbierst die Seele des Ziels, wodurch dieses unmöglich wiederzubeleben wird und sich deine aktuellen und maximalen KP und MP jeweils dauerhaft um 10 erhöhen. Nur Seelen von Magiern gewähren diesen Bonus."
        },
        {
            id: "sicherheitszone",
            name: "Sicherheitszone",
            level: 4,
            mpKosten: 20,
            magieschule: "zerstoerung",
            beschreibung: "Erzeugt eine bis zu 5x5 Meter große, unsichtbare Zone mit dir im Zentrum um dich herum. Jedes Ziel, das dir feindlich gesinnt ist und die Zone betritt, nimmt 10W6 Schaden und erleidet heftige Schmerzen. Ziele, die bereits in der Zone sind, wenn du sie errichtest, sind nicht betroffen. Die Zone hält beliebig lange, bis du sie verlässt. Du kannst nur eine Zone zur Zeit aktiv haben. Das Errichten der Zone erfordert ein 10 Minuten langes Ritual. Die Zone kann durch Magiewahrnehmung gespürt werden, ist sonst aber unsichtbar."
        },
        {
            id: "sprengfalle",
            name: "Sprengfalle",
            level: 3,
            mpKosten: 20,
            magieschule: "zerstoerung",
            beschreibung: "Platziert eine unsichtbare Sprengfalle, die aber mit Magiewahrnehmung gespürt werden kann. Du weißt immer, wo jede von dir platzierte Falle ist und kannst ihre Positionen vor deinem inneren Auge sehen wie ein Radar. Die Sprengfalle detoniert automatisch, wenn ein Lebewesen (inklusive ein Tier) sie berührt und fügt (2*ZK+2)W6 Schaden in einem 5x5 Meter großen Bereich zu. Du kannst beliebig viele Sprengfallen gleichzeitig aktiv haben. Sprengfallen können mit Magiedetektion wahrgenommen werden, aber nur, wenn man aktiv nach ihnen sucht. Sprengfallen können nur mit mindestens einem halben Meter Abstand zueinander platziert werden."
        },
        {
            id: "stiller dorn",
            name: "Stiller Dorn",
            level: 2,
            mpKosten: 10,
            magieschule: "zerstoerung",
            beschreibung: "Verschießt ein kleines, nahezu unsichtbares Projektil aus deiner Fingerspitze. Selbst, wenn man aktiv darauf achtet, muss man eine Probe auf Sinnesschärfe bestehen, um das Projektil wahrzunehmen. Das Projektil hat etwa die Geschwindigkeit und Durchschlagskraft eines Blasrohrpfeils und kann von nahezu jedem Hindernis (z.B. von Kleidung) gestoppt und wirkungslos gemacht werden. Kommt das Projektil mit Haut in Kontakt, dringt es in diese ein und verursacht ZK W6 Schaden durch innere Blutungen. Das Ziel merkt für 1W6 Minuten nicht, dass es überhaupt Schaden genommen hat, bevor plötzlich Schmerzen einsetzen. Nimmt das Ziel durch den Schaden eine Wunde, bemerkt es diese allerdings sofort."
        },
        {
            id: "todesfeuer",
            name: "Todesfeuer",
            level: 4,
            mpKosten: 10,
            magieschule: "zerstoerung",
            beschreibung: "Hüllt deine Hand für eine Kampfrunde (5 Sekunden) in grün-schwarze Flammen. Jedes Ziel, das von den Flammen berührt wird, nimmt 4W6 Schaden und hat seine maximalen KP um denselben Wert verringert. Fallen die maximalen KP auf 0, ist ein Ziel tot und kann nicht wiederbelebt werden."
        },
        {
            id: "tornado",
            name: "Tornado",
            level: 4,
            mpKosten: 24,
            magieschule: "zerstoerung",
            beschreibung: "Erzeugt einen mächtigen Tornado, der sich in einer von dir definierten Bahn bewegt und bis zu eine Stunde bestehen bleibt (oder bis er das Ende seiner definierten Route erreicht). Der Tornado kann Gebäude zerstören, schwere Gegenstände durch die Gegend werfen und fügt Zielen, die von ihm erfasst werden, variierenden Schaden zu. Base-Line: 2W6 Schaden dadurch, durch die Gegend geschleudert zu werden, dann zusätzlicher Schaden durch Kollidieren mit anderen Objekten oder Sturz aus großer Höhe. Pro 5 Meter 1W6. Den Tornado herbeizurufen dauert eine halbe Minute (6 Kampfrunden), und bis er sich formt, vergehen noch mal 10 Minuten. Dieser Zauber gilt als Tabu, weil er extrem auffällig ist und große Aufmerksamkeit von normalen Menschen auf sich (und auf dich) ziehen kann, nutze ihn mit Bedacht!"
        },
        {
            id: "wassertorpedo",
            name: "Wassertorpedo",
            level: 3,
            mpKosten: 10,
            magieschule: "zerstoerung",
            beschreibung: "Feuert ein etwa faustgroßes Wasserprojektil mit enormem Druck aus deiner Handfläche oder deinem Mund, das genug Durchschlagskraft hat, eine Stahlplatte zu durchbrechen. Wenn ein Ziel getroffen wird, nimmt es (ZK+2)W6 Schaden und muss eine KÖ-Probe bestehen oder erleidet eine Wunde in Form eines Knochenbruchs!"
        },
        {
            id: "zeitbombe",
            name: "Zeitbombe",
            level: 2,
            mpKosten: 10,
            magieschule: "zerstoerung",
            beschreibung: "Sprich eine 10 Sekunden (2 Kampfrunden) lange Formel, während du mit einer Hand einen Gegenstand berührst. Der Gegenstand darf maximal so groß sein, dass du ihn mit beiden Händen transportieren kannst. Während du die Formel sprichst, bestimmst du einen exakten Zeitpunkt. Sobald dieser Zeitpunkt erreicht ist, explodiert der Gegenstand plötzlich ohne Vorwarnung, was allen Zielen in bis zu einem Meter Entfernung (ZK+3)W6 Schaden zufügt. Die Explosion kommt so plötzlich, dass nicht auf sie reagiert werden kann."
        },
        {
            id: "attributsuebertragung",
            name: "Attributsübertragung",
            level: 1,
            mpKosten: 6,
            magieschule: "unterstuetzung",
            beschreibung: "Überträgt für eine Stunde einen einzelnen Attributspunkt von dir auf ein Ziel, das du berührst. Dein entsprechendes Attribut verringert sich um 1 und geht beim Ziel um 1 hoch. Kampfwerte sind nicht betroffen. Deine Attributspunkte können so nicht unter 1 gesenkt werden. Pro Punkt, den du übertragen willst, musst du noch mal die Kosten dieses Zaubers bezahlen und die Übertragung hält immer für eine Stunde und kann nicht vorzeitig beendet werden, außer, wenn das Ziel stirbt. Dann kehren alle Punkte zu dir zurück."
        },
        {
            id: "aufweckung",
            name: "Aufweckung",
            level: 1,
            mpKosten: 10,
            magieschule: "unterstuetzung",
            beschreibung: "Lässt ein bewusstloses Ziel sofort mit 1W6 KP wieder zu sich kommen. Heilt ausdrücklich keine Wunden. Überanstrengung kann zu langfristigen Schäden beim Ziel führen!"
        },
        {
            id: "aura der hoffnung",
            name: "Aura der Hoffnung",
            level: 4,
            mpKosten: 8,
            magieschule: "unterstuetzung",
            beschreibung: "Von dir geht für 1W6+1 Kampfrunden ein schwaches Leuchten aus, das alle verbündeten Ziele mit Hoffnung füllt. Die KP betroffener Ziele können nicht unter 1 fallen, solange sie nicht mehr als 10 Meter von dir entfernt sind (deine aber schon, wodurch der Effekt endet!)."
        },
        {
            id: "ausdauer",
            name: "Ausdauer",
            level: 2,
            mpKosten: 16,
            magieschule: "unterstuetzung",
            beschreibung: "Dieser Zauber hat nur einen Effekt, wenn er als Reaktion auf einen Angriff oder Zauber gewirkt wird, der dich trifft. Deine KP können durch den Angriff/Zauber nicht unter 1 fallen. Erfordert ab dem zweiten Einsatz binnen einer Stunde eine ZK-Probe, deren Schwierigkeit mit jedem weiteren Einsatz in einer Stunde um 1 hochgeht."
        },
        {
            id: "dornenpanzer",
            name: "Dornenpanzer",
            level: 2,
            mpKosten: 4,
            magieschule: "unterstuetzung",
            beschreibung: "Lässt stahlharte Stacheln aus deinem Körper hervorschnellen, die jedem Ziel, das dir zu nahe kommt, 2W6 Schaden zufügen. Die Stacheln halten bis zu 24 Stunden, sind aber deutlich sichtbar und unpraktisch (z.B. zerstören sie Kleidung). Du kannst sie jederzeit „einfahren“ und den Effekt dieses Zaubers so beenden. Du kannst diesen Zauber als Reaktion auf eine gegnerische Attacke nutzen."
        },
        {
            id: "elementarschutz",
            name: "Elementarschutz",
            level: 1,
            mpKosten: 10,
            magieschule: "unterstuetzung",
            beschreibung: "Wähle ein Element (Feuer, Elektrizität, Wind usw.). Zauber des gewählten Elements gegen dich oder ein designiertes Ziel, das du berührst, erhalten für eine Stunde einen automatischen Misserfolg. Ein Ziel kann immer nur gegen ein Element zur Zeit geschützt sein; diesen Zauber auf ein bereits geschütztes Ziel zu wirken, überschreibt den Schutz."
        },
        {
            id: "engelsflügel",
            name: "Engelsflügel",
            level: 3,
            mpKosten: 16,
            magieschule: "unterstuetzung",
            beschreibung: "Gibt einem Ziel, das du berührst, für bis zu eine Stunde große, weiße Engelsflügel. Die Flügel lassen das Ziel frei fliegen. Es kann maximal so schnell fliegen, wie es rennen kann, und dabei bis zu 50% seines Körpergewichts zusätzlich tragen. Du kannst die Flügel jederzeit verschwinden lassen. Sie sind wunderschön, aber extrem auffällig."
        },
        {
            id: "fernsteuerung",
            name: "Fernsteuerung",
            level: 1,
            mpKosten: 12,
            magieschule: "unterstuetzung",
            beschreibung: "Erlaubt es dir, für bis zu 10 Minuten ein abgetrenntes Körperteil, das du sehen kannst, zu kontrollieren, als wäre es Teil deines Körpers. Das Körperteil muss nicht zu deinem Körper gehören. Teile deines Körpers kannst du so auch kontrollieren, ohne sie zu sehen. Du kannst auch Körperteile kontrollieren, die schon lange Zeit tot und skelettiert sind und auch mehrere auf einmal, musst dann aber pro Körperteil die Kosten dieses Zaubers bezahlen. Indem du die zehnfachen Kosten dieses Zaubers bezahlst, kannst du ein passendes Körperteil an ein Ziel, dem ein solches fehlt, 'anzaubern' (z.B. eine beliebige Hand an jemanden, dem eine Hand fehlt). Das Ziel kann seinen neuen Körperteil dann sofort benutzen, als hätte er schon immer zu seinem Körper gehört. Dies funktioniert nur mit 'frischen' Körperteilen, die maximal eine Stunde von ihrem Besitzer getrennt sind."
        },
        {
            id: "grosse heilung",
            name: "Große Heilung",
            level: 3,
            mpKosten: 20,
            magieschule: "unterstuetzung",
            beschreibung: "Heilt beliebig viele Ziele in Sichtweite und dich selbst für ZK W6 KP. Ziele, die du berührst, und du selbst erhalten 4W6 zusätzliche Heilung."
        },
        {
            id: "fassade",
            name: "Fassade",
            level: 4,
            mpKosten: 4,
            magieschule: "unterstuetzung",
            beschreibung: "Verändert dein eigenes Gesicht oder das von jemandem, den du berührst, beliebig. Du kannst so das Gesicht von jemand anderem kopieren oder einfach ein extrem attraktives, furchteinflößendes, hässliches usw. Gesicht erstellen. Die Veränderungen beginnen nach einer Stunde, sich zurückzubilden. Nach 90 Minuten sind die Veränderungen komplett rückgängig gemacht."
        },
        {
            id: "goettliche intervention",
            name: "Göttliche Intervention",
            level: 5,
            mpKosten: 10,
            magieschule: "unterstuetzung",
            beschreibung: "Wiederhole sofort eine Würfelprobe oder zwinge ein Ziel, eine Würfelprobe zu wiederholen. Du kannst diesen Zauber im Kampf als Reaktion einsetzen. Eine Probe kann so nur einmal wiederholt werden und das neue Ergebnis gilt endgültig."
        },
        {
            id: "hast",
            name: "Hast",
            level: 2,
            mpKosten: 6,
            magieschule: "unterstuetzung",
            beschreibung: "Verdoppelt für eine Stunde den BW-Wert und die INIT von dir oder einem Ziel, das du berührst."
        },
        {
            id: "heilende melodie",
            name: "Heilende Melodie",
            level: 2,
            mpKosten: 30,
            magieschule: "unterstuetzung",
            beschreibung: "Singe eine kurze Melodie oder Spiele sie auf einem Instrument. Jeder, der die Melodie hört, wird für 2xMA W6 KP geheilt."
        },
        {
            id: "heiligenschein",
            name: "Heiligenschein",
            level: 2,
            mpKosten: 10,
            magieschule: "unterstuetzung",
            beschreibung: "Erschafft einen Heiligenschein über einem Ziel, der für bis zu 8 Stunden bestehen bleibt. Der Heiligenschein ist für jeden gut sichtbar! Ein Ziel mit einem Heiligenschein erleidet keine Wunden, es wird aber trotzdem sofort bewusstlos, wenn seine KP auf 0 fallen. Wenn ein Ziel bewusstlos wird, verschwindet sein Heiligenschein."
        },
        {
            id: "heilquelle",
            name: "Heilquelle",
            level: 3,
            mpKosten: 20,
            magieschule: "unterstuetzung",
            beschreibung: "Segnet einen bis zu 10 Liter umfassenden Körper Wasser. Einen Liter dieses Wassers zu trinken, regeneriert 4W6 KP. Beachte, dass das Wasser dadurch aber weder desinfiziert, noch in Süßwasser verwandelt wird; einen Liter heilendes Salzwasser zu trinken ist immer noch ziemlich unbekömmlich."
        },
        {
            id: "heiltotem",
            name: "Heiltotem",
            level: 4,
            mpKosten: 10,
            magieschule: "unterstuetzung",
            beschreibung: "Führe ein einstündiges Ritual durch, bei dem du einen Gegenstand mit heilender Magie auflädst. Jedes Ziel, das den Gegenstand direkt berührt, wird alle 5 Sekunden um 1W6 KP geheilt. Der Gegenstand bleibt für 24 Stunden verzaubert."
        },
        {
            id: "heilung",
            name: "Heilung",
            level: 1,
            mpKosten: 16,
            magieschule: "unterstuetzung",
            beschreibung: "Heilt ein Ziel in Sichtweite für ZK W6 KP. Wenn du das Ziel berührst, heile 4W6 zusätzliche KP."
        },
        {
            id: "himmlische ruestung",
            name: "Himmlische Rüstung",
            level: 1,
            mpKosten: 16,
            magieschule: "unterstuetzung",
            beschreibung: "Hüllt ein Ziel für bis zu eine Stunde in eine halbtransparente, schimmernde Rüstung aus gehärtetem Licht, die allen eingehenden Schaden um 5W6 verringert (auf ein Minimum von 1), aber zerstört wird, wenn sie so einen magischen Angriff schwächt. Die Rüstung erzeugt keinerlei Geräusche und fühlt sich an wie Eisen, kann aber mit genug Kraft durchdrungen werden. Sie schwächt Angriffe nur ab. Ein Ziel kann nur eine Himmlische Rüstung zur Zeit tragen."
        },
        {
            id: "kampflied",
            name: "Kampflied",
            level: 3,
            mpKosten: 30,
            magieschule: "unterstuetzung",
            beschreibung: "Beginne, ein mitreißendes Lied zu singen, das mit Mana aufgeladen ist. Jedes verbündete Ziel, das das Lied hört, darf sowohl GENA-Proben, als auch Schaden durch eigene Angriffe und Zauber zweimal würfeln und das bessere Ergebnis nehmen. Je länger du das Lied am Stück singst, desto mehr Effekte bekommt es: Nach einer Runde (5 Sekunden) wird die Mentalität aller Verbündeten gestählt, was sie immun gegen alle Effekte macht, die sie kontrollieren, verängstigen usw. würden. Nach zwei Runden (10 Sekunden) werden gegnerische Ziele eingeschüchtert und müssen Reaktionen zweimal würfeln, wobei das schlechtere Ergebnis zählt. Nach drei Runden (15 Sekunden) wird aller Schaden, den verbündete Ziele im Nahkampf anrichten, um 3W6 erhöht. Nach vier Runden (20 Sekunden) heilen sich alle verbündeten Ziele um die Hälfte allen Schadens, den sie im Nahkampf anrichten (aufgerundet). Wenn du aufhörst, das Lied zu singen, enden sofort alle Effekte. Du kannst dich, während du singst, bewegen und ausweichen, aber sonst nichts anderes tun, ohne die Konzentration auf das Lied zu verlieren."
        },
        {
            id: "koboldgklueck",
            name: "Koboldglück",
            level: 2,
            mpKosten: 10,
            magieschule: "unterstuetzung",
            beschreibung: "Ein Ziel, das du berührst, würfelt die nächsten drei Proben, die es innerhalb einer Stunde würfelt, mit zwei Würfeln, wobei das bessere Ergebnis zählt."
        },
        {
            id: "krisenschild",
            name: "Krisenschild",
            level: 3,
            mpKosten: 40,
            magieschule: "unterstuetzung",
            beschreibung: "Belegt ein Ziel mit einem Schild-Zauber, der sich automatisch aktiviert, wenn seine KP auf 0 fallen würden. Der Schild aktiviert sich dann und absorbiert allen Schaden, der das Ziel unter 1 KP bringen würde und heilt seine KP anschließend um 2xZK W6. Ein Ziel kann nur mit einem Krisenschild belegt sein. Der Schild verschwindet automatisch nach 24 Stunden, wenn er nicht aktiviert wurde."
        },
        {
            id: "mana-brunnen",
            name: "Mana-Brunnen",
            level: 5,
            mpKosten: 0,
            magieschule: "unterstuetzung",
            beschreibung: "Gehe für einen Moment in dich, stelle eine Verbindung zum Mana in der Welt um dich herum her, und erneuere dein Mana sofort vollständig. Du kannst diesen Zauber nur einmal am Tag wirken."
        },
        {
            id: "mana-spende",
            name: "Mana-Spende",
            level: 1,
            mpKosten: 0,
            magieschule: "unterstuetzung",
            beschreibung: "Gib eine beliebige Menge Mana an ein Ziel ab, das du berührst. Du bezahlst eine beliebige Menge Mana und das Ziel erhält dieselbe Menge Mana."
        },
        {
            id: "maertyrer",
            name: "Märtyrer",
            level: 3,
            mpKosten: 10,
            magieschule: "unterstuetzung",
            beschreibung: "Berühre ein Ziel. Für bis zu eine Stunde wird jeder Schaden, den das Ziel nehmen würde, stattdessen auf dich übertragen. Du kannst diesen Effekt jederzeit beenden. Wenn du bewusstlos wirst, endet dieser Effekt automatisch."
        },
        {
            id: "energieschild",
            name: "Energieschild",
            level: 2,
            mpKosten: 12,
            magieschule: "unterstuetzung",
            beschreibung: "Erschafft einen Schild aus reiner Energie um das Ziel. Der Schild absorbiert bis zu (ZK*5) Schadenspunkte, bevor er zerbricht. Hält maximal für 10 Minuten oder bis er zerstört wird."
        },
        {
            id: "mana-reservoir",
            name: "Mana-Reservoir",
            level: 3,
            mpKosten: 100,
            magieschule: "unterstuetzung",
            beschreibung: "Bündelt dein Mana in einer kleinen Menge Wasser (etwa 100 Milliliter) und erschafft daraus einen neuen Manatrank. Du erhältst einen Manatrank. Du kannst diesen Zauber nur maximal dreimal am Tag wirken."
        },
        {
            id: "meditation",
            name: "Meditation",
            level: 1,
            mpKosten: 10,
            magieschule: "unterstuetzung",
            beschreibung: "Du verfällst für 10 Minuten in eine tiefe, komaartige Meditation, aus der du unmöglich geweckt werden kannst (selbst wenn du schweren physischen Schaden nimmst). Wenn du nach 10 Minuten wieder aufwachst, sind deine KP vollständig geheilt."
        },
        {
            id: "phantomklinge",
            name: "Phantomklinge",
            level: 1,
            mpKosten: 30,
            magieschule: "unterstuetzung",
            beschreibung: "Verzaubert dauerhaft die Klinge einer Waffe (Schwert, Messer, Axt...). Die verzauberte Waffe erhält die Eigenschaft, meherere Zentimeter tief durch nicht-organische Materie schneiden zu können, ohne diese zu berühren (also durch die Materie zu phasen). Die Waffe ignoriert alle Formen von Rüstung inklusive magischen Schilden. Dieser Effekt hält an, bis die Verzauberung irgendwie magisch gebrochen wird."
        },
        {
            id: "phasenschritt",
            name: "Phasenschritt",
            level: 4,
            mpKosten: 20,
            magieschule: "unterstuetzung",
            beschreibung: "Erlaubt es dir oder einem Ziel, das du berührst, sich für bis zu eine Minute (12 Runden) durch feste Materie zu bewegen wie ein Geist. Wenn ein Ziel nach Ablauf dieser Zeit noch teilweise in fester Materie steckt, können katastrophale Effekte eintreten! In diesem Zustand ist ein Ziel komplett immun gegen physische Angriffe und Projektile, aber nicht gegen Magie, Feuer etc."
        },
        {
            id: "phoenix aus der asche",
            name: "Phönix aus der Asche",
            level: 5,
            mpKosten: 80,
            magieschule: "unterstuetzung",
            beschreibung: "Nutze diesen Zauber als Reaktion, wenn du oder ein Ziel, das du sehen kannst, bewusstlos werden oder sterben würde. Das Ziel geht sofort in heilige Flammen auf, die es komplett konsumieren. Sobald der Körper des Ziels zu Asche verbrannt ist, formt sich die Asche neu und ein perfekter neuer Körper erscheint für das Ziel. Das Ziel kommt wieder zu sich, hat keine Wunden mehr und volle KP, dafür aber keine MP. Diese muss der neue Körper erst in einer Nacht Schlaf generieren. Der neue Körper fühlt sich unfassbar gut an, man fühlt sich buchstäblich wie neu geboren. Wird dieser Zauber auf ein Ziel angewendet, das an einer tödlichen Krankheit leidet, hat der neue Körper leider dieselbe Krankheit. Ein Ziel, das kurz davor ist, an Altersschwäche zu sterben, erhält 1 volles zusätzliches Lebensjahr, da der neue Körper sich verjüngt. Der Neuformungsprozess des Körpers dauert etwa 30 Sekunden."
        },
        {
            id: "reflexverstaerker",
            name: "Reflexverstärker",
            level: 2,
            mpKosten: 30,
            magieschule: "unterstuetzung",
            beschreibung: "Du oder ein Ziel, das du berührst, erhält für eine Minute (12 Kampfrunden) übermenschliche Reflexe. In diesem Zustand kann das Ziel jede Runde eine zusätzliche Reaktion ausführen. Es kann auch mehrere Reaktionen nutzen, um einem einzigen Angriff oder Zauber auszuweichen, muss aber vor der ersten Probe ansagen, wie viele Reaktionen es nutzen will."
        },
        {
            id: "regeneration",
            name: "Regeneration",
            level: 4,
            mpKosten: 20,
            magieschule: "unterstuetzung",
            beschreibung: "Stellt ein fehlendes Körperteil an einem Ziel, das du berührst, wieder her. Der Regenerationsprozess dauert eine Stunde und ist für das Ziel extrem schmerzhaft. So können z.B. fehlende Arme und Beine vollständig wiederhergestellt werden. Kann nicht von Magiern gewählt werden, die oder deren Team-Mitglieder den Nachteil Einarmig/Einbeinig gewählt haben!"
        },
        {
            id: "reinigung",
            name: "Reinigung",
            level: 1,
            mpKosten: 4,
            magieschule: "unterstuetzung",
            beschreibung: "Entfernt beliebig viele negative Effekte von einem Ziel, das du berührst. Effekte wie Flüche, die durch besonders mächtige Zauber ausgelöst werden, können diesem Zauber widerstehen!"
        },
        {
            id: "reparieren",
            name: "Reparieren",
            level: 1,
            mpKosten: 8,
            magieschule: "unterstuetzung",
            beschreibung: "Setzt einen zerstörten Gegenstand wieder zusammen. Selbst komplexe mechanische oder elektrische Gegenstände können problemlos repariert werden, solange alle Einzelteile vorhanden sind."
        },
        {
            id: "riesenwuchs",
            name: "Riesenwuchs",
            level: 4,
            mpKosten: 14,
            magieschule: "unterstuetzung",
            beschreibung: "Lässt ein Ziel, das du berührst, schlagartig enorm wachsen. Das Ziel kann so bis zu das Fünffache seiner normalen Körpergröße erreichen und entsprechende Leistungen erbringen (z.B. riesige Felsen bewegen, Bäume ausreißen...). Der KÖ-Wert des Ziels wird um denselben Faktor multipliziert. Schaden, den das Ziel mit physischen Nahkampfangriffen anrichtet, wird pro Vielfachem seiner Größe um 2W6 erhöht (also maximal +10W6). Die erhöhte Körpergröße ist extrem anstrengend für den Körper des Ziels und fügt ihm nach jeder Runde (alle 5 Sekunden) 2W6 Schaden zu. Solange du ein Ziel vergrößerst, musst du dich auf die Aufrechterhaltung des Zaubers konzentrieren und kannst nichts anderes tun. Immer, wenn du Schaden nimmst, musst du eine Widerstand-Probe bestehen, oder der Effekt dieses Zaubers endet."
        },
        {
            id: "schild",
            name: "Schild",
            level: 2,
            mpKosten: 18,
            magieschule: "unterstuetzung",
            beschreibung: "Gibt einem Ziel, das du berührst, einen Schild, der 10xZK KP hat. Schaden, den das Ziel nehmen würde, wird stattdessen vom Schild abgezogen. Der Schild ist komplett unsichtbar, kann aber durch Magiewahrnehmung wahrgenommen werden. Ein Ziel kann nur einen Schild zur Zeit haben. Der Schild hält bis zu eine Stunde."
        },
        {
            id: "schutzengel",
            name: "Schutzengel",
            level: 5,
            mpKosten: 60,
            magieschule: "unterstuetzung",
            beschreibung: "Gibt einem Ziel einen Schutzengel. Dieser ist als ein schwaches Leuchten sichtbar, das von dem Ziel ausgeht, das aber nur wahrnehmen kann, wer sich mit Magie auskennt. Wenn ein Ziel mit einem Schutzengel sterben würde, verschwindet das Leuchten und der Schutzengel rettet das Ziel, wodurch seine KP vollständig geheilt und alle Wunden von ihm entfernt werden. Wenn das Ziel bewusstlos war, kommt es außerdem wieder zu Bewusstsein. Einen Schutzengel zu rufen, erfordert ein einstündiges Ritual mit vielen Gebeten und Bitten. Ein Ziel kann nur einen Schutzengel zur Zeit haben, du kannst aber mehreren Zielen Schutzengel geben. Für jeden Schutzengel, den du „aktiv“ hast, sind deine maximales MP um die Kosten dieses Zaubers reduziert."
        },
        {
            id: "segen",
            name: "Segen",
            level: 1,
            mpKosten: 2,
            magieschule: "unterstuetzung",
            beschreibung: "Segnet ein Ziel für eine Stunde. Gesegnete Ziele richten 3W6 zusätzlichen Schaden mit physischen Angriffen an. Wenn ein Ziel eine (nach Ermessen des Spielleiters) „böse“ Aktion tätigen, verfällt der Segen und das Ziel kann für 24 Stunden nicht mehr von Segen betroffen werden."
        },
        {
            id: "sinnesexplosion",
            name: "Sinnesexplosion",
            level: 4,
            mpKosten: 10,
            magieschule: "unterstuetzung",
            beschreibung: "Verstärkt für bis zu eine Minute (12 Runden) einen Sinn von dir oder einem Ziel, das du berührst, immens. Mit Sicht kann das Ziel etliche Kilometer weit sehen, mit Gehör Geräusche aus großer Entfernung klar wahrnehmen, mit Geruch Blut im Wasser riechen wie ein Hai usw. Proben auf Sinnesschärfe mit dem entsprechenden Organ erhalten +2 automatische Erfolge. Extreme Sinneseindrücke (z.B. eine nahe Explosion bei verstärktem Gehör) können zu Panik und Schaden an den Sinnesorganen führen. Schlechtestenfalls muss das Ziel eine Widerstand-Probe bestehen oder wird bewusstlos."
        },
        {
            id: "spektralarme",
            name: "Spektralarme",
            level: 3,
            mpKosten: 16,
            magieschule: "unterstuetzung",
            beschreibung: "Gibt einem Ziel, das du berührst, für bis zu eine Stunde zwei zusätzliche magische Arme. Die Arme sind halbtransparent und wachsen aus den Schultern des Ziels. Ein Ziel weiß automatisch, wie es die Arme steuern kann, und kann sie genauso geschickt benutzen wie seine normalen Arme. Ein Ziel mit Spektralarmen kann, wenn es während seiner Runde im Kampf mit bloßen Händen oder Nahkampfwaffen angreift, sofort ein zweites Mal angreifen, allerdings nur einmal pro Waffe (die Spektralarme brauchen eine eigene Waffe oder greifen nur unbewaffnet an). Du kannst die Arme jederzeit vorzeitig verschwinden lassen. Ein Ziel kann nur ein Set Spektralarme haben."
        },
        {
            id: "spiegeltrick",
            name: "Spiegeltrick",
            level: 3,
            mpKosten: 28,
            magieschule: "unterstuetzung",
            beschreibung: "Erschafft 1W4+1 perfekte Ebenbilder von dir selbst, die automatisch jede Bewegung ausführen, die du ausführst. Die Ebenbilder sind rein visuell, sie machen weder Geräusche noch können sie physisch mit Dingen oder Lebewesen interagieren. Wenn du deine Augen schließt und dich darauf konzentrierst, kann du eines deiner Ebenbilder gezielt steuern, ohne dass dein eigentlicher Körper oder die anderen Ebenbilder sich bewegen würden. Die Ebenbilder halten für bis zu eine Stunde, verschwinden aber sofort, wenn sie irgendwelchen Schaden nehmen. Wenn ein Ziel versucht, dich anzugreifen, muss es eine GL-Probe bestehen, um deinen eigentlichen Körper zu treffen; anderenfalls greift er ein Ebenbild an und zerstört so dieses. Angriffe/Zauber mit Flächenwirkung können diesen Effekt ignorieren, indem sie alle Ebenbilder und den Hauptkörper gleichzeitig treffen."
        },
        {
            id: "steinhaut",
            name: "Steinhaut",
            level: 1,
            mpKosten: 6,
            magieschule: "unterstuetzung",
            beschreibung: "Hüllt dich oder ein Ziel, das du berührst, in eine dünne Schicht aus Fels. Die Steinhaut schränkt die Bewegungen des Ziels ein, wodurch ihr BW-Wert und ihre INIT halbiert werden (aufgerundet). Außerdem ist sie schwer, was Dinge wie schwimmen und schleichen unmöglich macht. Andererseits verringert sie allen eingehenden physischen Schaden um 4W6, auf ein Minimum von 1. Die Steinhaut hält bis zu eine Stunde. Du kannst den Effekt jederzeit vorzeitig beenden und das Ziel kann jederzeit eine KÖ-Probe versuchen, um die Steinhaut von innen „aufzubrechen“ und sich so zu befreien."
        },
        {
            id: "turbo-schub",
            name: "Turbo-Schub",
            level: 3,
            mpKosten: 16,
            magieschule: "unterstuetzung",
            beschreibung: "Lässt dich oder ein Ziel, das du berührst, sich sofort mit Schallgeschwindigkeit bewegen. Kann als Reaktion genutzt werden, um einem Angriff oder Zauber automatisch auszuweichen. Der Effekt hält 5 Sekunden. Du kannst deine Reaktion in der ersten Runde eines Kampfes einsetzen, um diesen Zauber zu verwenden und garantiert als erstes dran zu sein."
        },
        {
            id: "verankerung",
            name: "Verankerung",
            level: 1,
            mpKosten: 8,
            magieschule: "unterstuetzung",
            beschreibung: "Verbindet dich oder ein williges Ziel, das du berührst, über eine kurze Kette aus Mana fest mit entweder dem Boden oder einem Objekt. Die Kette hat die Stärke von Stahl und ist nahezu immun gegen andere Zauber. Sie verhindert, dass das Ziel und das Objekt, an das es gebunden wurde, sich weiter als 25 Zentimeter von einander entfernen und kann ein Ziel gegen Bewegungseffekte wie Stürme schützen."
        },
        {
            id: "verschwommenheit",
            name: "Verschwommenheit",
            level: 1,
            mpKosten: 10,
            magieschule: "unterstuetzung",
            beschreibung: "Verzerrt die Konturen und das Aussehen eines Ziels für eine Minute (12 Kampfrunden) und lässt es seltsam verschwommen wirken. Der Effekt wird stärker von je weiter weg man das Ziel betrachtet. Der Genauigkeit-Wert jedes Ziels, das versucht, das verschwommene Ziel aus der Ferne anzugreifen, wird pro 2 Meter um 1 verringert, auf ein Minimum von 1."
        },
        {
            id: "vorsehung",
            name: "Vorsehung",
            level: 4,
            mpKosten: 26,
            magieschule: "unterstuetzung",
            beschreibung: "Du oder ein Ziel, das du siehst, sieht die nächsten 1W6 mal voraus, die es Schaden erleiden würde. Falls das physisch möglich ist, bewegt sich sein Körper von allein, um dem Schaden auszuweichen oder ihn zu minimieren. Solange möglich, weicht es automatisch, ohne Notwendigkeit einer Probe, aus und nimmt von diesen Schadensquellen keinen Schaden."
        },
        {
            id: "wiedergeburt",
            name: "Wiedergeburt",
            level: 5,
            mpKosten: 50,
            magieschule: "unterstuetzung",
            beschreibung: "Belebt ein Ziel, dessen Leiche du berührst und das noch nicht länger als drei Stunden tot ist, wieder. Es wird vollständig geheilt und kommt ohne Wunden und mit vollen KP zurück. Fehlende Körperteile werden so nicht automatisch wiederhergestellt und magische Flüche nicht aufgehoben. Das Ziel hat keinerlei Erinnerungen an irgendetwas nach dem Moment seines Todes."
        },
        {
            id: "wunden heilen",
            name: "Wunden heilen",
            level: 3,
            mpKosten: 16,
            magieschule: "unterstuetzung",
            beschreibung: "Heilt beliebig viele Wunden eines Ziels. Die Kosten dieses Zaubers sind mit der Anzahl Wunden multipliziert."
        },
        {
            id: "altern",
            name: "Altern",
            level: 4,
            mpKosten: 20,
            magieschule: "verfall",
            beschreibung: "Lässt ein Ziel, das du berührst, rapide altern. Pro Minute, die du das Ziel ohne Unterbrechung berührst, altert es um ein ganzes Jahr. Dieser Effekt hält permanent. Das Ziel kann durch diesen Effekt unwiederbringlich an Altersschwäche sterben. Dieser Zauber gilt als großes Tabu und darf offiziell weder gelehrt noch praktiziert werden. Ein schlafendes Ziel wacht nach der ersten Minute/dem ersten verlorenen Jahr automatisch auf."
        },
        {
            id: "anti-magische zone",
            name: "Anti-Magische Zone",
            level: 4,
            mpKosten: 30,
            magieschule: "verfall",
            beschreibung: "Vollführe ein einstündiges Ritual und erzeuge eine 25x25 Meter große Zone um dich herum, in der alle andere Magie negiert wird. Zauber, die die Zone betreten, lösen sich zu nichts auf. Zauber, die bereits in der Zone vorhanden sind (z.B. magische Runen) lösen sich ebenfalls auf. Die Zone bleibt solange bestehen, bis du sie verlässt. Innerhalb der Zone existiert kein Mana und MP können nicht regeneriert werden."
        },
        {
            id: "boeser blick",
            name: "Böser Blick",
            level: 1,
            mpKosten: 10,
            magieschule: "verfall",
            beschreibung: "Schaue einem Ziel in die Augen und fülle es mit übernatürlicher Angst. Würfle Einschüchtern statt GENA für diesen Zauber. Das Ziel kann sich für bis zu 1W6 Runden, oder bis der Augenkontakt abbricht, nicht bewegen, kann aber sprechen und Zauber wirken!"
        },
        {
            id: "brunnengift",
            name: "Brunnengift",
            level: 2,
            mpKosten: 20,
            magieschule: "verfall",
            beschreibung: "Vergiftet einen Körper von bis zu 10 Litern Wasser. Wer auch nur einen Schluck des Wassers zu sich nimmt, wird vergiftet und erleidet jede Runde (alle 5 Sekunden) 1W6 Schaden, bis er bewusstlos wird. Unbehandelt wirkt das Gift nach 48 Stunden tödlich. Das Gift ist komplett geschmacklos und muss mit Medizin oder Magie geheilt werden, sonst hält es für immer."
        },
        {
            id: "dornenfeld",
            name: "Dornenfeld",
            level: 1,
            mpKosten: 10,
            magieschule: "verfall",
            beschreibung: "Lässt in einem bis zu 10x10 Meter großen Gebiet, das du vollständig sehen kannst, dicke, dornige Wurzeln und Äste sprießen. Jedes Ziel, das sich durch das Gebiet bewegen will, muss eine Akrobatik-Probe bestehen oder nimmt jede Runde (alle 5 Sekunden) 2W6 Schaden durch die spitzen Dornen. Ziele in dem Feld sind außerdem in ihren Bewegungen eingeschränkt, ihre BW und INIT sind halbiert (aufgerundet) und PA-Proben werden zweimal gewürfelt, wobei das schlechtere Ergebnis zählt. Ausreichende Rüstung an den Beinen (mehrere Lagen normaler Hosen reichen schon) negiert den Schaden, aber nicht die eingeschränkte Beweglichkeit. Das Feld bleibt bestehen, bis es irgendwie zerstört wird, kann aber leicht abgebrannt oder mit genug Zeit abgeholzt werden."
        },
        {
            id: "fallrune",
            name: "Fallrune",
            level: 3,
            mpKosten: 18,
            magieschule: "verfall",
            beschreibung: "Platziert eine Fallrune, die aussieht wie ein einfaches, mit einem Stift geschriebenes Symbol in einer unbekannten Sprache. Du weißt immer, wo jede von dir platzierte Rune ist und kannst ihre Positionen vor deinem inneren Auge sehen. Wenn ein Lebewesen (inklusive ein Tier) eine Fallrune berührt, löst sie aus, was die Rune verbraucht und ein 10 Meter tiefes Loch mit einem Meter Durchmesser unter der Rune erschafft. Die Wände sind komplett glatt, was Klettern aus dem Loch sehr schwer macht. Hineinzufallen fügt 2W6 Schaden zu. Wenn ein Ziel eine Fallrune auslöst, erscheint direkt unter ihm das Loch, es kann aber mit einer Springen-Probe mit Schwierigkeit 2 aus dem Weg springen und dem Sturz entgehen. Du kannst beliebig viele Fallrunen gleichzeitig aktiv haben. Fallrunen können mit Magiedetektion wahrgenommen werden, aber nur, wenn man aktiv nach ihnen sucht."
        },
        {
            id: "finsternis",
            name: "Finsternis",
            level: 2,
            mpKosten: 10,
            magieschule: "verfall",
            beschreibung: "Absorbiert alles Licht (künstlich und natürlich) in einem bis zu 25x25 Meter großen Bereich mit dir im Zentrum. Um dich herum entsteht komplette Finsternis, in der niemand (selbst mit Nachtsicht) etwas erkennen kann. GENA-Proben haben in der Finsternis die dreifache Schwierigkeit. Du kannst die Finsternis jederzeit schlagartig beenden. Wenn sie von hellem Licht abgelöst wird (z.B. an einem hellen Tag), werden betroffene Ziele, außer dir selbst, für eine Runde geblendet und haben ihre GENA-Proben weiterhin erschwert.  Du musst pro Minute, die du die Finsternis aufrecht erhältst, die Kosten dieses Zaubers bezahlen."
        },
        {
            id: "fluch",
            name: "Fluch",
            level: 1,
            mpKosten: 10,
            magieschule: "verfall",
            beschreibung: "Belegt ein Ziel, das du sehen kannst, mit einem von drei möglichen Flüchen. Ein Ziel kann immer nur von einem Fluch betroffen sein und du kannst frei wählen, welchen Fluch du sprechen willst. Der Fluch erfordert eine fünfminütige, mindestens flüsternd ausgesprochene Formel. Du musst das Ziel während der 5 Minuten durchgehend sehen können. Der Fluch hat keine Zeitbegrenzung, es gibt aber viele Möglichkeiten, ihn zu heilen (z.B. Weihwasser oder Segnungen von Priestern). Fluch der Schwäche: Immer, wenn das Ziel Schaden würfeln würde, würfelt es 1W6 weniger Schaden. Schaden kann nicht unter 1W6 fallen. Fluch der Langsamkeit: Der INIT-Wert des Ziels ist halbiert und es muss PA-Proben zweimal würfeln, wobei das schlechtere Ergebnis zählt. Fluch des Manas: MP-Kosten für Zauber des Ziels sind um das Doppelte des Levels des Zaubers erhöht (ein Zauber mit Level 5 würde also 10 MP mehr kosten als normal)."
        },
        {
            id: "frostrune",
            name: "Frostrune",
            level: 3,
            mpKosten: 20,
            magieschule: "verfall",
            beschreibung: "Platziert eine Frostrune, die aussieht wie ein einfaches, mit einem Stift geschriebenes Symbol in einer unbekannten Sprache. Du weißt immer, wo jede von dir platzierte Rune ist und kannst ihre Positionen vor deinem inneren Auge sehen. Wenn ein Lebewesen (inklusive ein Tier) eine Frostrune berührt, „detoniert“ sie, was die Rune verbraucht, und schließt das Ziel in einen dicken Eisblock ein. Ein so eingefrorenes Ziel kann sofort eine KÖ-Probe mit Schwierigkeit 3 ablegen, um aus dem Eis auszubrechen. Anderenfalls kann es die Probe jede Stunde wiederholen, wobei die Probe jede Stunde um 1 einfacher wird. Der Eisblock wird, wenn du mit Angriffen oder Zaubern getroffen wirst, beschädigt, was dir einen weiteren Versuch, auszubrechen, gestattet und die Schwierigkeit verringert. Du kannst beliebig viele Frostrunen gleichzeitig aktiv haben. Frostrunen können mit Magiedetektion wahrgenommen werden, aber nur, wenn man aktiv nach ihnen sucht. Frostrunen können nur mit mindestens einem halben Meter Abstand zueinander platziert werden."
        },
        {
            id: "furcht einfloessen",
            name: "Fucht einflösen",
            level: 3,
            mpKosten: 10,
            magieschule: "verfall",
            beschreibung: "Zwingt alle Ziele, die dich gerade ansehen, für eine Kampfrunde (5 Sekunden) panisch vor dir zu fliehen. Ein Ziel kann eine WI-Probe mit Schwierigkeit 2 ablegen, um diesem Effekt zu widerstehen. Bei Zielen, die so vor dir fliehen, bleibt eine unterschwellige Angst vor dir zurück, die es künftig einfacher macht, sie einzuschüchtern oder diesen Zauber nochmal auf sie zu wirken."
        },
        {
            id: "gaswolke",
            name: "Gaswolke",
            level: 2,
            mpKosten: 18,
            magieschule: "verfall",
            beschreibung: "Verändert die Komposition der Luft in einem 3x3x3 Meter großen Bereich, den du vollständig sehen kannst. Ziele in dem Bereich haben es schwer zu atmen und verlieren nach jeder Runde (alle 5 Sekunden) 1W6 KP.  Befindet sich ein Ziel zu lange in dem Bereich, wird es vergiftet und nimmt jede Runde 1W6 Schaden, bis es bewusstlos wird, selbst, wenn sie den Bereich verlassen. Die Luft in dem Bereich ist aber vor allem extrem entzündlich. Kommt sie mit einem Funken in Kontakt, detoniert sie in einer feurigen Explosion und fügt allen Zielen in ihrem Inneren 8W6 Schaden zu. Das Gas ist komplett unsichtbar."
        },
        {
            id: "giftinfusion",
            name: "Giftinfusion",
            level: 1,
            mpKosten: 8,
            magieschule: "verfall",
            beschreibung: "Flößt einem Ziel, das du mit mindestens einer Handfläche berührst, langsam ein tödliches Gift ein. Das Ziel muss eine MA-Probe bestehen, um zu merken, dass du es vergiftest, und selbst bei einem Erfolg merkt es das erst, wenn das Gift bereits in seinem Körper ist. Das Gift beginnt erst nach einer Stunde zu wirken und fügt dann pro Kampfrunde (alle 5 Sekunden) 1W6 Schaden zu. Es wirkt innerhalb von 48 Stunden tödlich, wenn es nicht behandelt wird. Das Einflößen des Gifts braucht 20 Sekunden ununterbrochenen Kontakts mit deiner Handfläche. Wenn du das Ziel mit beiden Händen berührst, reichen 5 Sekunden."
        },
        {
            id: "gleichgewichtsstoerer",
            name: "Gleichgewichtsstörer",
            level: 1,
            mpKosten: 10,
            magieschule: "verfall",
            beschreibung: "Manipuliert das Gleichgewichtsorgan eines Ziels, dem du in die Augen siehst, für 1W6 Runden. Das Ziel beginnt sofort zu schwanken und muss jede Runde eine Akrobatik-Probe bestehen oder fällt zu Boden. Solange das Ziel sitzt oder liegt, kann es normal agieren."
        },
        {
            id: "gluecksdiebstahl",
            name: "Glücksdiebstahl",
            level: 1,
            mpKosten: 16,
            magieschule: "verfall",
            beschreibung: "Stiehlt einen Glücks-Token eines Ziels, das du berührst. Das Ziel nimmt das als kaltes Schaudern über den Rücken wahr. Du kannst so mehr als deine maximale Anzahl Glücks-Tokens haben."
        },
        {
            id: "halloweenstreich",
            name: "Halloweenstreich",
            level: 1,
            mpKosten: 8,
            magieschule: "verfall",
            beschreibung: "Erschafft einen großen Kürbis, der extrem lecker und nahrhaft aussieht. Der Kürbis enthält ein starkes Gift, das jedem, der davon isst, 1W6 KP pro Kampfrunde abzieht. Die KP eines Ziels können so nicht unter 1 fallen. Das Gift hält eine Stunde, kann aber geheilt werden."
        },
        {
            id: "irre augen",
            name: "Irre Augen",
            level: 2,
            mpKosten: 8,
            magieschule: "verfall",
            beschreibung: "Ein Ziel, dem du in die Augen siehst, muss eine Widerstand-Probe bestehen oder wird verwirrt. Verwirrt: Das Ziel muss jede Runde einen zufällig gewählten Zauber gegen ein zufälliges legales Ziel einsetzen. Nach jeder Runde würfelt es Widerstand, um aus der Verwirrung auszubrechen."
        },
        {
            id: "laehmung",
            name: "Lähmung",
            level: 3,
            mpKosten: 10,
            magieschule: "verfall",
            beschreibung: "Versetzt ein Ziel, das du mit beiden Händen berührst, in eine Schockstarre. Es kann sich für 1W4 Runden überhaupt nicht mehr bewegen, egal, was passiert, aber weiterhin Zauber wirken, solange diese keine Beschwörungsformel oder Bewegung erfordern. Statt zu versuchen auszuweichen, kann das Ziel auf Magieresistenz würfeln, um diesem Effekt zu widerstehen."
        },
        {
            id: "leere",
            name: "Leere",
            level: 5,
            mpKosten: 10,
            magieschule: "verfall",
            beschreibung: "Erzeuge eine 5x5 Meter große Blase aus reinem Nichts um dich herum. Jedes andere Ziel in der Blase kann weder atmen noch sprechen noch zaubern. Alles, was die Blase betritt (inklusive Projektile) verliert sofort alles Momentum und bleibt einfach „hängen“. Du musst jede Runde (alle 5 Sekunden) die Kosten dieses Zaubers bezahlen, oder er endet. Wenn du eine andere Aktion durchführst oder dich bewegst, endet der Zauber sofort."
        },
        {
            id: "lied des friedens",
            name: "Lied des Friedens",
            level: 2,
            mpKosten: 20,
            magieschule: "verfall",
            beschreibung: "Singe ein wunderschönes Lied, das eine Minute lang ist. Ziele, die das Lied hören, fühlen sich magisch gezwungen, ihm weiter zuzuhören und können sich weder die Ohren zuhalten noch versuchen, vom Lied wegzulaufen. Jedes Ziel, das das Lied für die volle Minute hört, verliert alle Aggression und allen Kampfeswillen und wird komplett friedlich und dir gegenüber freundlich eingestellt. Dieser Effekt hält bis zu eine Stunde oder bis das Ziel Schaden nimmt oder jemand auf andere Weise offensichtlich aggressiv gegen es vorgeht (z.B. durch Flüche). Sobald der Effekt endet, würfelt jedes betroffene Ziel eine MA-Probe mit Schwierigkeit 1. Bei einem Erfolg weiß es, dass du es manipuliert hast. Ein Ziel, das das Lied einmal als Manipulation durchschaut hat, wird immun gegen seinen Effekt."
        },
        {
            id: "mana-parasit",
            name: "Mana-Parasit",
            level: 4,
            mpKosten: 0,
            magieschule: "verfall",
            beschreibung: "Erschafft das winzige Ei eines kleinen Insekts, das Mana konsumiert. Das Ei muss einem Ziel irgendwie verabreicht werden (geschluckt, unter die Haut gesetzt...). Der Parasit schlüpft innerhalb von 12 Stunden. Solange er im Körper eines Ziels existiert, kann dieses kein Mana regenerieren! Der Parasit kann medizinisch rausoperiert werden oder stirbt, wenn sein Wirt eine Wunde nimmt, als Kollateralschaden."
        },
        {
            id: "markierung",
            name: "Markierung",
            level: 1,
            mpKosten: 4,
            magieschule: "verfall",
            beschreibung: "Markiert ein Ziel, das du mit deinem Zeigefinger berührst. Es reicht, das Ziel durch seine Kleidung zu berühren (z.B. am Rücken).  An der Stelle, wo du es berührst, entsteht ein rotes Symbol, wie ein Tattoo, das mit einer MA-Probe leicht als Markierung identifiziert werden kann. Die Markierung kann nicht entfernt werden, außer von dir selbst, verschwindet aber automatisch nach 3 Tagen. Solange die Markierung bestehen bleibt, kannst du zu jeder Zeit wahrnehmen, in welcher Richtung und Entfernung zu dir sich das Ziel aktuell befindet, als hättest du einen internen Kompass, der sich nach ihm ausrichtet. Der Kompass führt dich immer zu dem Körperteil mit der Markierung, das heißt, wenn diese z.B. auf einem Arm ist und das Ziel seinen Arm verliert, würdest du nur noch die Position des Arms feststellen können, nicht die des Körpers."
        },
        {
            id: "nebelwand",
            name: "Nebelwand",
            level: 2,
            mpKosten: 20,
            magieschule: "verfall",
            beschreibung: "Erzeugt sofort eine bis zu 5x5x1 Meter große, extrem dichte Nebelwand, durch die hindurch man nur vage Silhouetten erkennen kann. Angriffe und Zauber, die durch die Nebelwand hindurch geschickt werden, haben ihre GENA-Probe um 2 Stufen erschwert. Ein starker Windstoß kann den Neben vertreiben und du kannst ihn jederzeit mit einem Gedanken verschwinden lassen."
        },
        {
            id: "negation",
            name: "Negation",
            level: 3,
            mpKosten: 14,
            magieschule: "verfall",
            beschreibung: "Entfernt alle Verstärkungseffekte von einem Ziel. Du kannst diesen Zauber als Reaktion nutzen, wenn jemand in deinem Sichtfeld einen verstärkenden oder heilenden Zauber wirkt. Du und der Magier würfeln dann jeweils auf ihren ZK-Wert. Es wird solange gewürfelt, bis eine Seite mehr Erfolge hat. Wenn du gewinnst, wird der ursprüngliche Zauber negiert. In jedem Fall muss das Ziel die MP-Kosten seines Zaubers bezahlen und du die dieses Zaubers."
        },
        {
            id: "paranoia",
            name: "Paranoia",
            level: 4,
            mpKosten: 40,
            magieschule: "verfall",
            beschreibung: "Infiziert ein Ziel, das du berührst, mit einer übernatürlichen Panik. Wenn das Ziel ein Magier ist, muss es bereits in einem Angstzustand sein, damit dieser Zauber einen Effekt hat. Das Ziel entwickelt eine permanente Phobie, die auf die aktuelle Situation und die Quelle seiner Angst zugeschnitten ist (beispielsweise Höhenangst, wenn es gegen seinen Willen an einem hohen Ort ist). Solange ein Ziel mit seiner Phobie direkt konfrontiert ist, gelten alle seine Proben automatisch als Misserfolge. Das Ziel wird, wenn der Zauber funktioniert, versuchen, panisch schreiend vor dir zu fliehen."
        },
        {
            id: "pechbringer",
            name: "Pechbringer",
            level: 4,
            mpKosten: 34,
            magieschule: "verfall",
            beschreibung: "Setze diesen Zauber sofort in Reaktion auf einen kritischen Erfolg bei einer Probe eines beliebigen Ziels ein. Die Probe wird stattdessen ein kritischer Patzer!"
        },
        {
            id: "rauchwolke",
            name: "Rauchwolke",
            level: 2,
            mpKosten: 10,
            magieschule: "verfall",
            beschreibung: "Erzeugt eine große, dichte Rauchwolke irgendwo in deinem Sichtbereich. Die Wolke hat einen Durchmesser von bis zu 20 Metern. Ziele in der Wolke oder solche, die durch die Wolke hindurch angreifen wollen, haben ihren GENA-Wert um 2 verringert (auf ein Minimum von 1). Die Wolke hält sich für mehrere Minuten, kann aber leicht weggeweht werden."
        },
        {
            id: "rostfinger",
            name: "Rostfinger",
            level: 4,
            mpKosten: 20,
            magieschule: "verfall",
            beschreibung: "Lässt ein Ziel, das du berührst, rapide altern. Pro Minute, die du das Ziel ohne Unterbrechung berührst, altert es um ein ganzes Jahr. Dieser Effekt hält permanent. Das Ziel kann durch diesen Effekt unwiederbringlich an Altersschwäche sterben. Dieser Zauber gilt als großes Tabu und darf offiziell weder gelehrt noch praktiziert werden."
        },
        {
            id: "schattenzehrer",
            name: "Schattenzehrer",
            level: 1,
            mpKosten: 20,
            magieschule: "verfall",
            beschreibung: "Infiziert den Schatten eines Lebewesens, in dem du mit mindestens einem Fuß stehst, mit einem magischen Parasiten. Solange das Ziel befallen ist, nimmt es pro Stunde 1W6 Schaden und kann seine KP durch nichts heilen. Das Ziel fühlt sich zunehmend erschöpft und unwohl, ohne zu wissen, woher die Effekte kommen. Es gibt keinerlei physische Verletzungen oder andere Anzeichen von Angriffen. Das Ziel kann außerdem physisch nicht einschlafen. Der Effekt hält solange an, bis das Ziel entweder in gleißendes Licht getaucht oder in komplette Dunkelheit gehüllt wird, sodass sein Schatten vollständig verschwindet."
        },
        {
            id: "schleimmauer",
            name: "Schleimmauer",
            level: 2,
            mpKosten: 18,
            magieschule: "verfall",
            beschreibung: "Erschafft eine bis zu 20 Meter lange, 3 Meter hohe und komplett gerade Mauer aus halbtransparentem, dickflüssigem grünen Schleim bis zu 2 Meter vor dir. Die Mauer verläuft langsam und verliert pro Runde (alle 5 Sekunden) 10 Zentimeter Höhe. Die Mauer ist viskos und bietet einen gewissen Widerstand, kann aber relativ leicht durchquert werden. Projektile, die durch die Mauer fliegen, verlieren aber eine Menge Momentum und fügen wenn überhaupt reduzierten Schaden zu. Ziele, die die Mauer berühren, werden vergiftet und nehmen jede Runde (alle 5 Sekunden) 1W6 Schaden, bis sie bewusstlos werden. Das Gift, wenn es nicht behandelt wird, ist innerhalb von 48 Stunden tödlich."
        },
        {
            id: "schwaechungsstrahl",
            name: "Schwächungsstrahl",
            level: 1,
            mpKosten: 12,
            magieschule: "verfall",
            beschreibung: "Schießt einen halbtransparenten dunkelgrünen Strahl aus einer Handfläche ab. Der Strahl bewegt sich in einer geraden Linie und durchdringt jedes Ziel und Objekt in seinem Weg. Jedes Ziel, das von dem Strahl getroffen wird, erleidet einen kurzzeitigen Schwächeanfall und erleidet für 30 Sekunden (6 Kampfrunden) 2W6 zusätzlichen Schaden aus allen Quellen."
        },
        {
            id: "seelenflamme",
            name: "Seelenflamme",
            level: 4,
            mpKosten: 50,
            magieschule: "verfall",
            beschreibung: "Erschafft eine kleine, lilane Flamme, die sich von der Lebenskraft aller Lebewesen in ihrer Umgebung ernährt. Jedes Ziel in Reichweite (5 Meter in alle Richtungen) verliert jede Runde (alle 5 Sekunden) ZK KP, ohne zu wissen, warum. Dies setzt sich als zunehmende Müdigkeit ab. Sieht ein Ziel die Flamme, weiß es intuitiv, dass diese Schuld daran ist. Die Flamme kann gelöscht werden wie jedes normale Feuer und verbreitet sich nicht; sie kann nichts entzünden. Wird das Feuer gelöscht, endet der Zauber, anderenfalls geht er für immer weiter. Er betrifft auch Pflanzen und Tiere in der Nähe der Flamme. Je mehr Lebenskraft die Flamme absorbiert, desto größer wird sie, was sie offensichtlicher, aber ihren Wirkradius größer macht."
        },
        {
            id: "spontanknaller",
            name: "Spontanknaller",
            level: 1,
            mpKosten: 8,
            magieschule: "verfall",
            beschreibung: "Erzeugt eine laute Detonation, die jedes Ziel in Hörweite erschrecken lässt. Erschreckte Ziele müssen eine WI-Probe mit Schwierigkeit 1 bestehen oder überspringen ihre nächste Kampfrunde, weil sie vor Schreck erstarrt und desorientiert sind. Diese Probe muss nur einmal pro Kampf gewürfelt werden, danach sind Ziele auf den Knall vorbereitet. Außerhalb von Kämpfen kann der Zauber z.B. genutzt werden, um jemanden auf sich aufmerksam zu machen oder um wilde Tiere zu verscheuchen."
        },
        {
            id: "stase",
            name: "Stase",
            level: 3,
            mpKosten: 20,
            magieschule: "verfall",
            beschreibung: "Versetzt ein Ziel, das du berührst, vorübergehend in Stase. Dadurch wird es der Welt entrückt und ist für den Moment nicht mehr Teil dieser Welt. Ein Ziel in Stase kann sich nicht bewegen, bekommt nichts um sich herum mit, man kann aber auch nicht mit ihm interagieren und es nimmt keinen Schaden aus irgendwelchen Quellen. Ein Ziel in Stase ist weiterhin sichtbar, aber vollkommen bewegungslos, es sieht aus, als wäre es in der Zeit eingefroren. Dieser Effekt hält bis zu eine Stunde an, ein Ziel kann aber nach jeder Kampfrunde (alle 5 Sekunden) eine Magieresistenz-Probe würfeln, um aus dem Effekt auszubrechen. Du kannst den Effekt jederzeit beenden."
        },
        {
            id: "strukturschwaechung",
            name: "Strukturschwächung",
            level: 3,
            mpKosten: 30,
            magieschule: "verfall",
            beschreibung: "Berühre die Oberfläche einer großen Struktur (z.B. eines Gebäudes oder einer Brücke) für 10 Minuten durchgehend und sage eine komplexe Zauberformel auf. Vollendest du die Formel ungestört, wird die Struktur anschließend so weit geschwächt, dass sie bei geringer Krafteinwirkung in sich zusammenfällt. Eine massive Brücke würde plötzlich einstürzen, wenn eine Person unvorsichtig darübergeht, eine Hauswand, wenn man dagegentritt usw."
        },
        {
            id: "taubheit",
            name: "Taubheit",
            level: 1,
            mpKosten: 6,
            magieschule: "verfall",
            beschreibung: "Schaltet für eine Minute (12 Kampfrunden) das Gehör eines Ziels, das du sehen kannst, einfach ab. Das Ziel kann nichts mehr hören, was es natürlich sehr desorientiert. Telepathie und ähnliche Effekte sind davon nicht betroffen. Wenn das Ziel realisiert, dass es durch Magie sein Gehör verloren hat, kann es eine MA-Probe mit Schwierigkeit 2 versuchen, um es vorzeitig zurückzuerlangen."
        },
        {
            id: "treibsand",
            name: "Treibsand",
            level: 2,
            mpKosten: 24,
            magieschule: "verfall",
            beschreibung: "Lege beide Hände auf den Boden und verwandle den Untergrund in einem bis zu 5x5 Meter großen Bereich vor dir in Treibsand. Der Treibsand ist nicht von normalem Sand unterscheidbar. Ein Ziel, das den Treibsand betritt, muss eine Akrobatik-Probe bestehen oder beginnt sofort zu versinken. Ein versinkendes Ziel muss jede Runde (alle 5 Sekunden) eine Akrobatik-Probe bestehen, um nicht tiefer einzusinken. Ein versinkendes Ziel kann sich nur sehr eingeschränkt bewegen und nicht parieren. Wenn ein Ziel komplett versinkt, erstickt es und stirbt letztlich."
        },
        {
            id: "unglueck",
            name: "Unglück",
            level: 5,
            mpKosten: 40,
            magieschule: "verfall",
            beschreibung: "Belegt ein Ziel in Reichweite mit einem Fluch unglaublichen Pechs. Das Ziel hat für eine Stunde extremes Pech in allen Lebenslagen und muss alle Proben zweimal würfeln, wobei das schlechtere Ergebnis zählt. Außerdem kann es keine Glücks-Tokens verwenden."
        },
        {
            id: "verseuchung",
            name: "Verseuchung",
            level: 5,
            mpKosten: 80,
            magieschule: "verfall",
            beschreibung: "Kontaminiert dauerhaft das Mana in einem bis zu 100x100 Meter großen Gebiet. Alle Zauber, die in diesem Gebiet gewirkt werden, erfordern zunächst eine MA-Probe, um zu sehen, ob sie überhaupt passieren. Misslingt diese Probe, explodiert das Mana stattdessen im Gesicht des Zaubernden und fügt ihm 4W6 Schaden zu."
        },
        {
            id: "zersetzung",
            name: "Zersetzung",
            level: 4,
            mpKosten: 12,
            magieschule: "verfall",
            beschreibung: "Berühre einen Gegenstand und zersetze ihn vollständig, als wäre er mit starker Säure in Kontakt gekommen. Der Effekt betrifft alles, was du mit deiner Hand berührst, und hält 5 Sekunden an. Magische Artefakte sind immun, aber ansonsten kommst du durch jedes Material durch und kannst dich z.B. durch Stahlwände ätzen. Ein Lebewesen nimmt 10W6 Schaden durch die Berührung."
        },
        {
            id: "absolute kontrolle",
            name: "Absolute Kontrolle",
            level: 5,
            mpKosten: 200,
            magieschule: "Zauberkunst",
            beschreibung: "Schreibt permanent die Persönlichkeit und Erinnerungen eines Ziels um und verwandelt es so in was auch immer du willst. Der Zauber erfordert ein einstündiges Ritual, währenddessen das Ziel bei Bewusstsein sein und du es permanent mit beiden Händen am Kopf berühren musst. Wenn das Ziel ein Magier ist, muss es eine Magieresistenz-Probe mit Schwierigkeit 3 bestehen, um dem Effekt zu widerstehen. Zu Beginn des Rituals definierst du ganz genau, wie du das Ziel umfunktionieren willst. Servants und andere magische Entitäten sind immun."
        },
        {
            id: "alarmzone",
            name: "Alarmzone",
            level: 2,
            mpKosten: 20,
            magieschule: "Zauberkunst",
            beschreibung: "Erzeugt eine bis zu 50x50 Meter große, unsichtbare Zone mit dir im Zentrum um dich herum. Wenn du die Zone aufbaust, definierst du eine Gruppe von Zielen (z.B. „Andere Magier“ oder „Jeder außer mir selbst und dieser Gruppe von Verbündeten“). Wenn ein Ziel, das nicht zu dieser Gruppe gehört, die Zone betritt, wirst du sofort darüber informierst und weißt genau, wo das Ziel ist. Du kannst so auch unsichtbare Ziele oder Ziele, die ihre Präsenz unterdrücken, wahrnehmen. Wenn du deine Augen schließt, kannst du vor deinem inneren Auge jede Person in der Zone beobachten wie mit Überwachungskameras. Du kannst die Zone auch im Schlaf überwachen. Die Zone hält solange an, bis du sie verlässt."
        },
        {
            id: "augen der vergangenheit",
            name: "Augen der Vergangenheit",
            level: 3,
            mpKosten: 10,
            magieschule: "Zauberkunst",
            beschreibung: "Führe ein zehnminütiges Ritual durch, bei dem du an eine bestimmte lebende Person denkst. Wenn das Ritual erfolgreich ist, verfällst du in einen tiefen Trance-Zustand, in dem du aus der Vogelperspektive eine wichtige Szene aus der Vergangenheit der Person miterlebst. Was genau du siehst, kannst du nicht beeinflussen, es wird aber immer etwas sein, das entweder für dich, die Person oder deine Interaktion mit der Person von besonderer Relevanz ist. Diesen Zauber mehr als einmal pro Tag einzusetzen, schadet deiner geistigen Gesundheit und kann zu dauerhaften Reduzierungen deiner Werte führen!"
        },
        {
            id: "aura der verschwommenheit",
            name: "Aura der Verschwommenheit",
            level: 4,
            mpKosten: 16,
            magieschule: "Zauberkunst",
            beschreibung: "Gewährt dir oder einem Ziel, das du berührst, eine Aura absoluter Unauffälligkeit. Nicht-Magienutzer werden das Ziel nicht mehr wahrnehmen, solange es sie nicht direkt anspricht oder berührt. Proben auf Schleichen/Verstecken haben bei Nicht-Magienutzern automatisch kritischen Erfolg und erhalten sogar gegen Magier 2 zusätzliche Erfolge. Der Effekt hört auf, individuelle Ziele zu beeinflussen, sobald das Ziel sie berührt oder anspricht und hält sonst bis zu eine Stunde."
        },
        {
            id: "chaos-kontrolle",
            name: "Chaos-Kontrolle",
            level: 4,
            mpKosten: 0,
            magieschule: "Zauberkunst",
            beschreibung: "Würfle sofort (5xZK)W6. Diese Würfel werden dein 'Würfelpool'. Statt Proben zu würfeln, suchst du dir für bis zu die nächste Stunde entsprechend viele Würfel aus dem Pool aus und nimmst diese als Ergebnis deiner Probe. Wenn dein Pool leer oder die Stunde um ist, wirst du augenblicklich bewusstlos und nimmst 3 Wunden. Du kannst diesen Zauber nur einmal pro Tag anwenden."
        },
        {
            id: "doppelgaenger",
            name: "Doppelgänger",
            level: 2,
            mpKosten: 14,
            magieschule: "Zauberkunst",
            beschreibung: "Erschafft ein perfektes Ebenbild von einer Person, die du berührst. Du kannst das Ebenbild mit deinen Gedanken fernsteuern und alles sehen und hören, was es sieht und hört, solange du deine Augen schließt. Das Ebenbild ist rein illusorisch, es hat keinen festen Körper, kann mit nichts interagieren und nicht sprechen."
        },
        {
            id: "elektronenwelle",
            name: "Elektronenwelle",
            level: 2,
            mpKosten: 10,
            magieschule: "Zauberkunst",
            beschreibung: "Deaktiviert alle elektronischen Geräte in bis zu 100 Metern Entfernung und macht sie für eine volle Stunde unbrauchbar."
        },
        {
            id: "erinnerungen verwischen",
            name: "Erinnerungen verwischen",
            level: 1,
            mpKosten: 10,
            magieschule: "Zauberkunst",
            beschreibung: "Lässt Nicht-Magier vergessen, dass sie Magie gesehen haben. Ihre Erinnerungen werden so angepasst, dass was auch immer sie Übernatürliches erlebt haben sich ganz natürlich erklären lässt. Hat keinerlei Effekt auf jeden, der über die Existenz von Magie bereits Bescheid wusste, bevor das Ereignis, an das du die Erinnerungen löschen willst, passierte. Dieser Zauber gilt als der wichtigste, um ihn neuen, unerfahrenen Magiern beizubringen. Schadensbegrenzung und so."
        },
        {
            id: "fliegende klinge",
            name: "Fliegende Klinge",
            level: 1,
            mpKosten: 6,
            magieschule: "Zauberkunst",
            beschreibung: "Belegt einen Gegenstand (z.B. eine Klinge) mit einem Zauber und wirft ihn in die grobe Richtung eines Ziels. Du bestimmst dabei ein Ziel. Das Objekt fliegt direkt auf das Ziel zu und wird es solange verfolgen, bis es es trifft oder irgendwie zerstört wird."
        },
        {
            id: "gedankennetz",
            name: "Gedankennetz",
            level: 4,
            mpKosten: 26,
            magieschule: "Zauberkunst",
            beschreibung: "Erzeugt ein Netzwerk aus den Gedanken von dir und bis zu 5 willigen Personen, die du berührst. Alle Mitglieder des Netzwerks können alle Gedanken aller anderen Netzwerke hören. Ziele können jederzeit aus dem Netzwerk austreten und du kannst sie rauswerfen. Du kannst auch neue Ziele in das Netzwerk aufnehmen, indem du ihren Kopf berührst während sie willig sind, beizutreten, und 10 MP bezahlst. Das Netzwerk hat keine maximale Reichweite und hält bis zu 24 Stunden, aber du kannst dann seine MP-Kosten nochmal bezahlen, um es weitere 24 Stunden aufrechtzuerhalten."
        },
        {
            id: "gravitas",
            name: "Gravitas",
            level: 3,
            mpKosten: 6,
            magieschule: "Zauberkunst",
            beschreibung: "Erhöht schlagartig in einem Bereich von 10x10 Metern mit dir im Zentrum die Schwerkraft auf ein Vielfaches. Betroffene Ziele (auch du selbst!) müssen eine KÖ-Probe bestehen oder werden zu Boden gerissen. Betroffene Ziele müssen jede Runde eine KÖ-Probe bestehen, wenn sie sich bewegen wollen. Du kannst diesen Effekt beliebig lange aufrechterhalten, musst aber alle 5 Sekunden die Kosten dieses Zaubers bezahlen. Der Zauber geht immer von deiner aktuellen Position aus."
        },
        {
            id: "halluzination",
            name: "Halluzination",
            level: 1,
            mpKosten: 12,
            magieschule: "Zauberkunst",
            beschreibung: "Du belegst ein Ziel mit einer simplen audio-visuellen Halluzination. Das Ziel bekommt vom Spielleiter eine Information deiner Wahl gesagt, als wäre es die Wahrheit. Kommt das Ziel auf die Idee, daran zu zweifeln, kann es WI würfeln, um die Halluzination zu durchschauen, sonst hält es sie für offensichtlich wahr."
        },
        {
            id: "information generieren",
            name: "Information generieren",
            level: 4,
            mpKosten: 40,
            magieschule: "Zauberkunst",
            beschreibung: "Erzeugt eine Information, die eine einzelne, in einem Satz gestellte Frage beantwortet (z.B. 'Wo befindet sich aktuell Person XY' oder 'Was ist die wahre Identität von XY?' Die Information ist garantiert korrekt und erscheint einfach in deinem Kopf, auch wenn du keinerlei Anhaltspunkte dafür hattest."
        },
        {
            id: "informationen loeschen",
            name: "Informationen löschen",
            level: 2,
            mpKosten: 30,
            magieschule: "Zauberkunst",
            beschreibung: "Löscht sofort alle gespeicherten Informationen über dich. Das betrifft Geschriebenes, Tonaufnahmen und Videos, aber auch z.B. Finger- und Fußabdrücke. Alle „Beweise“ für deine Existenz verschwinden einfach und werden durch weiße Blätter Papier oder leere Videokassetten ersetzt. Du kannst einen Zeitraum definieren, zu dem Informationen gelöscht werden sollen (z.B. alles, was in den letzten 2 Jahren entstanden ist) und musst nicht alle Aufzeichnungen über dein Leben löschen. Außerdem kannst du beliebig auch Aufzeichnungen von diesem Effekt ausnehmen, z.B. Fotos von dir auf deinem Handy. Das Wirken dieses Zaubers dauert etwa eine Stunde."
        },
        {
            id: "lautsprecher",
            name: "Lautsprecher",
            level: 1,
            mpKosten: 6,
            magieschule: "Zauberkunst",
            beschreibung: "Erlaubt es dir, für bis zu 10 Minuten beliebige Geräusche von einem Ort ausgehen zu lassen, den du sehen kannst. Das kann Musik sein, deine eigene Stimme, Explosionen usw. Jemandes Stimme nachzuahmen, erfordert eine Probe auf Stimmen nachahmen!"
        },
        {
            id: "leidteiler",
            name: "Leidteiler",
            level: 3,
            mpKosten: 20,
            magieschule: "Zauberkunst",
            beschreibung: "Die KP von dir und einem Ziel, das du berührst, werden gleich dem Durchschnitt eurer aktuellen KP. Ein Ziel kann so vorübergehend mehr als seine maximalen KP haben."
        },
        {
            id: "lichtblitz",
            name: "Lichtblitz",
            level: 1,
            mpKosten: 6,
            magieschule: "Zauberkunst",
            beschreibung: "Lässt für einen Augenblick einen gewaltigen Lichtblitz erscheinen, der von dir ausgeht. Jedes Ziel, das dich sieht, wird geblendet und muss bei seiner nächsten Aktion zweimal würfeln, wobei das schlechtere Ergebnis zählt. Kann als Reaktion auf einen anderen Angriff oder Zauber verwendet werden und erzwingt dann auch bei diesem ein Neuwürfeln."
        },
        {
            id: "mana-filter",
            name: "Mana-Filter",
            level: 1,
            mpKosten: 20,
            magieschule: "Zauberkunst",
            beschreibung: "Erschafft in einem etwa 10 Minuten langen Ritual eine 15x15 Meter große Zone mit deiner aktuellen Position im Zentrum. Bei der Erstellung bestimmst du eine Magie-Schule. Innerhalb der Zone sind Zauber dieser Schule stark gedämpft, wodurch ihre Kosten verdoppelt werden. Mana-Filter können sich nicht überlagern. Die Zone bleibt bestehen, bis du bewusstlos wirst, schläfst oder sie verlässt."
        },
        {
            id: "mana-schleier",
            name: "Mana-Schleier",
            level: 1,
            mpKosten: 10,
            magieschule: "Zauberkunst",
            beschreibung: "Hüllt ein Ziel in eine dünne Schicht deines eigenen Manas. Das Ziel regeneriert dadurch die Hälfte der Kosten dieses Zaubers als MP (aufgerundet) und strahlt für eine Stunde deine Mana-Signatur aus. So können Nicht-Magier mit Magie-Wahrnehmung als Magier erkannt werden."
        },
        {
            id: "mein schatz",
            name: "Mein Schatz",
            level: 1,
            mpKosten: 10,
            magieschule: "Zauberkunst",
            beschreibung: "Designiert einen Gegenstand, den du mit mindestens einer Hand berührst, als „Deinen Schatz“. Du kannst immer nur einen Schatz zur Zeit haben, einen neuen zu designieren überschreibt den vorigen. Du kannst zu jeder Zeit bestimmen, in welcher Richtung und grober Entfernung sich dein Schatz gerade von dir befindet. Wenn du die Augen schließt, kannst du außerdem vor deinem inneren Auge deinen Schatz und seine direkte Umgebung (~1 Meter in alle Richtungen) sehen."
        },
        {
            id: "objektifizierung",
            name: "Objektifizierung",
            level: 1,
            mpKosten: 4,
            magieschule: "Zauberkunst",
            beschreibung: "Verwandelt ein Objekt dauerhaft in ein anderes Objekt aus den gleichen Teilen. Es kann keine Masse hinzugefügt, wohl aber Teile weggelassen werden. Beispiel: Aus einer Tür kann ein Stuhl werden, aus einem Schwert ein Schlüssel, aber aus einem Schlüssel nur ein sehr kleines Schwert. Magische oder verzauberte Objekte sind nicht betroffen."
        },
        {
            id: "orbit",
            name: "Orbit",
            level: 3,
            mpKosten: 20,
            magieschule: "Zauberkunst",
            beschreibung: "Erschafft 2W6 kleine Kugeln aus reinem Mana, die dich oder ein Ziel in Sichtweite umkreisen. Die Kugeln geben ein Leuchten etwa so stark wie das von Fackeln von sich. Die Kugeln reagieren automatisch auf anderes Mana und fliegen zu ihm hin, um es zu absorbieren. Das heißt, sie können genutzt werden, um Zauber aufzuspüren und abzuwehren. Immer, wenn das Ziel von einem Zauber getroffen werden würde, würfelst du 1W6. So viele Kugeln stürzen sich auf den Zauber, um ihn zu neutralisieren (oder alle verbleibenden Kugeln, falls das weniger als das Ergebnis sind). Die Kugeln bleiben immer bei ihrem Ziel und bewegen sich mit ihm mit. Sie halten maximal 10 Minuten, du kannst sie aber jederzeit verschwinden lassen."
        },
        {
            id: "plattform",
            name: "Plattform",
            level: 2,
            mpKosten: 10,
            magieschule: "Zauberkunst",
            beschreibung: "Erschafft eine bis zu 2x2 Meter große, unsichtbare Plattform in der Luft. Die Plattform besteht aus verdichteter Luft. Sie kann nicht bewegt werden und kann bis zu 50xZK Kilo aushalten; bei größerer Belastung beginnt sie, zu zerbrechen. "
        },
        {
            id: "scheinen",
            name: "Scheinen",
            level: 1,
            mpKosten: 2,
            magieschule: "Zauberkunst",
            beschreibung: "Belegt einen Gegenstand mit einem kleinen Zauber, der ihn schwach leuchten lässt. Das Leuchten ist stark genug, um dunkle Räume halbwegs zu erleuchten. Du kannst das Leuchten jederzeit „ausschalten“, aber dann musst du den Zauber erneut wirken, um es wieder einzuschalten."
        },
        {
            id: "scheintod",
            name: "Scheintod",
            level: 3,
            mpKosten: 10,
            magieschule: "Zauberkunst",
            beschreibung: "Schaltet scheinbar alle vitalen Funktionen deines Körpers für bis zu eine Stunde komplett ab. Dein Puls wird nicht mehr wahrnehmbar, deine Atmung endet einfach, dein Körper fühlt sich kalt an usw. Jeder, der dich untersucht, wird dich für tot halten, allerdings kann eine Untersuchung auf Magie feststellen, dass Magie an deinem Körper ist. Diese könnte aber natürlich alles mögliche sein. Deine vitalen Funktionen werden nicht WIRKLICH unterbrochen, man kann sie nur nicht mehr wahrnehmen. Du musst weiterhin atmen. Wenn du die Kosten dieses Zaubers verdoppelst, kannst du außerdem Verletzungen und Symptome einer bestimmten Todesart (z.B. verbrannte Haut, Wasser in der Lunge, große Mengen Blut...) an deinem Körper manifestieren. Diese sind rein illusorisch."
        },
        {
            id: "schlangenzunge",
            name: "Schlangenzunge",
            level: 4,
            mpKosten: 30,
            magieschule: "Zauberkunst",
            beschreibung: "Flüstere einem Ziel ins Ohr und gib ihm eine Suggestion. Das Ziel wird deiner Suggestion für eine Stunde glauben, als wäre es die offensichtlichste Wahrheit der Welt. Du kannst ein Ziel so nicht dazu bringen, sich selbst zu verletzen oder zu töten, wohl aber einen Verbündeten. Magieresistenz kann diesen Effekt stark abschwächen, sodass das Ziel „nur“ vorübergehend verwirrt ist."
        },
        {
            id: "schwerelosigkeit",
            name: "Schwerelosigkeit",
            level: 4,
            mpKosten: 16,
            magieschule: "Zauberkunst",
            beschreibung: "Macht ein Ziel, das du berührst, für bis zu eine Stunde schwerelos. Ein schwereloses Ziel muss immer, wenn es sich bewegen will, eine Probe auf Schwimmen bestehen, oder es beginnt, hilflos aufwärts zu treiben. Du kannst den Effekt jederzeit vorzeitig beenden. Wenn der Effekt endet, fällt das Ziel schlagartig runter. Fallschaden ist 1W6 pro 3 Meter."
        },
        {
            id: "spektralgedaechtnis",
            name: "Spektralgedächtnis",
            level: 3,
            mpKosten: 20,
            magieschule: "Zauberkunst",
            beschreibung: "Spielt eine Szene aus deinem Gedächtnis oder dem einer Person, deren Kopf du berührst, in Form eines dreidimensionalen, halbtransparenten Films in der Luft vor dir ab. Der Film hat auch Ton. Es werden nur Bilder und Geräusche abgespielt, die das Ziel erlebt hat und an die es sich erinnern kann. Der Film kann, gemäß der Erinnerung des Ziels, von der Realität abweichen, aber nicht bewusst verfälscht werden. Wenn du jemandes anderen Erinnerungen abspielst, endet der Film sofort, wenn dein Kontakt zum Kopf des Ziels abbricht. Der Film kann maximal 15 Minuten lang sein und muss eine einzige zusammenhängende Szene zeigen."
        },
        {
            id: "stimmenimitation",
            name: "Stimmenimitation",
            level: 1,
            mpKosten: 10,
            magieschule: "Zauberkunst",
            beschreibung: "Verändert für bis zu 24 Stunden deine Stimme so, dass sie wie eine andere Stimme klingt, die du schon einmal gehört hast. Die Stimme ist vom Original unmöglich zu unterscheiden. Du kannst diesen Effekt jederzeit beenden."
        },
        {
            id: "stille",
            name: "Stille",
            level: 1,
            mpKosten: 6,
            magieschule: "Zauberkunst",
            beschreibung: "Belegt dich oder ein Ziel, das du berührst, mit Stille, solange du es berührt hältst. Ein stilles Ziel kann weder sprechen noch sonst irgendwelche Geräusche erzeugen, inklusive z.B. durch das Treten auf zerbrechende Äste, Klopfen an eine Wand usw."
        },
        {
            id: "substitution",
            name: "Substitution",
            level: 4,
            mpKosten: 50,
            magieschule: "Zauberkunst",
            beschreibung: "Vertauscht augenblicklich deine Position mit der eines Gegenstands oder Ziels, den/das du sehen kannst. Unwillige Ziele können eine Magieresistenz-Probe (Schwierigkeit 1) ablegen, um diesem Effekt zu widerstehen, wodurch der Zauber fehlschlägt (aber trotzdem MP kostet). Im Kampf kann dieser Zauber als Reaktion benutzt werden, um einem Angriff/Zauber automatisch auszuweichen oder ein anderes Ziel in die Bahn des Angriffs/Zaubers zu bewegen."
        },
        {
            id: "telekinese",
            name: "Telekinese",
            level: 1,
            mpKosten: 12,
            magieschule: "Zauberkunst",
            beschreibung: "Bewegt ein bis zu 180 Kilo schweres Objekt oder Lebewesen mit deinen Gedanken. Du kannst das Ziel etwa in Jogging-Geschwindigkeit bewegen. Ein Ziel kann sich jede Runde (alle 5 Sekunden) mit Magieresistenz dagegen wehren, von dir bewegt zu werden. Bricht es erfolgreich aus, endet der Effekt vorzeitig. Du kannst das Ziel bis zu 10 Minuten lang nach belieben bewegen, selbst wenn es 180 Kilo wiegt, fühlt es sich für dich an wie eine Feder. Der Effekt endet vorzeitig, wenn du das Ziel nicht mehr sehen kannst."
        },
        {
            id: "todessicht",
            name: "Todessicht",
            level: 1,
            mpKosten: 2,
            magieschule: "Zauberkunst",
            beschreibung: "Berühre eine Leiche, während du diesen Zauber wirkst. Du siehst vor deinem inneren Auge die letzten 10xZK Sekunden des Lebens der Leiche aus deren Perspektive."
        },
        {
            id: "traumbotschaft",
            name: "Traumbotschaft",
            level: 1,
            mpKosten: 10,
            magieschule: "Zauberkunst",
            beschreibung: "Sendet einem schlafenden Ziel einen bestimmten Traum nach deiner exakten Gestaltung. Du kannst in dem Traum beliebige Botschaften übermitteln oder scheinbare Visionen zeigen. Das Ziel kann sich hinterher perfekt an den Traum erinnern. Es muss eine MA-Probe bestehen, um zu erkennen, dass der Traum keine Vision, sondern der Effekt eines Zaubers war. Natürlich kannst du einem Ziel auch im Vorfeld sagen, dass du in seine Träume eindringen wirst. Wenn das Ziel nicht schläft, verpufft der Zauber wirkungslos, kostet aber trotzdem MP."
        },
        {
            id: "tunnel",
            name: "Tunnel",
            level: 5,
            mpKosten: 10,
            magieschule: "Zauberkunst",
            beschreibung: "Du kannst jederzeit die Kosten dieses Zaubers bezahlen, um die Stelle, an der du dich gerade befindest, als „Tunnelausgang“ zu designieren. Wenn du diesen Zauber wirkst, musst du eine einminütige Formel aufsagen. Anschließend werden du und alle Ziele und Objekte, die du berührst, sofort zum Tunnelausgang teleportiert. Du kannst so nicht mehr als zehn Kilometer Distanz zurücklegen!"
        },
        {
            id: "ueberwachung",
            name: "Überwachung",
            level: 3,
            mpKosten: 10,
            magieschule: "Zauberkunst",
            beschreibung: "Schließe deine Augen und stelle dir das Gesicht einer Person vor. Wenn du den vollständigen Namen der Person kennst, kannst du für bis zu eine Minute vor deinem inneren Auge verfolgen, was die Person jetzt gerade tut."
        },
        {
            id: "unsichtbarkeit",
            name: "Unsichtbarkeit",
            level: 4,
            mpKosten: 20,
            magieschule: "Zauberkunst",
            beschreibung: "Macht dich und alle Ziele, die du berührst, unsichtbar. Kleidung und kleine Gegenstände am Körper werden dabei ebenfalls betroffen. Ein Ziel bleibt solange unsichtbar, bis jemand, der nicht von diesem Zauber betroffen ist, es berührt, es einen Angriff oder offensiven Zauber ausführt oder bis es Schaden nimmt. Du kannst Ziele, die du unsichtbar gemacht hast, jederzeit wieder sichtbar machen (auch einzeln). Der Effekt hält maximal 3 Stunden. Proben auf Schleichen/Verstecken sind in der Regel automatische Erfolge. Ausnahmen sind z.B. gegen Ziele mit übermenschlichem Gehör, Geruchssinn oder Magiewahrnehmung. Im Kampf sind GENA-Proben gegen unsichtbare Ziele extrem erschwert, selbst wenn der Angreifer weiß, wo das Ziel ungefähr ist. Zauber mit Flächeneffekt sind nicht betroffen."
        },
        {
            id: "verstaendigung",
            name: "Verständigung",
            level: 1,
            mpKosten: 6,
            magieschule: "Zauberkunst",
            beschreibung: "Wähle ein Ziel. Du sprichst für bis zu eine Stunde die Sprache des Ziels als wäre es deine Muttersprache und kannst dich so mit dem Ziel unterhalten. Schließt auch nicht-menschliche Sprachen (z.B. Kommunikation mit einer Tierart) ein. Du kannst nur eine zusätzliche Sprache zur Zeit so sprechen."
        },
        {
            id: "wettervorhersage",
            name: "Wettervorhersage",
            level: 5,
            mpKosten: 14,
            magieschule: "Zauberkunst",
            beschreibung: "Du kannst beliebig das Wetter verändern. Die Veränderung erfolgt in realistischer Geschwindigkeit, das heißt, von einem Hochsommertag zu einem Schneesturm zu kommen ist möglich, dauert aber mindestens eine Stunde an gradueller Veränderung. Wenn das Wetter einmal verändert ist, bleibt es für mehrere Stunden bestehen. Die Veränderung ist über viele, viele Kilometer spürbar."
        },
        {
            id: "wirbelwind",
            name: "Wirbelwind",
            level: 2,
            mpKosten: 10,
            magieschule: "Zauberkunst",
            beschreibung: "Erzeugt sofort eine heftige, omnidirektionale Windböe, die von dir ausgeht. Der Wind ist so stark, dass alle Ziele und Objekte, die bis zu 150 Kilo wiegen, von dir weggeschleudert werden. Je nach Gewicht werden sie bis zu 200 Meter weit geschleudert und nehmen mit der Distanz skalierenden Schaden; 1W6 pro 50 Meter. Du kannst diesen Zauber als Reaktion einsetzen, um Projektile wegzublasen, die dich treffen würden."
        },
        {
            id: "zauberecho",
            name: "Zauberecho",
            level: 3,
            mpKosten: 50,
            magieschule: "Zauberkunst",
            beschreibung: "Der nächste Zauber, den du innerhalb einer Stunde wirkst, wird sofort ein zweites Mal gewirkt, ohne dass du MP-Kosten dafür bezahlen müsstest. Im Kampf wird er als zusätzliche Aktion gewirkt."
        },
        {
            id: "zauberspiegel",
            name: "Zauberspiegel",
            level: 5,
            mpKosten: 0,
            magieschule: "Zauberkunst",
            beschreibung: "Nutze diesen Zauber nur als Reaktion, wenn du direkt von einem Zauber getroffen würdest. Würfle eine MA-Probe, mit der du das Ergebnis der GENA-Probe des Angreifers treffen oder überbieten musst. Bei einem Erfolg wird der Zauber auf das Ziel zurückgeschleudert. Die MP-Kosten dieses Zaubers entsprechen denen des Zaubers, den du reflektierst. Diese Kosten werden nicht halbiert, unabhängig von deiner primären Magie-Schule."
        },
        {
            id: "zeitschleife",
            name: "Zeitschleife",
            level: 5,
            mpKosten: 40,
            magieschule: "Zauberkunst",
            beschreibung: "Du und bis zu 3 weitere Ziele deiner Wahl erhalten sofort eine zusätzliche Aktion. Du kannst auch wählen, dass du selbst zwei zusätzliche Aktionen bekommst, dafür aber kein anderes Ziel. Zusätzliche Aktionen können nicht genutzt werden, um diesen Zauber einzusetzen."
        },
        {
            id: "zone der wahrheit",
            name: "Zone der Wahrheit",
            level: 3,
            mpKosten: 24,
            magieschule: "Zauberkunst",
            beschreibung: "Erschafft eine bist zu 20x20 Meter große Zone um dich herum, in der niemand (dich eingeschlossen) lügen kann. Versucht jemand, zu lügen, spricht er automatisch die Wahrheit. Betritt ein Ziel die Zone, spürt es ein unangenehmes Kribbeln, das mit einer MA-Probe als Anzeichen für eine Zone der Wahrheit erkannt werden kann. Ein Ziel in der Zone kann natürlich einfach nichts sagen oder Details auslassen, es kann lediglich keine expliziten Unwahrheiten erzählen."
        },
        {
            id: "augen des waldes",
            name: "Augen des Waldes",
            level: 1,
            mpKosten: 10,
            magieschule: "beschwoerung",
            beschreibung: "Lässt Augen an allen Pflanzen, die du berührst, wachsen. Wenn du deine Augen schließt, kannst du durch die Augen an den Pflanzen sehen. Du siehst immer durch alle Pflanzen-Augen gleichzeitig. Die Augen sind deutlich sichtbar, solange du durch sie schaust. Anderenfalls sind sie geschlossen und fast unsichtbar, können aber bemerkt werden, wenn man die Pflanzen bewusst untersucht."
        },
        {
            id: "bioarkane masse",
            name: "Bioarkane Masse",
            level: 2,
            mpKosten: 30,
            magieschule: "beschwoerung",
            beschreibung: "Beschwört einen 2x2x2 Meter großen Klopps aus von Mana durchsetztem Schleim. Der Schleim kann sich sehr langsam autonom bewegen und gehorcht dir aufs Wort. Wenn der Schleim ein Ziel berührt, versucht er, dieses einzusaugen und zu assimilieren. Das Ziel muss jede Runde (alle 5 Sekunden), die es in Kontakt mit dem Schleim ist, eine KÖ-probe bestehen, um nicht eingesaugt zu werden. Ein eingesaugtes Ziel nimmt jede Runde 8W6 Schaden, der nicht verringert oder negiert werden kann, während es verdaut wird. Der Schleim ist so langsam, dass ein Ziel, das ihn kommen sieht und sich bewegen kann ihm ohne Notwendigkeit einer Probe mühelos ausweichen kann. Solange der Schleim existiert, sind deine maximalen MP um die Kosten dieses Zaubers verringert. Du kannst den Schleim jederzeit verschwinden lassen, wodurch nur eine große Pfütze harmloser, wenn auch sehr unappetitlicher Flüssigkeit zurückbleibt. Der Schleim hat 100 KP und stirbt, wenn diese auf 0 fallen, ist aber immun gegen die meisten Quellen physischen Schadens."
        },
        {
            id: "bomber",
            name: "Bomber",
            level: 1,
            mpKosten: 10,
            magieschule: "beschwoerung",
            beschreibung: "Lässt eine von dir beschworene Kreatur explodieren. Die Größe der Explosion hängt von der Größe der Kreatur ab. Die Explosion richtet (ZK+2)W6 Schaden an."
        },
        {
            id: "eismauer",
            name: "Eismauer",
            level: 4,
            mpKosten: 10,
            magieschule: "beschwoerung",
            beschreibung: "Klatsche in die Hände und lasse sofort eine 50 Zentimeter dicke, 10 Meter hohe Eismauer vor dir aus dem Boden schießen, die Angriffe und Zauber abfangen kann. Die Mauer hat insgesamt 30 KP, bevor sie zersplittert, aber 15 oder mehr Schaden auf einmal zu nehmen, erzeugt eine große Lücke in der Mauer. Dieser Zauber kann als Reaktion verwendet werden."
        },
        {
            id: "erdelementar",
            name: "Erdelementar",
            level: 3,
            mpKosten: 16,
            magieschule: "beschwoerung",
            beschreibung: "Beschwört einen Erdelementar mit 40 KP, INIT 5 und einer GENA von 4. Der Erdelementar kann jede Runde Gravitas, Steinhaut oder Dornenpanzer einsetzen und verfügt über unbegrenzte MP. Du kannst den Erdelementar nicht kontrollieren. Er betrachtet dich als freundlich und wird dich nicht aktiv angreifen, deine Verbündeten aber schon! Er kann zufällig sich selbst oder dich mit Zaubern stärken. Wenn keine feindlichen Ziele in Reichweite sind, löst er sich auf und verschwindet."
        },
        {
            id: "feuerelementar",
            name: "Feuerelementar",
            level: 3,
            mpKosten: 16,
            magieschule: "beschwoerung",
            beschreibung: "Beschwört einen Feuerelementar mit 25 KP, INIT 8 und einer GENA von 4. Der Feuerelementar kann jede Runde Feuershphäre, Flammenpfeil oder Hitzewelle einsetzen und verfügt über unbegrenzte MP. Du kannst den Feuerelementar nicht kontrollieren. Er betrachtet dich als freundlich und wird dich nicht aktiv angreifen, deine Verbündeten aber schon! Er priorisiert Ziele, die ihm Schaden zufügen, und greift ansonsten ein zufälliges Ziel an, das er sieht. Wenn keine Ziele in Reichweite sind, löst er sich auf und verschwindet."
        },
        {
            id: "gedankenspinne",
            name: "Gedankenspinne",
            level: 4,
            mpKosten: 40,
            magieschule: "beschwoerung",
            beschreibung: "Beschwört eine kleine, unscheinbare Spinne. Solange diese direkt die Haut eines Ziels berührt, sendet sie die oberflächlichen Gedanken des Ziels direkt in deinen Kopf. Du kannst die Übertragung ein- und ausschalten; die Gedanken eines anderen für länger als ein paar Minuten zu hören, wird sehr schnell irritierend und führt zu Kopfschmerzen. Die Spinne ist zwar klein und ihre Berührung ist normalerweise nicht wahrnehmbar, aber sie ist nicht unsichtbar und kann mit einer Sinnesschärfe-Probe mit Schwierigkeit 3 oder, wenn jemand (inklusive das Ziel selbst) das Ziel direkt nach Auffälligkeiten absucht, mit einer Sinnesschärfe-Probe mit Schwierigkeit 1 entdeckt werden. Die Spinne hält bis zu eine Woche, du kannst sie aber jederzeit mit einem Gedanken verschwinden lassen. Solange die Spinne existiert, sind deine max MP um die Kosten dieses Zaubers verringert."
        },
        {
            id: "irrlicht",
            name: "Irrlicht",
            level: 1,
            mpKosten: 14,
            magieschule: "beschwoerung",
            beschreibung: "Erschafft ein etwa kopfgroßes Irrlicht. Das Irrlicht besteht komplett aus einer schwebenden Flamme, deren Farbe du bei der Erschaffung frei wählen kannst. Das Irrlicht kann sich bis zu so schnell bewegen, wie du rennen kannst. Bei der Erschaffung gibst du entweder eine Route vor, die das Irrlicht exakt abfliegt, oder einen Zielpunkt, zu dem es sich selbstständig den kürzest möglichen Weg sucht. Das Irrlicht macht, während es fliegt, durchgehend unheimliche Geräusche, um auf sich aufmerksam zu machen. Jeder außer dir, der das Irrlicht sieht, muss eine MA-Probe mit Schwierigkeit 2 bestehen oder wird von ihm in seinen Bann gezogen und magisch dazu gezwungen, ihm zu seinem Zielpunkt zu folgen. Sobald das Irrlicht seinen Zielpunkt erreicht, verschwindet es. Wenn das Irrlicht verschwindet oder ein von ihm gebanntes Ziel Schaden erleidet, erwacht das Ziel aus seiner Trance und ist für einen Moment extrem verwirrt und kann sich nicht erinnern, wie es hierher gekommen ist."
        },
        {
            id: "kleine fee",
            name: "Kleine Fee",
            level: 4,
            mpKosten: 30,
            magieschule: "beschwoerung",
            beschreibung: "Erschafft eine kleine Fee, die um ein während der Beschwörung designiertes Ziel herumfliegt. Die Beschwörung dauert etwa 10 Minuten. Wenn die KP des designierten Ziels jemals unter die Hälfte fallen (abgerundet), fährt die Fee in den Körper des Ziels ein und heilt seine LP um die Hälfte ihres Maximums (aufgerundet). Dein maximales Mana ist für jede existierende Fee um die Kosten dieses Zaubers reduziert. Ein Ziel kann nur von einer Fee zur Zeit begleitet werden."
        },
        {
            id: "kraehenschwarm",
            name: "Krähenschwarm",
            level: 1,
            mpKosten: 12,
            magieschule: "beschwoerung",
            beschreibung: "Beschwört einen Schwarm von etwa 2 Dutzend Krähen, den du steuern kannst. Du kannst durch die Augen jeder einzelnen Krähe sehen, solange du deine Augen geschlossen hast, und den Schwarm mit deinen Gedanken lenken. Der Schwarm kann sich nicht teilen, alle Krähen müssen zu jeder Zeit maximal 25 Meter von allen anderen Krähen entfernt sein. Der Schwarm bleibt dauerhaft bestehen, es sind echte, lebende Krähen. Du kannst den Zauber jederzeit lösen, wodurch die Krähen ein Bewusstsein entwickeln und sich wie normale Vögel verhalten. Solange du die Vögel direkt kontrollierst, können sie mit Magiewahrnehmung gespürt werden, und fähige Magier können den Weg deiner magischen Kontrolle nachvollziehen und so deine Position aufspüren!"
        },
        {
            id: "leben einhauchen",
            name: "Leben einhauchen",
            level: 1,
            mpKosten: 8,
            magieschule: "beschwoerung",
            beschreibung: "Hauche einem kleinen Objekt, das die Form eines Lebewesens hat (z.B. einem Stofftier) Leben ein. Du kannst das Objekt mit deinen Gedanken steuern und durch seine Augen sehen, wenn du deine Augen schließt. Solange du es nicht steuerst, kann es sich auch eigenständig bewegen und sehr rudimentäre Befehle ausführen. Das Objekt hat 10 KP und geht kaputt, wenn diese auf 0 fallen. Du kannst diesen Effekt jederzeit beenden. Deine maximalen MP sind für jedes Objekt, das du aktuell am Leben hältst, um die Kosten dieses Zaubers verringert."
        },
        {
            id: "mana-kristall",
            name: "Mana-Kristall",
            level: 3,
            mpKosten: 50,
            magieschule: "beschwoerung",
            beschreibung: "Erschafft einen etwa 1.5 Meter hohen, 80 Zentimater breiten, durchsichtigen Kristall in der Luft unmittelbar vor dir. Der Kristall schwebt und absorbiert automatisch das Mana von Zaubern, die ihn treffen würden, wodurch diese aufgelöst werden. Zauber, die nahe an ihm vorbei fliegen oder in seiner unmittelbaren Nähe eingesetzt werden, stärkt er stattdessen mit Mana aus der Umgebung, die er bündelt und abgibt. Zauber, die Schaden anrichten können und unmittelbar an ihm vorbeifliegen, fügen 50% mehr Schaden zu (aufgerundet). Der Kristall bleibt solange bestehen, bis du bewusstlos wirst, schlafen gehst oder ihn manuell verschwinden lässt. Solange er existiert, sind deine max MP um die Kosten dieses Zaubers verringert. Der Kristall schwebt zwar, wiegt aber trotzdem etwa 150 Kilo und ist entsprechend schwer zu bewegen!"
        },
        {
            id: "minion beschwoeren",
            name: "Minion beschwören",
            level: 1,
            mpKosten: 10,
            magieschule: "beschwoerung",
            beschreibung: "Führe ein einstündiges Ritual durch, um einen kleinen Minion zu beschwören. Der Minion sieht aus wie ein kleines Teufelchen, hat menschliche Intelligenz, kann aber nicht sprechen. Er gehorcht dir aufs Wort und wird jeden Befehl durchführen, selbst wenn es ihn umbringt. Solange der Minion existiert, sind dein maximalesn MP um die Wirkungskosten dieses Zaubers verringert. Der Minion hat 10 KP, INIT 5, 2 KÖ, 1 WI, 0 CH, 3 GL und 2 MA sowie einen Wert von 3 auf alle realistischen Attribute (z.B. Stehlen). Außerdem kann er fliegen, aber nicht schwimmen."
        },
        {
            id: "opferung",
            name: "Opferung",
            level: 3,
            mpKosten: 10,
            magieschule: "beschwoerung",
            beschreibung: "Opfert ein von dir beschworenes Wesen in einem zehnminütigen Ritual, um die LP von dir oder einem beliebigen anderen Ziel vollständig zu heilen."
        },
        {
            id: "rachegeist",
            name: "Rachegeist",
            level: 5,
            mpKosten: 0,
            magieschule: "beschwoerung",
            beschreibung: "Verflucht dich selbst mit einem mächtigen Rachegeist. Von dir geht durchgehend ein dunkles, fauliges Mana aus, das für jeden Magier abstoßend wirkt und selbst normale Menschen instinktiv dazu bringt, dir aus dem Weg zu gehen. Magier wissen instinktiv, dass das Miasma bedeutet, dass du von einem mächtigen Rachegeist besessen bist. Wenn du getötet wirst, wird der Rachegeist freigesetzt und denjenigen, der dich getötet hat, verfolgen, bis er oder das Ziel tot sind. Der Rachegeist verfügt über 500 KP, ist komplett immun gegen physischen Schaden, beherrscht 3 Zerstörungszauber, die der Spielleiter zufällig auswählt, und verfügt über unbegrenzte MP. Jeder Magier weiß, dass es eine sehr schlechte Idee ist, jemanden, der von einem Rachegeist besessen ist, zu töten. Der Rachegeist bleibt für immer bestehen. Du kannst den Effekt nicht manuell aufheben. Allerdings gibt es sehr mächtige heilige Magie, etwa in der Kirche, die den Fluch (über einen längeren Zeitraum) brechen kann. Den Rachegeist-Fluch zu wirken, dauert 12 Stunden, allerdings kannst du das auch schon vor Beginn des Spiels getan haben."
        },
        {
            id: "realitaetsriss",
            name: "Realitätsriss",
            level: 5,
            mpKosten: 20,
            magieschule: "beschwoerung",
            beschreibung: "Hüllt deinen Finger für eine Kampfrunde (5 Sekunden) in unglaublich starkes Mana. In diesem Zeitraum musst du mit deinem Finger einen Bereich auf einer festen, harten, zusammenhängenden, anorganischen Fläche (einer Wand, dem Boden usw.) umkreisen. Wird der Kreis rechtzeitig vervollständigt, erscheint in seinem Inneren für die nächsten 1W4+1 Stunden ein Portal. Solange nur ein Portal existiert, ist es lediglich ein Flimmern in der Lucht ohne Effekt. Sobald es mehrere Portale gibt, werden sie alle über beliebig große Distanz miteinander verbunden. Wer ein Portal betritt oder Gegenstände einführt, kann frei wählen, welches andere Portal der Ausgang sein soll. Jedes Portal hat eine individuelle Laufzeit. Pro offenem Portal sind deine max MP um die Kosten dieses Zaubers verringert."
        },
        {
            id: "ruestung erwecken",
            name: "Rüstung erwecken",
            level: 2,
            mpKosten: 12,
            magieschule: "beschwoerung",
            beschreibung: "Haucht einer Rüstung oder einem Set Klamotten Leben ein. Die Rüstung/Kleidung muss einen vollständigen Menschen formen (inklusive Helm/Kopfbedeckung!), damit dieser Zauber funktioniert. Die KP der Beschwörung hängen vom Material ab, aus dem es besteht; eine Eisenrüstung hat 50, Stoffklamotten 15. Die Beschwörung kann simple Nahkampfangriffe mit GENA 3 ausführen, die 3W6 Schaden verursachen, und hat INIT 4. Sie bewegt sich wie ein normaler Mensch und kann leicht für einen solchen gehalten werden, solange man nicht sieht, dass sie leer ist. Deine MP sind um die Hälfte der Kosten dieses Zaubers reduziert, solange die Beschwörung existiert. Du kannst sie jederzeit auflösen, wodurch die Rüstung/Kleidung zu Boden fällt."
        },
        {
            id: "saeurehund",
            name: "Säurehund",
            level: 4,
            mpKosten: 30,
            magieschule: "beschwoerung",
            beschreibung: "Beschwört eine hundeförmige Gestalt aus reiner, dickflüssiger Säure. Sie hat GENA 5, PA 4, INIT 6, 1 KP und fügt mit Bissen 10W6 ätzenden Säureschaden zu. Wenn der Hund Schaden nimmt, explodiert er sofort, was allen Zielen in bis zu einem Meter Entfernung 8W6 Säure-Schaden zufügt und den Zauber Säurenebel an der aktuellen Position des Hundes einsetzt. Du kannst den Hund beliebig lange bestehen lassen, aber solange er existiert, sind deine maximalen MP um seine Kosten verringert. Du kannst ihn jederzeit verschwinden lassen, wobei er nur eine Säure-Pfütze zurücklässt. Seine Pfotenabdrücke sind ebenfalls Säure!"
        },
        {
            id: "schattendoppelgaenger",
            name: "Schattendoppelgänger",
            level: 5,
            mpKosten: 50,
            magieschule: "beschwoerung",
            beschreibung: "Erweckt deinen eigenen Schatten zu Leben. Er hat exakt deine Kampfwerte, deine aktuellen MP (nach Wirken dieses Zaubers), kann deine Zauber wirken und verfügt über optische Kopien deines Equipments, das aber keine Effekte hat. Der Doppelgänger kann nicht sprechen, sich aber autonom bewegen. Er befolgt deine Befehle und hat dieselbe Intelligenz und dieselben Ziele wie du. Wenn er mit Sonnenlicht oder starkem künstlichem Licht in Berührung kommt (z.B. ein Bühnenscheinwerfer), verschwindet er einfach und der Zauber endet. Solange dein Schattendoppelgänger aktiv ist, hast du keinen Schatten und deine max MP sind um die Kosten dieses Zaubers reduziert."
        },
        {
            id: "schattengestalt",
            name: "Schattengestalt",
            level: 1,
            mpKosten: 10,
            magieschule: "beschwoerung",
            beschreibung: "Erweckt den Schatten eines kleinen Objekts oder Lebewesens zum Leben. Das Objekt/Lebewesen wirft keinen Schatten, solange dieser unterwegs ist! Der Schatten bekommt von dir ein Gebiet zugewiesen und patrouilliert durch dieses. Er wird dir telepathische Bilder schicken, wann immer jemand oder etwas das Gebiet betritt. Er bleibt beliebig lange bestehen, reduziert aber deine maximalen MP um seine Wirkungskosten, solange er existiert. Wird der Schatten 'zerstört', etwa durch einen starken Scheinwerfer oder in kompletter Finsternis, verschwindet er vorzeitig."
        },
        {
            id: "schlangenregen",
            name: "Schlangenregen",
            level: 2,
            mpKosten: 10,
            magieschule: "beschwoerung",
            beschreibung: "Lässt hunderte große Schlagen in einem Zielgebiet vom Himmel regnen. Die Schlangen haben jeweils 5 KP und INIT 8. Sie versuchen, vom Schlachtfeld zu fliehen, greifen dabei aber jeden in ihrem Weg an. Sie haben eine GENA von 3 und getroffene Ziele werden vergiftet und nehmen jede Runde (alle 5 Sekunden) 1W6 Schaden, bis sie bewusstlos werden. Wird das Gift nicht geheilt, ist es innerhalb von 48 Stunden tödlich."
        },
        {
            id: "schluessel formen",
            name: "Schlüssel formen",
            level: 1,
            mpKosten: 6,
            magieschule: "beschwoerung",
            beschreibung: "Erschafft einen Schlüssel in deiner Hand, der genau in ein Schloss passt, das du zuvor analysiert hast. Um ein Schloss zu analysieren, musst du eine Schließtechnik-Probe bestehen. Der Schlüssel bleibt dauerhaft bestehen."
        },
        {
            id: "spinnenbrut",
            name: "Spinnenbrut",
            level: 2,
            mpKosten: 16,
            magieschule: "beschwoerung",
            beschreibung: "Erzeugt einen großen, pulsierenden Kokon mit über einem Meter Durchmesser in Sichtweite. Wenn der Kokon irgendwelchen Schaden nimmt, platzt er auf und unzählige Spinnen strömen daraus hervor. Die Spinnen stürzen sich auf alle Ziele, die sie sehen können (inklusive der selbst, wenn du nicht aufpasst). Solange ein Ziel von Spinnen gebissen wird, verliert es zu Beginn jeder seiner Runden 1W6 MP, die die Spinnen absorbieren. Ziele müssen eine CH-Probe bestehen, um nicht in Panik zu verfallen und ihre Runde damit verbringen zu müssen, schreiend vor den Spinnen zu fliehen."
        },
        {
            id: "steinsaeule",
            name: "Steinsäule",
            level: 3,
            mpKosten: 20,
            magieschule: "beschwoerung",
            beschreibung: "Lege die Hände auf den Boden und lasse sofort eine Steinsäule mit einem Meter Durchmesser unter dir aus dem Boden Schießen. Die Säule ist bis zu 20 Meter hoch, die genaue Höhe kannst du beliebig festlegen. Du kannst diesen Zauber als Reaktion einsetzen, um automatisch einem Angriff oder Zauber auszuweichen, indem du die Säule unter dir erscheinen und dich aus dem weg heben lässt."
        },
        {
            id: "superduenger",
            name: "Superdünger",
            level: 2,
            mpKosten: 10,
            magieschule: "beschwoerung",
            beschreibung: "Lässt alle Pflanzen, die du berührst, mit extremer Geschwindigkeit wachsen. Betroffene Pflanzen haben zudem perfekte Gesundheit und sind immun gegen jede Form von Befall, Gift usw. Aus einem Setzling kann so in Minuten ein 20 Meter hoher Baum werden.Pflanzen können so aber nicht wesentlich größer werden, als ihr normales Maximum an Größe."
        },
        {
            id: "tor zur waffenkammer",
            name: "Tor zur Waffenkammer",
            level: 2,
            mpKosten: 8,
            magieschule: "beschwoerung",
            beschreibung: "Lässt sofort eine Waffe oder einen anderen Gegenstand, den du mit einer Hand halten kannst, in deiner Hand erscheinen. Der Gegenstand muss sich in deinem Besitz befinden, um von diesem Effekt betroffen zu sein, du kannst diesen Zauber nicht zum Stehlen benutzen! Der Zauber hat eine unendliche Reichweite."
        },
        {
            id: "trampo-pilz",
            name: "Trampo-Pilz",
            level: 1,
            mpKosten: 6,
            magieschule: "beschwoerung",
            beschreibung: "Lässt einen riesigen, weichen Pilz aus dem Boden schießen, der elastisch wie Gummi ist. Auf den Pilz zu springen, erlaubt es, bis zu fünfmal so hoch zu springen wie normal und gewährt +3 automatische Erfolge auf Springen-Proben. Der Pilz bleibt dauerhaft bestehen, ist aber viel größer als normale Pilze und entsprechend auffällig für Nicht-Magier."
        },
        {
            id: "tierruf",
            name: "Tierruf",
            level: 1,
            mpKosten: 6,
            magieschule: "beschwoerung",
            beschreibung: "Ruft 1W4+1 normale Tiere (z.B. Wölfe, Raben oder Ratten) herbei, die dir dienen. Die Tiere führen einfache Befehle aus und kämpfen sogar für dich, wobei ihre Werte je nach Spezies variieren. Du kannst nicht kontrollieren, was du für Tiere beschwörst, das hängt von der Willkür des Spielleiters und deiner Anzahl Erfolge bei der MA-Probe ab. "
        },
        {
            id: "ueberlaeufer",
            name: "Überläufer",
            level: 4,
            mpKosten: 0,
            magieschule: "beschwoerung",
            beschreibung: "Übernimmt dauerhaft die Kontrolle über ein von einem anderen Magier beschworenes Wesen, das du mit beiden Händen berührst. Das Wesen sieht dich anschließend als seinen neuen Meister an und glaubt, dass du es beschworen hättest. Der ursprüngliche Beschwörer kann das Wesen nicht mehr beliebig verschwinden lassen, da es jetzt an dein Mana gebunden ist. Wenn das Wesen die maximalen MP seines Beschwörers reduziert, betrifft der Effekt dich als neuen Beschwörer! Die Kosten dieses Zaubers sind so hoch wie die Kosten des Wesens."
        },
        {
            id: "verbannung",
            name: "Verbannung",
            level: 3,
            mpKosten: 0,
            magieschule: "beschwoerung",
            beschreibung: "Verbannt sofort ein durch Magie beschworenes Wesen in Sichtweite, wodurch seine Existenz komplett von dieser Welt getilgt wird. Dieser Zauber ist ein Instant-Kill-Button gegen Beschwörungen. Seine Kosten entsprechen dem Doppelten der Grundkosten der Beschwörung, die du auslöschen willst."
        },
        {
            id: "wahrheitsprisma",
            name: "Wahrheitsprisma",
            level: 1,
            mpKosten: 10,
            magieschule: "beschwoerung",
            beschreibung: "Erschafft ein kleines, hübsches Prisma, das das Licht bricht. Wenn jemand in der unmittelbaren Nähe (max. 5 Meter) lügt, ändert sich die Farbe des Prismas für 10 Sekunden von weiß zu schwarz. Nachdem das Prisma insgesamt dreimal schwarz geworden ist, platzt es und wird zu Scherben."
        },
        {
            id: "waldgolem",
            name: "Waldgolem",
            level: 4,
            mpKosten: 26,
            magieschule: "beschwoerung",
            beschreibung: "Haucht einem oder mehreren Bäumen, die du berührst, Leben ein. Die Bäume wachsen zu einer einzelnen Kreatur zusammen, die sich autonom bewegen kann. Beim Erschaffungsprozess des Golems kannst du ihn nach deinen Vorstellungen formen (aufrecht gehend, auf vielen Beinen laufend, lang, gedungen usw.). Die Statuswerte des Golems hängen davon ab, wie viele und wie große Bäume du für die Erschaffung verwendest. Ein einzelner großer Baum gibt 80 KP, INIT 5, eine GENA und PA von 4 und einen Schadenswert von 5W6 mit Nahkampfangriffen. KP und Schaden erhöhen sich mit mehr/größeren Bäumen, INIT verringert sich, GENA und PA sind abhängig von der Körperform. Der Golem hat kein Bewusstsein, kann aber mit simplen Befehlen wie „Patrouilliere!“ auf Autopilot gestellt werden. Er gehorcht dir aufs Wort und wird jeden Befehl ausführen, sofern möglich. Solange der Golem existiert, sind deine maximalen MP um die Kosten dieses Zaubers reduziert. Um den Golem zu zerstören und deine maximalen MP zurückzubekommen, musst du ihn berühren. Wenn du das tust, werden deine aktuellen MP nicht erhöht, nur die maximalen."
        },
        {
            id: "wasserelementar",
            name: "Wasserelementar",
            level: 3,
            mpKosten: 16,
            magieschule: "beschwoerung",
            beschreibung: "Beschwört einen Wasserelementar mit 30 KP, INIT 6 und einer GENA von 3. Der Wasserelementar kann jede Runde Eisblitz, Wassertorpedo oder Frostrune einsetzen und verfügt über unbegrenzte MP. Du kannst den Wasserelementar nicht kontrollieren. Er betrachtet dich als freundlich und wird dich nicht aktiv angreifen, deine Verbündeten aber schon! Er priorisiert Ziele, die ihm Schaden zufügen, und greift ansonsten ein zufälliges Ziel an, das er sieht. Er wird, wenn er erscheint, sofort 1W6 Frostrunen an zufälligen Positionen um sich herum erschaffen. Wenn keine Ziele in Reichweite sind, löst er sich auf und verschwindet."
        },
        {
            id: "wegweiser",
            name: "Wegweiser",
            level: 2,
            mpKosten: 20,
            magieschule: "beschwoerung",
            beschreibung: "Beschwört eine kleine Fee, die immer in deiner Nähe bleibt und dich sehr gern hat. Sie erinnert an ein großes, goldenes Glühwürmchen und kann in simplen Phrasen mit dir kommunizieren. Die Fee entdeckt automatisch alle Fallen in deiner direkten Umgebung (z.B. magische Runen, aber auch Fallgruben und dergleichen) und warnt dich vor ihnen. Sie hat 1 KP und verschwindet sofort, wenn sie Schaden nimmt. Du kannst die Fee auch auf eine andere Person übertragen, wodurch sie durchgehend um diese herumschwirrt und stattdessen sie warnt. Die Fee ist extrem nervig und hört nicht auf, Geräusche zu machen. Für jede Fee, die du beschworen hast, sind deine maximalen MP um die Kosten dieses Zaubers verringert. Du kannst eine von dir beschworene Fee jederzeit verschwinden lassen."
        },
        {
            id: "windelementar",
            name: "Windelementar",
            level: 3,
            mpKosten: 16,
            magieschule: "beschwoerung",
            beschreibung: "Beschwört einen Windelementar mit 20 KP, INIT 10 und einer GENA von 3. Der Windelementar kann jede Runde Wirbelwind, Hast oder Blitzeinschlag einsetzen und verfügt über unbegrenzte MP. Du kannst den Windelementar nicht kontrollieren. Er betrachtet dich als freundlich und wird dich nicht aktiv angreifen, deine Verbündeten aber schon! Er priorisiert Ziele, die ihm Schaden zufügen, und greift ansonsten ein zufälliges Ziel an, das er sieht. Wenn keine feindlichen Ziele in Reichweite sind, löst er sich auf und verschwindet."
        },
        {
            id: "zauberschloss",
            name: "Zauberschloss",
            level: 1,
            mpKosten: 6,
            magieschule: "beschwoerung",
            beschreibung: "Erschafft ein kleines magisches Vorhängeschloss inklusive Schlüssel. Das Schloss ist mit nicht-magischen Mittel extrem schwer (aber nicht unmöglich) zu knacken oder aufzubrechen."
        }
    ],
    
    /**
     * Gibt alle verfügbaren Zauber zurück
     * @returns {Array} Liste aller Zauber
     */
    getAllZauber: function() {
        return this.zauber;
    },
    
    /**
     * Gibt einen bestimmten Zauber anhand seiner ID zurück
     * @param {string} id - Die ID des gesuchten Zaubers
     * @returns {Object|null} Der gefundene Zauber oder null, wenn nicht gefunden
     */
    getZauberById: function(id) {
        return this.zauber.find(zauber => zauber.id === id) || null;
    },
    
    /**
     * Gibt einen bestimmten Zauber anhand seines Namens zurück
     * @param {string} name - Der Name des gesuchten Zaubers
     * @returns {Object|null} Der gefundene Zauber oder null, wenn nicht gefunden
     */
    getZauberByName: function(name) {
        return this.zauber.find(zauber => zauber.name === name) || null;
    },
    
    /**
     * Gibt alle Zauber einer bestimmten Magieschule zurück
     * @param {string} schule - Die ID der Magieschule
     * @returns {Array} Liste aller Zauber der angegebenen Schule
     */
    getZauberByMagieschule: function(schule) {
        return this.zauber.filter(zauber => zauber.magieschule === schule);
    },
    
    /**
     * Gibt alle Zauber eines bestimmten Levels zurück
     * @param {number} level - Das Level der gesuchten Zauber
     * @returns {Array} Liste aller Zauber des angegebenen Levels
     */
    getZauberByLevel: function(level) {
        return this.zauber.filter(zauber => zauber.level === level);
    }
};

// itemService.js - Service für die Verwaltung von Gegenständen

const itemService = {
    // Alle verfügbaren Gegenstände mit ihren Beschreibungen
    items: [
        {
            id: "axt",
            name: "Axt",
            beschreibung: "Eine beliebige Axt (Feuerwehr-, Holzfäller-, Streitaxt...). Variierende Auffälligkeit. GENA + Nahkampf. (KÖ+2)W6 Schaden.",
            anzahl: 1
        },
        {
            id: "giftiger dolch",
            name: "Giftiger Dolch",
            beschreibung: "Ein kleiner Dolch, leicht zu verstecken. Seine Klinge ist in ein potentes Gift getaucht. Ziele, die von dem Dolch geritzt werden, werden vergiftet und nehmen nach jeder Runde (alle 5 Sekunden) 1W6 Schaden, bis sie bewusstlos werden. Nach 48 Stunden wirkt das Gift tödlich. GENA + Nahkampf. Schaden: 1W6",
            anzahl: 1
        },
        {
            id: "kampfstab",
            name: "Kampfstab",
            beschreibung: "Ein über 2 Meter langer Stab aus dickem Holz. GENA + Nahkampf. Schaden: KÖ W6.",
            anzahl: 1
        },
        {
            id: "schwert",
            name: "Schwert",
            beschreibung: "Ein einhändiges Schwert. Das genaue Design kannst du beliebig anpassen, z.B. auch als Klinge in einem Regenschirm oder einer Armprothese. GENA + Nahkampf. Je nach Art der Klinge mehr oder weniger auffällig. Schaden: (KÖ+1)W6",
            anzahl: 1
        },
        {
            id: "speer",
            name: "Speer",
            beschreibung: "Ein über 2 Meter langer Speer. GENA +  Nahkampf. Relativ auffällig. Schaden: (KÖ+1)W6.",
            anzahl: 1
        },
        {
            id: "tonfas",
            name: "Tonfas",
            beschreibung: "Ein Paar Schlagstöcke. Wenn du mit dieser Waffe angreifst und zwei Tonfas ausgerüstet hast, kannst du zweimal angreifen, einmal pro Schlagstock in deinen Händen. GENA + Nahkampf. Schaden: KÖ W6 - 3 pro Schlag.",
            anzahl: 2
        },
        {
            id: "armbrust",
            name: "Armbrust",
            beschreibung: "Eine Armbrust inklusive Köcher mit 10 Bolzen. Sehr auffällig. GENA + Schießen. Die Bolzen können aufgesammelt und wiederverwertet werden. Nachzuladen dauert eine ganze Runde! Schaden: 4W6",
            anzahl: 10
        },
        {
            id: "blasrohr",
            name: "Blasrohr",
            beschreibung: "Ein kleines Blasrohr inklusive 5 giftigen Pfeilen. Sie vergiften ihr Ziel, was jede Runde (alle 5 Sekunden) 1W6 Schaden verursacht, bis das Ziel bewusstlos wird. Das Gift tötet innerhalb von 48 Stunden, wenn es nicht behandelt wird. Sehr unauffällig. GENA + Schießen. Die kleinen Blasrohrpfeile können aufgesammelt und mehrfach verwendet werden, müssen aber erst erneut in Gift getaucht werden! Schaden: 0.",
            anzahl: 5
        },
        {
            id: "bogen",
            name: "Bogen",
            beschreibung: "Ein einfacher Bogen inklusive Köcher mit 10 Pfeilen. Ziemlich auffällig in der modernen Zeit. GENA + Schießen. Die Pfeile können aufgesammelt und wiederverwertet werden. Schaden: 2W6. Die Pfeile können z.B. in Gift getaucht werden, um zusätzliche Effekte zu erlangen.",
            anzahl: 10
        },
        {
            id: "gewehr",
            name: "Gewehr",
            beschreibung: "Einfaches Jagdgewehr inklusive 6 Schuss Munition. Relativ auffällig. GENA + Schießen. Schaden: 8W6.",
            anzahl: 6
        },
        {
            id: "maschinenpistole",
            name: "Maschinenpistole",
            beschreibung: "Eine vollautomatische Maschinenpistole inklusive 18 Schuss Munition. GENA + Schießen. Du kannst statt einmal bis zu fünfmal in einer Runde mit dieser Waffe schießen, aber für jeden einzelnen Schuss ist dann die GENA-Probe um die Anzahl Schüsse erschwert (bei 5 Schüssen also -5), bis zu einem Minimum von 1. Schaden: 4W6 pro Schuss, der trifft.",
            anzahl: 18
        },
        {
            id: "pistole",
            name: "Pistole",
            beschreibung: "Einfache Faustfeuerwaffe inklusive 6 Schuss Munition. GENA + Schießen. Schaden: 6W6.",
            anzahl: 6
        },
        {
            id: "schrotflinte",
            name: "Schrotflinte",
            beschreibung: "Schrotflinte mit 6 Patronen. Sehr auffällig. Geringe Reichweite, kann aber mehrere Ziele direkt vor dir gleichzeitig treffen. GENA + Schießen. Schaden: 8W6.",
            anzahl: 6
        },
        {
            id: "bajonett",
            name: "Bajonett",
            beschreibung: "Wird an einem Gewehr oder einer Flinte angebracht. Die Waffe kann auch als Nahkampfwaffe verwendet werden, die 4W6 Schaden verursacht.",
            anzahl: 1
        },
        {
            id: "laser-aufsatz",
            name: "Laser-Aufsatz",
            beschreibung: "Wird an einem Gewehr angebracht. Erhöht deinen Schießen-Wert beim Umgang mit der Waffe um 2.",
            anzahl: 1
        },
        {
            id: "schalldaempfer",
            name: "Schalldämpfer",
            beschreibung: "Macht Schüsse leiser.",
            anzahl: 1
        },
        {
            id: "taschenlampe",
            name: "Taschenlampe",
            beschreibung: "Kann an einem Gewehr angebracht werden oder „stand-alone“ gekauft werden. Macht Licht.",
            anzahl: 1
        },
        {
            id: "zielfernrohr",
            name: "Zielfernrohr",
            beschreibung: "Wird an einem Gewehr angebracht. Erlaubt es, ohne Erschweren oder mit signifikant geringerer Erschwernis Ziele in großer Reichweite zu treffen.",
            anzahl: 1
        },
        {
            id: "munition",
            name: "Munition",
            beschreibung: "Ein zusätzliches Magazin oder zusätzliche Munition für eine beliebige Schusswaffe. Noch mal so viel Schuss, wie die Waffe normalerweise hat.",
            anzahl: 1
        },
        {
            id: "munition_magiebrechend",
            name: "Magiebrechende Munition",
            beschreibung: "Wird zusätzlich zu einer Schusswaffe gekauft. Die Munition dieser Waffe erhält folgenden Zusatzeffekt: Ziele, die von den Projektilen getroffen werden, müssen für eine Stunde immer, wenn sie zaubern wollen, eine MA-Probe mit Schwierigkeit 1 bestehen, oder ihr Zauber wird blockiert. Blockierte Zauber kosten kein Mana, verschwenden aber die Aktion des Ziels. Kann auch auf magische Barrieren, Fallen usw. geschossen werden, um diese zu zerbrechen.",
            anzahl: 1
        },
        {
            id: "munition_panzerbrechend",
            name: "Panzerbrechende Munition",
            beschreibung: "Wird zusätzlich zu einer Schusswaffe gekauft. Die Munition dieser Waffe erhält folgenden Zusatzeffekt: Diese Schüsse ignorieren jede Form von Rüstung oder nicht-magischer Schadensverringerung und können Wände durchschießen.",
            anzahl: 1
        },
        {
            id: "pfeile_beruhigungsmittel",
            name: "Pfeile (Beruhigungsmittel)",
            beschreibung: "5 Pfeile oder Bolzen, die ihr Ziel in Tiefschlaf versetzen. Ein getroffenes Ziel muss zu Beginn jeder seiner Runden eine KÖ-Probe bestehen oder schläft ein. Schläft ein Ziel einmal, wacht es erst nach 2W6 Stunden wieder auf ODER wenn es signifikanten Schaden nimmt. Ziele mit einem hohen Widerstand-Wert, z.B. große Tiere oder mächtige Magier, können dem Effekt sehr lange oder sogar komplett widerstehen. Die Pfeile verlieren ihr Beruhigungsmittel nach einem Treffer, können danach aber noch als normale Pfeile benutzt werden.",
            anzahl: 5
        },
        {
            id: "pfeile_explosiv",
            name: "Pfeile (Explosiv)",
            beschreibung: "5 mit Sprengstoff präparierte Pfeile oder Bolzen, die sofort explodieren, wenn sie ein Ziel treffen. Zusätzlich zum normalen Schaden des Pfeiltreffers richtet die Detonation 6W6 Schaden an dem Ziel und allen anderen Zielen in 2 Metern Reichweite um es herum an. Die Pfeile werden bei ihrem Einsatz vollständig zerstört (auch wenn sie verfehlen).",
            anzahl: 5
        },
        {
            id: "pfeile_giftig",
            name: "Giftpfeile",
            beschreibung: "5 Pfeile oder Bolzen, die ihr Ziel vergiften. Vergiftete Ziele nehmen nach jeder Runde 1W6 Schaden, bis sie bewusstlos sind. Das Gift wirkt nach 48 Stunden tödlich.",
            anzahl: 5
        },
        {
            id: "kevlar-jeans",
            name: "Kevlar-Jeans",
            beschreibung: "Reduziert allen eingehenden physischen Schaden an deinen Beinen, selbst von Gewehren oder Schrotflinten, um 3W6, auf ein Minimum von 1. Die Hose kann sich abnutzen, wenn sie zu viel Schaden absorbiert!",
            anzahl: 1
        },
        {
            id: "kevlar-weste",
            name: "Kevlar-Weste",
            beschreibung: "Reduziert allen eingehenden physischen Schaden an deinem Torso, selbst von Gewehren oder Schrotflinten, um 3W6, auf ein Minimum von 1. Die Weste kann sich abnutzen, wenn sie zu viel Schaden absorbiert!",
            anzahl: 1
        },
        {
            id: "polizei-schild",
            name: "Polizei-Schild",
            beschreibung: "Ein kugelsicherer Turmschild. Solange du den Schild trägst, sind GENA-Proben gegen dich um 2 erschwert, auf ein Minimum von 1. Manche offensiven Zauber können den Schild ignorieren oder sogar zerstören. Wenn der Schild dich vor besonders starken Angriffen schützt, kann er beschädigt werden! Du kannst deine Aktion im Kampf nutzen, um den Schild wie einen Schutzwall vor dir auf dem Boden aufzustellen und dich dahinter zu verstecken. Solange du dich versteckst, sind GENA-Proben gegen dich um 4 erschwert, auf ein Minimum von 1.",
            anzahl: 1
        },
        {
            id: "elixier_der_groesse",
            name: "Elixier der Größe",
            beschreibung: "Eine kleine Phiole mit einem orangenen Trank. Wenn ein Ziel den gesamten Inhalt der Phiole trinkt, wächst es innerhalb einer Kampfrunde (5 Sekunden) auf das Fünffache seiner normalen Körpergröße. Der KÖ-Wert des Ziels ist verfünffacht. Schaden, den das Ziel mit physischen Nahkampfangriffen anrichtet, ist um 10W6 erhöht. Die erhöhte Körpergröße ist extrem anstrengend für den Körper des Ziels und fügt ihm nach jeder Runde (alle 5 Sekunden) 2W6 Schaden zu. Wenn die LP des Ziels auf 0 fallen, schrumpft es automatisch auf seine normale Größe zurück, bevor es bewusstlos wird. Ein Ziel kann diesen Effekt jederzeit vorzeitig beenden und sich auf seine normale Größe zurückschrumpfen.",
            anzahl: 1
        },
        {
            id: "elixier_der_kaelte",
            name: "Elixier der Kälte",
            beschreibung: "Eine kleine Phiole mit einem eisblauen Trank. Wenn ein Ziel den gesamten Inhalt der Phiole trinkt, geht sein Körper sofort in eine Starre über. Das Ziel wird bewusstlos, seine Körpertemperatur sinkt auf den Gefrierpunkt und es stellt alle lebenswichtigen Funktionen ein. Dieser Effekt ist gewissermaßen ein erzwungener Winterschlaf und hält bis zu eine Woche! Der Effekt kann beendet werden, indem man den Körper Hitze aussetzt, aber auch, indem man das Ziel aufweckt (z.B. durch Schaden).",
            anzahl: 1
        },
        {
            id: "elixier_der_praezision",
            name: "Elixier der Präzision",
            beschreibung: "Eine kleine Phiole mit einem lilanen Trank. Wenn ein Ziel den gesamten Inhalt der Phiole trinkt, werden seine Augen schärfer und seine Reflexe schneller. Sein GENA-Wert ist für eine Stunde um 5 erhöht und es erhält einen automatischen Erfolg auf Sinnesschärfe- und Suchen-Proben.",
            anzahl: 1
        },
        {
            id: "elixier_der_schnelligkeit",
            name: "Elixier der Schnelligkeit",
            beschreibung: "Du erhältst für eine Stunde übermenschliche Schnelligkeit. Dein INIT-Wert ist um 10 erhöht und deine BW verfünffacht und du kannst absolut allem ausweichen, inklusive Schusswaffen. Außerdem erhältst du beliebig viele Reaktionen pro Runde. Wenn du versuchst, auszuweichen, würfelst du zweimal und nimmst das bessere Ergebnis.",
            anzahl: 1
        },
        {
            id: "elixier_der_unsichtbarkeit",
            name: "Elixier der Unsichtbarkeit",
            beschreibung: "Eine kleine Phiole mit einem durchsichtigen Trank. Wenn ein Ziel den gesamten Inhalt der Phiole trinkt, wird es für 30 Minuten komplett unsichtbar. Einen offensiven Zauber zu wirken oder einem Ziel Schaden zuzufügen, beendet diesen Effekt vorzeitig.",
            anzahl: 1
        },
        {
            id: "elixier_der_unsterblichkeit",
            name: "Elixier der Unsterblichkeit",
            beschreibung: "Eine kleine Phiole mit einem grellgelben Trank. Wenn ein Ziel den gesamten Inhalt der Phiole trinkt, wird es für eine Stunde komplett unsterblich. Es nimmt keine Wunden, egal was passiert, kann aber noch immer bewusstlos werden. Wenn der Effekt endet während das Ziel in einem lebensuntüchtigen Zustand ist, nimmt es sofort eine Anzahl Wunden, die der Spielleiter für angemessen hält.",
            anzahl: 1
        },
        {
            id: "elixier_der_verjuengung",
            name: "Elixier der Verjüngung",
            beschreibung: "Eine kleine Phiole mit einem golden schimmernden Trank. Wenn ein Ziel den gesamten Inhalt der Phiole trinkt, verjüngt sich sein Körper über die nächsten 15 Minuten um bis zu 50 Jahre, abhängig vom Alter des Ziels. Die Lebenserwartung des Ziels erhöht sich entsprechend. Dieser Effekt ist permanent.",
            anzahl: 1
        },
        {
            id: "elixier_des_gluecks",
            name: "Elixier des Glücks",
            beschreibung: "Eine kleine Phiole mit einem dunkelgrünen Trank. Wenn ein Ziel den gesamten Inhalt der Phiole trinkt, erhält es sofort 1W6+1 zusätzliche Glücks-Tokens. Diese werden immer zuerst aufgebraucht, vor denen, die sich erneuern.",
            anzahl: 1
        },
        {
            id: "elixier_des_magnetismus",
            name: "Elixier des Magnetismus",
            beschreibung: "Eine kleine Phiole mit einem Trank, der auf einer Seite blau und auf der anderen rot ist. Wenn ein Ziel den gesamten Inhalt der Phiole trinkt, wird sein Körper für eine Stunde extrem stark magnetisch. Das Ziel kann kleinere metallene Gegenstände anziehen oder an schweren Gegenständen „festkleben“. Das Ziel kann die Stärke seines Magnetismus jederzeit willkürlich anpassen.",
            anzahl: 1
        },
        {
            id: "elixier_des_wassergaengers",
            name: "Elixier des Wassergängers",
            beschreibung: "Eine kleine Phiole mit einem hellblauen Trank. Wenn ein Ziel den gesamten Inhalt der Phiole trinkt, kann er für 24 Stunden auf dem Wasser gehen und unter Wasser atmen.",
            anzahl: 1
        },
        {
            id: "elixier_des_zorns",
            name: "Elixier des Zorns",
            beschreibung: "Eine kleine Phiole mit einem dunkelroten Trank. Wenn ein Ziel den gesamten Inhalt der Phiole trinkt, verfällt es in tiefe Rage. Aller Schaden, den das Ziel mit physischen Nahkampfangriffen zufügt, wird verdoppelt, aber es kann Freund und Feind nicht unterscheiden und greift willkürlich alles um sich herum an. Außerdem zerstört es Gegenstände um sich herum und macht lauten Krach. Dieser Effekt hält an, bis das Ziel bewusstlos wird, entweder durch Schaden, oder weil es vor Erschöpfung zusammenbricht.",
            anzahl: 1
        },
        {
            id: "flug-elixier",
            name: "Flug-Elixier",
            beschreibung: "Eine kleine Phiole mit einem weißen Trank. Wenn ein Ziel den gesamten Inhalt der Phiole trinkt, kann es für 30 Minuten frei fliegen. Es kann etwa so schnell fliegen wie es joggen kann. Das Ziel weiß immer genau, wie lange der Effekt noch anhält, sodass es rechtzeitig landen kann.",
            anzahl: 1
        },
        {
            id: "baerenfalle",
            name: "Bärenfalle",
            beschreibung: "Eine Bärenfalle. Kann zur Jagd genutzt werden. Ein Ziel, das in die Falle tritt, verliert 50% seiner aktuellen KP (aufgerundet).",
            anzahl: 1
        },
        {
            id: "blendgranate",
            name: "3 Blendgranaten",
            beschreibung: "Eine etwa faustgroße Granate, die in einem grellen Lichtblitz detoniert. Jedes Ziel, das im Umkreis der Detonation ist (egal, in welche Richtung es guckt), wird sofort für eine Runde (5 Sekunden) geblendet und desorientiert. Geblendete Ziele schaffen GENA-Proben automatisch nicht (können aber mit Flächenangriffen weiterhin gefährlich sein).",
            anzahl: 3
        },
        {
            id: "brandbombe",
            name: "3 Brandbomben",
            beschreibung: "3 Brandbomben. Molotov-Cocktails, aber stärker. Können mit Werfen geworfen werden. Platzen in einer gewaltigen Stichflamme auf, wenn sie auf ein Ziel treffen, und fügen 6W6 Schaden plus Verbrennungen zu. Ein Ziel muss sich auf den Boden werfen und eine Widerstand-Probe bestehen, um sich zu löschen. Solange ein Ziel brennt, nimmt es nach jeder seiner Runden 2W6 Schaden.",
            anzahl: 3
        },
        {
            id: "dietrichset",
            name: "Dietrichset",
            beschreibung: "Ein Set mit 3 Dietrichen, um Schlösser zu knacken. Bei misslungenen Proben kann es passieren, dass ein Dietrich abbricht. Ohne passendes Werkzeug ist Schlösser knacken je nach Art des Schlosses extrem erschwert.",
            anzahl: 3
        },
        {
            id: "gegengift",
            name: "3 Gegengifte",
            beschreibung: "3 kleine Fläschchen mit einem besonderen Antiserum, das jedes Gift heilen kann. Ein Fläschchen muss vollständig leer getrunken werden, damit das Gegengift wirkt.",
            anzahl: 3
        },
        {
            id: "gift",
            name: "3 Giftphiolen",
            beschreibung: "Ein kleines Fläschchen mit einem extrem starken Gift. Ein Ziel, das das Gift vollständig konsumiert, nimmt jede Runde (alle 5 Sekunden) 4W6 Schaden, bis es bewusstlos wird, und stirbt nach 12 Stunden ohne Behandlung.",
            anzahl: 3
        },
        {
            id: "handschellen",
            name: "Handschellen",
            beschreibung: "Einfache metallene Handschellen inklusive Schlüssel. Ein Ziel muss eine Akrobatik-Probe mit Schwierigkeit 3 oder eine Stärke-Probe mit Schwierigkeit 4 schaffen, um sich ohne den Schlüssel von Handschellen zu befreien.",
            anzahl: 1
        },
        {
            id: "heiltrank",
            name: "3 Heiltränke",
            beschreibung: "3 kleine Phiolen mit einem tiefroten Trank darin. Wenn ein Ziel den gesamten Inhalt der Phiole trinkt, werden seine LP sofort um 30 geheilt.",
            anzahl: 3
        },
        {
            id: "manatrank",
            name: "3 Manatränke",
            beschreibung: "3 kleine Phiolen mit einem tiefblauen Trank darin. Wenn ein Ziel den gesamten Inhalt der Phiole trinkt, werden seine MP sofort um 50 geheilt.",
            anzahl: 3
        },
        {
            id: "rauch-phiole",
            name: "3 Rauch-Phiolen",
            beschreibung: "3 kleine Glasfläschchen. Wenn eines aufgeht, bricht daraus ein dichter Qualm hervor, der innerhalb von 5 Sekunden eine etwa 5x5x5 Meter große Rauchwolke bildet. Angriffe in oder durch die Rauchwolke werden mit halbiertem GENA-Wert (aufgerundet) gewürfelt. Im Rauch kann man Dinge und Personen nur schemenhaft erkennen, die Wolke ist ideal dazu geeignet, einen Abgang zu machen.",
            anzahl: 3
        },
        {
            id: "teleportpulver",
            name: "Teleportpulver",
            beschreibung: "Ein kleines Säckchen mit einer Handvoll dunkelblauem Pulver darin. Du kannst einige Körnchen des Pulvers an deiner aktuellen Position verstreuen, um diese Position als „Zielpunkt“ festzulegen. Du kannst das gesamte Pulver so werfen, dass es dich oder ein Ziel einhüllt. Das betroffene Ziel wird dann sofort an den letzten festgelegten Zielpunkt teleportiert. Du kannst auch mehrere Ziele teleportieren, die sehr nah beieinanderstehen. Um ein Ziel zu teleportieren, das entweder mehr als 3 Meter von dir entfernt ist oder unwillig ist, sich teleportieren zu lassen, musst du eine Werfen-Probe bestehen.",
            anzahl: 1
        },
        {
            id: "weihwasser",
            name: "Weihwasser",
            beschreibung: "3 kleine Fläschchen mit Weihwasser. Ein Fläschchen leerzutrinken, gibt dir für eine Stunde vollständige Immunität gegen jede Art von Fluch und hebt Flüche, mit denen du bereits belegt bist, vorübergehend auf. Kann auch mit Werfen auf untote, dämonische oder unheilige Ziele geworfen werden, um ihnen 6W6 Schaden und grässliche Schmerzen zuzufügen.",
            anzahl: 3
        },
        {
            id: "camping-zubehoer",
            name: "Camping-Zubehör",
            beschreibung: "Schlafsack, Decke, Zelt, Kochutensilien und alles, was man sonst zum Camping brauchen kann. Genug für eine Person.",
            anzahl: 1
        },
        {
            id: "drohne",
            name: "Drohne",
            beschreibung: "Eine kleine ferngesteuerte Drohne mit Kamera und Live-Feed. Kommt außerdem mit einem Empfangsgerät für den Live-Feed. Überträgt nur Bild, keinen Ton. Macht beim Fliegen hörbare Geräusche!",
            anzahl: 1
        },
        {
            id: "erste-hilfe-kasten",
            name: "Erste-Hilfe-Kasten",
            beschreibung: "Beinhaltet alles, was man für die Versorgung von Wunden braucht. Solange du einen Erste-Hilfe-Kasten zur Hand hast, kannst du Erste Hilfe würfeln, ohne dir Sorgen um Werkzeug oder Material machen zu müssen. Es kann auch Ausnahmen geben, wenn du z.B. eine Kugel aus einem Körper operieren willst; dann wäre ein dedizierter Operationssaal schon von Vorteil. Der Inhalt des Kastens kann in der örtlichen Apotheke problemlos nachgefüllt werden.",
            anzahl: 1
        },
        {
            id: "magischer handspiegel",
            name: "Magischer Handspiegel",
            beschreibung: "Ein scheinbar einfacher Handspiegel. Größe beliebig, solange du ihn in einer Hand halten kannst. Zauber, die genau die spiegelnde Fläche treffen würden, werden von ihr reflektiert und zurückgeworfen.",
            anzahl: 1
        },
        {
            id: "nachtsichtgeraet",
            name: "Nachtsichtgerät",
            beschreibung: "Erlaubt es dir, in fast vollständiger Dunkelheit zu sehen. Hat außerdem einen Fernsichtmodus, wie ein Fernglas. Die Sicht in Dunkelheit ist grünlich und nicht so gut wie bei 'richtiger' Nachtsicht.",
            anzahl: 1
        },
        {
            id: "seil",
            name: "Seil",
            beschreibung: "Insgesamt 100 Meter Seil. Kann in mehrere kürzere Seile aufgeteilt sein.",
            anzahl: 1
        },
        {
            id: "smartphone",
            name: "Smartphone",
            beschreibung: "Inklusive Internet! Wow!",
            anzahl: 1
        },
        {
            id: "umgebungskopfhoerer",
            name: "Umgebungskopfhörer",
            beschreibung: "Fangen selbst leiseste Geräusche aus der Umgebung auf. Gewähren +3 automatische Erfolge auf Horchen-Proben. Vorsicht: Sehr laute Geräusche können, wenn durch die Kopfhörer verstärkt, leicht dein Gehör schädigen!",
            anzahl: 1
        },
        {
            id: "verkleidungsset",
            name: "Verkleidungsset",
            beschreibung: "Ein beliebiges Kostüm (z.B. Arzt, Polizist, Soldat...). Beinhaltet allerdings keinen Polizeiausweis oder andere offizielle Dokumente. Beinhaltet außerdem Theater-Makeup und eine Perücke.",
            anzahl: 1
        },
        {
            id: "wurfnetz",
            name: "Wurfnetz",
            beschreibung: "Kann mit Werfen auf ein Ziel, Objekt, Gruppe von Zielen/Objekten oder einfach an eine Stelle geworfen werden. Ziele, die im Netz gefangen werden, können sich nicht von der Stelle bewegen und gewisse Aktionen (etwa Kampfsport) nicht (richtig) ausführen. Ein Ziel im Netz kann seine Aktion oder Reaktion nutzen, um zu versuchen, sich mit einer Akrobatik-Probe aus dem Netz zu befreien.",
            anzahl: 1
        },
        {
            id: "auto",
            name: "Auto",
            beschreibung: "Ein unauffälliger PKW inklusive Führerschein. Hat bequem Platz für bis zu 4 Personen.",
            anzahl: 1
        },
        {
            id: "motorrad",
            name: "Motorrad",
            beschreibung: "Ein sehr einfaches Motorrad inklusive Führerschein. Schafft bis zu 150km/h.",
            anzahl: 1
        },
        {
            id: "amulett der permanenz",
            name: "Amulett der Permanenz",
            beschreibung: "Ein magisches Amulett, das mit einem wunderschönen blauen Saphir in der Mitte geschmückt ist, in dem große Mengen an Mana gespeichert sind, das als Katalysator genutzt werden kann. Zauber, die du wirkst, die Aufrechterhaltungskosten haben (also „Du musst die Kosten dieses Zaubers alle X Zeiteinheiten nochmal bezahlen“) haben ihre Aufrechterhaltungskosten halbiert (abgerundet).",
            anzahl: 1
        },
        {
            id: "anti-gift ring",
            name: "Anti-Gift-Ring",
            beschreibung: "Ein kleiner Goldring mit einem dunkelgrünen Smaragd in der Mitte. Wer den Ring trägt, kann nicht vergiftet werden. Den Ring anzulegen, heilt aber nicht von bereits existierendem Gift.",
            anzahl: 1
        },
        {
            id: "auge der wahrheit",
            name: "Auge der Wahrheit",
            beschreibung: "Ein Glasauge, das fest in deinem Auge implantiert ist und eines deiner richtigen Augen ersetzt. Du kannst dadurch sehen wie mit einem normalen Auge. Du bist immun gegen Blendung und kannst unsichtbare Ziele und die Rückstände von Zaubern optisch wahrnehmen (allerdings nur mit dem einen Auge).",
            anzahl: 1
        },
        {
            id: "bodenloser beutel",
            name: "Bodenloser Beutel",
            beschreibung: "Ein kleiner Lederbeutel mit unendlichem Inneren. Kann Gegenstände bis zur Größe eines Stuhls aufnehmen. Der Beutel wiegt immer 1 kg, unabhängig vom Inhalt. Um etwas herauszuholen, muss der Anwender sich genau vorstellen, was er sucht.",
            anzahl: 1
        },
        {
            id: "chamaeleon-umhang",
            name: "Chamäleon-Umhang",
            beschreibung: "Ein Umhang, der in allen Regenbogenfarben schillert. Du kannst jederzeit 5 MP in den Umhang gießen, um seine Magie zu wecken. Sobald er aktiviert ist, passt der Umhang sich automatisch seiner Umgebung an. Egal, aus welchem Blickwinkel man auf den Umhang schaut, er wird immer aussehen wie die Umgebung dahinter. Solange du den aktivierten Umhang trägst, bekommst du +3 Erfolge auf Schleichen/Verstecken, allerdings endet der Effekt, sobald du dich bewegst (da der Umhang dann nicht mehr genau an deine aktuelle Umgebung angepasst ist).",
            anzahl: 1
        },
        {
            id: "ewige flamme",
            name: "Ewige Flamme",
            beschreibung: "Eine kleine Glasphiole mit einer Flamme darin, die für immer brennt. Sie ist komplett unmöglich zu löschen, brennt sogar unter Wasser und im Vakuum, und kann genutzt werden, um Feuer zu entzünden. Feuer, die von der Flamme entzündet werden, sind ungewöhnlich heiß und breiten sich schnell aus, können aber gelöscht werden.",
            anzahl: 1
        },
        {
            id: "gedankenbrille",
            name: "Gedankenbrille",
            beschreibung: "Eine Brille mit auffälligen Spiralen auf den Gläsern. Wenn du durch diese Gläser einem Ziel in die Augen schaust, kannst du seine Gedanken lesen, solange der Blickkontakt besteht.",
            anzahl: 1
        },
        {
            id: "halskette des liebreizes",
            name: "Halskette des Liebreizes",
            beschreibung: "Eine sehr auffällige Perlenkette mit einem funkelnden Diamanten im Zentrum, die automatisch die Augen des anderen Geschlechts auf sich zieht. Alle zwischenmenschlichen Proben, die der Träger bei Vertretern des anderen Geschlechts versucht (z.B. Überzeugen) bekommen einen zusätzlichen Erfolg. Dadurch wird es NICHT möglich, Leute davon zu überzeugen, sich umzubringen oder dergleichen; es macht soziale Proben nur einfacher.",
            anzahl: 1
        },
        {
            id: "harfe der goetter",
            name: "Harfe der Götter",
            beschreibung: "Eine wunderschöne kleine, tragbare Harfe aus reinem Gold. Wenn der Spieler eine erfolgreiche Musizieren-Probe ablegt, kann er eine Emotion seiner Wahl (Freude, Trauer, Wut, Angst...) bei allen Zuhörern verstärken. Betroffene erhalten +2 oder -2 Würfel auf Proben, je nach Emotion und Situation. Ein Ziel muss ein mindestens fünfminütiges Musikstück hören, das nicht von lauten Geräuschen unterbrochen wird, damit dieser Effekt eintritt.",
            anzahl: 1
        },
        {
            id: "kletterhandschuhe",
            name: "Kletterhandschuhe",
            beschreibung: "Erlauben es, an glatten Wänden hochzuklettern, und gewähren +2 automatische Erfolge auf Klettern-Proben.",
            anzahl: 1
        },
        {
            id: "krone des meister-magiers",
            name: "Krone des Meister-Magiers",
            beschreibung: "Ein unscheinbares Diadem mit kleinen Edelsteinen darin, die als Katalysatoren für Mana funktionieren. Die MP-Kosten aller Zauber, die der Träger wirkt, sind um 4 verringert. Kosten können nicht unter 1 fallen.",
            anzahl: 1
        },
        {
            id: "magischer vertrag",
            name: "Magischer Vertrag",
            beschreibung: "Ein mit mächtiger Magie durchsetzter Vertrag. Der Vertrag ist im Moment nur ein Rahmen. Du kannst beliebige Bedingungen und Inhalte hinzufügen. Du selbst und exakt ein Ziel müssen den Vertrag willentlich unterschreiben, damit die Magie greift. Sobald beide unterschrieben haben, geht der Vertrag sofort in Flammen auf und verbrennt vollständig. Anschließend sind beide Parteien an den Inhalt des Vertrags gebunden und es ist ihnen physisch absolut unmöglich, ihn zu brechen, selbst wenn sie es wollten.",
            anzahl: 1
        },
        {
            id: "magi-tech handschuhe",
            name: "Magi-Tech Handschuhe",
            beschreibung: "Ein Paar einfacher Handschuhe, die mit dem laut ausgesprochenen Befehl „Lasst mich meine Feinde verprügeln!“ ihre Gestalt ändern. Sie nehmen dann die Form von riesigen, metallenen Boxhandschuhen an, die aber nichts wiegen und sich für dich wie eine Erweiterung deiner Hände anfühlen. Physische Angriffe mit deinen Fäusten fügen mit den Handschuhen 4W6 zusätzlichen Schaden zu.",
            anzahl: 1
        },
        {
            id: "mana-mantel",
            name: "Mana-Mantel",
            beschreibung: "Ein blau schillernder, aus reinem Mana gewebter Mantel. Solange man ihn trägt, reduziert er allen Schaden durch feindliche Zauber um 1W6. Du kannst den Mantel jederzeit, wenn du ihn berührst, auflösen und absorbieren. Dadurch verschwindet der Mantel, aber du regenerierst sofort deine MP komplett. Das kostet keine Aktion.",
            anzahl: 1
        },
        {
            id: "ring der regeneration",
            name: "Ring der Regeneration",
            beschreibung: "Ein unscheinbarer Ring aus reinem Gold. Der Träger des Rings regeneriert jede Runde (alle 5 Sekunden) 1W6 LP. Außerhalb von Kämpfen heilt er binnen weniger Minuten alle oberflächlichen Verletzungen (aber keine Wunden).  Wenn der Ring abgenommen wird, verliert er für 8 Stunden seinen magischen Effekt.",
            anzahl: 1
        },
        {
            id: "reng des lichts",
            name: "Ring des Lichts",
            beschreibung: "Ein Ring mit einem großen Opal. Der Träger kann mit dem Kommando „An!“ dafür sorgen, dass der Ring einen steten Lichtschein, etwa wie eine Öllampe, von sich gibt. Mit dem Kommando „Aus!“ kann das Licht ausgeschaltet werden. Der Ring kann unendlich lange Licht machen.",
            anzahl: 1
        },
        {
            id: "schleicherschuhe",
            name: "Schleicherschuhe",
            beschreibung: "Einfache, unscheinbare Latschen. Sie hinterlassen niemals Fußabdrücke, nicht mal in dickem Schlamm oder Schnee, und machen nie Geräusche, z.B. durch das Zertreten von Ästen. Schleichen-Proben, bei denen es nur darum geht, nicht gehört zu werden, gelingen dem Träger automatisch.",
            anzahl: 1
        },
        {
            id: "schrumpfkoffer",
            name: "Schrumpfkoffer",
            beschreibung: "Ein altmodischer Koffer, der auf Knopfdruck auf die Größe einer Brieftasche schrumpft. Der Inhalt schrumpft mit, behält aber seine ursprünglichen Eigenschaften bei Wiedervergrößerung. Ideal, um sperrige Ausrüstung unauffällig zu transportieren.",
            anzahl: 1
        },
        {
            id: "siegelring",
            name: "Siegelring",
            beschreibung: "Ein schwerer, großer Metallring mit einem intrikaten Wappen darauf. Das Wappen ist ein Siegel, das mit unglaublichen Mengen Manas gefüllt ist. Du kannst Türen mit dem Ring versiegeln, wodurch sie physisch unmöglich zu öfnen werden, außer von dir. Sie können aber trotzdem aufgebrochen worden - nur das Schloss ist unmöglich zu öffnen.",
            anzahl: 1
        },
        {
            id: "silberschlange",
            name: "Silberschlange",
            beschreibung: "Ein dünnes Armband aus reinem Silber, das außen und innen mit magischen Runen verziert ist. Wenn du mit dem Arm, an dem du das Armband trägst, auf eine Person zeigst und die Worte „Binde meinen Feind!“ sprichst, erwacht das Armband zum Leben, lässt sich von deinem Arm zu Boden fallen und bewegt sich wie eine Schlange auf das Ziel zu. Das Ziel muss eine Ausweichen-Probe mit Schwierigkeit 1 bestehen, die nur möglich ist, wenn es das Armband kommen sieht. Besteht es die Probe nicht, wickelt sich das Armband um die Knöchel des Ziels und bindet sie zusammen, wodurch das Ziel unfähig wird, die Beine zu bewegen. Das Armband hört daraufhin auf, sich zu bewegen. Einmal gebunden, erfordert es eine Stärke-Probe mit Schwierigkeit 5, sich mit roher Gewalt zu befreien. Das Armband hat einen bestimmten Befehl zum Lösen, der aus einem Wort bestehen muss, das du frei wählst. Wird das Lösungswort laut gesagt, löst es sich und das Ziel ist wieder frei. Das ist die einzige Möglichkeit, das Ziel zu befreien, ohne das Band zu zerstören.",
            anzahl: 1
        },
        {
            id: "spitzhut",
            name: "Spitzhut",
            beschreibung: "Ein großer typischer Hexenhut. Sehr auffällig. Solange du den Hut trägst, regenerierst du alle 10 Minuten 1W6 MP.",
            anzahl: 1
        },
        {
            id: "stab der minizauber",
            name: "Stab der Minizauber",
            beschreibung: "Ein sehr kleiner Zauberstab, der zwischen 2 Fingern gehalten werden muss. Wenn der Magier ihn beim Zaubern schwingt, sind die Kosten aller Level-1-Zauber, die er wirkt, um 6 verringert, auf ein Minimum von 1.",
            anzahl: 1
        },
        {
            id: "sturmring",
            name: "Sturmring",
            beschreibung: "Ein kleiner Goldring mit einem wunderschönen Smaragd. In dem Smaragd ist eine große Menge komprimierten Manas gespeichert, das du jederzeit mit dem Befehl „Wehe meine Feinde davon!“ auslösen kannst. Das Mana bricht dann in Form eines heftigen omnidirektionalen Windstoßes aus dem Ring hervor, was den Zauber Wirbelwind um dich herum auslöst. Den Ring auszulösen, kostet keine Aktion, du kannst es während deiner Runde einfach tun. Der Ring hat immer nur genug Mana für einen Einsatz in sich gespeichert, du musst ihn zuerst neu aufladen, um ihn ein weiteres Mal zu verwenden. Um den Ring aufzuladen, musst du in einem zehnminütigen Ritual 10 MP ausgeben und auf ihn übertragen.",
            anzahl: 1
        },
        {
            id: "talisman",
            name: "Talisman",
            beschreibung: "Ein kleiner Talisman an einer Halskette. Alle Schaden, den der Träger durch Magie nehmen würde, ist um 2 verringert, auf ein Minimum von 0. Wirkt kumulativ.",
            anzahl: 1
        },
        {
            id: "wahrheits-flakon",
            name: "Wahrheits-Flakon",
            beschreibung: "Ein kleiner Flakon mit einem sehr aufreizend, angenehm riechenden Parfum darin. Wer das Parfum einatmet und den Duft wahrnimmt, verliert die Fähigkeit zu lügen, solange der Geruch in seiner Nase verbleibt. Du bist selbst ebenfalls betroffen, wenn du das Parfum trägst!",
            anzahl: 1
        },
        {
            id: "zaubergrimoire",
            name: "Zaubergrimoire",
            beschreibung: "Enthält genaue Anweisungen zu einem Zauber deiner Wahl. Du erhältst einen zusätzlichen Zauber-Slot, kannst diesen Zauber aber nur einsetzen, solange du das Grimoire bei dir hast.",
            anzahl: 1
        },
        {
            id: "zaubertinte",
            name: "Zaubertinte",
            beschreibung: "Magische Tinte. Sieht aus wie normale Tinte, aber damit geschriebene Nachrichten sind nur für den- oder diejenigen lesbar, von denen der Schreiber will, dass sie die Worte lesen können. Wenn der Schreiber im Nachhinein seine Meinung ändert, passt sich die Liste derer, die die Worte lesen können, dynamisch an.",
            anzahl: 1
        },
        {
            id: "zeremonieller dolch",
            name: "Zeremonieller Dolch",
            beschreibung: "Ein kleiner Schmuckdolch, dessen Klinge mit magischen Runen geschmückt ist und in dessen Griff drei Juwelen voller Mana eingelassen sind. Jedes Juwel fasst eine Ladung an gespeicherter magischer Energie (der Dolch hat also insgesamt 3 Ladungen). Immer, wenn du einen Zauber wirkst, der Schaden verursacht, kannst du, bevor du die GENA-Probe des Zaubers würfelst, eine beliebige Anzahl Ladungen ausgeben. Wenn der Zauber trifft, wird sein Schaden an allen getroffenen Zielen pro Ladung um 2W6 erhöht. Du kannst die Ladungen wieder auffüllen, indem du in einem zehnminütigen Ritual dein eigenes Mana in die Juwelen speist. Pro Ladung musst du dafür 10 MP einspeisen. Der Dolch kann außerdem als sehr ineffektive Nahkampfwaffe verwendet werden, die 1W6 Schaden zufügt.",
            anzahl: 1
        }
    ],
    
    /**
     * Gibt alle verfügbaren Gegenstände zurück
     * @returns {Array} Liste aller Gegenstände
     */
    getAllItems: function() {
        return this.items;
    },
    
    /**
     * Gibt einen bestimmten Gegenstand anhand seiner ID zurück
     * @param {string} id - Die ID des gesuchten Gegenstands
     * @returns {Object|null} Der gefundene Gegenstand oder null, wenn nicht gefunden
     */
    getItemById: function(id) {
        return this.items.find(item => item.id === id) || null;
    },
    
    /**
     * Gibt einen bestimmten Gegenstand anhand seines Namens zurück
     * @param {string} name - Der Name des gesuchten Gegenstands
     * @returns {Object|null} Der gefundene Gegenstand oder null, wenn nicht gefunden
     */
    getItemByName: function(name) {
        return this.items.find(item => item.name === name) || null;
    }
};

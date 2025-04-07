// vorteilService.js
const vorteilService = {
    getAllVorteile: function() {
        return [
            {
                id: 'arkane meisterschaft',
                name: 'Arkana Meisterschaft',
                beschreibung: 'Du hast insgesamt 2 Magie-Schulen gemeistert, deren Zauber für dich halbe Kosten haben (wähle eine zusätzliche). Außerdem macht dieser Vorteil dich in der Magier-Welt zu einer bekannten, schillernden Persönlichkeit.'
            },
            {
                id: 'atlanter',
                name: 'Atlanter',
                beschreibung: 'Du bist ein Nachfahre der Menschen von Atlantis. Du kannst unter Wasser atmen, deutlich schneller schwimmen und tauschen als andere und mit Meerestieren kommunizieren. Du kannst diese trainieren wie Hunde, aber sie gehorchen dir nicht automatisch.'
            },
            {
                id: 'basis',
                name: 'Basis',
                beschreibung: 'Du hast in der Vergangenheit in einem langfristigen und anstrengenden Prozess eine Taschendimension mit einer Geheimbasis darin erschaffen. Die Basis hat die Dimension eines großen Hauses oder Anwesens und kann von dir beliebig ausgestattet werden, muss aber zu Spielbeginn einmal komplett definiert werden. Sie kann Nahrungsvorräte, Werkzeuge, Bücher usw. enthalten, je nach Klasse außerdem z.B. als Lager für untote Diener dienen. Die genaue Ausstattung muss von Spielleiter abgesegnet werden. Die Basis ist nur durch ein einzelnes Portal mit der Realität verbunden, das nur du erschaffen kannst. Um ein Portal zu platzieren, musst du für eine Minute beide Hände auf eine Fläche legen. Dort entsteht dann das 1x2 Meter große Portal. Du kannst das Portal jederzeit verschwinden lassen, wodurch die Basis komplett von der Realität abgekapselt wird. Existiert schon ein Portal, wird dieses vom neuen überschrieben. Wenn du in der Basis bist und kein Portal existiert, kannst du ein neues öffnen, das dort erscheinen wird, wo das letzte entfernt wurde.'
            },
            {
                id: 'doppelte klasse',
                name: 'Doppelte Klasse',
                beschreibung: 'Du erhältst eine zweite Klasse.'
            },
            {
                id: 'glückspilz',
                name: 'Glückspilz',
                beschreibung: 'Immer, wenn du einen Glücks-Token einsetzt, erhältst du +2 automatische Erfolge auf die Probe. Glücks-Tokens werden zu Beginn jedes Tages im Spiel regeneriert, können aber nicht für GENA- oder PA-Proben verwendet werden.'
            },
            {
                id: 'fantastische eignung',
                name: 'Fantastische Eignung',
                beschreibung: 'Du erhältst +1 Attributs- und +5 Fertigkeitspunkte zu verteilen.'
            },
            {
                id: 'frühaufsteher',
                name: 'Frühaufsteher',
                beschreibung: 'Du brauchst deutlich weniger Schlaf als andere. Du regenerierst deine KP und MP bereits vollständig nach 4 Stunden Schlaf und bist nach spätestens 5 Stunden hellwach, was dir deutlich mehr Zeit gibt, proaktiv zu sein.'
            },
            {
                id: 'gelehrig',
                name: 'Gelehrig',
                beschreibung: 'Du kannst 3 zusätzliche Zauber wählen.'
            },
            {
                id: 'gesegneter körper',
                name: 'Gesegneter Körper',
                beschreibung: 'Dein Körper ist durch eine Vielzahl heiliger Rituale dauerhaft gesegnet, was dich zum natürlichen Feind aller Untoten und Dämonen macht. Solche Ziele nehmen jede Runde (alle 10 Sekunden) 4W6 Schaden, wenn sie dich/du sie berührst. Aller Schaden, den du von solchen Zielen oder von dunkler Magie nehmen würdest, ist halbiert (aufgerundet). Dieser Vorteil setzt einen Hintergrund in der katholischen Kirche voraus!'
            },
            {
                id: 'heilungsfaktor',
                name: 'Heilungsfaktor',
                beschreibung: 'Oberflächliche Verletzungen heilen bei dir unglaublich schnell. Außerhalb des Kampfes, solange du Ruhe hast, regenerieren sich deine KP innerhalb einer halben Stunde vollständig. Wunden durch Kratzer, Schnitte usw. (alles, was blutet) werden durch 12 Stunden Ruhe und Schlaf geheilt.'
            },
            {
                id: 'hilfreich',
                name: 'Hilfreich',
                beschreibung: 'Immer, wenn ein Verbündeter in deiner Nähe (~5 Meter) eine Probe nicht schafft, kannst du dieselbe Probe mit deinem Wert noch mal versuchen. Das Ziel erhält so viele zusätzliche Erfolge (ODER PATZER!), wie du gewürfelt hast.'
            },
            {
                id: 'magiesinn',
                name: 'Magiesinn',
                beschreibung: 'Du hast einen unfassbar gut geschulten Sinn für Magie. Du musst nicht würfeln, um zu erkennen, ob und wo in deiner Nähe Magie im Einsatz ist oder war, und kannst bis zu einen Tag im Nachhinein sagen, ob und was für Zauber an einem Ort eingesetzt wurden. Magische Fallen erkennst du automatisch, wenn du auf einen Meter an sie herankommst.'
            },
            {
                id: 'mana-aufladung',
                name: 'Mana-Aufladung',
                beschreibung: 'Dein Mana regeneriert sich durchgehend. Du erhältst am Ende jeder Kampfrunde 1W6 MP zurück. Außerhalb von Kämpfen regeneriert sich dein Mana in 10 Minuten vollständig.'
            },
            {
                id: 'mana-schild',
                name: 'Mana-Schild',
                beschreibung: 'Dein Mana verpufft nicht einfach, wenn du es verwendest, sondern umgibt dich wie ein wunderschöner, halbtransparenter Schild. Dadurch wird eingehender magischer (nicht physischer!) Schaden abgefangen. Der Mana-Schild hat keine Masse, er bewegt sich z.B. um dich herum durch einen Türrahmen, wenn du durch eine Tür gehst. Wird der Schild durch einen Zauber auf 0 reduziert, zerspringt er mit lauten Klirren, was auch Nicht-Magier wahrnehmen können.'
            },
            {
                id: 'mana-schwamm',
                name: 'Mana-Schwamm',
                beschreibung: 'Du hast das besondere Talent, feindliche Magie zu absorbieren. Immer, wenn du eine Magieresistenz-Probe bestehst und so einem Zauber widerstehst, absorbierst du ihn und bekommst seine Mana-Kosten wahlweise als KP oder MP erstattet.'
            },
            {
                id: 'nachtsicht',
                name: 'Nachtsicht',
                beschreibung: 'Du kannst auch in fast vollständiger Finsternis uneingeschränkt sehen. Das gilt nur, solange es zumindest eine geringe Lichtquelle (z.B. Sterne am Himmel oder in einen Höhlengang von weit her einfallendes Licht) gibt. In solcher Dunkelheit haben andere extreme Mali auf die meisten Proben, inklusive GENA und PA.'
            },
            {
                id: 'naturfreund',
                name: 'Naturfreund',
                beschreibung: 'Alle Tiere betrachten dich automatisch als ihren Freund und werden dir helfen. Das schließt ausdrücklich auch abgerichtete Tiere wie Wachhunde mit ein. Du kannst ihnen simple Befehle geben und sie werden sie in den meisten Fällen befolgen. Beachte aber, dass sie dir freiwillig folgen. Sie werden keine Befehle befolgen, die ihnen Schaden oder sie selbst in Gefahr bringen würden. Wenn du sie verletzt oder ihnen Anlass gibst, dich nicht zu mögen, sind sie nicht mehr von dem Vorteil betroffen.'
            },
            {
                id: 'regenerativ',
                name: 'Regenerativ',
                beschreibung: 'Du hast einen Heilungsfaktor, der an Eidechsen erinnert und nicht mehr als menschlich bezeichnet werden kann. Nach einer Nacht Schlaf wirst du von 1W4 Wunden geheilt, was jede Art von Verletzung abdecken kann. Sogar fehlende Gliedmaßen wachsen bei dir einfach nach!'
            },
            {
                id: 'reich',
                name: 'Reich',
                beschreibung: 'Du erhältst drei zusätzliche Gegenstände in deinem Inventar.'
            },
            {
                id: 'unsterblich',
                name: 'Unsterblich',
                beschreibung: 'Du hast das Geheimnis wahrer Unsterblichkeit erlangt! Du kannst nicht sterben. Würdest du sterben, fällst du stattdessen in ein Koma, aus dem du nach 12 Stunden in perfekter körperlicher Verfassung wieder erwachst. In diesem Zustand ist es physisch unmöglich, die weiteren Schaden zuzufügen. Der Heilungsprozess ist allerdings unbeschreiblich schmerzhaft und hinterlässt jedesmal tiefe psychische Wunden, sodass du trotz dieser Absicherung fast alles tun würdest, um nicht zu sterben. Dieser Vorteil verhindert NICHT, dass du bewusstlos wirst, wenn deine KP auf 0 fallen.'
            },
            {
                id: 'verbündeter',
                name: 'Verbündeter',
                beschreibung: 'Du hast einen NPC als Verbündeten. Diesen Kannst du ebenfalls mit dem Editor erstellen, allerdings ist er kein Magier. Er hat keine Klasse, keinen Vor- oder Nachteil, keine Zauber und kein Equipment. Du kannst seine genaue Rolle bestimmen (z.B. ein Freund oder ein angeheuerter Söldner). Er wird vom Spielleiter gesteuert, tut aber generell, was du willst und wird aktiv versuchen, dir zu helfen.'
            },
            {
                id: 'vernarbt',
                name: 'Vernarbt',
                beschreibung: 'Deine maximalen KP sind verdoppelt.'
            },
            {
                id: 'zaubercombo',
                name: 'Zaubercombo',
                beschreibung: 'Du hast eine besondere Combo mit deinen Zaubern geübt. Wähle zwei deiner Zauber. Du kannst in einer Runde beide Zauber als eine Aktion wirken.'
            }
        ];
    }
};

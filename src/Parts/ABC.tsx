import React from "react";
const abc = [
  ["A", "Angefangen hat alles bei uns am 8. Oktober 2023"],
  ["B", "Brautentführung möchten wir nicht auf unserer Hochzeit"],
  ["C", "Candy-Bar - sie versüßt euch den Abend"],
  ["D", "DJ - er wird für die richtige Musik zum Feiern sorgen"],
  ["E", "Essen gibt es reichlich"],
  ["F", "Fotobox steht für euch zur Nutzung bereit"],
  ["G", "Geldgeschenke würden uns sehr freuen"],
  [
    "H",
    'Hochzeitsablauf - den Ablauf unseres Festes findest du auf dieser Seite unter "Tagesablauf"',
  ],
  [
    "I",
    <>Instagram - teilt gerne Fotos unserer Hochzeit mit dem Hashtag <a className="text-[var(--highlight-text)]" href="https://www.instagram.com/explore/tags/micoheiraten/">#micoheiraten</a></>,
  ],
  [
    "J",
    "Jogginghosen sind wirklich bequem, doch bitte tragt bei unserer Hochzeit etwas Festlicheres",
  ],
  ["K", "Kinder sind natürlich auch herzlich eingeladen"],
  [
    "L",
    "Lautes Klingeln bei der Trauung wäre nicht schön - Bitte den Ton eurer Handys ausschalten",
  ],
  ["M", "Mit euch wird die Hochzeit erst etwas ganz Besonderes"],
  ["N", "Notfallkoffer für alle möglichen Wehwehchen steht zur Verfügung ;-)"],
  ["O", "Open End - wir geben keine Zeitfrist vor"],
  ["P", "Parken könnt ihr auf dem Besucherparkplatz der Eremitage"],
  ["Q", "Quiz - wird es geben, lasst euch überraschen"],
  ["R", "Rauchen bitte außerhalb der Räumlichkeiten"],
  ["S", "Sektempfang gibt es nach der Trauung"],
  [
    "T",
    "Tanzen kann man auch mit 2 linken Füßen, bitte leistet uns auf der Tanzfläche Gesellschaft",
  ],
  ["U", "Unglaublich, bald ist es soweit!"],
  ["V", "Videos und Fotos könnt ihr nach der Trauung gerne machen"],
  ["W", "Weiß ist an diesem Tag für die Braut vorbehalten"],
  ["X", "Xtra Sonnenschein haben wir bestellt - Mal sehen, ob es klappt"],
  ["Y", "Yin und Yang - so sind wir beide"],
  [
    "Z",
    "Zum Schluss schon einmal vielen Dank für eure Unterstützung und dass ihr diesen besonderen Tag mit uns verbringen werdet",
  ],
] as const;
function ABC() {
  return (
    <div className="flex flex-wrap">
      {abc.map(([letter, text]) => (
        <div className="w-[100%] md:w-[50%] flex items-center" key={letter}>
          <div className="py-2 w-12 shrink-0 font-[lobster] text-2xl text-[var(--highlight-text)]">{letter}</div>
          <div className="py-2 text-left">{text}</div>
        </div>
      ))}
    </div>
  );
}

export default ABC;

import classNames from "classnames";
import React from "react";
import { FaRegHeart as HeartIcon } from "react-icons/fa";
import { FaGlassCheers as GlassIcon } from "react-icons/fa";
import { FaCamera as CameraIcon } from "react-icons/fa";
import { MdFlatware as FoodIcon } from "react-icons/md";
import { BsCake as CakeIcon } from "react-icons/bs";
import { BiParty as PartyIcon } from "react-icons/bi";

const content = [
  {
    icon: <HeartIcon />,
    title: "10:00 - Trauung im Sonnentempel der Eremitage",
    content: ["Wir geben uns das Ja-Wort."],
  },
  {
    icon: <GlassIcon />,
    title: "10:30 - Sektempfang vorm Sonnentempel der Eremitage",
    content: ["Stoßt mit uns auf unseren Tag an."],
  },
  {
    icon: <CameraIcon />,
    title: "11:00 - Gemeinsames Fotoshooting",
    content: [
      "Wir würden uns freuen mit allen Gästen ein gemeinsames Foto zu machen.",
      "Danach haben alle ein wenig Zeit und können noch einmal die Füße hochlegen bis es dann ab 12 Uhr im Westflügel des neuen Schlosses weitergeht.",
      "Wir werden unterdessen Fotos mit unserem Fotografen machen.",
    ],
  },
  {
    icon: <FoodIcon />,
    title: "12:00 - Mittagessen im Westflügel des neuen Schlosses",
    content: [
      "Natürlich soll niemand hungern, deswegen gibt es mittags Leckeres zu essen.",
      "In der Location stehen zudem Candybar, Fotobox und sonstiges zur Verfügung, das gerne genutzt werden darf. 😉",
    ],
  },
  {
    icon: <CakeIcon />,
    title: "16:00 - Tortenanschnitt",
    content: [
      "Mit Torte und Kaffee oder Tee werden wir entspannt den Nachmittag ausklingen lassen.",
    ],
  },
  {
    icon: <PartyIcon />,
    title: "19:00 - Die große Feier 🥳",
    content: [
      "Bei Musik wird gefeiert, gelacht, getanzt und vielleicht hält der Abend auch noch die ein oder andere Überraschung im Programm bereit 😉",
    ],
  },
];

function Ablauf() {
  return (
    <div className="relative before:hidden md:before:block before:content-[''] before:bg-gray-500 before:h-[calc(100%-4px)] before:left-1/2 before:top-[4px] before:absolute before:w-[1px] before:-z-1">
      {content.map(({ icon, title, content }, i) => (
        <div
          key={i}
          className={classNames("flex gap-4", {
            "flex-row-reverse text-left": i % 2 === 0,
            "flex-row text-right": i % 2 === 1,
          })}
        >
          <div className="flex-1 flex flex-col gap-2 min-h-30">
            <h3 className="font-bold text-lg">{title}</h3>
            {content.map((s, i) => (
              <p className="text-md" key={i}>{s}</p>
            ))}
          </div>
          <div className="w-20 h-20 flex items-center justify-center text-4xl bg-[var(--highlight)] rounded-full">
            {icon}
          </div>
          <div className="flex-1"></div>
        </div>
      ))}
    </div>
  );
}

export default Ablauf;

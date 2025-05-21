import React from "react";
import Image from "next/image";

const personData = [
  {
    img: {
      src: "/Images/Vorstellung/ina.jpg",
      alt: "Bild Corinna",
      width: 868,
      height: 1002,
    },
    name: "Corinna",
    surname: "Van der Heyden",
    text: [
      { label: "Alter", value: "26" },
      { label: "Hobbys", value: "Schwimmen, Reisen, Spazierengehen" },
      { label: "Beruf", value: "Kauffrau für Büromanagement (Azubi)" },
      { label: "Geschwister", value: "Keine" },
      { label: "Körpergröße", value: "1,62 m" },
      { label: "Lieblingslied", value: "Keep Me Up - Michael Schulte" },
      { label: "Trauzeuge", value: "Manuel Riedelbauch" },
    ],
  },
  {
    img: {
      src: "/Images/Vorstellung/michi.jpg",
      alt: "Bild Michi",
      width: 614,
      height: 803,
    },
    name: "Michael",
    surname: "Schlegel",
    text: [
      { label: "Alter", value: "21" },
      { label: "Hobbys", value: "Zocken, Elektronik, Programmieren" },
      { label: "Beruf", value: "Programmierer" },
      { label: "Geschwister", value: "Keine" },
      { label: "Körpergröße", value: "1,68 m" },
      { label: "Lieblingslied", value: "Gibt mehrere" },
      { label: "Trauzeuge", value: "Mika Mages" },
    ],
  },
];

function Vorstellung() {
  return (
    <div className="flex justify-center flex-wrap md:flex-nowrap gap-10">
      {personData.map((data, i) => (
        <div
          key={i}
          className="w-100 p-2 flex flex-col items-center bg-green-100 border-4 border-gray-400 shadow-lg shadow-black/50 rounded-4xl"
        >
          <h3 className="font-[lobster] text-3xl font-semibold text-blue-300">
            {data.name}
          </h3>
          <h4 className="font-[lobster] text-xl">{data.surname}</h4>
          <Image
            className="rounded-2xl my-2 w-90 aspect-3/4 object-cover"
            key={i}
            alt={data.img.alt}
            src={data.img.src}
            width={data.img.width}
            height={data.img.height}
          />
          <table className="w-70 border-spacing-2">
            <tbody>
              {data.text.map((line, i) => (
                <tr key={i}>
                  <td className="text-right align-text-top">
                    <span className="mr-1 font-bold">{line.label}:</span>
                  </td>
                  <td className="text-left align-text-top">
                    <span>{line.value}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* {data.text.map((line) => (
                  <p key={line.label}>
                    <span className="font-bold">{line.label}: </span>
                    {line.value}
                  </p>
                ))} */}
        </div>
      ))}
    </div>
  );
}

export default Vorstellung;

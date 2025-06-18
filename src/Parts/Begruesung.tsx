import Divider from "@/Components/Divider";
import Link from "next/link";
import React from "react";
import { FaRegHeart as HeartIcon } from "react-icons/fa";

const Brr = () => (
  <>
    <br />
    <br />
  </>
);

function Begruesung() {
  return (
    <>
      <h1 className="text-border-4 text-[var(--highlight-text)] text-4xl sm:text-5xl font-(family-name:--font-lobster)">
        Hochzeit in der Eremitage
      </h1>
      <div className="flex justify-center items-center my-4">
        <Divider />
        <HeartIcon
          aria-label="Heart Icon"
          className="text-lg text-[var(--highlight-text)] drop-shadow-[0px_0px_4px_var(--color-pink-500)]"
        />
        <Divider />
      </div>
      <p className="text-lg sm:text-xl">
        Liebe Freundinnen und Freunde, liebe Familie,
        <Brr />
        die Hochzeit am 7. Juni 2025 mit euch war unvergesslich!
        <Brr />
        Das Wetter war uns gnädig, wir hatten viel Spaß, schöne Momente und gutes Essen.
        Wir würden uns freuen, wenn ihr selbst fotografierte Bilder über unseren <Link href={"#fotos"}>Fotoupload</Link> an uns übertragt.
        Die Galerie ist bald bereit und zeigt sowohl die Bilder unserer Fotografin, als auch eure!
        <Brr />
        Ein paar Bilder unserer Flitterwochen werden auch zu sehen sein.
        <br />
        Vielen Dank, ihr habt unsere Hochzeit zu dem gemacht, was sie war - ein unvergesslicher Tag mit viel Liebe und Spaß!
        <Brr />
        Liebe Grüße,
        <br />
        Corinna & Michael
      </p>
    </>
  );
}

export default Begruesung;

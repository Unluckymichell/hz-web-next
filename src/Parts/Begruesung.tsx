import Divider from "@/Components/Divider";
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
        Liebe Gäste,
        <Brr />
        zu unserer Hochzeit am 7. Juni 2025 laden wir Euch recht herzlich in die
        schöne Eremitage in Bayreuth ein!
        <Brr />
        Gebt uns doch bitte zeitnah Bescheid, ob ihr diesen Tag mit uns feiern
        wollt.
        <Brr />
        Liebe Grüße,
        <br />
        Corinna & Michael
      </p>
    </>
  );
}

export default Begruesung;

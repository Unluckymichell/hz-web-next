import MapsEmbed from "@/Components/MapsEmbed";
import React from "react";

function Locations() {
  return (
    <div className="flex gap-6 flex-col md:flex-row justify-center items-center">
      <MapsEmbed className="w-60 md:w-40 xl:w-50" link="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d221.62057362867696!2d11.623196015433688!3d49.948235219257604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a1a34060f6d615%3A0x29677d2c76c6cc51!2sNeues%20Schloss%20Eremitage!5e1!3m2!1sde!2sde!4v1747485213781!5m2!1sde!2sde" />
      <div className="text-left">
        <h2 className="text-2xl xl:text-4xl font-bold">
          Standesamtliche Trauung / Hochzeitsfeier
        </h2>
        <h3 className="text-md xl:text-lg">
          Neues Schloss Eremitage, 7. Juni 2025 um 10:00 Uhr
          <br />
          Adresse:{" "}
          <a
            className="hover:underline text-[var(--highlight-text)]"
            href="https://maps.app.goo.gl/TDTVQJebvDSeyqdj6"
          >
            Neues Schloss, Eremitagestraße 2, 95448 Bayreuth
          </a>
        </h3>
      </div>
    </div>
  );
}

export default Locations;

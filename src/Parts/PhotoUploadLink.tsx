import Link from "next/link";
import React from "react";

function PhotoUploadLink() {
  return (
    <div>
      <h3 className="text-4xl font-bold">Du willst selber Fotos von uns hochladen?</h3>
      <p className="text-lg">Das kannst du hier tuen!</p>
      <div className="my-8 w-full flex justify-center">
        <Link href={"/photoupload"}>
          <span className="w-40 h-10 bg-[var(--highlight)] in-focus:bg-[var(--highlight-text)] hover:bg-[var(--highlight-text)] flex justify-center items-center rounded-2xl">
            Photoupload
          </span>
        </Link>
      </div>
      <p className="text-lg">
        Die Fotos werden dann direkt an uns weitergeleitet und gespeichert.
      </p>
      <p className="text-lg">
        Nachdem wir sie bestätigt haben werden sie in unserer Galerie angezeigt.
      </p>
    </div>
  );
}

export default PhotoUploadLink;

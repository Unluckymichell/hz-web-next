import classNames from "classnames";
import React from "react";

function MapsEmbed({ link, className: cn }: { link: string, className: string }) {
  return (
    <div className={classNames("aspect-square inline-block relative", cn)}>
      <div
        className={classNames("aspect-square overflow-hidden absolute", cn)}
        style={{
          borderRadius: "10%/50%",
        }}
      >
        <iframe
          className="w-full h-full"
          width="800"
          height="800"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={link}
        />
        det
      </div>
    </div>
  );
}

export default MapsEmbed;

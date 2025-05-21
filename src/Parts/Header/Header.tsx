"use client";
import { useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { useInterval } from "../../Hooks/useInterval";
import { type HomeImagesType } from "./homeImages";

const styles = {
  nextAndPreviousButtons:
    "w-40 h-full text-transparent absolute top-0 transition-opacity from-pink-300 to-transparent opacity-0 md:hover:opacity-35 focus:opacity-100",
};

function Header({
  children,
  images,
}: React.PropsWithChildren<{ images: HomeImagesType }>) {
  const [imageVisible, setImageVissible] = useState(0);
  const [buttonPulseAnimation, setButtonPulseAnimation] = useState(
    "none" as "none" | "left" | "right"
  );

  const [loadUntilImage, setLoadUntilImage] = useState(0);

  const nextImage = () => {
    if(loadUntilImage < imageVisible-1) return true;
    setImageVissible((iv) => (iv + 1 >= images.length ? 0 : iv + 1));
  };

  const lastImage = () => {
    setImageVissible((iv) => (iv <= 0 ? images.length - 1 : iv - 1));
  };

  const { reschedule: rescheduleNext } = useInterval(nextImage, 7000);

  const nextImageButton = () => {
    nextImage()
    setButtonPulseAnimation("right");
    rescheduleNext(15000);
  };

  const lastImageButton = () => {
    lastImage();
    setButtonPulseAnimation("left");
    rescheduleNext(15000);
  };

  const setImageButton = (index: number) => {
    setImageVissible(index);
    rescheduleNext(15000);
  };

  return (
    <header className="w-full h-100 relative overflow-clip">
      <div className="absolut w-full h-full">{children}</div>
      {images.map((img, index) => (
        <Image
          key={index}
          style={{ objectPosition: img.objectPosition }}
          aria-hidden={index != imageVisible}
          className={classNames(
            "transition-all transition-2000 h-full object-cover dark:opacity-50 absolute top-0 -z-1",
            {
              "left-[-100%]": index < imageVisible,
              "left-0": index == imageVisible,
              "left-[100%]": index > imageVisible,
            }
          )}
          onLoad={() => setLoadUntilImage(n => n+1)}
          loading={
            index == imageVisible || index <= loadUntilImage
              ? "eager"
              : "lazy"
          }
          src={img.url}
          alt={"Header Image " + index}
          width={1920}
          height={1080}
        />
      ))}
      <div className="absolute h-6 w-full bottom-0 flex justify-center">
        {images.map((_iurl, index) => (
          <button
            onClick={() => setImageButton(index)}
            key={index}
            className="p-1 flex justify-center aspect-square"
            aria-label={`Bild ${index} anzeigen`}
          >
            <div
              className={classNames(
                "w-4 h-4 transition-colors rounded-full border-3 border-white",
                {
                  "opacity-20": index >= loadUntilImage,
                  "bg-blue-100": index != imageVisible,
                  "bg-blue-300": index == imageVisible,
                }
              )}
            />
          </button>
        ))}
      </div>
      <button
        onClick={lastImageButton}
        className={classNames(
          styles.nextAndPreviousButtons,
          "bg-gradient-to-r",
          {
            "animate-[pulse_250ms_ease-in-out]": buttonPulseAnimation == "left",
          }
        )}
        onAnimationEnd={() =>
          buttonPulseAnimation != "none" && setButtonPulseAnimation("none")
        }
      >
        Letztes Bild
      </button>
      <button
        onClick={nextImageButton}
        className={classNames(
          styles.nextAndPreviousButtons,
          "bg-gradient-to-l right-0",
          {
            "animate-[pulse_250ms_ease-in-out]":
              buttonPulseAnimation == "right",
          }
        )}
        onAnimationEnd={() =>
          buttonPulseAnimation != "none" && setButtonPulseAnimation("none")
        }
      >
        Nächstes Bild
      </button>
    </header>
  );
}

export default Header;

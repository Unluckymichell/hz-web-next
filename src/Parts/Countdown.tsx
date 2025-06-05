"use client";
import { useInterval } from "@/Hooks/useInterval";
import React, { useContext, useEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { SectionsInViewContext } from "./Navigation";

function getCountdownValues() {
  const now = new Date();
  const target = new Date("2025-06-07T08:00:00.000Z");
  let diff = target.getTime() - now.getTime();
  const days = Math.max(Math.floor(diff / (1000 * 60 * 60 * 24)), 0);
  diff = diff % (1000 * 60 * 60 * 24);
  const hours = Math.max(Math.floor(diff / (1000 * 60 * 60)), 0);
  diff = diff % (1000 * 60 * 60);
  const minutes = Math.max(Math.floor(diff / (1000 * 60)), 0);
  diff = diff % (1000 * 60);
  const seconds = Math.max(Math.floor(diff / 1000), 0);
  return { days, hours, minutes, seconds };
}

const audio = typeof window != "undefined" ? new Audio('/Audio/yay_short.mp3') : null;
audio?.pause();

function Countdown() {
  const [coutdown, setCountdown] = useState(getCountdownValues());
  const counterIs0 =
    coutdown.days + coutdown.hours + coutdown.minutes + coutdown.seconds <= 0;

  useInterval(
    () => setCountdown(getCountdownValues()),
    !counterIs0 && coutdown.days === 0 ? 1000 : 60 * 1000,
    !counterIs0 && coutdown.days === 0 ? 1100 - new Date().getMilliseconds() : (60 - new Date().getSeconds()) * 1000 + 500
  );

  const [isExploding, setIsExploding] = React.useState(false);
  const isInView = useContext(SectionsInViewContext).findIndex(s => s.startsWith("countdown")) > -1;
  useEffect(() => {
    if (!counterIs0) return;
    if (!isInView) {
      setIsExploding(false);
      audio?.pause();
      if(audio) audio.currentTime = 0
      return;
    }

    console.log("Confetti!!")
    let aborted = false;
    let secondTimout: NodeJS.Timeout | null = null;
    let timeout: NodeJS.Timeout | null = setTimeout(() => {
      setIsExploding(true);
      audio?.play();
      secondTimout = setTimeout(() => {
        if (aborted) setIsExploding(false);
        audio?.pause();
        if(audio) audio.currentTime = 0
        secondTimout = null;
      }, 2000);
      timeout = null;
    }, 500);

    return () => {
      if (timeout) clearTimeout(timeout);
      if (secondTimout) {
        setIsExploding(false);
        audio?.pause();
        if(audio) audio.currentTime = 0
        clearTimeout(secondTimout);
      }
      aborted = true;
    };
  }, [isInView, counterIs0]);

  return (
    <div className="flex flex-col items-center">
      <div className="translate-y-3">
        {isExploding && <ConfettiExplosion />}
      </div>
      <div className="flex justify-center gap-10 md:gap-25">
        {coutdown.days !== 0 && (
          <div className="flex flex-col items-center text-2xl md:text-4xl">
            <span>{coutdown.days}</span>
            <span className="font-(family-name:--font-lobster)">Tage</span>
          </div>
        )}
        <div className="flex flex-col items-center text-2xl md:text-4xl">
          <span>{coutdown.hours}</span>
          <span className="font-(family-name:--font-lobster)">Stunden</span>
        </div>
        <div className="flex flex-col items-center text-2xl md:text-4xl">
          <span>{coutdown.minutes}</span>
          <span className="font-(family-name:--font-lobster)">Minuten</span>
        </div>
        {coutdown.days === 0 && (
          <div className="flex flex-col items-center text-2xl md:text-4xl">
            <span>{coutdown.seconds}</span>
            <span className="font-(family-name:--font-lobster)">Sekunden</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Countdown;

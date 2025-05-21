"use client";
import { useInterval } from "@/Hooks/useInterval";
import React, { useState } from "react";

function getCountdownValues() {
  const now = new Date();
  const target = new Date("2025-06-07T08:00:00.000Z");
  let diff = target.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff = diff % (1000 * 60 * 60 * 24);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff = diff % (1000 * 60 * 60);
  const minutes = Math.floor(diff / (1000 * 60));
  return { days, hours, minutes };
}

function Countdown() {
  const [coutdown, setCountdown] = useState(getCountdownValues());

  useInterval(
    () => setCountdown(getCountdownValues()),
    60 * 1000,
    (60 - new Date().getSeconds()) * 1000 + 500
  );

  return (
    <div className="flex justify-center gap-10 md:gap-25">
      <div className="flex flex-col items-center text-2xl md:text-4xl">
        <span>{coutdown.days}</span>
        <span className="font-(family-name:--font-lobster)">Tage</span>
      </div>
      <div className="flex flex-col items-center text-2xl md:text-4xl">
        <span>{coutdown.hours}</span>
        <span className="font-(family-name:--font-lobster)">Stunden</span>
      </div>
      <div className="flex flex-col items-center text-2xl md:text-4xl">
        <span>{coutdown.minutes}</span>
        <span className="font-(family-name:--font-lobster)">Minuten</span>
      </div>
    </div>
  );
}

export default Countdown;

"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";

const CountdownTimer = () => {
  const [secondsLeft, setSecondsLeft] = useState(150);
  const [isActive, setIsActive] = useState(false);

  const handleTimeUp = () => {
    console.log("Time is up!");
    setIsActive(false);
  };

  useEffect(() => {
    let timerId: any;

    if (isActive && secondsLeft > 0) {
      timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
    } else if (!isActive && secondsLeft !== 150) {
      clearTimeout(timerId);
    }

    return () => clearTimeout(timerId);
  }, [secondsLeft, isActive]);

  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  return (
    <div className="my-4 w-96 rounded-lg border p-8">
      <div className="flex flex-col items-center justify-center gap-4 ">
        <div> Remaining Time: {secondsLeft}</div>
        <div className="flex items-center justify-center gap-2">
          <Button onClick={startTimer}>Start</Button>
          <Button onClick={stopTimer}>Stop</Button>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;

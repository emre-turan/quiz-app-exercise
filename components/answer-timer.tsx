"use client";

import { useState, useEffect, useRef } from "react";

interface AnswerTimerProps {
  duration: number;
  onTimeUp: () => void;
}

const AnswerTimer = ({ duration, onTimeUp }: AnswerTimerProps) => {
  const [counter, setCounter] = useState(0);
  const [progressLoaded, setProgressLoaded] = useState(0);
  const intervalRef = useRef<number>();

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setCounter((current) => current + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    setProgressLoaded(100 * (counter / duration));

    if (counter === duration) {
      clearInterval(intervalRef.current);

      setTimeout(() => {
        onTimeUp();
      }, 1000);
    }
  }, [counter]);

  return (
    <div className="absolute left-0 top-0 max-w-full border-b border-solid">
      <div
        style={{
          width: `${progressLoaded}%`,
          backgroundColor: `${
            progressLoaded < 40
              ? "lightgreen"
              : progressLoaded < 80
                ? "orange"
                : "red"
          }`,
        }}
        className="h-2 w-[0] duration-1000 ease-linear"
      ></div>
    </div>
  );
};

export default AnswerTimer;

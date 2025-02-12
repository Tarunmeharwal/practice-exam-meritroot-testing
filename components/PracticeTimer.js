"use client";
import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";

const PracticeTimer = ({ initialTime, onTimeEnd, isDarkMode, toggleTheme }) => {
  const [time, setTime] = useState(initialTime);
  const [isTimerVisible, setIsTimerVisible] = useState(true);

  useEffect(() => {
    let timer;
    if (isTimerVisible && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (time === 0 && onTimeEnd) {
      onTimeEnd();
    }

    return () => clearInterval(timer);
  }, [isTimerVisible, time, onTimeEnd]);

  useEffect(() => {
    // Apply theme to the body element
    document.body.className = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };

  return (
    <div
      className={`flex justify-between items-center mt-4 mb-4 transition-all duration-300 ${
        isDarkMode ? " text-white" : " text-gray-900"
      }`}
    >
      {/* Timer */}
      <div className="flex-1 flex justify-center">
        {isTimerVisible ? (
          <div className="flex items-center gap-2">
            <span className="text-lg md:text-xl font-semibold">
              {formatTime(time)}
            </span>
            <button
              className="border border-gray-400 px-3 md:py-1 text-sm md:text-md rounded-full hover:bg-gray-200"
              onClick={() => setIsTimerVisible(false)}
            >
              Hide
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <FaClock className="text-2xl" />
            <button
              className="border border-gray-400 px-3 md:py-1 text-sm md:text-md rounded-full hover:bg-gray-200"
              onClick={() => setIsTimerVisible(true)}
            >
              Show Timer
            </button>
          </div>
        )}
      </div>

      {/* Theme Toggle */}
      {/* <div className="absolute right-4">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isDarkMode}
            onChange={toggleTheme}
          />
          <div className="w-11 h-6 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div> */}
    </div>
  );
};

export default PracticeTimer;

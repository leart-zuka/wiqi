import { useState } from "react";

const SuperpositionButton = () => {
  const [hoverColor, setHoverColor] = useState("");

  const getRandomColorClass = () => {
    const colors = ["bg-blue-700", "bg-rose-700"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleMouseEnter = () => {
    const randomColor = getRandomColorClass();
    setHoverColor(randomColor);
  };

  const handleMouseLeave = () => {
    setHoverColor("");
  };

  return (
    <button
      className={`rounded-md p-1 text-white font-bold bg-gradient-to-tr from-blue-700 to-rose-700`}
    >
      <span
        className={`flex w-full rounded p-2 transition duration-500 ${
          hoverColor ? hoverColor : "bg-black"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        This is a button
      </span>
    </button>
  );
};

export default SuperpositionButton;

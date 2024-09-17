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
    <div
      className={`mx-auto flex w-fit rounded-md bg-gradient-to-r from-blue-700 to-rose-700`}
    >
      <button
        className={`p-2 transition-all rounded-md  duration-500 hover:opacity-100 ${hoverColor}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="h-full w-full">Test</div>
      </button>
    </div>
  );
};

export default SuperpositionButton;

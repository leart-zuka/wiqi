import { useState } from "react";

interface SuperpositionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const SuperpositionButton: React.FC<SuperpositionButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
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
    <div className="w-fit rounded-md bg-gradient-to-r from-blue-700 to-rose-700">
      <button
        className={`rounded-md p-2 transition-all duration-500 hover:opacity-100 ${hoverColor} ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div className="">{children}</div>
      </button>
    </div>
  );
};

export default SuperpositionButton;

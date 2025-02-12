"use client"

const TooltipIcon = ({ Icon, tooltipText, onClick, isActive, activeClass, defaultClass }) => {
  return (
    <div className="relative group inline-block">
      <Icon
        className={`${defaultClass} ${isActive ? activeClass : ''} cursor-pointer`}
        onClick={onClick}
      />
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-sm rounded-md px-3 py-2 mt-2 transition-all duration-300 ease-in-out scale-95 group-hover:scale-100">
        <span>{tooltipText}</span>
      </div>
    </div>
  );
};

export default TooltipIcon;

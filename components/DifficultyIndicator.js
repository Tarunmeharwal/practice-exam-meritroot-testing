const DifficultyIndicator = ({ difficulty }) => {
    return (
      <div className="flex items-center gap-2 capitalize">
       <span className="text-gray-500 flex text-xs relative top-1 px-1 text-white bg-gray-700 rounded-md">{difficulty}</span>
  
        <div className="flex items-end gap-1">
          {difficulty === "easy" && (
            <>
              <div className="w-1 h-2 bg-green-500 rounded-md"></div>
              <div className="w-1 h-3 bg-gray-300 rounded-md"></div>
              <div className="w-1 h-4 bg-gray-300 rounded-md"></div>
             
            </>
          )}
          {difficulty === "medium" && (
            <>
              <div className="w-1 h-2 bg-orange-500 rounded-md"></div>
              <div className="w-1 h-3 bg-orange-500 rounded-md"></div>
              <div className="w-1 h-4 bg-gray-300 rounded-md"></div>
              
            </>
          )}
          {difficulty === "hard" && (
            <>
              <div className="w-1 h-2 bg-red-500 rounded-md"></div>
              <div className="w-1 h-3 bg-red-500 rounded-md"></div>
              <div className="w-1 h-4 bg-red-500 rounded-md"></div>
              
            </>
          )}
        </div>
      </div>
    );
  };
  
  export default DifficultyIndicator;
  
// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation"; // Import useRouter for navigation
// import { AiOutlineClockCircle, AiOutlineHome } from "react-icons/ai";
// import { MdHelpOutline } from "react-icons/md";
// import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
// import TooltipIcon from "./TooltipIcon";

// const IconSection = ({ handleModal, course }) => {
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const router = useRouter(); // Initialize the router

//   const toggleBookmark = () => {
//     setIsBookmarked((prev) => !prev);
//   };

//   const handleHomeClick = () => {
//     router.push(`/${course}`); // Navigate to the /practice page
//   };

//   return (
//     <div className="flex items-center md:gap-4 gap-2">
//       {/* Home Icon */}
//       <TooltipIcon
//         Icon={AiOutlineHome}
//         tooltipText="Home"
//         onClick={handleHomeClick}
//         defaultClass="text-gray-500 text-2xl hover:text-purple-500"
//       />

//       {/* Clock Icon */}
//       <TooltipIcon
//         Icon={AiOutlineClockCircle}
//         tooltipText="Average Time: 2 mins"
//         defaultClass="text-gray-500 text-2xl hover:text-blue-500"
//       />

//       {/* Help Icon */}
//       <TooltipIcon
//         Icon={MdHelpOutline}
//         tooltipText="Doubt"
//         onClick={() => handleModal("doubt")}
//         defaultClass="text-gray-500 text-2xl hover:text-green-500"
//       />

//       {/* Bookmark Icon */}
//       <TooltipIcon
//         Icon={isBookmarked ? IoBookmark : IoBookmarkOutline}
//         tooltipText="Bookmark"
//         onClick={toggleBookmark}
//         isActive={isBookmarked}
//         activeClass="text-yellow-500"
//         defaultClass="text-gray-500 text-2xl hover:text-yellow-500"
//       />
//     </div>
//   );
// };

// export default IconSection;


// 'use client';
// import React, { useState } from "react";
// import { useRouter } from "next/navigation"; // Import useRouter for navigation
// import { AiOutlineClockCircle, AiOutlineHome } from "react-icons/ai";
// import { MdHelpOutline } from "react-icons/md";
// import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
// import TooltipIcon from "./TooltipIcon";

// const IconSection = ({ handleModal, course, isBookmarked, toggleBookmark  }) => {
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const router = useRouter(); // Initialize the router

//   const toggleBookmark = () => {
//     setIsBookmarked((prev) => !prev);
//   };

//   const handleHomeClick = () => {
//     // Option 1: If course is an object with a slug property
//     if (course && course.slug) {
//       router.push(`/${course.slug}`);
//     } 
//     // Option 2: If course is just a slug string
//     else if (typeof course === "string") {
//       router.push(`/${course}`);
//     }
//   };

//   return (
//     <div className="flex items-center md:gap-4 gap-2">
//       {/* Home Icon */}
//       <TooltipIcon
//         Icon={AiOutlineHome}
//         tooltipText="Home"
//         onClick={handleHomeClick}
//         defaultClass="text-gray-500 text-2xl hover:text-purple-500"
//       />

//       {/* Clock Icon */}
//       <TooltipIcon
//         Icon={AiOutlineClockCircle}
//         tooltipText="Average Time: 2 mins"
//         defaultClass="text-gray-500 text-2xl hover:text-blue-500"
//       />

//       {/* Help Icon */}
//       <TooltipIcon
//         Icon={MdHelpOutline}
//         tooltipText="Doubt"
//         onClick={() => handleModal("doubt")}
//         defaultClass="text-gray-500 text-2xl hover:text-green-500"
//       />

//       {/* Bookmark Icon */}
//       <TooltipIcon
//         Icon={isBookmarked ? IoBookmark : IoBookmarkOutline}
//         tooltipText="Bookmark"
//         onClick={toggleBookmark}
//         isActive={isBookmarked}
//         activeClass="text-yellow-500"
//         defaultClass="text-gray-500 text-2xl hover:text-yellow-500"
//       />
//     </div>
//   );
// };

// export default IconSection;


'use client';
import React from "react";
import { useRouter } from "next/navigation";
import { AiOutlineClockCircle, AiOutlineHome } from "react-icons/ai";
import { MdHelpOutline } from "react-icons/md";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import TooltipIcon from "./TooltipIcon";

const IconSection = ({ handleModal, course, isBookmarked, toggleBookmark }) => {
  const router = useRouter();

  const handleHomeClick = () => {
    // If course is an object with a slug, use that. Otherwise, assume it's a string.
    if (course && course.slug) {
      router.push(`/${course.slug}`);
    } else if (typeof course === "string") {
      router.push(`/${course}`);
    }
  };

  return (
    <div className="flex items-center md:gap-4 gap-2">
      {/* Home Icon */}
      <TooltipIcon
        Icon={AiOutlineHome}
        tooltipText="Home"
        onClick={handleHomeClick}
        defaultClass="text-gray-500 text-2xl hover:text-purple-500"
      />

      {/* Clock Icon */}
      <TooltipIcon
        Icon={AiOutlineClockCircle}
        tooltipText="Average Time: 2 mins"
        defaultClass="text-gray-500 text-2xl hover:text-blue-500"
      />

      {/* Help Icon */}
      <TooltipIcon
        Icon={MdHelpOutline}
        tooltipText="Doubt"
        onClick={() => handleModal("doubt")}
        defaultClass="text-gray-500 text-2xl hover:text-green-500"
      />

      {/* Bookmark Icon */}
      <TooltipIcon
        Icon={isBookmarked ? IoBookmark : IoBookmarkOutline}
        tooltipText="Bookmark"
        onClick={toggleBookmark}
        isActive={isBookmarked}
        activeClass="text-yellow-500"
        defaultClass="text-gray-500 text-2xl hover:text-yellow-500"
      />
    </div>
  );
};

export default IconSection;

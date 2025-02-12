"use client"
import React from 'react';
import { FaRobot, FaLink, FaBrain, FaLightbulb, FaPlayCircle, FaFilePdf, FaUserTie } from 'react-icons/fa';
import { AiOutlineBook, AiOutlineInfoCircle, AiOutlineSolution } from 'react-icons/ai';
import { MdOutlineTipsAndUpdates } from 'react-icons/md';
import Link from 'next/link';

const ActionButtons = ({ handleModal }) => {
  const buttonsGroup1 = [
    {
      icon: <FaRobot className="text-white text-xl" />,
      bg: 'bg-green-500',
      hoverBg: 'hover:bg-green-600',
      title: 'AI Assistance',
      modal: 'aiAssistance',
    },
    // {
    //   icon: <AiOutlineBook className="text-gray-500 text-xl" />,
    //   bg: 'bg-gray-200',
    //   hoverBg: 'hover:bg-gray-300',
    //   title: 'Sample Questions',
    //   modal: 'sampleQuestion',
    // },
    // {
    //   icon: <FaLink className="text-gray-500 text-xl" />,
    //   bg: 'bg-gray-200',
    //   hoverBg: 'hover:bg-gray-300',
    //   title: "PYQ's",
    //   modal: 'pyqs',
    // },
    // {
    //   icon: <FaBrain className="text-gray-500 text-xl" />,
    //   bg: 'bg-gray-200',
    //   hoverBg: 'hover:bg-gray-300',
    //   title: 'Mindmap',
    //   modal: 'mindmap',
    // },
    {
      icon: <MdOutlineTipsAndUpdates className="text-gray-500 text-xl" />,
      bg: 'bg-gray-200',
      hoverBg: 'hover:bg-gray-300',
      title: 'Tips',
      modal: 'tips',
    },
    {
      icon: <AiOutlineSolution className="text-gray-500 text-xl" />,
      bg: 'bg-gray-200',
      hoverBg: 'hover:bg-gray-300',
      title: 'Solution',
      modal: 'solution',
    },
    // {
    //   icon: <AiOutlineInfoCircle className="text-gray-500 text-xl" />,
    //   bg: 'bg-gray-200',
    //   hoverBg: 'hover:bg-gray-300',
    //   title: 'More Info',
    //   modal: 'more-info',
    // },
  ];

  const buttonsGroup2 = [
    {
      icon: <FaUserTie className="text-gray-500 text-xl" />,
      bg: 'bg-gray-200',
      hoverBg: 'hover:bg-gray-300',
      title: 'Find Mentor',
      modal: 'findMentor',
      link: '/mentor'
    },
    {
      icon: <FaLightbulb className="text-gray-500 text-xl" />,
      bg: 'bg-gray-200',
      hoverBg: 'hover:bg-gray-300',
      title: 'Hint',
      modal: 'hint',
    },
    {
      icon: <FaPlayCircle className="text-white text-xl" />,
      bg: 'bg-blue-500',
      hoverBg: 'hover:bg-blue-600',
      title: 'Video Solution',
      modal: 'videoSolution',
    },
    {
      icon: <FaFilePdf className="text-gray-500 text-xl" />,
      bg: 'bg-gray-200',
      hoverBg: 'hover:bg-gray-300',
      title: 'Formula Booklet',
      modal: 'formulaBooklet',
    },
  ];


const renderButton = (button, index) => (
  <div key={index} className="relative group inline-block">
   
    {button.link ? (
      <Link href={button.link} target="_blank">
        
          <button
            className={`${button.bg} text-white md:p-2 p-1 rounded-full ${button.hoverBg} flex items-center justify-center`}
          >
            {button.icon}
          </button>
      </Link>
    ) : (
      <button
        className={`${button.bg} text-white md:p-2 p-1 rounded-full ${button.hoverBg} flex items-center justify-center`}
        onClick={() => handleModal(button.modal)}
      >
        {button.icon}
      </button>
    )}

    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-sm rounded-md px-3 py-2 mt-2 transition-all duration-300 ease-in-out scale-95 group-hover:scale-100">
      <span>{button.title}</span>
    </div>
  </div>
);

  return (
    <div className="border-t text-sm border-gray-200 p-2 gap-2 flex flex-col mt-4 ">
      <div className="flex justify-between items-center mx-10">
        <div className="flex gap-2">{buttonsGroup1.map(renderButton)}</div>
        <div className="flex gap-2">{buttonsGroup2.map(renderButton)}</div>
      </div>
    </div>
  );
};

export default ActionButtons;

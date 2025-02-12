"use client";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaAward, FaBrain, FaCoffee, FaCommentDots, FaHandsHelping, FaLightbulb, FaMapMarkerAlt, FaQuestionCircle, FaRegStar, FaRobot, FaThumbsUp, FaUserGraduate } from "react-icons/fa";

const Modals = ({ showModal, closeModal, hint, formula,aiAssistance, mindmap, pyqs, sampleQuestion, tips, solution }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [subModal, setSubModal] = useState(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    if (!showModal) return null;

    const handleLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setPageNumber(1);
    };


    const handlePageChange = (direction) => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentPage((prev) => prev + direction);
            setIsTransitioning(false);
        }, 300); // Match this duration to your animation time
    };

    const openSubModal = (type) => {
        setSubModal(type);
    };

    const closeSubModal = () => {
        setSubModal(null);
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            setMessages([...messages, { sender: "You", text: message }]);
            setMessage(""); // Clear input field after sending message
        }
    };
    const renderSubModalContent = () => {
        switch (subModal) {
            case "detail":
                return <p>Here are the details about the mentor.</p>;
            case "experience":
                return <p>Here is the mentor&apos;s experience.</p>;
            case "location":
                return <p>Here is the mentor&apos;s location.</p>;
            case "chat":
                return (
                    <div className="chat-modal">
                        <div className="messages">
                            {messages.map((msg, index) => (
                                <div key={index} className="message">
                                    <strong>{msg.sender}:</strong> {msg.text}
                                </div>
                            ))}
                        </div>
                        <div className="input-area">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="chat-input"
                            />
                            <button onClick={handleSendMessage} className="send-button">
                                Send
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };



    const renderModalContent = () => {
        switch (showModal) {
            case "doubt":
                return (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full sm:w-11/12 md:w-3/4 lg:w-2/3 overflow-y-auto max-h-[90vh]">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Ask Your Doubt</h2>
                            <div className="mb-4">
                                <label htmlFor="doubtText" className="block text-gray-600 mb-2">Describe your doubt:</label>
                                <textarea
                                    id="doubtText"
                                    className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="4"
                                    placeholder="Type your doubt here..."
                                ></textarea>
                            </div>

                            <div className="flex flex-col gap-4 mb-4 sm:flex-row">
                                <button
                                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-full"
                                    onClick={() => handleSubmitDoubt()}
                                >
                                    Submit Doubt
                                </button>
                            </div>

                            <div className="text-center text-gray-600 mb-4">
                                <p>Or you can also ask for live support!</p>
                            </div>
                            <div className="flex flex-col gap-4 mb-4 sm:flex-row">
                                <button
                                    className="border-2 border-red-600 text-black py-2 px-4 rounded-full hover:bg-red-600 hover:text-white w-full flex items-center justify-center gap-2"
                                    onClick={() => startLiveSupport()}
                                >
                                    ASK LIVE
                                    <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                                </button>
                            </div>

                            {/* Close Button */}
                            <div className="text-center">
                                <button
                                    className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case "videoSolution":
                return (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full sm:w-11/12 md:w-3/4 lg:w-2/3 overflow-y-auto max-h-[90vh]">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-bold text-gray-800">Video Tutorial</h2>
                                <button
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={closeModal}
                                >
                                    <AiOutlineClose className="text-2xl" />
                                </button>
                            </div>

                            {/* Video Player */}
                            <div className="mt-4">
                                <iframe
                                    className="w-full h-48 sm:h-64 md:h-80 rounded-lg"
                                    src="https://www.youtube.com/embed/tpdlBZwTJA0?si=ezLF0mDOSMQHVM5B"
                                    title="Video Tutorial"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            {/* Optional Additional Content */}
                            <div className="mt-4 text-gray-600">
                                <p>Learn more about this topic with the video tutorial above.</p>
                            </div>
                        </div>
                    </div>
                );

            case "hint":
                return (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg  shadow-lg p-6 max-w-3xl w-full transform scale-95 transition-all duration-300 ease-in-out">
                            {/* Modal Header */}
                            <div className="flex justify-between items-center border-b border-gray-200">
                                <h2 className="text-lg font-bold text-gray-800">Hint</h2>
                            </div>

                            {/* Modal Content */}
                            <div className="mt-4">
                                {/* <p className="text-gray-600">{hint} </p> */}
                                <div dangerouslySetInnerHTML={{ __html: hint }} />
                            </div>

                            {/* Close Button */}
                            <div className="mt-6 flex justify-end">
                                <button
                                    className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition-colors duration-300 ease-in-out"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>

                );
            case "aiAssistance":
                return (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 px-6 py-4 border-b border-gray-200 rounded-lg shadow-lg relative p-6 overflow-auto max-h-[90vh]">
                            {/* Close Button */}
                            <button
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                                onClick={closeModal}
                            >
                                ✖
                            </button>

                            {/* Modal Content */}
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                                <FaRobot className="text-green-500 mr-2" />
                                AI Assistance
                            </h2>
                            <p className="text-gray-600 mb-6 break-words">
                                Get smart suggestions and insights for solving this question
                                effectively. Select a feature below to proceed:
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Option 1 */}
                                <div className="p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg cursor-pointer hover:bg-gray-200 transition">
                                    <div className="flex items-center space-x-4">
                                        <FaBrain className="text-blue-500 text-3xl" />
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-700 break-words">
                                                Detailed Solution
                                            </h3>
                                            <p className="text-sm text-gray-500 break-words">
                                                View a step-by-step guide to solve this problem.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Option 2 */}
                                <div className="p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg cursor-pointer hover:bg-gray-200 transition">
                                    <div className="flex items-center space-x-4">
                                        <FaLightbulb className="text-yellow-500 text-3xl" />
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-700 break-words">
                                                Hints
                                            </h3>
                                            <p className="text-sm text-gray-500 break-words">
                                                Get quick tips to nudge you in the right direction.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Option 3 */}
                                <div className="p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg cursor-pointer hover:bg-gray-200 transition">
                                    <div className="flex items-center space-x-4">
                                        <FaQuestionCircle className="text-red-500 text-3xl" />
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-700 break-words">
                                                FAQs
                                            </h3>
                                            <p className="text-sm text-gray-500 break-words">
                                                Find answers to frequently asked questions.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Option 4 */}
                                <div className="p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg cursor-pointer hover:bg-gray-200 transition">
                                    <div className="flex items-center space-x-4">
                                        <FaRobot className="text-green-500 text-3xl" />
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-700 break-words">
                                                AI Recommendations
                                            </h3>
                                            <p className="text-sm text-gray-500 break-words">
                                                Personalized AI-based suggestions for better solutions.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Chat Section */}
                            <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2 break-words">
                                    Chat with AI
                                </h3>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        placeholder="Type your question..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                );

            case "formulaBooklet":
                return (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                            {/* Fixed Header */}
                            <div className="sticky top-0 bg-white z-10 flex justify-between items-center px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-bold text-gray-800">Formula Booklet</h2>
                            </div>
                
                            {/* Modal Content */}
                            <div className="flex-1 px-6 py-4 overflow-auto">
                                {formula && (formula.endsWith(".png") || formula.endsWith(".jpg") || formula.endsWith(".jpeg")) ? (
                                    <>
                                        <Image
                                            src={formula}
                                            alt="Formula Booklet"
                                            width={500} // specify a width
                                            height={300} // specify a height
                                            className="w-full h-auto"
                                        />
                                        <div className="text-gray-700 mt-4">
                                            <p>This image contains the formula booklet for your reference.</p>
                                        </div>
                                    </>
                                ) : formula ? (
                                    <div className="text-gray-700 mb-2">
                                        {/* <p>{formula}</p> */}
                                        <div dangerouslySetInnerHTML={{ __html: formula }} />
                                    </div>
                                ) : (
                                    <p>No formula booklet available.</p>
                                )}
                                   <div className="mt-6 flex justify-end">
                                <button
                                    className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition-colors duration-300 ease-in-out"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                            </div>
                        </div>
                    </div>
                );
                



            case "tips":
                return (

                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full transform scale-95 transition-all duration-300 ease-in-out">
                            {/* Modal Header */}
                            <div className="flex justify-between items-center border-b border-gray-200">
                                <h2 className="text-lg font-bold text-gray-800">Tips</h2>
                            </div>

                            {/* Modal Content */}
                            <div className="mt-4">
                                {/* <p className="text-gray-600">{tips}</p> */}
                                <div dangerouslySetInnerHTML={{ __html: tips }} /> 
                            </div>

                            {/* Close Button */}
                            <div className="mt-6 flex justify-end">
                                <button
                                    className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition-colors duration-300 ease-in-out"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>

                );
            case "findMentor":
                return (

                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-5xl max-h-[100vh] overflow-hidden shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-xl font-semibold text-gray-500 mx-auto uppercase">
                                    Meritroot Mentors
                                </h1>
                            </div>
                            <div className="overflow-auto max-h-[80vh]">
                                <div
                                    className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10 transform transition-all duration-300 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
                                        }`}
                                >
                                    {currentMentors.map((mentor, index) => (
                                        <div
                                            key={index}
                                            className="mt-10 relative bg-white w-72 p-6 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out"
                                        >
                                            <div className="relative -mt-16 mx-auto w-56 h-64 rounded-lg overflow-hidden shadow-lg">
                                                {/* Correct usage of the next/image component */}
                                                <Image
                                                    src={mentor.image}  // Image source (URL or path)
                                                    alt={mentor.name}    // Alt text for the image
                                                    width={224}          // Width for the image (similar to w-56)
                                                    height={256}         // Height for the image (similar to h-64)
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="mt-8 text-center">
                                                <h2 className="text-lg font-semibold">{mentor.name}</h2>
                                                <p className="text-sm text-gray-600">{mentor.role}</p>
                                                <div className="flex justify-center space-x-4 mt-4">
                                                    <button
                                                        onClick={() => openSubModal("detail")}
                                                        className="text-blue-500 hover:text-blue-700 transition-all duration-300"
                                                    >
                                                        <FaLightbulb className="text-xl" />
                                                    </button>
                                                    <button
                                                        onClick={() => openSubModal("experience")}
                                                        className="text-green-500 hover:text-green-700 transition-all duration-300"
                                                    >
                                                        <FaBrain className="text-xl" />
                                                    </button>
                                                    <button
                                                        onClick={() => openSubModal("location")}
                                                        className="text-red-500 hover:text-red-700 transition-all duration-300"
                                                    >
                                                        <FaMapMarkerAlt className="text-xl" />
                                                    </button>
                                                    <button
                                                        onClick={() => openSubModal("chat")}
                                                        className="text-purple-500 hover:text-purple-700 transition-all duration-300"
                                                    >
                                                        <FaCommentDots className="text-xl" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Pagination Controls */}
                                <div className="flex justify-between items-center mt-6">
                                    <button
                                        onClick={() => handlePageChange(-1)}
                                        disabled={currentPage === 1}
                                        className={`px-4 py-2 bg-gray-300 rounded ${currentPage === 1
                                            ? "opacity-50 cursor-not-allowed"
                                            : "hover:bg-gray-400"
                                            }`}
                                    >
                                        Previous
                                    </button>
                                    <span className="text-sm text-gray-600">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button
                                        onClick={() => handlePageChange(1)}
                                        disabled={currentPage === totalPages}
                                        className={`px-4 py-2 bg-gray-300 rounded ${currentPage === totalPages
                                            ? "opacity-50 cursor-not-allowed"
                                            : "hover:bg-gray-400"
                                            }`}
                                    >
                                        More
                                    </button>
                                </div>
                            </div>
                        </div>
                        {subModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
                                <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-semibold capitalize">
                                            {subModal} Details
                                        </h2>
                                        <button onClick={closeSubModal} className="text-gray-500">
                                            <AiOutlineClose className="text-xl" />
                                        </button>
                                    </div>
                                    <div>{renderSubModalContent()}</div>
                                </div>
                            </div>
                        )}
                    </div>



                );

            case "solution":
                return (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full transform scale-95 transition-all duration-300 ease-in-out">
                            {/* Modal Header */}
                            <div className="flex justify-between items-center border-b border-gray-200">
                                <h2 className="text-lg font-bold text-gray-800">Solution</h2>
                            </div>

                            {/* Modal Content */}
                            <div className="mt-4">
                                {/* <p className="text-gray-600">{solution}</p> */}
                                <div dangerouslySetInnerHTML={{ __html: solution }} />
                            </div>

                            {/* Close Button */}
                            <div className="mt-6 flex justify-end">
                                <button
                                    className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition-colors duration-300 ease-in-out"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>

                );


            default:
                return <div>Modal content not defined</div>;
        }
    };

    return (
        <div>
            {renderModalContent()}
        </div>


    );
};

export default Modals;

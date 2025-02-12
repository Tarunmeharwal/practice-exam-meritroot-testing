// // "use client";

// // import { useEffect, useState } from "react";
// // import { useParams, useRouter } from "next/navigation";
// // import PracticeTimer from "@/components/PracticeTimer";
// // import DifficultyIndicator from "@/components/DifficultyIndicator";
// // import IconSection from "@/components/IconSection";
// // import ActionButtons from "@/components/ActionButtons";
// // import Modals from "@/components/Modals";
// // import { IoIosArrowRoundBack, IoIosArrowRoundForward, IoIosCheckmark } from "react-icons/io";

// // export default function PracticePage() {
// //   const { practice } = useParams();
// //   const decodedTopic = decodeURIComponent(practice).replace(/-/g, " ");

// //   const [quizzes, setQuizzes] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [currentQuestion, setCurrentQuestion] = useState(0);
// //   const [showModal, setShowModal] = useState(null);
// //   const [selectedOptions, setSelectedOptions] = useState([]);
// //   const [isAnswered, setIsAnswered] = useState(false);

// //   const router = useRouter();

// //   useEffect(() => {
// //     async function fetchQuizzes() {
// //       try {
// //         const res = await fetch(`/api/quizzes?topic=${encodeURIComponent(decodedTopic)}`);
// //         const data = await res.json();

// //         if (data.success) {
// //           setQuizzes(data.quizzes);
// //         } else {
// //           throw new Error("Failed to fetch quizzes");
// //         }
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     fetchQuizzes();
// //   }, [decodedTopic]);

// //   if (loading) return <div className="p-4 text-blue-500">Loading...</div>;
// //   if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

// //   const finishQuiz = () => {
// //     alert("Quiz finished!");
// //     router.push("/jee");
// // };

// // const handleOptionSelect = (option) => {
// //     if (current.type === "Select only 1 option") {
// //         setSelectedOptions([option]);
// //         setIsAnswered(true);
// //     } else if (current.type === "Select all that apply") {
// //         // Toggle selection for multiple selection
// //         setSelectedOptions((prev) =>
// //             prev.includes(option)
// //                 ? prev.filter((o) => o !== option)
// //                 : [...prev, option]
// //         );
// //     }
// // };

// // const nextQuestion = () => {
// //     setSelectedOptions([]);
// //     setIsAnswered(false);
// //     setCurrentQuestion((prev) => prev + 1);
// //     window.scrollTo({ top: 0, behavior: "smooth" });
// // };

// // const prevQuestion = () => {
// //     setSelectedOptions([]);
// //     setIsAnswered(false);
// //     setCurrentQuestion((prev) => prev - 1);
// //     window.scrollTo({ top: 0, behavior: "smooth" });
// // };

// // const handleModal = (type) => {
// //     setShowModal(type);
// // };

// // const closeModal = () => {
// //     setShowModal(null);
// // };

// //   // Ensure `quizzes` is not empty before accessing `questions`
// //   const questions = quizzes.length > 0 ? quizzes[0].questions : [];
// //   const current = questions.length > 0 ? questions[currentQuestion] : null;
// //   const progress = ((currentQuestion + 1) / questions.length) * 100;

// //   return (
// //     <>
// //      <div className='bg-gray-100 min-h-screen w-full flex flex-col '>
// //      <div className=" flex flex-col justify-center items-center md:p-6 p-2">
// //       <PracticeTimer
// //         initialTime={1800}
// //         onTimeEnd={() => {
// //           alert("Time is up!");
// //           router.push("/jee");
// //         }}
// //       />
// //          <div className="bg-white rounded-3xl w-full max-w-7xl flex flex-wrap relative">
// //                 <div className="md:py-10 md:px-6 px-4 py-6 flex flex-col w-full">
// //                     <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
// //                         <div
// //                             className="h-full bg-blue-500 rounded-full"
// //                             style={{ width: `${progress}%` }}
// //                         ></div>
// //                     </div>

// //                     <div className="flex justify-between items-center mb-6">
// //                         <h2 className="text-gray-800 font-bold md:text-xl text-md">{current.title}</h2>
// //                         <div className="flex items-center gap-4">
// //                             <DifficultyIndicator difficulty={current.mode} />
// //                             <IconSection handleModal={handleModal} />
// //                         </div>
// //                     </div>
// //                     <hr />

// //                     <div className="md:flex md:gap-8 md:items-start">
// //                         <div className="md:w-1/2 p-6 p-2 relative rounded-lg text-left">
// //                             {current.isImageBased ? (
// //                                 <img
// //                                     src={current.question}
// //                                     alt={`Question ${currentQuestion + 1}`}
// //                                     className="w-full h-auto max-w-none"
// //                                 />
// //                             ) : (
// //                                 <p>{current.question}</p>
// //                             )}
// //                         </div>

// //                         <div className="md:w-1/2 bg-white p-4 rounded-lg space-y-4">
// //                             {current.options.map((option, index) => (
// //                                 <label
// //                                     key={index}
// //                                     className={`flex items-center justify-between p-3 rounded-full border ${selectedOptions.includes(option)
// //                                         ? isAnswered && isCorrect
// //                                             ? "bg-green-200 border-green-400"
// //                                             : isAnswered
// //                                                 ? "bg-red-200 border-red-400"
// //                                                 : "bg-blue-200 border-blue-400"
// //                                         : "hover:bg-gray-100 border-gray-300"
// //                                         } cursor-pointer`}
// //                                     onClick={() => handleOptionSelect(option)}
// //                                 >
// //                                     <div className="flex items-center">
// //                                         <span className="font-bold">{String.fromCharCode(65 + index)}</span>
// //                                         <span className="ml-2"> {option.image ? (
// //                             <img src={option.image} alt={`Option ${index}`} className='w-72' />
// //                         ) : (
// //                             <p>{option}</p>
// //                         )}</span>
// //                                     </div>

// //                                     {/* Conditional shape for right corner */}
// //                                     <span
// //                                         className={`w-5 h-5 flex justify-center items-center ${current.type === "Select all that apply" ? "rounded-sm" : "rounded-full"
// //                                             } border-2 border-gray-400`}
// //                                     >
// //                                         {selectedOptions.includes(option) && (
// //                                             <span
// //                                                 className={`w-3 h-3 ${current.type === "Select all that apply" ? "rounded-sm" : "rounded-full"
// //                                                     } bg-blue-600`}
// //                                             ></span>
// //                                         )}
// //                                     </span>
// //                                 </label>
// //                             ))}
// //                         </div>

// //                     </div>

// //                     {isAnswered && (
// //                         <div className="mt-4">
// //                             <p className={`text-sm ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
// //                                 {isCorrect ? "Correct!" : "Incorrect!"}
// //                             </p>
// //                         </div>
// //                     )}
// //                     <ActionButtons
// //                         handleModal={handleModal}
// //                         nextQuestion={nextQuestion}
// //                         prevQuestion={prevQuestion}
// //                         finishQuiz={finishQuiz}
// //                         isAnswered={isAnswered}
// //                     />
// //                     <Modals
// //                         showModal={showModal}
// //                         closeModal={closeModal}
// //                         hint={current.hint}
// //                         pdf={current.pdf}
// //                         moreInfo={current.moreInfo}
// //                         mindmap={current.mindmap}
// //                         formula={current.formula}
// //                         sampleQuestion={current.sampleQuestion}
// //                         tips={current.tips}
// //                         solution={current.solution}
// //                     />
// //                 </div>
// //             </div>

// //             <div className="w-full px-8 py-4">
// //                 <div className="flex justify-between">
// //                     {currentQuestion > 0 && (
// //                         <button
// //                             onClick={prevQuestion}
// //                             className="flex items-center justify-center gap-2 border border-black text-xl text-black md:py-3 md:px-4 py-1 px-3 rounded-full hover:bg-black hover:text-white leading-none"
// //                         >
// //                             <IoIosArrowRoundBack className="text-2xl" />
// //                         </button>
// //                     )}

// //                     {currentQuestion === questions.length - 1 ? (
// //                         <button
// //                             onClick={finishQuiz}
// //                             className="flex items-center justify-center gap-2 bg-green-500 text-white text-xl md:py-3 md:px-4 py-1 px-3 rounded-full hover:bg-green-600 leading-none"
// //                         >
// //                             <IoIosCheckmark className="text-2xl" />
// //                         </button>
// //                     ) : (
// //                         <button
// //                             onClick={nextQuestion}
// //                             className="flex items-center justify-center gap-2 border border-black text-xl text-black md:py-3 md:px-4 py-1 px-3 rounded-full hover:bg-black hover:text-white leading-none ml-auto"
// //                         >
// //                             <IoIosArrowRoundForward className="text-2xl" />
// //                         </button>
// //                     )}
// //                 </div>
// //             </div>




// //             </div>
// //             </div>
// //     </>
// //   );
// // }




"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PracticeTimer from "@/components/PracticeTimer";
import DifficultyIndicator from "@/components/DifficultyIndicator";
import IconSection from "@/components/IconSection";
import ActionButtons from "@/components/ActionButtons";
import Modals from "@/components/Modals";
import { IoIosArrowRoundBack, IoIosArrowRoundForward, IoIosCheckmark } from "react-icons/io";

export default function PracticePage() {
  const { course, practice } = useParams();
  const router = useRouter();

  const [subtopic, setSubtopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showModal, setShowModal] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    async function fetchSubtopicAndQuestions() {
      try {
        setLoading(true);
        setError(null);

        // Fetch subtopic by slug
        const subtopicRes = await fetch(`/api/subtopics?slug=${practice}`);
        const subtopicData = await subtopicRes.json();

        if (!subtopicData.success || !subtopicData.data) {
          throw new Error("Subtopic not found");
        }

        setSubtopic(subtopicData.data);

        // Fetch questions for this subtopic
        const questionsRes = await fetch(
          `/api/questions?subtopicId=${subtopicData.data._id}`
        );
        const questionsData = await questionsRes.json();

        if (questionsData.success) {
          setQuestions(questionsData.data);
        } else {
          throw new Error("Failed to fetch questions");
        }
      } catch (err) {
        console.error("Error in fetchSubtopicAndQuestions:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSubtopicAndQuestions();
  }, [practice]);

  if (loading) return <div className="p-4 text-blue-500">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  const finishQuiz = () => {
    alert("Quiz finished!");
    router.push("/jee");
  };

  const nextQuestion = () => {
    setSelectedOptions([]);
    setIsAnswered(false);
    setCurrentQuestion((prev) => (prev + 1) % questions.length);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevQuestion = () => {
    setSelectedOptions([]);
    setIsAnswered(false);
    setCurrentQuestion((prev) => (prev - 1 + questions.length) % questions.length);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleModal = (type) => {
    setShowModal(type);
  };

  const closeModal = () => {
    setShowModal(null);
  };

  const handleOptionSelect = (option) => {
    const current = questions[currentQuestion];
    if (current.questionType === "multiple") {
      setSelectedOptions((prev) =>
        prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
      );
    } else {
      setSelectedOptions([option]);
    }
    setIsAnswered(true);
  };

  const current = questions[currentQuestion] || {};
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isCorrect = selectedOptions.includes(current.correctAnswer);

  return (
    <div className="bg-gray-100 min-h-screen w-full flex flex-col">
      <div className="flex flex-col justify-center items-center md:p-6 p-2">
        <PracticeTimer
          initialTime={1800}
          onTimeEnd={() => {
            alert("Time is up!");
            router.push("/jee");
          }}
        />
        <div className="bg-white rounded-3xl w-full max-w-7xl flex flex-wrap relative">
          <div className="md:py-10 md:px-6 px-4 py-6 flex flex-col w-full">
            <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">{subtopic?.name}</h1>
              <div className="flex items-center gap-4">
                <DifficultyIndicator difficulty={current.questionLevel} />
                <IconSection handleModal={handleModal} />
              </div>
            </div>
            <hr />

            <div className="md:flex md:gap-8 md:items-start">
              <div className="md:w-1/2 p-6 p-2 relative rounded-lg text-left">
                <div
                  className="question-content"
                  dangerouslySetInnerHTML={{ __html: current.question }}
                />
              </div>

              <div className="md:w-1/2 bg-white p-4 rounded-lg space-y-4">
                {current.options?.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer ${
                      selectedOptions.includes(option)
                        ? isCorrect
                          ? "bg-green-100 border-green-400"
                          : "bg-red-100 border-red-400"
                        : "hover:bg-gray-100 border-gray-300"
                    }`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    <div className="flex items-center">
                      <span className="font-bold mr-2">{String.fromCharCode(65 + index)}</span>
                      <div dangerouslySetInnerHTML={{ __html: option }} />
                    </div>
                    {selectedOptions.includes(option) && (
                      <span className="text-blue-600">✓</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {isAnswered && (
              <div className="mt-4">
                <p className={`text-sm ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                  {isCorrect ? "Correct!" : "Incorrect!"}
                </p>
              </div>
            )}

            <ActionButtons
              handleModal={handleModal}
              nextQuestion={nextQuestion}
              prevQuestion={prevQuestion}
              finishQuiz={finishQuiz}
              isAnswered={isAnswered}
            />
            <Modals
              showModal={showModal}
              closeModal={closeModal}
              hint={current.hint}
              pdf={current.pdf}
              moreInfo={current.moreInfo}
              mindmap={current.mindmap}
              formula={current.formula}
              sampleQuestion={current.sampleQuestion}
              tips={current.tips}
              solution={current.solution}
            />
          </div>
        </div>

        <div className="w-full px-8 py-4">
          <div className="flex justify-between">
            {currentQuestion > 0 && (
              <button
                onClick={prevQuestion}
                className="flex items-center justify-center gap-2 border border-black text-xl text-black md:py-3 md:px-4 py-1 px-3 rounded-full hover:bg-black hover:text-white leading-none"
              >
                <IoIosArrowRoundBack className="text-2xl" />
              </button>
            )}

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={finishQuiz}
                className="flex items-center justify-center gap-2 bg-green-500 text-white text-xl md:py-3 md:px-4 py-1 px-3 rounded-full hover:bg-green-600 leading-none"
              >
                <IoIosCheckmark className="text-2xl" />
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="flex items-center justify-center gap-2 border border-black text-xl text-black md:py-3 md:px-4 py-1 px-3 rounded-full hover:bg-black hover:text-white leading-none ml-auto"
              >
                <IoIosArrowRoundForward className="text-2xl" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



// app/[course]/practice/[subtopic]/page.js
// 'use client';

// import { useParams } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import dynamic from 'next/dynamic';

// // Dynamically import TinyMCE editor
// const TextEditor = dynamic(() => import('@/components/TextEditor'), {
//   ssr: false,
//   loading: () => <p className="text-gray-500">Loading editor...</p>
// });

// const PracticePage = () => {
//   const { course, subtopic: subtopicSlug } = useParams();
//   const [subtopic, setSubtopic] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch subtopic details
//         const subtopicRes = await fetch(`/api/subtopics?slug=${subtopicSlug}`);
//         const subtopicData = await subtopicRes.json();
        
//         if (!subtopicData.success || !subtopicData.data) {
//           throw new Error('Subtopic not found');
//         }
        
//         setSubtopic(subtopicData.data);

//         // Fetch questions for this subtopic
//         const questionsRes = await fetch(`/api/questions?subtopicId=${subtopicData.data._id}`);
//         const questionsData = await questionsRes.json();
        
//         if (questionsData.success) {
//           setQuestions(questionsData.data);
//         }
//       } catch (error) {
//         console.error('Fetch error:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [subtopicSlug]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-pulse text-gray-600">Loading questions...</div>
//       </div>
//     );
//   }

//   if (!subtopic) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-red-500">Subtopic not found</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#F5F5FC] pt-24 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">
//             Practice: {subtopic.name}
//           </h1>
//           <p className="text-gray-600">{course} - {subtopic.name}</p>
//         </div>

//         {questions.length === 0 ? (
//           <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
//             No questions available for this subtopic yet.
//           </div>
//         ) : (
//           <div className="space-y-8">
//             {questions.map((question, index) => (
//               <div key={question._id} className="bg-white rounded-lg shadow-md p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <span className="text-sm font-medium text-gray-500">
//                     Question {index + 1} of {questions.length}
//                   </span>
//                   <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
//                     {question.questionLevel}
//                   </span>
//                 </div>

//                 <div className="mb-6">
//                   <TextEditor
//                     value={question.question}
//                     readOnly
//                     height="auto"
//                   />
//                 </div>

//                 <div className="grid gap-4 md:grid-cols-2">
//                   {question.options.map((option, idx) => (
//                     <div
//                       key={idx}
//                       className={`p-4 rounded-lg border ${
//                         question.correctAnswer === option
//                           ? 'border-green-500 bg-green-50'
//                           : 'border-gray-200'
//                       }`}
//                     >
//                       <TextEditor
//                         value={option}
//                         readOnly
//                         height="auto"
//                       />
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-6 space-y-4">
//                   {question.hint && (
//                     <div className="p-4 bg-yellow-50 rounded-lg">
//                       <h3 className="text-sm font-semibold text-yellow-800 mb-2">Hint</h3>
//                       <TextEditor
//                         value={question.hint}
//                         readOnly
//                         height="auto"
//                       />
//                     </div>
//                   )}

//                   {question.solution && (
//                     <div className="p-4 bg-green-50 rounded-lg">
//                       <h3 className="text-sm font-semibold text-green-800 mb-2">Solution</h3>
//                       <TextEditor
//                         value={question.solution}
//                         readOnly
//                         height="auto"
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PracticePage;
// 'use client';
// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import PracticeTimer from '@/components/PracticeTimer';
// import DifficultyIndicator from '@/components/DifficultyIndicator';
// import IconSection from '@/components/IconSection';
// import ActionButtons from '@/components/ActionButtons';
// import Modals from '@/components/Modals';
// import { IoIosArrowRoundBack, IoIosArrowRoundForward, IoIosCheckmark } from 'react-icons/io';

// const PracticePage = () => {
//   const { course, subtopic: topicSlug } = useParams();
//   const router = useRouter();

//   const [courseData, setCourseData] = useState(null);
//   const [topic, setTopic] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [showModal, setShowModal] = useState(null);
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [isAnswered, setIsAnswered] = useState(false);
//   const [bookmarkedQuestions, setBookmarkedQuestions] = useState({});

//   useEffect(() => {
//     if (!course) return;
//     const fetchCourseData = async () => {
//       try {
//         const res = await fetch(`/api/courses?slug=${course}`);
//         const json = await res.json();
//         if (json.success && json.data) {
//           setCourseData(json.data);
//         }
//       } catch (error) {
//         console.error('Error fetching course data:', error);
//       }
//     };
//     fetchCourseData();
//   }, [course]);

//   useEffect(() => {
//     if (!topicSlug) return;
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const topicRes = await fetch(`/api/topics?slug=${topicSlug}`);
//         const topicJson = await topicRes.json();
//         let topicData = topicJson.data;
//         if (Array.isArray(topicData)) {
//           topicData = topicData[0];
//         }
//         if (!topicJson.success || !topicData) {
//           throw new Error('Topic not found');
//         }
//         setTopic(topicData);

//         const questionsRes = await fetch(`/api/questions?topicId=${topicData._id}`);
//         const questionsJson = await questionsRes.json();
//         if (!questionsJson.success) {
//           throw new Error('Failed to fetch questions');
//         }
//         setQuestions(questionsJson.data || []);
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [topicSlug]);

//   // Update isAnswered based on current question's selected options
//   useEffect(() => {
//     const currentAnswer = selectedOptions[currentQuestion] || [];
//     setIsAnswered(currentAnswer.length > 0);
//   }, [currentQuestion, selectedOptions]);

//   const finishQuiz = () => {
//     const correctAnswers = questions.reduce((acc, question, index) => {
//       const selected = selectedOptions[index] || [];
//       if (question.questionType === 'multiple') {
//         const isCorrect =
//           selected.length === question.correctAnswer.length &&
//           selected.every((opt) => question.correctAnswer.includes(opt));
//         return isCorrect ? acc + 1 : acc;
//       } else {
//         return selected.includes(question.correctAnswer) ? acc + 1 : acc;
//       }
//     }, 0);
//     localStorage.setItem(
//       'quizResults',
//       JSON.stringify({
//         totalQuestions: questions.length,
//         correctAnswers,
//         questionData: questions,
//         selectedOptions,
//       })
//     );
//     router.push('/results');
//   };

//   const nextQuestion = () => {
//     setCurrentQuestion((prev) => (prev + 1) % questions.length);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const prevQuestion = () => {
//     setCurrentQuestion((prev) => (prev - 1 + questions.length) % questions.length);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleModal = (type) => {
//     setShowModal(type);
//   };

//   const closeModal = () => {
//     setShowModal(null);
//   };

//   // Update only the answer (using index) for the current question
//   const handleOptionSelect = (optionIndex) => {
//     const currentQuestionData = questions[currentQuestion];
//     const currentAnswer = selectedOptions[currentQuestion] || [];

//     let updatedOptions = [];
//     if (currentQuestionData.questionType === 'multiple') {
//       updatedOptions = currentAnswer.includes(optionIndex)
//         ? currentAnswer.filter((o) => o !== optionIndex)
//         : [...currentAnswer, optionIndex];
//     } else {
//       updatedOptions = currentAnswer.includes(optionIndex) ? [] : [optionIndex];
//     }

//     setSelectedOptions((prev) => {
//       const newSelected = [...prev];
//       newSelected[currentQuestion] = updatedOptions;
//       return newSelected;
//     });
//     setIsAnswered(updatedOptions.length > 0);
//   };

//   if (loading) return <div className="p-4 text-blue-500">Loading...</div>;
//   if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
//   if (!topic || questions.length === 0)
//     return <div className="p-4 text-center">No questions available for this topic.</div>;

//   const current = questions[currentQuestion];
//   // currentSelectedOptions now holds indices
//   const currentSelectedOptions = selectedOptions[currentQuestion] || [];
//   const progress = ((currentQuestion + 1) / questions.length) * 100;
//   const isCorrect =
//     current.questionType === 'multiple'
//       ? currentSelectedOptions.length === current.correctAnswer.length &&
//         currentSelectedOptions.every((opt) => current.correctAnswer.includes(opt))
//       : currentSelectedOptions.includes(current.correctAnswer);
//   const isBookmarked = current && bookmarkedQuestions[current._id] ? true : false;

//   const toggleBookmark = () => {
//     if (!current) return;
//     setBookmarkedQuestions((prev) => ({
//       ...prev,
//       [current._id]: !prev[current._id],
//     }));
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen w-full flex flex-col overflow-x-hidden">
//       <div className="flex flex-col justify-center items-center p-2 md:p-4 lg:p-6">
//         <PracticeTimer
//           initialTime={3600}
//           className="mb-4 md:mb-6 w-full max-w-7xl"
//           onTimeEnd={() => router.push('/')}
//         />

//         <div className="bg-white rounded-xl md:rounded-2xl w-full max-w-7xl shadow-lg md:shadow-xl">
//           <div className="p-4 md:p-6 lg:p-8">
//             <div className="w-full h-1.5 md:h-2 bg-gray-200 rounded-full mb-4 md:mb-6">
//               <div
//                 className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
//                 style={{ width: `${progress}%` }}
//               />
//             </div>

//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//               <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 break-words">
//                 {topic.name}
//               </h1>
//               <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
//                 <DifficultyIndicator difficulty={current.questionLevel} />
//                 <IconSection
//                   handleModal={handleModal}
//                   course={courseData}
//                   isBookmarked={isBookmarked}
//                   toggleBookmark={toggleBookmark}
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8">
//               <div className="w-full lg:w-1/2 p-3 md:p-4 bg-gray-50 rounded-lg md:rounded-xl border border-gray-200">
//                 <div
//                   className="question-content text-base md:text-lg text-gray-700 font-medium"
//                   dangerouslySetInnerHTML={{ __html: current.question }}
//                 />
//               </div>

//               <div className="w-full lg:w-1/2 space-y-3 md:space-y-4">
//                 {current.options?.map((option, index) => (
//                   <div
//                     key={index}
//                     className={`p-3 md:p-4 rounded-lg md:rounded-xl border-2 transition-all cursor-pointer
//                       ${
//                         currentSelectedOptions.includes(index)
//                           ? isCorrect
//                             ? 'bg-green-50 border-green-400'
//                             : 'bg-red-50 border-red-400'
//                           : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
//                       }
//                       ${isAnswered && !currentSelectedOptions.includes(index)
//                         ? 'opacity-75'
//                         : ''
//                       }`}
//                     onClick={() => handleOptionSelect(index)}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center">
//                         <span className="font-bold text-blue-600 mr-2 md:mr-3 text-sm md:text-base">
//                           {String.fromCharCode(65 + index)}
//                         </span>
//                         <div
//                           className="text-gray-700 text-sm md:text-base"
//                           dangerouslySetInnerHTML={{ __html: option }}
//                         />
//                       </div>
//                       <div className="flex items-center justify-center ml-2">
//                         {currentSelectedOptions.includes(index) ? (
//                           <div
//                             className={`flex items-center justify-center
//                               ${current.questionType === 'multiple' ? 'w-5 h-5 rounded-sm' : 'w-5 h-5 rounded-full'}
//                               ${isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
//                           >
//                             {current.questionType === 'multiple' ? (
//                               <span className="text-white text-sm">✓</span>
//                             ) : (
//                               <IoIosCheckmark className="text-lg" />
//                             )}
//                           </div>
//                         ) : (
//                           <div
//                             className={`border-2
//                               ${current.questionType === 'multiple' ? 'w-5 h-5 rounded-sm' : 'w-5 h-5 rounded-full'}
//                               ${currentSelectedOptions.includes(index) ? 'border-blue-500' : 'border-gray-400'}`}
//                           />
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {isAnswered && (
//               <div className="mt-4 md:mt-6 text-center">
//                 <p
//                   className={`text-base md:text-lg font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}
//                 >
//                   {isCorrect ? 'Correct! 🎉' : 'Incorrect 💡'}
//                 </p>
//                 {!isCorrect && current.solution && (
//                   <button
//                     onClick={() => setShowModal('solution')}
//                     className="text-blue-600 hover:underline mt-1 md:mt-2 text-sm md:text-base"
//                   >
//                     View Solution
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="w-full max-w-7xl px-2 md:px-4 py-4">
//           <div className="flex justify-between items-center gap-2">
//             <button
//               onClick={prevQuestion}
//               className={`flex items-center gap-1 px-3 py-2 md:px-4 md:py-2.5 rounded-full transition-all
//                 ${currentQuestion > 0
//                   ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
//                   : 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                 }`}
//               disabled={currentQuestion === 0}
//             >
//               <IoIosArrowRoundBack className="text-xl md:text-2xl" />
//               <span className="hidden md:inline">Previous</span>
//             </button>

//             <div className="flex items-center gap-3 md:gap-4">
//               <span className="text-xs md:text-sm text-gray-600">
//                 {currentQuestion + 1}/{questions.length}
//               </span>
//               {currentQuestion === questions.length - 1 ? (
//                 <button
//                   onClick={finishQuiz}
//                   className="flex items-center gap-1 bg-green-500 text-white px-4 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-green-600"
//                 >
//                   <span className="text-sm md:text-base">Finish</span>
//                   <IoIosCheckmark className="text-xl md:text-2xl" />
//                 </button>
//               ) : (
//                 <button
//                   onClick={nextQuestion}
//                   className="flex items-center gap-1 bg-blue-500 text-white px-4 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-blue-600"
//                 >
//                   <span className="text-sm md:text-base">Next</span>
//                   <IoIosArrowRoundForward className="text-xl md:text-2xl" />
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <ActionButtons
//         handleModal={handleModal}
//         nextQuestion={nextQuestion}
//         prevQuestion={prevQuestion}
//         finishQuiz={finishQuiz}
//         isAnswered={isAnswered}
//       />

//       <Modals
//         showModal={showModal}
//         closeModal={closeModal}
//         hint={current.hint}
//         pdf={current.pdf}
//         moreInfo={current.moreInfo}
//         mindmap={current.mindmap}
//         formula={current.formula}
//         sampleQuestion={current.sampleQuestion}
//         tips={current.tips}
//         solution={current.solution}
//         aiAssistance={current.aiAssistance}
//       />
//     </div>
//   );
// };

// export default PracticePage;


'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PracticeTimer from '@/components/PracticeTimer';
import DifficultyIndicator from '@/components/DifficultyIndicator';
import IconSection from '@/components/IconSection';
import ActionButtons from '@/components/ActionButtons';
import Modals from '@/components/Modals';
import { IoIosArrowRoundBack, IoIosArrowRoundForward, IoIosCheckmark } from 'react-icons/io';

const PracticePage = () => {
  const { course, subtopic: topicSlug } = useParams();
  const router = useRouter();

  const [courseData, setCourseData] = useState(null);
  const [topic, setTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showModal, setShowModal] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState({});

  useEffect(() => {
    if (!course) return;
    const fetchCourseData = async () => {
      try {
        const res = await fetch(`/api/courses?slug=${course}`);
        const json = await res.json();
        if (json.success && json.data) {
          setCourseData(json.data);
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };
    fetchCourseData();
  }, [course]);

  useEffect(() => {
    if (!topicSlug) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const topicRes = await fetch(`/api/topics?slug=${topicSlug}`);
        const topicJson = await topicRes.json();
        let topicData = topicJson.data;
        if (Array.isArray(topicData)) {
          topicData = topicData[0];
        }
        if (!topicJson.success || !topicData) {
          throw new Error('Topic not found');
        }
        setTopic(topicData);

        const questionsRes = await fetch(`/api/questions?topicId=${topicData._id}`);
        const questionsJson = await questionsRes.json();
        if (!questionsJson.success) {
          throw new Error('Failed to fetch questions');
        }
        setQuestions(questionsJson.data || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [topicSlug]);

  // Update isAnswered based on current question's selected options
  useEffect(() => {
    const currentAnswer = selectedOptions[currentQuestion] || [];
    setIsAnswered(currentAnswer.length > 0);
  }, [currentQuestion, selectedOptions]);

  const finishQuiz = () => {
    const correctAnswers = questions.reduce((acc, question, index) => {
      const selected = selectedOptions[index] || [];
      if (question.questionType === 'multiple') {
        // Use an empty array as default if correctAnswer is undefined
        const correctAnswer = question.correctAnswer || [];
        const isCorrect =
          selected.length === correctAnswer.length &&
          selected.every((opt) => correctAnswer.includes(opt));
        return isCorrect ? acc + 1 : acc;
      } else {
        return selected.includes(question.correctAnswer) ? acc + 1 : acc;
      }
    }, 0);
    localStorage.setItem(
      'quizResults',
      JSON.stringify({
        totalQuestions: questions.length,
        correctAnswers,
        questionData: questions,
        selectedOptions,
      })
    );
    router.push('/results');
  };

  const nextQuestion = () => {
    setCurrentQuestion((prev) => (prev + 1) % questions.length);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevQuestion = () => {
    setCurrentQuestion((prev) => (prev - 1 + questions.length) % questions.length);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleModal = (type) => {
    setShowModal(type);
  };

  const closeModal = () => {
    setShowModal(null);
  };

  // Update only the answer (using index) for the current question
  const handleOptionSelect = (optionIndex) => {
    const currentQuestionData = questions[currentQuestion];
    const currentAnswer = selectedOptions[currentQuestion] || [];

    let updatedOptions = [];
    if (currentQuestionData.questionType === 'multiple') {
      updatedOptions = currentAnswer.includes(optionIndex)
        ? currentAnswer.filter((o) => o !== optionIndex)
        : [...currentAnswer, optionIndex];
    } else {
      updatedOptions = currentAnswer.includes(optionIndex) ? [] : [optionIndex];
    }

    setSelectedOptions((prev) => {
      const newSelected = [...prev];
      newSelected[currentQuestion] = updatedOptions;
      return newSelected;
    });
    setIsAnswered(updatedOptions.length > 0);
  };

  if (loading) return <div className="p-4 text-blue-500">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!topic || questions.length === 0)
    return <div className="p-4 text-center">No questions available for this topic.</div>;

  const current = questions[currentQuestion];
  // currentSelectedOptions now holds indices
  const currentSelectedOptions = selectedOptions[currentQuestion] || [];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // For multiple choice, ensure current.correctAnswer is defined by defaulting to an empty array.
  const correctAnswerMultiple = current.correctAnswer || [];
  const isCorrect =
    current.questionType === 'multiple'
      ? currentSelectedOptions.length === correctAnswerMultiple.length &&
        currentSelectedOptions.every((opt) => correctAnswerMultiple.includes(opt))
      : currentSelectedOptions.includes(current.correctAnswer);
  const isBookmarked = current && bookmarkedQuestions[current._id] ? true : false;

  const toggleBookmark = () => {
    if (!current) return;
    setBookmarkedQuestions((prev) => ({
      ...prev,
      [current._id]: !prev[current._id],
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full flex flex-col overflow-x-hidden">
      <div className="flex flex-col justify-center items-center p-2 md:p-4 lg:p-6">
        <PracticeTimer
          initialTime={3600}
          className="mb-4 md:mb-6 w-full max-w-7xl"
          onTimeEnd={() => router.push('/')}
        />

        <div className="bg-white rounded-xl md:rounded-2xl w-full max-w-7xl shadow-lg md:shadow-xl">
          <div className="p-4 md:p-6 lg:p-8">
            <div className="w-full h-1.5 md:h-2 bg-gray-200 rounded-full mb-4 md:mb-6">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 break-words">
                {topic.name}
              </h1>
              <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
                <DifficultyIndicator difficulty={current.questionLevel} />
                <IconSection
                  handleModal={handleModal}
                  course={courseData}
                  isBookmarked={isBookmarked}
                  toggleBookmark={toggleBookmark}
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8">
              <div className="w-full lg:w-1/2 p-3 md:p-4 bg-gray-50 rounded-lg md:rounded-xl border border-gray-200">
                <div
                  className="question-content text-base md:text-lg text-gray-700 font-medium"
                  dangerouslySetInnerHTML={{ __html: current.question }}
                />
              </div>

              <div className="w-full lg:w-1/2 space-y-3 md:space-y-4">
                {current.options?.map((option, index) => (
                  <div
                    key={index}
                    className={`p-3 md:p-4 rounded-lg md:rounded-xl border-2 transition-all cursor-pointer
                      ${
                        currentSelectedOptions.includes(index)
                          ? isCorrect
                            ? 'bg-green-50 border-green-400'
                            : 'bg-red-50 border-red-400'
                          : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                      }
                      ${isAnswered && !currentSelectedOptions.includes(index)
                        ? 'opacity-75'
                        : ''
                      }`}
                    onClick={() => handleOptionSelect(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-bold text-blue-600 mr-2 md:mr-3 text-sm md:text-base">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <div
                          className="text-gray-700 text-sm md:text-base"
                          dangerouslySetInnerHTML={{ __html: option }}
                        />
                      </div>
                      <div className="flex items-center justify-center ml-2">
                        {currentSelectedOptions.includes(index) ? (
                          <div
                            className={`flex items-center justify-center
                              ${current.questionType === 'multiple' ? 'w-5 h-5 rounded-sm' : 'w-5 h-5 rounded-full'}
                              ${isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                          >
                            {current.questionType === 'multiple' ? (
                              <span className="text-white text-sm">✓</span>
                            ) : (
                              <IoIosCheckmark className="text-lg" />
                            )}
                          </div>
                        ) : (
                          <div
                            className={`border-2
                              ${current.questionType === 'multiple' ? 'w-5 h-5 rounded-sm' : 'w-5 h-5 rounded-full'}
                              ${currentSelectedOptions.includes(index) ? 'border-blue-500' : 'border-gray-400'}`}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {isAnswered && (
              <div className="mt-4 md:mt-6 text-center">
                <p
                  className={`text-base md:text-lg font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}
                >
                  {isCorrect ? 'Correct! 🎉' : 'Incorrect 💡'}
                </p>
                {!isCorrect && current.solution && (
                  <button
                    onClick={() => setShowModal('solution')}
                    className="text-blue-600 hover:underline mt-1 md:mt-2 text-sm md:text-base"
                  >
                    View Solution
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="w-full max-w-7xl px-2 md:px-4 py-4">
          <div className="flex justify-between items-center gap-2">
            <button
              onClick={prevQuestion}
              className={`flex items-center gap-1 px-3 py-2 md:px-4 md:py-2.5 rounded-full transition-all
                ${currentQuestion > 0
                  ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              disabled={currentQuestion === 0}
            >
              <IoIosArrowRoundBack className="text-xl md:text-2xl" />
              <span className="hidden md:inline">Previous</span>
            </button>

            <div className="flex items-center gap-3 md:gap-4">
              <span className="text-xs md:text-sm text-gray-600">
                {currentQuestion + 1}/{questions.length}
              </span>
              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={finishQuiz}
                  className="flex items-center gap-1 bg-green-500 text-white px-4 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-green-600"
                >
                  <span className="text-sm md:text-base">Finish</span>
                  <IoIosCheckmark className="text-xl md:text-2xl" />
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="flex items-center gap-1 bg-blue-500 text-white px-4 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-blue-600"
                >
                  <span className="text-sm md:text-base">Next</span>
                  <IoIosArrowRoundForward className="text-xl md:text-2xl" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

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
        aiAssistance={current.aiAssistance}
      />
    </div>
  );
};

export default PracticePage;

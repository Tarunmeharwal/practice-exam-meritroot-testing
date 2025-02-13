// "use client"

// import { useEffect, useState } from "react";
// import TextEditor from "./TextEditor";

// const CreateQuiz = () => {
//   // State declarations
//   const [courses, setCourses] = useState([]);
//   const [topics, setTopics] = useState([]);

//   // Form states
//   const [courseName, setCourseName] = useState('');
//   const [topicName, setTopicName] = useState('');
//   const [questionText, setQuestionText] = useState('');
//   const [options, setOptions] = useState(['', '', '', '']);
//   // correctAnswer is maintained as an array to support toggling selections.
//   const [correctAnswer, setCorrectAnswer] = useState([]);
//   const [hint, setHint] = useState('');
//   const [solution, setSolution] = useState('');
//   const [tips, setTips] = useState('');
//   const [formula, setFormula] = useState('');
//   const [questionType, setQuestionType] = useState('');
//   const [questionLevel, setQuestionLevel] = useState('');

//   // Selected values
//   const [selectedCourse, setSelectedCourse] = useState('');
//   const [selectedTopic, setSelectedTopic] = useState('');

//   // Fetch initial courses
//   const fetchCourses = async () => {
//     try {
//       const res = await fetch('/api/courses');
//       const data = await res.json();
//       setCourses(data.data);
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   // Fetch topics – note the use of backticks to create the URL string
//   const fetchTopics = async () => {
//     if (selectedCourse) {
//       try {
//         const res = await fetch(`/api/topics?courseId=${selectedCourse}`);
//         const data = await res.json();
//         setTopics(data.data);
//       } catch (error) {
//         console.error('Error fetching topics:', error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchTopics();
//   }, [selectedCourse]);

//   // Creation handlers
//   const createCourse = async () => {
//     if (!courseName) return;
//     try {
//       const res = await fetch('/api/courses', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: courseName }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setCourseName('');
//         fetchCourses();
//       }
//     } catch (error) {
//       console.error('Error creating course:', error);
//     }
//   };

//   const createTopic = async () => {
//     if (!selectedCourse || !topicName) return;
//     try {
//       const res = await fetch('/api/topics', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name: topicName,
//           courseId: selectedCourse
//         }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setTopicName('');
//         fetchTopics();
//       }
//     } catch (error) {
//       console.error('Error creating topic:', error);
//     }
//   };

//   // Question handler
//   const createQuestion = async () => {
//     // Ensure a topic, question text, and at least one correct answer are provided
//     if (!selectedTopic || !questionText || !correctAnswer.length) return;

//     const questionData = {
//       topicId: selectedTopic,
//       question: questionText,
//       options: options.filter(opt => opt !== ''),
//       // For single correct, take the first element; for multiple, pass the array.
//       correctAnswer: questionType === 'multiple' ? correctAnswer : correctAnswer[0],
//       hint,
//       solution,
//       tips,
//       formula,
//       questionType,
//       questionLevel,
//     };

//     try {
//       const res = await fetch('/api/questions', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(questionData),
//       });
//       const data = await res.json();
//       if (data.success) {
//         alert('Question created successfully!');
//         // Reset form fields
//         setQuestionText('');
//         setOptions(['', '', '', '']);
//         setCorrectAnswer([]);
//         setHint('');
//         setSolution('');
//         setTips('');
//         setFormula('');
//         setQuestionType('');
//         setQuestionLevel('');
//       }
//     } catch (error) {
//       console.error('Error creating question:', error);
//     }
//   };

//   // Handler for toggling correct answer selection based on index
//   const handleCorrectAnswerChange = (index) => {
//     if (questionType === 'multiple') {
//       setCorrectAnswer(prev =>
//         prev.includes(index)
//           ? prev.filter(i => i !== index)
//           : [...prev, index]
//       );
//     } else {
//       setCorrectAnswer(prev => (prev[0] === index ? [] : [index]));
//     }
//   };

//   return (
//     <div className="bg-gray-100 p-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

//         {/* Course Creation */}
//         <div className="bg-white p-6 rounded-lg shadow mb-8">
//           <h2 className="text-xl font-semibold mb-4">Create Course</h2>
//           <input
//             type="text"
//             value={courseName}
//             onChange={(e) => setCourseName(e.target.value)}
//             placeholder="Course Name"
//             className="w-full p-2 border rounded mb-4"
//           />
//           <button
//             onClick={createCourse}
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Create Course
//           </button>
//         </div>

//         {/* Topic Creation */}
//         <div className="bg-white p-6 rounded-lg shadow mb-8">
//           <h2 className="text-xl font-semibold mb-4">Create Topic</h2>
//           <select
//             value={selectedCourse}
//             onChange={(e) => setSelectedCourse(e.target.value)}
//             className="w-full p-2 border rounded mb-4"
//           >
//             <option value="">Select Course</option>
//             {courses.map((course) => (
//               <option key={course._id} value={course._id}>
//                 {course.name}
//               </option>
//             ))}
//           </select>
//           <input
//             type="text"
//             value={topicName}
//             onChange={(e) => setTopicName(e.target.value)}
//             placeholder="Topic Name"
//             className="w-full p-2 border rounded mb-4"
//           />
//           <button
//             onClick={createTopic}
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Create Topic
//           </button>
//         </div>

//         {/* Question Creation */}
//         <div className="bg-white p-6 rounded-lg shadow mb-8">
//           <h2 className="text-xl font-semibold mb-4">Create Question</h2>
//           <div className="space-y-4">
//             <select
//               value={selectedCourse}
//               onChange={(e) => setSelectedCourse(e.target.value)}
//               className="w-full p-2 border rounded"
//             >
//               <option value="">Select Course</option>
//               {courses.map((course) => (
//                 <option key={course._id} value={course._id}>
//                   {course.name}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={selectedTopic}
//               onChange={(e) => setSelectedTopic(e.target.value)}
//               className="w-full p-2 border rounded"
//             >
//               <option value="">Select Topic</option>
//               {topics.map((topic) => (
//                 <option key={topic._id} value={topic._id}>
//                   {topic.name}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={questionType}
//               onChange={(e) => setQuestionType(e.target.value)}
//               className="w-full p-2 border rounded"
//             >
//               <option value="">Select Question Type</option>
//               <option value="single">Single Correct</option>
//               <option value="multiple">Multiple Correct</option>
//             </select>

//             <select
//               value={questionLevel}
//               onChange={(e) => setQuestionLevel(e.target.value)}
//               className="w-full p-2 border rounded"
//             >
//               <option value="">Select Difficulty</option>
//               <option value="easy">Easy</option>
//               <option value="medium">Medium</option>
//               <option value="hard">Hard</option>
//             </select>

//             <div className="mb-4">
//               <label className="block mb-2">Question Text</label>
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <TextEditor
//                   value={questionText}
//                   onChange={setQuestionText}
//                   height={200}
//                 />
//               </div>
//             </div>

//             {options.map((option, index) => (
//               <div key={index} className="mb-4">
//                 <label className="block mb-2">Option {index + 1}</label>
//                 <div className="bg-white p-4 rounded-lg shadow">
//                   <TextEditor
//                     value={option}
//                     onChange={(content) => {
//                       const newOptions = [...options];
//                       newOptions[index] = content;
//                       setOptions(newOptions);
//                     }}
//                     height={200}
//                   />
//                 </div>
//                 <button
//                   onClick={() => handleCorrectAnswerChange(index)}
//                   className={`mt-2 px-4 py-2 rounded ${
//                     correctAnswer.includes(index)
//                       ? 'bg-green-600 text-white'
//                       : 'bg-gray-200 text-black'
//                   }`}
//                 >
//                   {correctAnswer.includes(index)
//                     ? 'Selected'
//                     : 'Select as Correct'}
//                 </button>
//               </div>
//             ))}

//             <div className="mb-4">
//               <label className="block mb-2">Hint</label>
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <TextEditor
//                   value={hint}
//                   onChange={setHint}
//                   height={200}
//                 />
//               </div>
//             </div>

//             <div className="mb-4">
//               <label className="block mb-2">Solution</label>
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <TextEditor
//                   value={solution}
//                   onChange={setSolution}
//                   height={200}
//                 />
//               </div>
//             </div>

//             {/* Tips Editor */}
//             <div className="mb-4">
//               <label className="block mb-2">Tips</label>
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <TextEditor
//                   value={tips}
//                   onChange={setTips}
//                   height={200}
//                 />
//               </div>
//             </div>

//             {/* Formula Editor */}
//             <div className="mb-4">
//               <label className="block mb-2">Formula</label>
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <TextEditor
//                   value={formula}
//                   onChange={setFormula}
//                   height={200}
//                 />
//               </div>
//             </div>

//             <button
//               onClick={createQuestion}
//               className="bg-blue-500 text-white px-4 py-2 rounded w-full"
//             >
//               Create Question
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateQuiz;


// "use client"

// import { useEffect, useState } from "react";
// import TextEditor from "./TextEditor";

// const CreateQuiz = () => {
//   // State declarations
//   const [courses, setCourses] = useState([]);
//   const [topics, setTopics] = useState([]);

//   // Form states
//   const [courseName, setCourseName] = useState('');
//   const [topicName, setTopicName] = useState('');
//   const [questionText, setQuestionText] = useState('');
//   const [options, setOptions] = useState(['', '', '', '']);
//   // correctAnswer is maintained as an array to support toggling selections.
//   const [correctAnswer, setCorrectAnswer] = useState([]);
//   const [hint, setHint] = useState('');
//   const [solution, setSolution] = useState('');
//   const [tips, setTips] = useState('');
//   const [formula, setFormula] = useState('');
//   const [questionType, setQuestionType] = useState('');
//   const [questionLevel, setQuestionLevel] = useState('');

//   // Selected values
//   const [selectedCourse, setSelectedCourse] = useState('');
//   const [selectedTopic, setSelectedTopic] = useState('');

//   // Fetch initial courses
//   const fetchCourses = async () => {
//     try {
//       const res = await fetch('/api/courses');
//       const data = await res.json();
//       setCourses(data.data);
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   // Fetch topics – note the use of backticks to create the URL string
//   const fetchTopics = async () => {
//     if (selectedCourse) {
//       try {
//         const res = await fetch(`/api/topics?courseId=${selectedCourse}`);
//         const data = await res.json();
//         setTopics(data.data);
//       } catch (error) {
//         console.error('Error fetching topics:', error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchTopics();
//   }, [selectedCourse]);

//   // Creation handlers
//   const createCourse = async () => {
//     if (!courseName) return;
//     try {
//       const res = await fetch('/api/courses', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: courseName }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setCourseName('');
//         fetchCourses();
//       }
//     } catch (error) {
//       console.error('Error creating course:', error);
//     }
//   };

//   const createTopic = async () => {
//     if (!selectedCourse || !topicName) return;
//     try {
//       const res = await fetch('/api/topics', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name: topicName,
//           courseId: selectedCourse
//         }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setTopicName('');
//         fetchTopics();
//       }
//     } catch (error) {
//       console.error('Error creating topic:', error);
//     }
//   };

//   // Question handler
//   const createQuestion = async () => {
//     // Ensure a topic, question text, and at least one correct answer are provided
//     if (!selectedTopic || !questionText || !correctAnswer.length) return;

//     const questionData = {
//       topicId: selectedTopic,
//       question: questionText,
//       options: options.filter(opt => opt !== ''),
//       // For single correct, take the first element; for multiple, pass the array.
//       correctAnswer: questionType === 'multiple' ? correctAnswer : correctAnswer[0],
//       hint,
//       solution,
//       tips,
//       formula,
//       questionType,
//       questionLevel,
//     };

//     try {
//       const res = await fetch('/api/questions', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(questionData),
//       });
//       const data = await res.json();
//       if (data.success) {
//         alert('Question created successfully!');
//         // Reset form fields
//         setQuestionText('');
//         setOptions(['', '', '', '']);
//         setCorrectAnswer([]);
//         setHint('');
//         setSolution('');
//         setTips('');
//         setFormula('');
//         setQuestionType('');
//         setQuestionLevel('');
//       }
//     } catch (error) {
//       console.error('Error creating question:', error);
//     }
//   };

//   // Handler for toggling correct answer selection based on index
//   const handleCorrectAnswerChange = (index) => {
//     if (questionType === 'multiple') {
//       setCorrectAnswer(prev =>
//         prev.includes(index)
//           ? prev.filter(i => i !== index)
//           : [...prev, index]
//       );
//     } else {
//       setCorrectAnswer(prev => (prev[0] === index ? [] : [index]));
//     }
//   };

//   return (
//     <div className="bg-gray-100 p-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

//         {/* Course Creation */}
//         <div className="bg-white p-6 rounded-lg shadow mb-8">
//           <h2 className="text-xl font-semibold mb-4">Create Course</h2>
//           <input
//             type="text"
//             value={courseName}
//             onChange={(e) => setCourseName(e.target.value)}
//             placeholder="Course Name"
//             className="w-full p-2 border rounded mb-4"
//           />
//           <button
//             onClick={createCourse}
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Create Course
//           </button>
//         </div>

//         {/* Topic Creation */}
//         <div className="bg-white p-6 rounded-lg shadow mb-8">
//           <h2 className="text-xl font-semibold mb-4">Create Topic</h2>
//           <select
//             value={selectedCourse}
//             onChange={(e) => setSelectedCourse(e.target.value)}
//             className="w-full p-2 border rounded mb-4"
//           >
//             <option value="">Select Course</option>
//             {courses.map((course) => (
//               <option key={course._id} value={course._id}>
//                 {course.name}
//               </option>
//             ))}
//           </select>
//           <input
//             type="text"
//             value={topicName}
//             onChange={(e) => setTopicName(e.target.value)}
//             placeholder="Topic Name"
//             className="w-full p-2 border rounded mb-4"
//           />
//           <button
//             onClick={createTopic}
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Create Topic
//           </button>
//         </div>

//         {/* Question Creation */}
//         <div className="bg-white p-6 rounded-lg shadow mb-8">
//           <h2 className="text-xl font-semibold mb-4">Create Question</h2>
//           <div className="space-y-4">
//             <select
//               value={selectedCourse}
//               onChange={(e) => setSelectedCourse(e.target.value)}
//               className="w-full p-2 border rounded"
//             >
//               <option value="">Select Course</option>
//               {courses.map((course) => (
//                 <option key={course._id} value={course._id}>
//                   {course.name}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={selectedTopic}
//               onChange={(e) => setSelectedTopic(e.target.value)}
//               className="w-full p-2 border rounded"
//             >
//               <option value="">Select Topic</option>
//               {topics.map((topic) => (
//                 <option key={topic._id} value={topic._id}>
//                   {topic.name}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={questionType}
//               onChange={(e) => setQuestionType(e.target.value)}
//               className="w-full p-2 border rounded"
//             >
//               <option value="">Select Question Type</option>
//               <option value="single">Single Correct</option>
//               <option value="multiple">Multiple Correct</option>
//             </select>

//             <select
//               value={questionLevel}
//               onChange={(e) => setQuestionLevel(e.target.value)}
//               className="w-full p-2 border rounded"
//             >
//               <option value="">Select Difficulty</option>
//               <option value="easy">Easy</option>
//               <option value="medium">Medium</option>
//               <option value="hard">Hard</option>
//             </select>

//             <div className="mb-4">
//               <label className="block mb-2">Question Text</label>
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <TextEditor
//                   value={questionText}
//                   onChange={setQuestionText}
//                   height={200}
//                 />
//               </div>
//             </div>

//             {options.map((option, index) => (
//               <div key={index} className="mb-4">
//                 <label className="block mb-2">Option {index + 1}</label>
//                 <div className="bg-white p-4 rounded-lg shadow">
//                   <TextEditor
//                     value={option}
//                     onChange={(content) => {
//                       const newOptions = [...options];
//                       newOptions[index] = content;
//                       setOptions(newOptions);
//                     }}
//                     height={200}
//                   />
//                 </div>
//                 <button
//                   onClick={() => handleCorrectAnswerChange(index)}
//                   className={`mt-2 px-4 py-2 rounded ${
//                     correctAnswer.includes(index)
//                       ? 'bg-green-600 text-white'
//                       : 'bg-gray-200 text-black'
//                   }`}
//                 >
//                   {correctAnswer.includes(index)
//                     ? 'Selected'
//                     : 'Select as Correct'}
//                 </button>
//               </div>
//             ))}

//             <div className="mb-4">
//               <label className="block mb-2">Hint</label>
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <TextEditor
//                   value={hint}
//                   onChange={setHint}
//                   height={200}
//                 />
//               </div>
//             </div>

//             <div className="mb-4">
//               <label className="block mb-2">Solution</label>
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <TextEditor
//                   value={solution}
//                   onChange={setSolution}
//                   height={200}
//                 />
//               </div>
//             </div>

//             {/* Tips Editor */}
//             <div className="mb-4">
//               <label className="block mb-2">Tips</label>
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <TextEditor
//                   value={tips}
//                   onChange={setTips}
//                   height={200}
//                 />
//               </div>
//             </div>

//             {/* Formula Editor */}
//             <div className="mb-4">
//               <label className="block mb-2">Formula</label>
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <TextEditor
//                   value={formula}
//                   onChange={setFormula}
//                   height={200}
//                 />
//               </div>
//             </div>

//             <button
//               onClick={createQuestion}
//               className="bg-blue-500 text-white px-4 py-2 rounded w-full"
//             >
//               Create Question
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateQuiz;


"use client";

import { useEffect, useState } from "react";
import TextEditor from "./TextEditor"; // Adjust the path if needed

const CreateQuiz = () => {
  // State for courses, topics
  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState([]);

  // Form fields
  const [courseName, setCourseName] = useState("");
  const [topicName, setTopicName] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [hint, setHint] = useState("");
  const [solution, setSolution] = useState("");
  const [tips, setTips] = useState("");
  const [formula, setFormula] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [questionLevel, setQuestionLevel] = useState("");

  // Selections
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  // Fetch initial courses
  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCourses(data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Fetch topics when course changes
  const fetchTopics = async () => {
    if (selectedCourse) {
      try {
        const res = await fetch(`/api/topics?courseId=${selectedCourse}`);
        const data = await res.json();
        setTopics(data.data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [selectedCourse]);

  // Create new course
  const createCourse = async () => {
    if (!courseName) return;
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: courseName }),
      });
      const data = await res.json();
      if (data.success) {
        setCourseName("");
        fetchCourses();
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  // Create new topic
  const createTopic = async () => {
    if (!selectedCourse || !topicName) return;
    try {
      const res = await fetch("/api/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: topicName, courseId: selectedCourse }),
      });
      const data = await res.json();
      if (data.success) {
        setTopicName("");
        fetchTopics();
      }
    } catch (error) {
      console.error("Error creating topic:", error);
    }
  };

  // Create new question
  const createQuestion = async () => {
    // Must have topic, question text, and at least one correct answer
    if (!selectedTopic || !questionText || !correctAnswer.length) return;

    const questionData = {
      topicId: selectedTopic,
      question: questionText,
      options: options.filter((opt) => opt !== ""),
      correctAnswer: questionType === "multiple" ? correctAnswer : correctAnswer[0],
      hint,
      solution,
      tips,
      formula,
      questionType,
      questionLevel,
    };

    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(questionData),
      });
      const data = await res.json();
      if (data.success) {
        alert("Question created successfully!");
        // Reset fields
        setQuestionText("");
        setOptions(["", "", "", ""]);
        setCorrectAnswer([]);
        setHint("");
        setSolution("");
        setTips("");
        setFormula("");
        setQuestionType("");
        setQuestionLevel("");
      }
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  // Toggle correct answer
  const handleCorrectAnswerChange = (index) => {
    if (questionType === "multiple") {
      setCorrectAnswer((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      // For single correct, store only one
      setCorrectAnswer((prev) => (prev[0] === index ? [] : [index]));
    }
  };

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

        {/* Create Course */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Create Course</h2>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Course Name"
            className="w-full p-2 border rounded mb-4"
          />
          <button onClick={createCourse} className="bg-blue-500 text-white px-4 py-2 rounded">
            Create Course
          </button>
        </div>

        {/* Create Topic */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Create Topic</h2>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
            placeholder="Topic Name"
            className="w-full p-2 border rounded mb-4"
          />
          <button onClick={createTopic} className="bg-blue-500 text-white px-4 py-2 rounded">
            Create Topic
          </button>
        </div>

        {/* Create Question */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Create Question</h2>

          <div className="space-y-4">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>

            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Topic</option>
              {topics.map((topic) => (
                <option key={topic._id} value={topic._id}>
                  {topic.name}
                </option>
              ))}
            </select>

            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Question Type</option>
              <option value="single">Single Correct</option>
              <option value="multiple">Multiple Correct</option>
            </select>

            <select
              value={questionLevel}
              onChange={(e) => setQuestionLevel(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            {/* Question Text Editor */}
            <div>
              <label className="block mb-2">Question Text</label>
              <div className="bg-white p-4 rounded-lg shadow">
                <TextEditor value={questionText} onChange={setQuestionText} height={200} />
              </div>
            </div>

            {/* Options with toggling correct answers */}
            {options.map((option, index) => (
              <div key={index}>
                <label className="block mb-2">Option {index + 1}</label>
                <div className="bg-white p-4 rounded-lg shadow">
                  <TextEditor
                    value={option}
                    onChange={(content) => {
                      const newOptions = [...options];
                      newOptions[index] = content;
                      setOptions(newOptions);
                    }}
                    height={200}
                  />
                </div>
                <button
                  onClick={() => handleCorrectAnswerChange(index)}
                  className={`mt-2 px-4 py-2 rounded ${
                    correctAnswer.includes(index)
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {correctAnswer.includes(index) ? "Selected" : "Select as Correct"}
                </button>
              </div>
            ))}

            {/* Hint */}
            <div>
              <label className="block mb-2">Hint</label>
              <div className="bg-white p-4 rounded-lg shadow">
                <TextEditor value={hint} onChange={setHint} height={200} />
              </div>
            </div>

            {/* Solution */}
            <div>
              <label className="block mb-2">Solution</label>
              <div className="bg-white p-4 rounded-lg shadow">
                <TextEditor value={solution} onChange={setSolution} height={200} />
              </div>
            </div>

            {/* Tips */}
            <div>
              <label className="block mb-2">Tips</label>
              <div className="bg-white p-4 rounded-lg shadow">
                <TextEditor value={tips} onChange={setTips} height={200} />
              </div>
            </div>

            {/* Formula */}
            <div>
              <label className="block mb-2">Formula</label>
              <div className="bg-white p-4 rounded-lg shadow">
                <TextEditor value={formula} onChange={setFormula} height={200} />
              </div>
            </div>

            {/* Submit Button */}
            <button onClick={createQuestion} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
              Create Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;

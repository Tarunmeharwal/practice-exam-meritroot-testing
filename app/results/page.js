// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function ResultPage() {
//   const router = useRouter();
//   const [results, setResults] = useState(null);

//   useEffect(() => {
//     const storedResults = JSON.parse(localStorage.getItem("quizResults"));
//     if (storedResults) {
//       setResults(storedResults);
//     } else {
//       router.push("/practice"); // Redirect if no results found
//     }
//   }, [router]);

//   if (!results) return <div className="p-4 text-blue-500">Loading...</div>;

//   const { totalQuestions, correctAnswers, questionData, selectedOptions } = results;
//   const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl text-center">
//         <h1 className="text-3xl font-bold text-gray-800">Quiz Results</h1>
//         <p className="text-lg mt-2">You scored <span className="font-bold">{correctAnswers}</span> out of <span className="font-bold">{totalQuestions}</span></p>
//         <p className={`text-xl font-semibold mt-2 ${percentage >= 70 ? "text-green-500" : "text-red-500"}`}>
//           {percentage}% - {percentage >= 70 ? "Great Job! 🎉" : "Keep Practicing 💪"}
//         </p>

//         {/* Button Section */}
//         <div className="mt-6 flex justify-center gap-4">
//           <button
//             onClick={() => router.push("/jee")}
//             className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
//           >
//             Retry Quiz
//           </button>
//           <button
//             onClick={() => router.push("/")}
//             className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
//           >
//             Go to Home
//           </button>
//         </div>
//       </div>

//       {/* Question Review Section */}
//       <div className="w-full max-w-3xl mt-8">
//         {questionData.map((q, index) => {
//           const isCorrect = selectedOptions[index]?.includes(q.correctAnswer);
//           return (
//             <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
//               <h2 className="text-lg font-bold">{index + 1}. {q.question}</h2>
//               <p className={`mt-2 ${isCorrect ? "text-green-600" : "text-red-600"}`}>
//                 Your Answer: {selectedOptions[index]} {isCorrect ? "✓" : "✕"}
//               </p>
//               <p className="text-gray-700">Correct Answer: {q.correctAnswer}</p>
//               {q.solution && (
//                 <details className="mt-2">
//                   <summary className="text-blue-500 cursor-pointer">View Solution</summary>
//                   <p className="text-gray-600 mt-1">{q.solution}</p>
//                 </details>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }




'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Navbar from "@/components/Navbar";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ResultPage() {
  const router = useRouter();
  const [results, setResults] = useState(null);

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem("quizResults"));
    if (storedResults) {
      setResults(storedResults);
    } else {
      router.push("/practice"); // Redirect if no results found
    }
  }, [router]);

  if (!results) return <div className="p-4 text-blue-500">Loading...</div>;

  const { totalQuestions, correctAnswers, questionData, selectedOptions } = results;
  const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);

  // Data for the Doughnut chart
  const chartData = {
    labels: ["Correct Answers", "Incorrect Answers"],
    datasets: [
      {
        data: [correctAnswers, totalQuestions - correctAnswers],
        backgroundColor: ["#10B981", "#EF4444"],
        hoverBackgroundColor: ["#059669", "#DC2626"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <>
      <Navbar />
      {/* Main content area with top padding to avoid overlap with a fixed Navbar */}
      <main className="pt-20 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Quiz Result Summary */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800">Quiz Results</h1>
            <p className="text-xl mt-4">
              You scored <span className="font-bold text-blue-600">{correctAnswers}</span> out of{" "}
              <span className="font-bold text-blue-600">{totalQuestions}</span>
            </p>
            <p className={`mt-4 text-2xl font-semibold ${percentage >= 70 ? "text-green-500" : "text-red-500"}`}>
              {percentage}% - {percentage >= 70 ? "Great Job! 🎉" : "Keep Practicing 💪"}
            </p>

            {/* Doughnut Chart */}
            <div className="w-64 h-64 mx-auto mt-8">
              <Doughnut
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: "bottom" },
                  },
                }}
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-center gap-6 flex-wrap">
              <button
                onClick={() => router.push("/practice")}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all"
              >
                Retry Quiz
              </button>
              <button
                onClick={() => router.push("/")}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all"
              >
                Go to Home
              </button>
            </div>
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-6">
            {questionData.map((q, index) => {
              const userAnswer = selectedOptions[index] || [];
              const isCorrect =
                q.questionType === "multiple"
                  ? userAnswer.length === q.correctAnswer.length &&
                    userAnswer.every((opt) => q.correctAnswer.includes(opt))
                  : userAnswer.includes(q.correctAnswer);

              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                  <h2 className="text-xl font-bold mb-2">
                    {index + 1}.{" "}
                    <span
                      className="text-gray-800"
                      dangerouslySetInnerHTML={{ __html: q.question }}
                    />
                  </h2>
                  <p className={`mb-2 ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                    Your Answer:{" "}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: Array.isArray(userAnswer) && userAnswer.length
                          ? userAnswer.join(", ")
                          : "No answer selected",
                      }}
                    />{" "}
                    {isCorrect ? "✓" : "✕"}
                  </p>
                  <p className="text-gray-700 mb-2">
                    Correct Answer:{" "}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: Array.isArray(q.correctAnswer)
                          ? q.correctAnswer.join(", ")
                          : q.correctAnswer,
                      }}
                    />
                  </p>
                  {q.solution && (
                    <details className="mt-2">
                      <summary className="text-blue-500 cursor-pointer hover:underline">
                        View Solution
                      </summary>
                      <div
                        className="text-gray-600 mt-1"
                        dangerouslySetInnerHTML={{ __html: q.solution }}
                      />
                    </details>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}

// 'use client';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import Navbar from '@/components/Navbar';
// import {
//   BookOpenIcon,
//   ChevronRightIcon,
//   DocumentTextIcon
// } from '@heroicons/react/24/outline';

// const topicsPerPage = 25;

// const CoursePage = () => {
//   const { course } = useParams();
//   const [topics, setTopics] = useState([]);
//   const [courseData, setCourseData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch course by slug
//         const courseRes = await fetch(`/api/courses?slug=${course}`);
//         const courseJson = await courseRes.json();

//         if (!courseJson.success || !courseJson.data) {
//           setLoading(false);
//           return;
//         }

//         const fetchedCourseData = courseJson.data;
//         setCourseData(fetchedCourseData);

//         // Fetch topics using the course ID
//         const topicsRes = await fetch(
//           `/api/topics?courseId=${fetchedCourseData._id}`
//         );
//         const topicsJson = await topicsRes.json();

//         if (topicsJson.success) {
//           setTopics(topicsJson.data);
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     if (course) {
//       fetchData();
//     }
//   }, [course]);

//   if (loading) return <div className="text-center p-8">Loading...</div>;
//   if (!courseData) return <div className="text-center p-8">Course not found</div>;

//   // Calculate pagination details
//   const totalPages = Math.ceil(topics.length / topicsPerPage);
//   const currentTopics = topics.slice(
//     (currentPage - 1) * topicsPerPage,
//     currentPage * topicsPerPage
//   );

//   const handlePageChange = (page) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="bg-gray-50 min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Course Header */}
//           <div className="mb-8 p-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl shadow-lg">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
//                 <BookOpenIcon className="h-8 w-8 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold text-white">{courseData.name}</h1>
//                 <p className="text-white/90 mt-1">
//                   {topics.length} practice topics available
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Topics Grid */}
//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold text-gray-700 px-2">
//               Practice Topics{' '}
//               <span className="text-gray-500 ml-2 text-sm font-normal">
//                 ({topics.length})
//               </span>
//             </h2>

//             {currentTopics.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
//                 {currentTopics.map((topic) => (
//                   <Link
//                     key={topic._id}
//                     href={`/${course}/practice/${topic.slug}`}
//                     className="group bg-white hover:bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 flex items-center justify-between"
//                   >
//                     <div className="flex items-center space-x-3">
//                       <div className="p-2 bg-red-50 rounded-lg">
//                         <DocumentTextIcon className="h-6 w-6 text-red-500" />
//                       </div>
//                       <span className="font-medium text-gray-700 group-hover:text-red-600 transition-colors">
//                         {topic.name}
//                       </span>
//                     </div>
//                     <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors" />
//                   </Link>
//                 ))}
//               </div>
//             ) : (
//               <div className="p-6 text-center bg-white rounded-xl">
//                 <p className="text-gray-500">No topics available yet</p>
//               </div>
//             )}
//           </div>

//           {/* Pagination Controls */}
//           {totalPages > 1 && (
//             <div className="flex justify-center mt-8 space-x-2">
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
//               >
//                 Prev
//               </button>
//               {[...Array(totalPages)].map((_, idx) => {
//                 const page = idx + 1;
//                 return (
//                   <button
//                     key={page}
//                     onClick={() => handlePageChange(page)}
//                     className={`px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 ${
//                       currentPage === page
//                         ? 'bg-red-500 text-white'
//                         : 'bg-white text-gray-700'
//                     }`}
//                   >
//                     {page}
//                   </button>
//                 );
//               })}
//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default CoursePage;


'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import {
  BookOpenIcon,
  ChevronRightIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const topicsPerPage = 25;

const CoursePage = () => {
  const { course } = useParams();
  const [topics, setTopics] = useState([]);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch course by slug
        const courseRes = await fetch(`/api/courses?slug=${course}`);
        const courseJson = await courseRes.json();

        if (!courseJson.success || !courseJson.data) {
          setLoading(false);
          return;
        }

        const fetchedCourseData = courseJson.data;
        setCourseData(fetchedCourseData);

        // Fetch topics using the course ID
        const topicsRes = await fetch(
          `/api/topics?courseId=${fetchedCourseData._id}`
        );
        const topicsJson = await topicsRes.json();

        if (topicsJson.success && Array.isArray(topicsJson.data)) {
          setTopics(topicsJson.data);
        } else {
          setTopics([]); // Ensure topics is always an array
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    if (course) {
      fetchData();
    }
  }, [course]);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (!courseData) return <div className="text-center p-8">Course not found</div>;

  // Calculate pagination details
  const totalPages = Math.ceil(topics.length / topicsPerPage);
  const currentTopics = topics.slice(
    (currentPage - 1) * topicsPerPage,
    currentPage * topicsPerPage
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Course Header */}
          <div className="mb-8 p-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <BookOpenIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{courseData.name}</h1>
                <p className="text-white/90 mt-1">
                  {topics.length} practice topics available
                </p>
              </div>
            </div>
          </div>

          {/* Topics Grid */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 px-2">
              Practice Topics{' '}
              <span className="text-gray-500 ml-2 text-sm font-normal">
                ({topics.length})
              </span>
            </h2>

            {currentTopics.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {currentTopics.map((topic) => (
                  <Link
                    key={topic._id}
                    href={`/${course}/practice/${topic.slug}`}
                    className="group bg-white hover:bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-50 rounded-lg">
                        <DocumentTextIcon className="h-6 w-6 text-red-500" />
                      </div>
                      <span className="font-medium text-gray-700 group-hover:text-red-600 transition-colors">
                        {topic.name}
                      </span>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center bg-white rounded-xl">
                <p className="text-gray-500">No topics available yet</p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, idx) => {
                const page = idx + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 ${
                      currentPage === page
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CoursePage;

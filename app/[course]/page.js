// 'use client';

// import { useParams } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Navbar from '@/components/Navbar';
// import { DocumentIcon } from '@heroicons/react/24/solid';

// const CoursePage = () => {
//   const { course } = useParams();
//   const [courseData, setCourseData] = useState(null);
//   const [subtopics, setSubtopics] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAllSubtopics = async () => {
//       try {
//         // Fetch course data
//         const courseRes = await fetch(`/api/courses?slug=${course}`);
//         const courseResult = await courseRes.json();
//         if (!courseResult.success || !courseResult.data) {
//           throw new Error('Course not found');
//         }
//         setCourseData(courseResult.data);
//         const courseId = courseResult.data._id;

//         // Fetch subjects
//         const subjectsRes = await fetch(`/api/subjects?courseId=${courseId}`);
//         const subjectsResult = await subjectsRes.json();
//         if (!subjectsResult.success) throw new Error('Failed to fetch subjects');
//         const subjects = subjectsResult.data;

//         // Fetch all chapters
//         const chaptersPromises = subjects.map(subject =>
//           fetch(`/api/chapters?subjectId=${subject._id}`).then(res => res.json())
//         );
//         const chaptersResults = await Promise.all(chaptersPromises);
//         const allChapters = chaptersResults.flatMap(res => res.data);

//         // Fetch all topics
//         const topicsPromises = allChapters.map(chapter =>
//           fetch(`/api/topics?chapterId=${chapter._id}`).then(res => res.json())
//         );
//         const topicsResults = await Promise.all(topicsPromises);
//         const allTopics = topicsResults.flatMap(res => res.data);

//         // Fetch all subtopics
//         const subtopicsPromises = allTopics.map(topic =>
//           fetch(`/api/subtopics?topicId=${topic._id}`).then(res => res.json())
//         );
//         const subtopicsResults = await Promise.all(subtopicsPromises);
//         const allSubtopics = subtopicsResults.flatMap(res => res.data);

//         setSubtopics(allSubtopics);
//         setLoading(false);
//       } catch (error) {
//         console.error('Fetch error:', error);
//         setLoading(false);
//       }
//     };

//     fetchAllSubtopics();
//   }, [course]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="animate-pulse text-gray-600 text-lg">Loading subtopics...</div>
//       </div>
//     );
//   }

//   if (!courseData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-red-500 text-lg">Course not found</div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="bg-[#F5F5FC] min-h-screen pt-24 px-4 sm:px-6 lg:px-12">
//         <div className="max-w-5xl mx-auto">
//           <div className="bg-white rounded-lg shadow p-6 mb-8">
//             <h1 className="text-3xl font-bold text-gray-800">{courseData.name}</h1>
//             <p className="text-gray-600 mt-2">All practice subtopics for {courseData.name}</p>
//           </div>

//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Subtopics</h2>
//             {subtopics.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {subtopics.map(subtopic => (
//                   <Link
//                     key={subtopic._id}
//                     href={`/${course}/practice/${subtopic.name
//                       .toLowerCase()
//                       .replace(/\s+/g, '-')
//                       .replace(/[^a-z0-9-]/g, '')}`}
//                     className="block bg-white rounded-lg shadow hover:shadow-lg transition p-4"
//                   >
//                     <div className="flex items-center gap-2">
//                       <DocumentIcon className="h-6 w-6 text-red-500" />
//                       <h3 className="text-xl font-bold text-gray-700">{subtopic.name}</h3>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-600">No subtopics available for this course.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CoursePage;

// 'use client';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import Navbar from '@/components/Navbar';
// import { DocumentIcon } from '@heroicons/react/24/outline';

// const CoursePage = () => {
//   const { course } = useParams();
//   const [topics, setTopics] = useState([]);
//   const [courseData, setCourseData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch course by slug (e.g., "jee" or "neet")
//         const courseRes = await fetch(`/api/courses?slug=${course}`);
//         const courseJson = await courseRes.json();

//         // Ensure we have at least one course returned
//         const fetchedCourseData = courseJson.data[0];
//         if (!fetchedCourseData) {
//           setLoading(false);
//           return;
//         }
//         setCourseData(fetchedCourseData);

//         // Use _id or id depending on what your API returns
//         const courseId = fetchedCourseData._id || fetchedCourseData.id;

//         // Fetch topics using the course ID
//         const topicsRes = await fetch(`/api/topics?courseId=${courseId}`);
//         const topicsJson = await topicsRes.json();
//         setTopics(topicsJson.data);
        
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

//   return (
//     <>
//       <Navbar />

//       <div className="bg-[#F5F5FC] min-h-screen pt-24 px-4 sm:px-6 lg:px-12">
//         <div className="max-w-5xl mx-auto">
//           <div className="bg-white rounded-lg shadow p-6 mb-8">
//             <h1 className="text-3xl font-bold text-gray-800">{courseData.name}</h1>
//             <p className="text-gray-600 mt-2">
//               All practice subtopics for {courseData.name}
//             </p>
//           </div>

//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Topics</h2>
//             {topics.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {topics.map((topic) => (
//                   <Link
//                     key={topic._id || topic.id}
//                     href={`/${course}/practice/${topic.name
//                       .toLowerCase()
//                       .replace(/\s+/g, '-')
//                       .replace(/[^a-z0-9-]/g, '')}`}
//                     className="block bg-white rounded-lg shadow hover:shadow-lg transition p-4"
//                   >
//                     <div className="flex items-center gap-2">
//                       <DocumentIcon className="h-6 w-6 text-red-500" />
//                       <h3 className="text-xl font-bold text-gray-700">
//                         {topic.name}
//                       </h3>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-600">
//                 No subtopics available for this course.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CoursePage;


// 'use client';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import Navbar from '@/components/Navbar';
// import { DocumentIcon } from '@heroicons/react/24/outline';

// const CoursePage = () => {
//   const { course } = useParams();
//   const [topics, setTopics] = useState([]);
//   const [courseData, setCourseData] = useState(null);
//   const [loading, setLoading] = useState(true);

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
//         const topicsRes = await fetch(`/api/topics?courseId=${fetchedCourseData._id}`);
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

//   return (
//     <>
//       <Navbar />

//       <div className="bg-[#F5F5FC] min-h-screen pt-24 px-4 sm:px-6 lg:px-12">
//         <div className="max-w-5xl mx-auto">
//           <div className="bg-white rounded-lg shadow p-6 mb-8">
//             <h1 className="text-3xl font-bold text-gray-800">{courseData.name}</h1>
//             <p className="text-gray-600 mt-2">
//               All practice subtopics for {courseData.name}
//             </p>
//           </div>

//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Topics</h2>
//             {topics.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {topics.map((topic) => (
//                   <Link
//                     key={topic._id}
//                     href={`/${course}/practice/${topic.slug}`}
//                     className="block bg-white rounded-lg shadow hover:shadow-lg transition p-4"
//                   >
//                     <div className="flex items-center gap-2">
//                       <DocumentIcon className="h-6 w-6 text-red-500" />
//                       <h3 className="text-xl font-bold text-gray-700">
//                         {topic.name}
//                       </h3>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-600">
//                 No subtopics available for this course.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CoursePage;


// 'use client';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import Navbar from '@/components/Navbar';
// import { DocumentIcon } from '@heroicons/react/24/outline';

// const CoursePage = () => {
//   const { course } = useParams();
//   const [topics, setTopics] = useState([]);
//   const [courseData, setCourseData] = useState(null);
//   const [loading, setLoading] = useState(true);

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
//         const topicsRes = await fetch(`/api/topics?courseId=${fetchedCourseData._id}`);
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

//   return (
//     <>
//       <Navbar />

//       <div className="bg-[#F5F5FC] min-h-screen pt-24 px-4 sm:px-6 lg:px-12">
//         <div className="max-w-5xl mx-auto">
//           <div className="bg-white rounded-lg shadow p-6 mb-8">
//             <h1 className="text-3xl font-bold text-gray-800">{courseData.name}</h1>
//             <p className="text-gray-600 mt-2">
//               All practice subtopics for {courseData.name}
//             </p>
//           </div>

//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Topics</h2>
//             {topics.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {topics.map((topic) => (
//                   <Link
//                     key={topic._id}
//                     href={`/${course}/practice/${topic.slug}`}
//                     className="block bg-white rounded-lg shadow hover:shadow-lg transition p-4"
//                   >
//                     <div className="flex items-center gap-2">
//                       <DocumentIcon className="h-6 w-6 text-red-500" />
//                       <h3 className="text-xl font-bold text-gray-700">
//                         {topic.name}
//                       </h3>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-600">
//                 No subtopics available for this course.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CoursePage;


// 'use client';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import Navbar from '@/components/Navbar';
// import { BookOpenIcon, ChevronRightIcon, DocumentIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

// const CoursePage = () => {
//   const { course } = useParams();
//   const [topics, setTopics] = useState([]);
//   const [courseData, setCourseData] = useState(null);
//   const [loading, setLoading] = useState(true);

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
//         const topicsRes = await fetch(`/api/topics?courseId=${fetchedCourseData._id}`);
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

//   return (
//     // <>
//     //   <Navbar />

//     //   <div className="bg-[#F5F5FC] min-h-screen pt-24 px-4 sm:px-6 lg:px-12">
//     //     <div className="max-w-5xl mx-auto">
//     //       <div className="bg-white rounded-lg shadow p-6 mb-8">
//     //         <h1 className="text-3xl font-bold text-gray-800">{courseData.name}</h1>
//     //         <p className="text-gray-600 mt-2">
//     //           All practice subtopics for {courseData.name}
//     //         </p>
//     //       </div>

//     //       <div>
//     //         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Topics</h2>
//     //         {topics.length > 0 ? (
//     //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//     //             {topics.map((topic) => (
//     //               <Link
//     //                 key={topic._id}
//     //                 href={`/${course}/practice/${topic.slug}`}
//     //                 className="block bg-white rounded-lg shadow hover:shadow-lg transition p-4"
//     //               >
//     //                 <div className="flex items-center gap-2">
//     //                   <DocumentIcon className="h-6 w-6 text-red-500" />
//     //                   <h3 className="text-xl font-bold text-gray-700">
//     //                     {topic.name}
//     //                   </h3>
//     //                 </div>
//     //               </Link>
//     //             ))}
//     //           </div>
//     //         ) : (
//     //           <p className="text-gray-600">
//     //             No subtopics available for this course.
//     //           </p>
//     //         )}
//     //       </div>
//     //     </div>
//     //   </div>
//     // </>
//     <>
//     <Navbar />

//     <div className="bg-gray-50 min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Course Header */}
//         <div className="mb-8 p-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl shadow-lg">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
//               <BookOpenIcon className="h-8 w-8 text-white" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold text-white">{courseData.name}</h1>
//               <p className="text-white/90 mt-1">
//                 {topics.length} practice topics available
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Topics Grid */}
//         <div className="space-y-4">
//           <h2 className="text-xl font-semibold text-gray-700 px-2">
//             Practice Topics
//             <span className="text-gray-500 ml-2 text-sm font-normal">
//               ({topics.length})
//             </span>
//           </h2>
          
//           {topics.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
//               {topics.map((topic) => (
//                 <Link
//                   key={topic._id}
//                   href={`/${course}/practice/${topic.slug}`}
//                   className="group bg-white hover:bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 flex items-center justify-between"
//                 >
//                   <div className="flex items-center space-x-3">
//                     <div className="p-2 bg-red-50 rounded-lg">
//                       <DocumentTextIcon className="h-6 w-6 text-red-500" />
//                     </div>
//                     <span className="font-medium text-gray-700 group-hover:text-red-600 transition-colors">
//                       {topic.name}
//                     </span>
//                   </div>
//                   <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors" />
//                 </Link>
//               ))}
//             </div>
//           ) : (
//             <div className="p-6 text-center bg-white rounded-xl">
//               <p className="text-gray-500">No topics available yet</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   </>
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

        if (topicsJson.success) {
          setTopics(topicsJson.data);
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

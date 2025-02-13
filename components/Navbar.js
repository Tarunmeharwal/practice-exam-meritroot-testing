// "use client";
// import { useState, useEffect } from "react";
// import { PiUserCircleLight } from "react-icons/pi";
// import { IoIosArrowDown } from "react-icons/io";
// import Link from "next/link";
// import Image from "next/image";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [navbarOpen, setNavbarOpen] = useState(false);
//   const [coursesDropdown, setCoursesDropdown] = useState(false);
//   const [academicDropdown, setAcademicDropdown] = useState(false);
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     if (coursesDropdown && courses.length === 0) {
//       fetchCourses();
//     }
//   }, [coursesDropdown]);

//   const toggleMenu = () => setMenuOpen((prev) => !prev);
//   const toggleNavbar = () => setNavbarOpen((prev) => !prev);
//   const toggleCoursesDropdown = () => setCoursesDropdown((prev) => !prev);
//   const toggleAcademicDropdown = () => setAcademicDropdown((prev) => !prev);

//   const fetchCourses = async () => {
//     try {
//       const res = await fetch("/api/courses");
//       const data = await res.json();
//       setCourses(data.data);
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     }
//   };

//   const formatSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

//   return (
//     <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link href="/" className="flex-shrink-0">
//             <Image
//               src="/images/meritroot-landslide-logo.svg"
//               alt="Meritroot logo"
//               width={176}
//               height={36}
//               className="w-36 h-auto"
//               priority
//             />
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex md:items-center md:space-x-8 flex-grow justify-center">
//             <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
//               Home
//             </Link>

//             {/* Courses Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={toggleCoursesDropdown}
//                 className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
//               >
//                 Courses{" "}
//                 <IoIosArrowDown
//                   className={`ml-1 transition-transform ${coursesDropdown ? "rotate-180" : "rotate-0"}`}
//                 />
//               </button>
//               {coursesDropdown && (
//                 <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-50">
//                   {courses.length > 0 ? (
//                     courses.map((course, index) => (
//                       <Link
//                         key={course.id || index}
//                         href={`/${formatSlug(course.name)}`}
//                         className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
//                       >
//                         {course.name}
//                       </Link>
//                     ))
//                   ) : (
//                     <p className="px-4 py-3 text-gray-500">Loading...</p>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Academics Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={toggleAcademicDropdown}
//                 className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
//               >
//                 Academics{" "}
//                 <IoIosArrowDown
//                   className={`ml-1 transition-transform ${academicDropdown ? "rotate-180" : "rotate-0"}`}
//                 />
//               </button>
//               {academicDropdown && (
//                 <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-50">
//                   <Link
//                     href="/grade-11"
//                     className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
//                   >
//                     Grade 11
//                   </Link>
//                   <Link
//                     href="/grade-12"
//                     className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
//                   >
//                     Grade 12
//                   </Link>
//                 </div>
//               )}
//             </div>

//             <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
//               About
//             </Link>
//             <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
//               Contact
//             </Link>
//           </div>

//           <div className="flex items-center space-x-4">
//             {/* User Icon - Desktop */}
//             <div className="hidden md:block relative">
//               <button
//                 onClick={toggleMenu}
//                 className="p-1 rounded-full hover:bg-gray-100 transition-colors"
//                 aria-label="User menu"
//               >
//                 <PiUserCircleLight size={36} className="text-gray-600" />
//               </button>
//               {menuOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-50">
//                   <Link
//                     href="/login"
//                     className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     href="/signup"
//                     className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
//                   >
//                     Signup
//                   </Link>
//                 </div>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={toggleNavbar}
//               className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
//               aria-label="Toggle navigation"
//               aria-expanded={navbarOpen}
//             >
//               {navbarOpen ? (
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               ) : (
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation Menu */}
//       {navbarOpen && (
//         <div className="md:hidden bg-white shadow-md">
//           <div className="px-4 pt-2 pb-4 space-y-2">
//             <Link href="/" className="block text-gray-600 hover:text-blue-600 transition-colors">
//               Home
//             </Link>

//             {/* Mobile Courses Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={toggleCoursesDropdown}
//                 className="w-full text-left text-gray-600 hover:text-blue-600 transition-colors"
//               >
//                 Courses{" "}
//                 <IoIosArrowDown
//                   className={`ml-1 inline-block transition-transform ${
//                     coursesDropdown ? "rotate-180" : "rotate-0"
//                   }`}
//                 />
//               </button>
//               {coursesDropdown && (
//                 <div className="pl-4">
//                   {courses.length > 0 ? (
//                     courses.map((course, index) => (
//                       <Link
//                         key={course.id || index}
//                         href={`/${formatSlug(course.name)}`}
//                         className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
//                       >
//                         {course.name}
//                       </Link>
//                     ))
//                   ) : (
//                     <p className="px-4 py-2 text-gray-500">Loading...</p>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Mobile Academics Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={toggleAcademicDropdown}
//                 className="w-full text-left text-gray-600 hover:text-blue-600 transition-colors"
//               >
//                 Academics{" "}
//                 <IoIosArrowDown
//                   className={`ml-1 inline-block transition-transform ${
//                     academicDropdown ? "rotate-180" : "rotate-0"
//                   }`}
//                 />
//               </button>
//               {academicDropdown && (
//                 <div className="pl-4">
//                   <Link
//                     href="/grade-11"
//                     className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
//                   >
//                     Grade 11
//                   </Link>
//                   <Link
//                     href="/grade-12"
//                     className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
//                   >
//                     Grade 12
//                   </Link>
//                 </div>
//               )}
//             </div>

//             <Link href="/about" className="block text-gray-600 hover:text-blue-600 transition-colors">
//               About
//             </Link>
//             <Link href="/contact" className="block text-gray-600 hover:text-blue-600 transition-colors">
//               Contact
//             </Link>
//             <Link href="/login" className="block text-gray-600 hover:text-blue-600 transition-colors">
//               Login
//             </Link>
//             <Link href="/signup" className="block text-gray-600 hover:text-blue-600 transition-colors">
//               Signup
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


"use client";
import { useState, useEffect } from "react";
import { PiUserCircleLight } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [coursesDropdown, setCoursesDropdown] = useState(false);
  const [academicDropdown, setAcademicDropdown] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (coursesDropdown && courses.length === 0) {
      fetchCourses();
    }
  }, [coursesDropdown]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleNavbar = () => setNavbarOpen((prev) => !prev);
  const toggleCoursesDropdown = () => setCoursesDropdown((prev) => !prev);
  const toggleAcademicDropdown = () => setAcademicDropdown((prev) => !prev);

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCourses(data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const formatSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/meritroot-landslide-logo.svg"
              alt="Meritroot logo"
              width={176}
              height={36}
              className="w-36 h-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8 flex-grow justify-center">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Home
            </Link>

            {/* Courses Dropdown */}
            <div className="relative">
              <button
                onClick={toggleCoursesDropdown}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                Courses{" "}
                <IoIosArrowDown
                  className={`ml-1 transition-transform ${coursesDropdown ? "rotate-180" : "rotate-0"}`}
                />
              </button>
              {coursesDropdown && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-50">
                  {courses.length > 0 ? (
                    courses.map((course, index) => (
                      <Link
                        key={course.id || index}
                        href={`/${formatSlug(course.name)}`}
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {course.name}
                      </Link>
                    ))
                  ) : (
                    <p className="px-4 py-3 text-gray-500">Loading...</p>
                  )}
                </div>
              )}
            </div>

            {/* Academics Dropdown */}
            <div className="relative">
              <button
                onClick={toggleAcademicDropdown}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                Academics{" "}
                <IoIosArrowDown
                  className={`ml-1 transition-transform ${academicDropdown ? "rotate-180" : "rotate-0"}`}
                />
              </button>
              {academicDropdown && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-50">
                  <Link
                    href="/grade-11"
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Grade 11
                  </Link>
                  <Link
                    href="/grade-12"
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Grade 12
                  </Link>
                </div>
              )}
            </div>

            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* User Icon - Desktop */}
            <div className="hidden md:block relative">
              <button
                onClick={toggleMenu}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="User menu"
              >
                <PiUserCircleLight size={36} className="text-gray-600" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-50">
                  <Link
                    href="/login"
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Signup
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleNavbar}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle navigation"
              aria-expanded={navbarOpen}
            >
              {navbarOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {navbarOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link href="/" className="block text-gray-600 hover:text-blue-600 transition-colors">
              Home
            </Link>

            {/* Mobile Courses Dropdown */}
            <div className="relative">
              <button
                onClick={toggleCoursesDropdown}
                className="w-full text-left text-gray-600 hover:text-blue-600 transition-colors"
              >
                Courses{" "}
                <IoIosArrowDown
                  className={`ml-1 inline-block transition-transform ${
                    coursesDropdown ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {coursesDropdown && (
                <div className="pl-4">
                  {courses.length > 0 ? (
                    courses.map((course, index) => (
                      <Link
                        key={course.id || index}
                        href={`/${formatSlug(course.name)}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {course.name}
                      </Link>
                    ))
                  ) : (
                    <p className="px-4 py-2 text-gray-500">Loading...</p>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Academics Dropdown */}
            <div className="relative">
              <button
                onClick={toggleAcademicDropdown}
                className="w-full text-left text-gray-600 hover:text-blue-600 transition-colors"
              >
                Academics{" "}
                <IoIosArrowDown
                  className={`ml-1 inline-block transition-transform ${
                    academicDropdown ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {academicDropdown && (
                <div className="pl-4">
                  <Link
                    href="/grade-11"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Grade 11
                  </Link>
                  <Link
                    href="/grade-12"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Grade 12
                  </Link>
                </div>
              )}
            </div>

            <Link href="/about" className="block text-gray-600 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="block text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </Link>
            <Link href="/login" className="block text-gray-600 hover:text-blue-600 transition-colors">
              Login
            </Link>
            <Link href="/signup" className="block text-gray-600 hover:text-blue-600 transition-colors">
              Signup
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

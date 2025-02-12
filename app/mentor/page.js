// import Image from 'next/image';
// import Link from 'next/link';


// export default function HomePage() {
//   return (
//     <div className='px-16 py-12 pb-12 bg-gradient-to-b from-rose-100 to-white overflow-hidden h-screen '>
//     <main className="w-full bg-rose-500 h-screen bg-rose flex flex-col items-center justify-start p-0 relative overflow-hidden rounded-3xl">

//       {/* Main Content with Rounded Bottom Corners */}
//       <div className="w-full h-[85%] bg-gradient-to-b from-white to-red-50 shadow-2xl relative grid lg:grid-cols-3 rounded-b-3xl overflow-hidden z-10">

//         {/* Transparent Navbar */}
//         <nav className="absolute top-0 left-0 w-full p-6 flex items-center justify-between z-10">
//           {/* <div className="text-2xl font-bold text-red-600 pl-4">Mr. Amit Shrivastva</div> */}
//           <div className="text-3xl font-bold  bg-clip-text bg-gradient-to-r from-red-600 to-yellow-400 pl-4 relative">
//             <span className="inline-block transform hover:-rotate-2 transition-transform duration-300 shadow-lg ">
//               Mr. Amit Shrivastva
//             </span>
//             <div className="absolute w-1 h-6 bg-red-500 rounded-full -left-2 top-1/2 transform -translate-y-1/2 animate-pulse"></div>
//           </div>

          
//           <Link href="/getintouch">
//           <button className="bg-gradient-to-r from-red-600 to-orange-400 text-white px-8 py-4 rounded-xl hover:bg-red-700 mt-6 shadow-lg hover:scale-105 transform transition-all">
//             Get in Touch
//           </button></Link>
//         </nav>

//         {/* Left Section */}
//         <div className="p-8 lg:p-12 space-y-4 flex flex-col justify-center">
//           <h1 className="text-gray-800 text-5xl font-extrabold leading-tight">
//             Achieve the best version of your <span className="text-red-600">learning</span>
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Embrace your journey to academic excellence with personalized guidance!
//           </p>
//           <Link href="/form">
//           <button className="bg-gradient-to-r from-red-600 to-orange-400 text-white px-8 py-4 rounded-xl hover:bg-red-700 mt-6 shadow-lg hover:scale-105 transform transition-all">
//             Book a Consultation
//           </button></Link>
//         </div>

//         {/* Image Section */}
//         <div className="relative flex items-center justify-center">
//           <div className="w-72 h-72 lg:w-80 lg:h-80 relative z-30">

//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="p-8 lg:p-12 space-y-4 flex flex-col justify-center">
//           <div>
//             <h3 className="text-xl font-bold text-red-600">Mr. Amit Shrivastva</h3>
//             <p className="text-gray-500">General Practitioner</p>
//             <blockquote className="mt-4 text-gray-600 border-l-4 border-red-600 pl-4">
//               " Empowering students to conquer NEET and JEE with a blend of expert guidance, personalized strategies, and a passion for teaching. My goal is to simplify complex concepts, boost your confidence, and unlock your true academic potential for a successful future in competitive exams."
//             </blockquote>
//           </div>
//         </div>
//       </div>

//       {/* Image Extending Outside Div */}
// <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-30 w-[30rem] lg:w-[40rem] h-[50rem] flex justify-center p-2 ">
//   <Image
//     src="/images/mentor-img.png" // Replace with your actual image path
//     alt="Enhanced Image"
//     width={500} // Adjust width as needed
//     height={900} // Increase height to ensure full visibility
//     quality={100} // Maximize image quality
//     priority={true} // Prioritize loading
//     className="object-contain"
//   />
// </div>
//       {/* Extra Footer Bar Filling Empty Space */}
//       <div className=" w-full h-[20%] bg-rose-500"></div>
//     </main>
//     </div>
//   );
// }

// export const metadata = {
//   title: 'Teacher Page',
//   description: 'Landing page for support and learning with Mr. Amit Shrivastva.',
// };


import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa'; // Importing the WhatsApp icon

export default function HomePage() {
  return (
    <div className="px-16 py-12 pb-12 bg-gradient-to-b from-rose-100 to-white overflow-hidden h-screen relative">
      <main className="w-full bg-rose-500 h-screen flex flex-col items-center justify-start p-0 relative overflow-hidden rounded-3xl">
        {/* Main Content with Rounded Bottom Corners */}
        <div className="w-full h-[85%] bg-gradient-to-b from-white to-red-50 shadow-2xl relative grid lg:grid-cols-3 rounded-b-3xl overflow-hidden z-10">
          {/* Transparent Navbar */}
          <nav className="absolute top-0 left-0 w-full p-6 flex items-center justify-between z-10">
            <div className="text-3xl font-bold bg-clip-text bg-gradient-to-r from-red-600 to-yellow-400 pl-4 relative">
              <span className="inline-block transform hover:-rotate-2 transition-transform duration-300 shadow-lg">
                Mr. Amit Shrivastva
              </span>
              <div className="absolute w-1 h-6 bg-red-500 rounded-full -left-2 top-1/2 transform -translate-y-1/2 animate-pulse"></div>
            </div>

            <Link href="/getintouch">
              <button className="bg-gradient-to-r from-red-600 to-orange-400 text-white px-8 py-4 rounded-xl hover:bg-red-700 mt-6 shadow-lg hover:scale-105 transform transition-all">
                Get in Touch
              </button>
            </Link>
          </nav>

          {/* Left Section */}
          <div className="p-8 lg:p-12 space-y-4 flex flex-col justify-center">
            <h1 className="text-gray-800 text-5xl font-extrabold leading-tight">
              Achieve the best version of your <span className="text-red-600">learning</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Embrace your journey to academic excellence with personalized guidance!
            </p>
            <Link href="/form">
              <button className="bg-gradient-to-r from-red-600 to-orange-400 text-white px-8 py-4 rounded-xl hover:bg-red-700 mt-6 shadow-lg hover:scale-105 transform transition-all">
                Book a Consultation
              </button>
            </Link>
          </div>

          {/* Image Section */}
          <div className="relative flex items-center justify-center">
            <div className="w-72 h-72 lg:w-80 lg:h-80 relative z-30">
              {/* You can add an image or any additional content here */}
            </div>
          </div>

          {/* Right Section */}
          <div className="p-8 lg:p-12 space-y-4 flex flex-col justify-center">
            <div>
              <h3 className="text-xl font-bold text-red-600">Mr. Amit Shrivastva</h3>
              <p className="text-gray-500">General Practitioner</p>
              <blockquote className="mt-4 text-gray-600 border-l-4 border-red-600 pl-4">
                " Empowering students to conquer NEET and JEE with a blend of expert guidance, personalized strategies, and a passion for teaching. My goal is to simplify complex concepts, boost your confidence, and unlock your true academic potential for a successful future in competitive exams."
              </blockquote>
            </div>
          </div>
        </div>

        {/* Image Extending Outside Div */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-30 w-[30rem] lg:w-[40rem] h-[50rem] flex justify-center p-2">
          <Image
            src="/images/mentor-img.png" // Replace with your actual image path
            alt="Enhanced Image"
            width={500} // Adjust width as needed
            height={900} // Increase height to ensure full visibility
            quality={100} // Maximize image quality
            priority={true} // Prioritize loading
            className="object-contain"
          />
        </div>
        {/* Extra Footer Bar Filling Empty Space */}
        <div className="w-full h-[20%] bg-rose-500"></div>
      </main>

      {/* Floating WhatsApp Contact Button */}
      <Link href="https://wa.me/917417454936" target="_blank" rel="noopener noreferrer">
        <div className="fixed font-semi-bold bottom-8 right-8 bg-green-500 text-white flex items-center px-4 py-2 rounded-full shadow-lg hover:bg-green-600 transition transform hover:scale-105 z-50">
          {/* WhatsApp Icon using react-icons */}
          <FaWhatsapp className="w-10 h-10 mr-2" />
          <span>+91 7417454936</span>
        </div>
      </Link>
    </div>
  );
}

export const metadata = {
  title: 'Teacher Page',
  description: 'Landing page for support and learning with Mr. Amit Shrivastva.',
};

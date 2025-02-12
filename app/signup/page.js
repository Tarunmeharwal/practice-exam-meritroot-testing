// "use client";

// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { FcGoogle } from "react-icons/fc";

// const Signup = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });
//   const router = useRouter();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("User Data:", formData);
//     router.push("/jee");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-semibold text-gray-800 text-center">Create an Account</h2>

//         {/* Google Signup Button */}
//         <button
//           onClick={() => signIn("google")}
//           className="flex items-center justify-center w-full mt-4 py-2 border rounded-lg shadow-sm text-gray-700 hover:bg-gray-100 transition"
//         >
//           <FcGoogle className="text-2xl mr-2" />
//           Sign Up with Google
//         </button>

        

//         <div className="flex items-center my-4">
//           <hr className="flex-grow border-gray-300" />
//           <span className="px-2 text-gray-500 text-sm">OR</span>
//           <hr className="flex-grow border-gray-300" />
//         </div>

//         {/* Signup Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="text-gray-700">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
//               placeholder="John Doe"
//             />
//           </div>

//           <div>
//             <label className="text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
//               placeholder="example@mail.com"
//             />
//           </div>

//           <div>
//             <label className="text-gray-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
//               placeholder="********"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             Sign Up
//           </button>
//         </form>

//         <p className="mt-4 text-center text-sm">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-600 hover:underline">Login</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Signup successful!");
      router.push("/login");
    } else {
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Create an Account</h2>

        <button
          onClick={() => signIn("google")}
          className="flex items-center justify-center w-full mt-4 py-2 border rounded-lg shadow-sm text-gray-700 hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-2xl mr-2" />
          Sign Up with Google
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label className="text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
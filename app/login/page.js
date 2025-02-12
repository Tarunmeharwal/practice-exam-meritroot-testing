// "use client";

// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { FcGoogle } from "react-icons/fc";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const router = useRouter();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Login Data:", formData);
//     router.push("/dashboard"); // Redirect after login
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-semibold text-gray-800 text-center">Login to Your Account</h2>

//         {/* Google Login Button */}
//         <button
//           onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
//           className="flex items-center justify-center w-full mt-4 py-2 border rounded-lg shadow-sm text-gray-700 hover:bg-gray-100 transition"
//         >
//           <FcGoogle className="text-2xl mr-2" />
//           Sign in with Google
//         </button>

//         <div className="flex items-center my-4">
//           <hr className="flex-grow border-gray-300" />
//           <span className="px-2 text-gray-500 text-sm">OR</span>
//           <hr className="flex-grow border-gray-300" />
//         </div>

//         {/* Login Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
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
//             Login
//           </button>
//         </form>

//         <p className="mt-4 text-center text-sm">
//           Don't have an account?{" "}
//           <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


"use client";

import { useState } from "react";
import { signIn } from "next-auth/react"; // Uncommented for Google authentication
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // State to handle login errors
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      // Call the login API
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Login successful:", data);
        router.push("/dashboard"); // Redirect to dashboard after successful login
      } else {
        setError(data.message || "Login failed. Please try again."); // Set error message
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Login to Your Account</h2>

        {/* Google Login Button */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex items-center justify-center w-full mt-4 py-2 border rounded-lg shadow-sm text-gray-700 hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-2xl mr-2" />
          Continue with Google
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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

          {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
// import { dbConnect } from "@/utils/dbConnect";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export async function POST(req) {
//   await dbConnect();
//   const { email, password } = await req.json();

//   const user = await User.findOne({ email });
//   if (!user) return new Response("Invalid credentials", { status: 401 });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return new Response("Invalid credentials", { status: 401 });

//   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

//   return new Response(JSON.stringify({ token, user: { name: user.name, email: user.email } }), { status: 200 });
// }

import { dbConnect } from "@/utils/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "Invalid email or password" }), { status: 401 });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: "Invalid email or password" }), { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Return token and user data
    return new Response(
      JSON.stringify({ token, user: { name: user.name, email: user.email } }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
}
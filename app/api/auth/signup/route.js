import { dbConnect } from "@/utils/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await dbConnect();

    // Parse the request body
    const { name, email, password } = await req.json();
    console.log("Received signup data:", { name, email, password }); // Log the received data

    // Validate required fields
    if (!name || !email || !password) {
      return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully"); // Log successful hashing

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    console.log("User saved to database:", newUser); // Log the saved user

    return new Response(JSON.stringify({ message: "User created" }), { status: 201 });
  } catch (error) {
    console.error("Signup error:", error); // Log the error
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
}
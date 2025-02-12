
import { dbConnect } from "@/utils/dbConnect";
import Subject from "@/models/Subject";


export async function POST(req) {
  try {
  await dbConnect();
  const { name, courseId } = await req.json();
  const newSubject = new Subject({ name, courseId });
  await newSubject.save();
  return Response.json({ success: true, data: newSubject });
} catch (error) {
  return Response.json({ success: false, error: error.message });
}
}


export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    const query = {};
    if (courseId) query.courseId = courseId;

    const subjects = await Subject.find(query).populate('courseId');
    return Response.json({ success: true, data: subjects });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

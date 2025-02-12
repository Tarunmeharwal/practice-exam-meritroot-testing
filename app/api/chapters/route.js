import { dbConnect } from "@/utils/dbConnect"; 
import Chapter from "@/models/Chapter";

export async function POST(req) {
  try {
    await dbConnect();
    const { name, subjectId } = await req.json();
    const newChapter = new Chapter({ name, subjectId });
    await newChapter.save();
    return Response.json({ success: true, data: newChapter });
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const subjectId = searchParams.get("subjectId");
    const chapters = await Chapter.find({ subjectId }).sort({ createdAt: -1 });
    return Response.json({ success: true, data: chapters });
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}
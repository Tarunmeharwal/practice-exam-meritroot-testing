import { dbConnect } from "@/utils/dbConnect"; 
import Subtopic from "@/models/Subtopic";

export async function POST(req) {
  try {
    await dbConnect();
    const { name, topicId } = await req.json();
    const newSubtopic = new Subtopic({ name, topicId });
    await newSubtopic.save();
    return Response.json({ success: true, data: newSubtopic });
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}


// export async function GET(req) {
//   try {
//     await dbConnect();
//     const { searchParams } = new URL(req.url);
//     const slug = searchParams.get("slug");

//     if (slug) {
//       // Convert slug to name format
//       const name = slug.replace(/-/g, ' ');
//       const subtopic = await Subtopic.findOne({ 
//         name: { $regex: new RegExp(`^${name}$`, 'i') }
//       });
      
//       if (!subtopic) return Response.json({ success: false, error: "Subtopic not found" });
//       return Response.json({ success: true, data: subtopic });
//     }

//     // Existing topicId handling
//     const topicId = searchParams.get("topicId");
//     if (topicId) {
//       const subtopics = await Subtopic.find({ topicId });
//       return Response.json({ success: true, data: subtopics });
//     }

//     return Response.json({ success: false, error: "Invalid query" });
//   } catch (error) {
//     return Response.json({ success: false, error: error.message });
//   }
// }

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    
    // Handle slug-based lookup
    const slug = searchParams.get("slug");
    if (slug) {
      // Convert slug to name format
      const name = slug.replace(/-/g, ' ');
      const subtopic = await Subtopic.findOne({ 
        slug: slug 
      }).populate('topicId');
      
      if (!subtopic) {
        return Response.json({ success: false, error: "Subtopic not found" }, { status: 404 });
      }
      return Response.json({ success: true, data: subtopic });
    }

    // Handle topicId-based lookup
    const topicId = searchParams.get("topicId");
    if (topicId) {
      const subtopics = await Subtopic.find({ topicId });
      return Response.json({ success: true, data: subtopics });
    }

    return Response.json({ success: false, error: "Invalid query" }, { status: 400 });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
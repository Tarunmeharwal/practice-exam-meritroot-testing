

// import { dbConnect } from "@/utils/dbConnect";
// import Topic from "@/models/Topic";

// export async function POST(req) {
//   try {
//     await dbConnect();
//     const { name, courseId } = await req.json();
//     const newTopic = new Topic({ name, courseId });
//     await newTopic.save();
//     return Response.json({ success: true, data: newTopic });
//   } catch (error) {
//     return Response.json({ success: false, error: error.message });
//   }
// }

// export async function GET(req) {
//   try {
//     await dbConnect();
//     const { searchParams } = new URL(req.url);
//     const courseId = searchParams.get("courseId");
//     const slug = searchParams.get("slug");

//     if (slug) {
//       const topic = await Topic.findOne({ slug });
//       return Response.json({ success: true, data: topic });
//     }

//     const topics = await Topic.find({ courseId });
//     return Response.json({ success: true, data: topics });
//   } catch (error) {
//     return Response.json({ success: false, error: error.message });
//   }
// }


// import { dbConnect } from "@/utils/dbConnect";
// import Topic from "@/models/Topic";

// export async function POST(req) {
//   try {
//     await dbConnect();
//     const { name, courseId } = await req.json();
//     const newTopic = new Topic({ name, courseId });
//     await newTopic.save();
//     return Response.json({ success: true, data: newTopic });
//   } catch (error) {
//     return Response.json({ success: false, error: error.message });
//   }
// }

// export async function GET(req) {
//   try {
//     await dbConnect();
//     const { searchParams } = new URL(req.url);
//     const courseId = searchParams.get("courseId");

//     const topics = await Topic.find({ courseId });
//     return Response.json({ success: true, data: topics });
//   } catch (error) {
//     return Response.json({ success: false, error: error.message });
//   }
// }



import { dbConnect } from '@/utils/dbConnect';
import Topic from '@/models/Topic';

export async function POST(req) {
  try {
    await dbConnect();
    const { name, courseId } = await req.json();
    const newTopic = new Topic({ name, courseId });
    await newTopic.save();
    return new Response(JSON.stringify({ success: true, data: newTopic }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const courseId = searchParams.get('courseId');

    // If a slug is provided, return the matching topic.
    if (slug) {
      const topic = await Topic.findOne({ slug });
      if (!topic) {
        return new Response(JSON.stringify({ success: false, error: 'Topic not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({ success: true, data: topic }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // If courseId is provided, return topics for that course.
    if (courseId) {
      const topics = await Topic.find({ courseId });
      return new Response(JSON.stringify({ success: true, data: topics }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Otherwise, return all topics.
    const topics = await Topic.find({});
    return new Response(JSON.stringify({ success: true, data: topics }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

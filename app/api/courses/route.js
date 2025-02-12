// import { dbConnect } from "@/utils/dbConnect";
// import Course from "@/models/Course";

// export async function POST(req) {
//   try {
//     await dbConnect();
//     const { name } = await req.json();
//     const newCourse = new Course({ name });
//     await newCourse.save();
//     return Response.json({ success: true, data: newCourse });
//   } catch (error) {
//     return Response.json({ success: false, error: error.message });
//   }
// }

// export async function GET(req) {
//   try {
//     await dbConnect();
//     const { searchParams } = new URL(req.url);
//     const slug = searchParams.get("slug");

//     if (slug) {
//       const course = await Course.findOne({ slug });
//       if (!course) {
//         return Response.json(
//           { success: false, error: "Course not found" },
//           { status: 404 }
//         );
//       }
//       return Response.json({ success: true, data: course });
//     }

//     const courses = await Course.find({});
//     return Response.json({ success: true, data: courses });
//   } catch (error) {
//     return Response.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }


import { dbConnect } from '@/utils/dbConnect';
import Course from '@/models/Course';

export async function POST(req) {
  try {
    await dbConnect();
    const { name } = await req.json();
    const newCourse = new Course({ name });
    await newCourse.save();
    return new Response(JSON.stringify({ success: true, data: newCourse }), {
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

    if (slug) {
      const course = await Course.findOne({ slug });
      if (!course) {
        return new Response(JSON.stringify({ success: false, error: 'Course not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({ success: true, data: course }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const courses = await Course.find({});
    return new Response(JSON.stringify({ success: true, data: courses }), {
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

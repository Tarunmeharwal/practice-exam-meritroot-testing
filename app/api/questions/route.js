
import { dbConnect } from '@/utils/dbConnect';
import Question from '@/models/Question';

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const newQuestion = new Question(body);
    await newQuestion.save();
    return new Response(JSON.stringify({ success: true, data: newQuestion }), {
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
    const topicId = searchParams.get('topicId');
    const questions = await Question.find({ topicId });
    return new Response(JSON.stringify({ success: true, data: questions }), {
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

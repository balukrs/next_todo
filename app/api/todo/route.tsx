import { connectMongoDB } from '@/lib/mongodb';
import Todo from '@/models/tasks';
import { successResponse, errorResponse, errorNotFoundResponse } from '@/utils/response';
import withAuthDB from '@/utils/withAuthDb';

export const POST = withAuthDB(async (req: Request) => {
  try {
    const { title = '' } = await req.json();
    if (!title || title.trim() === '') {
      return errorNotFoundResponse({ message: 'Title is required' });
    }
    await connectMongoDB();
    await Todo.create({ title });
    return successResponse({ message: 'Task Created' }, 201);
  } catch (error) {
    if (error) console.error(error);
    return errorResponse({ message: 'Error Occured' });
  }
});

export const GET = withAuthDB(async () => {
  try {
    await connectMongoDB();
    const todos = await Todo.find().sort({ createdAt: -1 });
    return successResponse({ message: 'Todos fetched', data: todos });
  } catch (error) {
    console.error('GET error:', error);
    return errorResponse({ message: 'Error Occured' });
  }
});

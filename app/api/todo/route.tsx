import { connectMongoDB } from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { Todo, ToDoType } from '@/models/tasks';
import { successResponse, errorResponse, errorNotFoundResponse } from '@/utils/response';
import withAuthDB from '@/utils/withAuthDb';
import { authOptions } from '@/lib/authOptions';

export const POST = withAuthDB(async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    const { title = '' } = (await req.json()) as ToDoType;
    if (!title || title.trim() === '') {
      return errorNotFoundResponse({ message: 'Title is required' });
    }
    await connectMongoDB();
    await Todo.create({ title, userId: session && session.user.id });
    return successResponse({ message: 'Task Created' }, 201);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    } else console.error('Unknown Error');
    return errorResponse({ message: 'Error Occured' });
  }
});

export const GET = withAuthDB(async () => {
  try {
    await connectMongoDB();
    const todos = await Todo.find().sort({ createdAt: -1 });
    return successResponse({ message: 'Todos fetched', data: todos });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    } else console.error('Unknown Error');
    return errorResponse({ message: 'Error Occured' });
  }
});

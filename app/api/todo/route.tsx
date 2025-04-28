import { getServerSession } from 'next-auth';
import { Todo, ToDoType } from '@/models/tasks';
import { successResponse, errorResponse, errorNotFoundResponse } from '@/utils/response';
import withAuthDB from '@/utils/withAuthDb';
import { authOptions } from '@/lib/authOptions';
import paginationData from '@/utils/paginationQueryFn';

export const POST = withAuthDB(async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    const { title = '' } = (await req.json()) as ToDoType;
    if (!title || title.trim() === '') {
      return errorNotFoundResponse({ message: 'Title is required' });
    }
    await Todo.create({ title, userId: session && session.user.id });
    return successResponse({ message: 'Task Created' }, 201);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    } else console.error('Unknown Error');
    return errorResponse({ message: 'Error Occured' });
  }
});

export const GET = withAuthDB(async (req: Request) => {
  try {
    const { skip, count, totalPages, limit, page } = await paginationData(req, Todo);
    const todos = await Todo.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

    return successResponse({
      message: 'Todos fetched',
      data: todos,
      pagination: { page, limit, count, totalPages },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    } else console.error('Unknown Error');
    return errorResponse({ message: 'Error Occured' });
  }
});

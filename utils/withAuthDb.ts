import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/authOptions';
import { connectMongoDB } from '../lib/mongodb';
import { errorResponse } from './response';
import { NextResponse } from 'next/server';

const withAuthDB =
  (handler: (req: Request) => Promise<NextResponse>) =>
  async (req: Request): Promise<NextResponse> => {
    const session = await getServerSession(authOptions);

    if (!session) {
      return errorResponse({ message: 'Unauthorized' }, 401);
    }

    await connectMongoDB();

    return handler(req);
  };

export default withAuthDB;

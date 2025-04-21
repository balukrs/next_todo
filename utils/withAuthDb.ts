import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/authOptions';
import { connectMongoDB } from '../lib/mongodb';
import { errorResponse } from './response';
import { NextResponse } from 'next/server';

const withAuthDB =
  (handler: (req: Request) => Promise<NextResponse>) =>
  async (req: Request): Promise<NextResponse> => {
    const session = await getServerSession(authOptions);
    const headers = req.headers;

    const method = req.method;
    const url = req.url;
    const date = new Date().toISOString();
    const ip = headers.get('x-forwarded-for');

    // Log API requests
    console.log(`[${date}] ${method} ${url} - IP: ${ip}`);

    if (!session) {
      return errorResponse({ message: 'Unauthorized' }, 401);
    }

    await connectMongoDB();

    return handler(req);
  };

export default withAuthDB;

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectMongoDB } from '../../../lib/mongodb';
import User from '@/models/user';

// Types
import { FormTypes } from '@/types/register';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { email, name, password } = (await req.json()) as FormTypes;
    await connectMongoDB();

    const user = await User.findOne({ email }).select('_id');

    if (user) {
      return NextResponse.json({ message: 'User Already exisit', success: false }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, name, password: hashedPassword });
    return NextResponse.json({ message: 'User Registered', success: true }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    } else console.error('Unknown Error');

    return NextResponse.json({ message: 'Error Occured', success: false }, { status: 500 });
  }
}

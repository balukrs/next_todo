import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectMongoDB } from '../../../lib/mongodb';
import User from '@/models/user';

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();
    await connectMongoDB();

    const user = await User.findOne({ email }).select('_id');

    if (user) {
      return NextResponse.json({ message: 'User Already exisit', success: false }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, name, password: hashedPassword });
    return NextResponse.json({ message: 'User Registered', success: true }, { status: 201 });
  } catch (error) {
    if (error) console.log(error);
    return NextResponse.json({ message: 'Error Occured', success: false }, { status: 500 });
  }
}

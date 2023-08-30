import { connectToMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { IUser } from '@/types/User';

export async function POST(req: Request) {
  try {
    const { name, email, password, isTrustDevice } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);
    await connectToMongoDB();
    const user: IUser = { name, email, password: hashedPassword, isTrustDevice };
    await User.create(user);

    return NextResponse.json({ message: 'User successfully registered.' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occurred while registering the user.' },
      { status: 500 },
    );
  }
}

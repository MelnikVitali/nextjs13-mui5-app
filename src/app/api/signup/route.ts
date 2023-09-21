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

    const userExists = await User.findOne({ email }).select('_id');

    if (userExists) {
      throw new Error('The user with this email address is already registered');
    }

    const user: IUser = { name, email, password: hashedPassword, isTrustDevice };
    await User.create(user);

    return NextResponse.json({ message: 'User successfully registered.' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          ((error as Error)?.message as string) || 'An error occurred while registering the user.',
      },
      { status: 400 },
    );
  }
}

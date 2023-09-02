import { connectToMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

interface Params {
  params: {
    id: string;
  };
}

export async function PUT(req: Request, { params: { id } }: Params) {
  try {
    await connectToMongoDB();
    const { password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatePassword = await User.findOneAndUpdate({ _id: id }, { password: hashedPassword });

    if (!updatePassword) {
      return NextResponse.json({ message: 'Password update failed.' }, { status: 403 });
    }

    return NextResponse.json({ message: 'Your password has been updated.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error?.toString() }, { status: 403 });
  }
}

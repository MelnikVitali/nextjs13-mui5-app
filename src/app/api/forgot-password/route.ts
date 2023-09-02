import nodemailer from 'nodemailer';
import { connectToMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  try {
    await connectToMongoDB();
    const { email } = await req.json();
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('This email is not associated with any account.');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PW,
      },
    });

    var mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: user.email,
      subject: '[next-blog-vercel app] Please Reset your Password.',
      name: user.name,
      html: `
      <div>
        <p>Hello, ${user.name}</p>
        <p>Please follow <a href="${process.env.NEXTAUTH_URL}/reset-password/${user._id}">🠖 this link 🠔</a></button> to reset your password.</p>
      </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'An email has been sent to your inbox.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error?.toString() }, { status: 400 });
  }
}

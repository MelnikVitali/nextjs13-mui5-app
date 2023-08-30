import { IUser } from '@/types/User';
import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      minLength: [4, 'Full name should be at least 4 characters long'],
      maxLength: [30, 'Full name should be less than 30 characters'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    isTrustDevice: {
      type: Boolean,
      required: [true, 'isTrustDevice is required'],
      select: false,
    },
  },
  { timestamps: true },
);

const User = models.User || model<IUser>('User', UserSchema);

export default User;

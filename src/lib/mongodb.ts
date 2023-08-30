import mongoose from 'mongoose';

export const connectToMongoDB = async () => {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    throw new Error('Invalid environment variable: MONGODB_URI');
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('🚀Connected to MongoDB');
  } catch (error) {
    console.log('👎Error connecting to MongoDB: ', error);
  }
};

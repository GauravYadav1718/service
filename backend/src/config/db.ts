import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config();

const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI as string;

    // Use MongoMemoryServer if we are using the default local URI and there's no local DB
    // Or we can just explicitly use MongoMemoryServer for this assignment locally
    if (process.env.NODE_ENV === 'development') {
      const mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      console.log('Using In-Memory MongoDB for Development...');
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

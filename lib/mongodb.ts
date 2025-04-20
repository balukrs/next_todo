import mongoose, { Connection, Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (typeof MONGODB_URI !== 'string' || MONGODB_URI.trim() === '') {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose ?? { conn: null, promise: null };

export const connectMongoDB = async (): Promise<Connection> => {
  if (cached.conn != null) {
    console.log('Using existing database connection');
    return cached.conn as Connection;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => {
      console.log('Connected to Database');
      return mongooseInstance;
    });
  }

  const mongooseInstance = (await cached.promise) as Mongoose;

  cached.conn = mongooseInstance.connection;
  global.mongoose = cached;

  if (cached.conn == null) {
    throw new Error('Failed to connect to MongoDB');
  }

  return cached.conn as Connection;
};

import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  // Reuse existing connection in serverless environment
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vineetkr-db';
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    isConnected = true;
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    console.error('Connection URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
    throw error;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
  isConnected = false;
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB error:', error);
  isConnected = false;
});

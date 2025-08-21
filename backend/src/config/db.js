const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    // Use Render's MONGODB_URI if available, otherwise fall back to MONGO_URI or local database
    const mongoUri = process.env.MONGO_URI ;
        // const mongoUri = 'mongodb://localhost:27017/appointmentDB';
        // const mongoUri= ''
    console.log('Connecting to MongoDB with URI:', mongoUri);
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in the environment variables.');
    }
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;

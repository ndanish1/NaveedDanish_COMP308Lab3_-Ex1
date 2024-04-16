import mongoose from "mongoose";

// Define the Mongoose configuration method
async function configureMongoose() {
  const dbUri = 'mongodb://localhost:27017/Microservices_lab3'; // MongoDB connection URI

  try {
    // Use Mongoose to connect to MongoDB
    await mongoose.connect(dbUri);
    console.log(`Connected to MongoDB at ${dbUri}`);
    return mongoose.connection; // Return the Mongoose connection instance
  } catch (error) {
    console.error("Error in db connection", error);
    throw error; // Rethrow the error to handle it in the caller
  }
}

export default configureMongoose;

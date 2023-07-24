import mongoose from "mongoose";

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {});
    console.log("Connected to the database.");
  } catch (err) {
    console.error("Error connecting to the database");
  }
}

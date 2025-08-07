import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "todoproject",
    });
    console.log("✅ Database is connected");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
};

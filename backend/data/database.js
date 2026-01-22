import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const c = await mongoose.connect(process.env.MONGO_URL, {
      dbName: "todoproject",
    });

    console.log(`✅ Database is connected with ${c.connection.host}`);
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
};

import dotenv from "dotenv";
dotenv.config({ path: "./data/config.env" });

import { app } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();

app.listen(process.env.PORT, () => {
  console.log(
    `✅ Server running on http://localhost:${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});

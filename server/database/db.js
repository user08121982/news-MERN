import mongoose from "mongoose";
import DefaultData from "../default.js";
import news from "../model/news-schema.js";

const Connection = async () => {
  const URL = process.env.DB_URL || `mongodb://localhost:27017/News`;
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected");

    if (await news.countDocuments() === 0) {
      DefaultData();
    }

  } catch (error) {
    console.log("Error while connecting with database", error);
  }
};

export default Connection;
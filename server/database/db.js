const mongoose = require("mongoose");
const DefaultData = require("../default.js");
const news = require("../model/news-schema.js");

const connection = async () => {
  const URL = process.env.DB_URL || `mongodb://localhost:27017/News`;
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(URL);
    console.log("Database Connected");

    if (await news.countDocuments() === 0) {
      DefaultData();
    }

  } catch (error) {
    console.log("Error while connecting with database", error);
  }
};

module.exports = connection;
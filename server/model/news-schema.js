const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  source: {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  author: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String, // Example categories: "sports", "technology", "politics", etc.
    required: true,
  },
  urlToImage: {
    type: String,
  },
  publishedAt: {
    type: String,
  },
  content: {
    type: String,
  },
});

const news = mongoose.model("news", newsSchema);
module.exports = news;
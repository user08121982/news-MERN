const data = require("./constants/data.js");
const News = require("./model/news-schema.js");

const DefaultData = async () => {
  try {
    await News.insertMany(data);
    console.log("Data imported successful");
  } catch (error) {
    console.log("Error", error.message);
  }
};

module.exports = DefaultData;
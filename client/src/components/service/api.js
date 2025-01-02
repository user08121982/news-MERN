import axios from "axios";

export const getNews = async (page, search, category) => {
  try {
    return await axios.get('/news', { params: { page, search, category } });
  } catch (error) {
    console.log("error while calling new api", error);
  }
};
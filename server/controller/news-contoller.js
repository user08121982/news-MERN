import news from "../model/news-schema.js"

export const getNews = async (request, response) => {
    try {
        let data = await news.find();
        response.json(data);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}
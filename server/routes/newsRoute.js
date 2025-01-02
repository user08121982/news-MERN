const express = require('express');
const news = require('../model/news-schema');

const Router = express.Router();

Router.get("/", async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "", category = "" } = req.query; // Default values
        const query = {};

        // If a search term is provided, filter by title or description
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } }, // Case-insensitive search
                { description: { $regex: search, $options: "i" } }
            ];
        }

        // If a category is provided, filter by category
        if (category) {
            query.category = category;
        }

        // Fetch paginated data
        const data = await news.find(query)
            .skip((page - 1) * limit) // Skip records for pagination
            .limit(Number(limit)) // Limit number of records
            .exec();

        // Fetch total document count for pagination metadata
        const total = await news.countDocuments(query);

        res.json({
            data,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / limit),
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

Router.post("/", async (req, res) => {
    try {
        const {
            source,
            author,
            title,
            description,
            url,
            urlToImage,
            publishedAt,
            content,
            category,
        } = req.body;

        // Create a new news document
        const newNews = new news({
            source,
            author,
            title,
            description,
            url,
            urlToImage,
            publishedAt,
            content,
            category,
        });

        // Save the document to the database
        const savedNews = await newNews.save();

        res.status(201).json(savedNews); // Return the created document with status 201
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = Router;
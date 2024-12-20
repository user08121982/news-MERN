import express from "express";
import { getNews } from "../controller/news-contoller.js";

const Router = express.Router();

Router.get("/news", getNews);

export default Router;
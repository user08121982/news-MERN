import { useState, useEffect } from "react";
import { getNews } from "../service/api";
import InfiniteScroll from "react-infinite-scroll-component";
import Article from "./Article";

const Articles = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const dailyNews = async () => {
      const response = await getNews(page);
      setNews(prevNews => [...new Set([...prevNews, ...response.data])]);
    };
    dailyNews();
  }, [page]);

  return (
    <>
      <InfiniteScroll
        dataLength={news.length}
        next={() => setPage((page) => page + 1)}
        hasMore={true}
      >
        {news.map((article, i) => (
          <Article key={i} article={article} />
        ))}
      </InfiniteScroll>
    </>
  );
};

export default Articles;

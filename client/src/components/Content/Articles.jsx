import { useState, useEffect } from "react";
import { getNews } from "../service/api";
import InfiniteScroll from "react-infinite-scroll-component";
import Article from "./Article";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";

const Articles = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: null, name: "All" },
    { id: "technology", name: "Technology" },
    { id: "sports", name: "Sports" },
    { id: "market", name: "Market" },
    { id: "politics", name: "Politics" },
    { id: "health", name: "Health" },
    { id: "entertainment", name: "Entertainment" },
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(async () => {
      const response = await getNews(page, query, selectedCategory.id);
      setNews(prevNews => {
        if (response.data.data.length === 0) setPage(1);
        return [...new Set([...prevNews, ...response.data.data])]
      });
      setLoading(false);
    }, 800);
    return () => clearTimeout(timeout);
  }, [page, query, selectedCategory]);

  const handleQueryChange = (q) => {
    setNews([]);
    setPage(1);
    setSelectedCategory(categories[0]);
    setQuery(q);
  };

  const handleCategoryChange = (category) => {
    setNews([]);
    setPage(1);
    setSelectedCategory(category);
  };
  return (
    <>
      <Header onQueryChange={handleQueryChange} />
      <Navbar categories={categories} activeCategory={selectedCategory.name} onCategoryChange={handleCategoryChange} />
      <div style={{ paddingTop: '40px' }}>
        <InfiniteScroll
          dataLength={news.length}
          next={() => setPage((page) => page + 1)}
          hasMore={true}
        >
          {news.map((article, i) => (
            <Article key={i} article={article} />
          ))}
        </InfiniteScroll>
        <div style={{ textAlign: 'center' }}>{loading ? 'Loading...' : news.length > 0 || 'No Matching Results.'}</div>
      </div>
    </>
  );
};

export default Articles;
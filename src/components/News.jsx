import React, { useState, useEffect } from "react";

function News({ weatherData }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            const city = encodeURIComponent(weatherData.location.name)+' city';
            const url = `https://api.worldnewsapi.com/search-news?text=${city}&language=en`;
            const apiKey = '0fffd740fd7846b08f83edc0a56402a5';

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'x-api-key': apiKey
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setArticles(data.news);
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [weatherData]);

    if (loading) {
        return <p className='loading'>Loading...</p>;
    }

    return (
        <div className='news-container'>
            {articles.length === 0 ? (
                <p>No news articles found.</p>
            ) : (
                <ul className='news-list'>
                    {articles.map((article, index) => (
                        <li className='news-item' key={index}>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                <h2>{article.title}</h2>
                                {article.image && (
                                    <img src={article.image} alt={article.title} width="100" />
                                )}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default News;
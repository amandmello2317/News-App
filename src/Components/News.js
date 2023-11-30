import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";


import PropTypes from 'prop-types'

const News = (props) => {

    const [articles, setArticles] = useState([ ]);
    const [loading, setLoading] = useState(true);
    const [page, setpage] = useState(1);
    const [totalResults, setTotalResults] = useState(0)
    

   
      const capitalzeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
  
    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.propspageSize}`;
        
        setLoading(true)
        let data = await fetch(url);

        props.setProgress(30);

        let pasedData = await data.json()
        console.log(pasedData);
        props.setProgress(50);

        setArticles(pasedData.articles)
        setTotalResults(pasedData.totalResults)
        setLoading(false)
       
        props.setProgress(100);
    }

//Use Effect
    useEffect(() => {
        document.title = `${capitalzeFirstLetter(props.category)}- News `
        updateNews()
    },[])

//    const handlePrevious = async() => {
//         setpage(page + 1)
//         updateNews()
//    };

//    const handleNext = async() => {
//         setpage(page + 1)
//         updateNews()
//    };

    const fetchMoreData = async() => {
        
         const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
         setpage(page+1)
        
        let data = await fetch(url);
        let pasedData = await data.json();

        setArticles(articles.concat(pasedData.articles))
        setTotalResults(pasedData.totalResults)
  };

    return (
        <>
            <h1 className="text-center" style={{margin: '40px 0px', marginTop: "90px"}}>Newsmonkey - Top headline From <span style={{color: "red", fontWeight: "bold"}}>{capitalzeFirstLetter(props.category)}</span></h1>

            {loading && <Spinner/>}
            
            
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}>
                    <div className="container"> 
                        <div className="row">
                            {articles.map((elements) => {
                                return( 

                                    <div className="col-md-4" key={elements.url}>
                                        <NewsItem 
                                            title ={elements.title ? elements.title : ""}
                                            description ={elements.description ? elements.description : ""}
                                            imageSrc = {elements.urlToImage}
                                            newsUrl={elements.url} 
                                            author={elements.author}                
                                            date={elements.publishedAt}
                                            source={elements.source.name}
                                        />
                                    </div>
                                )

                        })}

                        </div>
                </div>
                </InfiniteScroll>
               
                    {/* <div className="container d-flex justify-content-between">
                        <button type="button" disabled={state.page<=1} className="btn btn-primary" onClick={handlePrevious}>&larr; Previous</button>

                        <button type="button" disabled={state.page +  1 > Math.ceil( totalResults/props.pageSize)} className="btn btn-primary" onClick={handleNext}>Next &rarr;</button>
                    </div> */}
            </>
            )
        
    }


    News.defaultProps = {
        country: "in",
        pageSize: 8,
        category: 'general'
        
    }
    News.propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

export default News
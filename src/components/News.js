import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=> {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    
    const capitalizeFirstLetter =(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    const updateNews = async ()=> {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=f5282d6511804597894dfd856a26f227&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url)
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);

        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);

    }

    useEffect(()=>{
        document.title = `${capitalizeFirstLetter(props.category)}- NewsDose`
        updateNews();
        // eslint-disable-next-line
    } ,[])


    const fetchMoreData = async() => {
       const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=f5282d6511804597894dfd856a26f227&page=${page+1}&pageSize=${props.pageSize}`
       setPage(page+1) 
       let data = await fetch(url)
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
       
      };
    

    // nextPage = async () => {
    //     console.log('Next')
    //     if (this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)) {

    //     }
    //     else {
    //         await this.setState({page: this.state.page + 1})
    //         this.updateNews();
    //     }
    // }

    // prevPage = async () => {
    //      await this.setState({page: this.state.page - 1})
    //     this.updateNews();
    // }


        return (
            <>
                <h1 className='text-center' style={{ margin: '30px 0', marginTop:'95px' }}>NewsDose - Top Headlines from {capitalizeFirstLetter(props.category)}</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length!==totalResults}
                    loader={<Spinner/>}
                >
                     <div className='container my-3' >
                    <div className='row'>
                        {articles.map((elements) => {
                            return <div className='col-md-4 my-3' key={elements.url}>
                                <NewsItem source={elements.source.name} author={elements.author} time={elements.publishedAt} title={elements.title} description={elements.description} imageUrl={elements.urlToImage} url={elements.url} />
                            </div>
                        })}
                    </div>
                    </div>
                </InfiniteScroll>
                {/* <div className='container my-3 d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.prevPage}> &larr;Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.nextPage}> Next&rarr;</button>
                </div> */}
            </>
        )
    
}

News.defaultProps = {
    country: 'in',
    pageSize: '8',
    category: 'science'

}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News

import React from 'react'

const NewsItem = (props) => {

    let { title, description, imageUrl, url, time, author, source } = props;
    return (
        <div>
            <div className="card">
                <span className="position-absolute top-0 badge bg-danger">{source}</span>
                <img src={imageUrl ? imageUrl : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {author} {new Date(time).toGMTString()}</small></p>
                    <a href={url} rel="noreferrer" target='_blank' className="btn btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem

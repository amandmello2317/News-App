import React from 'react'
import emptyimg from './eimg.jpg'

const NewsItem = (props) => {
    let {title, description, imageSrc, newsUrl,author, date, source} = props
    return (
      <div className='my-3'>
        <div className="card">
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%", zIndex: "1"}}>{source}</span>
            <img src={imageSrc ? imageSrc :  emptyimg} className="card-img-top" alt="..."/>
            
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>

                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-body-secondary">by {!author ? "Unknown": author } on {new Date(date).toGMTString()}</small></p>
                    
                    <a href={newsUrl} rel='noreferrer'  target="_blank" className="btn btn-primary btn-sm">Read more</a>
                </div>
        </div>
      </div>
    )
  }

export default NewsItem
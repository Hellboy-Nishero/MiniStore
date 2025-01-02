import React from 'react'

const BlogList = ({source}) => {
    const formatDate = (dateString) => {
        const months = [
            "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
            "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
          ];

        const [year, month, day] = dateString.split("-");

        return `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
    }
  return (
    <div className='blogs'>
        <div className="list__header">
            <h2 className='list__title'>latest posts</h2>
            <a href='#' className='list__link'>read blogs</a>
        </div>
        <div className="blog__list">
            {
                source && source.map((item, index) =>
                    index < 3 ? 
                    <div key={item.id} className="blog__item">
                        <div className="blog__img">
                            <img src={item.image} alt="" />
                            <div className="overlay">
                                <button className='btn btn-primary'>read blog</button>
                            </div>
                        </div>
                        <span className="info__blog">{formatDate(item.date)} - {item.tags[0]}</span>
                        <h3 className='blog__title'>{item.title}</h3>
                    </div>
                    : null
                )
            }
        </div>
    </div>
  )
}

export default BlogList
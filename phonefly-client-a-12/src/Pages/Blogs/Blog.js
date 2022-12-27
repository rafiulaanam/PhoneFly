import React from 'react';

const Blog = ({blog}) => {
    const {img,title,des,category,Topic} =blog
    return (
        <div>
            <div className="card bg-base-100 shadow-xl">
  <figure><img src={img} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">
    {title}
      <div className="badge badge-secondary">NEW</div>
    </h2>
    <p>{des.slice(0,120)}.....</p>
    <div className="card-actions justify-end">
      <div className="badge badge-outline">{Topic}</div> 
      <div className="badge badge-outline">{category}</div>
    </div>
  </div>
</div>
        </div>
    );
};

export default Blog;
import React from "react";
import { FcOk } from "react-icons/fc";
import { BsBookmarkCheck } from "react-icons/bs";
import { PhotoProvider, PhotoView } from 'react-photo-view';

const Phone = ({ category, setModalInfo }) => {
  const {
    img,
    name,
    price,
    sale_price,
    used_year,
    posted_time,
    seller_name,
    identity,
  } = category;
  return (
    <div>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
        <PhotoProvider>
      <PhotoView src={img}>
      <img className="cursor-zoom-in" src={img} alt="Movie" />
      </PhotoView>
    </PhotoProvider>
          
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p className="card-text">
            Price: $
            <span className="text-3xl font-semibold ">{sale_price}</span>{" "}
            <del>{price}</del>
          </p>
          <p>
            Used: <span className="font-semibold">{used_year}</span> years
          </p>
          <p>
            Posted: <span className="font-semibold">{posted_time}</span>
          </p>
          <p className="flex ">
            {" "}
            Seller:{" "}
            <span className="font-semibold flex ml-2">
              {seller_name}
              <sup className="ml-1 text-xl">
                {identity === "Verified" ?  <FcOk />:" " }
              </sup>
            </span>
          </p>
          <div className="card-actions justify-end items-center">
          <button className="text-4xl mr-3"><BsBookmarkCheck/></button>

          
            <label onClick={()=>setModalInfo(category)}  htmlFor="report-modal" className="text-white border-none px-8 btn ">Report</label>


            <label onClick={()=>setModalInfo(category)}  htmlFor="booking-modal" className="text-white border-none px-8 btn bg-gradient-to-r from-[#874da2] to-[#c43a30]">Book Now</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phone;

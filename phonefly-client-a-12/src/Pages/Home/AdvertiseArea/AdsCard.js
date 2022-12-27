import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { BsBookmarkCheck } from "react-icons/bs";
import {FcOk } from "react-icons/fc";

const AdsCard = ({ads,setAdsModalInfo}) => {
    const {name,img,sale_price,price,seller_name,identity,posted_time,used_year}=ads;

    
    return (
      <div>
      <div className="card  bg-base-100 shadow-xl">
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

          
            <label onClick={()=>setAdsModalInfo(ads)}  htmlFor="ads-report-modal" className="text-white border-none px-8 btn ">Report</label>


            <label onClick={()=>setAdsModalInfo(ads)}  htmlFor="ads-booking-modal" className="text-white border-none px-8 btn bg-gradient-to-r from-[#874da2] to-[#c43a30]">Book Now</label>
          </div>
        </div>
      </div>
    </div>
    );
};

export default AdsCard;
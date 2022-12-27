import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import BookingModal from "../../Components/BookingModal/BookingModal";
import CategoryBar from "../Categories/CategoryBar";
import Phone from "../Categories/Phone";

const SingleCategory = () => {
  const [modalInfo, setModalInfo] = useState(null);
  const SingleCategory = useLoaderData();
  
  return (
    <div>
      <CategoryBar></CategoryBar>
      <div className="grid grid-cols-1 gap-4 container mx-auto">
        {SingleCategory.map((category) => (
          <Phone
            key={category._id}
            category={category}
            setModalInfo={setModalInfo}
          ></Phone>
        ))}
      </div>

      {modalInfo && <BookingModal modalInfo={modalInfo}></BookingModal>}
    </div>
  );
};

export default SingleCategory;

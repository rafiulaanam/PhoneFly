import React, { useState } from "react";
import CategoryBar from "./CategoryBar";
import { useQuery } from "@tanstack/react-query";
import Phone from "./Phone";
import BookingModal from "../../Components/BookingModal/BookingModal";
import ReportedModal from "../../Components/ReportedModal/ReportedModal";

const Categories = () => {
  const [modalInfo, setModalInfo] = useState(null);

  const url = `https://phonefly-server-a-12-rafiulaanam.vercel.app/all-phones`;
  const { data: categories = [], refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(url);
      const data = res.json();
      return data;
    },
  });

  return (
    <div>
      <CategoryBar></CategoryBar>
      <div className="grid grid-cols-1 gap-4 container mx-auto">
        {categories.map((category) => (
          <Phone
            key={category._id}
            category={category}
            setModalInfo={setModalInfo}
          ></Phone>
        ))}
      </div>

      {modalInfo && (
        <BookingModal
          modalInfo={modalInfo}
          setModalInfo={setModalInfo}
          refetch={refetch}
        ></BookingModal>
      )}

      {modalInfo && (
        <ReportedModal
          setReportModalInfo={setModalInfo}
          reportModalInfo={modalInfo}
        ></ReportedModal>
      )}
    </div>
  );
};

export default Categories;

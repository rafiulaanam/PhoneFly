import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AdsCard from "./AdsCard";
import Spinner from "../../../Components/Spinner/Spinner";
import AdsBookingModal from "../../../Components/BookingModal/AdsBookingModal";
import AdsReportedModal from "../../../Components/ReportedModal/AdsReportedModal";

const AdvertiseArea = () => {
  const [adsModalInfo, setAdsModalInfo] = useState(null);

  const url = `https://phonefly-server-a-12-rafiulaanam.vercel.app/my-ads?ads=RunAds`;
  const { data: RunAds = [], isLoading } = useQuery({
    queryKey: ["RunAds"],
    queryFn: async () => {
      const res = await fetch(url);
      const data = res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <div className="mt-10">
      {RunAds.length > 0 && (
        <div className="my-10  container mx-auto">
          <h1 className=" font-semibold text-3xl">Our Advertisement</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 ">
            {RunAds.map((ads) => (
              <AdsCard
                key={ads._id}
                ads={ads}
                setAdsModalInfo={setAdsModalInfo}
              ></AdsCard>
            ))}
          </div>
        </div>
      )}
      {adsModalInfo && (
        <AdsBookingModal
          setAdsModalInfo={setAdsModalInfo}
          adsModalInfo={adsModalInfo}
        ></AdsBookingModal>
      )}

      {adsModalInfo && (
        <AdsReportedModal
          setAdsReportModalInfo={setAdsModalInfo}
          adsReportModalInfo={adsModalInfo}
        ></AdsReportedModal>
      )}
    </div>
  );
};

export default AdvertiseArea;

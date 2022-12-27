import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Context/AuthProvider";
import BookedCards from "./BookedCards";
import PaymentModal from "../../../Components/PaymentModal/PaymentModal";
import Spinner from "../../../Components/Spinner/Spinner";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const url = `https://phonefly-server-a-12-rafiulaanam.vercel.app/bookings?email=${user?.email}`;

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`, //for jwt
        },
      });
      const data = res.json();
      return data;
    },
  });
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <div className="mx-10 my-10">
      <h2 className="text-5xl font-bold">My Orders</h2>
      <div className="grid  ">
        {bookings.length > 0 &&
          bookings.map((book) => (
            <BookedCards
              key={book._id}
              book={book}
              setPaymentInfo={setPaymentInfo}
            ></BookedCards>
          ))}
      </div>
      {paymentInfo && (
        <PaymentModal
          setPaymentInfo={setPaymentInfo}
          paymentInfo={paymentInfo}
          refetch={refetch}
        ></PaymentModal>
      )}
    </div>
  );
};

export default MyOrders;

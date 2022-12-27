import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthProvider";
import { useNavigate } from "react-router-dom";

const BookingModal = ({ modalInfo, setModalInfo, refetch }) => {
  const { user } = useContext(AuthContext);
  const {
    _id,
    name,
    description,
    sale_price,
    price,
    location,
    img,
    seller_name,
    identity,
  } = modalInfo;
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  // console.log(_id)
  const handleBook = (data) => {
    // console.log(data);
    if (user) {
      const bookingData = {
        buyer_name: user?.displayName,
        name,
        sale_price,
        email: user?.email,
        phone: data.phone,
        location,
        seller_name,
        identity,
        status: "Booked",
        payment: "Unpaid",
        img,
        productId: _id,
      };
      fetch(`https://phonefly-server-a-12-rafiulaanam.vercel.app/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.acknowledged) {
            toast.success("Booking Success");
            setModalInfo(null);
            refetch();
          }
        })
        .catch((e) => console.log(e));
    } else {
      toast.error("Please Register");
      setModalInfo(null);
      navigate("/register");
    }
  };

  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="flex justify-center">
            <img className="w-28" src={img} alt="" />
          </div>
          <h3 className="font-bold text-lg mt-4">{name}</h3>
          <p className="py-4">{description}</p>
          <p className="card-text">
            Price: $
            <span className="text-3xl font-semibold ">{sale_price}</span>{" "}
            <del>{price}</del>
          </p>
          <p className="card-text py-4">Meeting location: {location}</p>
          <form onSubmit={handleSubmit(handleBook)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                {...register("phone")}
                type="number"
                name="phone"
                placeholder="Enter your Phone"
                className="input input-bordered"
              />
            </div>
            <div className="modal-action">
              <input
                type="submit"
                className="text-white w-full border-none px-8 btn bg-gradient-to-r from-[#874da2] to-[#c43a30]"
                value="Submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;

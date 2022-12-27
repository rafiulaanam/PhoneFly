import React, { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const EditDetailsModal = ({ modalInfo, setMyProducts, refetch }) => {
  const { _id, name, description, sale_price, price, location, img, phone } =
    modalInfo;
  const { register, handleSubmit } = useForm();
  const [status, setStatus] = useState();

  const handleUpdate = (data) => {
    const productUpdate = {
      name: data.name,
      sale_price: data.sale_price,
      location: data.location,
      phone: data.phone,
      status: data.status === true ? "Sold Out" : "Available",
    };
    console.log(data.status);
    fetch(
      `https://phonefly-server-a-12-rafiulaanam.vercel.app/my-products/${_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productUpdate),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("Update Success");
          setMyProducts(null);
          refetch();
        }
      });
  };
  const handleDelete = (id) => {
    fetch(
      `https://phonefly-server-a-12-rafiulaanam.vercel.app/my-products/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((del) => {
        console.log(del);
        if (del.deletedCount > 0) {
          setMyProducts(null);
          toast.promise(
            refetch(),

            {
              loading: "Deleting...",
              success: <b>Delete Successfully</b>,
              error: <b>Could not delete.</b>,
            }
          );
        }
      });
  };
  const handleStatus = (event) => {
    const check = event.target.checked;
    if (check) {
      return setStatus(true);
    }
    return setStatus(false);
  };

  return (
    <div>
      <input type="checkbox" id="edit-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box  ">
          <label
            htmlFor="edit-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="flex justify-center">
            <img className="w-28" src={img} alt="" />
          </div>

          <p className="py-4">{description}</p>
          <p className="card-text">
            Price: $
            <span className="text-3xl font-semibold ">{sale_price}</span>{" "}
            <del>{price}</del>
          </p>
          <p className="card-text py-4">Meeting location: {location}</p>

          <form onSubmit={handleSubmit(handleUpdate)}>
            <div className="form-control">
              <form onChange={handleStatus} className="form-control mr-8">
                <label className="label cursor-pointer">
                  <span className="label-text text-base">
                    {status === true ? "Sold Out" : "Available"}
                  </span>
                  <input
                    {...register("status")}
                    type="checkbox"
                    name="status"
                    className="toggle toggle-sm ml-2"
                  />
                </label>
              </form>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                {...register("name")}
                type="text"
                name="name"
                disabled={status === true}
                defaultValue={name}
                placeholder="Product Name"
                className="input input-bordered "
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Sell Price</span>
              </label>
              <input
                {...register("sale_price")}
                type="number"
                name="sale_price"
                disabled={status === true}
                defaultValue={sale_price}
                placeholder="Product Name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                {...register("phone")}
                type="number"
                name="phone"
                disabled={status === true}
                defaultValue={phone}
                placeholder="Product Name"
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Meet location</span>
              </label>
              <input
                {...register("location")}
                type="text"
                name="location"
                disabled={status === true}
                defaultValue={location}
                placeholder="Product Name"
                className="input input-bordered"
              />
            </div>

            <div className="modal-action">
              <label
                onClick={() => handleDelete(_id)}
                className="text-white w-1/2 border-none px-8 btn btn-danger"
              >
                Delete
              </label>

              <input
                on
                type="submit"
                className="text-white w-1/2 border-none px-8 btn bg-gradient-to-r from-[#874da2] to-[#c43a30]"
                value="Update"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDetailsModal;

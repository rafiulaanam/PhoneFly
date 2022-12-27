import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import dateFormat from "dateformat";

const AddProduct = () => {
  const { user } = useContext(AuthContext);

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const now = new Date();
  const imgbb_key = process.env.REACT_APP_imgbb_key;

  const handleAddProduct = (data) => {
    const image = data.image[0];

    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imgbb_key}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        handleAdded(imgData.data.url);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    const handleAdded = (img) => {
      const posted_time = dateFormat(now, "fullDate");
      const products = {
        seller_name: user.displayName,
        email: user.email,
        identity: "Not Verified",
        name: data.name,
        price: data.price,
        sale_price: data.sale_price,
        phone: data.phone,
        used_year: data.used_year,
        location: data.location,
        condition: data.condition,
        description: data.des,
        category: data.category,
        posted_time,
        img,
        status: "Available",
        ads: "NoAds",
      };

      fetch(`https://phonefly-server-a-12-rafiulaanam.vercel.app/all-phones`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(products),
      })
        .then(() => {
          toast.success("Product Added Successfully");
          navigate("/seller/dashboard/my-products");
        })
        .catch((e) => console.log(e));
    };
  };

  return (
    <div className="m-10 ">
      <div>
        <div className="card flex-shrink-0 w-full  shadow-2xl bg-base-100 card-body">
          <form onSubmit={handleSubmit(handleAddProduct)} className="">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                {...register("name")}
                type="text"
                name="name"
                placeholder="Product Name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Selling Price</span>
              </label>
              <input
                {...register("sale_price")}
                type="number"
                name="sale_price"
                placeholder="Product Price"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Original Price</span>
              </label>
              <input
                {...register("price")}
                type="number"
                name="price"
                placeholder="Purchased Price"
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
                placeholder="Enter your Phone"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Year of Used</span>
              </label>
              <input
                {...register("used_year")}
                type="number"
                name="used_year"
                placeholder="Used years"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                {...register("des")}
                name="des"
                className="textarea textarea-bordered w-full"
                placeholder="Write description about your product"
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <select
                {...register("location")}
                name="location"
                className="select select-bordered w-full max-w-xs"
              >
                <option disabled selected>
                  select your location
                </option>
                <option value={"Dhaka"}>Dhaka</option>
                <option value={"Sylhet"}>Sylhet</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Condition</span>
              </label>
              <select
                {...register("condition")}
                name="condition"
                className="select select-bordered w-full max-w-xs"
              >
                <option disabled selected>
                  select product condition
                </option>
                <option value={"Excellent"}>Excellent</option>
                <option value={"Good"}>Good</option>
                <option value={"Fair"}>Fair</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                {...register("category")}
                name="category"
                className="select select-bordered w-full max-w-xs"
              >
                <option disabled selected>
                  select product category
                </option>
                <option value={"Apples"}>Apples</option>
                <option value={"Samsung"}>Samsung</option>
                <option value={"Xiaomi"}>Xiaomi</option>
                <option value={"Oppo"}>Oppo</option>
                <option value={"Vivo"}>Vivo</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Add Product Image</span>
              </label>

              <input
                {...register("image")}
                type="file"
                name="image"
                className="file-input file-input-bordered w-full max-w-xs"
              />
            </div>

            <div className="form-control mt-10">
              <input
                type="submit"
                value={"Add Product"}
                className="text-white w-full border-none px-8 btn bg-gradient-to-r from-[#874da2] to-[#c43a30]"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

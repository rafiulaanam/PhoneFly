import React from "react";
import toast from "react-hot-toast";

const ProductTable = ({ product, setMyProducts, refetch }) => {
  const handleAdvertise = () => {
    fetch(
      `https://phonefly-server-a-12-rafiulaanam.vercel.app/my-ads/${product._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("Advertisement Successfully");
          refetch();
        }
      });
  };
  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={product.img} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{product?.name}</div>
            <div className="text-sm opacity-50">{product?.category}</div>
          </div>
        </div>
      </td>
      <td>
        Sell Price: {product?.sale_price}
        <br />
        <span className="badge badge-ghost badge-sm">
          Marker price: $<del>{product?.price}</del>
        </span>
      </td>
      <td>{product?.status}</td>
      <th>
        {product?.ads === "RunAds" ? (
          <button
            onClick={() => handleAdvertise(product._id)}
            className=" btn-disabled  btn-sm text-white border-none px-8 btn bg-gradient-to-r from-[#442f4e] to-[#632a26]"
          >
            Running Advertisement
          </button>
        ) : (
          <button
            onClick={handleAdvertise}
            className="btn-sm text-white border-none px-8 btn bg-gradient-to-r from-[#874da2] to-[#c43a30]"
          >
            Make Advertise
          </button>
        )}
      </th>
      <th>
        <label
          onClick={() => setMyProducts(product)}
          htmlFor="edit-modal"
          className="  btn-sm text-white border-none px-8 btn bg-gradient-to-r from-[#874da2] to-[#c43a30]"
        >
          Edit Details
        </label>
      </th>
    </tr>
  );
};

export default ProductTable;

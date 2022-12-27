import React from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const AllSellers = () => {
  const url = `https://phonefly-server-a-12-rafiulaanam.vercel.app/users?role=Seller`;
  const { data: sellers = [], refetch } = useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      const res = await fetch(url);
      const data = res.json();
      return data;
    },
  });

  const handleUpdate = (id) => {
    fetch(`https://phonefly-server-a-12-rafiulaanam.vercel.app/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("Make Verified Successfully");
          refetch();
        }
      });
  };
  const handleDelete = (id) => {
    fetch(`https://phonefly-server-a-12-rafiulaanam.vercel.app/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((del) => {
        console.log(del);
        if (del.deletedCount > 0) {
          toast.success("Delete Successfully");
          refetch();
        }
      });
  };
  return (
    <div className="mx-5 my-10">
      <h2 className="text-5xl font-bold">All Sellers</h2>
      <div className="overflow-x-auto w-full  my-10">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Identify</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sellers &&
              sellers.map((seller) => (
                <tr key={seller._id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/mh-8-24-haircuts-1598305836.png?crop=0.502xw:1.00xh;0,0&resize=640:*"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{seller?.name}</div>
                        <div className="text-sm opacity-50">
                          {seller?.location}, Bangladesh
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {seller?.email}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {seller?.role}
                    </span>
                  </td>
                  <td>{seller?.identity}</td>
                  <th>
                    {seller.identity === "Verified" ? (
                      <button
                        onClick={() => handleUpdate(seller._id)}
                        className=" btn-disabled  btn-sm text-white border-none px-8 btn bg-gradient-to-r from-[#442f4e] to-[#632a26]"
                      >
                        Verified
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdate(seller._id)}
                        className="  btn-sm text-white border-none px-8 btn bg-gradient-to-r from-[#874da2] to-[#c43a30]"
                      >
                        Make Verified
                      </button>
                    )}
                  </th>
                  <th>
                    <button
                      onClick={() => handleDelete(seller._id)}
                      className="btn btn-error px-8 btn-sm"
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSellers;

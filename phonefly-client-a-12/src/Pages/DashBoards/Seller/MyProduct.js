import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import EditDetailsModal from "../../../Components/EditDetailsModal/EditDetailsModal";
import Spinner from "../../../Components/Spinner/Spinner";
import { AuthContext } from "../../../Context/AuthProvider";
import ProductTable from "./ProductTable";

const MyProduct = () => {
  const [myProducts, setMyProducts] = useState(null);
  const { user } = useContext(AuthContext);
  const url = `https://phonefly-server-a-12-rafiulaanam.vercel.app/my-products?email=${user?.email}`;
  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products", user?.email],
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
    <div>
      <div className="mx-5 my-10">
        <h2 className="text-5xl font-bold">My Products</h2>
        <div className="overflow-x-auto w-full  my-10">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Status</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <ProductTable
                    key={product._id}
                    product={product}
                    setMyProducts={setMyProducts}
                    refetch={refetch}
                  ></ProductTable>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {myProducts && (
        <EditDetailsModal
          modalInfo={myProducts}
          setMyProducts={setMyProducts}
          refetch={refetch}
        ></EditDetailsModal>
      )}
    </div>
  );
};

export default MyProduct;

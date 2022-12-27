import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../Components/Spinner/Spinner";

const CategoryArea = () => {
  const url = `https://phonefly-server-a-12-rafiulaanam.vercel.app/category`;

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["category"],
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
      <div className="container mx-auto my-20">
        <h1 className="text-3xl font-semibold">Category Area</h1>
        <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-6">
          {categories.map((category) => (
            <span key={category._id}>
              <Link to={category.link}>
                <div className="card  bg-base-200 shadow-xl mt-10 flex items-center">
                  <div className="card-body">
                    <img className="w-20" src={category.img} alt="" />
                    <p className="text-center mt-1">{category.name}</p>
                  </div>
                </div>
              </Link>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryArea;

import React from "react";
import Blog from "./Blog";
import { useQuery } from "@tanstack/react-query";

const Blogs = () => {
  const url = `https://phonefly-server-a-12-rafiulaanam.vercel.app/blogs`;

  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await fetch(url);
      const data = res.json();
      return data;
    },
  });

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Blog key={blog._id} blog={blog}></Blog>
        ))}
      </div>
    </div>
  );
};

export default Blogs;

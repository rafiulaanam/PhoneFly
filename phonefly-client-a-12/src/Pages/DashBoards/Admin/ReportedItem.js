import React from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const ReportedItem = () => {
  const url = `https://phonefly-server-a-12-rafiulaanam.vercel.app/reports`;
  const { data: reports = [], refetch } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const res = await fetch(url);
      const data = res.json();
      return data;
    },
  });

  const handleDelete = (id) => { 
    fetch(`https://phonefly-server-a-12-rafiulaanam.vercel.app/reports/${id}`, {
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
      <h2 className="text-5xl font-bold">Reported Items</h2>
      <div className="overflow-x-auto w-full  my-10">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Identity</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
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
                      <div className="font-bold">{report.name}</div>
                      <div className="text-sm opacity-50">
                        {report.location}, Bangladesh
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {report.email}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {report.role}
                  </span>
                </td>
                <td>{report.identity}</td>
                <th></th>
                <th>
                  <button
                    onClick={() => handleDelete(report._id)}
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

export default ReportedItem;

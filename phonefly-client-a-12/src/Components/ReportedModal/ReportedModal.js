import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthProvider";

const ReportedModal = ({ reportModalInfo, setReportModalInfo }) => {
  const { user } = useContext(AuthContext);
  const { _id } = reportModalInfo;
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const handleReport = (data) => {
    console.log(data);
    if (user) {
      fetch(
        `https://phonefly-server-a-12-rafiulaanam.vercel.app/reports/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((data) => {
          toast.success("Report Success");
          setReportModalInfo(null);
        })
        .catch((e) => console.log(e));
    } else {
      toast.error("Please Register");
      setReportModalInfo(null);
    }
  };
  return (
    <div>
      <input type="checkbox" id="report-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="report-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">Report this Product</h3>

          <form onSubmit={handleSubmit(handleReport)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Subject</span>
              </label>
              <input
                {...register("sub")}
                type="text"
                name="sub"
                placeholder="Subject"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                {...register("des")}
                type="text"
                name="des"
                className="textarea textarea-bordered"
                placeholder="Description"
              ></textarea>
            </div>
            <div className="modal-action">
              <input
                type="submit"
                className="text-white w-full border-none px-8 btn bg-gradient-to-r from-[#874da2] to-[#c43a30]"
                value="Submit"
              />
            </div>
          </form>
          {/* <div className="modal-action">
      <label htmlFor="report-modal" className="btn">Yay!</label>
    </div> */}
        </div>
      </div>
    </div>
  );
};

export default ReportedModal;

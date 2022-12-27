import React from "react";
import error from "../../Assets/img/error.jpg";
import PrimaryButton from "../Buttons/PrimaryButton";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-1/2">
        <img src={error} className="w-full" alt="error" />
        <Link to={"/"} className="flex justify-center">
          <PrimaryButton>
            Go to Home <BsArrowRight className="text-2xl ml-3"></BsArrowRight>
          </PrimaryButton>
        </Link>
      </div>
    </div>
  );
};

export default Error;

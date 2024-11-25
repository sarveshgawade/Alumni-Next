import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BaseLayout from "../Layouts/BaseLayout";
import { useSelector } from "react-redux";
import axiosInstance from "../Helpers/axiosInstance";
import toast from "react-hot-toast";

function ReferralDescription() {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // Access the Redux auth state
  const { data } = useSelector((state) => state?.auth);
  const email = data?.existingUser?.email;

  async function handleDelete() {
    try {
      const response = await axiosInstance.delete("/refer");

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        navigate(-1);
      }
    } catch (error) {
      toast.error("Failed to delete the job post.");
    }
  }

  // useEffect(() => {
  //   // console.log("Logged-in email:", email);
  // }, [email]);

  return (
    <BaseLayout>
      <div className="max-w-3xl mt-32 mb-32 mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">
          {state?.role} at {state?.companyName}
        </h1>
        <p className="text-gray-600 mb-6">
          <strong>Posted on:</strong>{" "}
          {new Date(state?.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Experience:</h2>
            <p className="text-gray-600">{state?.experience} years</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Skills:</h2>
            <p className="text-gray-600">{state?.skills.split(",").join(", ")}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Referred By:</h2>
            <p className="text-gray-600">
              {state?.referredByName} ({state?.referredByEmail})
            </p>
          </div>
        </div>
        <div className="mt-6 text-center">
          {email !== state?.referredByEmail ? (
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            >
              Apply Now
            </button>
          ) : (
            <button
              className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
              onClick={handleDelete}
            >
              Delete job post
            </button>
          )}
        </div>
      </div>
    </BaseLayout>
  );
}

export default ReferralDescription;

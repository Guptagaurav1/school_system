import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axiosInstance from "../../utils/axiosInstance";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  const studentInfo = async () => {
    try {
      const apiResult = await axiosInstance.post(`api/students/studentinfo/${id}`);
      setStudent(apiResult.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    studentInfo();
  }, []);



  return (
  
    

    <>
       <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 md:p-10">

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
          Student Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="flex justify-center md:justify-start">
            <img
              src="#"
              alt="Student Pic"
              className="w-40 h-40 rounded-xl object-cover shadow-md"
            />
          </div>

          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <p><span className="font-semibold">Name:</span> {student?.first_name} {student?.last_name}</p>
              <p><span className="font-semibold">Roll No:</span> {student?.roll_no}</p>
              <p><span className="font-semibold">Class:</span> {student?.classes?.class_name}</p>
              <p><span className="font-semibold">DOB:</span> {student?.dob}</p>
              <p><span className="font-semibold">Gender:</span> {student?.gender}</p>
              <p><span className="font-semibold">Section:</span> {student?.classes?.section}</p>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Academic Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-5 rounded-lg border">
            <p><span className="font-semibold">Admission No:</span> ADM-7894</p>
            <p><span className="font-semibold">Section:</span> A</p>
            <p><span className="font-semibold">Stream:</span> Science</p>
            <p><span className="font-semibold">Current Year:</span> 2024–25</p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Contact Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-5 rounded-lg border">
            <p><span className="font-semibold">Email:</span> {student?.email}</p>
            <p><span className="font-semibold">Phone:</span> {student?.phone}</p>
            <p className="sm:col-span-2">
              <span className="font-semibold">Address:</span> {student?.address}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Parent / Guardian Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-5 rounded-lg border">
            <p><span className="font-semibold">Father's Name:</span> Rajesh Gupta</p>
            <p><span className="font-semibold">Mother's Name:</span> Sunita Gupta</p>
            <p><span className="font-semibold">Parent Phone:</span> +91 91234 56789</p>
            <p><span className="font-semibold">Occupation:</span> Business</p>
          </div>
        </div>

      </div>
    </div>
    </>

  );
}

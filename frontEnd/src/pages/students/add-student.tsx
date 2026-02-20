import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import axiosInstance from "../../utils/axiosInstance";
import PageMeta from "../../components/common/PageMeta";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

interface ClassItem {
  id: number;
  className: string;
}

interface ApiItem {
  class_id: number;
  class_name: string;
}

export default function Blank() {
  const [classData, setClassData] = useState<ClassItem[]>([]);

  // Student Form State
  const [students, setStudents] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "Male",
    address: "",
    rollno: "",
    dob: "",
    classid: "",
  });

  const navigate=useNavigate();


  // Handle input fields
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setStudents((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


//   Reset Form
const resetForm = () => {
  setStudents({
    name: "",
    email: "",
    phone: "",
    gender: "Male",
    address: "",
    rollno: "",
    dob: "",
    classid: "",
  });
};


  // Handle select dropdowns
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setStudents((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form
  const addStudents = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const apiResult = await axiosInstance.post("api/students/create", {
        ...students,
        classid: students.classid,
      });
              alert(apiResult.data.message)
              navigate("/admin-dashboard/studentlist")


      resetForm();

    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  // Fetch class + section list

  const fetchClassList = async () => {
    try {
      const { data } = await axiosInstance.post("api/students/getList");

      const apiItems: ApiItem[] = data.data;

      // Extract unique classes
      const classList: ClassItem[] = [];
      const classMap: Record<number, boolean> = {};

      apiItems.forEach((item) => {
        if (!classMap[item.class_id]) {
          classMap[item.class_id] = true;
          classList.push({
            id: item.class_id,
            className: item.class_name,
          });
        }
      });

      setClassData(classList);

     
    } catch (error) {
      console.error("Failed to fetch class list:", error);
    }
  };

  useEffect(() => {
    fetchClassList();
  }, []);

  return (
    <div>
      <PageMeta
        title="React.js Blank Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <PageBreadcrumb pageTitle="Add Students" />

      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">

        <div className="mx-auto w-full max-w-[630px] text-center">
          <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            Add New Student
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
            Fill out the details below to add a new student to the class.
          </p>
        </div>

        {/* FORM START */}
        <form onSubmit={addStudents} className="mt-10 mx-auto w-full max-w-[630px] grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* First Name */}
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              name="name"
              value={students.name}
              onChange={handleInputChange}
              placeholder="Enter Name"
              className="w-full rounded-xl border px-4 py-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={students.email}
              onChange={handleInputChange}
              placeholder="student@example.com"
              className="w-full rounded-xl border px-4 py-2"
            />
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-medium mb-1">Date Of Birth</label>
            <input
              type="date"
              name="dob"
              value={students.dob}
              onChange={handleInputChange}
              className="w-full rounded-xl border px-4 py-2"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm font-medium mb-1">Contact Number</label>
            <input
              type="text"
              name="phone"
              value={students.phone}
              onChange={handleInputChange}
              placeholder="xxxxxxxxxxx"
              maxLength={10}
              className="w-full rounded-xl border px-4 py-2"
            />
          </div>

          {/* Class Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Class</label>
            <select
              name="classid"
              value={students.classid}
              onChange={handleSelectChange}
              className="w-full rounded-xl border px-4 py-2"
            >
              <option value="">Select Class</option>
              {classData.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.className}
                </option>
              ))}
            </select>
          </div>

        

          {/* Roll Number */}
          <div>
            <label className="block text-sm font-medium mb-1">Roll Number</label>
            <input
              type="text"
              name="rollno"
              value={students.rollno}
              onChange={handleInputChange}
              placeholder="Enter roll number"
              className="w-full rounded-xl border px-4 py-2"
            />
          </div>

          {/* Gender */}
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">Gender</label>

            <div className="flex items-center gap-6">
              {["Male", "Female", "Other"].map((g) => (
                <label key={g} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={students.gender === g}
                    onChange={handleInputChange}
                  />
                  <span>{g}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              rows={3}
              name="address"
              value={students.address}
              onChange={handleInputChange}
              placeholder="Enter full address"
              className="w-full rounded-xl border px-4 py-2"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-2 text-white font-medium hover:bg-blue-700"
            >
              Add Student
            </button>
          </div>
        </form>
        {/* FORM END */}
      </div>
    </div>
  );
}

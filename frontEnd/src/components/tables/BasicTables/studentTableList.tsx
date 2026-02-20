import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import axiosInstance from "../../../utils/axiosInstance";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import StudentDetails from "../../../pages/students/studentDetails";



interface Student {
  student_id: number;
  first_name: string;
  last_name: string;
  email: string;
  roll_no: string;
  dob: string;
  gender: string;
  phone: string;
  address: string;
  class_id: number;

  classes?: {
    class_id: number;
    class_name: string;
      section?: string;

  };
}

export default function BasicTableOne() {
  const [studentList, setStudentList] = useState<Student[]>([]);
  const navigate=useNavigate();

  const getStudentList = async () => {
    try {
      const apiResult = await axiosInstance.post("/api/students/studentList");
      console.log("API DATA:", apiResult);

      if (apiResult.data?.success) {
        setStudentList(apiResult.data.data);
      }
    } catch (error) {
      console.log("Error fetching class list:", error);
    }
  };



  useEffect(() => {
    getStudentList();
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500">
                S.No
              </TableCell>

              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500">
                First Name
              </TableCell>

              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500">
                Last Name
              </TableCell>

              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500">
                Class Name
              </TableCell>

              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500">
                Section
              </TableCell>

              <TableCell isHeader className="px-11 py-3 font-medium text-gray-500">
                Email
              </TableCell>

              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500">
                Roll No
              </TableCell>

              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500">
                Date Of Birth
              </TableCell>

              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500">
                Gender
              </TableCell>

              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500">
                Phone
              </TableCell>

              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500">
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {studentList.map((item, index) => (
              <TableRow key={item.student_id}>
                <TableCell className="px-4 py-3">{index + 1}</TableCell>

                <TableCell className="px-4 py-3">{item.first_name}</TableCell>

                <TableCell className="px-4 py-3">{item.last_name}</TableCell>

                <TableCell className="px-4 py-3">
                  {item.classes?.class_name ?? "-"}
                </TableCell>

                <TableCell className="px-4 py-3">{item.classes?.section ?? "-"}</TableCell>

                <TableCell className="px-4 py-3">{item.email}</TableCell>

                <TableCell className="px-4 py-3">{item.roll_no}</TableCell>

                <TableCell className="px-4 py-3">{item.dob}</TableCell>

                <TableCell className="px-4 py-3">{item.gender}</TableCell>

                <TableCell className="px-4 py-3">{item.phone}</TableCell>

                <TableCell className="px-4 py-3">
                  <button className="text-blue-600 hover:underline mr-4">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                  <button className="text-green-yellow hover:underline" onClick={()=>navigate(`/admin-dashboard/studentDetails/${item.student_id}`)}>
                    View
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

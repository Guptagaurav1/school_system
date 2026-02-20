import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import axiosInstance from "../../../utils/axiosInstance";
import { useState, useEffect } from "react";

export default function UserTable() {
  const [roleList, setRoleList] = useState([]);
  const getRolelist = async () => {
    try {
      const apiResult = await axiosInstance.post("/api/role/roleList");
      console.log("API DATA:", apiResult);

      if (apiResult.data?.success) {
        setRoleList(apiResult.data.data);
      }
    } catch (error) {
      console.log("Error fetching class list:", error);
    }
  };

  useEffect(() => {
    getRolelist();
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
              >
                S.No
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
              >
               Role Slug Name
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
              >
                Full Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {roleList.map((item, index) => (
              <TableRow key={item.role_id}>
                {/* S.No */}
                <TableCell className="px-4 py-3 text-gray-600 text-theme-sm">
                  {index + 1}
                </TableCell>

                {/* Class Name */}
                <TableCell className="px-4 py-3 text-gray-600 text-theme-sm">
                  {item.role_name}
                </TableCell>

                {/* Section */}
                <TableCell className="px-4 py-3 text-gray-600 text-theme-sm">
                  {item.full_name}
                </TableCell>


                {/* Actions */}
                <TableCell className="px-4 py-3 text-gray-600 text-theme-sm">
                  <button className="text-blue-600 hover:underline mr-4">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
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

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import axiosInstance from "../../../utils/axiosInstance";
import { useState, useEffect } from "react";

/* ---------------- TYPES ---------------- */

interface ClassItem {
  class_id: number;
  class_name: string;
  section: string;
}

interface BasicTableOneProps {
  refresh?: boolean; // optional so build won't fail
}

/* ---------------- COMPONENT ---------------- */

export default function BasicTableOne({ refresh }: BasicTableOneProps) {
  const [classList, setClassList] = useState<ClassItem[]>([]);

  const getClassList = async () => {
    try {
      const apiResult = await axiosInstance.post("/api/class/getlistData");

      if (apiResult.data?.success) {
        setClassList(apiResult.data.data);
      }
    } catch (error) {
      console.log("Error fetching class list:", error);
    }
  };

  useEffect(() => {
    getClassList();
  }, [refresh]);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                S.No
              </TableCell>

              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                Class Name
              </TableCell>

              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                Section
              </TableCell>

              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {classList.length === 0 ? (
              <TableRow>
                <TableCell className="px-4 py-6 text-center text-gray-500 col-span-4">
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              classList.map((item, index) => (
                <TableRow key={item.class_id}>
                  <TableCell className="px-4 py-3 text-gray-600 text-theme-sm">
                    {index + 1}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-600 text-theme-sm">
                    {item.class_name}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-600 text-theme-sm">
                    {item.section}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-600 text-theme-sm">
                    <button className="text-blue-600 hover:underline mr-4">
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

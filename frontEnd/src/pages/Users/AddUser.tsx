import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import axiosInstance from "../../utils/axiosInstance";
import PageMeta from "../../components/common/PageMeta";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

interface RoleItem {
  role_id: number;
  role_name: string;
}

export default function Adduser() {
  const navigate = useNavigate();

  const [RoleData, setRoleData] = useState<RoleItem[]>([]);

  const [user, setUser] = useState({
    Username: "",
    email: "",
    roleid: "",
  });

  // Handle Input
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Dropdown
  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset Form
  const resetForm = () => {
    setUser({
      Username: "",
      email: "",
      roleid: "",
    });
  };

  // Submit Form
  const addUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("api/user/createuser", {
        userName: user.Username,
        email: user.email,
        RoleId: user.roleid,
      });

      alert(response.data.message);
      resetForm();
      navigate("/admin-dashboard/user-list");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Fetch Role Data
  const fetchRoleData = async () => {
    try {
      const { data } = await axiosInstance.post("/api/role/roleList");

      setRoleData(data.data); // backend returns array of roles
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  };

  useEffect(() => {
    fetchRoleData();
  }, []);

  return (
    <div>
      <PageMeta title="Add New User" description="Create new system user" />
      <PageBreadcrumb pageTitle="Add User" />

      <div className="min-h-screen rounded-2xl border bg-white px-5 py-7">

        <form
          onSubmit={addUser}
          className="mx-auto mt-10 w-full max-w-[630px] grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Username */}
          <div>
            <label className="block mb-1">Username</label>
            <input
              type="text"
              name="Username"
              value={user.Username}
              onChange={handleInputChange}
              placeholder="Enter username"
              className="w-full rounded-xl border px-4 py-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              placeholder="email@example.com"
              className="w-full rounded-xl border px-4 py-2"
            />
          </div>

          {/* Role Dropdown */}
          <div className="col-span-2">
            <label className="block mb-1">Role</label>
            <select
              name="roleid"
              value={user.roleid}
              onChange={handleSelectChange}
              className="w-full rounded-xl border px-4 py-2"
            >
              <option value="">Select Role</option>

              {RoleData.map((role) => (
                <option key={role.role_id} value={role.role_id}>
                  {role.role_name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-2 text-white font-medium hover:bg-blue-700"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState, ChangeEvent, FormEvent } from "react";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { useAuth } from "../../context/Authcontext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";


interface LoginForm {
  email: string;
  password: string;
}

interface AdminLoginResponse {
  message: string;
  allAdmins: unknown;
  accessToken: string;
  refreshToken: string;
}

interface StudentLoginResponse {
  user: unknown;
  accessToken: string;
  refreshToken: string;
}

// ---------------- COMPONENT ----------------

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"admin" | "student">("admin");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  // Admin Form State
  const [adminForm, setAdminForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  // Student Form State
  const [studentForm, setStudentForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  // ---------------- HANDLERS ----------------

  const handleAdminChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAdminForm({ ...adminForm, [e.target.name]: e.target.value });
  };

  const handleStudentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
  };

  // ---------------- ADMIN LOGIN ----------------

  const handleAdminSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post<AdminLoginResponse>(
        "/api/authentication/login",
        adminForm
      );

      login(res.data.allAdmins, res.data.accessToken, res.data.refreshToken);

      alert(res.data.message);
      navigate("/admin-dashboard");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Admin login failed");
    }
  };

  // ---------------- STUDENT LOGIN ----------------

  const handleStudentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post<StudentLoginResponse>(
        "/api/studentAuth/studentLogin",
        studentForm
      );

      login(res.data.user, res.data.accessToken, res.data.refreshToken);

      navigate("/StudentDashboard");
    } catch (err: any) {
      console.log(err?.response?.data?.message || "Student login failed");
    }
  };

  // ---------------- UI ----------------

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">

        {/* Toggle */}
        <div className="flex mb-8 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("admin")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300 
              ${activeTab === "admin" ? "bg-white shadow text-brand-600" : "text-gray-500"}`}
          >
            Users Login
          </button>

          <button
            onClick={() => setActiveTab("student")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300 
              ${activeTab === "student" ? "bg-white shadow text-brand-600" : "text-gray-500"}`}
          >
            Student Login
          </button>
        </div>

        {/* ADMIN LOGIN */}
        {activeTab === "admin" && (
          <form onSubmit={handleAdminSubmit} className="space-y-6">
            <div>
              <Label>Email <span className="text-error-500">*</span></Label>
              <Input
                placeholder="info@gmail.com"
                name="email"
                value={adminForm.email}
                onChange={handleAdminChange}
              />
            </div>

            <div>
              <Label>Password <span className="text-error-500">*</span></Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  value={adminForm.password}
                  onChange={handleAdminChange}
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeIcon className="size-5 fill-gray-500" />
                  ) : (
                    <EyeCloseIcon className="size-5 fill-gray-500" />
                  )}
                </span>
              </div>
            </div>

            <Button className="w-full" size="sm" type="submit">
              Sign In
            </Button>
          </form>
        )}

        {/* STUDENT LOGIN */}
        {activeTab === "student" && (
          <form onSubmit={handleStudentSubmit} className="space-y-6">
            <div>
              <Label>Email <span className="text-error-500">*</span></Label>
              <Input
                placeholder="Enter Email"
                name="email"
                value={studentForm.email}
                onChange={handleStudentChange}
              />
            </div>

            <div>
              <Label>Password <span className="text-error-500">*</span></Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  value={studentForm.password}
                  onChange={handleStudentChange}
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeIcon className="size-5 fill-gray-500" />
                  ) : (
                    <EyeCloseIcon className="size-5 fill-gray-500" />
                  )}
                </span>
              </div>
            </div>

            <Button className="w-full" size="sm" type="submit">
              Sign In
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

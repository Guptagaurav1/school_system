import PageMeta from "../../components/common/PageMeta";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function StudentDashboard() {
  // ----- REAL DATA -----
  const attendanceTrend = [
    { day: "Mon", value: 88 },
    { day: "Tue", value: 91 },
    { day: "Wed", value: 92 },
    { day: "Thu", value: 89 },
    { day: "Fri", value: 95 },
  ];

  const classStrength = [
    { class: "6th", strength: 42 },
    { class: "7th", strength: 38 },
    { class: "8th", strength: 45 },
    { class: "9th", strength: 40 },
    { class: "10th", strength: 37 },
  ];

  const genderRatio = [
    { name: "Boys", value: 680 },
    { name: "Girls", value: 570 },
  ];

  const pieColors = ["#3b82f6", "#ec4899"];

  // ----- UI START -----
  return (
    <>
      <PageMeta title="Student Dashboard" description="Interactive Student Dashboard" />

      <div className="grid grid-cols-12 gap-6 p-4">

        {/* TOP METRIC CARDS */}
        
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="p-6 bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-2xl shadow-xl hover:scale-[1.03] transition">
            <h3 className="text-sm opacity-70">Total Students</h3>
            <p className="text-3xl font-bold mt-1">1,250</p>
            <p className="text-xs opacity-70 mt-2">+32 this month</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-emerald-600 to-emerald-500 text-white rounded-2xl shadow-xl hover:scale-[1.03] transition">
            <h3 className="text-sm opacity-70">Attendance Today</h3>
            <p className="text-3xl font-bold mt-1">92%</p>
            <p className="text-xs opacity-70 mt-2">+4% from yesterday</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-600 to-purple-500 text-white rounded-2xl shadow-xl hover:scale-[1.03] transition">
            <h3 className="text-sm opacity-70">Pending Fees</h3>
            <p className="text-3xl font-bold mt-1">₹3,40,000</p>
            <p className="text-xs opacity-70 mt-2">12 students overdue</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-rose-600 to-rose-500 text-white rounded-2xl shadow-xl hover:scale-[1.03] transition">
            <h3 className="text-sm opacity-70">New Admissions</h3>
            <p className="text-3xl font-bold mt-1">32</p>
            <p className="text-xs opacity-70 mt-2">This month</p>
          </div>
        </div>

        {/* ATTENDANCE LINE CHART */}
        <div className="col-span-12 xl:col-span-7 bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-lg font-semibold mb-4">Attendance Trend</h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[70, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* UPCOMING EVENTS */}
        <div className="col-span-12 xl:col-span-5 bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl flex justify-between hover:bg-gray-100">
              <div>
                <p className="font-medium">📅 Parent-Teacher Meeting</p>
                <p className="text-sm text-gray-500">25 Nov</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl flex justify-between hover:bg-gray-100">
              <div>
                <p className="font-medium">📘 Exam Week</p>
                <p className="text-sm text-gray-500">1 Dec</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl flex justify-between hover:bg-gray-100">
              <div>
                <p className="font-medium">🎉 Annual Function</p>
                <p className="text-sm text-gray-500">15 Dec</p>
              </div>
            </div>
          </div>
        </div>

        {/* CLASS STRENGTH BAR CHART */}
        <div className="col-span-12 bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-lg font-semibold mb-4">Class Strength Overview</h2>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classStrength}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="class" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="strength" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GENDER RATIO PIE CHART */}
        <div className="col-span-12 xl:col-span-6 bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-lg font-semibold mb-4">Gender Ratio</h2>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderRatio}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {genderRatio.map((entry, index) => (
                    <Cell key={index} fill={pieColors[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* LATEST ADMISSIONS TABLE */}
        <div className="col-span-12 xl:col-span-6 bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-lg font-semibold mb-4">Latest Admissions</h2>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="pb-3">Name</th>
                <th className="pb-3">Class</th>
                <th className="pb-3">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              <tr className="hover:bg-gray-50">
                <td className="py-3">Rohan Singh</td>
                <td>8th</td>
                <td>18 Nov</td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="py-3">Sana Sheikh</td>
                <td>6th</td>
                <td>17 Nov</td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="py-3">Arjun Rohilla</td>
                <td>9th</td>
                <td>16 Nov</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

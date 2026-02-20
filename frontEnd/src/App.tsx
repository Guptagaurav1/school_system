import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import ProtectedRoute from "./routes/adminProtectedRoutes";
import PublicRoute from "./routes/publicRoutes";
import AddClass from "./pages/master/add-class";
import AddStudents from "./pages/students/add-student";
import StudentList from "./pages/students/student-list";
import StudentDetails from "./pages/students/studentDetails";
import StudentAppLayout from "./studentLayouts/StudentLayoutsRender";
import StudentDashboard from "./pages/Student_Dashboard/Student_dashboard";
import Addrole from "./pages/master/add-role";
import UserList from "./pages/Users/UserList";
import AddUser from "./pages/Users/AddUser";

import TeacherAppLayout from "./TeacherLayouts/TeacherLayoutsRender";
import TeacherDasboard from "./pages/Student_Dashboard/Student_dashboard";



export default function App() {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<SignIn />} />
        </Route>
        {/* Public Route */}


        {/* Protected Routes */}
        <Route element={<ProtectedRoute  allowRoles={[1]}/>}>
          <Route element={<AppLayout />}>

            {/* Dashboard */}
            <Route path="admin-dashboard" element={<Home />} />

            {/* Others */}
            
            <Route path="profile" element={<UserProfiles />} />
            <Route path="/admin-dashboard/calendar" element={<Calendar />} />
            <Route path="/admin-dashboard/add-student" element={<AddStudents/>} />

            {/* Forms */}

            <Route path="form-elements" element={<FormElements />} />
            <Route path="/admin-dashboard/add-class" element={<AddClass/>}/>

            {/* Student Routes */}

            <Route path="/admin-dashboard/studentlist" element={<StudentList/>}/>
            <Route path="/admin-dashboard/studentDetails/:id" element={<StudentDetails/>}/>

            {/* Role Routes */}

            <Route path="/admin-dashboard/add-role" element={<Addrole/>}/>

            {/* User Routes */}

            <Route path="/admin-dashboard/user-list" element={<UserList/>}/>

            <Route path="/admin-dashboard/create-user" element={<AddUser/>}/>

            



           

            {/* Tables */}

            <Route path="basic-tables" element={<BasicTables />} />

            {/* UI Elements */}

            <Route path="alerts" element={<Alerts />} />
            <Route path="avatars" element={<Avatars />} />
            <Route path="badge" element={<Badges />} />
            <Route path="buttons" element={<Buttons />} />
            <Route path="images" element={<Images />} />
            <Route path="videos" element={<Videos />} />

            {/* Charts */}
            <Route path="line-chart" element={<LineChart />} />
            <Route path="bar-chart" element={<BarChart />} />
          </Route>
        </Route>

        {/* Student Dashboard Protected Routes */}

         <Route element={<ProtectedRoute allowRoles={[2]}/>}>
          <Route element={<StudentAppLayout />}>

            {/* Dashboard */}
            <Route path="StudentDashboard" element={<StudentDashboard/>} />

            {/* Others */}
            
            <Route path="profile" element={<UserProfiles />} />
           
            <Route path="basic-tables" element={<BasicTables />} /> 

           {/* Charts */}

            <Route path="line-chart" element={<LineChart />} />
            <Route path="bar-chart" element={<BarChart />} />
          </Route>
        </Route>


         <Route element={<ProtectedRoute allowRoles={[3]}/>}>
          <Route element={<TeacherAppLayout />}>

            {/* Dashboard */}
            <Route path="TeacherDashboard" element={<TeacherDasboard/>} />

            {/* Others */}
            
            
           
            <Route path="basic-tables" element={<BasicTables />} /> 

           {/* Charts */}

            <Route path="line-chart" element={<LineChart />} />
            <Route path="bar-chart" element={<BarChart />} />
          </Route>
        </Route>


        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>

    </Router>
  );
}

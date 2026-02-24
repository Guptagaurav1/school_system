import { BrowserRouter as Router, Routes, Route } from "react-router";
// Import Lazy Loading
import { lazy, Suspense } from "react";
const SignIn = lazy(() => import("./pages/AuthPages/SignIn"));  
const NotFound = lazy(() => import("./pages/OtherPage/NotFound"));
const UserProfiles = lazy(() => import("./pages/UserProfiles"));
const Videos = lazy(() => import("./pages/UiElements/Videos"));
const Images = lazy(() => import("./pages/UiElements/Images"));
const Alerts = lazy(() => import("./pages/UiElements/Alerts"));
const Badges = lazy(() => import("./pages/UiElements/Badges"));
const Avatars = lazy(() => import("./pages/UiElements/Avatars"));
const Buttons = lazy(() => import("./pages/UiElements/Buttons"));
  const LineChart = lazy(() => import("./pages/Charts/LineChart"));
const BarChart = lazy(() => import("./pages/Charts/BarChart"));
const AppLayout = lazy(() => import("./layout/AppLayout"));
const ScrollToTop = lazy(() => import("./components/common/ScrollToTop").then(module => ({ default: module.ScrollToTop })));
const Home = lazy(() => import("./pages/Dashboard/Home"));
const ProtectedRoute = lazy(() => import("./routes/adminProtectedRoutes"));
const PublicRoute = lazy(() => import("./routes/publicRoutes"));
const AddClass = lazy(() => import("./pages/master/add-class"));
const AddStudents = lazy(() => import("./pages/students/add-student"));
const StudentList = lazy(() => import("./pages/students/student-list"));
const StudentDetails = lazy(() => import("./pages/students/studentDetails"));
const StudentAppLayout = lazy(() => import("./studentLayouts/StudentLayoutsRender"));
const StudentDashboard = lazy(() => import("./pages/Student_Dashboard/Student_dashboard"));
const Addrole = lazy(() => import("./pages/master/add-role"));
const UserList = lazy(() => import("./pages/Users/UserList"));
const AddUser = lazy(() => import("./pages/Users/AddUser"));

const TeacherAppLayout = lazy(() => import("./TeacherLayouts/TeacherLayoutsRender"));
const TeacherDasboard = lazy(() => import("./pages/Student_Dashboard/Student_dashboard"));
const Calendar = lazy(() => import("./pages/Calendar"));
const FormElements = lazy(() => import("./pages/Forms/FormElements"));
const BasicTables = lazy(() => import("./pages/Tables/BasicTables"));
import Loader from "./components/loader/loader";



export default function App() {
  return (
    <Router>
      <Suspense fallback={
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
          <Loader />
        </div>
      }>
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
      </Suspense>
    </Router>
  );
}

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import SignIn from "./pages/Authentication/SignIn";
import Role from "./pages/Authentication/Role";
import SignUp from "./pages/Authentication/SignUp.jsx";
import Pricing from "./pages/Authentication/Pricing";
import Teacher from "./pages/Authentication/Teacherreg.jsx";
import Teachersubject from "./pages/Authentication/Subjectteacher.jsx";
import Chooseschool from "./pages/Authentication/Techchooseschool.jsx";
import Schoolcode from "./pages/Authentication/Schoolcode.jsx";
import Selectclass from "./pages/Authentication/Selectclass.jsx";
import Classteacher from "./pages/Authentication/Classteacher.jsx";
import School from "./pages/Authentication/Schoolreg.jsx";
import TeacherLogin from "./pages/Authentication/TeacherLogin.jsx";
import SchoolLogin from "./pages/Authentication/SchoolLogin.jsx";


import Teacheracademics from "./pages/Techerdashboard/Techeracademics.jsx";
import Studentsdata from "./pages/Techerdashboard/Studentsdata.jsx";
import Managestud from "./pages/Techerdashboard/Managestud.jsx";
import Addassignment from "./pages/Techerdashboard/Assignment.jsx";
import AddExam from "./pages/Techerdashboard/Postexam.jsx";
import Training from "./pages/Techerdashboard/Training.jsx";
import AcademicCard from "./pages/Techerdashboard/AcademicCard.jsx"
import TeacherExamCard from "./pages/Techerdashboard/ExamCard.jsx"

import DefaultLayout from "./layout/DefaultLayout";
import Home from "./pages/Dashboard/Home.jsx";
import Subscription from "./pages/Dashboard/PricingSection.jsx";
import Academics from "./pages/Dashboard/Academics.jsx";
import Career from "./pages/Dashboard/Careerchhose.jsx";
import Notices from "./pages/Dashboard/Notics.jsx";
import Editstud from "./pages/Dashboard/Editstud.jsx";

import TecherLayout from "./layout/TeacherLayout.jsx";
import Teacherdashboards from "./pages/Techerdashboard/teacherdashborad.jsx";
import Syallabus from "./pages/Techerdashboard/Syllabus.jsx"
import TeacherCareer from "./pages/Techerdashboard/TeacherCareer.jsx"
import TeacherNotice from "./pages/Techerdashboard/TeacherNotice.jsx"
import AttendanceTeacher from "./pages/Techerdashboard/AttendanceTeacher.jsx"
import Syllabusupdate from "./pages/Techerdashboard/Syallabusupdate.jsx";

import SchoolLayout from "./layout/Schoolayout.jsx";
import Schoolhome from "./pages/Schooldashboard/Home.jsx";
import Academicsschool from "./pages/Schooldashboard/Academics.jsx";
import Allstudent from "./pages/Schooldashboard/Allstudent.jsx";
import AllTeacher from "./pages/Schooldashboard/AllTeachers.jsx";
import Noticeschool from "./pages/Schooldashboard/Notice.jsx";
import Manageteacher from "./pages/Schooldashboard/Manageteacher.jsx";
import DetailedAssignment from "./pages/Dashboard/DetailedAssignment.jsx";
import SubmitAssignment from "./pages/Dashboard/SubmitAssignment.jsx"
import ExamCard from "./pages/Dashboard/Examcard.jsx";
import Assignments from "./pages/Dashboard/Assignments.jsx";
import Techerrevie from "./pages/Dashboard/Techerrevie.jsx"
import Syllabus from "./pages/Dashboard/Syllabus.jsx";
import ExamPerformance from "./pages/Dashboard/ExamPerformance.jsx";
import ReviewPage from "./pages/Dashboard/ReviewPage.jsx";
import SyllabusCard from "./pages/Dashboard/SyllabusCard.jsx";
import ExamComp from "./pages/Dashboard/ExamComp.jsx"
import AssignmentList from "./pages/Techerdashboard/Assignmentlist.jsx";
import Noticeform from './pages/Schooldashboard/Noticeform.jsx';
import SchoolAssignmentList from "./pages/Schooldashboard/SchoolAssignmentList.jsx"
import AddSchoolassignment from "./pages/Schooldashboard/AddSchoolassignment.jsx"
import SchoolExamCard from "./pages/Schooldashboard/SchoolExamCard.jsx"
import SchoolAddExam from "./pages/Schooldashboard/SchoolAddExam.jsx"
import StudentManage from "./pages/Schooldashboard/StudentManage.jsx"
import HelpSection from "./pages/Schooldashboard/Help.jsx"
import Attendance from './pages/Dashboard/Studenceattendence.jsx'
import Admin from './layout/AdminLayout.jsx';
import Adminhome from './pages/Admindashboard/Admindashboard/Home.jsx';
import Adminschool from './pages/Admindashboard/Admindashboard/Schoolss.jsx'
import Manageschools from './pages/Admindashboard/Admindashboard/Manageschools.jsx';
import Admincareer from './pages/Admindashboard/Admindashboard/Admincareer.jsx'
import Addcareerform from './pages/Admindashboard/Admindashboard/Addcareerform.jsx'
import AdminTraining from './pages/Admindashboard/Admindashboard/Admintraining.jsx'
import Traingforming from './pages/Admindashboard/Admindashboard/Admintrainingform.jsx';
import AdminNotices from './pages/Admindashboard/Admindashboard/Adminnotice.jsx';
import Addnotice from './pages/Admindashboard/Admindashboard/AddNotice.jsx';

import AdminSubscription from './pages/Admindashboard/Admindashboard/Subscriptions.jsx';
// import FinanceReport from './pages/Admindashboard/Admindashboard/Finance.jsx';

// import Earningfromschool from './pages/Admindashboard/Admindashboard/earningfromschool.jsx';
import AllAttendance from './pages/Schooldashboard/AllAttendance.jsx'
import Reviewteacher from './pages/Dashboard/Reviewtoteacher.jsx'
import { ApiDataProvider } from '../src/src/Components/Context/schoolData.jsx';
import SchoolRegistration from "./pages/Authentication/Schoolreg.jsx";
import AdminSchoolRegistration from "./pages/Admindashboard/Schoolregi.jsx"
import SchoolTraniing from "./pages/Schooldashboard/schoolTraning.jsx";
import SchoolCareer from "./pages/Schooldashboard/SchoolCareer.jsx"
import EditStudent from "./pages/Schooldashboard/EditStudentData.jsx";
import SyllabusCreate from "./pages/Techerdashboard/SyllabusCreate.jsx";
import Homepage from "./pages/Authentication/Homepage.jsx";
import AdminLogin from "./pages/Admindashboard/Admindashboard/AdminLogin.jsx";
import AdminschoolDetails from "./pages/Admindashboard/Admindashboard/AdminschoolDetails.jsx"
import Subscriptions from "./pages/Admindashboard/Admindashboard/Subscriptions.jsx"
import Settings from "./pages/Admindashboard/Admindashboard/Settings.jsx"
import SupportPage from "./pages/Admindashboard/Admindashboard/Support.jsx"
import SchoolSyllabus from "./pages/Schooldashboard/Syllabus.jsx"





// Create a theme using MUI's createTheme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Customize the primary color
    },
    secondary: {
      main: "#dc004e", // Customize the secondary color
    },

  },
  typography: {

    fontFamily: ["Poppins"], // Specify your desired font family

  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />

      <Router>
        <ApiDataProvider>
          <div>

            <Routes>

              <Route
                path="/*"
                element={
                  <Role />
                }
              />

              <Route
                path="/auth/*"
                element={
                  <Routes>
                    <Route path="school-login" element={<SchoolLogin />} />
                    <Route path="homepage" element={<Homepage />} />
                    <Route path="student-login" element={<SignIn />} />
                    <Route path="role" element={<Role />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="pricing" element={<Pricing />} />
                    <Route path="teacher" element={<Teacher />} />
                    <Route path="techsubject" element={<Teachersubject />} />
                    <Route path="chooseschool" element={<Chooseschool />} />
                    <Route path="schoolcode" element={<Schoolcode />} />
                    <Route path="selectclass" element={<Selectclass />} />
                    <Route path="classhead" element={<Classteacher />} />
                    <Route path="school" element={<School />} />

                    <Route path="teacher-login" element={<TeacherLogin />} />
                    <Route path="adminlogin" element={<AdminLogin />} />
                    <Route path="/" element={<Navigate to="/auth/signin" />} />
                  </Routes>
                }
              />

              <Route
                path="/app/*"
                element={
                  <DefaultLayout>
                    <Routes>
                      <Route path="home" element={<Home />} />
                      <Route path="pricing" element={<Subscription />} />
                      <Route path="academics" element={<Academics />} />
                      <Route path="studettendence" element={<Attendance />} />
                      <Route path="academics/exams" element={<ExamPerformance></ExamPerformance>} />
                      <Route path="academics/exams/examdetail" element={<ExamComp></ExamComp>} />
                      <Route path="academics/assignment" element={<Assignments></Assignments>} />
                      <Route path="academics/review" element={<Techerrevie></Techerrevie>} />
                      <Route path="academics/syllabus" element={<Syllabus></Syllabus>} />
                      <Route path="/academics/syllabus/:id" element={<SyllabusCard />} />
                      <Route path="academics/review/:id" element={<ReviewPage></ReviewPage>} />
                      <Route path="career" element={<Career />} />
                      <Route path="notice" element={<Notices />} />
                      <Route path="editstud" element={<Editstud />} />
                      <Route path="reviewteacher" element={<Reviewteacher />} />

                      <Route path="/assignment/:id" element={<DetailedAssignment />} />
                      <Route path="/assignment/submit" element={<SubmitAssignment></SubmitAssignment>} />
                      <Route path="*" element={<Navigate to="/app" />} />
                    </Routes>
                  </DefaultLayout>
                }
              />

              {/* Teacher Routes */}
              <Route
                path="/teacher/*"
                element={
                  <TecherLayout>
                    <Routes>
                      <Route path="home" element={<Teacherdashboards />} />
                      <Route path="academics" element={<AcademicCard />} />
                      <Route path="academics/exam" element={<TeacherExamCard />} />
                      <Route path="academics/assignment" element={<AssignmentList></AssignmentList>} />
                      <Route path="academics/assignment/create" element={<Addassignment />} />
                      <Route path="academics/exam/create" element={<AddExam />} />
                      <Route path="studentsdata" element={<Studentsdata />} />
                      <Route path="notice" element={<TeacherNotice />} />
                      <Route path="career" element={<TeacherCareer />} />
                      <Route path="academics/syllabus" element={<Syallabus />} />
                      <Route path="academics/syllabus/create" element={<SyllabusCreate />} />
                      <Route path="/academics/syllabus/:id" element={<Syllabusupdate />} />
                      <Route path="training" element={<Training />} />
                      <Route path="attendance" element={<AttendanceTeacher />} />
                      <Route path="managestud/:studentId" element={<Managestud />} />
                      <Route path="*" element={<Navigate to="/teacher" />} />
                    </Routes>
                  </TecherLayout>
                }
              />

              <Route
                path="/school/*"
                element={
                  <SchoolLayout>
                    <Routes>
                      <Route path="home" element={<Schoolhome />} />
                      <Route path="academicschool" element={<Academicsschool />}/>
                      <Route path="academicschool/exam" element={<SchoolExamCard />} />
                      <Route path="academicschool/exam/create" element={<SchoolAddExam />} />
                      <Route path="academicschool/assignment" element={<SchoolAssignmentList></SchoolAssignmentList>} />
                      <Route path="academicschool/assignment/create" element={<AddSchoolassignment />} />
                      <Route path="studentsdata" element={<Allstudent />} />
                      <Route path="studentsdata/:id" element={<EditStudent />} />
                      <Route path="allattendenec" element={<AllAttendance />} />
                      <Route path="academicschool/syllabus" element={<SchoolSyllabus />} />
                      <Route path="academicschool/syllabus/create" element={<SyllabusCreate />} />
                      <Route path="academicschool/syllabus/:id" element={<SyllabusCard />} />
                      <Route path="Techerdata" element={<AllTeacher />} />
                      <Route path="career" element={<SchoolCareer />} />
                      <Route path="notice" element={<Noticeschool />} />
                      <Route path="traning" element={<SchoolTraniing />} />
                      <Route path="manageteacher" element={<Manageteacher />} />
                      <Route path="help" element={<HelpSection />} />
                      <Route path="*" element={<Navigate to="/school" />} />
                    </Routes>
                  </SchoolLayout>
                }
              />

              <Route path="/admin/*" element={
                <Admin>
                  <Routes>
                    <Route path="home" element={<Adminhome />} />
                    <Route path="schoolreg" element={<AdminSchoolRegistration />} />
                    <Route path="schools" element={<><Adminschool /></>} />
                    <Route path="schools/details" element={<><AdminschoolDetails /></>} />
                    <Route path="career" element={<><Admincareer /></>} />
                    <Route path="training" element={<><AdminTraining /></>} />
                    <Route path="subscriptions" element={<><Subscriptions /></>} />
                    <Route path="notice" element={<><AdminNotices /></>} />
                    <Route path="settings" element={<><Settings /></>} />
                    <Route path="support" element={<><SupportPage /></>} />
                    <Route path="*" element={<Navigate to="/admin/home" />} />
                  </Routes>
                </Admin>

              } />
            </Routes>

          </div>
        </ApiDataProvider>
      </Router>

      <ToastContainer
        hideProgressBar={true}
        position="top-right"
        autoClose={3000}
        toastClassName={() => "custom-toast"}
      />

    </ThemeProvider>
  );
}

export default App;

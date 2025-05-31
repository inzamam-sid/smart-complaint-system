import { Routes, Route, Navigate } from 'react-router-dom';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Landing/Home';
import LoginForm from './components/Auth/LoginForm';
import SignUp from './components/Auth/SignUp';
import StudentDashboard from './components/Student/Student Page/StudentDashboard';
import NewComplaint from './components/Student/Complaints/NewComplaint';





function App() {
  return (
    <>
   <Navbar />
      

      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Login Page */}
        <Route path="/loginform" element={<LoginForm />} />

        {/* Register Page */}
        <Route path="/signup" element={<SignUp />} />

        <Route path="/studentdashboard" element={<StudentDashboard/>} />

        <Route path="/student/new-complaint" element={<NewComplaint />} />

        

        
      </Routes>

       <Footer />
</>
  );
}

export default App;

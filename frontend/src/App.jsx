//  import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
//import Navbar from './components/Navbar';

// function App() {
//   return (
//     <>
//       <Navbar role="student" />
//       <div className="p-4">
//         <h1 className="text-3xl font-bold">Welcome to Smart Complaint System</h1>
//         <h2>Hello guyz you know what time it is ?</h2>
//       </div>
//     </>
//   );
// }

//export default App


// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import RoleSelection from "./components/RoleSelection";
// import StudentAuth from "./components/StudentAuth";
// import FacultyAuth from "./components/FacultyAuth";

// import Dashboard from "./components/Dashboard";
// import SubmitComplaint from "./components/SubmitComplaint";





// ✅ CORRECT
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RoleSelection from "./components/RoleSelection";
import StudentAuth from "./components/StudentAuth";
import FacultyAuth from "./components/FacultyAuth";

import RoleChoice from './components/RoleChoice';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

<Routes>
  <Route path="/" element={<RoleSelection />} />
  <Route path="/auth" element={<RoleChoice />} />
  <Route path="/signin/:role" element={<SignIn />} />
  <Route path="/signup" element={<SignUp />} />
  <Route path="/student-auth" element={<StudentAuth />} />
  <Route path="/faculty-auth" element={<FacultyAuth />} />
</Routes>



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/student-auth" element={<StudentAuth />} />
        <Route path="/faculty-auth" element={<FacultyAuth />} />
      </Routes>
    </>
  );
}

export default App;


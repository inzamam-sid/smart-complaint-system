
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import AdminDashboard from './components/AdminDashboard/Admindashboard';
import ComplainList from './pages/complainList';

function App() {
  return (
    <>
      <Navbar role="student" />
      
      <Routes>
        {/* Home Page */}
        {/* <Route path="/" element={<Landingpage />} /> */}

        {/* Login Page */}
        {/* <Route path="/login" element={<Login />} /> */}

        {/* Signup Page */}
        {/* <Route path="/signup" element={<Signup />} /> */}
      
        {/* Complain List Page */} 
        <Route path="/complain-list" element={<ComplainList />} />

        {/* Admin Dashboard Page */}
        <Route path="/admindashboard" element={<AdminDashboard />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;



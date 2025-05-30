import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";



const Protected = ({ requireAdmin = false}) => {
    // const navigate = useNavigate();
    const user  = useSelector((store) => store.user);

    // Check if user is logged in
    if(!user) {
        // Redirect to login page if not logged in
        return <Navigate to="/loginform" replace /> // Prevent rendering the component
    }
    // Check if admin access is required and user is not an admin
    if (requireAdmin && user.role !== "admin") {
    return <navigate to="/" replace />;
  }

  return <Outlet/> // Render the protected component if user is logged in)
}

export default Protected
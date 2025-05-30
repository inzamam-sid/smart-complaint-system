import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { removeUser } from "../utils/UserSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className=" mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          🛠️ Smart Complaint
        </Link>

        {/* Navigation + Buttons */}
        <div className="flex items-center gap-10">
          <Link
            to="/"
            className="text-black font-semibold hover:text-blue-500 transition duration-300"
          >
            Home
          </Link>

          <button
            className="text-black font-semibold hover:text-blue-500 transition duration-300"
            onClick={() =>
              location.pathname !== "/"
                ? navigate("/", { state: { scrollTo: "about" } })
                : scrollToSection("about")
            }
          >
            About Us
          </button>

          {/* If logged in */}
          {user ? (
            <>
              <div className="flex items-center gap-2">
                {user.photoUrl && (
                  <img
                    src={user.photoUrl}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span className="text-sm font-semibold text-gray-700">
                  Welcome, {user.firstName}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md border border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Show login and conditionally sign up if not on login page */}
              <Link to="/LoginForm">
                <button className="px-5 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                  Login
                </button>
              </Link>
              {location.pathname !== "/LoginForm" && (
                <Link to="/signup">
                  <button className="px-5 py-2 rounded-md border border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition">
                    Sign Up
                  </button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

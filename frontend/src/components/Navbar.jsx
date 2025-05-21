import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Navigation links for different roles
  const studentLinks = [
    { name: 'Dashboard', to: '/student/dashboard' },
    { name: 'Submit Complaint', to: '/student/complaint' },
  ];

  const adminLinks = [
    { name: 'Admin Dashboard', to: '/admin/dashboard' },
    { name: 'Manage Complaints', to: '/admin/complaints' },
  ];

  const links = role === 'admin' ? adminLinks : studentLinks;

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          🛠️ Smart Complaint
        </Link>

        {/* Toggle button (mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700"
        >
          ☰
        </button>
        

        {/* Nav Links */}
        <ul className={`md:flex md:items-center gap-6 ${isOpen ? 'block' : 'hidden'} md:block`}>
          {links.map((link) => (
            <li key={link.name}>
              <Link to={link.to} className="text-gray-700 hover:text-blue-600 font-medium">
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

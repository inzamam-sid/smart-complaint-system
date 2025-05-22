 import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const FooterSection = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* Left: Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold mb-2">🛠️ Smart Complaint</h2>
          <p className="text-gray-400 text-sm">
            A secure platform for campus issue resolution and complaint management.
          </p>
        </div>

        {/* Middle: Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/login" className="hover:text-white transition">Login</a></li>
            <li><a href="/signup" className="hover:text-white transition">Sign Up</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Right: Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 text-gray-300">
            <a href="#" className="hover:text-white transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Complaint Management System. All rights reserved.</p>
        <p className="mt-1">Crafted with 💙 for students and admins.</p>
      </div>
    </footer>
  );
};

export default FooterSection;


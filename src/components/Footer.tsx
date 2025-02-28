import { Sparkles } from "lucide-react";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full py-6 mt-20 bg-gray-100">
      <div className="flex flex-col items-center w-full max-w-screen-xl gap-4 px-6 mx-auto text-center md:flex-row md:justify-between">
        {/* Logo and Branding */}
        <div className="flex items-center space-x-3">
          <Sparkles className="w-6 h-6" />
          <span className="text-lg font-semibold text-gray-700">GlowGuide</span>
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center space-x-4">
          <FaFacebook
            size={22}
            className="text-gray-600 transition hover:text-blue-700"
          />
          <FaInstagram
            size={22}
            className="text-gray-600 transition hover:text-pink-600"
          />
          <FaTwitter
            size={22}
            className="text-gray-600 transition hover:text-cyan-500"
          />
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500 md:text-right">
          © 2025 GlowGuide. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

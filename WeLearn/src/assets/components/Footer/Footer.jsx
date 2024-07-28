import { FaLinkedin, FaSquareInstagram, FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-6 mt-auto w-full">
      <div className="container mx-auto text-center">
        <p className="text-lg">
          &copy; 2024 lookSkill. All rights reserved. Made by <span className="font-bold">Visvess</span>
        </p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="https://www.linkedin.com/in/visvesswaram" className="hover:text-gray-300 flex items-center space-x-2">
            <FaLinkedin />
            <span>LinkedIn</span>
          </a>
          <a href="https://www.instagram.com/" className="hover:text-gray-300 flex items-center space-x-2">
            <FaSquareInstagram />
            <span>Instagram</span>
          </a>
          <a href="https://twitter.com/" className="hover:text-gray-300 flex items-center space-x-2">
            <FaTwitter />
            <span>Twitter</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

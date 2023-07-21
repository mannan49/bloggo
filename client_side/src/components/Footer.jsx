import React from "react";
import {
  FaYoutube,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-950 py-6">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <p className="text-white text-sm">
            All Rights Reserved &copy; Manan Nasir 2023
          </p>
        </div>
        <div className="flex justify-center">
          <a href="https://www.youtube.com" target="blank">
            <FaYoutube className="text-white mx-2 text-2xl hover:text-gray-400" />
          </a>
          <a href="https://www.twitter.com" target="blank">
            <FaTwitter className="text-white mx-2 text-2xl hover:text-gray-400" />
          </a>
          <a href="https://www.facebook.com" target="blank">
            <FaFacebook className="text-white mx-2 text-2xl hover:text-gray-400" />
          </a>
          <a href="https://www.linkedin.com" target="blank">
            <FaLinkedin className="text-white mx-2 text-2xl hover:text-gray-400" />
          </a>
          <a href="https://www.github.com" target="blank">
            <FaGithub className="text-white mx-2 text-2xl hover:text-gray-400" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

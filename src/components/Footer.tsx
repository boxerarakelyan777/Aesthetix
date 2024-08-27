import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-900 text-white p-4 sm:p-6 mt-auto w-full">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-yellow-400">LookMate</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-yellow-400">Follow us</h2>
              <ul className="text-gray-300">
                <li className="mb-4">
                  <a href="https://github.com/yourgithubprofile" className="hover:text-yellow-400 transition-colors duration-300">GitHub</a>
                </li>
                <li>
                  <a href="https://www.tiktok.com/@yourtiktokprofile" className="hover:text-yellow-400 transition-colors duration-300">TikTok</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-yellow-400">Legal</h2>
              <ul className="text-gray-300">
                <li className="mb-4">
                  <a href="/privacy-policy" className="hover:text-yellow-400 transition-colors duration-300">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-yellow-400 transition-colors duration-300">Terms & Conditions</a>
                </li>
              </ul> 
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-600 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-300 sm:text-center">
            © 2024 <a href="/" className="hover:text-yellow-400 transition-colors duration-300">LookMate™</a>. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

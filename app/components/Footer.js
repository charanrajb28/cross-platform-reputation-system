// app/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <p>&copy; 2025 John Doe</p>
      <div>
        <a href="https://linkedin.com" className="btn btn-outline-light btn-sm mx-2">LinkedIn</a>
        <a href="https://github.com" className="btn btn-outline-light btn-sm mx-2">GitHub</a>
      </div>
    </footer>
  );
};

export default Footer;

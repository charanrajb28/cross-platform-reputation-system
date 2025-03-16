// app/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="bg-primary text-white text-center py-5">
      <h1 className="display-4">John Doe</h1>
      <p className="lead">Blockchain Developer | Decentralized Identity Enthusiast</p>
      <a href="#contact" className="btn btn-light btn-lg">Contact Me</a>
    </header>
  );
};

export default Header;

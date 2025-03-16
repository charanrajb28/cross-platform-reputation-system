// app/components/Experience.js
import React from 'react';

const Experience = () => {
  return (
    <section id="experience" className="container my-5">
      <h2 className="text-center">Experience</h2>
      <div className="list-group">
        <div className="list-group-item">
          <h5>Blockchain Developer at XYZ Corp</h5>
          <p>Jan 2023 - Present</p>
          <p>Worked on building decentralized applications with cross-chain messaging functionality.</p>
        </div>
        <div className="list-group-item">
          <h5>Smart Contract Developer at ABC Ltd</h5>
          <p>July 2021 - Dec 2022</p>
          <p>Developed and deployed smart contracts on Ethereum and Solana for various use cases.</p>
        </div>
        {/* Add more experience entries */}
      </div>
    </section>
  );
};

export default Experience;

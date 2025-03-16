// app/components/Skills.js
import React from 'react';

const Skills = () => {
  return (
    <section id="skills" className="container my-5">
      <h2 className="text-center">Skills</h2>
      <ul className="list-group">
        <li className="list-group-item">Blockchain Development (Ethereum, Solana, ZetaChain)</li>
        <li className="list-group-item">Smart Contracts (Solidity, Rust)</li>
        <li className="list-group-item">Web3 Integration (Web3.js, Ethers.js)</li>
        <li className="list-group-item">Cross-Chain Messaging</li>
        <li className="list-group-item">Identity Verification (Self Protocol, Soulbound NFTs)</li>
      </ul>
    </section>
  );
};

export default Skills;

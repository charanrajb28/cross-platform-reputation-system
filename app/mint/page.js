"use client";
import React, { useState } from "react";
import { getContract } from "@/utils/web3";

export default function Mint() {
  const [wallet, setWallet] = useState("");
  const [metadataURI, setMetadataURI] = useState("");
  const [status, setStatus] = useState("");

  async function mintSBT() {
    setStatus("Minting...");
    try {
      const contract = await getContract();
      const tx = await contract.mintSBT(wallet, metadataURI);
      await tx.wait();
      setStatus("SBT Minted Successfully!");
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="fw-bold">Mint Soulbound Token (SBT)</h2>
      <div className="mb-3">
        <label>Wallet Address</label>
        <input
          type="text"
          className="form-control"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Metadata URI</label>
        <input
          type="text"
          className="form-control"
          value={metadataURI}
          onChange={(e) => setMetadataURI(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={mintSBT}>
        Mint SBT
      </button>
      {status && <p className="mt-3">{status}</p>}
    </div>
  );
}

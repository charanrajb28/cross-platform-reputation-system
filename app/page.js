"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { connectWallet } from "@/utils/web3";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
  const router = useRouter();
  const [account, setAccount] = useState("");

  useEffect(() => {
    async function fetchWallet() {
      const wallet = await connectWallet();
      if (wallet) setAccount(wallet);
    }
    fetchWallet();
  }, []);

  const sections = [
    { title: "Projects", color: "#87CEEB", type: "projects" },
    { title: "Skills", color: "#FFB6C1", type: "skills" },
    { title: "Contributions", color: "#90EE90", type: "contributions" },
    { title: "Work Experience", color: "#D3D3D3", type: "work-experience" },
  ];

  return (
    <div className="container mt-5">
      {/* Profile Section */}
      <div className="card shadow-lg text-center p-5 mb-5 border-0 rounded-4">
        <img src="https://via.placeholder.com/150" alt="Profile" className="rounded-circle mb-3" width={120} />
        <h2 className="fw-bold">John Doe</h2>
        <p className="text-muted fs-5">Blockchain Developer</p>
        <p className="text-muted">Wallet: {account || "Not Connected"}</p>
      </div>

      {/* Row Layout - 4 Columns */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
        {sections.map((section, index) => (
          <div className="col" key={index}>
            <div
              className="card shadow-lg text-center p-5 border-0 rounded-4"
              style={{
                backgroundColor: section.color,
                height: "180px",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onClick={() => router.push(`/list?type=${section.type}`)}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h4 className="text-white fw-bold">{section.title}</h4>
              <p className="text-white">Click to view details</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

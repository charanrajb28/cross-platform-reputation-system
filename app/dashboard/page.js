"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { connectWallet } from "@/utils/web3";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
  const router = useRouter();
  const [account, setAccount] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [tokens, setTokens] = useState({
    projects: [],
    skills: [],
    contributions: [],
    workExperience: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const wallet = await connectWallet();
      if (wallet) {
        setAccount(wallet);
        await fetchUserDetails(wallet);
        await fetchUserTokens(wallet);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // ✅ Fetch User Details
  const fetchUserDetails = async (wallet) => {
    try {
      const res = await fetch(`/api/reputation/getUserDetailsByAddress?args=["${wallet}"]`);
      const data = await res.json();

      if (data.success && Array.isArray(data.data)) {
        setUserDetails({
          fullName: data.data[0],
          email: data.data[1],
          phone: data.data[2],
          location: data.data[3],
          profession: data.data[4],
          organization: data.data[5],
          bio: data.data[6],
          isRegistered: data.data[7],
        });
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  
  
  const fetchUserTokens = async (wallet) => {
    try {
      // 🔹 Get all token IDs owned by the user
      const res = await fetch(`/api/reputation/getTokensByOwner?args=["${wallet}"]`);
      const tokenIds = await res.json();

      if (tokenIds.success && Array.isArray(tokenIds.data) && tokenIds.data.length > 0) {
        const fetchedTokens = {
          projects: [],
          skills: [],
          contributions: [],
          workExperience: [],
        };

        // 🔥 Fetch metadata for each token one by one
        await Promise.all(
          tokenIds.data.map(async (tokenId) => {
            try {
              const metadataRes = await fetch(`/api/reputation/getSBTMetadata?args=["${tokenId}"]`);
              const metadataData = await metadataRes.json();

              if (metadataData.success && Array.isArray(metadataData.data)) {
                const metadata = metadataData.data;
                const tokenData = {
                  tokenId,
                  theme: metadata[0],
                  title: metadata[1],
                  description: metadata[2],
                  validation: metadata[3],
                  validity: metadata[4],
                  level: metadata[5],
                  issuedAt: metadata[6] ? metadata[6].toString() : "0", // Fix BigInt issue
                  issuer: metadata[7],
                };

                // ✅ Categorize tokens based on `metadata[0]`
                switch (tokenData.theme.toLowerCase()) {
                  case "projects":
                    fetchedTokens.projects.push(tokenData);
                    break;
                  case "skills":
                    fetchedTokens.skills.push(tokenData);
                    break;
                  case "contributions":
                    fetchedTokens.contributions.push(tokenData);
                    break;
                  case "work experience":
                    fetchedTokens.workExperience.push(tokenData);
                    break;
                  default:
                    console.warn("Unknown theme:", tokenData.theme);
                }
              }
            } catch (metadataError) {
              console.error(`Error fetching metadata for token ${tokenId}:`, metadataError);
            }
          })
        );

        setTokens(fetchedTokens);
      }
    } catch (error) {
      console.error("Error fetching user tokens:", error);
    }
  };


  const handleTransferCredentials = () => {
    alert("Transfer credentials functionality coming soon!");
  };

  const sections = [
    { title: "Projects", color: "#87CEEB", type: "projects", data: tokens.projects },
    { title: "Skills", color: "#FFB6C1", type: "skills", data: tokens.skills },
    { title: "Contributions", color: "#90EE90", type: "contributions", data: tokens.contributions },
    { title: "Work Experience", color: "#D3D3D3", type: "work-experience", data: tokens.workExperience },
  ];

  return (
    <div className="container mt-5">
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Profile Section */}
          <div className="card shadow-lg text-center p-5 mb-5 border-0 rounded-4">
            <img src="https://via.placeholder.com/150" alt="Profile" className="rounded-circle mb-3" width={120} />
            <h2 className="fw-bold">  {userDetails?.fullName ? userDetails.fullName.toUpperCase() : "NOT REGISTERED"}</h2>
            <p className="text-muted fs-5">{userDetails?.profession || "No profession listed"}</p>
            <p className="text-muted">{userDetails?.bio || "No bio available"}</p>
            <p className="text-muted">Location: {userDetails?.location || "Unknown"}</p>
            <p className="text-muted">Organization: {userDetails?.organization || "Not specified"}</p>
            <p className="text-muted">Email: {userDetails?.email || "No email"}</p>
            <p className="text-muted">Phone: {userDetails?.phone || "No phone"}</p>
            <p className="text-muted">Wallet: {account || "Not Connected"}</p>
            {/* <button className="btn btn-primary mt-3" onClick={handleTransferCredentials}>
              Transfer Credentials
            </button> */}
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
                  onClick={() => {
                    const queryParams = new URLSearchParams();
                    queryParams.set("type", section.type);
                    queryParams.set("tokens", encodeURIComponent(JSON.stringify(section.data)));
                  
                    router.push(`/list?${queryParams.toString()}`);
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <h4 className="text-white fw-bold">{section.title}</h4>
                  <p className="text-white">
                    {section.data.length > 0 ? `${section.data.length} Available` : "No records found"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

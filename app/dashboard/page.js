"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { connectWallet } from "@/utils/web3";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaWallet,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUserTie,
  FaBuilding,
  FaPhone,
} from "react-icons/fa";

export default function Dashboard() {
  const router = useRouter();
  const [account, setAccount] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState({
    projects: [],
    skills: [],
    contributions: [],
    workExperience: [],
  });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const wallet = await connectWallet();
      if (wallet) {
        setAccount(wallet);
        await fetchUserDetails(wallet);
        await fetchTokens(wallet);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // Fetch user details
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

  // Fetch tokens owned by user
  const fetchTokens = async (wallet) => {
    try {
      const res = await fetch(`/api/reputation/getTokensByOwner?args=["${wallet}"]`);
      const data = await res.json();

      if (data.success && Array.isArray(data.data)) {
        const tokenIds = data.data;
        const categorizedTokens = { projects: [], skills: [], contributions: [], workExperience: [] };

        await Promise.all(
          tokenIds.map(async (tokenId) => {
            const tokenDetails = await fetchTokenDetails(tokenId);
            if (tokenDetails) {
              categorizedTokens[tokenDetails.type.toLowerCase().replace(/\s/g, "")].push(tokenDetails);
            }
          })
        );

        setTokens(categorizedTokens);
      }
    } catch (error) {
      console.error("Error fetching tokens:", error);
    }
  };

  // Fetch token metadata
  const fetchTokenDetails = async (tokenId) => {
    try {
      const res = await fetch(`/api/reputation/getSBTMetadata?args=["${tokenId}"]`);
      const data = await res.json();
      if (data.success) {
        return { ...data.data, tokenId };
      }
      return null;
    } catch (error) {
      console.error(`Error fetching token details for ID ${tokenId}:`, error);
      return null;
    }
  };

  const sections = [
    { title: "Projects", color: "#ff9a9e", type: "projects" },
    { title: "Skills", color: "#ff758c", type: "skills" },
    { title: "Contributions", color: "#67b26f", type: "contributions" },
    { title: "Work Experience", color: "#1e3c72", type: "workExperience" },
  ];

  return (
    <div className="container mt-5">
      {loading ? (
        <div className="skeleton-loader"></div>
      ) : (
        <>
          {/* Profile Section */}
          <div className="profile-card glassmorphism row align-items-center p-5 mb-5 rounded-4">
            <div className="col-md-4 text-center">
              <img
                src={"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1084px-Unknown_person.jpg"}
                alt="Profile"
                className="rounded-circle profile-img"
              />
              <h2 className="fw-bold neon-text mt-3">{userDetails?.fullName?.toUpperCase() || "Not Registered"}</h2>
              <p className="bio-text">{userDetails?.bio || "No bio available"}</p>
            </div>

            <div className="col-md-8">
              <ul className="list-group text-start">
                <li className="list-group-item"><FaEnvelope className="me-2" /> {userDetails?.email || "N/A"}</li>
                <li className="list-group-item"><FaPhone className="me-2" /> {userDetails?.phone || "N/A"}</li>
                <li className="list-group-item"><FaMapMarkerAlt className="me-2" /> {userDetails?.location || "N/A"}</li>
                <li className="list-group-item"><FaUserTie className="me-2" /> {userDetails?.profession || "N/A"}</li>
                <li className="list-group-item"><FaBuilding className="me-2" /> {userDetails?.organization || "N/A"}</li>
                <li className="list-group-item"><FaWallet className="me-2" /> {account}</li>
              </ul>
            </div>
          </div>

          {/* Dynamic Sections with Token Count */}
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
            {sections.map((section, index) => (
              <div className="col" key={index}>
                <div
                  className="section-card shadow-lg text-center p-4 rounded-4"
                  style={{ background: section.color, cursor: "pointer" }}
                  onClick={() => router.push(`/list?type=${section.type}`)}
                >
                  <h4 className="text-white fw-bold">{section.title} ({tokens[section.type].length})</h4>
                  <p className="text-white-50">Tap to explore</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <style jsx>{`
        .glassmorphism {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        .profile-img {
          width: 140px;
          height: 140px;
          border: 3px solid #ffffff;
        }
        .neon-text {
          background: linear-gradient(45deg, #ff7eb3, #ff758c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 22px;
        }
        .section-card {
          transition: transform 0.3s, box-shadow 0.3s;
          height: 160px;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
        }
        .section-card:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}

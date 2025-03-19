"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { connectWallet } from "@/utils/web3"; // Import your frontend wallet function

export default function Login() {
  const router = useRouter();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConnectWallet = async () => {
    try {
      setLoading(true);
      setError("");

      const walletAddress = await connectWallet();
      if (!walletAddress) throw new Error("Wallet connection failed!");

      setAccount(walletAddress);
      checkUserRegistration(walletAddress);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const checkUserRegistration = async (wallet) => {
    try {
      const res = await fetch(`/api/reputation/getUserDetailsByAddress?args=["${wallet}"]`);
      const data = await res.json();

      if (data.success) {
        router.push("/dashboard"); // Redirect to dashboard if user exists
      } else {
        router.push("/register"); // Redirect to registration page if user is new
      }
    } catch (error) {
      setError("Error fetching user details.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-gray-500 mb-4">Connect your wallet to continue</p>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg w-full transition-all disabled:bg-gray-400"
          onClick={handleConnectWallet}
          disabled={loading}
        >
          {loading ? "Connecting..." : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
}

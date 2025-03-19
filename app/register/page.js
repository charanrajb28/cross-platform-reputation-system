"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    profession: "",
    organization: "",
    bio: "",
    wallet: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/register-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      alert("Registration successful!");
      router.push("/dashboard");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="fw-bold text-center">Register</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" className="form-control" name="fullName" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input type="text" className="form-control" name="phone" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input type="text" className="form-control" name="location" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Profession</label>
          <input type="text" className="form-control" name="profession" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Organization</label>
          <input type="text" className="form-control" name="organization" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Bio</label>
          <textarea className="form-control" name="bio" onChange={handleChange} required></textarea>
        </div>

        <button type="submit" className="btn btn-success btn-lg" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

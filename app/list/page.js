"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

export default function List() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "Unknown";

  return (
    <div className="container mt-5">
      <h2 className="fw-bold">Viewing {type.toUpperCase()}</h2>
      <p>Here you'll see all related {type} entries.</p>
    </div>
  );
}

"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

export default function List() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "Unknown";
  
  // ✅ Fix: Ensure tokens are always an array
  const tokensRaw = searchParams.get("tokens");
  const tokens = tokensRaw ? JSON.parse(decodeURIComponent(tokensRaw)) : [];

  return (
    <div className="container mt-5">
      <h2 className="fw-bold">Viewing {type.toUpperCase()}</h2>
      <p className="text-muted">Below are all related {type} entries.</p>

      {tokens.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {tokens.map((token, index) => (
            <div className="col" key={index}>
              <div className="card shadow-lg p-4 border-0 rounded-4">
                <h4 className="fw-bold">{token.title}</h4>
                <p className="text-muted">{token.description}</p>
                <p>
                  <strong>Validation:</strong> {token.validation}
                </p>
                <p>
                  <strong>Validity:</strong> {token.validity}
                </p>
                <p>
                  <strong>Level:</strong> {token.level}
                </p>
                <p>
                  <strong>Issued At:</strong> {new Date(token.issuedAt * 1000).toLocaleDateString()}
                </p>
                <p>
                  <strong>Issuer:</strong> {token.issuer}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No {type} records found.</p>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export default function AdminOtp() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function requestOtp() {
    try {
      setStatus("sending");
      setError("");
      const res = await fetch(`${API_BASE}/api/auth/otp/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({}),
      });
      if (!res.ok) throw new Error("Failed to send OTP");
      setStatus("sent");
    } catch (e) {
      setStatus("idle");
      setError(e.message || "Failed to send OTP");
    }
  }

  async function verifyOtp(e) {
    e.preventDefault();
    try {
      setStatus("verifying");
      setError("");
      const res = await fetch(`${API_BASE}/api/auth/otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ code }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Invalid OTP");
      }
      const data = await res.json();
      localStorage.setItem("admin_access_token", data.accessToken);
      navigate("/admin");
    } catch (e) {
      setStatus("sent");
      setError(e.message || "Invalid OTP");
    }
  }

  useEffect(() => {
    requestOtp();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold">Admin OTP Login</h1>
        {status === "sending" && <p>Sending OTP to admin email...</p>}
        {status === "sent" && <p>Enter the 6-digit OTP sent to admin email.</p>}
        {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={verifyOtp} className="space-y-3">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            className="w-full border rounded px-3 py-2"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
          />
          <button
            type="submit"
            className="w-full bg-black text-white rounded px-3 py-2 disabled:opacity-60"
            disabled={
              status === "sending" ||
              status === "verifying" ||
              code.length !== 6
            }
          >
            {status === "verifying" ? "Verifying..." : "Verify"}
          </button>
        </form>
        <button
          onClick={requestOtp}
          disabled={status === "sending" || status === "verifying"}
          className="text-sm underline"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
}

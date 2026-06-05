"use client";


import "@/styles/organization.css";
import "@/styles/login.css"; 


import { useEffect, useState } from "react";

export default function RegisteredUsersPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  /* ---------- Generate Captcha ---------- */
  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let value = "";
    for (let i = 0; i < 6; i++) {
      value += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(value);
    setCaptchaInput("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  /* ---------- Submit ---------- */
  const handleSubmit = () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    if (captchaInput !== captcha) {
      alert("Captcha does not match");
      generateCaptcha();
      return;
    }

    alert("Registered user verification successful (UI only)");
  };

  return (
    <div style={{ display: "flex" }}>
  

      <div style={{ flex: 1 }}>
   

        <div className="org-page-wrapper">
          <h2 className="org-title">
            Login to Biometric Attendance System (BAS)
          </h2>

          <div className="org-form">
            {/* Username */}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ marginBottom: "16px" }}
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: "16px" }}
            />

            {/* Captcha */}
            <label style={{ fontSize: "13px", marginBottom: "6px" }}>
              Enter the code exactly as it appears:
            </label>

            <div className="captcha-row" style={{ marginBottom: "12px" }}>
              <span
                className="captcha-text"
                style={{ color: "#dc2626", fontWeight: "bold" }}
              >
                {captcha}
              </span>

              <button
                type="button"
                className="captcha-refresh"
                onClick={generateCaptcha}
              >
                Change text
              </button>
            </div>

            <input
              type="text"
              placeholder="Confirmation Code"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              style={{ marginBottom: "16px" }}
            />

            {/* Links */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
                fontSize: "13px",
              }}
            >
              <a href="#" style={{ color: "#2563eb" }}>
                Forgot Password
              </a>

              <a href="#" style={{ color: "#2563eb" }}>
                Don&apos;t have an account? Click here
              </a>
            </div>

            {/* Submit */}
            <button
              type="button"
              className="next-btn"
              style={{ width: "100%" }}
              onClick={handleSubmit}
            >
              Sign me in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

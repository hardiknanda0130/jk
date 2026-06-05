"use client";

import "@/styles/header.css";
import "@/styles/organization.css"; 
 
import { useEffect, useState } from "react";

export default function RequestNodalUpdatePage() {
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [mobile, setMobile] = useState("");

  /* -------- Generate Captcha -------- */
  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
    setCaptchaInput("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  /* -------- Submit -------- */
  const handleSubmit = () => {
    if (!mobile || mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    if (captchaInput !== captcha) {
      alert("Captcha does not match");
      generateCaptcha();
      return;
    }

    alert("Nodal update request submitted successfully (UI only)");
  };

  return (
    <div style={{ display: "flex" }}>
 

      <div style={{ flex: 1 }}>
 

        <div className="org-page-wrapper">
          <h2 className="org-title">
            Nodal details updation
          </h2>

          <form className="org-form">
            {/* Mobile Number */}
            <label>
              New Nodal officer&apos;s Mobile No.
              <span style={{ color: "red" }}> *</span>
            </label>
            <input
              type="text"
              placeholder="Enter Nodal Mobile Number"
              maxLength={10}
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
            />

            {/* Captcha */}
            <div className="captcha-box">
              <label>
                Enter the code exactly as it appears
                <span style={{ color: "red" }}> *</span>
              </label>

              <div className="captcha-row">
                <span className="captcha-text">{captcha}</span>
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
              />
            </div>

            <button
              type="button"
              className="next-btn"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

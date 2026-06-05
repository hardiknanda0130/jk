"use client";

import { useState } from "react";

/* ---------------- Accordion Item ---------------- */

function AccordionItem({ title, description, isOpen, onClick }) {
  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center px-5 py-4 text-left font-medium text-sky-700 hover:bg-gray-50 transition"
      >
        <span>{title}</span>

        <span
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 text-gray-600 text-sm whitespace-pre-line">
          {description}
        </div>
      )}
    </div>
  );
}

/* ---------------- Page ---------------- */

export default function NewFeaturesPage() {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleIndex = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  /* ---------------- Your Data ---------------- */

  const features = [
    {
      title: "Addition of Office Location from Nodal Officer Login",
      description:
        "This new functionality allows Nodal officers to add new office locations directly. The location is added automatically to the master list without raising a service desk ticket.",
    },
    {
      title: "BAS Client for TOUCHLESS TERMINAL QR Code Attendance Marking",
      description:
        "Attendance marking through Touchless Terminal with QR Code is now available. Nodal Officer / Bio Device Admin can download the client and generate QR codes from their login.",
    },
    {
      title: "Online Organization On-boarding for Delhi Central Only",
      description:
        "Organizations from Delhi Central can send online onboarding requests from http://attendance.gov.in. Click on Organization Registration and fill the form. Download the manual before submitting.",
    },
    {
      title: "UnBlock Employee",
      description:
        "Nodal officers can unblock employees from Manage Employee → View Blocked Employees. Click Unblock and provide a reason.",
    },
    {
      title: "Employee Attendance marking location via Latitude/Longitude",
      description:
        "Reports now show the actual location of attendance marking using latitude and longitude. Available from BAS Reports on request.",
    },
    {
      title: "Short Leave Message",
      description:
        "Employees can add a reason/message for late or early leave. Use Short Leave Message menu. Nodal officers can view messages in Attendance Register reports.",
    },
    {
      title: "Leave/Tour Edit",
      description:
        "Nodal officers can edit approved leave and tour dates from Approved Leaves and Approved Tour sections.",
    },
    {
      title: "Nodal Officer Change Feature",
      description:
        "Organization can update new Nodal Officer information from Manage Employee → Nodal Officer Update.",
    },
    {
      title: "Subordinates Leaves/Tour Approval by Reporting Officer",
      description:
        "Reporting Officers can approve subordinate leave/tour requests. Notifications via SMS/Email are sent on requests and approvals.",
    },
    {
      title: "All Old Password Expired",
      description:
        "Reset your password. Must contain 8+ characters, uppercase, lowercase, number, and special character. Use Forgot Password if needed.",
    },
  ];

  /* ---------------- UI ---------------- */

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-sky-700 mb-4">
         New Features (Software)
     </h1>


      <p className="text-gray-600 mb-6">
        Here you can see all newly released software features and updates.
      </p>

      <div className="space-y-3 max-w-5xl">
        {features.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            description={item.description}
            isOpen={openIndexes.includes(index)}
            onClick={() => toggleIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

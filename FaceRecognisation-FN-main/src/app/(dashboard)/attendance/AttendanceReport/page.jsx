"use client";

import { useState } from "react";
import {  } from "lucide-react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


export default function AttendanceReportPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filter, setFilter] = useState("all");
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [leaveModalEmp, setLeaveModalEmp] = useState(null);
const [leaveReason, setLeaveReason] = useState("");

const arrivalData = [
  { time: "9:00", count: 3 },
  { time: "9:15", count: 6 },
  { time: "9:30", count: 9 },
  { time: "9:45", count: 4 },
  { time: "10:00", count: 2 },
];



// 🔥 Dummy Month Attendance Data
const monthData = Array.from({ length: 30 }, (_, i) => {
  const day = (i + 1) % 7;

  return {
    date: i + 1,
    status:
      day === 0 || day === 1   // Sunday & Monday holiday
        ? "holiday"
        : Math.random() > 0.7
        ? "leave"
        : "present",
  };
});






 // 🔥 Random Status Generator
const statuses = ["present", "absent", "leave"];

const employees = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  name: `Officer ${i + 1}`,
  role: "Nodal Officer",
  image: `https://randomuser.me/api/portraits/${
    i % 2 === 0 ? "men" : "women"
  }/${(i % 50) + 1}.jpg`,
  status: statuses[Math.floor(Math.random() * statuses.length)],
}));

  // 🔥 Filter Logic
  const filteredEmployees =
    filter === "all"
      ? employees
      : employees.filter((emp) => emp.status === filter);

  const changeDay = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

{/* 🔥 MODERN HEADER */}
<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

  {/* 🔹 Title */}
  <div>
    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
      Attendance Report
    </h1>
    <p className="text-sm text-gray-600 mt-1">
      Manage officer attendance and daily activity
    </p>
  </div>

{/* 🔹 Modern Colorful Date Switcher + Calendar */}
<div className="flex items-center gap-3 bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 
border border-indigo-200 rounded-xl px-4 py-2 shadow-sm">

  {/* Previous */}
  <button
    onClick={() => changeDay(-1)}
    className="w-8 h-8 flex items-center justify-center rounded-lg 
    hover:bg-indigo-100 transition"
  >
    <ChevronLeft className="text-indigo-700" size={18} />
  </button>

  {/* Visible Date */}
  <span className="text-sm font-semibold text-indigo-900 tracking-wide">
    {formatDate(currentDate)}
  </span>

  {/* Calendar Input */}
  <input
    type="date"
    value={currentDate.toISOString().split("T")[0]}
    onChange={(e) => setCurrentDate(new Date(e.target.value))}
    className="text-xs border border-indigo-300 rounded-lg px-2 py-1 
    text-indigo-900 bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
  />

  {/* Next */}
  <button
    onClick={() => changeDay(1)}
    className="w-8 h-8 flex items-center justify-center rounded-lg 
    hover:bg-indigo-100 transition"
  >
    <ChevronRight className="text-indigo-700" size={18} />
  </button>
</div>

</div>


{/* 🔥 MODERN FILTERS */}
<div className="bg-white/60 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md p-4 mb-6">
<div className="grid grid-cols-1 md:grid-cols-4 gap-3">

  <select className="bg-white border border-gray-300 text-gray-800 text-sm rounded-md px-3 py-2 focus:border-indigo-500 focus:outline-none">
    <option>Organization</option>
  </select>

  <select className="bg-white border border-gray-300 text-gray-800 text-sm rounded-md px-3 py-2 focus:border-indigo-500 focus:outline-none">
    <option>Department</option>
  </select>

  <select className="bg-white border border-gray-300 text-gray-800 text-sm rounded-md px-3 py-2 focus:border-indigo-500 focus:outline-none">
    <option>Shift</option>
  </select>

  <select
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="bg-white border border-gray-300 text-gray-800 text-sm rounded-md px-3 py-2 focus:border-indigo-500 focus:outline-none"
  >
    <option value="all">All</option>
    <option value="present">Present</option>
    <option value="absent">Absent</option>
    <option value="leave">Leave</option>
  </select>

</div>

</div>

      {/* 🔥 EMPLOYEE CARDS GRID */}
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
  {filteredEmployees.map((emp) => (
    <div
      key={emp.id}
      className="bg-white rounded-2xl border border-blue-200 shadow-sm 
      hover:shadow-lg transition-all duration-200 p-4 flex flex-col justify-between"
    >
      {/* 🔹 Top Section */}
      <div>

        {/* Profile + Name */}
        <div className="flex items-start gap-3">
          <img
            src={emp.image}
            alt={emp.name}
            className={`w-14 h-14 rounded-full object-cover border-2
            ${
              emp.status === "present"
                ? "border-green-500"
                : emp.status === "absent"
                ? "border-red-500"
                : "border-yellow-400"
            }`}
          />

          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold text-gray-900">
                {emp.name}
              </h3>

              {emp.status === "present" && (
                <span className="text-sm font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-md">
                  09:32 AM
                </span>
              )}
            </div>

            <p className="text-xs text-gray-600 mt-0.5">
              Municipal Corporation
            </p>
          </div>
        </div>

        

        {/* Divider */}
        <div className="h-px bg-gray-200 my-3"></div>

        {/* 🔥 Status + Action Row */}
        <div className="flex items-center justify-between">

          {/* Status Badges */}
          <div className="flex gap-2 text-xs font-medium">
            <span
              className={`px-2 py-1 rounded-md ${
                emp.status === "present"
                  ? "bg-green-50 text-green-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              Present
            </span>

            <span
              className={`px-2 py-1 rounded-md ${
                emp.status === "absent"
                  ? "bg-red-50 text-red-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              Absent
            </span>

            <span
              className={`px-2 py-1 rounded-md ${
                emp.status === "leave"
                  ? "bg-yellow-50 text-yellow-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              Leave
            </span>

            
              
          </div>

          {/* Calendar Icon */}
          <div className="relative group">
            <button
              onClick={() => setSelectedEmp(emp)}
              className="w-8 h-8 flex items-center justify-center rounded-md 
              bg-gray-100 hover:bg-indigo-100 transition"
            >
              <CalendarDays size={16} className="text-gray-700" />
            </button>

            <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] px-2 py-1 
            rounded bg-gray-900 text-white opacity-0 group-hover:opacity-100 transition pointer-events-none">
              View Attendance
            </span>
          </div>

        </div>
<div className="h-px bg-gray-200 my-3"></div>

{/* 🔥 Action Section */}
<div className="mt-4 pt-3 border-t border-gray-100">
  <button
    onClick={() => setLeaveModalEmp(emp)}
    className="w-full rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 
    text-white text-sm font-semibold py-2.5 shadow-sm 
    hover:shadow-md hover:scale-[1.02] transition"
  >
    + Add Leave
  </button>
</div>
      </div>
    </div>
  ))}
</div>

{/* 🔥 ADD LEAVE MODAL */}
{leaveModalEmp && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

    <div className="bg-white w-[480px] rounded-2xl shadow-2xl p-6 animate-[popupScale_0.25s_ease-out]">

      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="text-lg font-semibold text-gray-900">
          Apply Leave – {leaveModalEmp.name}
        </h2>
        <button
          onClick={() => setLeaveModalEmp(null)}
          className="text-gray-500 hover:text-black text-sm"
        >
          Close
        </button>
      </div>

      {/* Body */}
      <div className="mt-4 space-y-4">

        {/* Leave Type */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Leave Type
          </label>
          <select
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm 
            focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option>Casual Leave</option>
            <option>Sick Leave</option>
            <option>Half Day</option>
            <option>Work From Home</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Leave Date
          </label>
          <input
            type="date"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm 
            focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Reason */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Reason
          </label>
          <textarea
            rows={4}
            placeholder="Write detailed reason..."
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm 
            focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 mt-6 border-t pt-4">

        <button
          onClick={() => setLeaveModalEmp(null)}
          className="px-4 py-2 rounded-lg border text-sm"
        >
          Cancel
        </button>

        <button
          className="px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold 
          hover:bg-indigo-700 shadow-sm"
        >
          Submit Leave
        </button>

      </div>

    </div>
  </div>
)}

{/* 🔥 EMPLOYEE DETAIL POPUP */}
{selectedEmp && (
<div className="fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center z-50 
animate-[fadeIn_0.5s_ease-out]">


    
    <div className="bg-white w-[900px] max-h-[85vh] overflow-y-auto rounded-2xl shadow-xl p-5 
animate-[popupScale_0.25s_ease-out]">


      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="text-lg font-semibold text-gray-900">
          {selectedEmp.name} - Attendance Detail
        </h2>

        <button
          onClick={() => setSelectedEmp(null)}
          className="text-sm text-gray-600 hover:text-black"
        >
          Close
        </button>
      </div>

      {/* 🔥 TOP HALF — MONTH CALENDAR UI */}
      <div className="mt-4 border rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-800 mb-3">
          Monthly Attendance Calendar
        </h3>
        {/* 🔥 Week Days Header */}
<div className="grid grid-cols-7 gap-2 text-center text-[11px] font-semibold text-gray-600 mb-1">
  <span>Sun</span>
  <span>Mon</span>
  <span>Tue</span>
  <span>Wed</span>
  <span>Thu</span>
  <span>Fri</span>
  <span>Sat</span>
</div>


 <div className="grid grid-cols-7 gap-2 text-center text-xs">
  {monthData.map((d) => (
    <div
      key={d.date}
      className={`py-2 rounded-md border font-medium
      ${
        d.status === "holiday"
          ? "bg-orange-100 text-orange-700 border-orange-200"
          : d.status === "present"
          ? "bg-green-100 text-green-700 border-green-200"
          : "bg-red-100 text-red-700 border-red-200"
      }`}
    >
      {d.date}
    </div>
  ))}
</div>

      </div>

      {/* 🔥 BOTTOM SECTION */}
      <div className="grid grid-cols-2 gap-4 mt-5">

        {/* Graph Placeholder */}
        <div className="h-[180px] bg-gray-50 rounded-md">
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={arrivalData}>
  <XAxis dataKey="time" fontSize={10} tickLine={false} axisLine={false} />
  <YAxis fontSize={10} tickLine={false} axisLine={false} />
  <Tooltip cursor={{ fill: "transparent" }} />
  <Bar dataKey="count" radius={[6,6,0,0]} fill="#93C5FD" />
</BarChart>

  </ResponsiveContainer>
</div>


        {/* Detail Summary */}
        <div className="border rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-large text-blue-800">
            Attendance Summary
          </h3>

          <div className="text-xs text-gray-700 flex justify-between">
            <span>Average Arrival</span>
            <span className="font-semibold text-gray-900">09:28 AM</span>
          </div>

          <div className="text-xs text-gray-700 flex justify-between">
            <span>Average Logout</span>
            <span className="font-semibold text-gray-900">05:12 PM</span>
          </div>

          <div className="text-xs text-gray-700 flex justify-between">
            <span>9-5 Compliance</span>
            <span className="font-semibold text-green-600">Mostly On Time</span>
          </div>

          <div className="text-xs text-gray-700 flex justify-between">
            <span>Total Present Days</span>
            <span className="font-semibold text-gray-900">22 Days</span>
          </div>
        </div>

      </div>

    </div>
  </div>
)}


    </div>
  );
}
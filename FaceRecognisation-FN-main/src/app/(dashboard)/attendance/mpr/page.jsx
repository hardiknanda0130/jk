"use client";

import { useState } from "react";
import { Users, CheckCircle, XCircle, Calendar, Download } from "lucide-react";





/* =======================
   STATIC DAY-WISE DETAILS
   ======================= */
const monthDetails = {
  "January 2026": {
    totalUsers: 120,
    days: [
      {
        date: "01 Jan 2026",
        present: ["Rohit Sharma", "Anjali Verma", "Amit Kumar"],
        
      },
      {
        date: "02 Jan 2026",
        present: ["Neha Singh", "Rahul Mehta"],
      },
      {
        date: "03 Jan 2026",
        present: ["Rohit Sharma", "Neha Singh"],
      },
    ],
  },
};

/* =======================
   STATIC MPR DATA
   ======================= */
const MPR_DATA = {
  monthly: [
    {
      period: "January 2026",
      totalEmployees: 120,
      present: 95,
      absent: 25,
      workingDays: 21,
    },
    {
      period: "February 2026",
      totalEmployees: 120,
      present: 98,
      absent: 22,
      workingDays: 20,
    },
  ],
  weekly: [
    {
      period: "Week 1 (Feb 2026)",
      totalEmployees: 120,
      present: 470,
      absent: 50,
      workingDays: 5,
    },
  ],
};

export default function MonthlyProgressReportPage() {
  const [filterType, setFilterType] = useState("monthly");
  const [openMonth, setOpenMonth] = useState(null);
const [popupFilter, setPopupFilter] = useState("all");

  const data = MPR_DATA[filterType];
  const summary = data[0];

  /* =======================
     EXCEL DOWNLOAD
     ======================= */
  const downloadExcel = () => {
    let csv = "Period,Employees,Present,Absent,Working Days\n";
    data.forEach((row) => {
      csv += `${row.period},${row.totalEmployees},${row.present},${row.absent},${row.workingDays}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "MPR_Report.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Monthly Progress Report (MPR)
        </h1>
        <p className="text-sm text-gray-500">
          Month-wise and week-wise attendance summary
        </p>
      </div>

      {/* FILTER + DOWNLOAD */}
      <div className="flex justify-between items-center bg-white border p-4 rounded-xl">
        <div className="flex gap-3">
  <button
    onClick={() => setFilterType("monthly")}
    className={`px-4 py-2 rounded-lg text-sm font-semibold transition
      ${
        filterType === "monthly"
          ? "bg-indigo-600 text-white"
          : "bg-gray-100 text-indigo-600 hover:bg-indigo-50"
      }`}
  >
    Month Wise
  </button>

  <button
    onClick={() => setFilterType("weekly")}
    className={`px-4 py-2 rounded-lg text-sm font-semibold transition
      ${
        filterType === "weekly"
          ? "bg-indigo-600 text-white"
          : "bg-gray-100 text-indigo-600 hover:bg-indigo-50"
      }`}
  >
    Week Wise
  </button>
</div>


        <button
          onClick={downloadExcel}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          <Download className="h-4 w-4" />
          Download Excel
        </button>
      </div>

      {/* SUMMARY CARDS */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

  {/* EMPLOYEES */}
  <div
    className="
      bg-indigo-50/90 border border-indigo-100 rounded-2xl
     
      [&_p]:text-indigo-700
      [&_svg]:text-indigo-600
      [&_*]:bg-transparent
    "
  >
    <SummaryCard
      title="Employees"
      value={summary.totalEmployees}
      icon={Users}
    />
  </div>

  {/* PRESENT */}
  <div
    className="
      bg-emerald-50/90 border border-emerald-100 rounded-2xl
  
      [&_p]:text-emerald-700
      [&_svg]:text-emerald-600
      [&_*]:bg-transparent
    "
  >
    <SummaryCard
      title="Present"
      value={summary.present}
      icon={CheckCircle}
    />
  </div>

  {/* ABSENT */}
  <div
    className="
      bg-rose-50/90 border border-rose-100 rounded-2xl
  
      [&_p]:text-rose-700
      [&_svg]:text-rose-600
      [&_*]:bg-transparent
    "
  >
    <SummaryCard
      title="Absent"
      value={summary.absent}
      icon={XCircle}
    />
  </div>

  {/* WORKING DAYS */}
  <div
    className="
      bg-sky-50/90 border border-sky-100 rounded-2xl
     
      [&_p]:text-sky-700
      [&_svg]:text-sky-600
      [&_*]:bg-transparent
    "
  >
    <SummaryCard
      title="Working Days"
      value={summary.workingDays}
      icon={Calendar}
    />
  </div>

</div>



      {/* TABLE */}
      <div className="bg-white border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
<thead className="bg-gray-50 text-black text-xs">

            <tr>
              <th className="px-6 py-3 text-left">Period</th>
              <th className="px-6 py-3 text-left">Employees</th>
              <th className="px-6 py-3 text-left">Present</th>
              <th className="px-6 py-3 text-left">Absent</th>
              <th className="px-6 py-3 text-left">Working Days</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {data.map((row, i) => (
             <tr key={i} className="hover:bg-indigo-50">
  <td className="px-6 py-3 text-black">
    {row.period}
  </td>

  <td className="px-6 py-3 text-black">
    {row.totalEmployees}
  </td>

  <td className="px-6 py-3 text-green-700 font-medium">
    {row.present}
  </td>

  <td className="px-6 py-3 text-red-700 font-medium">
    {row.absent}
  </td>

  <td className="px-6 py-3 text-black">
    {row.workingDays}
  </td>

  <td className="px-6 py-3 text-black">
    {monthDetails[row.period] && (
      <button
        onClick={() => setOpenMonth(row.period)}
        className="bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-green-900"
      >
        View Details
      </button>
    )}
  </td>
</tr>

            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {/* MODAL */}
{openMonth && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div
      className="absolute inset-0 bg-black/40"
      onClick={() => {
        setOpenMonth(null);
        setPopupFilter("all");
      }}
    />

    <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">

      {/* HEADER */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-700">
          {openMonth} – Day Wise Attendance
        </h2>
        <p className="text-sm text-gray-600">
          Total Users:{" "}
          <span className="font-semibold">
            {monthDetails[openMonth].totalUsers}
          </span>
        </p>
      </div>

      {/* FILTER BUTTONS */}
      <div className="mb-4 flex gap-3">
        {["all", "present", "absent"].map((type) => (
          <button
            key={type}
            onClick={() => setPopupFilter(type)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition
              ${
                popupFilter === type
                  ? "bg-indigo-600 text-white"
                  : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
              }`}
          >
            {type === "all"
              ? "All"
              : type === "present"
              ? "Present"
              : "Absent"}
          </button>
        ))}
      </div>

      {/* DAY WISE LIST */}
      <div className="max-h-80 space-y-4 overflow-y-auto">
        {monthDetails[openMonth].days.map((day, i) => (
          <div
            key={i}
            className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4"
          >
            <p className="mb-2 font-semibold text-gray-700">
              {day.date}
            </p>

            <ul className="space-y-1 text-sm">
              {day.present
                .filter((name) => {
                  if (popupFilter === "all") return true;
                  if (popupFilter === "present") return true;
                  if (popupFilter === "absent") return false;
                })
                .map((name, j) => (
                  <li
                    key={j}
                    className="flex justify-between rounded-md bg-white px-3 py-1.5 border"
                  >
                    <span className="text-gray-800">{name}</span>
                    <span className="text-xs font-semibold text-green-700">
                      Present
                    </span>
                  </li>
                ))}

              {popupFilter === "absent" && (
                <li className="text-xs italic text-gray-500">
                  Absent users data not available (static demo)
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => {
            setOpenMonth(null);
            setPopupFilter("all");
          }}
          className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

/* CARD */
function SummaryCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border bg-gray-50 p-5">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <Icon className="h-6 w-6 text-gray-500" />
      </div>
    </div>
  );
}

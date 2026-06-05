"use client";

import { UserCheck, Users, CheckCircle, XCircle } from "lucide-react";


// ===== STATIC RANDOM DATA =====
const attendanceList = [
  {
    name: "Rohit Sharma",
    dept: "IT Department",
    status: "Present",
    inTime: "09:12 AM",
    date: "2026-02-12",
  },
  {
    name: "Neha Singh",
    dept: "HR Department",
    status: "Present",
    inTime: "09:05 AM",
    date: "2026-02-12",
  },
  {
    name: "Amit Kumar",
    dept: "Finance",
    status: "Absent",
    inTime: "--",
    date: "2026-02-12",
  },
  {
    name: "Rahul Mehta",
    dept: "Admin",
    status: "Present",
    inTime: "09:20 AM",
    date: "2026-02-12",
  },
];

// ===== COUNTS =====
const totalEmployees = attendanceList.length;

const presentToday = attendanceList.filter(
  (u) => u.status === "Present"
).length;

const absentToday = attendanceList.filter(
  (u) => u.status === "Absent"
).length;

export default function PresentTodayPage() {
  return (
    <div className="space-y-6">

      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Present Today
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Attendance status of employees for today
        </p>
      </div>

      {/* ===== CARDS ===== */}
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

  {/* TOTAL EMPLOYEES */}
  <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5 shadow-sm hover:shadow-md transition">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-indigo-700">Total Employees</p>
        <p className="mt-1 text-3xl font-bold text-indigo-900">
          {totalEmployees}
        </p>
      </div>
      <div className="rounded-xl bg-indigo-100 p-3">
        <Users className="h-6 w-6 text-indigo-600" />
      </div>
    </div>
    <p className="mt-4 text-xs text-indigo-700/70">
      Total number of employees registered in the system
    </p>
  </div>

  {/* PRESENT TODAY */}
  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5 shadow-sm hover:shadow-md transition">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-emerald-700">Present Today</p>
        <p className="mt-1 text-3xl font-bold text-emerald-900">
          {presentToday}
        </p>
      </div>
      <div className="rounded-xl bg-emerald-100 p-3">
        <CheckCircle className="h-6 w-6 text-emerald-600" />
      </div>
    </div>
    <p className="mt-4 text-xs text-emerald-700/70">
      Employees who have marked attendance today
    </p>
  </div>

  {/* ABSENT TODAY */}
  <div className="rounded-2xl border border-rose-100 bg-rose-50/70 p-5 shadow-sm hover:shadow-md transition">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-rose-700">Absent Today</p>
        <p className="mt-1 text-3xl font-bold text-rose-900">
          {absentToday}
        </p>
      </div>
      <div className="rounded-xl bg-rose-100 p-3">
        <XCircle className="h-6 w-6 text-rose-600" />
      </div>
    </div>
    <p className="mt-4 text-xs text-rose-700/70">
      Employees who are absent for today
    </p>
  </div>

  {/* ATTENDANCE DATE */}
  <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-5 shadow-sm hover:shadow-md transition">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-sky-700">Attendance Date</p>
        <p className="mt-1 text-lg font-semibold text-sky-900">
          12 Feb 2026
        </p>
      </div>
      <div className="rounded-xl bg-sky-100 p-3">
        <UserCheck className="h-6 w-6 text-sky-600" />
      </div>
    </div>
    <p className="mt-4 text-xs text-sky-700/70">
      Attendance record date for today
    </p>
  </div>

</div>



      {/* ===== TABLE ===== */}
      <div className="rounded-2xl bg-white border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Today Attendance List
          </h2>
          <p className="text-sm text-gray-500">
            Dummy data – backend integration pending
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">#</th>
                <th className="px-6 py-3 text-left">Employee Name</th>
                <th className="px-6 py-3 text-left">Department</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">In Time</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {attendanceList.map((user, index) => (
                <tr key={index} className="hover:bg-indigo-50">
                  <td className="px-6 py-3 text-gray-500">{index + 1}</td>
                  <td className="px-6 py-3 font-medium text-gray-800">
                    {user.name}
                  </td>
                  <td className="px-6 py-3 text-gray-600">
                    {user.dept}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold
                        ${
                          user.status === "Present"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-500">
                    {user.inTime}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}

"use client";

import { UserCheck, Users, CheckCircle, XCircle } from "lucide-react";

// ===== STATIC DATA (single source of truth) =====
const names = [
  "Rohit Sharma",
  "Anjali Verma",
  "Amit Kumar",
  "Neha Singh",
  "Rahul Mehta",
  "Priya Gupta",
  "Suresh Yadav",
  "Pooja Sharma",
  "Karan Malhotra",
  "Sneha Patel",
];

const departments = [
  "IT Department",
  "HR Department",
  "Finance",
  "Admin",
  "Operations",
];

const statuses = ["Active", "Inactive"];

// helper: random item
const randomFrom = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

// helper: random date (last 7 days)
const randomDate = () => {
  const today = new Date();
  const past = new Date();
  past.setDate(today.getDate() - Math.floor(Math.random() * 7));
  return past.toISOString().split("T")[0];
};

// 🔥 FINAL RANDOM USERS LIST
const usersList = Array.from({ length: 7 }, () => ({
  name: randomFrom(names),
  dept: randomFrom(departments),
  status: randomFrom(statuses),
  date: randomDate(),
}));


// ===== COUNTS (cards yahin se chalenge) =====
const totalUsers = usersList.length;

const activeUsers = usersList.filter(
  (u) => u.status === "Active"
).length;

const inactiveUsers = usersList.filter(
  (u) => u.status === "Inactive"
).length;

const today = new Date().toISOString().split("T")[0];

const todayRegistered = usersList.filter(
  (u) => u.date === today
).length;

export default function RegisteredUsersReportPage() {
  return (
    <div className="space-y-6">

      {/* ===== PAGE HEADER ===== */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Registered Users Report
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of all users registered for attendance
        </p>
      </div>

      {/* ===== STATS CARDS ===== */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

        {/* TOTAL USERS */}
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-700">
                Total Users
              </p>
              <p className="mt-1 text-3xl font-bold text-indigo-900">
                {totalUsers}
              </p>
            </div>
            <div className="rounded-xl bg-indigo-100 p-3">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
          <p className="mt-4 text-xs text-indigo-700/70">
            Overall registered users
          </p>
        </div>

        {/* ACTIVE USERS */}
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-700">
                Active Users
              </p>
              <p className="mt-1 text-3xl font-bold text-emerald-900">
                {activeUsers}
              </p>
            </div>
            <div className="rounded-xl bg-emerald-100 p-3">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <p className="mt-4 text-xs text-emerald-700/70">
            Currently active users
          </p>
        </div>

        {/* INACTIVE USERS */}
        <div className="rounded-2xl border border-rose-100 bg-rose-50/70 p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-rose-700">
                Inactive Users
              </p>
              <p className="mt-1 text-3xl font-bold text-rose-900">
                {inactiveUsers}
              </p>
            </div>
            <div className="rounded-xl bg-rose-100 p-3">
              <XCircle className="h-6 w-6 text-rose-600" />
            </div>
          </div>
          <p className="mt-4 text-xs text-rose-700/70">
            Disabled or inactive accounts
          </p>
        </div>

        {/* TODAY REGISTERED */}
        <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sky-700">
                Today Registered
              </p>
              <p className="mt-1 text-3xl font-bold text-sky-900">
                {todayRegistered}
              </p>
            </div>
            <div className="rounded-xl bg-sky-100 p-3">
              <UserCheck className="h-6 w-6 text-sky-600" />
            </div>
          </div>
          <p className="mt-4 text-xs text-sky-700/70">
            New registrations today
          </p>
        </div>

      </div>

      {/* ===== TABLE ===== */}
      <div className="rounded-2xl bg-white border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Registered Users List
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
                <th className="px-6 py-3 text-left">User Name</th>
                <th className="px-6 py-3 text-left">Department</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Registered On</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {usersList.map((user, index) => (
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
                          user.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-500">
                    {user.date}
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

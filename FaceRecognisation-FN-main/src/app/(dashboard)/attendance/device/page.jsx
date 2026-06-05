"use client";

import { Users, Tablet, Monitor, Smartphone } from "lucide-react";

/* =======================
   STATIC DEVICE DATA
   ======================= */
const deviceAttendanceList = [
  {
    name: "Rohit Sharma",
    dept: "IT Department",
    device: "Desktop",
    date: "2026-02-12",
  },
  {
    name: "Anjali Verma",
    dept: "HR Department",
    device: "Mobile",
    date: "2026-02-12",
  },
  {
    name: "Amit Kumar",
    dept: "Finance",
    device: "Tablet",
    date: "2026-02-12",
  },
  {
    name: "Neha Singh",
    dept: "Admin",
    device: "Desktop",
    date: "2026-02-12",
  },
  {
    name: "Rahul Mehta",
    dept: "Operations",
    device: "Mobile",
    date: "2026-02-12",
  },
];

/* =======================
   COUNTS
   ======================= */
const totalAttendance = deviceAttendanceList.length;
const tabletUsers = deviceAttendanceList.filter(u => u.device === "Tablet").length;
const desktopUsers = deviceAttendanceList.filter(u => u.device === "Desktop").length;
const mobileUsers = deviceAttendanceList.filter(u => u.device === "Mobile").length;

/* =======================
   CARD CONFIG (STATIC CLASSES)
   ======================= */
const cardConfig = [
  {
    title: "Total Attendance",
    value: totalAttendance,
    desc: "Total attendance marked today",
    icon: Users,
    wrapper: "border-indigo-100 bg-indigo-50/70",
    iconBg: "bg-indigo-100",
    text: "text-indigo-700",
    valueText: "text-indigo-900",
    iconText: "text-indigo-600",
  },
  {
    title: "Tablet Users",
    value: tabletUsers,
    desc: "Attendance marked using tablets",
    icon: Tablet,
    wrapper: "border-emerald-100 bg-emerald-50/70",
    iconBg: "bg-emerald-100",
    text: "text-emerald-700",
    valueText: "text-emerald-900",
    iconText: "text-emerald-600",
  },
  {
    title: "Desktop Users",
    value: desktopUsers,
    desc: "Attendance marked using desktop systems",
    icon: Monitor,
    wrapper: "border-sky-100 bg-sky-50/70",
    iconBg: "bg-sky-100",
    text: "text-sky-700",
    valueText: "text-sky-900",
    iconText: "text-sky-600",
  },
  {
    title: "Mobile Users",
    value: mobileUsers,
    desc: "Attendance marked using mobile devices",
    icon: Smartphone,
    wrapper: "border-rose-100 bg-rose-50/70",
    iconBg: "bg-rose-100",
    text: "text-rose-700",
    valueText: "text-rose-900",
    iconText: "text-rose-600",
  },
];

export default function AttendanceByDevicePage() {
  return (
    <div className="space-y-6">

      {/* ===== PAGE HEADER ===== */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Attendance by Device
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Device-wise attendance usage for today
        </p>
      </div>

      {/* ===== CARDS ===== */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cardConfig.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className={`rounded-2xl border p-5 shadow-sm hover:shadow-md transition ${card.wrapper}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${card.text}`}>
                    {card.title}
                  </p>
                  <p className={`mt-1 text-3xl font-bold ${card.valueText}`}>
                    {card.value}
                  </p>
                </div>

                <div className={`rounded-xl p-3 ${card.iconBg}`}>
                  <Icon className={`h-6 w-6 ${card.iconText}`} />
                </div>
              </div>

              <p className={`mt-4 text-xs ${card.text}/70`}>
                {card.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* ===== TABLE ===== */}
<div className="rounded-2xl bg-white border shadow-sm overflow-hidden">
  <div className="px-6 py-4 border-b bg-gray-50">
    <h2 className="text-lg font-semibold text-gray-800">
      Device-wise Attendance List
    </h2>
    <p className="text-sm text-gray-500">
      Dummy data – backend integration pending
    </p>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
        <tr>
          <th className="px-6 py-4 text-left">#</th>
          <th className="px-6 py-4 text-left">Employee</th>
          <th className="px-6 py-4 text-left">Department</th>
          <th className="px-6 py-4 text-left">Device Used</th>
          <th className="px-6 py-4 text-left">Date</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">

        {deviceAttendanceList.map((user, index) => {

          let DeviceIcon;
          let deviceStyle;

          if (user.device === "Desktop") {
            DeviceIcon = Monitor;
            deviceStyle = "bg-sky-100 text-sky-700";
          } else if (user.device === "Mobile") {
            DeviceIcon = Smartphone;
            deviceStyle = "bg-rose-100 text-rose-700";
          } else {
            DeviceIcon = Tablet;
            deviceStyle = "bg-emerald-100 text-emerald-700";
          }

          return (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-indigo-50 transition`}
            >

              {/* SERIAL */}
              <td className="px-6 py-4">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                  {index + 1}
                </span>
              </td>

              {/* NAME */}
              <td className="px-6 py-4 font-medium text-gray-900">
                {user.name}
              </td>

              {/* DEPARTMENT */}
              <td className="px-6 py-4 text-gray-600">
                {user.dept}
              </td>

              {/* DEVICE WITH ICON */}
              <td className="px-6 py-4">
                <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${deviceStyle}`}>
                  <DeviceIcon className="w-4 h-4" />
                  {user.device}
                </span>
              </td>

              {/* DATE */}
              <td className="px-6 py-4">
                <span className="rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                  {user.date}
                </span>
              </td>

            </tr>
          );
        })}

      </tbody>
    </table>
  </div>
</div>

    </div>
  );
}

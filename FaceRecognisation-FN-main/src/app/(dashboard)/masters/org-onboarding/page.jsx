"use client";

import { useEffect, useState } from "react";
import OrgOnboardingHandler from "@/handlers/OrgOnboardingHandler";

export default function OrgOnboardingMasterPage() {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);

  /* FETCH LIST */
  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await OrgOnboardingHandler.list();
      setRecords(res);
    } catch (err) {
      console.error("Failed to fetch list", err);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  /* TOGGLE ACTIVE (ONLY FOR SUBMITTED) */
  const toggleActive = async (row) => {
    if (row.status !== "SUBMITTED") return;

    const prev = row.is_active;
    const next = !prev;

    // optimistic UI
    setRecords((list) =>
      list.map((r) =>
        r.org_onboard_id === row.org_onboard_id ? { ...r, is_active: next } : r,
      ),
    );

    try {
      await OrgOnboardingHandler.updateStatus(row.org_onboard_id, next);
    } catch (err) {
      // rollback
      setRecords((list) =>
        list.map((r) =>
          r.org_onboard_id === row.org_onboard_id
            ? { ...r, is_active: prev }
            : r,
        ),
      );
    }
  };

  /* FILTER */
  const filteredRecords = records.filter((row) => {
    if (filter === "DRAFT") return row.status === "DRAFT";
    if (filter === "SUBMITTED") return row.status === "SUBMITTED";
    return true;
  });

  /* UI */
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Organization Onboarding Master
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage organization onboarding visibility
        </p>

        <div className="mt-4 rounded-xl border border-indigo-200 bg-indigo-50 px-6 py-4">
          <p className="text-sm text-indigo-800">
            <b>Draft</b> records are locked.
            <br />
            <b>Submitted</b> records can be activated or deactivated.
          </p>
        </div>

        <div className="mt-10 rounded-2xl bg-white shadow-lg border border-gray-100">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              Onboarding Records
            </h2>
            <span className="text-xs rounded-full bg-indigo-100 px-3 py-1 font-semibold text-indigo-700">
              Total: {records.length}
            </span>
          </div>

          <div className="px-6 pt-4 flex gap-3">
            {["ALL", "DRAFT", "SUBMITTED"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-1 text-sm font-semibold ${
                  filter === f
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm mt-4">
              <thead className="bg-gray-50 text-indigo-600">
                <tr>
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">Organization</th>
                  <th className="px-6 py-3 text-center">Status</th>
                  <th className="px-6 py-3 text-center">Active</th>
                </tr>
              </thead>

              <tbody className="divide-y text-gray-800">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-gray-400">
                      Loading...
                    </td>
                  </tr>
                ) : filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-gray-400">
                      No records
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((row) => {
                    const isLocked = row.status !== "SUBMITTED";
                    const isActive = row.is_active === true;

                    return (
                      <tr
                        key={row.org_onboard_id}
                        className="hover:bg-indigo-50"
                      >
                        <td className="px-6 py-3">{row.org_onboard_id}</td>
                        <td className="px-6 py-3">{row.org_detail_name}</td>

                        <td className="px-6 py-3 text-center">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              row.status === "SUBMITTED"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>

                        <td className="px-6 py-3 text-center">
                          <button
                            onClick={() => toggleActive(row)}
                            disabled={isLocked}
                            className={`px-3 py-1 rounded text-white transition
                              ${isActive ? "bg-green-600" : "bg-red-600"}
                              ${
                                isLocked
                                  ? "opacity-50 cursor-not-allowed"
                                  : "hover:opacity-90"
                              }
                            `}
                          >
                            {isActive ? "Active" : "Inactive"}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client'

import { useState, useEffect } from "react";
import DistrictMasterHandler from "@/handlers/DistrictMasterHandler";
import ApiService from "@/lib/ApiServiceFunctions";
import ApiEndPoints from "@/lib/ApiServiceEndpoint";

export default function DistrictMasterPage() {

  const [districts, setDistricts] = useState([]);
  const [states, setStates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [stateId, setStateId] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [districtSrno, setDistrictSrno] = useState("");

  /* ================= LOAD STATES ================= */
  useEffect(() => {
    const fetchStates = async () => {
      const res = await ApiService.get(ApiEndPoints.orgStates);
      if (res.data.success) {
        setStates(res.data.data || []);
      }
    };
    fetchStates();
  }, []);

  /* ================= LOAD DISTRICTS ================= */
  const loadDistricts = async () => {
    const res = await DistrictMasterHandler.list();
    if (res.success) {
      const mapped = res.data.map(d => ({
        id: d.org_district_id,
        name: d.org_district_name,
        stateId: d.org_state_id,
        srno: d.org_district_srno,
      }));
      setDistricts(mapped);
    }
  };

  useEffect(() => {
    loadDistricts();
  }, []);

  const resetForm = () => {
    setStateId("");
    setDistrictName("");
    setDistrictSrno("");
    setEditId(null);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stateId || !districtName) {
      alert("All fields required");
      return;
    }

    if (loading) return;
    setLoading(true);

    let res;

    if (editId) {
      res = await DistrictMasterHandler.update(
        editId,
        districtName,
        stateId,
        Number(districtSrno || 0),
        true
      );
    } else {
      res = await DistrictMasterHandler.create(
        districtName,
        stateId,
        Number(districtSrno || 0)
      );
    }

    if (res.success) {
      await loadDistricts();
      resetForm();
      setShowForm(false);
    }

    setLoading(false);
  };

  const handleEdit = (d) => {
    setEditId(d.id);
    setDistrictName(d.name);
    setStateId(d.stateId);
    setDistrictSrno(d.srno || "");
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const ok = confirm("Are you sure you want to delete this district?");
    if (!ok) return;

    await DistrictMasterHandler.delete(id);
    await loadDistricts();
  };

  /* ================= UI ================= */
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-gray-800">
          District Master
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Create and manage districts
        </p>

        {/* INFO BANNER */}
        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-indigo-800">
            To add or update district details, click the button below.
          </p>

          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="w-fit rounded-lg bg-indigo-700 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-800 transition"
          >
            Add District
          </button>
        </div>

        {/* ================= MODAL ================= */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">

            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowForm(false)}
            />

            <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl border border-gray-200">

              <h3 className="mb-1.5 text-lg font-semibold text-blue-800">
                District Details
              </h3>

              <p className="mb-6 text-sm text-gray-600">
                Enter district information and save it to the system.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">

                {editId && (
                  <div className="rounded-md bg-blue-50 px-4 py-2 text-sm text-blue-700 border border-blue-200">
                    You are editing an existing district.
                  </div>
                )}

                {/* State */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900">
                    Select State
                  </label>

                  <select
                    value={stateId}
                    onChange={(e) => setStateId(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-gray-400 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                  >
                    <option value="">- Select State -</option>
                    {states.map(s => (
                      <option key={s.org_state_id} value={s.org_state_id}>
                        {s.org_state_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900">
                    District Name
                  </label>

                  <input
                    value={districtName}
                    onChange={(e) => setDistrictName(e.target.value)}
                    placeholder="Enter district name"
                    className="mt-2 w-full rounded-lg border border-gray-400 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                  />
                </div>

                {/* Serial */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900">
                    Serial Number
                  </label>

                  <input
                    value={districtSrno}
                    onChange={(e) => setDistrictSrno(e.target.value)}
                    placeholder="Enter serial number"
                    className="mt-2 w-full rounded-lg border border-gray-400 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-indigo-700 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-800 disabled:opacity-50"
                  >
                    {loading ? "Saving..." : editId ? "Update District" : "Save District"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="rounded-lg border px-6 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* ================= TABLE ================= */}
        <div className="mt-12 rounded-2xl bg-white shadow-lg border border-gray-100">

          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                District Records
              </h2>
              <p className="text-sm text-gray-500">
                List of all registered districts
              </p>
            </div>

            <span className="text-xs rounded-full bg-indigo-100 px-3 py-1 font-semibold text-indigo-700">
              Total: {districts.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-indigo-600">
                <tr>
                  <th className="px-6 py-3 text-left">#</th>
                  <th className="px-6 py-3 text-left">State ID</th>
                  <th className="px-6 py-3 text-left">District</th>
                  <th className="px-6 py-3 text-left">Serial</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {districts.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-400">
                      No district records available
                    </td>
                  </tr>
                ) : (
                  districts.map((d, i) => (
                    <tr
                      key={d.id}
                      className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-indigo-50 transition`}
                    >
                      <td className="px-6 py-3  text-gray-700">{i + 1}</td>
                      <td className="px-6 py-3  text-gray-700">{d.stateId}</td>
                      <td className="px-6 py-3 font-medium text-gray-600">
                        {d.name}
                      </td>
                      <td className="px-6 py-3">
                        <span className="rounded-full px-3 py-1 text-xs font-semibold text-indigo-700">
                          {d.srno}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right space-x-3">
                        <button
                          onClick={() => handleEdit(d)}
                          className="text-blue-600 font-medium hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(d.id)}
                          className="text-red-600 font-medium hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
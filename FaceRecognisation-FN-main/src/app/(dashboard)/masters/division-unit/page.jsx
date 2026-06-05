'use client'

import { useState, useEffect } from "react";
import DivUnitInOrgHandler from "@/handlers/DivUnitInOrgHandler";

export default function DivisionUnitMasterPage() {

  const [divisions, setDivisions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    divisionName: "",
    divisionSrno: "",
  });

  /* ================= LOAD ================= */
  const loadDivisions = async () => {
    const res = await DivUnitInOrgHandler.list();

    if (res.success) {
      const mapped = res.data.map((d) => ({
        id: d.div_unit_in_org_id,
        divisionName: d.div_unit_in_org_name,
        divisionSrno: d.div_unit_in_org_srno,
      }));
      setDivisions(mapped);
    }
  };

  useEffect(() => {
    loadDivisions();
  }, []);

  /* ================= CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "divisionName" && !/^[a-zA-Z\s]*$/.test(value)) return;
    if (name === "divisionSrno" && !/^[0-9]*$/.test(value)) return;

    setForm({ ...form, [name]: value });
  };

  const resetForm = () => {
    setForm({ divisionName: "", divisionSrno: "" });
    setEditId(null);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.divisionName || !form.divisionSrno) {
      alert("All fields required");
      return;
    }

    let res;

    if (editId) {
      res = await DivUnitInOrgHandler.update(editId, {
        div_unit_in_org_name: form.divisionName,
        div_unit_in_org_srno: Number(form.divisionSrno),
      });
    } else {
      res = await DivUnitInOrgHandler.create({
        name: form.divisionName,
        srno: Number(form.divisionSrno),
      });
    }

    if (res?.success) {
      await loadDivisions();
      resetForm();
      setShowForm(false);
    }
  };

  const handleEdit = (row) => {
    setEditId(row.id);
    setForm(row);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this division?")) return;

    await DivUnitInOrgHandler.delete(id);
    await loadDivisions();
  };

  /* ================= UI ================= */
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-gray-800">
          Division / Unit within Organization Master
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Create and manage divisions within organization
        </p>

        {/* INFO BANNER */}
        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-indigo-800">
            To add or update division details, click the button below.
          </p>

          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="w-fit rounded-lg bg-indigo-700 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-800 transition"
          >
            Add Division
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
                Division Details
              </h3>

              <p className="mb-6 text-sm text-gray-600">
                Enter division information and save it to the system.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">

                {editId && (
                  <div className="rounded-md bg-blue-50 px-4 py-2 text-sm text-blue-700 border border-blue-200">
                    You are editing an existing division.
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-900">
                    Division Name
                  </label>
                  <input
                    name="divisionName"
                    value={form.divisionName}
                    onChange={handleChange}
                    placeholder="Enter division name"
                    className="mt-2 w-full rounded-lg border border-gray-400 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900">
                    Division Serial Number
                  </label>
                  <input
                    name="divisionSrno"
                    value={form.divisionSrno}
                    onChange={handleChange}
                    placeholder="Enter serial number"
                    className="mt-2 w-full rounded-lg border border-gray-400 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="submit"
                    className="rounded-lg bg-indigo-700 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-800"
                  >
                    {editId ? "Update Division" : "Save Division"}
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
                Division Records
              </h2>
              <p className="text-sm text-gray-500">
                List of all registered divisions
              </p>
            </div>

            <span className="text-xs rounded-full bg-indigo-100 px-3 py-1 font-semibold text-indigo-700">
              Total: {divisions.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-indigo-600">
                <tr>
                  <th className="px-6 py-3 text-left">#</th>
                  <th className="px-6 py-3 text-left">Division</th>
                  <th className="px-6 py-3 text-left">Serial</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {divisions.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-gray-400">
                      No division records available
                    </td>
                  </tr>
                ) : (
                  divisions.map((d, i) => (
                    <tr
                      key={d.id}
                      className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-indigo-50 transition`}
                    >
                      <td className="px-6 py-3  text-gray-700">{i + 1}</td>
                      <td className="px-6 py-3 font-medium text-gray-600">
                        {d.divisionName}
                      </td>
                      <td className="px-6 py-3">
                        <span className="rounded-full px-3 py-1 text-xs font-semibold text-indigo-700">
                          {d.divisionSrno}
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
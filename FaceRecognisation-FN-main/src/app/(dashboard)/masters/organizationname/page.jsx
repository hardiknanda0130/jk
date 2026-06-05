'use client'

import { useState, useEffect } from "react";
import UserOrgNameHandler from "@/handlers/UserOrgNameHandler";

export default function OrganizationNameMasterPage() {

  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [organizations, setOrganizations] = useState([]);

  const [form, setForm] = useState({
    organizationName: "",
    organizationSrno: "",
  });

  /* ================= LOAD ================= */
  const loadOrganizations = async () => {
    const res = await UserOrgNameHandler.list();
    if (res.success) {
      setOrganizations(
        res.data.map((o) => ({
          id: o.user_org_name_id,
          organizationName: o.user_org_name,
          organizationCode: o.user_org_name_srno,
        }))
      );
    }
  };

  useEffect(() => {
    loadOrganizations();
  }, []);

  /* ================= VALIDATION ================= */
  const validateForm = () => {
    const newErrors = {};

    if (!form.organizationName.trim()) {
      newErrors.organizationName = "Organization name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(form.organizationName)) {
      newErrors.organizationName = "Only letters and spaces allowed";
    }

    if (!form.organizationSrno) {
      newErrors.organizationSrno = "Serial number is required";
    } else if (!/^[0-9]+$/.test(form.organizationSrno)) {
      newErrors.organizationSrno = "Only numbers allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "organizationName" && !/^[a-zA-Z\s]*$/.test(value)) return;
    if (name === "organizationSrno" && !/^[0-9]*$/.test(value)) return;

    setForm({ ...form, [name]: value });
  };

  const resetForm = () => {
    setForm({ organizationName: "", organizationSrno: "" }); // ✅ fixed
    setEditId(null);
    setErrors({});
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    let res;

    if (editId) {
      res = await UserOrgNameHandler.update(
        editId,
        form.organizationName.trim(),
        Number(form.organizationSrno),
        true
      );
    } else {
      res = await UserOrgNameHandler.create(
        form.organizationName.trim(),
        Number(form.organizationSrno),
        true
      );
    }

    if (res.success) {
      await loadOrganizations();
      resetForm();
      setShowForm(false);
    }
  };

  const handleEdit = (row) => {
    setEditId(row.id);
    setForm({
      organizationName: row.organizationName,
      organizationSrno: String(row.organizationCode),
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this organization?")) return;
    await UserOrgNameHandler.delete(id);
    await loadOrganizations();
  };

  /* ================= UI ================= */
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-gray-800">
          Organization Name Master
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Create and manage organization names
        </p>

        {/* INFO BANNER */}
        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-indigo-800">
            Click below to add or update organization name details.
          </p>

          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="w-fit rounded-lg bg-indigo-700 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-800 transition"
          >
            Add Organization
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
                Organization Details
              </h3>

              <p className="mb-6 text-sm text-gray-600">
                Enter organization name and serial number.
              </p>

              {editId && (
                <div className="mb-4 rounded-md bg-blue-50 px-4 py-2 text-sm text-blue-700 border border-blue-200">
                  You are editing an existing organization.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">

                <div>
                  <label className="block text-sm font-semibold text-gray-900">
                    Organization Name
                  </label>
                  <input
                    name="organizationName"
                    value={form.organizationName}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-gray-400 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                  />
                  {errors.organizationName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.organizationName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900">
                    Organization Serial Number
                  </label>
                  <input
                    name="organizationSrno"
                    value={form.organizationSrno}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-gray-400 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                  />
                  {errors.organizationSrno && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.organizationSrno}
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="submit"
                    className="rounded-lg bg-indigo-700 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-800"
                  >
                    {editId ? "Update Organization" : "Save Organization"}
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
                Organization Records
              </h2>
              <p className="text-sm text-gray-500">
                List of all registered organizations
              </p>
            </div>

            <span className="text-xs rounded-full bg-indigo-100 px-3 py-1 font-semibold text-indigo-700">
              Total: {organizations.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-indigo-600">
                <tr>
                  <th className="px-6 py-3 text-left">#</th>
                  <th className="px-6 py-3 text-left">Organization</th>
                  <th className="px-6 py-3 text-left">Serial</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {organizations.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-gray-400">
                      No records found
                    </td>
                  </tr>
                ) : (
                  organizations.map((o, i) => (
                    <tr
                      key={o.id}
                      className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-indigo-50 transition`}
                    >
                      <td className="px-6 py-3  text-gray-700">{i + 1}</td>
                      <td className="px-6 py-3 font-medium text-gray-600">
                        {o.organizationName}
                      </td>
                      <td className="px-6 py-3">
                        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                          {o.organizationCode}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right space-x-3">
                        <button
                          onClick={() => handleEdit(o)}
                          className="text-blue-600 font-medium hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(o.id)}
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
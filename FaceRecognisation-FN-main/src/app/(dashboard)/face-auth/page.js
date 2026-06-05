"use client";

import { useState, useEffect } from "react";


import handlers from "@/handlers/org-handler";

export default function OrganizationMasterPage() {

  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});

  
const validateForm = () => {
  const newErrors = {};

  // 🔤 Organization Name → sirf letters + space
  if (!form.orgName.trim()) {
    newErrors.orgName = "Organization name is required";
  } else if (!/^[a-zA-Z\s]+$/.test(form.orgName)) {
    newErrors.orgName = "Only letters and spaces are allowed";
  }

  // 🔢 Serial Number → sirf numbers
  if (form.orgSerial === "") {
    newErrors.orgSerial = "Serial number is required";
  } else if (!/^[0-9]+$/.test(form.orgSerial)) {
    newErrors.orgSerial = "Only numbers are allowed";
  }

  setErrors(newErrors);

  // ❌ errors hai → false
  // ✅ errors nahi → true
  return Object.keys(newErrors).length === 0;
};


  /* =========================
     STATE: ORGANISATION LIST
     ========================= */
  const [getOrganisationTypes, setOrganisationTypes] = useState([]);

  /* =========================
     FETCH LIST ON PAGE LOAD
     ========================= */
  useEffect(() => {
    const fetchOrgTypes = async () => {
      const result = await handlers.list();
      setOrganisationTypes(result.data); //  
    };
    fetchOrgTypes();
  }, []);

  /* =========================
     EDIT MODE STATE
     ========================= */
  const [editId, setEditId] = useState(null);

  /* =========================
     FORM STATE
     ========================= */
  const [form, setForm] = useState({
    orgName: "",
    orgSerial: "",
    status: "Active",
  });

  /* =========================
     HANDLE EDIT CLICK
     ========================= */
  const handleEdit = (org) => {
    setEditId(org.org_type_id);

    setForm({
      orgName: org.org_type_name,
      orgSerial: org.org_type_srno,
      status: "Active",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* =========================
     HANDLE INPUT CHANGE
     ========================= */
 const handleChange = (e) => {
  const { name, value } = e.target;

  // 🛑 Name field → sirf letters + space
  if (name === "orgName") {
    if (!/^[a-zA-Z\s]*$/.test(value)) return;
  }

  // 🛑 Serial field → sirf numbers
  if (name === "orgSerial") {
    if (!/^[0-9]*$/.test(value)) return;
  }

  setForm({ ...form, [name]: value });
};


  /* =========================
     CREATE / UPDATE SUBMIT
     ========================= */
     
const resetForm = () => {
  setForm({
    orgName: "",
    orgSerial: "",
    status: "Active",
  });
  setEditId(null);
};


const handleSubmit = async (e) => {
  e.preventDefault();

  let res;

  if (editId) {
    res = await handlers.update(
      editId,
      form.orgName,
      Number(form.orgSerial)
    );
  } else {
    res = await handlers.create(
      form.orgName,
      Number(form.orgSerial)
    );
  }

  // ✅ JAB SAVE / UPDATE SUCCESS HO
  if (res.success) {
    alert(res.message);

    const refreshed = await handlers.list();
    setOrganisationTypes(refreshed.data);

    resetForm();        // 🧹 clear form
    setShowForm(false); // ❌ popup band
  }
};




  /* =========================
     DELETE ORGANISATION
     ========================= */
  const handleDelete = async (id) => {
    const ok = confirm("Are you sure you want to delete this organization?");
    if (!ok) return;

    const res = await handlers.delete(id);

    if (res.success) {
      alert(res.message);

      const refreshed = await handlers.list();
      setOrganisationTypes(refreshed.data);
    }
  };

  /* =========================
     UI
     ========================= */
  return (
    <div className="flex min-h-screen bg-gray-100">
  

      <div className="flex-1">
     

        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Organization Master
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Create and manage organizations
          </p>


{/* ===== INFO BANNER ===== */}
<div className="mt-4 flex flex-col gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
  <p className="text-sm text-indigo-800">
    To add or update organization details, please click the button below.
  </p>

  <button
    onClick={() => setShowForm(true)}
    className="w-fit rounded-lg bg-indigo-700 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-800 transition"
  >
    Add Organization Details
  </button>
</div>

          {/* ================= FORM ================= */}
{showForm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">

    {/* Background Blur */}
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      onClick={() => {
  resetForm();
  setShowForm(false);
}}

    />

    {/* Modal Box */}
    <div
      className="relative z-10 w-full max-w-2xl 
                 rounded-2xl bg-white p-8 shadow-2xl 
                 border border-gray-200 text-gray-900
                 animate-modal"
    >
      <h3 className="mb-1 text-lg font-semibold text-gray-800">
        Organization Details
      </h3>

      <p className="mb-6 text-sm text-gray-600">
        Enter organization information and save it to the system.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {editId && (
          <div className="rounded-md bg-blue-50 px-4 py-2 text-sm text-blue-700 border border-blue-200">
            You are editing an existing organization.
          </div>
        )}

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Organization Name
          </label>
          <input
  type="text"
  name="orgName"
  value={form.orgName}
  onChange={handleChange}
  placeholder="Enter your organization name here"
  className="mt-2 w-full rounded-lg border border-gray-300 
             bg-white px-4 py-2 text-sm text-gray-900
             placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>


{errors.orgName && (
  <p className="mt-1 text-sm text-red-600">
    {errors.orgName}
  </p>
)}

        </div>

        {/* Serial */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Organization Serial Number
          </label>
          <input
  type="text"
  name="orgSerial"
  value={form.orgSerial}
  onChange={handleChange}
  placeholder="Enter organization serial number"
  className="mt-2 w-full rounded-lg border border-gray-300 
             bg-white px-4 py-2 text-sm text-gray-900
             placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>


{errors.orgSerial && (
  <p className="mt-1 text-sm text-red-600">
    {errors.orgSerial}
  </p>
)}

        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="submit"
            className="rounded-lg bg-indigo-700 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-800"
          >
            {editId ? "Update Organization" : "Save Organization"}
          </button>

          <button
  type="button"
  onClick={() => {
    resetForm();
    setShowForm(false);
  }}
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
      Total: {getOrganisationTypes.length}
    </span>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead className="bg-gray-50 text-indigo-600">
        <tr>
          <th className="px-6 py-3 text-left">#</th>
          <th className="px-6 py-3 text-left">Organization Name</th>
          <th className="px-6 py-3 text-left">Serial No</th>
          <th className="px-6 py-3 text-right">Actions</th>
        </tr>
      </thead>

   <tbody className="divide-y">
  {getOrganisationTypes.length === 0 ? (
    <tr>
      <td colSpan="4" className="py-8 text-center text-gray-400">
        No organization records available
      </td>
    </tr>
  ) : (
    getOrganisationTypes.map((org, index) => (
      <tr
        key={org.org_type_id}
        className={`
          transition
          ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
          hover:bg-indigo-50
        `}
      >
        {/* Sr No */}
        <td className="px-6 py-3 text-gray-700">
          {index + 1}
        </td>

        {/* Organization Name */}
        <td className="px-6 py-3 font-medium text-gray-500">
          {org.org_type_name}
        </td>

        {/* Serial No */}
        <td className="px-6 py-3">
          <span className="rounded-full px-3 py-1 text-xs font-semibold text-indigo-700">
            {org.org_type_srno}
          </span>
        </td>

        {/* Actions */}
        <td className="px-6 py-3 text-right space-x-3">
          <button
            onClick={() => handleEdit(org)}
            className="text-blue-600 font-medium hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(org.org_type_id)}
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
    </div>
  );
}

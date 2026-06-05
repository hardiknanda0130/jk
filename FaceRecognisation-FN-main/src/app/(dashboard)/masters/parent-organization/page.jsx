'use client'

import { useEffect, useState } from 'react'
import ParentMasterHandler from '@/handlers/ParentMasterHandler'

export default function ParentOrganizationPage() {

  const [parentOrgs, setParentOrgs] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)

  const [form, setForm] = useState({
    name: '',
    serial: ''
  })

  /* ================= LOAD LIST ================= */
  const loadList = async () => {
    try {
      const res = await ParentMasterHandler.list()

      if (res.success) {
        const mapped = res.data.map(p => ({
          id: p.parent_org_id,
          name: p.parent_org_name,
          serial: p.parent_org_srno,
          status: p.parent_org_status ? 'Active' : 'Inactive'
        }))

        setParentOrgs(mapped)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    loadList()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'name' && !/^[a-zA-Z\s]*$/.test(value)) return
    if (name === 'serial' && !/^[0-9]*$/.test(value)) return

    setForm({ ...form, [name]: value })
  }

  const resetForm = () => {
    setForm({ name: '', serial: '' })
    setEditId(null)
  }

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.name || !form.serial) {
      alert('All fields are required')
      return
    }

    try {
      let res

      if (editId) {
        res = await ParentMasterHandler.update(
          editId,
          form.name,
          form.serial
        )
      } else {
        res = await ParentMasterHandler.create(
          form.name,
          form.serial
        )
      }

      if (res.success) {
        alert(res.message)
        await loadList()
        resetForm()
        setShowForm(false)
      }

    } catch (err) {
      console.error(err)
    }
  }

  const handleEdit = (org) => {
    setEditId(org.id)
    setForm({
      name: org.name,
      serial: org.serial
    })
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    const ok = confirm('Are you sure you want to delete this parent organization?')
    if (!ok) return

    try {
      const res = await ParentMasterHandler.delete(id)
      if (res.success) {
        alert(res.message)
        await loadList()
      }
    } catch (err) {
      console.error(err)
    }
  }

  /* ================= UI ================= */
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-gray-800">
          Parent Organization Master
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Create and manage parent organizations
        </p>

        {/* ===== INFO BANNER ===== */}
        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-indigo-800">
            To add or update parent organization details, click the button below.
          </p>

          <button
            onClick={() => {
              resetForm()
              setShowForm(true)
            }}
            className="w-fit rounded-lg bg-indigo-700 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-800 transition"
          >
            Add Parent Organization
          </button>
        </div>

        {/* ================= MODAL ================= */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">

            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => {
                resetForm()
                setShowForm(false)
              }}
            />

            <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl border border-gray-200">

              <h3 className="mb-1.5 text-lg font-semibold text-blue-800">
                Parent Organization Details
              </h3>

              <p className="mb-6 text-sm text-gray-600">
                Enter parent organization information and save it.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">

                {editId && (
                  <div className="rounded-md bg-blue-50 px-4 py-2 text-sm text-blue-700 border border-blue-200">
                    You are editing an existing parent organization.
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-900">
                    Parent Organization Name
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter parent organization name"
                    className="mt-2 w-full rounded-lg border border-gray-400 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900">
                    Serial Number
                  </label>

                  <input
                    name="serial"
                    value={form.serial}
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
                    {editId ? 'Update Parent Organization' : 'Save Parent Organization'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      resetForm()
                      setShowForm(false)
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
                Parent Organization Records
              </h2>
              <p className="text-sm text-gray-500">
                List of all registered parent organizations
              </p>
            </div>

            <span className="text-xs rounded-full bg-indigo-100 px-3 py-1 font-semibold text-indigo-700">
              Total: {parentOrgs.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-indigo-600">
                <tr>
                  <th className="px-6 py-3 text-left">#</th>
                  <th className="px-6 py-3 text-left">Parent Organization</th>
                  <th className="px-6 py-3 text-left">Serial</th>
                  <th className="px-6 py-3 text-right">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {parentOrgs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-400">
                      No parent organizations available
                    </td>
                  </tr>
                ) : (
                  parentOrgs.map((org, i) => (
                    <tr
                      key={org.id}
                      className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50 transition`}
                    >
                      <td className="px-6 py-3  text-gray-700"> {i + 1}
</td>

                      <td className="px-6 py-3 font-medium text-gray-700">
                        {org.name}
                      </td>

                      <td className="px-6 py-3">
                        <span className="rounded-full px-3 py-1 text-xs font-semibold text-indigo-700">
                          {org.serial}
                        </span>
                      </td>

                      <td className="px-6 py-3 text-right">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          org.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {org.status}
                        </span>
                      </td>

                      <td className="px-6 py-3 text-right space-x-3">
                        <button
                          onClick={() => handleEdit(org)}
                          className="text-blue-600 font-medium hover:underline"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(org.id)}
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
  )
}
'use client'

import { useState, useEffect } from 'react'
import UserTypeHandler from '@/handlers/UserTypeHandler'

export default function UserTypeMasterPage() {

  const [userTypes, setUserTypes] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    userTypeName: '',
    userTypeCode: ''
  })

  /* ================= LOAD ================= */
  const loadUserTypes = async () => {
    const res = await UserTypeHandler.list()

    if (res.success) {
      const mapped = res.data.map(u => ({
        id: u.user_type_id,
        userTypeName: u.user_type_name,
        userTypeCode: u.user_type_code
      }))
      setUserTypes(mapped)
    }
  }

  useEffect(() => {
    loadUserTypes()
  }, [])

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'userTypeName' && !/^[a-zA-Z\s]*$/.test(value)) return
    if (name === 'userTypeCode' && !/^[0-9]*$/.test(value)) return

    setForm({ ...form, [name]: value })
  }

  const resetForm = () => {
    setForm({ userTypeName: '', userTypeCode: '' })
    setEditId(null)
  }

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.userTypeName || !form.userTypeCode) {
      alert('All fields are required')
      return
    }

    if (loading) return
    setLoading(true)

    let res

    if (editId) {
      res = await UserTypeHandler.update(
        editId,
        form.userTypeName,
        form.userTypeCode
      )
    } else {
      res = await UserTypeHandler.create(
        form.userTypeName,
        form.userTypeCode
      )
    }

    if (res.success) {
      await loadUserTypes()
      resetForm()
      setShowForm(false)
    }

    setLoading(false)
  }

  const handleEdit = (row) => {
    setEditId(row.id)
    setForm(row)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    const ok = confirm('Are you sure you want to delete this user type?')
    if (!ok) return

    await UserTypeHandler.delete(id)
    await loadUserTypes()
  }

  /* ================= UI ================= */
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-gray-800">
          User Type Master
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Create and manage user types
        </p>

        {/* INFO BANNER */}
        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-indigo-800">
            To add or update user type details, click the button below.
          </p>

          <button
            onClick={() => {
              resetForm()
              setShowForm(true)
            }}
            className="w-fit rounded-lg bg-indigo-700 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-800 transition"
          >
            Add User Type
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
                User Type Details
              </h3>

              <p className="mb-6 text-sm text-gray-600">
                Enter user type information and save it to the system.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">

                {editId && (
                  <div className="rounded-md bg-blue-50 px-4 py-2 text-sm text-blue-700 border border-blue-200">
                    You are editing an existing user type.
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-900">
                    User Type Name
                  </label>
                  <input
                    name="userTypeName"
                    value={form.userTypeName}
                    onChange={handleChange}
                    placeholder="Enter user type name"
                    className="mt-2 w-full rounded-lg border border-gray-400 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900">
                    User Type Code
                  </label>
                  <input
                    name="userTypeCode"
                    value={form.userTypeCode}
                    onChange={handleChange}
                    placeholder="Enter user type code"
                   className="mt-2 w-full rounded-lg border border-gray-400 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-indigo-700 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-800 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : editId ? 'Update User Type' : 'Save User Type'}
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
                User Type Records
              </h2>
              <p className="text-sm text-gray-500">
                List of all registered user types
              </p>
            </div>

            <span className="text-xs rounded-full bg-indigo-100 px-3 py-1 font-semibold text-indigo-700">
              Total: {userTypes.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-indigo-600">
                <tr>
                  <th className="px-6 py-3 text-left">#</th>
                  <th className="px-6 py-3 text-left">User Type</th>
                  <th className="px-6 py-3 text-left">Code</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {userTypes.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-gray-400">
                      No user type records available
                    </td>
                  </tr>
                ) : (
                  userTypes.map((u, i) => (
                    <tr
                      key={u.id}
                      className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50 transition`}
                    >
                      <td className="px-6 py-3  text-gray-700">{i + 1}</td>

                      <td className="px-6 py-3 font-medium text-gray-600">
                        {u.userTypeName}
                      </td>

                      <td className="px-6 py-3">
                        <span className="rounded-full px-3 py-1 text-xs font-semibold text-indigo-700">
                          {u.userTypeCode}
                        </span>
                      </td>

                      <td className="px-6 py-3 text-right space-x-3">
                        <button
                          onClick={() => handleEdit(u)}
                          className="text-blue-600 font-medium hover:underline"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(u.id)}
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
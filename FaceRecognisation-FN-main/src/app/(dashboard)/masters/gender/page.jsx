'use client'

import { useState, useEffect } from 'react'
import GenderMasterHandler from '@/handlers/GenderMasterHandler'

export default function GenderMasterPage() {

  const [genders, setGenders] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    genderName: '',
    genderCode: ''
  })

  /* ================= LOAD LIST ================= */
  const loadList = async () => {
    try {
      const res = await GenderMasterHandler.list()

      if (res.success) {
        const mapped = res.data.map(g => ({
          id: g.gender_id,
          genderName: g.gender_name,
          genderCode: g.gender_srno
        }))
        setGenders(mapped)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    loadList()
  }, [])

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'genderName' && !/^[a-zA-Z\s]*$/.test(value)) return
    if (name === 'genderCode' && !/^[0-9]*$/.test(value)) return

    setForm({ ...form, [name]: value })
  }

  const resetForm = () => {
    setForm({ genderName: '', genderCode: '' })
    setEditId(null)
  }

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.genderName || !form.genderCode) {
      alert('All fields are required')
      return
    }

    if (loading) return
    setLoading(true)

    try {
      let res

      if (editId) {
        res = await GenderMasterHandler.update(
          editId,
          form.genderName,
          form.genderCode
        )
      } else {
        res = await GenderMasterHandler.create(
          form.genderName,
          form.genderCode
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
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (row) => {
    setEditId(row.id)
    setForm({
      genderName: row.genderName,
      genderCode: row.genderCode
    })
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    const ok = confirm('Are you sure you want to delete this gender?')
    if (!ok) return

    try {
      const res = await GenderMasterHandler.delete(id)
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
          Gender Master
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Create and manage gender records
        </p>

        {/* ===== INFO BANNER ===== */}
        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-indigo-800">
            To add or update gender details, please click the button below.
          </p>

          <button
            onClick={() => {
              resetForm()
              setShowForm(true)
            }}
            className="w-fit rounded-lg bg-indigo-700 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-800 transition"
          >
            Add Gender Details
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
                Gender Details
              </h3>

              <p className="mb-6 text-sm text-gray-600">
                Enter gender information and save it to the system.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">

                {editId && (
                  <div className="rounded-md bg-blue-50 px-4 py-2 text-sm text-blue-700 border border-blue-200">
                    You are editing an existing gender.
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900">
                    Gender Name
                  </label>

                  <input
                    name="genderName"
                    value={form.genderName}
                    onChange={handleChange}
                    placeholder="Enter gender name"
                    className="mt-2 w-full rounded-lg border border-gray-400 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                  />
                </div>

                {/* Code */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900">
                    Gender Code
                  </label>

                  <input
                    name="genderCode"
                    value={form.genderCode}
                    onChange={handleChange}
                    placeholder="1 / 2 / 3"
                    className="mt-2 w-full rounded-lg border border-gray-400 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-indigo-700 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-800"
                  >
                    {loading ? 'Saving...' : editId ? 'Update Gender' : 'Save Gender'}
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
                Gender Records
              </h2>
              <p className="text-sm text-gray-500">
                List of all registered genders
              </p>
            </div>

            <span className="text-xs rounded-full bg-indigo-100 px-3 py-1 font-semibold text-indigo-700">
              Total: {genders.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-indigo-600">
                <tr>
                  <th className="px-6 py-3 text-left">#</th>
                  <th className="px-6 py-3 text-left">Gender</th>
                  <th className="px-6 py-3 text-left">Code</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {genders.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-gray-400">
                      No gender records available
                    </td>
                  </tr>
                ) : (
                  genders.map((g, i) => (
                    <tr
                      key={g.id}
                      className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50 transition`}
                    >
                      <td className="px-6 py-3  text-gray-700">{i + 1}</td>

                      <td className="px-6 py-3 font-medium text-gray-600">
                        {g.genderName}
                      </td>

                      <td className="px-6 py-3">
                        <span className="rounded-full px-3 py-1 text-xs font-semibold text-indigo-700">
                          {g.genderCode}
                        </span>
                      </td>

                      <td className="px-6 py-3 text-right space-x-3">
                        <button
                          onClick={() => handleEdit(g)}
                          className="text-blue-600 font-medium hover:underline"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(g.id)}
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
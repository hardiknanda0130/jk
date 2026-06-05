"use client";

export default function TransferManualPage() {

  const manuals = [
    {
      id: 1,
      title: "Transfer Manual",
      file: "/Transfer_manual.pdf",
      uploadDate: "2026-07-01",
    },
    {
      id: 2,
      title: "Transfer Policy Guidelines",
      file: "/Transfer_guidelines.pdf",
      uploadDate: "2026-03-10",
    },
  ];

  const latestDate = Math.max(
    ...manuals.map((m) => new Date(m.uploadDate).getTime())
  );

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Transfer Manual
        </h1>

        <p className="mt-2 max-w-3xl text-sm text-gray-600">
          This section contains official transfer manuals and policy
          guidelines. You may view or download documents for reference.
        </p>
      </div>

      {/* MODERN TABLE CARD */}
      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-md border border-gray-200">

        <table className="w-full text-sm">

          {/* TABLE HEADER */}
          <thead className="bg-indigo-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-indigo-700">
                #
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-indigo-700">
                Document Title
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-indigo-700">
                Uploaded On
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-indigo-700">
                Actions
              </th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody className="divide-y divide-gray-100">

            {manuals.map((item, index) => (
              <tr
                key={item.id}
                className="group transition hover:bg-indigo-50/60"
              >

                {/* INDEX */}
                <td className="px-6 py-4 text-gray-500 font-medium">
                  {index + 1}
                </td>

                {/* TITLE */}
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">

                    <div className="flex items-center gap-2">
                      <span className="text-gray-900 font-semibold">
                        {item.title}
                      </span>

                      {/* NEW BADGE */}
                      {new Date(item.uploadDate).getTime() === latestDate && (
                        <span className="rounded-full bg-red-100 px-2 py-0.5 
                                         text-[10px] font-bold text-red-700">
                          NEW
                        </span>
                      )}
                    </div>

                    <span className="text-xs text-gray-500">
                      PDF Document
                    </span>

                  </div>
                </td>

                {/* DATE */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(item.uploadDate)
                    .toLocaleDateString("en-GB")}
                </td>

                {/* ACTIONS */}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">

                    {/* VIEW */}
                    <a
                      href={item.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-lg 
                                 border border-indigo-600 px-4 py-2 
                                 text-xs font-semibold text-indigo-600
                                 hover:bg-indigo-50 transition"
                    >
                      View PDF
                    </a>

                    {/* DOWNLOAD */}
                    <a
                      href={item.file}
                      download
                      className="inline-flex items-center rounded-lg 
                                 bg-indigo-700 px-4 py-2 
                                 text-xs font-semibold text-white
                                 hover:bg-indigo-800 transition"
                    >
                      Download
                    </a>

                  </div>
                </td>

              </tr>
            ))}

          </tbody>
        </table>

      </div>

    </div>
  );
}
  
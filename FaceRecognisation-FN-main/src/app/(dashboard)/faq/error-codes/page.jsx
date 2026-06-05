"use client";

export default function ErrorCodesPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">

        {/* Page Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Error Codes on Biometric Attendance System (BAS) Developed By NIC punjab 

          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Common error codes, their causes, and solutions for biometric attendance.
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-xl bg-white p-6 shadow-md border border-gray-200">

          {/* Error Codes Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left text-sm font-semibold text-indigo-600">
                    Error Code
                  </th>
                  <th className="py-3 text-left text-sm font-semibold text-indigo-600">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {[
                  ["300", "Biometric Mismatch"],
                  ["330", "Biometric locked. Kindly contact UIDAI Helpline."],
                  ["500", "Invalid encryption of Skey."],
                  ["502", "Invalid encryption of PID"],
                  ["511", "Invalid PID XML format"],
                  ["561", "Request expired"],
                  ["562", "Device Time is wrong"],
                  ["800", "Invalid Biometric data."],
                  ["811", "Missing biometric data in CIDR for the given Aadhaar number."],
                  ["951", "Biometric lock related technical error. Kindly contact UIDAI Helpline."],
                  ["997", "Biometric corrupt in UIDAI."],
                  ["998", "Template not in Aadhaar. Try after 15 minutes"],
                  ["1201", "ASA Connectivity Lost to UIDAI."],
                  ["1204", "No Response from UIDAI."],
                  ["1205 / 9904", "Delay in response from AUA/ASA to UIDAI."],
                  ["9901", "Technical Error."],
                  ["9902", "User Not Registered."],
                  ["9903", "Invalid Device."],
                  ["9904", "Fluctuation in Authentication Setup. Please try again."],
                  ["9905", "Issue in response from UIDAI server."],
                  ["9906", "Attendance ID is Blocked. Contact Nodal Officer."],
                  ["9907", "Not activated by Nodal Officer to mark attendance."],
                  ["7010", "Error in response from UIDAI. Please try again."],
                ].map(([code, desc]) => (
                  <tr key={code} className="border-b last:border-none hover:bg-gray-50">
                    <td className="py-2 font-medium">{code}</td>
                    <td className="py-2">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* RD Service Error Codes */}
          <h3 className="mt-8 mb-3 text-lg font-semibold text-gray-800">
            RD Service Error Codes
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm text-gray-700">
              <tbody>
                {[
                  ["521 / 524 / 527 / 812", "Failure from Device Vendor Service."],
                  ["700", "Scan your finger within the stipulated time."],
                  ["720", "Device Initialization Error. Restart device."],
                  ["730", "Finger capture issue. Place finger properly."],
                  ["740", "Device not Registered. Contact Vendor."],
                  ["822", "Internal Error. Reboot Device."],
                  ["900", "Device not authorised for AEBAS."],
                ].map(([code, desc]) => (
                  <tr key={code} className="border-b last:border-none hover:bg-gray-50">
                    <td className="py-2 font-medium">{code}</td>
                    <td className="py-2">{desc}</td>
                  </tr>
                ))}

                <tr className="bg-red-50">
                  <td className="py-2 font-semibold text-red-600">
                    Data Sign Failed
                  </td>
                  <td className="py-2 text-red-600">
                    Go to Settings → Apps → Mantra Management Client → Clear Data.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Abbreviations */}
          <h3 className="mt-8 mb-2 text-lg font-semibold text-emerald-600">
            Abbreviations & Meanings
          </h3>

          <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
            <li><strong>Skey</strong> – Session Key</li>
            <li><strong>PID</strong> – Personal Identity Data</li>
            <li><strong>CIDR</strong> – Central Identities Data Repository</li>
            <li><strong>UIDAI</strong> – Unique Identification Authority of India</li>
            <li><strong>ASA</strong> – Authentication Service Agency</li>
            <li><strong>AUA</strong> – Authentication User Agency</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

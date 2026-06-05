"use client";

import { Globe, Phone, LifeBuoy } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-start p-6">
      <div className="w-full max-w-3xl">
        {/* Page Title */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <LifeBuoy className="text-indigo-600" />
          Support
        </h2>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 transition hover:shadow-lg">
          <p className="text-gray-600 leading-relaxed mb-6">
            We&apos;re here to assist you! <br />
            If you have any questions or need assistance, please feel free to
            reach out to us.
          </p>

          <div className="org-page-wrapper">
            {/* Page Title */}
            <h2 className="org-title">Support</h2>

            {/* Support Card */}
            <div className="org-form">
              <p style={{ marginBottom: "16px", color: "#374151" }}>
                We&apos;re here to assist you! <br />
                If you have any questions or need assistance, please feel free to
                reach out to us.
              </p>

              <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Globe size={16} />
                <strong className="text-blue-300 transition-all duration-300 hover:text-blue-500 hover:scale-110">Website:</strong>
                <span style={{ marginLeft: "4px", color: "#6b7280" }}>
                  Details will be updated soon
                </span>
              </p>
            </div>
          </div>
          <div className="org-page-wrapper mt-6">
            <p
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "12px",
              }}
            >
              <Phone size={16} />
              <strong className="text-blue-300 transition-all duration-300 hover:text-blue-500 hover:scale-110">Phone:</strong>
              <span style={{ marginLeft: "4px", color: "#6b7280" }}>
                Not available at the moment
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* Bottom Note */}
      <p className="text-left text-xs text-gray-400 mt-6">
        Our support team will be available soon.
      </p>
    </div>
  );
}

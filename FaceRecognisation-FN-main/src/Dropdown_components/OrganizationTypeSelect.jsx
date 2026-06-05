"use client";

import { useEffect, useState } from "react";
import OrgTypeHandler from "@/handlers/org-handler";



export default function OrganizationTypeSelect({ value, onChange }) {
  const [orgTypes, setOrgTypes] = useState([]);

  /* ================= FETCH ORG TYPES ================= */
  useEffect(() => {
    const fetchOrgTypes = async () => {
      try {
        const res = await OrgTypeHandler.list();

        if (res?.success) {
          setOrgTypes(res.data || []);
        } else {
          console.log("OrgType API failed:", res);
        }
      } catch (err) {
        console.error("ORG TYPE DROPDOWN ERROR:", err);
      }
    };

    fetchOrgTypes();
  }, []);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Organization Type *
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900"
        required
      >
        <option value="">- Select Organization Type -</option>

        {orgTypes.map((item) => (
          <option key={item.org_type_id} value={item.org_type_id}>
            {item.org_type_name}
          </option>
        ))}
      </select>
    </div>
  );
}

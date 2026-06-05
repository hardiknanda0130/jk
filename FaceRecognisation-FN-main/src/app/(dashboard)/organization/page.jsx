"use client";

import "@/styles/header.css";
import "@/styles/organization.css";

import { useEffect, useState } from "react";
import ApiEndPoints from "@/lib/ApiServiceEndpoint";
import ApiService from "@/lib/ApiServiceFunctions";
import OrganizationTypeSelect from "@/Dropdown_components/OrganizationTypeSelect";
import ParentMasterHandler from "@/handlers/ParentMasterHandler";
import OrgOnboardingHandler from "@/handlers/OrgOnboardingHandler";

export default function OrganizationPage() {
  const [activeTab, setActiveTab] = useState("org");
  const [states, setStates] = useState([]);
  const [orgTypes, setOrgTypes] = useState([]);
  const [selectedOrgType, setSelectedOrgType] = useState("");
  const [parentList, setParentList] = useState([]);
  const [parentId, setParentId] = useState("");
  const [selectedStateId, setSelectedStateId] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [orgOnboardId, setOrgOnboardId] = useState(null);

  /* ================= FORM DATA STATE ================= */

  const [orgDetail, setOrgDetail] = useState({
    org_detail_name: "",
    org_detail_comm_add: "",
    org_detail_pincode: "",
    org_landline_phone: "",
    office_start_time: "",
    office_end_time: "",
    nic_it_coordinator_name: "",
    nic_it_coordinator_mobile: "",
    nic_it_coordinator_email: "",
    org_website: "",
    employee_count: "",
    auto_activate_user: false,
  });

  const [nodalOfficer, setNodalOfficer] = useState({
    nodal_officer_name: "",
    nodal_officer_designation: "",
    nodal_officer_mobile: "",
    nodal_officer_email: "",
  });

  const [payment, setPayment] = useState({
    utr_no: "",
    payment_amount: "",
    nicisi_bank_name: "",
    nicisi_account_no: "",
    pi_number: "",
    payment_date: "",
  });

  /* ---------- Fetch Parents ---------- */
  useEffect(() => {
    const fetchParents = async () => {
      try {
        const res = await ParentMasterHandler.list();

        if (res.success) {
          setParentList(res.data);
        }
      } catch (err) {
        console.error("PARENT FETCH ERROR:", err);
      }
    };

    fetchParents();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        if (!selectedStateId) {
          setDistricts([]);
          return;
        }

        const res = await ApiService.get(ApiEndPoints.orgDistricts);

        if (res.data.success) {
          // 🔥 selected state ke hisaab se filter
          const filtered = res.data.data.filter(
            (d) => String(d.org_state_id) === String(selectedStateId),
          );

          setDistricts(filtered);
        }
      } catch (err) {
        console.error("DISTRICT FETCH ERROR:", err);
      }
    };

    fetchDistricts();
  }, [selectedStateId]);

  /* =====================================================
     FETCH STATES — USING GET /org-states
     ===================================================== */
  const fetchStates = async () => {
    try {
      const res = await ApiService.get(ApiEndPoints.orgStates);

      if (res.data.success) {
        setStates(res.data.data || []);
      }
    } catch (error) {
      console.error("State fetch error:", error);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  /* =====================================================
     LOAD ORGANIZATION TYPES
     ===================================================== */
  useEffect(() => {
    loadOrgTypes();
  }, []);

  const loadOrgTypes = async () => {
    try {
      const res = await ApiService.get(ApiEndPoints.organisationType);

      const list = res.data.data ? res.data.data : res.data;
      setOrgTypes(list || []);
    } catch (err) {
      console.error("Org type fetch error:", err);
    }
  };

  /* =====================================================
     CAPTCHA
     ===================================================== */
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  const generateCaptcha = () => {
    const value = Math.floor(100000 + Math.random() * 900000);
    setCaptcha(String(value));
    setCaptchaInput("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const submitOrgDetail = async () => {
    const payload = {
      step: 1,
      is_draft: true,
      final_submit: false,
      org_detail: {
        org_detail_name: orgDetail.org_detail_name,
        org_detail_comm_add: orgDetail.org_detail_comm_add,
        org_detail_pincode: orgDetail.org_detail_pincode,
        org_landline_phone: orgDetail.org_landline_phone,

        nic_it_coordinator_name: orgDetail.nic_it_coordinator_name,
        nic_it_coordinator_mobile: orgDetail.nic_it_coordinator_mobile,
        nic_it_coordinator_email: orgDetail.nic_it_coordinator_email,

        org_website: orgDetail.org_website || null,
        employee_count: orgDetail.employee_count
          ? Number(orgDetail.employee_count)
          : null,

        office_start_time: orgDetail.office_start_time || null,
        office_end_time: orgDetail.office_end_time || null,

        org_state_id: Number(selectedStateId),
        org_district_id: Number(selectedDistrictId),
        org_type_id: Number(selectedOrgType),
        parent_org_id: parentId ? Number(parentId) : null,

        auto_activate_user: Boolean(orgDetail.auto_activate_user),
      },
    };

    const res = await OrgOnboardingHandler.submit(payload);

    if (res.success) {
      setOrgOnboardId(res.data.org_onboard_id);
      setActiveTab("nodal");
    } else {
      alert(res.message || "Step 1 failed");
    }
  };

  const submitNodal = async () => {
    if (!orgOnboardId) {
      alert("Organization step not completed");
      return;
    }

    const payload = {
      step: 2,
      org_onboard_id: orgOnboardId,
      is_draft: true,
      final_submit: false,
      nodal_officer: {
        nodal_officer_name: nodalOfficer.nodal_officer_name || "",
        nodal_officer_designation: nodalOfficer.nodal_officer_designation || "",
        nodal_officer_mobile: nodalOfficer.nodal_officer_mobile || "",
        nodal_officer_email: nodalOfficer.nodal_officer_email || "",
      },
    };

    const res = await OrgOnboardingHandler.submit(payload);

    if (res.success) {
      setActiveTab("payment");
    } else {
      alert(res.message || "Step 2 failed");
    }
  };

  const submitPayment = async () => {
    if (!orgOnboardId) {
      alert("Previous steps not completed");
      return;
    }

    if (captchaInput !== captcha) {
      alert("Captcha does not match");
      generateCaptcha();
      return;
    }

    const payload = {
      step: 3,
      org_onboard_id: orgOnboardId,
      is_draft: false,
      final_submit: true,
      payment: {
        utr_no: payment.utr_no || "",
        payment_amount: Number(payment.payment_amount) || 0,
        nicisi_bank_name: payment.nicisi_bank_name || "",
        nicisi_account_no: payment.nicisi_account_no || "",
        pi_number: payment.pi_number || "",
        payment_date: payment.payment_date
          ? new Date(payment.payment_date).toISOString()
          : null,
        captcha: captchaInput,
      },
    };

    const res = await OrgOnboardingHandler.submit(payload);

    if (res.success) {
      alert("Onboarding submitted successfully");
    } else {
      alert(res.message || "Submission failed");
    }
  };

  /* =====================================================
     UI
     ===================================================== */
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <div className="org-page-wrapper">
          <h2 className="org-title">
            Organization Onboarding Form
            <span className="org-subtitle"> create on-boarding Form</span>
          </h2>

          {/* ================= Tabs ================= */}
          <div className="org-tabs">
            <button
              className={`tab ${activeTab === "org" ? "active" : ""}`}
              onClick={() => setActiveTab("org")}
            >
              Organization Details
            </button>

            <button
              className={`tab ${activeTab === "nodal" ? "active" : ""}`}
              onClick={() => setActiveTab("nodal")}
            >
              Nodal Officer Details
            </button>

            <button
              className={`tab ${activeTab === "payment" ? "active" : ""}`}
              onClick={() => setActiveTab("payment")}
            >
              Payment Details
            </button>
          </div>

          {/* ================= ORGANIZATION DETAILS ================= */}
          {activeTab === "org" && (
            <form className="org-form">
              <OrganizationTypeSelect
                value={selectedOrgType}
                onChange={setSelectedOrgType}
              />

              <label>Organization Name *</label>
              <input
                type="text"
                placeholder="Organization Name"
                value={orgDetail.org_detail_name}
                onChange={(e) =>
                  setOrgDetail({
                    ...orgDetail,
                    org_detail_name: e.target.value,
                  })
                }
              />

              <label>Parent Organization (If any)</label>

              <select
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="">- Select Parent Organization -</option>

                {parentList.map((item) => (
                  <option key={item.parent_org_id} value={item.parent_org_id}>
                    {item.parent_org_name}
                  </option>
                ))}
              </select>

              <label>Organization Communication Address *</label>
              <textarea
                placeholder="Communication Address"
                value={orgDetail.org_detail_comm_add}
                onChange={(e) =>
                  setOrgDetail({
                    ...orgDetail,
                    org_detail_comm_add: e.target.value,
                  })
                }
              />

              <div className="two-column">
                <div>
                  <label>State *</label>
                  <select
                    value={selectedStateId}
                    onChange={(e) => setSelectedStateId(e.target.value)}
                  >
                    <option value="">- Select State -</option>

                    {states.map((state) => (
                      <option
                        key={state.org_state_id}
                        value={state.org_state_id}
                      >
                        {state.org_state_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>District *</label>

                  <select
                    value={selectedDistrictId}
                    onChange={(e) => setSelectedDistrictId(e.target.value)}
                  >
                    <option value="">
                      {selectedStateId
                        ? "- Select District -"
                        : "- Select State First -"}
                    </option>

                    {districts.map((d) => (
                      <option key={d.org_district_id} value={d.org_district_id}>
                        {d.org_district_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="two-column">
                <div>
                  <label>Pincode *</label>
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={orgDetail.org_detail_pincode}
                    onChange={(e) =>
                      setOrgDetail({
                        ...orgDetail,
                        org_detail_pincode: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label>Landline Phone *</label>
                  <input
                    type="text"
                    placeholder="Eg. 011123456789"
                    value={orgDetail.org_landline_phone}
                    onChange={(e) =>
                      setOrgDetail({
                        ...orgDetail,
                        org_landline_phone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <label>NIC / IT Coordinator Name *</label>
              <input
                type="text"
                placeholder="NIC Coordinator Name"
                value={orgDetail.nic_it_coordinator_name}
                onChange={(e) =>
                  setOrgDetail({
                    ...orgDetail,
                    nic_it_coordinator_name: e.target.value,
                  })
                }
              />

              <label>NIC / IT Coordinator Mobile *</label>
              <input
                type="text"
                placeholder="e.g. 09923456789"
                value={orgDetail.nic_it_coordinator_mobile}
                onChange={(e) =>
                  setOrgDetail({
                    ...orgDetail,
                    nic_it_coordinator_mobile: e.target.value,
                  })
                }
              />

              <label>NIC / IT Co-ordinator E-mail *</label>
              <input
                type="email"
                placeholder="org@gov.in"
                value={orgDetail.nic_it_coordinator_email}
                onChange={(e) =>
                  setOrgDetail({
                    ...orgDetail,
                    nic_it_coordinator_email: e.target.value,
                  })
                }
              />

              <label>Organization Website (If any)</label>
              <input
                type="text"
                placeholder="abc.gov.in"
                value={orgDetail.org_website}
                onChange={(e) =>
                  setOrgDetail({
                    ...orgDetail,
                    org_website: e.target.value,
                  })
                }
              />

              <label>Number of Employees</label>
              <input
                type="number"
                placeholder="Estimated Number of Employees"
                value={orgDetail.employee_count}
                onChange={(e) =>
                  setOrgDetail({
                    ...orgDetail,
                    employee_count: e.target.value,
                  })
                }
              />

              <div className="two-column">
                <div>
                  <label>Office Start Time</label>
                  <input
                    type="time"
                    value={orgDetail.office_start_time}
                    onChange={(e) =>
                      setOrgDetail({
                        ...orgDetail,
                        office_start_time: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label>Office End Time</label>
                  <input
                    type="time"
                    value={orgDetail.office_end_time}
                    onChange={(e) =>
                      setOrgDetail({
                        ...orgDetail,
                        office_end_time: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="radio-group">
                <label className="radio-question">
                  Do you want to auto activate employee/candidate just after
                  registration?
                </label>

                <div className="radio-options">
                  <label className="radio-item">
                    <input
                      type="radio"
                      name="autoActivate"
                      value="yes"
                      checked={orgDetail.auto_activate_user === true}
                      onChange={() =>
                        setOrgDetail({
                          ...orgDetail,
                          auto_activate_user: true,
                        })
                      }
                    />
                    <span>Yes</span>
                  </label>

                  <label className="radio-item">
                    <input
                      type="radio"
                      name="autoActivate"
                      value="no"
                      checked={orgDetail.auto_activate_user === false}
                      onChange={() =>
                        setOrgDetail({
                          ...orgDetail,
                          auto_activate_user: false,
                        })
                      }
                    />
                    <span>No</span>
                  </label>
                </div>

                <p className="note">
                  Please Note: Activated employee/candidate will only be able to
                  mark attendance.
                </p>
              </div>

              <button
                type="button"
                className="next-btn"
                onClick={submitOrgDetail}
              >
                Next
              </button>
            </form>
          )}

          {/* ================= NODAL TAB ================= */}
          {activeTab === "nodal" && (
            <form className="org-form">
              <label>Nodal Officer Name *</label>
              <input
                type="text"
                value={nodalOfficer.nodal_officer_name}
                onChange={(e) =>
                  setNodalOfficer({
                    ...nodalOfficer,
                    nodal_officer_name: e.target.value,
                  })
                }
              />

              <label>Designation *</label>
              <input
                type="text"
                value={nodalOfficer.nodal_officer_designation}
                onChange={(e) =>
                  setNodalOfficer({
                    ...nodalOfficer,
                    nodal_officer_designation: e.target.value,
                  })
                }
              />

              <label>Mobile No *</label>
              <input
                type="text"
                maxLength={10}
                value={nodalOfficer.nodal_officer_mobile}
                onChange={(e) =>
                  setNodalOfficer({
                    ...nodalOfficer,
                    nodal_officer_mobile: e.target.value,
                  })
                }
              />

              <label>Email *</label>
              <input
                type="email"
                value={nodalOfficer.nodal_officer_email}
                onChange={(e) =>
                  setNodalOfficer({
                    ...nodalOfficer,
                    nodal_officer_email: e.target.value,
                  })
                }
              />

              <button type="button" className="next-btn" onClick={submitNodal}>
                Next
              </button>
            </form>
          )}

          {/* ================= PAYMENT TAB ================= */}
          {activeTab === "payment" && (
            <form className="org-form">
              <label>UTR Number *</label>
              <input
                type="text"
                value={payment.utr_no}
                onChange={(e) =>
                  setPayment({ ...payment, utr_no: e.target.value })
                }
              />

              <label>Payment Amount *</label>
              <input
                type="number"
                value={payment.payment_amount}
                onChange={(e) =>
                  setPayment({ ...payment, payment_amount: e.target.value })
                }
              />

              <label>NICISI Bank Name *</label>
              <input
                type="text"
                value={payment.nicisi_bank_name}
                onChange={(e) =>
                  setPayment({
                    ...payment,
                    nicisi_bank_name: e.target.value,
                  })
                }
              />

              <label>NICISI Account Number *</label>
              <input
                type="text"
                value={payment.nicisi_account_no}
                onChange={(e) =>
                  setPayment({
                    ...payment,
                    nicisi_account_no: e.target.value,
                  })
                }
              />

              <label>PI Number *</label>
              <input
                type="text"
                value={payment.pi_number}
                onChange={(e) =>
                  setPayment({ ...payment, pi_number: e.target.value })
                }
              />

              <label>Payment Date *</label>
              <input
                type="datetime-local"
                value={payment.payment_date}
                onChange={(e) =>
                  setPayment({ ...payment, payment_date: e.target.value })
                }
              />

              <div className="captcha-box">
                <label>Enter the code exactly as it appears *</label>

                <div className="captcha-row">
                  <span className="captcha-text">{captcha}</span>
                  <button
                    type="button"
                    className="captcha-refresh"
                    onClick={generateCaptcha}
                  >
                    Change
                  </button>
                </div>

                <input
                  type="text"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="next-btn"
                onClick={submitPayment}
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

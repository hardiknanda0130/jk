"use client";
import { useEffect, useState } from "react";
import GenderMasterHandler from "@/handlers/GenderMasterHandler";
import "@/styles/header.css";
import "@/styles/organization.css";
import UserOrgNameHandler from "@/handlers/UserOrgNameHandler";
import ApiEndPoints from "@/lib/ApiServiceEndpoint";
import ApiService from "@/lib/ApiServiceFunctions";
import UserTypeHandler from "@/handlers/UserTypeHandler";
import DivUnitInOrgHandler from "@/handlers/DivUnitInOrgHandler";
import DesignationMasterHandler from "@/handlers/DesignationMasterHandler";
import OfficeLocationHandler from "@/handlers/OfficeLocationHandler";
import UserRegistrationHandler from "@/handlers/UserRegistrationHandler";

export default function UserRegistrationPage() {
  const [districts, setDistricts] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState("");

  const [userTypes, setUserTypes] = useState([]);
  const [selectedUserType, setSelectedUserType] = useState("");

  const [divisions, setDivisions] = useState([]);
  const [selectedDivisionId, setSelectedDivisionId] = useState("");

  const [designations, setDesignations] = useState([]);
  const [selectedDesignationId, setSelectedDesignationId] = useState("");

  const [officeLocations, setOfficeLocations] = useState([]);
  const [selectedOfficeLocationId, setSelectedOfficeLocationId] = useState("");

  const [orgUserCode, setOrgUserCode] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [userRegistrationId, setUserRegistrationId] = useState(null);

  const [personalForm, setPersonalForm] = useState({
    user_name: "",
    dob: "",
    gender_id: "",
    user_email: "",
    user_mobile: "",
    user_address: "",
  });

  const submitPersonal = async () => {
    const formData = new FormData();

    // STEP
    formData.append("step", "1");

    // REQUIRED FIELDS
    if (
      !personalForm.user_name ||
      !personalForm.dob ||
      !personalForm.gender_id ||
      !personalForm.user_mobile
    ) {
      alert("Please fill all required personal details");
      return;
    }

    formData.append("user_name", personalForm.user_name.trim());
    formData.append(
      "dob",
      new Date(personalForm.dob).toISOString().split("T")[0],
    );
    formData.append("gender_id", Number(personalForm.gender_id));
    formData.append("user_mobile", personalForm.user_mobile.trim());

    // OPTIONAL
    if (personalForm.user_email) {
      formData.append("user_email", personalForm.user_email.trim());
    }

    formData.append("user_address", "");

    try {
      const res = await UserRegistrationHandler.submitStep1(formData);

      if (res?.data?.success) {
        setUserRegistrationId(res.data.data.user_registration_id);
        setActiveTab("org");
      }
    } catch (err) {
      console.error("STEP 1 ERROR:", err);
      alert("Invalid personal details");
    }
  };

  useEffect(() => {
    const fetchOfficeLocations = async () => {
      try {
        const res = await OfficeLocationHandler.list();

        if (res.success) {
          setOfficeLocations(res.data || []);
        }
      } catch (err) {
        console.error("OFFICE LOCATION FETCH ERROR:", err);
      }
    };

    fetchOfficeLocations();
  }, []);

  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const res = await DesignationMasterHandler.list();

        if (res.success) {
          setDesignations(res.data || []);
        }
      } catch (err) {
        console.error("DESIGNATION FETCH ERROR:", err);
      }
    };

    fetchDesignations();
  }, []);

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const res = await DivUnitInOrgHandler.list();

        if (res.success) {
          setDivisions(res.data || []);
        }
      } catch (err) {
        console.error("DIVISION FETCH ERROR:", err);
      }
    };

    fetchDivisions();
  }, []);

  useEffect(() => {
    const fetchUserTypes = async () => {
      try {
        const res = await UserTypeHandler.list();

        if (res.success) {
          setUserTypes(res.data || []);
        }
      } catch (err) {
        console.error("USER TYPE FETCH ERROR:", err);
      }
    };

    fetchUserTypes();
  }, []);

  /* ---------- Fetch Districts ---------- */
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const res = await ApiService.get(ApiEndPoints.orgDistricts);

        if (res?.data?.success) {
          setDistricts(res.data.data || []);
        }
      } catch (err) {
        console.error("DISTRICT FETCH ERROR:", err);
      }
    };

    fetchDistricts();
  }, []);

  const [activeTab, setActiveTab] = useState("personal");

  /* ================= Captcha ================= */
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz123456789";
    let value = "";
    for (let i = 0; i < 6; i++) {
      value += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(value);
    setCaptchaInput("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const res = await GenderMasterHandler.list();

        if (res.success) {
          setGenderList(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchGenders();
  }, []);

  const [orgNames, setOrgNames] = useState([]);
  const [selectedOrgName, setSelectedOrgName] = useState("");

  /* ---------- Fetch Organization Names ---------- */
  useEffect(() => {
    const fetchOrgNames = async () => {
      try {
        const res = await UserOrgNameHandler.list();

        if (res.success) {
          setOrgNames(res.data || []);
        }
      } catch (err) {
        console.error("ORG NAME FETCH ERROR:", err);
      }
    };

    fetchOrgNames();
  }, []);

  const [genderList, setGenderList] = useState([]);

  const submitOrg = async () => {
    if (captchaInput !== captcha) {
      alert("Captcha does not match");
      generateCaptcha();
      return;
    }

    if (
      !userRegistrationId ||
      !selectedOrgName ||
      !selectedUserType ||
      !selectedDivisionId ||
      !selectedDesignationId ||
      !selectedDistrictId ||
      !selectedOfficeLocationId
    ) {
      alert("Please fill all required organization details");
      return;
    }

    const formData = new FormData();
    formData.append("step", "2");
    formData.append("user_registration_id", userRegistrationId);

    formData.append("user_org_name_id", Number(selectedOrgName));
    formData.append("user_type_id", Number(selectedUserType));
    formData.append("division_unit_in_org_id", Number(selectedDivisionId));
    formData.append("user_org_designation", Number(selectedDesignationId));
    formData.append("org_district_id", Number(selectedDistrictId));
    formData.append("user_office_location", Number(selectedOfficeLocationId));

    if (orgUserCode) {
      formData.append("org_user_code", orgUserCode);
    }

    if (!photoFile) {
      alert("Photograph is required");
      return;
    }

    formData.append("photograph", photoFile);

    try {
      // ✅ STEP 2
      const res2 = await UserRegistrationHandler.submitStep2(formData);

      if (!res2?.data?.success) {
        alert("Organization submission failed");
        return;
      }

      // STEP 3 (FINAL SUBMIT)
      const step3Form = new FormData();
      step3Form.append("step", "3");
      step3Form.append("user_registration_id", String(userRegistrationId));

      const res3 = await UserRegistrationHandler.submitStep3(step3Form);

      if (res3?.data?.success) {
        alert("User registered successfully");
      }
    } catch (err) {
      console.error("STEP 2 / STEP 3 ERROR:", err);
      alert("Registration failed");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <div className="org-page-wrapper">
          <h2 className="org-title">
            User Registration
            <span className="org-subtitle"> create on-boarding request</span>
          </h2>

          {/* ================= Tabs ================= */}
          <div className="org-tabs">
            <button
              className={`tab ${activeTab === "personal" ? "active" : ""}`}
              onClick={() => setActiveTab("personal")}
            >
              Personal Details
            </button>

            <button
              className={`tab ${activeTab === "org" ? "active" : ""}`}
              onClick={() => setActiveTab("org")}
            >
              Organization Details
            </button>
          </div>

          {/* ================= Personal Details ================= */}
          {activeTab === "personal" && (
            <form className="org-form" onSubmit={(e) => e.preventDefault()}>
              <label>
                User Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter User Name"
                value={personalForm.user_name}
                onChange={(e) =>
                  setPersonalForm({
                    ...personalForm,
                    user_name: e.target.value,
                  })
                }
              />

              <div className="two-column">
                <div>
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    value={personalForm.dob}
                    onChange={(e) =>
                      setPersonalForm({ ...personalForm, dob: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label>
                    Gender <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    value={personalForm.gender_id}
                    onChange={(e) =>
                      setPersonalForm({
                        ...personalForm,
                        gender_id: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Gender</option>
                    {genderList.map((g) => (
                      <option key={g.gender_id} value={g.gender_id}>
                        {g.gender_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <label>E-Mail</label>
              <input
                type="email"
                value={personalForm.user_email}
                onChange={(e) =>
                  setPersonalForm({
                    ...personalForm,
                    user_email: e.target.value,
                  })
                }
              />

              <label>
                Mobile No. <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                maxLength={10}
                value={personalForm.user_mobile}
                onChange={(e) =>
                  setPersonalForm({
                    ...personalForm,
                    user_mobile: e.target.value.replace(/\D/g, ""),
                  })
                }
              />

              <label>Address</label>
              <textarea
                rows={3}
                placeholder="Enter Address"
                value={personalForm.user_address}
                onChange={(e) =>
                  setPersonalForm({
                    ...personalForm,
                    user_address: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />

              <button
                type="button"
                className="next-btn"
                onClick={submitPersonal}
              >
                Next
              </button>
            </form>
          )}

          {/* ================= Organization Details ================= */}
          {activeTab === "org" && (
            <form className="org-form" onSubmit={(e) => e.preventDefault()}>
              <label className="block mb-1 text-sm font-medium text-black">
                Organization Name
              </label>

              {/* <label className="block mb-1 text-sm font-medium text-black">
  Organization Name
</label> */}

              <select
                value={selectedOrgName}
                onChange={(e) => setSelectedOrgName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-black bg-white"
              >
                <option value="">Select Organization</option>

                {orgNames.map((item) => (
                  <option
                    key={item.user_org_name_id}
                    value={item.user_org_name_id}
                  >
                    {item.user_org_name}
                  </option>
                ))}
              </select>

              <div className="two-column">
                <div>
                  <label>
                    User Type <span style={{ color: "red" }}>*</span>
                  </label>

                  <select
                    value={selectedUserType}
                    onChange={(e) => setSelectedUserType(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  >
                    <option value="">Select</option>

                    {userTypes.map((item) => (
                      <option key={item.user_type_id} value={item.user_type_id}>
                        {item.user_type_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>
                    Division/Unit within Organization{" "}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    value={selectedDivisionId}
                    onChange={(e) => setSelectedDivisionId(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  >
                    <option value="">
                      - Select Division/Unit within Organization -
                    </option>

                    {divisions.map((d) => (
                      <option
                        key={d.div_unit_in_org_id}
                        value={d.div_unit_in_org_id}
                      >
                        {d.div_unit_in_org_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <label>
                Designation <span style={{ color: "red" }}>*</span>
              </label>
              <select
                value={selectedDesignationId}
                onChange={(e) => setSelectedDesignationId(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="">- Select Designation -</option>

                {designations.map((d) => (
                  <option key={d.designation_id} value={d.designation_id}>
                    {d.designation_name}
                  </option>
                ))}
              </select>

              <label>
                District <span style={{ color: "red" }}>*</span>
              </label>
              <select
                value={selectedDistrictId}
                onChange={(e) => setSelectedDistrictId(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="">- Select District -</option>

                {districts.map((d) => (
                  <option key={d.org_district_id} value={d.org_district_id}>
                    {d.org_district_name}
                  </option>
                ))}
              </select>

              <label>
                Office Location <span style={{ color: "red" }}>*</span>
              </label>
              <select
                value={selectedOfficeLocationId}
                onChange={(e) => setSelectedOfficeLocationId(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="">- Select Office Location -</option>

                {officeLocations.map((o) => (
                  <option
                    key={o.office_location_id}
                    value={o.office_location_id}
                  >
                    {o.office_location_name}
                  </option>
                ))}
              </select>

              <label>Organization User Code</label>
              <input
                type="text"
                placeholder="Enter Organization User Code"
                value={orgUserCode}
                onChange={(e) => setOrgUserCode(e.target.value)}
              />

              <label>
                Photograph <span style={{ color: "red" }}>*</span>
                <small> (only .jpg format and size upto 150 KB)</small>
              </label>
              <input
                type="file"
                accept=".jpg"
                onChange={(e) => setPhotoFile(e.target.files[0])}
              />

              {/* Captcha */}
              <div className="captcha-box">
                <label>
                  Enter the code exactly as it appears{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>

                <div className="captcha-row">
                  <span className="captcha-text">{captcha}</span>
                  <button
                    type="button"
                    className="captcha-refresh"
                    onClick={generateCaptcha}
                  >
                    Change text
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Confirmation Code"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                />
              </div>

              <button type="button" className="next-btn" onClick={submitOrg}>
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

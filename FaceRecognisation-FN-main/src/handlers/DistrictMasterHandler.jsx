import ApiService from "@/lib/ApiServiceFunctions";
import ApiEndPoints from "@/lib/ApiServiceEndpoint";

const DistrictMasterHandler = {
  /* ================= LIST ================= */
  list: async () => {
    const res = await ApiService.get(ApiEndPoints.orgDistricts);
    return res.data;
  },

  /* ================= CREATE ================= */
  create: async (name, stateId, srno) => {
    const payload = {
      org_district_name: name,
      org_state_id: Number(stateId),
      org_district_srno: Number(srno),
      org_district_status: true,
    };

    const res = await ApiService.post(ApiEndPoints.orgDistricts, payload);
    return res.data;
  },

 /* ================= UPDATE ================= */
  update: async (
    districtId,
    districtName,
    stateId,
    srno,
    status = true
  ) => {
    const payload = {
      org_district_id: districtId,
      org_district_name: districtName,
      org_state_id: Number(stateId),
      org_district_srno: Number(srno),
      org_district_status: status,
    };

    const res = await ApiService.put(
      ApiEndPoints.orgDistricts,
      payload
    );

    return res.data;
  },

  /* ================= DELETE ================= */
  delete: async (id) => {
    const res = await ApiService.delete(
      `${ApiEndPoints.orgDistricts}/${id}`
    );

    return res.data;
  },
};


export default DistrictMasterHandler;

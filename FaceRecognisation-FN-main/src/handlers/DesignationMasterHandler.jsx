import ApiService from "@/lib/ApiServiceFunctions";
import ApiEndPoints from "@/lib/ApiServiceEndpoint";

const DesignationMasterHandler = {
  /* ================= LIST ================= */
  list: async () => {
    const res = await ApiService.get(ApiEndPoints.designations);
    return res.data;
  },

  /* ================= CREATE ================= */
  create: async (name, srno, status = true) => {
    const payload = {
      designation_name: name,
      designation_srno: srno,
      designation_status: status,
    };

    const res = await ApiService.post(ApiEndPoints.designations, payload);

    return res.data;
  },

  /* ================= UPDATE ================= */
  update: async (id, name, srno, status = true) => {
    const payload = {
      designation_name: name,
      designation_srno: srno,
      designation_status: status,
    };

    const res = await ApiService.put(
      `${ApiEndPoints.designations}/${id}`,
      payload,
    );

    return res.data;
  },

  /* ================= DELETE ================= */
  delete: async (id) => {
    const res = await ApiService.delete(`${ApiEndPoints.designations}/${id}`);

    return res.data;
  },
};

export default DesignationMasterHandler;

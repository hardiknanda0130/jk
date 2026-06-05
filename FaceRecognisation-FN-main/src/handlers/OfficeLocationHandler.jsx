import ApiService from "@/lib/ApiServiceFunctions";
import ApiEndPoints from "@/lib/ApiServiceEndpoint";

const OfficeLocationHandler = {
  /* ================= LIST ================= */
  list: async () => {
    const res = await ApiService.get(ApiEndPoints.officeLocations);
    return res.data;
  },

  /* ================= CREATE ================= */
  create: async (name, srno, status = true) => {
    const payload = {
      office_location_name: name,
      office_location_srno: srno,
      office_location_status: status,
    };

    const res = await ApiService.post(ApiEndPoints.officeLocations, payload);

    return res.data;
  },

  /* ================= UPDATE ================= */
  update: async (id, name, srno, status = true) => {
    const payload = {
      office_location_name: name,
      office_location_srno: srno,
      office_location_status: status,
    };

    const res = await ApiService.put(
      `${ApiEndPoints.officeLocations}/${id}`,
      payload,
    );

    return res.data;
  },

  /* ================= DELETE ================= */
  delete: async (id) => {
    const res = await ApiService.delete(
      `${ApiEndPoints.officeLocations}/${id}`,
    );

    return res.data;
  },
};

export default OfficeLocationHandler;

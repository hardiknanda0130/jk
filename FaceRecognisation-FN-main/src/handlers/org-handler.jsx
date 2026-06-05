import ApiEndPoints from "@/lib/ApiServiceEndpoint";
import ApiService from "@/lib/ApiServiceFunctions";

const OrganisationMasterHandler = {

  /* =========================
     LIST ORGANISATION TYPES
     GET /org-types
     ========================= */
  list: async () => {
    const res = await ApiService.get(ApiEndPoints.organisationType);
    return res.data;
  },

  /* =========================
     CREATE ORGANISATION TYPE
     POST /org-types
     ========================= */
  create: async (name, srno) => {
    const payload = {
      org_type_name: name,
      org_type_srno: Number(srno),
    };

    const res = await ApiService.post(
      ApiEndPoints.organisationType,
      payload
    );

    return res.data;
  },

  /* =========================
     UPDATE ORGANISATION TYPE
     PUT /org-types
     (ID IN BODY — IMPORTANT)
     ========================= */
  update: async (id, name, srno) => {
    const payload = {
      org_type_id: id, // ✅ REQUIRED
      org_type_name: name,
      org_type_srno: Number(srno),
    };

    const res = await ApiService.put(
      ApiEndPoints.organisationType,
      payload
    );

    return res.data;
  },

  /* =========================
     GET BY ID
     POST /org-types/get-by-id
     ========================= */
  getById: async (id) => {
    const payload = {
      org_type_id: id,
    };

    const res = await ApiService.post(
      ApiEndPoints.organisationTypeById,
      payload
    );

    return res.data;
  },

  /* =========================
     DELETE ORGANISATION TYPE
     DELETE /org-types/{id}
     ========================= */
  delete: async (id) => {
    const res = await ApiService.delete(
      `${ApiEndPoints.organisationType}/${id}`
    );

    return res.data;
  },
};

export default OrganisationMasterHandler;

import ApiEndPoints from "@/lib/ApiServiceEndpoint";
import ApiService from "@/lib/ApiServiceFunctions";

const StateMasterHandler = {
  /* =========================
     LIST STATES
     GET /org-states
     ========================= */
  list: async () => {
    const res = await ApiService.get(ApiEndPoints.orgStates);
    return res.data;
  },

  /* =========================
     CREATE STATE
     POST /org-states
     ========================= */
  create: async (name, srno) => {
    const payload = {
      org_state_name: name,
      org_state_srno: Number(srno),
      org_state_status: true,
    };

    const res = await ApiService.post(ApiEndPoints.orgStates, payload);

    return res.data;
  },

  /* =========================
     UPDATE STATE
     PUT /org-states
     ========================= */
  update: async (id, name, srno) => {
    const payload = {
      org_state_id: id,
      org_state_name: name,
      org_state_srno: Number(srno),
      org_state_status: true,
    };

    const res = await ApiService.put(ApiEndPoints.orgStates, payload);

    return res.data;
  },

  /* =========================
     DELETE STATE
     DELETE /org-states/{id}
     ========================= */
  delete: async (id) => {
    const res = await ApiService.delete(`${ApiEndPoints.orgStates}/${id}`);

    return res.data;
  },
};

export default StateMasterHandler;

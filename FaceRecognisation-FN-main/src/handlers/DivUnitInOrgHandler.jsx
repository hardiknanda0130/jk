import ApiService from "@/lib/ApiServiceFunctions";
import ApiEndPoints from "@/lib/ApiServiceEndpoint";

const DivUnitInOrgHandler = {
  /* ===== LIST ===== */
  list: async () => {
    const res = await ApiService.get(ApiEndPoints.divUnitInOrg);
    return res.data;
  },

  /* ===== CREATE ===== */
  create: async ({ name, srno }) => {
    const payload = {
      div_unit_in_org_name: name?.trim() || null,
      div_unit_in_org_srno: Number(srno),
      div_unit_in_org_status: true,
    };

    const res = await ApiService.post(ApiEndPoints.divUnitInOrg, payload);
    return res.data;
  },

  /* ===== UPDATE ===== */
  update: async (id, payload) => {
    const cleanPayload = {
      ...(payload.div_unit_in_org_name !== undefined && {
        div_unit_in_org_name: payload.div_unit_in_org_name?.trim() || null,
      }),
      ...(payload.div_unit_in_org_srno !== undefined && {
        div_unit_in_org_srno: Number(payload.div_unit_in_org_srno),
      }),
      ...(payload.div_unit_in_org_status !== undefined && {
        div_unit_in_org_status: payload.div_unit_in_org_status,
      }),
    };

    const res = await ApiService.put(
      `${ApiEndPoints.divUnitInOrg}/${id}`,
      cleanPayload,
    );
    return res.data;
  },

  /* ===== DELETE ===== */
  delete: async (id) => {
    const res = await ApiService.delete(`${ApiEndPoints.divUnitInOrg}/${id}`);
    return res.data;
  },
};

export default DivUnitInOrgHandler;

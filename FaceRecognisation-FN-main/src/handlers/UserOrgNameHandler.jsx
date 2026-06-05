import ApiService from "@/lib/ApiServiceFunctions";
import ApiEndPoints from "@/lib/ApiServiceEndpoint";

const UserOrgNameHandler = {
  /* ===== LIST ===== */
  list: async () => {
    const res = await ApiService.get(ApiEndPoints.userOrgNames);
    return res.data;
  },

  /* ===== CREATE ===== */
  create: async (name, srno) => {
    const payload = {
      user_org_name: name,
      user_org_name_srno: Number(srno),
      user_org_name_status: true,
    };

    const res = await ApiService.post(ApiEndPoints.userOrgNames, payload);
    return res.data;
  },

  /* ===== UPDATE ===== */
  update: async (id, name, srno, status = true) => {
    const payload = {
      user_org_name_id: id,
      user_org_name: name,
      user_org_name_srno: Number(srno),
      user_org_name_status: status,
    };

    const res = await ApiService.put(ApiEndPoints.userOrgNames, payload);
    return res.data;
  },

  /* ===== DELETE ===== */
  delete: async (id) => {
    const res = await ApiService.delete(
      `${ApiEndPoints.userOrgNames}/${id}`
    );
    return res.data;
  },
};

export default UserOrgNameHandler;

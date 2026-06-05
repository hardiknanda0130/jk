import ApiService from "@/lib/ApiServiceFunctions";
import ApiEndPoints from "@/lib/ApiServiceEndpoint";

const UserTypeHandler = {
  /* ================= LIST ================= */
  list: async () => {
    try {
      const res = await ApiService.get(ApiEndPoints.userTypes);
      return res.data;
    } catch (err) {
      console.error("USER TYPE LIST ERROR:", err);
      return { success: false };
    }
  },

  /* ================= CREATE ================= */
  create: async (name, code) => {
    try {
      const payload = {
        user_type_name: name,
        user_type_code: Number(code),
        user_type_srno: Number(code),
      };

      const res = await ApiService.post(
        ApiEndPoints.userTypes,
        payload
      );

      return res.data;
    } catch (err) {
      console.error("USER TYPE CREATE ERROR:", err);
      return { success: false };
    }
  },

  /* ================= UPDATE ================= */
  update: async (id, name, code) => {
    try {
      const payload = {
        user_type_id: id,
        user_type_name: name,
        user_type_code: Number(code),
        user_type_srno: Number(code),
      };

      const res = await ApiService.put(
        ApiEndPoints.userTypes,
        payload
      );

      return res.data;
    } catch (err) {
      console.error("USER TYPE UPDATE ERROR:", err);
      return { success: false };
    }
  },

  /* ================= DELETE ================= */
  delete: async (id) => {
    try {
      const res = await ApiService.delete(
        `${ApiEndPoints.userTypes}/${id}`
      );

      return res.data;
    } catch (err) {
      console.error("USER TYPE DELETE ERROR:", err);
      return { success: false };
    }
  },
};

export default UserTypeHandler;

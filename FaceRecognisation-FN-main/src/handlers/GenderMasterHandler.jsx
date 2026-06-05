import ApiEndPoints from "@/lib/ApiServiceEndpoint";
import ApiService from "@/lib/ApiServiceFunctions";

const GenderMasterHandler = {
  list: async () => {
    const res = await ApiService.get(ApiEndPoints.genders);
    return res.data;
  },

  create: async (name, srno) => {
    const payload = {
      gender_name: name,
      gender_srno: Number(srno),
      gender_status: true,
    };

    const res = await ApiService.post(
      ApiEndPoints.genders,
      payload
    );

    

    return res.data;
  },


  /* =========================
   UPDATE GENDER
   PUT /genders
========================= */
update: async (id, name, srno) => {
  const payload = {
    gender_id: id,
    gender_name: name,
    gender_srno: Number(srno),
    gender_status: true,
  };

  const res = await ApiService.put(
    ApiEndPoints.genders,
    payload
  );

  return res.data;
},

/* =========================
   DELETE GENDER
   DELETE /genders/{id}
========================= */
delete: async (id) => {
  const res = await ApiService.delete(
    `${ApiEndPoints.genders}/${id}`
  );

  return res.data;
},

};


export default GenderMasterHandler;

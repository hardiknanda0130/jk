import ApiEndPoints from "@/lib/ApiServiceEndpoint";
import ApiService from "@/lib/ApiServiceFunctions";

const ParentMasterHandler = {

  /* =========================
     LIST PARENT ORG
     GET /parent-orgs
  ========================= */
  list: async () => {
    const res = await ApiService.get(ApiEndPoints.parentOrg);
    return res.data;
  },

  /* =========================
     CREATE PARENT ORG
     POST /parent-orgs
  ========================= */
  create: async (name, srno) => {
    const payload = {
      parent_org_name: name,
      parent_org_srno: Number(srno),
      parent_org_status: true,
    };

    const res = await ApiService.post(
      ApiEndPoints.parentOrg,
      payload
    );

    return res.data;
  },

/* =========================
   UPDATE PARENT ORG
   PUT /parent-orgs
========================= */
update: async (id, name, srno) => {
  const payload = {
    parent_org_id: id,          // ⚠️ IMPORTANT
    parent_org_name: name,
    parent_org_srno: Number(srno),
    parent_org_status: true,
  };

  const res = await ApiService.put(
    ApiEndPoints.parentOrg,
    payload
  );

  return res.data;
},


/* =========================
   DELETE PARENT ORG
   DELETE /parent-orgs/{id}
========================= */
delete: async (id) => {
  const res = await ApiService.delete(
    `${ApiEndPoints.parentOrg}/${id}`
  );

  return res.data;
},


};

export default ParentMasterHandler;

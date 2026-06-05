import ApiEndPoints from "@/lib/ApiServiceEndpoint";
import ApiService from "@/lib/ApiServiceFunctions";

const OrgOnboardingHandler = {
  /* =========================
     LIST ORG ONBOARDINGS
     GET /org-onboarding
     (USED BY MASTER PAGE)
     ========================= */
  list: async (skip = 0, limit = 20) => {
    const res = await ApiService.get(
      `${ApiEndPoints.orgOnboarding}?skip=${skip}&limit=${limit}`,
    );

    // always return array
    return res?.data?.data ?? [];
  },

  /* =========================
     CREATE ORG ONBOARDING
     POST /org-onboarding
     ========================= */
  create: async (payload) => {
    const res = await ApiService.post(ApiEndPoints.orgOnboarding, payload);
    return res.data;
  },

  /* =========================
     SUBMIT ORG ONBOARDING
     (Used by Organization page)
     ========================= */
  submit: async (payload) => {
    const res = await ApiService.post(ApiEndPoints.orgOnboarding, payload);
    return res.data;
  },

  /* =========================
     UPDATE ORG ONBOARDING
     PUT /org-onboarding
     ========================= */
  update: async (id, payload) => {
    const finalPayload = {
      org_onboard_id: id,
      ...payload,
    };

    const res = await ApiService.put(
      `${ApiEndPoints.orgOnboarding}/${id}`,
      finalPayload,
    );
    return res.data;
  },

  /* =========================
     UPDATE STATUS (ACTIVE/INACTIVE)
     (USED BY MASTER PAGE)
     ========================= */
  updateStatus: async (id, isActive) => {
    const payload = {
      org_onboard_id: id,
      is_active: isActive,
    };
    // Assuming PUT to the same endpoint or a specific status endpoint
    // If there's a specific endpoint, we should add it to ApiEndPoints
    const res = await ApiService.put(
      `${ApiEndPoints.orgOnboarding}/${id}`,
      payload,
    );
    return res.data;
  },

  /* =========================
     GET BY ID
     GET /org-onboarding/{id}
     ========================= */
  getById: async (id) => {
    const res = await ApiService.get(`${ApiEndPoints.orgOnboarding}/${id}`);
    return res.data;
  },

  /* =========================
     DELETE ORG ONBOARDING
     DELETE /org-onboarding/{id}
     ========================= */
  delete: async (id) => {
    const res = await ApiService.delete(`${ApiEndPoints.orgOnboarding}/${id}`);
    return res.data;
  },
};

export default OrgOnboardingHandler;

import ApiService from "@/lib/ApiServiceFunctions";
import ApiEndPoints from "@/lib/ApiServiceEndpoint";

const UserRegistrationHandler = {
  submitStep1: async (formData) => {
    return await ApiService.post(ApiEndPoints.userRegistration, formData);
  },

  submitStep2: async (formData) => {
    return await ApiService.post(ApiEndPoints.userRegistration, formData);
  },

  // ✅ ADD THIS
  submitStep3: async (payload) => {
    return await ApiService.post(ApiEndPoints.userRegistration, payload);
  },
};

export default UserRegistrationHandler;

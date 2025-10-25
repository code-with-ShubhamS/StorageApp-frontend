import { axiosWithCreds } from "./axiosInstances";

const BASE_URL = import.meta.env.VITE_BACKEND_URL ;

export const loginWithGoogle = async (idToken) => {
  const { data } = await axiosWithCreds.post("/auth/google", { idToken });
  return data;
};

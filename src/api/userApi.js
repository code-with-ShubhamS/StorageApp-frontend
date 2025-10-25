import { axiosWithCreds, axiosWithoutCreds } from "./axiosInstances";

export const fetchUser = async () => {
  const { data } = await axiosWithCreds.get("/user");
  // localStorage.setItem("profileData", JSON.stringify(data));
  return data;
};

export const fetchAllUsers = async () => {
  const { data } = await axiosWithCreds.get("/user/getAllUser");
  return data;
};

export const logoutUser = async () => {
  const { data } = await axiosWithCreds.post("/user/logout");
  return data;
};

export const logoutAllSessions = async () => {
  const { data } = await axiosWithCreds.post("/user/logout-all");
  return data;
};

export const deleteUser = async () => {
  const { data } = await axiosWithCreds.delete("/user");
  return data;
};

export const logoutUserById = async (id) => {
  const { data } = await axiosWithCreds.get(`/user/${id}/logout`);
  return data;
};

export const loginUser = async (formData) => {
  const { data } = await axiosWithCreds.post("/user/login", formData);
  return data;
};

export const registerUser = async (formData) => {
  const { data } = await axiosWithoutCreds.post("/user/register", formData);
  return data;
};

export const deleteUserById = async (id) => {
  const { data } = await axiosWithCreds.delete(`/user/${id}`);
  return data;
};

import axios from "./axios";

export const getProfileData = async () => {
  const response = await axios.get("/profile");
  return response.data;
};

export const updateProfileData = async (data) => {
  try {
    const response = await axios.put("/profile", data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

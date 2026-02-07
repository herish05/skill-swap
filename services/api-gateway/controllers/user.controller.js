import axios from "axios";
import FormData from "form-data"
const USER_SERVICE = process.env.USER_SERVICE_URL || "http://localhost:4002";

export const createProfile = async (req, res) => {
  try {
    const response = await axios.post(`${USER_SERVICE}/profile`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "Create profile failed" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const response = await axios.get(
      `${USER_SERVICE}/profile/${req.params.authUserId}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "Profile not found" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const response = await axios.put(
      `${USER_SERVICE}/profile/${req.params.authUserId}`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "Update profile failed" });
  }
};

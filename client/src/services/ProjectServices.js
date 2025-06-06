import axios from "axios";

export const addProject = async (projectData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    "http://localhost:5255/projects/store",
    projectData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

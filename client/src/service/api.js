import axios from "axios";

const baseURL = "https://chat-app-phi-coral.vercel.app";

const api = axios.create({
  baseURL,
});

export const addUser = async (data) => {
  try {
    const response = await api.post("/add", data);
    return response.data;
  } catch (error) {
    console.error("Error while calling addUser API:", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error while calling getUsers API:", error);
    throw error;
  }
};

export const setConversation = async (data) => {
  try {
    await api.post("/conversation/add", data);
  } catch (error) {
    console.error("Error while calling setConversation API:", error);
    throw error;
  }
};

export const getConversation = async (users) => {
  try {
    const response = await api.post("/conversation/get", users);
    return response.data;
  } catch (error) {
    console.error("Error while calling getConversation API:", error);
    throw error;
  }
};

export const getMessages = async (id) => {
  try {
    const response = await api.get(`/message/get/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error while calling getMessages API:", error);
    throw error;
  }
};

export const newMessages = async (data) => {
  try {
    const response = await api.post("/message/add", data);
    return response.data;
  } catch (error) {
    console.error("Error while calling newMessages API:", error);
    throw error;
  }
};

export const uploadFile = async (data) => {
  try {
    const response = await api.post("/file/upload", data);
    return response.data;
  } catch (error) {
    console.error("Error while calling uploadFile API:", error);
    throw error;
  }
};

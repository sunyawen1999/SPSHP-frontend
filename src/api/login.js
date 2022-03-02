import axios from "axios";

export const loginRequest = base =>
  axios.get("/api/users/me");

export const loginRequestPost = payload =>
  axios.post("/api/users/login", payload);
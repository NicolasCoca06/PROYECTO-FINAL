import axios from "./axios";

export const getBetsRequest = async () => axios.get("/bets");

export const createBetRequest = async (bet) => axios.post("/bets", bet);

export const updateBetRequest = async (bet) =>
  axios.put(`/bets/${bet._id}`, bet);

export const deleteBetRequest = async (id) => axios.delete(`/bets/${id}`);

export const getBetRequest = async (id) => axios.get(`/bets/${id}`);

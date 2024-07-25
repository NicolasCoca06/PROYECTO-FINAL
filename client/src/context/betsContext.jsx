import { createContext, useContext, useState } from "react";
import {
  createBetRequest,
  deleteBetRequest,
  getBetsRequest,
  getBetRequest,
  updateBetRequest,
} from "../api/bets";

const BetContext = createContext();

export const useBets = () => {
  const context = useContext(BetContext);
  if (!context) throw new Error("useBets must be used within a BetProvider");
  return context;
};

export function BetProvider({ children }) {
  const [bets, setBets] = useState([]);

  const getBets = async () => {
    const res = await getBetsRequest();
    setBets(res.data);
  };

  const deleteBet = async (id) => {
    try {
      const res = await deleteBetRequest(id);
      if (res.status === 204) setBets(bets.filter((bet) => bet._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createBet = async (bet) => {
    try {
      const res = await createBetRequest(bet);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBet = async (id) => {
    try {
      const res = await getBetRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateBet = async (id, bet) => {
    try {
      await updateBetRequest(id, bet);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BetContext.Provider
      value={{
        bets,
        getBets,
        deleteBet,
        createBet,
        getBet,
        updateBet,
      }}
    >
      {children}
    </BetContext.Provider>
  );
}

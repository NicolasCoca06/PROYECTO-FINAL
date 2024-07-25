import Bet from "../models/bet.model.js";

export const getBets = async (req, res) => {
  try {
    const bets = await Bet.find({ user : req.user.id }).populate("user");
    res.json(bets);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createBet = async (req, res) => {
  try {
    const { fixture, betChoice, date, state, result } = req.body;
    const newBet = new Bet({
      fixture,
      betChoice,
      date,
      state,
      result,
      user: req.user.id,
    });
    await newBet.save();
    res.json(newBet);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteBet = async (req, res) => {
  try {
    const deletedBet = await Bet.findByIdAndDelete(req.params.id);
    if (!deletedBet)
      return res.status(404).json({ message: "Bet not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateBet = async (req, res) => {
  try {
    const { fixture, betChoice, date, state, result } = req.body;
    const betUpdated = await Bet.findOneAndUpdate(
      { _id: req.params.id },
      { fixture, betChoice, date, state, result },
      { new: true }
    );
    return res.json(betUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBet = async (req, res) => {
  try {
    const bet = await Bet.findById(req.params.id);
    if (!bet) return res.status(404).json({ message: "Bet not found" });
    return res.json(bet);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

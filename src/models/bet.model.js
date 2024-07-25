import mongoose from "mongoose";

const  betSchema = new mongoose.Schema(
  {
    fixture: {
      type: String,
      required: true,
    },
    betChoice: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    state : {
      type: String,
      required : true
    },

    result : {
      type: String,
      required : true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Bet", betSchema);

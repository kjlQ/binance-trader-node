import mongoose from "mongoose";

const tradingSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  tradeId: { type: String, required: true, unique: true, index: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  quoteQty: { type: Number, required: true },
  time: { type: Number, required: true },
  isBuyerMaker: { type: Boolean, required: true },
  timestamp: { type: Date, default: Date.now },
  action: { type: Boolean, required: true },
  profit: { type: Number, required: true },
});

export default mongoose.model("Trading", tradingSchema);

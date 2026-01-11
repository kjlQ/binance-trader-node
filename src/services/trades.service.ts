import { Router, Request, Response, NextFunction } from "express";
import axios from "axios";
import Trades from "../models/Trades";

const router = Router();

router.get("/binance/trades", async(req: Request, res: Response, next: NextFunction) => {
  try {
    const symbol = req.query.symbol
    const trades = await axios.get(`https://api.binance.com/api/v3/trades?symbol=${symbol}`);
    const symbolPrice = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
    
    const tradesToInsert = trades.data.map((trade: any) => {
      const action = (symbolPrice.data.price < trade.price || symbolPrice.data.price > trade.price) && true;
    
      return {
        symbol,
        tradeId: trade.id,
        price: trade.price,
        qty: trade.qty,
        quoteQty: trade.quoteQty,
        time: trade.time,
        isBuyerMaker: trade.isBuyerMaker,
        action,
        profit: action ? trade.isBuyerMaker && symbolPrice.data.price < trade.price ? (trade.qty * trade.price) - (trade.qty * symbolPrice.data.price) : (trade.qty * symbolPrice.data.price) - (trade.qty * trade.price) : 0
      }
    });

    await Trades.insertMany(tradesToInsert, { ordered: false });
    res.status(200).json({ message:"Trades fetched and stored successfully" });
  } catch (error) {
    console.log((error as Error).message);
    next(error);
  }
});

export default router;

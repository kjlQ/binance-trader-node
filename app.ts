import express from "express";
import { connectMongoDB } from "./src/config/mongo";
import { errorHandler } from "./src/utils/errors";
import tradesRouter from "./src/services/trades.service";

const app = express();

app.use(express.json());
connectMongoDB();

app.use(tradesRouter);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
import { NextFunction, Request, Response } from "express";
import Logger from "./logger";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.error({
      message: err.message,
      stack: err.stack,
      method: req.method,
      url: req.originalUrl,
    });

    Logger.createLog(`Error: ${err.message}`);
  
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
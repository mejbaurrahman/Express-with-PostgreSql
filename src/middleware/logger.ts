import type { NextFunction, Request, Response } from "express";
import fs from "fs";

const logger = (req: Request, res: Response, next: NextFunction) => {
  // console.log("Time: ", new Date().toISOString());
  const log = `Method: ${req.method}, URL: ${req.url}, Time: ${new Date().toISOString()}`;
  fs.appendFile("logger.txt", log + "\n", (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });
  next();
};

export default logger;

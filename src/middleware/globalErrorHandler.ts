import type { NextFunction, Request, Response } from "express";

const globalErrorHandler = () => {
  return (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
    next(err);
  };
};

export default globalErrorHandler;

import { error } from "console";
import type { Response } from "express";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  error?: any;
};
const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.statusCode >= 200 && data.statusCode < 300,
    message: data.message || "",
    data: data.data || null,
    error: data.error || null,
  });
};

export default sendResponse;

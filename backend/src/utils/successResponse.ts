import { Response } from "express";
import cleanObj from "./cleanObj";

const successResponse = (res: Response, message: string | null, data = {}) => {
  res.status(200).json(
    cleanObj({
      status: 200,
      message: message || "Retrieved successful",
      data,
    })
  );
};

export default successResponse;

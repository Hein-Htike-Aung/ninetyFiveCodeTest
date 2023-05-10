import { Response } from "express";
import errorResponse from "./errorResponse";

const alreadyExists = (res: Response) =>
  errorResponse(res, 401, "Already exists");

export default alreadyExists;

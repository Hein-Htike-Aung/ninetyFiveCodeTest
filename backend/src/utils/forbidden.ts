import { Response } from "express";
import errorResponse from "./errorResponse";

const forbidden = (res: Response) =>
  errorResponse(res, 401, "Forbidden action");

export default forbidden;

import { Response } from "express";

const handleError = (res: Response, error: unknown) => {
  res.status(500).json({
    status: 500,
    message: "Something went wrong",
    errors: error,
  });
};

export default handleError;

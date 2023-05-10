export interface ResponseError extends Error {
  status: number;
}

export interface ResponseObj {
  status: number;
  message: string;
  data?: object;
}

export interface ErrorResponseObj {
  status: number;
  message: string;
  errors?: object;
}

declare module "express" {
  interface Request {
    customer?: { id: number };
    librarian?: { id: number };
    files?: any;
  }
}

declare module "express-session" {
  export interface SessionData {
    username: string;
    access_token: string;
  }
}

export interface ParsedQs {
  [key: string]: string | number | ParsedQs | string[] | ParsedQs[] | undefined;
}

export type ReqHandler = RequestHandler<ParamsDictionary, ParsedQs>;

export type queryParam = string | ParsedQs | string[] | ParsedQs[] | undefined;

export type CountQRes = { count: number }[];

export interface createCustomerSchema {
  phone_no: string;
  channel: string;
  optionID: string;
}

export interface editCustomer {
  optionID: string;
  phone_no: string;
  lat: string;
  long: string;
  uuid: string;
  address: string;
  ph_model: string;
  gender: Gender;
  dob: string;
  contact: Array<string>;
}

export interface updatedCustomer {
  id: string;
  username: string;
  address: string;
  gender: Gender;
  dob: string;
  imageLink: string;
}

enum Gender {
  Male = "male",
  FeMale = "female",
}
export interface TokenBasedRequest extends Request {
  customer?: { id: number };
  librarian?: { id: number };
  headers: IncomingHttpHeaders;
}

export type TokenVerifyError =
  | JsonWebTokenError
  | NotBeforeError
  | TokenExpiredError;

export type TokenVerifyPayload = JwtPayload | { id: number };

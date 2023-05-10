import { object, string } from "yup";

const customerId = {
  params: object({
    customerId: string().required(),
  }),
};

export const createCustomerSchema = object({
  body: object({
    username: string().required(),
    password: string()
      .required()
      .matches(/^[0-9]+$/, "Password must be only digits")
      .min(6, "Password must be exactly 5 digits")
      .max(6, "Password must be exactly 5 digits"),
    email: string().required(),
    phoneNo: string().required(),
  }),
});

export const updateCustomerSchema = object({
  ...customerId,
  body: object({
    username: string().required(),
    password: string()
      .matches(/^[0-9]+$/, "Password must be only digits")
      .min(6, "Password must be exactly 5 digits")
      .max(6, "Password must be exactly 5 digits"),
    email: string().required(),
    phoneNo: string().required(),
  }),
});

export const customerIdParam = object({ ...customerId });

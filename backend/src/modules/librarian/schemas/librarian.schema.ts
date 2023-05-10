import { object, string } from "yup";

const librarianId = {
  params: object({
    librarianId: string().required(),
  }),
};

export const createLibrarianSchema = object({
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

export const updateUserSchema = object({
  ...librarianId,
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

export const librarianIdParam = object({ ...librarianId });

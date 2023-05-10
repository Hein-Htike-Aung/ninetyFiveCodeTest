import { boolean, number, object, string } from "yup";

const bookID = {
  params: object({
    bookID: string().required(),
  }),
};

export const createBookSchema = object({
  body: object({
    name: string().required(),
    category: string().required(),
    desc: string(),
    issued_date: string().required(),
    borrow_status: number(), 
  }),
});

export const updateBookSchema = object({
  ...bookID,
  body: object({
    name: string(),
    category: string(),
    desc: string(),
    issued_date: string(),
    borrow_status: number(),
  }),
});

export const bookIdParam = object({ ...bookID });

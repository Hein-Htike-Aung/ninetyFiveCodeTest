import { number, object, string } from "yup";

const bookOrderId = {
  params: object({
    bookOrderID: string().required(),
  }),
};

export const bookOrderSchema = object({
  body: object({
    book_id: number().required(),
    customer_id: number().required(),
    borrow_date: string(),
    return_date: string(),
    total_day: number(),
  }),
});

export const bookOrderReturnSchema = object({
  body: object({
    book_id: number(),
    customer_id: number(),
    borrow_date: string(),
    return_date: string(),
    total_day: number(),
  }),
});

export const bookOrderIdParam = object({ ...bookOrderId });

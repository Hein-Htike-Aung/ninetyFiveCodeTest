import { object, string } from "yup";

export const credentialSchema = object({
  body: object({
    email: string().required(),
    password: string().required(),
  }),
});

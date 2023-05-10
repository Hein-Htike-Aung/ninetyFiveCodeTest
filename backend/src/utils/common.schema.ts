import { object, string } from "yup";

const paginationQuery = object({
  query: object({
    page: string().required(),
    pageSize: string().required(),
  }),
});

const paginationPayload = {
  page: string().required(),
  pageSize: string().required(),
};

const fileNameParam = object({
  params: object({
    fileName: string().required(),
  }),
});

export { paginationQuery, paginationPayload, fileNameParam };

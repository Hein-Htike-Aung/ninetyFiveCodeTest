import express from "express";
import BookController from "../controllers/book.controller";
import validateRequest from "../../../middlewares/validate_request";
import { bookIdParam, createBookSchema, updateBookSchema } from "../schemas/book.schema";

const router = express.Router();

router.post(
    "/v1/books/create",
    [validateRequest(createBookSchema)],
    BookController.createBook
);

router.patch(
    "/v1/books/update/:bookID",
    [validateRequest(updateBookSchema)],
    BookController.updateBook
);

router.get(
    "/v1/books/list",
    BookController.bookList
);

router.get(
    "/v1/books/list_filter",
    BookController.bookListFilter
);

router.get(
    "/v1/books/by_id/:bookID",
    [validateRequest(bookIdParam)],
    BookController.getBookById
);

router.delete(
    "/v1/books/delete/:bookID",
    [validateRequest(bookIdParam)],
    BookController.deleteBook
);

router.get(
    "/v1/books/coverImg/:fileName",
    BookController.booKCoverImg
);

export default router;

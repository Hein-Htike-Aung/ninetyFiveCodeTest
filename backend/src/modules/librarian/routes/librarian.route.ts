import express from "express";
import validateRequest from "../../../middlewares/validate_request";
import { createLibrarianSchema, librarianIdParam } from "../schemas/librarian.schema";
import LibrarianController from "../controllers/librarian.controller";

const router = express.Router();

router.post(
    "/v1/librarians/create",
    [validateRequest(createLibrarianSchema)],
    LibrarianController.createLibrarian
);

router.patch(
    "/v1/librarians/update/:librarianID",
    [validateRequest(createLibrarianSchema)],
    LibrarianController.createLibrarian
);

router.get(
    "/v1/librarians/list",
    LibrarianController.librarianList
);

router.get(
    "/v1/librarians/list_filter",
    LibrarianController.librarianListFilter
);

router.get(
    "/v1/librarians/by_id/:librarianID",
    [validateRequest(librarianIdParam)],
    LibrarianController.getLibrarianById
);

router.delete(
    "/v1/librarians/delete/:librarianID",
    [validateRequest(librarianIdParam)],
    LibrarianController.deleteLibrarian
);

export default router;

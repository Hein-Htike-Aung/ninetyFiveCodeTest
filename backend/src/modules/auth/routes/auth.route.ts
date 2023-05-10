import express from "express";
import AuthController from "../controllers/auth.controller";
import validateRequest from "../../../middlewares/validate_request";
import { credentialSchema } from "../schemas/auth.schema";

const router = express.Router();

router.post(
    "/v1/auth/librarian_login",
    [validateRequest(credentialSchema)],
    AuthController.librarianLogin
);

router.post(
    "/v1/auth/customer_login",
    [validateRequest(credentialSchema)],
    AuthController.customerLogin
);

export default router;


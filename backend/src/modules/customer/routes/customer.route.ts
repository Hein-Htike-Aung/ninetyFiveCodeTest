import express from "express";
import validateRequest from "../../../middlewares/validate_request";
import CustomerController from "../controllers/customer.controller";
import { createCustomerSchema, updateCustomerSchema } from "../schemas/customer.schema";
import customer_jwt from "../../../middlewares/customer_jwt";

const router = express.Router();

router.post(
    "/v1/customers/sign_up",
    [validateRequest(createCustomerSchema)],
    CustomerController.signUpCustomer
);

router.patch(
    "/v1/customers/update/customerID",
    [validateRequest(updateCustomerSchema), customer_jwt],
    CustomerController.updateCustomer
);

export default router;

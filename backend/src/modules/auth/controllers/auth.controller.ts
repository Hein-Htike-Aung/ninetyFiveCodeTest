import { Request, Response } from "express";
import handleError from "../../../utils/handleError";
import LibrarianService from "../../librarian/services/librarian.service";
import errorResponse from "../../../utils/errorResponse";
import AuthService from "../services/auth.service";
import Librarian from "../../../models/librarian.model";
import successResponse from "../../../utils/successResponse";
import { omit } from "lodash";
import CustomerService from "../../customer/services/customer.service";
import Customer from "../../../models/customers.model";

export default class AuthController {
  /* Librarian Login */
  static librarianLogin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const librarian = await LibrarianService.findLibrarianByEmail(email);

      if (!librarian)
        return errorResponse(res, 403, "Invalid username or password");

      const access_token = await AuthService.validateUser<Librarian>(
        librarian,
        password
      );

      if (!access_token)
        return errorResponse(res, 401, "Invalid Username or password");

      return successResponse(res, "Successfully login", {
        access_token,
        ...omit(librarian, "password"),
      });
    } catch (error) {
      handleError(res, error);
    }
  };

  /* User Login */
  static customerLogin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const customer = await CustomerService.findCustomerByEmail(email);

      if (!customer)
        return errorResponse(res, 403, "Invalid username or password");

      const access_token = await AuthService.validateUser<Customer>(
        customer,
        password
      );

      if (!access_token)
        return errorResponse(res, 401, "Invalid Username or password");

      return successResponse(res, "Successfully login", {
        access_token,
        ...omit(customer, "password"),
      });
    } catch (error) {
      handleError(res, error);
    }
  };
}

import { Request, Response } from "express";
import { sequelize } from "../../../models";
import errorResponse from "../../../utils/errorResponse";
import handleError from "../../../utils/handleError";
import CustomerService from "../services/customer.service";
import AuthService from "../../auth/services/auth.service";
import Customer from "../../../models/customers.model";
import successResponse from "../../../utils/successResponse";
import { get } from "lodash";
import forbidden from "../../../utils/forbidden";
import unauthorized from "../../../utils/unathorized";
import isDuplicatedRecord from "../../../utils/isDuplicateRecord";
import alreadyExists from "../../../utils/alreadyExists";

export default class CustomerController {
  /* Sign up customer */
  static signUpCustomer = async (req: Request, res: Response) => {
    const transaction = await sequelize.transaction();

    try {
      const { email, password, phoneNo } = req.body;

      const existingCustomer =
        await CustomerService.findLibrarianByEmailOrPhone(email, phoneNo);

      if (existingCustomer) return errorResponse(res, 403, "Already exists");

      const hashedPassword = await AuthService.encryptPassword(password);

      await Customer.create({
        ...req.body,
        password: hashedPassword,
      });

      await transaction.commit();
      successResponse(res, "Customer created");
    } catch (error) {
      await transaction.rollback();
      handleError(res, error);
    }
  };

  /* Update Librarian */
  static updateCustomer = async (req: Request, res: Response) => {
    const transaction = await sequelize.transaction();

    try {
      const customerID = get(req.params, "customerID");

      const customer = req.customer;

      if (!customer) return unauthorized(res);

      if (customer.id !== Number(customerID)) return forbidden(res);

      const { email, password, phoneNo } = req.body;

      await CustomerService.findCustomerById(Number(customerID));

      const existingLibrarian =
        await CustomerService.findLibrarianByEmailOrPhone(email, phoneNo);

      if (isDuplicatedRecord(existingLibrarian, customerID))
        return alreadyExists(res);

      if (password) {
        const hashedPassword = await AuthService.encryptPassword(password);
        await Customer.update(
          {
            ...req.body,
            password: hashedPassword,
          },
          { where: { id: customerID } }
        );
      } else {
        await Customer.update({ ...req.body }, { where: { id: customerID } });
      }

      await transaction.commit();
      successResponse(res, "Updated");
    } catch (error) {
      await transaction.rollback();
      handleError(res, error);
    }
  };
}

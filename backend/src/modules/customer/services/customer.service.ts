import { Op } from "sequelize";
import Customer from "../../../models/customers.model";
import AppError from "../../../utils/appError";

export default class CustomerService {
  static findLibrarianByEmailOrPhone = async (
    email: string,
    phoneNo: string
  ) => {
    const customer = await Customer.findOne({
      where: {
        [Op.or]: {
          email,
          phoneNo,
        },
      },
      raw: true,
    });

    if (!customer) return null;

    return customer;
  };

  static findCustomerByEmail = async (email: string) => {
    const librarian = await Customer.findOne({
      where: {
        email,
      },
      raw: true,
    });

    if (!librarian) return null;

    return librarian;
  };

  static findCustomerById = async (id: number) => {
    const user = await Customer.findByPk(id, { raw: true });

    if (!user) throw new AppError("Customer not found", 404);

    return user;
  };
}

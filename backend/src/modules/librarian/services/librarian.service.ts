import { Op } from "sequelize";
import Librarian from "../../../models/librarian.model";
import AppError from "../../../utils/appError";

export default class LibrarianService {
  static findLibrarianByEmailOrPhone = async (
    email: string,
    phoneNo: string
  ) => {
    const librarian = await Librarian.findOne({
      where: {
        [Op.or]: {
          email,
          phoneNo,
        },
      },
      raw: true,
    });

    if (!librarian) return null;

    return librarian;
  };

  static findLibrarianById = async (id: number) => {
    const user = await Librarian.findByPk(id, { raw: true });

    if (!user) throw new AppError("Librarian not found", 404);

    return user;
  };

  static findLibrarianByEmail = async (email: string) => {
    const librarian = await Librarian.findOne({
      where: {
        email,
      },
      raw: true,
    });

    if (!librarian) return null;

    return librarian;
  };
}

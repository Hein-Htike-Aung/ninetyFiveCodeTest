import { Request, Response } from "express";
import successResponse from "../../../utils/successResponse";
import handleError from "../../../utils/handleError";
import { sequelize } from "../../../models";
import LibrarianService from "../services/librarian.service";
import errorResponse from "../../../utils/errorResponse";
import AuthService from "../../auth/services/auth.service";
import Librarian from "../../../models/librarian.model";
import { get, omit } from "lodash";
import isDuplicatedRecord from "../../../utils/isDuplicateRecord";
import alreadyExists from "../../../utils/alreadyExists";
import getPaginationData from "../../../utils/getPaginationData";
import emptyValue from "../../../utils/emptyValue";
import { Op } from "sequelize";

export default class LibrarianController {
  /* create Librarian */
  static createLibrarian = async (req: Request, res: Response) => {
    const transaction = await sequelize.transaction();
    try {
      const { email, password, phoneNo } = req.body;

      const existingLibrarian =
        await LibrarianService.findLibrarianByEmailOrPhone(email, phoneNo);

      if (existingLibrarian) return errorResponse(res, 403, "Already exists");

      const hashedPassword = await AuthService.encryptPassword(password);

      await Librarian.create({
        ...req.body,
        password: hashedPassword,
      });

      await transaction.commit();
      successResponse(res, "User created");
    } catch (error) {
      await transaction.rollback();
      handleError(res, error);
    }
  };

  /* Update Librarian */
  static updateLibrarian = async (req: Request, res: Response) => {
    const transaction = await sequelize.transaction();

    try {
      const librarianID = get(req.params, "librarianID");

      const { email, password, phoneNo } = req.body;

      await LibrarianService.findLibrarianById(Number(librarianID));

      const existingLibrarian =
        await LibrarianService.findLibrarianByEmailOrPhone(email, phoneNo);

      if (isDuplicatedRecord(existingLibrarian, librarianID))
        return alreadyExists(res);

      if (password) {
        const hashedPassword = await AuthService.encryptPassword(password);
        await Librarian.update(
          {
            ...req.body,
            password: hashedPassword,
          },
          { where: { id: librarianID } }
        );
      } else {
        await Librarian.update({ ...req.body }, { where: { id: librarianID } });
      }

      await transaction.commit();
      successResponse(res, "Updated");
    } catch (error) {
      await transaction.rollback();
      handleError(res, error);
    }
  };

  /* Librarian List */
  static librarianList = async (req: Request, res: Response) => {
    try {
      const { limit, offset } = getPaginationData(req.query);

      const { rows: librarians, count } = await Librarian.findAndCountAll({
        limit,
        offset,
        order: [["createdAt", "DESC"]],
        attributes: { exclude: ["password"] },
        raw: true,
      });

      successResponse(res, null, { librarians, count });
    } catch (error) {
      handleError(res, error);
    }
  };

  /* Librarian list filter */
  static librarianListFilter = async (req: Request, res: Response) => {
    try {
      const { offset, limit } = getPaginationData(req.query);
      const { username, email, phoneNo } = req.query;

      const { rows: librarians, count } = await Librarian.findAndCountAll({
        limit,
        offset,
        order: [["createdAt", "DESC"]],
        attributes: { exclude: ["password"] },
        raw: true,
        where: {
          username: {
            [Op.like]: emptyValue(username as string),
          },
          email: {
            [Op.like]: emptyValue(email as string),
          },
          phoneNo: {
            [Op.like]: emptyValue(phoneNo as string),
          },
        },
      });

      successResponse(res, null, { librarians, count });
    } catch (error) {
      handleError(res, error);
    }
  };

  /* Librarian by id */
  static getLibrarianById = async (req: Request, res: Response) => {
    try {
      const librarian_id = get(req.params, "librarianID");

      const user = await LibrarianService.findLibrarianById(
        Number(librarian_id)
      );

      successResponse(res, null, { ...omit(user, "password") });
    } catch (error) {
      handleError(res, error);
    }
  };

  /* Delete librarian by id */
  static deleteLibrarian = async (req: Request, res: Response) => {
    try {
      const librarianID = get(req.params, "librarianID");

      await Librarian.destroy({
        where: { id: librarianID },
      });

      successResponse(res, "user deleted");
    } catch (error) {
      handleError(res, error);
    }
  };
}

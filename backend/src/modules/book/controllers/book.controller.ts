import { Request, Response } from "express";
import { sequelize } from "../../../models";
import handleError from "../../../utils/handleError";
import FileUpload from "../../../utils/fileUpload";
import successResponse from "../../../utils/successResponse";
import Book from "../../../models/book.model";
import { get } from "lodash";
import getPaginationData from "../../../utils/getPaginationData";
import { Op } from "sequelize";
import emptyValue from "../../../utils/emptyValue";
import BookService from "../services/book.service";
import { Settings } from "../../../setting";
import errorResponse from "../../../utils/errorResponse";

export default class BookController {
  static createBook = async (req: Request, res: Response) => {
    const transaction = await sequelize.transaction();

    try {
      let cover_photo = "";

      if (req.files) {
        cover_photo = req.files.cover_photo;

        if (cover_photo) {
          cover_photo = FileUpload.upload(cover_photo);
        }
      }

      await Book.create({
        ...req.body,
        cover_photo,
      });

      await transaction.commit();
      successResponse(res, "Created");
    } catch (error) {
      await transaction.rollback();
      handleError(res, error);
    }
  };

  /* update book */
  static updateBook = async (req: Request, res: Response) => {
    const transaction = await sequelize.transaction();

    try {
      const bookID = get(req.params, "bookID");

      const book = await BookService.findBookById(Number(bookID));

      if (!book) return errorResponse(res, 404, "not found");

      let cover_photo = book.cover_photo;

      if (req.files) {
        cover_photo = req.files.cover_photo;

        if (cover_photo) {
          cover_photo = FileUpload.upload(cover_photo);
        }
      }

      await Book.update(
        {
          ...req.body,
          cover_photo,
        },
        {
          where: {
            id: bookID,
          },
        }
      );

      await transaction.commit();
      successResponse(res, "Updated");
    } catch (error) {
      await transaction.rollback();
      handleError(res, error);
    }
  };

  /* book list */
  static bookList = async (req: Request, res: Response) => {
    try {
      const { limit, offset, isPagination } = getPaginationData(req.query);

      if (isPagination) {
        const { rows: books, count } = await Book.findAndCountAll({
          limit,
          offset,
          order: [["createdAt", "DESC"]],
          raw: true,
        });

        successResponse(res, null, { books, count });
      } else {
        const { rows: books, count } = await Book.findAndCountAll({
          order: [["createdAt", "DESC"]],
          raw: true,
        });

        successResponse(res, null, { books, count });
      }
    } catch (error) {
      handleError(res, error);
    }
  };

  /* book list filter */
  static bookListFilter = async (req: Request, res: Response) => {
    try {
      const { offset, limit, isPagination } = getPaginationData(req.query);
      const { name, category } = req.query;

      if (isPagination) {
        const { rows: books, count } = await Book.findAndCountAll({
          limit,
          offset,
          order: [["createdAt", "DESC"]],
          attributes: { exclude: ["password"] },
          raw: true,
          where: {
            name: {
              [Op.like]: emptyValue(name as string),
            },
            category: {
              [Op.like]: emptyValue(category as string),
            },
          },
        });
        successResponse(res, null, { books, count });
      } else {
        const { rows: books, count } = await Book.findAndCountAll({
          order: [["createdAt", "DESC"]],
          attributes: { exclude: ["password"] },
          raw: true,
          where: {
            name: {
              [Op.like]: emptyValue(name as string),
            },
            category: {
              [Op.like]: emptyValue(category as string),
            },
          },
        });
        successResponse(res, null, { books, count });
      }
    } catch (error) {
      handleError(res, error);
    }
  };

  /* get book by id */
  static getBookById = async (req: Request, res: Response) => {
    try {
      const bookID = get(req.params, "bookID");

      const book = await BookService.findBookById(Number(bookID));

      successResponse(res, null, book);
    } catch (error) {
      handleError(res, error);
    }
  };

  static deleteBook = async (req: Request, res: Response) => {
    try {
      const bookID = get(req.params, "bookID");

      await Book.destroy({
        where: { id: bookID },
      });

      successResponse(res, "Deleted");
    } catch (error) {
      handleError(res, error);
    }
  };

  static booKCoverImg = (req: Request, res: Response) => {
    const fileName = get(req.params, "fileName");
    return res.sendFile(fileName, {
      root: Settings.BOOK_COVER_PATH + "/book/",
    });
  };
}

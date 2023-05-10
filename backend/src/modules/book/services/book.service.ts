import Book from "../../../models/book.model";
import AppError from "../../../utils/appError";

export default class BookService {
  static findBookById = async (id: number) => {
    const user = await Book.findByPk(id, { raw: true });

    if (!user) throw new AppError("Librarian not found", 404);

    return user;
  };
}

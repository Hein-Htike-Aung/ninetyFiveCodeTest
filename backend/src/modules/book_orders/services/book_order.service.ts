import { QueryTypes } from "sequelize";
import { sequelize } from "../../../models";
import Book from "../../../models/book.model";
import BookOrder from "../../../models/book_orders.model";
import Customer from "../../../models/customers.model";
import AppError from "../../../utils/appError";
import emptyValue from "../../../utils/emptyValue";

export default class BookOrderService {
  static findBookOrderById = async (id: number) => {
    const user = await BookOrder.findByPk(id, {
      raw: true,
      include: [Book, Customer],
    });

    if (!user) throw new AppError("Customer not found", 404);

    return user;
  };

  static bookOrderListFilter = async (
    customerName: string,
    bookName: string,
    orderStatus: string
  ) => {
    if (orderStatus === "all") {
      const q = `select * 
      from book_orders bo
      inner join books b
      on bo.book_id = b.id
      inner join customers c
      on c.id = bo.customer_id
      where bo.book_id in (
        select id from books where name like ?
      ) and 
      bo.customer_id in (
        select id from customers where username like ?
      )`;

      const bookOrders = await sequelize.query(q, {
        replacements: [emptyValue(bookName), emptyValue(customerName)],
        type: QueryTypes.SELECT,
      });

      return { bookOrders };
    } else if (orderStatus === "return") {
      const q = `select * 
    from book_orders bo
    inner join books b
    on bo.book_id = b.id
    inner join customers c
    on c.id = bo.customer_id
    where bo.book_id in (
      select id from books where name like ?
    ) and 
    bo.customer_id in (
      select id from customers where username like ?
    ) and bo.return_date is not null`;

      const bookOrders = await sequelize.query(q, {
        replacements: [emptyValue(bookName), emptyValue(customerName)],
        type: QueryTypes.SELECT,
      });

      return { bookOrders };
    } else if (orderStatus === "borrow") {
      const q = `select * 
    from book_orders bo
    inner join books b
    on bo.book_id = b.id
    inner join customers c
    on c.id = bo.customer_id
    where bo.book_id in (
      select id from books where name like ?
    ) and 
    bo.customer_id in (
      select id from customers where username like ?
    ) and bo.return_date is null`;

      const bookOrders = await sequelize.query(q, {
        replacements: [emptyValue(customerName), emptyValue(bookName)],
        type: QueryTypes.SELECT,
      });

      return { bookOrders };
    }
  };
}

import { Request, Response } from "express";
import { sequelize } from "../../../models";
import handleError from "../../../utils/handleError";
import Book from "../../../models/book.model";
import BookService from "../../book/services/book.service";
import errorResponse from "../../../utils/errorResponse";
import Customer from "../../../models/customers.model";
import CustomerService from "../../customer/services/customer.service";
import successResponse from "../../../utils/successResponse";
import { get } from "lodash";
import BookOrder from "../../../models/book_orders.model";
import BookOrderService from "../services/book_order.service";
import getPaginationData from "../../../utils/getPaginationData";
import emptyValue from "../../../utils/emptyValue";
import { QueryTypes } from "sequelize";

export default class BookOrderController {
  static orderBook = async (req: Request, res: Response) => {
    const transaction = await sequelize.transaction();

    try {
      const { book_id, customer_id } = req.body;

      const book = await BookService.findBookById(Number(book_id));
      if (!book) return errorResponse(res, 404, "book not found");

      const customer = await CustomerService.findCustomerById(
        Number(customer_id)
      );
      if (!customer) return errorResponse(res, 404, "customer not found");

      if (customer.borrowed_count === 5)
        return errorResponse(res, 400, "Can't borrow more than 5 books");

      if (book.borrow_status)
        return errorResponse(res, 400, "This book is taken another customer");

      // book borrow status
      await Book.update(
        {
          borrow_status: true,
        },
        {
          where: {
            id: book.id,
          },
        }
      );

      // change customer borrow count
      await Customer.update(
        {
          borrowed_count: customer.borrowed_count + 1,
        },
        {
          where: {
            id: customer_id,
          },
        }
      );

      await BookOrder.create({
        ...req.body,
      });

      await transaction.commit();
      successResponse(res, "Order created");
    } catch (error) {
      await transaction.rollback();
      handleError(res, error);
    }
  };

  /* return book */
  static returnBook = async (req: Request, res: Response) => {
    const transaction = await sequelize.transaction();

    try {
      const bookOrderID = get(req.params, "bookOrderID");

      const bookOrder = await BookOrderService.findBookOrderById(
        Number(bookOrderID)
      );

      if (!bookOrder) return errorResponse(res, 404, "order not found");

      const customer = await CustomerService.findCustomerById(
        Number(bookOrder.customer_id)
      );
      if (!customer) return errorResponse(res, 404, "customer not found");

      await BookOrder.update(
        {
          return_date: sequelize.literal("CURRENT_TIMESTAMP"),
        },
        {
          where: {
            id: bookOrderID,
          },
        }
      );

      // change borrow status
      await Book.update(
        {
          borrow_status: false,
        },
        {
          where: {
            id: bookOrder.book_id,
          },
        }
      );

      // change customer borrow count
      await Customer.update(
        {
          borrowed_count: customer.borrowed_count - 1,
        },
        {
          where: {
            id: bookOrder.customer_id,
          },
        }
      );

      await transaction.commit();
      successResponse(res, "Book returned");
    } catch (error) {
      await transaction.rollback();
      handleError(res, error);
    }
  };

  /* book orders by customerId */
  static bookOrdersForCustomer = async (req: Request, res: Response) => {
    try {
      const { customerID } = req.query;
      const { offset, limit } = getPaginationData(req.query);

      const { rows: bookOrders, count } = await BookOrder.findAndCountAll({
        include: [
          {
            model: Customer,
          },
          {
            model: Book,
          },
        ],
        where: {
          customer_id: Number(customerID),
        },
        limit,
        offset,
        order: [["createdAt", "DESC"]],
      });

      successResponse(res, null, { bookOrders, count });
    } catch (error) {
      console.log(error);
      handleError(res, error);
    }
  };

  /* book orders list */
  static bookOrdersList = async (req: Request, res: Response) => {
    try {
      const q = `select * 
      from book_orders bo
      inner join books b
      on bo.book_id = b.id
      inner join customers c
      on c.id = bo.customer_id`;

      const bookOrders = await sequelize.query(q, {
        type: QueryTypes.SELECT,
      });

      successResponse(res, null, { bookOrders });
    } catch (error) {
      handleError(res, error);
    }
  };

  /* book list filter */
  static bookOrderListFilter = async (req: Request, res: Response) => {
    try {
      const { customerName, bookName, orderStatus } = req.query;

      const bookOrders = await BookOrderService.bookOrderListFilter(
        customerName as string,
        bookName as string,
        orderStatus as string
      );

      successResponse(res, null, bookOrders);
    } catch (error) {
      handleError(res, error);
    }
  };

  static bookOrderById = async (req: Request, res: Response) => {
    try {
      const bookOrderID = get(req.params, "bookOrderID");

      const bookOrder = await BookOrderService.findBookOrderById(
        Number(bookOrderID)
      );
      successResponse(res, null, bookOrder);
    } catch (error) {
      handleError(res, error);
    }
  };
}

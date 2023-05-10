import express from 'express';
import validateRequest from '../../../middlewares/validate_request';
import { customerIdParam } from '../../customer/schemas/customer.schema';
import BookOrderController from '../controllers/book_order.controller';
import { bookOrderIdParam, bookOrderReturnSchema, bookOrderSchema } from '../schemas/book_order.schema';

const router = express.Router();

router.post(
    "/v1/book_orders/order_book",
    [validateRequest(bookOrderSchema)],
    BookOrderController.orderBook
);

router.post(
    "/v1/book_orders/return_book/:bookOrderID",
    BookOrderController.returnBook
);

router.get(
    "/v1/book_orders/for_customer",
    BookOrderController.bookOrdersForCustomer
);

router.get(
    "/v1/book_orders/by_id/:bookOrderID",
    [validateRequest(bookOrderIdParam)],
    BookOrderController.bookOrderById
);

router.get(
    "/v1/book_orders/list",
    BookOrderController.bookOrdersList
);

router.get(
    "/v1/book_orders/list_filter",
    BookOrderController.bookOrderListFilter
);

export default router;
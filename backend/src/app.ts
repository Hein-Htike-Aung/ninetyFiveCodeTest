import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import fileUpload from "express-fileupload";

import errorHandler from "./middlewares/errorHandler";
import notFound from "./middlewares/notFound";
import { modelList } from "./utils/modelsList";
import BookRouter from "./modules/book/routes/book.route";
import AuthRouter from "./modules/auth/routes/auth.route";
import BookOrder from './modules/book_orders/routes/book_order.route'

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Initialize Models
modelList;

app.use("/api", BookRouter);
app.use("/api", AuthRouter);
app.use("/api", BookOrder);

app.use(notFound);
app.use(errorHandler);

export default app;

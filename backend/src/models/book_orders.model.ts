import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from ".";
import Customer from "./customers.model";
import Book from "./book.model";

class BookOrder extends Model<
  InferAttributes<BookOrder>,
  InferCreationAttributes<BookOrder>
> {
  declare id: CreationOptional<number>;
  declare book_id: number;
  declare customer_id: number;
  declare borrow_date: CreationOptional<Date>;
  declare return_date: CreationOptional<Date>;
  declare total_day: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

BookOrder.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "books",
        key: "id",
      },
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "customers",
        key: "id",
      },
    },
    borrow_date: {
      type: "TIMESTAMP",
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    return_date: {
      type: "TIMESTAMP",
    },
    total_day: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE(6),
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE(6),
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "BookOrder",
    tableName: "book_orders",
    timestamps: true,
    paranoid: false,
  }
);

Customer.hasMany(BookOrder, {
  foreignKey: "customer_id",
});

BookOrder.belongsTo(Customer, {
  foreignKey: "customer_id",
});

Book.hasMany(BookOrder, {
  foreignKey: "book_id",
});

BookOrder.belongsTo(Book, {
  foreignKey: "book_id",
});

export default BookOrder;

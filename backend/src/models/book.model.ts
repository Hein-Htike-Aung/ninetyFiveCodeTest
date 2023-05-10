import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from ".";

class Book extends Model<InferAttributes<Book>, InferCreationAttributes<Book>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare category: string;
  declare desc: CreationOptional<string>;
  declare cover_photo: CreationOptional<string>;
  declare issued_date: Date;
  declare borrow_status: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Book.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT,
    },
    cover_photo: {
      type: DataTypes.BLOB,
    },
    borrow_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    issued_date: {
      type: "TIMESTAMP",
      allowNull: false,
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
    modelName: "Book",
    tableName: "books",
    timestamps: true,
    paranoid: false,
  }
);

export default Book;

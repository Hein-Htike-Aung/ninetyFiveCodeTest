import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from ".";

class Librarian extends Model<
  InferAttributes<Librarian>,
  InferCreationAttributes<Librarian>
> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare password: string;
  declare email: string;
  declare phoneNo: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Librarian.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "uniqueTag",
      validate: {
        isEmail: true,
      },
    },
    phoneNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "uniqueTag",
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
    modelName: "Librarian",
    tableName: "librarians",
    timestamps: true,
    paranoid: false,
    indexes: [
      {
        name: "credentials",
        fields: ["username", "email"],
      },
    ],
  }
);


export default Librarian;
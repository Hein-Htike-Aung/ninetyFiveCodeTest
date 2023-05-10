import { sequelize } from "../models/index";

const sequelize_date_search = (field: string, value: string) =>
  sequelize.where(sequelize.fn("date", sequelize.col(field)), "=", value);

export default sequelize_date_search;

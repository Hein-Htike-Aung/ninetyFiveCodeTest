import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default class AuthService {
  static validateUser = async <T extends { id: number; password: string }>(
    targetObj: T,
    password: string
  ) => {
    if (!targetObj || !bcrypt.compareSync(password, targetObj.password))
      return false;

    const access_token = jwt.sign(
      { id: targetObj.id },
      process.env.ACCESS_TOKEN_SECRET || "Secret",
      {
        algorithm: "HS256",
        expiresIn: "6hr",
      }
    );

    return access_token;
  };

  static encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(
      process.env.SALT ? +process.env.SALT : 10
    );

    return bcrypt.hashSync(password, salt);
  };
}

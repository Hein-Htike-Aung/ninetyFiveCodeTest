import path from "path";
import { Settings } from "../setting";

export default class FileUpload {
  static upload(file: any) {
    const uploadPath = new Date().getTime() + path.extname(file.name);
    file.mv(Settings.BOOK_COVER_PATH + "/book/" + uploadPath);
    return uploadPath;
  }
}

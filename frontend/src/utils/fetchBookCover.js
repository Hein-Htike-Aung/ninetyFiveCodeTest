import getImage from "./getImage";
import { Buffer } from "buffer";

const fetchBookCover = async (b) => {
  const dataBuffer = Buffer.from(b.cover_photo);
  const utf16Decoder = new TextDecoder("UTF-8");
  const photo = utf16Decoder.decode(dataBuffer);

  // const res = await jwtReq.current.get(
  //   `http://localhost:8080/api/v1/books/coverImg/${photo}`
  // );

  if (photo) {
    const [response, error] = await getImage(
      `http://localhost:8080/api/v1/books/coverImg/${photo}`
    );
    b.coverImg = response;
    return response;
  }
};

export default fetchBookCover;

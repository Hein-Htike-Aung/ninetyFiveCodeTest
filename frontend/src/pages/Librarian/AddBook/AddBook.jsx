import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./add_book.scss";
import useJWT from "../../../hooks/useJwt";
import ContentTitle from "../../../components/layout/content-title/ContentTitle";
import { categories } from "../../../utils/constant";
import StyledDesktopDatePicker from "../../../components/form/StyledDesktopDatePicker";
import { Buffer } from "buffer";
import ImageUploadCard from "../../../components/widgets/image-upload-card/ImageUploadCard";
import ContainedButton from "../../../components/form/contained-button/ContainedButton";
import { toast } from "react-toastify";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import moment from "moment";
import fetchBookCover from "../../../utils/fetchBookCover";

const AddBook = () => {
  const { bookId: bookID } = useParams();
  const navigate = useNavigate();
  const axiosJWT = useJWT();
  const jwtReq = useRef(axiosJWT);
  const [issued_date, setIssued_date] = useState(null);
  const [issued_dateError, setIssued_dateError] = useState(null);
  const [image, setImage] = useState(null);

  const [book, setBook] = useState();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    setError,
  } = useForm();

  const fetchBook = async (id) => {
    const res = await jwtReq.current.get(`/books/by_id/${id}`);

    setBook(res.data.data);
  };

  useEffect(() => {
    if (bookID !== "0") fetchBook(Number(bookID));
  }, [bookID]);

  const fetchCover = async (book) => {
    return await fetchBookCover(book);
  };

  useEffect(() => {
    if (book) {
      setValue("name", book.name);
      setValue("category", book.category);
      setValue("desc", book.desc);
      setValue("borrow_status", book.borrow_status);
      setIssued_date(dayjs(new Date(book.issued_date)));
      const dataBuffer = Buffer.from(book.cover_photo);
      const utf16Decoder = new TextDecoder("UTF-8");
      const photo = utf16Decoder.decode(dataBuffer);

      if (photo) {
        fetchCover(book).then((data) => setImage(data));
      }
    }
  }, [book, setValue]);

  // handle change
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const submitHandler = async (formValues) => {
    if (!issued_date) {
      setIssued_dateError(true);
      return;
    }

    if (bookID !== "0") {
      // edit
      if (file) {
        try {
          setLoading(true);

          const formData = new FormData();
          formData.append("cover_photo", file);
          formData.append("name", formValues.name);
          formData.append("category", formValues.category);
          formData.append("desc", formValues.desc);
          formData.append(
            "issued_date",
            moment(issued_date).format("YYYY-MM-DD HH:mm:ss")
          );

          const res = await axios({
            method: "patch",
            url: `http://localhost:8080/api/v1/books/update/${bookID}`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          });

          setLoading(false);
          res.data && navigate("/librarian-user/books", { replace: true });
        } catch (error) {
          setLoading(false);
          toast.error(error.response.data.message);
        }
      } else {
        try {
          delete formValues.cover_photo;
          setLoading(true);
          const res = await jwtReq.current.patch(`/books/update/${bookID}`, {
            ...formValues,
            issued_date: moment(issued_date).format("YYYY-MM-DD HH:mm:ss"),
          });
          setLoading(false);
          res.data && navigate("/librarian-user/books", { replace: true });
        } catch (error) {
          setLoading(false);
          toast.error(error.response.data.message);
        }
      }
    } else {
      // add new
      if (file) {
        try {
          setLoading(true);

          const formData = new FormData();
          formData.append("cover_photo", file);
          formData.append("name", formValues.name);
          formData.append("category", formValues.category);
          formData.append("desc", formValues.desc);
          formData.append(
            "issued_date",
            moment(issued_date).format("YYYY-MM-DD HH:mm:ss")
          );

          const res = await axios({
            method: "post",
            url: "http://localhost:8080/api/v1/books/create",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          });
          setLoading(false);
          res.data && navigate("/librarian-user/books", { replace: true });
        } catch (error) {
          setLoading(false);
          toast.error(error.response.data.message);
        }
      } else {
        try {
          setLoading(true);
          delete formValues.cover_photo;
          const res = await jwtReq.current.post(`/books/create`, {
            ...formValues,
            issued_date: moment(issued_date).format("YYYY-MM-DD HH:mm:ss"),
          });
          setLoading(false);
          res.data && navigate("/librarian-user/books", { replace: true });
        } catch (error) {
          setLoading(false);
          toast.error(error.response.data.message);
        }
      }
    }
  };

  return (
    <div className="bookEdit">
      <ContentTitle title={`Books | ${bookID !== "0" ? "Edit" : "Add"}`} />

      <div className="bookEditWrapper">
        <form
          className="bookEditForm"
          onSubmit={handleSubmit(submitHandler)}
          onDragEnter={handleDrag}
        >
          <div className="left card">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className={`input ${errors.name && "inputError"}`}
                {...register("name", {
                  required: "Name is required",
                })}
              />
              {errors.name && <p className="errorMsg">{errors.name.message}</p>}
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                {...register("category", {
                  required: true,
                })}
                className="select"
              >
                {categories?.map((c, idx) => (
                  <option key={idx} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Issued Date</label>
              <StyledDesktopDatePicker
                width={20}
                removeWhiteSpace={true}
                name="receiveDate"
                validation={() => {}}
                value={issued_date}
                hasError={false}
                errorMessage=""
                onChange={(newValue) => setIssued_date(newValue)}
              />
              {issued_dateError && (
                <p className="errorMsg">{"Issued date is required"}</p>
              )}
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className={`textarea ${errors.desc && "inputError"}`}
                rows={4}
                {...register("desc", {
                  required: "Description is required",
                })}
              />
              {errors.desc && <p className="errorMsg">{errors.desc.message}</p>}
            </div>
          </div>
          <div className="right">
            <div className="card">
              <div className="rightWrapper">
                <div className="form-group">
                  <label>Cover Image</label>
                  <ImageUploadCard
                    attrName="cover_photo"
                    dragActive={dragActive}
                    errors={errors}
                    file={file}
                    handleDrag={handleDrag}
                    register={register}
                    setDragActive={setDragActive}
                    setFile={setFile}
                    img={image}
                  />
                  {errors.img && (
                    <p className="errorMsg">{errors.img.message}</p>
                  )}
                </div>
              </div>
            </div>
            <ContainedButton
              title={`${bookID !== "0" ? "Edit Category" : "Create Category"}`}
              height={2.5}
              width={22.8}
              btnClick={() => {}}
              loading={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;

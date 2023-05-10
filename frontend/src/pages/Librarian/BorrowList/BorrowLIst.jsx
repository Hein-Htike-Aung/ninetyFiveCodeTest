import React, { useEffect, useRef, useState } from "react";
import OutlinedButton from "../../../components/form/outlined-button/OutlinedButton";
import "./borrow_list.scss";
import useJWT from "../../../hooks/useJwt";
import {
  FormControlLabel,
  Pagination,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { StyledTableCell } from "../../../components/form/StyledTableCell";
import fetchBookCover from "../../../utils/fetchBookCover";

const BorrowLIst = () => {
  const [books, setBooks] = useState();
  const [booksCount, setBooksCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const axiosJwt = useJWT();
  const jwtReq = useRef(axiosJwt);

  const [customerName, setCustomerName] = useState("");
  const [bookName, setBookName] = useState("");
  const [orderStatus, setOrderStatus] = useState();

  useEffect(() => {
    fetchAllBooksOrder(currentPage);
  }, [currentPage]);

  const fetchAllBooksOrder = async (currentPage) => {
    const res = await jwtReq.current.get(`/book_orders/list`);

    const books = res.data.data.bookOrders;

    if (books.length) {
      await Promise.all(
        books.map(async (b) => {
          if (b.cover_photo) {
            await fetchBookCover(b);
          }
        })
      );

      setBooks(books);
    }
  };

  const searchBook = async () => {
    const res = await jwtReq.current.get(
      `/book_orders/list_filter?customerName=${customerName}&bookName=${bookName}&orderStatus=${
        orderStatus || "all"
      }`
    );

    const books = res.data?.data?.bookOrders;

    if (books?.length) {
      await Promise.all(
        books.map(async (b) => {
          if (b.cover_photo) {
            await fetchBookCover(b);
          }
        })
      );
    }
    setBooks(books);
  };

  return (
    <div className="bookOrders">
      <div className="searchWrapper">
        <div className="search">
          <SearchIcon />
          <input
            type="text"
            onChange={(e) => setBookName(e.target.value)}
            placeholder="Book"
            className="searchInput"
          />
        </div>
        <div className="search">
          <SearchIcon />
          <input
            type="text"
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Customer"
            className="searchInput"
          />
        </div>
        <select
          onChange={(e) => setOrderStatus(e.target.value)}
          className="orderSelect"
        >
          <option value={"all"}>All</option>
          <option value={"borrow"}>Borrow</option>
          <option value={"return"}>Return</option>
        </select>

        <button
          className="outlinedButton"
          style={{ height: 40 }}
          onClick={searchBook}
        >
          Search
        </button>
      </div>

      <TableContainer component={Paper} className="bookTable">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead sx={{ width: 100 }}>
            <TableRow>
              <StyledTableCell>Customer</StyledTableCell>
              <StyledTableCell>Book</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Borrow date</StyledTableCell>
              <StyledTableCell>Return date</StyledTableCell>
              <StyledTableCell>Borrow Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books?.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.username}</TableCell>
                <TableCell>
                  <div className="bookNameRow">
                    <img
                      className="bookImg"
                      src={
                        row.coverImg ||
                        "data:image/jpeg;base64,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"
                      }
                      alt=""
                    />{" "}
                    {row.name}
                  </div>
                </TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>
                  {new Date(row.borrow_date).toDateString()}
                </TableCell>
                <TableCell>
                  {row.return_date
                    ? new Date(row.return_date).toDateString()
                    : "-"}
                </TableCell>
                <TableCell>
                  {row.return_date ? (
                    <span className="errorBudget">Returned</span>
                  ) : (
                    <span className="successBudget">Borrow</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BorrowLIst;

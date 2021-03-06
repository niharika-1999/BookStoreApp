import React, { useEffect, useState } from "react";
import "../styles/appbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import { useSelector } from "react-redux";
import { setSearchedBooks } from "../actions/booksAction";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../actions/booksAction";

export default function Appbar() {
  const [search, setSearch] = useState("");
  const myBooks = useSelector((state) => state.allBooks.books);
  const dispatch = useDispatch();

  const handleSearch = (searchValue) => {
    setSearch(searchValue);
    dispatch(setCurrentPage(1));
  };

  useEffect(() => {
    console.log();
    dispatch(
      setSearchedBooks(
        myBooks.filter((item) => {
          return (
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.author.toLowerCase().includes(search.toLowerCase())
          );
        })
      )
    );
  }, [search, myBooks]);

  return (
    <nav>
      <div className="navWide">
        <div className="wideDiv">
          <div className="heading-icon">
            <div className="heading">BookStore</div>
          </div>

          <div className="search-bar">
            <TextField
              placeholder="Search…"
              id="search-bar"
              variant="outlined"
              onChange={(e) => handleSearch(e.target.value)}
              style={{ margin: "0px 25% 0px 5%" }}
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <SearchIcon id="search-icon" />
                    </IconButton>
                  </InputAdornment>
                ),
                style: { height: "40px", backgroundColor: "white" },
              }}
            />
          </div>
          <div className="cart-icon" />
          <div className="cart">Cart</div>
        </div>
      </div>
    </nav>
  );
}
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Typography, Button, FormControl, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import "../styles/books.scss";
import PaginationPage from "./Pagination";
import { sortByPrice, setCurrentPage } from "../actions/booksAction";

const useStyles = makeStyles((theme) => ({
    bookName: {
        fontSize: "13px",
        fontWeight: "bold",
    },
    bookAuthor: {
        fontSize: "12px",
    },
    bookQuantity: {
        fontSize: "12px",
    },
    bookPrize: {
        fontSize: "13px",
        fontWeight: "bold",
    },
    addToBagButton: {
        padding: "3px 4px 3px 4px",
        margin: "5px",
        width: "85px",
        fontSize: "11px",
        backgroundColor: "#A03037",
        color: "#ffff",
        borderRadius: "2px",
    },
    addedBagButton: {
        backgroundColor: "#1976D2",
        width: "170px",
        margin: "5px",
        color: "#ffff",
        borderRadius: "2px",
        fontSize: "11px",
    },
    wishListButton: {
        padding: "3px 4px 3px 4px",
        margin: "5px",
        width: "80px",
        fontSize: "13px",
        borderRadius: "2px",
        fontWeight: "bold",
    },

    optionSelect: {
        padding: "5px 5px",
    },

    container: {
        paddingTop: theme.spacing(10),
        maxWidth:'774px'
    },
}));

export default function BookCard() {
    const classes = useStyles();
    const books = useSelector((state) => state.allBooks.searchedBooks);
    const currentPage = useSelector((state) => state.allBooks.currentPage);
    const [booksPerPage] = useState(12);
    const [sort, setSort] = useState("");
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
    const paginate = (pageNumber) => dispatch(setCurrentPage(pageNumber));
    console.log(books);
    const dispatch = useDispatch();

    const handleSort = (e) => {
        setSort(e.target.value);
        dispatch(sortByPrice(e.target.value));
    };
    return (
        <div className="displayBook">
            <br />
            <span className="topContent">
                <div>
                    Books <font className="bookSize">({books.length} items)</font>{" "}
                </div>
                <div>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <Select
                            className={classes.optionSelect}
                            native
                            inputProps={{ name: "type" }}
                            value={sort}
                            onChange={handleSort}
                        >
                            <option value={"rel"}>Sort by Relevance</option>
                            <option value={"asc"}>Price: Low to High</option>
                            <option value={"desc"}>Price: High to Low</option>
                            <option value={"new"}>Newest Arrival</option>
                        </Select>
                    </FormControl>
                </div>
            </span>
            <div className="allBooks">
                {currentBooks.map((data) => (
                    <div className="bookContainer">
                        <div className="imageContainer">
                            <img className="bookImage" src={data.image} alt="" />
                        </div>
                        <div className="infoContainer">
                            <Typography className={classes.bookName}>{data.title}</Typography>
                            <Typography className={classes.bookAuthor}>
                                {data.author}
                            </Typography>

                            <Typography className={classes.bookPrize}>
                                Rs. {data.price}
                            </Typography>
                        </div>
                        <div className="buttonContainer">
                            <Button className={classes.addToBagButton}>Add to bag</Button>
                            <Button className={classes.wishListButton}>Wishlist</Button>
                        </div>
                        <div className="descClass">
                            <Typography className={
                                classes.bookName
                            }>Book Detail</Typography>
                            {
                                data.description
                            } </div>
                    </div>
                ))}
            </div>
            <div className="pagination-box">
                <PaginationPage
                    booksPerPage={booksPerPage}
                    totalBooks={books.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
}
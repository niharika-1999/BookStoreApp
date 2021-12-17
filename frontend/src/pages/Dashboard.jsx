import React, {useEffect,useState} from "react";
import { getAllBooks } from "../service/booksInDashboard";
import {useDispatch} from "react-redux";
import {setBooks,setCart} from "../actions/booksAction";
import Appbar from '../components/Appbar';
import BookCard from "../components/BookCard";
import Paper from '@mui/material/Paper';
import { cartGet } from "../service/cartService";
import "../styles/dashboard.scss"

export default function Dashboard() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        fetchitem(); 
        fetchCart();
    }, []);

    const fetchitem = () => {
        getAllBooks().then((res) => {
            dispatch(setBooks(res.data));
        }).catch((err) => {
            console.log(err); 
        });
    };

    const fetchCart = () => {
        cartGet().then((res) => {
            dispatch(setCart(res.data[0]));
        }).catch((err) => {
            console.log(err);
        });
    }
    
    return (
        <>
          <Appbar />
          <Paper
            variant="outlined"
            sx={{ m: { xs: 2, md: 6 }, p: { xs: 2, md: 3 }, border: "none" }}
          >
            <BookCard />
          </Paper>
          <div style={{ paddingTop: "62em" }}>
          </div>
        </>
      );
    }
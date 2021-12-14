import React, { useEffect } from "react";
import { cartGet } from "../service/cartService";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../actions/booksAction";
import Appbar from "../components/Appbar";
import CartCard from "../components/Cart";
import Paper from "@mui/material/Paper";
import "../styles/dashboard.scss";

export default function Cart() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCart(); 
  }, []);

  const fetchCart = () => {
    cartGet()
      .then((res) => {
        dispatch(setCart(res.data[0]));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cart = useSelector((state) => state.allBooks.cartContents);

  return (
    <>
      <Appbar />
      <Paper
        variant="outlined"
        sx={{ m: { xs: 2, md: 6 }, p: { xs: 2, md: 3 }, border: "none" }}
      >
        {cart.length === undefined ? (
          <CartCard cart={cart} />
        ) : (
         console.log("abc")   
        )}
      </Paper>
    </>
  );
}
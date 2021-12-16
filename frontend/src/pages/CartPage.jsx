import React, { useEffect } from "react";
import { cartGet } from "../service/cartService";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../actions/booksAction";
import Appbar from "../components/Appbar";
import CartCard from "../components/Cart";
import Paper from "@mui/material/Paper";
import "../styles/dashboard.scss";
import Typography from '@mui/material/Typography';

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
      {cart && cart.length === undefined ? (
        <CartCard cart={cart} />
      ) : (
        <Paper
          variant="outlined"
          sx={{ m: { xs: 1, md: 5 }, p: { xs: 1, md: 2 }, maxWidth: "724px" }}
        >
          <Typography variant="h6" gutterBottom sx={{ py: 3 }}>
            My Cart (0 items)
          </Typography>
        </Paper>
      )}
    </>
  );
}
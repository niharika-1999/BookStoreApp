import React, { useState } from "react";
import { Typography, IconButton, Button, Paper } from "@material-ui/core";
import "../styles/cart.scss";
import Grid from "@mui/material/Grid";
import useStyles from "../components/BookCard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { setCart } from "../actions/booksAction";
import { useDispatch } from "react-redux";
import { deleteItems, create } from "../service/cartService";

export default function Cart({ cart }) {
  const classes = useStyles();
  const [showCustomer, setShowCustomer] = useState(false);
  const dispatch = useDispatch();
  const handleQuantity = (productId, quantity) => {
    const data = {
      productId: productId,
      quantity: quantity,
    };
    create(data)
      .then((res) => {
        dispatch(setCart(res.data));
      })
      .catch((err) => console.log(err.message));
  };
  const handleRemove = (productId) => {
    deleteItems(productId)
      .then((res) => {
        dispatch(setCart(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const placeOrder = () => {
    setShowCustomer(true);
  };
  return (
    <>
      <Paper
        variant="outlined"
        sx={{ m: { xs: 2, md: 6 }, p: { xs: 2, md: 3 } ,maxWidth:'500px' }}
      >
        <Typography variant="h6" style={{paddingLeft:"2em", paddingTop:"1em"}} gutterBottom>
          My Cart ({cart.items.length} items)
        </Typography>

        {cart.items.map((data) => (
          <Grid container spacing={4} style={{paddingLeft:"2.5em"}}>
            <Grid item xs={4} sx={{ p: 2 }}>
              <img className="bookImage" src={data.image} alt="" />
            </Grid>
            <Grid item xs={8}>
              <div className="infoContainer">
                <Typography className={classes.bookName} style={{fontSize:"17px", color:"#0A0102", fontFamily:"Lato", paddingBottom:"0.35em"}}>
                  {" "}
                  {data.name}{" "}
                </Typography>
                <Typography className={classes.bookAuthor} style={{fontSize:"12px", color:"#9D9D9D", fontFamily:"Lato", paddingBottom:"0.35em"}}>
                  by {" "}
                  {data.author}{" "}
                </Typography>
                <Typography className={classes.bookPrize} style={{fontSize:"18px", color:"#0A0102", fontFamily:"Lato"}}>
                <b>Rs. {data.price}{" "}</b>
                </Typography>
              </div>
              <div class="quantity-operations">
                <IconButton
                  onClick={() => {
                    handleQuantity(data.productId, -1);
                  }}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={data.quantity}
                  name="quantity"
                />
                <IconButton
                  onClick={() => {
                    handleQuantity(data.productId, 1);
                  }}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
                <Button
                  variant="text"
                  onClick={() => {
                    handleRemove(data.productId);
                  }}
                >
                  Remove
                </Button>
              </div>
            </Grid>
          </Grid>
        ))}
        <div align="right" style={{paddingRight:"1em" , paddingBottom:"0.85em"}}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            placeOrder();
          }}
        >
          Place Order
        </Button>
        </div>
      </Paper>
    </>
  );
}
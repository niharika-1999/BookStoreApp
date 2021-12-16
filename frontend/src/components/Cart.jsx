import React, { useState } from "react";
import { Typography, IconButton, Button, Paper } from "@material-ui/core";
import "../styles/cart.scss";
import Grid from "@mui/material/Grid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { setCart } from "../actions/booksAction";
import { useDispatch } from "react-redux";
import { deleteItems, create } from "../service/cartService";
import CustomerDetails from "./CustomerDetails";
import Order from "./OrderSummary";

export default function Cart({ cart }) {
  const [showCustomer, setShowCustomer] = useState(false);
  const [showOrder,setShowOrder]=useState(false);
  const [orders,setOrder]=useState([]);
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
    if(cart.items.length === 0) {
        setShowCustomer(false);
        console.log(cart.items.length);
        window.location="/dashboard";
      }
    };
    return (
        <>
          <div className="mainCart" style={{ paddingLeft: "12.6em" }}>
            <Paper
              variant="outlined"
              className="paper"
              sx={{ m: { xs: 1, md: 5 }, p: { xs: 1, md: 2 }, maxWidth: "700px" }}
            >
              <Typography
                variant="h6"
                style={{ paddingLeft: "1em", paddingTop: "1em" }}
                gutterBottom
              >
                My Cart ({cart.items.length})
              </Typography>
    
              {cart.items.map((data) => (
                <div className="cartConatiner">
                  <div container className="myCart" spacing={4} style={{ paddingLeft: "2.5em" }}>
                    <div className="image" align="left">
                    <Grid item xs={4} sx={{ p: 2 }}>
                      <img className="bookImage" src={data.image} alt="" />
                    </Grid>
                    </div>
                    <div className="bookDetails" align="right"> 
                    <Grid item xs={8} className="grid">
                        <Typography
                        align="left"
                          style={{ fontWeight: "bold", fontSize: "17px" }}
                        >
                          {data.name}
                        </Typography>
                        <Typography
                        align="left"
                          color="text.secondary"
                          style={{ fontSize: "14px", color:"#9D9D9D" }}
                        >
                          by {data.author}
                        </Typography>
                        <Typography
                        align="left"
                          style={{ fontWeight: "bold", fontSize: "17px" }}
                        >
                          Rs {data.price}
                        </Typography>
                        <br />
                        <div align="left">
                        <IconButton
                          onClick={() => {
                            handleQuantity(data.productId, -1);
                          }}
                          size="small"
                        >
                          <RemoveCircleOutlineIcon size="small"/>
                        </IconButton>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={data.quantity}
                          name="quantity"
                        />
                        <IconButton
                          onClick={() => {
                            handleQuantity(data.productId, 1);
                          }}
                          size="small"
                        >
                          <AddCircleOutlineIcon size="small"/>
                        </IconButton> 
                        <Button
                          variant="text"
                          onClick={() => {
                            handleRemove(data.productId);
                          }}
                          style={{paddingRight:"2.2em"}}
                        >
                          Remove
                        </Button>
                        </div>
                    </Grid>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ paddingLeft: "34em", paddingBottom: "0.85em" }}>
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
          </div>
          <CustomerDetails
            showCustomer={showCustomer}
            setShowOrder={setShowOrder}
            setOrder={setOrder}
          />
          <Order showOrder={showOrder} orders={orders} />
        </>
      );
    }
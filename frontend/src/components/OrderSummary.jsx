import React from "react";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { emptyCart } from '../service/cartService';
import { setCart,setOrderID } from "../actions/booksAction";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "../styles/cart.scss";

export default function OrderSummary({ showOrder, orders }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = () => {
        emptyCart().then((res) => { console.log(res) }).catch((err) => { console.log(err) });
        dispatch(setCart());
        dispatch(setOrderID(orders._id));
        history.push("/orderComplete");
    };

    return (
        <div className="mainBoxOrder">
            <Paper variant="outlined" sx={{ m: { xs: 1, md: 5 }, p: { xs: 1, md: 2 }, maxWidth: '724px' }}>
                <Typography variant="h6" gutterBottom  >
                    Order Summary
                </Typography>
                {(showOrder && orders.length !== 0) ? (
                    <Grid container
                        spacing={1}>
                        {
                            orders.items.map((data) => (
                                <Grid container
                                    spacing={1} >
                                    <Grid item xs={4} sx={{ py: { xs: 2, md: 3 } }} style={{ paddingTop: "1.5em", paddingLeft: "2em" }}>
                                        <img
                                            className="bookImage"
                                            src={data.image}
                                            alt=""
                                        />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <div style={{ marginLeft: "10px" }}>
                                            <Typography align="left" style={{ fontWeight: "bold", fontSize: "14px", paddingTop: "1.5em" }}>{data.name}</Typography>
                                            <Typography
                                                align="left"
                                                color="text.secondary"
                                                style={{ fontSize: "11px" }}
                                            >
                                                by {data.author}
                                            </Typography>
                                            <Typography
                                                align="left"
                                                style={{ fontWeight: "bold", fontSize: "14px" }}
                                            >
                                                Rs {data.price}
                                            </Typography>
                                        </div></Grid></Grid>
                            )
                            )}
                        <Grid item xs={3.2} align="right">
                            <Typography style={{ fontWeight: "bold", fontSize: "17px" }}>
                                Total Bill is Rs.{orders.bill}
                            </Typography>
                        </Grid>
                        <Grid item xs={8} align="right" >
                            <Button
                                variant="contained"
                                onClick={(e) => { handleSubmit() }}
                            >
                                Checkout
                            </Button></Grid>
                    </Grid>

                ) : ( "")}
            </Paper>
        </div>
    )
}
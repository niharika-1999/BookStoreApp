import Appbar from "../components/Appbar";
import React from "react";
import { useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import success from "../assets/OrderPage.svg";
import img from "../assets/OrderDetails.png";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import "../styles/cart.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(5),
  },
  font: {
    position: "absolute",
    top: "33%",
    textAlign: "center",
    color: "black",
    backgroundColor: "none",
    fontFamily: "Comic Sans MS",
  },
}));

export default function OrderComplete() {
  const classes = useStyles();
  const orderId = useSelector((state) => state.allBooks.orderId);
  console.log(orderId);

  return (
    <>
      <Appbar />
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={classes.root}
        spacing={2}
      >
        <img className="success-image" src={success} alt="" />
        <Typography
          variant="h6"
          className={classes.font}
          style={{ fontWeight: "bold" }}
        >
          Order Placed Successfully
        </Typography>

        <div className="success-info">
          <Typography>
            Hurray! Your order is confirmed the Order ID is #{orderId}. Please save the
            Order ID for further communication.
          </Typography>
        </div>
        <img className="contactImage" src={img} alt="" />
        <Button
          variant="contained"
          onClick={() => {
            window.location = "/dashboard";
          }}
        >
          Continue Shopping
        </Button>
      </Stack>
      <div style={{ paddingTop: "1em" }}>
      </div>
    </>
  );
}
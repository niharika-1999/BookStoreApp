import React, {useEffect,useState} from "react";
import { getAllBooks } from "../service/booksInDashboard";
import {useDispatch,useSelector} from "react-redux";
import {setBooks,setCart} from "../actions/booksAction";
import Appbar from '../components/Appbar';
import BookCard from "../components/BookCard";
import Cart from "../components/Cart";
import Paper from '@mui/material/Paper';
import { cartGet } from "../service/cartService";
import "../styles/dashboard.scss"

export default function Dashboard() {
    const dispatch = useDispatch();
    const [showCart,setShowCart]=useState(false);
    
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

    const cart = useSelector((state) => state.allBooks.cartContents);
    
    return(
        <>
        <Appbar setShowCart={setShowCart} />
        <Paper variant="outlined" sx={{ m: { xs: 2, md: 6 }, p: { xs: 2, md: 3 } ,border:"none"}}>
        {(showCart)?(cart.length===undefined?<Cart cart={cart}/>:console.log("hi")):<div className="rightIcon">
            <BookCard/> </div>  } 
        </Paper>
        </>
    );
}
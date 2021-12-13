import React, {useEffect} from "react";
import { getAllBooks } from "../service/booksInDashboard";
import {useDispatch} from "react-redux";
import {setBooks} from "../actions/booksAction";
import Appbar from '../components/Appbar';
import BookCard from "../components/BookCard";

export default function Dashboard() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        fetchitem(); 
    }, []);
    const fetchitem = () => {
        getAllBooks().then((res) => {
            dispatch(setBooks(res.data));
        }).catch((err) => {
            console.log(err); 
        });
    };
    
    return(
        <>
        <Appbar/>
        <BookCard/>
        </>
    );
}
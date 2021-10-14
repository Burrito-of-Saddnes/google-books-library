/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";  
import { inject, observer } from 'mobx-react';
import axios from 'axios';  
import SearchBoxComponent from "./SearchBoxComponent";
import BookBodyComponent from "./BookBodyComponent";
import BookIsOpenStatusStore from "../stores/BookIsOpenStatusStore";
import "../CSS/App.css"

interface AllBooksComponentProps {
    bookIsOpenStatusStore?: BookIsOpenStatusStore;
}

const AllBooksComponent = inject("bookIsOpenStatusStore")(observer((props:AllBooksComponentProps) => {  
    const [book, setBook] = useState("");  
    const [result, setResult] = useState([]);  
    const apiKey ="AIzaSyCfaJ5T7gi_odqHGnJHAIjMSK1HjWJn7_Q";
    const [subject, setSubject] = useState("ALL");
    const [orderBy, setOrderBy] = useState("RELEVANCE");
    const maxResult = 40;
    const startIndex = 0;
    const { bookIsOpenStatusStore } = props;

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {  
        const book = event.target.value;  
        setBook(book);  
    }  

    function handleSort(event: React.ChangeEvent<HTMLInputElement>) {
        const orderBy = event.target.value; 
        setOrderBy(orderBy);
    }

    function handleSubject(event: React.ChangeEvent<HTMLInputElement>) {
        const subject = event.target.value; 
        setSubject(subject);
    }

    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {  
        event.preventDefault();
        axios.get("https://www.googleapis.com/books/v1/volumes?q=" + book + " intitle:" + subject + "&orderBy=" + orderBy + "&key=" + apiKey + "&startIndex=" + startIndex + "&maxResults=" + maxResult) 
            .then((data: any) => {  
                console.log(data.data.items);  
                setResult(data.data.items);  
            })  
    }  

    return (
        <div>
        {
            // bookIsOpenStatusStore?.booksIsOpenStatus === BooksIsOpenStatus.CLOSED ?
            <form onSubmit={handleSubmit}>
                <div className="main">
                    <div className="header">
                        <SearchBoxComponent
                            handleChange={handleChange}
                            handleSubject={handleSubject}
                            handleSort={handleSort}
                        />
                    </div>
                    <div className="content">
                        <BookBodyComponent
                            result={result}
                            onClick={bookIsOpenStatusStore?.triggerActive}
                        />
                    </div>   
                </div>                
            </form> 
            // :
            // bookIsOpenStatusStore?.booksIsOpenStatus === BooksIsOpenStatus.OPENED ?
                // <div onClick={bookIsOpenStatusStore.triggerDisabled}>s</div>
            // : ""
        }</div>
 
    )  
}))
  
export default AllBooksComponent  

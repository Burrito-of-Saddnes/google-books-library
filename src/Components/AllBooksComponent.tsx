import React, { useState } from "react";  
import { inject, observer } from 'mobx-react';
import axios from 'axios';  

import BookIsOpenStatusStore from "../stores/BookIsOpenStatusStore";

import SearchBoxComponent from "./SearchBoxComponent";
import BookBodyComponent from "./BookBodyComponent";

interface BookItems { 
    volumeInfo: { 
        imageLinks: { 
            thumbnail: string; 
        };
        previewLink: string; 
        title: string; 
        authors: string;
        publishedDate: string;
    }; 
    
}

interface AllBooksComponentProps {
    bookIsOpenStatusStore?: BookIsOpenStatusStore;
    bookRes?: Array<BookItems>;
}

const AllBooksComponent = inject("bookIsOpenStatusStore")(observer((props:AllBooksComponentProps) => {  
    const [book, setBook] = useState("");  
    const [result, setResult] = useState([]);  
    const apiKey ="AIzaSyCfaJ5T7gi_odqHGnJHAIjMSK1HjWJn7_Q";
    const [subject, setSubject] = useState("ALL");
    const [orderBy, setOrderBy] = useState("RELEVANCE");
    const maxResult = 4;
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
        axios.get(
            "https://www.googleapis.com/books/v1/volumes?q=" + book 
                                                             + " intitle:" + subject 
                                                             + "&orderBy=" + orderBy 
                                                             + "&key=" + apiKey 
                                                             + "&startIndex=" + startIndex 
                                                             + "&maxResults=" + maxResult
        )
        .then((data: any) => {  
                console.log(data.data.items);  
                setResult(data.data.items); 
            }
        )  
    } 

    function loadMore() { 
    }

    return (
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
                    <div className="container">  
                        {result.map(book => (
                            <BookBodyComponent
                                bookRes={book}
                                onClick={bookIsOpenStatusStore?.triggerActive}
                            />
                        ))} 
                    </div>
                    {/* if container not emty, render footer */}
                    {/* <div className="footer" onClick={loadMore}>dd</div> */}
                </div>  
            </div>                
        </form> 
    )  
}))
  
export default AllBooksComponent  

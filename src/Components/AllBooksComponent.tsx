import React, { useState } from "react";  
import { inject, observer } from 'mobx-react';
import axios from 'axios';  

import DisplayMoreButtonStatusStore from "../stores/DisplayMoreButtonStatusStore";

import SearchBoxComponent from "./SearchBoxComponent";
import BookBodyComponent from "./BookBodyComponent";
import { DisplayMoreButtonStatus } from "../utils/displayMoreButtonStatus";

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
    displayMoreButtonStatusStore?: DisplayMoreButtonStatusStore;
    bookRes?: Array<BookItems>;
}

const AllBooksComponent = inject("displayMoreButtonStatusStore")(observer((props:AllBooksComponentProps) => {  
    const [book, setBook] = useState("");  
    const [result, setResult] = useState([]);  
    const apiKey ="AIzaSyCfaJ5T7gi_odqHGnJHAIjMSK1HjWJn7_Q";
    const [subject, setSubject] = useState("ALL");
    const [orderBy, setOrderBy] = useState("RELEVANCE");
    const maxResult = 20;
    const startIndex = 0;
    const { displayMoreButtonStatusStore } = props;

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
                // console.log(data.data.items);  
                setResult(data.data.items);
                displayMoreButtonStatusStore?.triggerActive() 
            }
        )  
    } 

    function loadMore() { 
        axios.get(
            "https://www.googleapis.com/books/v1/volumes?q=" + book 
                                                             + " intitle:" + subject 
                                                             + "&orderBy=" + orderBy 
                                                             + "&key=" + apiKey 
                                                             + "&startIndex=" + startIndex 
                                                             + "&maxResults=" + maxResult
        )
        .then((newData: any) => {  
                setResult(result => result.concat(newData.data.items));
            }
        ) 
    }

    return (
        <><form onSubmit={handleSubmit}>
            <div className="main">
                <div className="header">
                    <SearchBoxComponent
                        handleChange={handleChange}
                        handleSubject={handleSubject}
                        handleSort={handleSort} />
                </div>
                <div className="content">
                    <div className="container">
                        {result.map(book => (
                            <BookBodyComponent
                                bookRes={book}
                                onClick={displayMoreButtonStatusStore?.triggerActive} />
                        ))}
                    </div>

                </div>
            </div>
        </form>
        {displayMoreButtonStatusStore?.displayMoreButtonStatus === DisplayMoreButtonStatus.DISPLAY &&
            <div className="displayMoreButton">
                <input className="displayMoreButtonContent" onClick={loadMore} type="submit" value="LoadMOre" />
            </div>
        }
        </>
    )  
}))
  
export default AllBooksComponent  

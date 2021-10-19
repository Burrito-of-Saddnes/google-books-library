import React, { useState } from "react";  
import { inject, observer } from 'mobx-react';
import axios from 'axios';  

import DisplayMoreButtonStatusStore from "../stores/DisplayMoreButtonStatusStore";
import { DisplayMoreButtonStatus } from "../utils/displayMoreButtonStatus";
import LoadingStatusStore from "../stores/LoadingStatusStore";
import { LoadingStatus } from "../utils/loadingStatus";

import SearchBoxComponent from "./SearchBoxComponent";
import BookBodyComponent from "./BookBodyComponent";
import Loading from "./Loading";

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
    loadingStatusStore?: LoadingStatusStore;
    bookRes?: Array<BookItems>;
}

const AllBooksComponent = inject("displayMoreButtonStatusStore", "loadingStatusStore")(observer((props:AllBooksComponentProps) => {  
    const [book, setBook] = useState("");  
    const [result, setResult] = useState([]);  
    const apiKey ="AIzaSyCfaJ5T7gi_odqHGnJHAIjMSK1HjWJn7_Q";
    const [subject, setSubject] = useState("ALL");
    const [orderBy, setOrderBy] = useState("RELEVANCE");
    const maxResult = 20;
    const startIndex = 0;
    const { displayMoreButtonStatusStore, loadingStatusStore } = props;

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

    async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) { 
        event.preventDefault();
        loadingStatusStore?.triggerActive(); 
        await axios.get(
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
                displayMoreButtonStatusStore?.triggerActive();
                loadingStatusStore?.triggerDisabled();
            }
        )  
    } 

    async function loadMore() { 
        loadingStatusStore?.triggerActive(); 
        await axios.get(
            "https://www.googleapis.com/books/v1/volumes?q=" + book 
                                                             + " intitle:" + subject 
                                                             + "&orderBy=" + orderBy 
                                                             + "&key=" + apiKey 
                                                             + "&startIndex=" + (startIndex+result.length-1)
                                                             + "&maxResults=" + maxResult
        )
        .then((newData: any) => {  
                console.log(newData.data.items); 
                setResult(result => result.concat(newData.data.items));
                loadingStatusStore?.triggerDisabled(); 
            }
        ) 
    }

    return (
        <>
        {loadingStatusStore?.loadingStatus === LoadingStatus.ON &&
            <Loading/>
        }
        <form onSubmit={handleSubmit}>
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
                            />
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

import React, { Component } from 'react';
import BookIsOpenStatusStore from "../stores/BookIsOpenStatusStore";
import { inject, observer } from 'mobx-react';
import "../CSS/App.css"

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

interface BookBodyComponentProps {
    result: Array<BookItems>;
    bookIsOpenStatusStore?: BookIsOpenStatusStore
    onClick?: () => any;
}

@inject("bookIsOpenStatusStore")
@observer
export default class BookBodyComponent extends Component<BookBodyComponentProps, {}> {
    render(){

        const { result, onClick, bookIsOpenStatusStore } = this.props;

        return(
            <div className="container">  
                {result.map(book => (
                    <div 
                        className="booksCol"
                    >
                        <img 
                            onClick={e => {
                                onClick && onClick()
                            }} 
                            src={book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.thumbnail : ''} 
                            alt={book.volumeInfo.title} 
                            className="bookImg"
                        />                            
                        <p>{book.volumeInfo.title}</p>
                        <p>Author: {book.volumeInfo.authors}</p>
                        <p>Published: {book.volumeInfo.publishedDate}</p>
                        <p>{bookIsOpenStatusStore?.booksIsOpenStatus}</p>
                    </div>
                ))} 
            </div>
        );
    }
}
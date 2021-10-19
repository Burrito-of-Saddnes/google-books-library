import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import BookIsOpenStatusStore from "../stores/BookIsOpenStatusStore";

interface BookBodyComponentProps {
    bookRes: any;
    bookIsOpenStatusStore?: BookIsOpenStatusStore
    onClick?: () => any;
}

@inject("bookIsOpenStatusStore")
@observer
export default class BookBodyComponent extends Component<BookBodyComponentProps, {}> {
    render(){

        const { bookRes, onClick, bookIsOpenStatusStore } = this.props;

        return(
            <div 
                className="booksCol"
            >
                <img 
                    onClick={e => {
                        onClick && onClick()
                    }}
                    src={bookRes.volumeInfo.imageLinks !== undefined ? bookRes.volumeInfo.imageLinks.thumbnail : ''} 
                    alt={bookRes.volumeInfo.title} 
                    className="bookImg"
                />                            
                <p>{bookRes.volumeInfo.title}</p>
                <p>Author: {bookRes.volumeInfo.authors}</p>
                <p>Published: {bookRes.volumeInfo.publishedDate}</p>
                <p>{bookIsOpenStatusStore?.booksIsOpenStatus}</p>
            </div>
        );
    }
}
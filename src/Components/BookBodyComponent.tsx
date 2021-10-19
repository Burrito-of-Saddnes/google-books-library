import React, { Component } from 'react';

interface BookBodyComponentProps {
    bookRes: any;
}

export default class BookBodyComponent extends Component<BookBodyComponentProps, {}> {
    render(){

        const { bookRes } = this.props;

        return(
            <div 
                className="booksCol"
            >
                <img
                    src={bookRes.volumeInfo.imageLinks !== undefined ? bookRes.volumeInfo.imageLinks.thumbnail : ''} 
                    alt={bookRes.volumeInfo.title} 
                    className="bookImg"
                />                            
                <p>{bookRes.volumeInfo.title}</p>
                <p>Author: {bookRes.volumeInfo.authors}</p>
                <p>Published: {bookRes.volumeInfo.publishedDate}</p>
                <a href={bookRes.volumeInfo.previewLink}>Know more</a>
            </div>
        );
    }
}
import React, { Component } from 'react';

import BooksRelevanceComponent from './BooksRelevanceComponent';
import BooksSubjectComponent from './BooksSubjectComponent';

interface SearchBoxComponentProps {
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSort?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubject?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default class SearchBoxComponent extends Component<SearchBoxComponentProps, {}> {
    render(){

        const { handleChange, handleSort, handleSubject } = this.props;

        return(
            <div className="searchWrapper">  
                <div className="search"> 
                    <div className="searchField">  
                        <input onChange={handleChange} className="searchFieldInput" placeholder="Type something..." type="text" />  
                    </div>  
                    <div className="searchButton">  
                        <input className="searchButtonContent" type="submit" value="Search"/>  
                    </div>
                </div>
                  
                <div className="filters">
                    <BooksRelevanceComponent
                        handleSort={handleSort}
                    />
                    <BooksSubjectComponent
                        handleSubject={handleSubject}
                    />
                </div>
            </div>  
        );
    }
}
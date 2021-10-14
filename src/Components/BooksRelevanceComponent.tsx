import React, { Component } from 'react';

interface BooksRelevanceComponentProps {
    handleSort?: (event: any) => void;
}

export default class BooksRelevanceComponent extends Component<BooksRelevanceComponentProps, {}>{
    render(){

        const { handleSort } = this.props;

        return(
            <select onChange={handleSort}>
                <option value="RELEVANCE">RELEVANCE</option>
                <option value="NEWEST">NEW</option>
            </select>        
        )
    }
}

            
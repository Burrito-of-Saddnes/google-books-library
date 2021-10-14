import React, { Component } from 'react';
import BooksRelevanceComponent from './BooksRelevanceComponent';
import BooksSubjectComponent from './BooksSubjectComponent';

interface SearchBoxComponentProps {
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSort?: (event: any) => void;
    handleSubject?: (event: any) => void;
}

export default class SearchBoxComponent extends Component<SearchBoxComponentProps, {}> {
    render(){

        const { handleChange, handleSort, handleSubject } = this.props;

        return(
            <div className="card-header main-search">  
                <div className="row">  
                    <div className="col-12 col-md-3 col-xl-3">  
                        <input onChange={handleChange} className="AutoFocus form-control" placeholder="Type something..." type="text" />  
                    </div>  
                    <div className="ml-auto">  
                        <input type="submit" value="Search" className="btn btn-primary search-btn" />  
                    </div>  

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
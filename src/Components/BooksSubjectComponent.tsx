import React, { Component } from 'react';

interface BooksSubjectComponentProps {
    handleSubject?: (event: any) => void;
}

export default class BooksSubjectComponent extends Component<BooksSubjectComponentProps, {}>{
    render(){

        const { handleSubject } = this.props;

        return(
            <select onChange={handleSubject}>
                <option value="ALL">ALL</option>
                <option value="ART">ART</option>
                <option value="BIOGRAPHY">BIOGRAPHY</option>
                <option value="COMPUTERS">COMPUTERS</option>
                <option value="HISTORY">HISTORY</option>
                <option value="MEDICAL">MEDICAL</option>
                <option value="POETRY">POETRY</option>
            </select>        
        )
    }
}

            
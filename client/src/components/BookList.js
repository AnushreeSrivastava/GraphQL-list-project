import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = () => {
    const { loading, error, data } = useQuery(getBooksQuery);
    const [bookId, setbookId] = useState();
    const handleClick = (id) => {
        setbookId(id);
    }
    function displayBooks() {
        if (loading === true) {
            return (<div>Loading Books...</div>)
        }
        else {
            return data.books.map(book => {
                return (
                    <li key={book.id} onClick={() => handleClick(book.id)}>{book.name}</li>
                )
            })
        }
    }
    return (
        <div>
            <ul id="book-list">
                {displayBooks()}
            </ul>
            <BookDetails bookId={bookId} />
        </div>
    )
}

export default BookList;

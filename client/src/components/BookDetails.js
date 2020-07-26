import React, { Component } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getBookQuery } from '../queries/queries';

export default function BookDetails(props) {
    const { loading, error, data } = useQuery(getBookQuery, {
        variables: { id: props.bookId }
    });
    if (data) {
        const { book } = data;

        function displayBookDetails() {
            if (book) {
                return (
                    <div>
                        <h2>{book.name}</h2>
                        <p>{book.genre}</p>
                        <p>{book.author.name}</p>
                        <p>All books by this author:</p>
                        <ul className="other-books">
                            {
                                book.author.books.map(item => <li key={item.id}>{item.name}</li>)
                            }
                        </ul>
                    </div>
                )
            }
            else {
                return (
                    <div>No book Selected!</div>
                )
            }
        }
        return (
            <div id="book-details">
                {displayBookDetails()}
            </div>
        )
    }
    else {
        return (
            <div>Loading...</div>
        )
    }
}

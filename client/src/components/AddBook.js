import React, { Component } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';


const AddBook = () => {

    let nameInput, genreInput, authorInput = null;

    const { loading, error, data } = useQuery(getAuthorsQuery);
    const [addBook] = useMutation(addBookMutation);

    function displayAuthors() {
        if (loading === true) {
            return (<option disabled>Loading Authors...</option>)
        }
        else {
            return data.authors.map(author => {
                return (
                    <option key={author.id} value={author.id}>{author.name}</option>
                )
            })
        }
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        //pass data to the mutation addBook
        addBook({
            variables:
            {
                name: nameInput.value,
                genre: genreInput.value,
                authorId: authorInput.value
            },
            refetchQueries: [{ query: getBooksQuery }]
        }
        );
        //set inputs to blanks
        nameInput.value = '';
        genreInput.value = '';
        authorInput.value = '';
    }

    return (
        <form id="add-book" onSubmit={handleSubmitClick}>
            <div className="field">
                <label htmlFor="">Book Name:</label>
                <input type="text" ref={(input) => { nameInput = input; }} />
            </div>

            <div className="field">
                <label htmlFor="">Genre:</label>
                <input type="text" ref={(input) => { genreInput = input; }} />
            </div>

            <div className="field">
                <label htmlFor="">Author:</label>
                <select ref={(input) => { authorInput = input; }}>
                    <option>Select Author</option>
                    {displayAuthors()}
                </select>
            </div>

            <button>+</button>
        </form>
    )
}

export default AddBook;

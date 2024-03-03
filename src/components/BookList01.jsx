// Code for List all the books in the library
// with the option to view, update and delete  a book

import { useState, useEffect } from 'react';
import axios from 'axios';


export default function BookList() {
    const [books, setBooks] = useState([]);
    const [book, setBook] = useState({ id: '', title: '', author: '' });
    
    useEffect(() => {
        axios
        .get('https://node41091-noderest.proen.app.ruk-com.cloud/books')
        .then((response) => {
            setBooks(response.data);
        });
    }, []);
    
    const viewBook = (id) => {
        axios
        .get(`https://node41091-noderest.proen.app.ruk-com.cloud/books/${id}`)
        .then((response) => {
            setBook(response.data);
        });
    };
    
    const deleteBook = (id) => {
        axios
        .delete(`https://node41091-noderest.proen.app.ruk-com.cloud/books/${id}`)
        .then(() => {
            setBooks(books.filter((book) => book.id !== id));
        });
    };
    
    return (
        <div>
        <h2>Books</h2>
        <table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {books.map((book) => (
                <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                    <button onClick={() => viewBook(book.id)}>View</button>
                    <button onClick={() => deleteBook(book.id)}>Delete</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        <div>
            <h2>View Book</h2>
            <p>
            <label>Title: </label>
            <span>{book.title}</span>
            </p>
            <p>
            <label>Author: </label>
            <span>{book.author}</span>
            </p>
        </div>
        </div>
    );
    }


import "./BookListTable.css";

import React from "react";

import PropTypes from "prop-types";

import Button from "../Button/Button";

import BookInteract from "../BookInteract/BookInteract";
import axios from "axios";

function BookListTable({ books }) {
    const view = async (id) => {
        await axios.get(`https://node41091-noderest.proen.app.ruk-com.cloud/books/${id}`)
            .then((resp) => alert(`Book title: ${resp.data.title}\nAuthor of book: ${resp.data.author}`))
            .catch((err) => console.error(err));

        return;
    }

    const deleted = async (book) => {
        await axios.delete(`https://node41091-noderest.proen.app.ruk-com.cloud/books/${book.id}`)
            .then((resp) => {
                if (resp.status == 200) {
                    alert(`${book.title} was deleted.`);
                    window.location.reload();
                }

                return;
            })
            .catch((err) => console.error(err));

        return;
    }

    return (
        <React.Fragment>
            <div style={{ margin: '1rem 0' }}>
                <div>
                    <h3>Table of Books</h3>
                    <span style={{ color: "#838383" }}>table of books that you can manage through the APIs you did previously.</span>
                </div>
                <table className="table__styled">
                    <thead className="thead__styled">
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => {
                            return (
                                <tr key={book.id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>
                                        <Button
                                            onClick={() => void view(book.id)}
                                        >
                                            View
                                        </Button>
                                        <BookInteract
                                            book={book}
                                            mode="update"
                                        />
                                        <Button
                                            onClick={() => void deleted(book)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <BookInteract mode="add" />
        </React.Fragment>
    );
}

BookListTable.propTypes = {
    books: PropTypes.array.isRequired
};

export default BookListTable;

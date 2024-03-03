import "./BookInteract.css";

import React, { useState } from "react";

import PropTypes from "prop-types";

import axios from "axios";

import Button from "../Button/Button";
import Input from "../Input/Input";

function BookInteract({ book, mode }) {
    const [opened, setOpened] = useState(false);
    const [payload, setPayload] = useState(
        {
            title: book !== undefined ? book.title : "",
            author: book !== undefined ? book.author : ""
        }
    );

    const action = () => {
        if (opened) {
            setOpened(false);
        } else {
            setOpened(true);
        }

        return;
    }

    const update = async (id) => {
        await axios.put(`https://node41091-noderest.proen.app.ruk-com.cloud/books/${id}`, payload)
            .then((resp) => {
                if (resp.status == 200) {
                    window.location.reload();

                    return;
                }
            })
            .catch((err) => console.error(err));

        return;
    }

    const add = async () => {
        await axios.post('https://node41091-noderest.proen.app.ruk-com.cloud/books', payload)
            .then((resp) => {
                if (resp.status == 200) {
                    window.location.reload();

                    return;
                }
            })
            .catch((err) => console.error(err));
    }

    return (
        <React.Fragment>
            {opened && (
                <div>
                    <table className="book_interact__styled">
                        <tbody>
                            <tr>
                                <td>
                                    {mode === "update" ? (
                                        <Input
                                            onChange={(event) => setPayload({ title: event.target.value, author: payload.author })}
                                            defaultValue={mode === "update" && book.title}
                                            placeholder={"Example of title"}
                                        />
                                    ) : (
                                        <Input
                                            onChange={(event) => setPayload({ title: event.target.value, author: payload.author })}
                                            placeholder={"Example of title"}
                                        />
                                    )}
                                </td>
                                <td>
                                    {mode === "update" ? (
                                        <Input
                                            onChange={(event) => setPayload({ title: payload.title, author: event.target.value })}
                                            defaultValue={mode === "update" && book.author}
                                            placeholder={"Example of author name"}
                                        />
                                    ) : (
                                        <Input
                                            onChange={(event) => setPayload({ title: payload.title, author: event.target.value })}
                                            placeholder={"Example of author name"}
                                        />
                                    )}
                                </td>
                                <td className="column_actions__styled">
                                    {mode === "add" ? (
                                        <Button onClick={() => void add()}>
                                            Add
                                        </Button>
                                    ) : mode === "update" ? (
                                        <Button onClick={() => void update(book.id)}>Update</Button>
                                    ) : (
                                        <Button>Unknown</Button>
                                    )}
                                    <Button onClick={() => action()}>Close</Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {!opened && mode !== "update" && (
                <button
                    style={{
                        width: '100%',
                        padding: '8px 0',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                    onClick={() => void action()}
                >
                    Add a book
                </button>
            )}

            {!opened && mode !== "add" && (
                <Button
                    onClick={() => void action()}
                >
                    Update
                </Button>
            )}
        </React.Fragment>
    );
}

BookInteract.propTypes = {
    book: PropTypes.object,
    mode: PropTypes.string.isRequired
};

export default BookInteract;

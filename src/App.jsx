// Application to do CRUD operations using React with the help of Axios
// JSON data for one book is as follows:
// {"id":2,"title":"Fire","author":"Bet"}
// The id is auto-incremented in the server
// The server is running at https://node41091-noderest.proen.app.ruk-com.cloud/
import "./App.css";

import { useEffect, useState } from "react";

import Title from "./components/Title/Title";
import BookListTable from "./components/BookListTable/BookListTable";
import axios from "axios";

export default function App() {
    const [books, setBooks] = useState([]);
    const [booksLoading, setBooksLoading] = useState(true);

    const getAllBooks = async () => {
        await axios.get("https://node57391-patiphat-noderest.proen.app.ruk-com.cloud/books")
            .then((resp) => {
                void setBooks(resp.data);
                void setBooksLoading(false);
            })
            .catch((err) => console.error(err));

        return;
    }

    useEffect(() => {
        getAllBooks();
    }, []);

    return (
        <main className="app__styled">
            <div style={{
                width: '100%',
                padding: '16px'
            }}>
                <Title text="CRUD Operations with React.js" />
                {booksLoading ? (
                    <span>Retrieving all book data...</span>
                ) : (
                    <BookListTable books={books} />
                )}
            </div>
        </main>
    );
}


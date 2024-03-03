import PropsType from 'prop-types';

export default function UpdateBook({ book }) {
    console.log(book);
    return (
        <div>
            <h2>Update Book</h2>
            <form>
                <div>
                    <label>Title</label>
                    <input type="text" value={book.title} />
                </div>
                <div>
                    <label>Author</label>
                    <input type="text" value={book.author} />
                </div>
                <button>Update </button>
            </form>
        </div>
    );
}

UpdateBook.propTypes = {
    book: PropsType.object.isRequired,
};

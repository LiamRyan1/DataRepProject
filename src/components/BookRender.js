import BookItem from "./bookTemplate";//import bookItem component from the bookTemplate

//map over myBooks and return a bookitem component 
//pass myBook to BookItem to access details about all the books stored in the book object
//give each bookItem a unique identifier via key to helo render and update efficiently
const Books = (props) => {

    if (!props.myBooks || props.myBooks.length === 0) {
        return <div>No Books available,Please add a book before returning to this page</div>;
    }

    else {
        const grouped = {};
        props.myBooks.forEach((book) => {
            const rating = book.rating;
            if (!grouped[rating]) {
                grouped[rating] = [];
            }
            grouped[rating].push(book);
        });

        //sort rating by number in array
        const ratings = Object.keys(grouped).sort((a, b) => b - a);

        return <div>
            {ratings.map((rating) => (
                <div key={rating} style={{marginBottom: '20px' }}>
                    <h3>Rating: {rating}</h3>
                    <div  style={{
                            display: 'flex',  
                            flexWrap: 'wrap', 
                            gap: '20px',     
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',  
                            marginLeft: '0',  
                        }}>
                        {grouped[rating].map((book) => (
                            <BookItem myBook={book} key={book._id} Reload={props.ReloadData} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    }
}
export default Books;

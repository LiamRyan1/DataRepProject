import BookItem from "./bookTemplate";

//component responsible for rendering  the list of books grouped by rating
const Books = (props) => {
    if (!props.myBooks || props.myBooks.length === 0) {
        return <div>No Books available,Please add a book before returning to this page</div>;
    }

    else {
        //group books by rating
        const grouped = {};
        props.myBooks.forEach((book) => {
            const rating = book.rating;
            //if there are no groups with the same rating as the current book create a new group
            if (!grouped[rating]) {
                grouped[rating] = [];
            }
            grouped[rating].push(book);
        });

        //sort the rating groups in descending order
        const ratings = Object.keys(grouped).sort((a, b) => b - a);
        
        return <div>
            {ratings.map((rating) => (
                <div key={rating} style={{marginBottom: '20px' }}>
                    <h3  style={{ display: 'inline', marginRight: '5px' }}  >Rating: {rating}</h3> <img src="/star-7207.svg" alt="Star" style={{ width: '30px', height: '30px', marginBottom:"15px"}}/>
                    <div  style={{
                            display: 'flex',  
                            flexWrap: 'wrap', 
                            gap: '20px',     
                            marginLeft: '0',  
                        }}>
                        {grouped[rating].map((book) => (
                            //render the books using the bookitem template
                            <BookItem myBook={book} key={book._id} Reload={props.ReloadData} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    }
}
export default Books;

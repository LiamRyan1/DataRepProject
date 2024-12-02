import BookItem from "./bookTemplate";//import bookItem component from the bookTemplate

//map over myBooks and return a bookitem component 
//pass myBook to BookItem to access details about all the books stored in the book object
//give each bookItem a unique identifier via key to helo render and update efficiently
const Books = (props) => {

    if(!props.myBooks || props.myBooks.length === 0)
    {
        return <div>No Books available,Please add a book before returning to this page</div>;
    }
    else
    {
        return props.myBooks.map(
            (book)=>{
                return <BookItem myBook={book} key = {book._id}/>
            }      
        )
    }
} 
export default Books;

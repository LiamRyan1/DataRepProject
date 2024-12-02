import BookItem from "./bookTemplate";//import bookItem component from the bookTemplate

//map over myBooks and return a bookitem component 
//pass myBook to BookItem to access details about all the books stored in the book object
//give each bookItem a unique identifier via key to helo render and update efficiently
const Books = (props) => {
    return props.myBooks.map(
        (book)=>{
            return <BookItem myBook={book} key = {book.title}/>
        }
    )
} 
export default Books;

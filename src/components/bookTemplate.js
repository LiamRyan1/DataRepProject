import { useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

//react componentMovieItem takes props as an argument.
const BookItem = (props)=>{
  
    return(
        <div>
            <Card>
                <Card.Header>{props.myBook.title}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">{/*Styling container for text formating movie year and poster*/}
                        <footer>{props.myBook.author}</footer>
                    </blockquote>
                </Card.Body>
                     
                <Link to={"/edit/" + props.myBook.title /* */} className="btn btn-primary">Edit</Link>
            </Card>
        </div>
    );
}
//component exported for use in seperate parts of the program
export default BookItem
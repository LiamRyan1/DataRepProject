import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
//react component bookItem takes props as an argument.
const BookItem = (props)=>{
    useEffect(() => {
        console.log("Book Item:", props.mybook);
      }, [props.mybook]); //only run this effect when the mymovie prop changes
      const handleDelete = (e) => {
        e.preventDefault();
        axios.delete('http://localhost:4000/api/book/' + props.myBook._id)
            .then(() => {
                props.Reload(); //refresh the movie list after deletion
            })
            .catch((error) => {
                console.error("Error deleting movie:", error);
            });
    };
    return(
        <div>
            <Card>
                <Card.Header>{props.myBook.title}</Card.Header>
                <Card.Body>
                    <Card.Subtitle>{props.myBook.author}</Card.Subtitle>
                    <Card.Subtitle>{props.myBook.genre}</Card.Subtitle>
                    <Card.Text text = "dark">{props.myBook.rating} </Card.Text>
                    <Card.Text text = "secondary">{props.myBook.review} </Card.Text>
                    <blockquote className="blockquote mb-0">{/*Styling container for text formating movie year and poster*/}
                        <footer>{props.myBook.status}</footer>
                    </blockquote>
                </Card.Body>
                <Button  variant="danger" onClick={handleDelete}>Delete</Button>
                <Link to={'/edit/' + props.myBook._id } className="btn btn-primary">Edit</Link>
            </Card>
        </div>
    );
}
//component exported for use in seperate parts of the program
export default BookItem
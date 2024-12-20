import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
//react component bookItem takes props as an argument.
const BookItem = (props) => {
    useEffect(() => {
        console.log("Book Item:", props.myBook);
    }, [props.mybook]); //log details when myBook changes
    const handleDelete = (e) => {
        e.preventDefault();
        axios.delete('http://localhost:4000/api/book/' + props.myBook._id)//delete request made to api
            .then(() => {
                props.Reload(); //refresh the book list after deletion
            })
            .catch((error) => {
                console.error("Error deleting movie:", error);
            });
    };
    //render book details in a bootstrap card
    return (
        <div style={{ maxWidth: '400px',height:'550px' ,margin: '10px', marginBottom: '20px', boxShadow: '0 4px 8px ', borderRadius: '8px', overflow: 'auto' }}>
            <Card style={{ border: 'none' }}>
                <Card.Header className="text-center" style={{ fontSize: '28px', fontWeight: '600', backgroundColor: '#f5f5f5', color: '#333', padding: '16px 20px', }}> {props.myBook.title}
                </Card.Header>
                <Card.Body style={{ padding: '20px', backgroundColor: '#ffffff' }}>
                    {props.myBook.cover && (
                        <img
                            src={props.myBook.cover}
                            alt="Book cover"
                            style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '15px'  ,objectFit: 'contain',}}
                        />
                    )}
                    <Card.Subtitle className="text-muted mb-3" style={{ fontSize: '16px', }}
                    >
                        Author: {props.myBook.author}
                    </Card.Subtitle>
                    <Card.Subtitle className="text-muted mb-3" style={{ fontSize: '16px', }} >
                        Genre: {props.myBook.genre}
                    </Card.Subtitle>
                    <Card.Text style={{ fontSize: '16px', color: '#333' }}>
                        <strong>Rating:</strong> {props.myBook.rating}/5 <img src="/star-7207.svg" alt="Star" style={{ width: '15px', height: '15px', marginBottom:'5px'}}/>
                    </Card.Text>   
                    <Card.Text style={{ fontSize: '15px', color: '#777', fontStyle: 'italic' }}>
                        "{props.myBook.review}"
                    </Card.Text>
                    <blockquote
                        className="blockquote mb-0"
                        style={{
                            marginTop: '20px',
                            padding: '10px 15px',
                            backgroundColor: '#f9f9f9',
                            borderLeft: '4px solid #007bff',
                        }}
                    >
                        <footer className="blockquote-footer">
                            Status: {props.myBook.status}
                        </footer>
                    </blockquote>
                </Card.Body>
                <div style={{ display: 'flex', gap: '16px', marginTop: '16px', alignItems: 'center', margin: "8px", }} >
                    <Button variant="danger" size="sm" onClick={handleDelete}>Delete</Button>
                    {/* send to edit page*/}
                    <Link to={'/edit/' + props.myBook._id} className="btn btn-primary" style={{ margin: "8px", height: '32px', padding: '4px 8px', display: 'flex', alignItems: 'center' }}>Edit</Link>
                </div>
            </Card>
        </div>
    );
}
//component exported for use in seperate parts of the program
export default BookItem
//IMPORTS
import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Edit(props) {
  let { id } = useParams();//extract id 
  //STATE TO  STORE MOVIE INFO
  const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [rating, setNumber] = useState('');
    const [status, setStatus] = useState('');
    const [review, setReview] = useState('');
  
  const navigate = useNavigate();
//fetch movie data when id is specified
useEffect(() => {
    axios.get('http://localhost:4000/api/books/' + id)
        .then((response) => {
            setTitle(response.data.title);
            setAuthor(response.data.author);
            setGenre(response.data.genre);
            setNumber(response.data.rating);
            setStatus(response.data.status);
            setReview(response.data.review);
        })
        .catch((error) => {
            console.log(error);
        });
}, [id]);
//submit updated info for object movie
const handleSubmit = (event) => {
    event.preventDefault();
    const editedBook = {title,author,genre,rating,status,review};//new updated object
    axios.put('http://localhost:4000/api/book/' + id, editedBook)//request to update db
        .then((res) => {
            console.log(res.data);
            navigate('/');//redirect
        });
}
//Visual edit page 
return (
    <div>
       <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Add Book Title: </label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Author name: </label>
                    <input type="text"
                        className="form-control"
                        value={author}
                        onChange={(e) => { setAuthor(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Genre: </label>
                    <input type="text"
                        className="form-control"
                        value={genre}
                        onChange={(e) => { setGenre(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Rating: </label>
                    <input type="text"
                        className="form-control"
                        value={rating}
                        onChange={(e) => { setNumber(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Status: </label>
                    <input type="text"
                        className="form-control"
                        value={status}
                        onChange={(e) => { setStatus(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Review: </label>
                    <input type="text"
                        className="form-control"
                        value={review}
                        onChange={(e) => { setReview(e.target.value) }}
                    />
                </div>
            <div className="form-group">
                <input type="submit" value="Submit Book changes" className="btn btn-primary" />
            </div>
        </form>
    </div>
);
}
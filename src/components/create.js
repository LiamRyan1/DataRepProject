import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Create = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [cover, setCover] = useState('');
    const [genre, setGenre] = useState("Fiction");
    const [rating, setNumber] = useState("1");
    const [status, setStatus] = useState("Not Read");
    const [review, setReview] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const book = { title,cover, author, genre, rating, status, review };
        //console.log(book);

        axios.post('http://localhost:4000/api/books', book)
            .then((res) => {
                console.log(res.data);
                navigate('/');//redirect
            })
            .catch();
    };
    return (
        <div>
            <h3>Please Enter the new books details</h3>
            <h4>Details may be edited at a later date</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Add Book Title: </label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                        required />
                </div>
                <div className="form-group">
                    <label>Add Book Cover: </label>
                    <input type="text"
                        className="form-control"
                        value={cover}
                        onChange={(e) => { setCover(e.target.value) }}
                        required />
                </div>
                <div className="form-group">
                    <label>Add Author name: </label>
                    <input type="text"
                        className="form-control"
                        value={author}
                        onChange={(e) => { setAuthor(e.target.value) }}
                        required />
                </div>
                <div className="form-group">
                    <label>Add Genre: </label>
                    <select
                        className="form-control"
                        value={genre}
                        onChange={(e) => { setGenre(e.target.value) }}
                        required>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Science Fiction">Science Fiction</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Biography">Biography</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Romance">Romance</option>
                        <option value="History">History</option>
                        <option value="Philosophy">Philosophy</option>
                        <option value="Graphic Novel">Graphic novel</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Add Rating: </label>
                    <select
                        className="form-control"
                        value={rating}
                        onChange={(e) => { setNumber(e.target.value) }}
                        required >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Add Status: </label>
                    <select
                        className="form-control"
                        value={status}
                        onChange={(e) => { setStatus(e.target.value) }}
                        required >
                        <option value="Not Read">Not Read</option>
                        <option value="Reading">Reading</option>
                        <option value="Read">Read</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Add Review: </label>
                    <input type="text"
                        className="form-control"
                        value={review}
                        onChange={(e) => { setReview(e.target.value) }}
                    />
                </div>
                <div>
                    <input type="submit" value="Add Book"></input>
                </div>
            </form>
        </div>
    );
}
export default Create;
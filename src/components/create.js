import axios from "axios";
import { useState } from "react";
const Create = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [rating, setNumber] = useState('');
    const [status, setStatus] = useState('');
    const [review, setReview] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const book = {title,author,genre,rating,status,review};
    //console.log(book);

    axios.post('http://localhost:4000/api/books',book)
    .then((res)=>{console.log(res.data);
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
                <div>
                    <input type="submit" value="Add Book"></input>
                </div>
            </form>
        </div>
    );
}
export default Create;
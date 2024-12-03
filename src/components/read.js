import axios from "axios";
import { useState, useEffect } from "react";
import Books from "./BookRender";
function Read() {
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [rating, setRating] = useState('');
    const Reload = () => {
        console.log("Reloading Book data...");
        let queryParams = '';
        //check if  varaibles have a value
        if (title) queryParams += "title="+title+"&";
        if (genre) queryParams += "genre=" + genre +"&";
        if (rating) queryParams += "rating="+ rating+"&";

        if (queryParams.endsWith('&')) {
            queryParams = queryParams.slice(0, -1);
        }
        axios.get("http://localhost:4000/api/books?"+ queryParams)
            .then((response) => {
                setData(response.data.books);
            })
            .catch((error) => {
                console.error("Error reloading data:", error);
            });
    };

    useEffect(() => {
        Reload();
    }, []);

    return (
        <div>
            <h2> Your Books</h2>
            <div>
                <input
                    type="text"
                    placeholder="Search by Name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control"
                    style={{ 
                        width: '50%', 
                        marginTop: '10px' 
                    }}
                />
                <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="form-control"
                    style={{ 
                        width: '25%', 
                        marginTop: '10px' 
                    }}
                >
                    <option value="">Select Genre</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Science Fiction">Science Fiction</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Biography">Biography</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Romance">Romance</option>
                    <option value="Historical">Historical</option>
                    <option value="Philosophy">Philosophy</option>
                    <option value="Graphic Novel">Graphic Novel</option>
                </select>
                <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="form-control"
                    style={{ 
                        width: '25%', 
                        marginTop: '10px' 
                    }}
                >
                    <option value="">Select Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button onClick={Reload} className="btn btn-primary" style={{ marginTop: '10px' }}>
                    Apply Filters
                </button>
            </div>
            <Books myBooks={data} ReloadData={Reload} />
        </div>
    );
}
export default Read;
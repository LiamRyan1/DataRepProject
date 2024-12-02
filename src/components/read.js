import axios from "axios";
import { useState, useEffect } from "react";
import Books from "./BookRender";
function Read() {
    const [data, setData] = useState([]);

    const Reload = () => {
        console.log("Reloading Book data...");
        axios.get('http://localhost:4000/api/books')
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
            <h2>Your Books</h2>
            <Books myBooks={data} ReloadData={Reload} />
        </div>
    );
}
export default Read;
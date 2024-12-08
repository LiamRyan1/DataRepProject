import axios from "axios";
import { useState, useEffect } from "react";
const Statistics = () => {
    const [data, setData] = useState([]);
    const [totalBooks, setTotalBooks] = useState(0);
    const [percentRead, setPercentRead] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [totalUnRead, setTotalUnread] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:4000/api/books")
            .then((response) => {
                setData(response.data.books);
                let total = data.length;
                setTotalBooks(total);
                const ReadBooks = data.filter(data => data.status !== "Read").length;
                let Unread = totalBooks - ReadBooks;
                setTotalUnread(Unread);
                let Percent = ((ReadBooks / totalBooks) * 100);
                setPercentRead(Percent);
                const totalRating = 0;
                for (let i = 0; i < data.length; i++) {
                    totalRating += parseFloat(data[i].rating);
                }
                let AvgRating = (totalRating / totalBooks);
                setAverageRating(AvgRating);

            })
            .catch((error) => {
                console.error("Error reloading data:", error);
            });
    }, []);


    return (
        <div style={{ backgroundColor: '#b2d6d6', minHeight: '100vh' }}>
            <h1>Statistics</h1>
            <div>
                <p><strong>Total Books:{totalBooks}<br />Percentage of Books Read:{percentRead} <br />Average Rating:{averageRating}<br />Total Unread Books:{totalUnRead}<br /></strong></p>
            </div>
        </div>
    );
};
export default Statistics;
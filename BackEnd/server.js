const express = require('express');
const app = express();
//port connecting to
const port = 4000;
//import and enable cors
const cors = require('cors');
app.use(cors());
//import body parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
//allows parse json data into object 
app.use(bodyParser.json());
//enable use of the following headers
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0.lznv8.mongodb.net/')
const bookSchema = new mongoose.Schema({
    title: String,
    cover:String,
    author: String,
    genre: {
        type: String,
        enum: [
            "Fiction",
            "Non-Fiction",
            "Science Fiction",
            "Fantasy",
            "Biography",
            "Mystery",
            "Romance",
            "Historical",
            "Philosophy",
            "Graphic Novel",
        ],
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    status: {
        type: String,
        enum: ["Not Read", "Reading", "Read"],
        required: true,
    },
    review: String,
});
const BookModel = mongoose.model('Book', bookSchema);

app.get('/api/books', async (req, res) => {
    const { title, genre, rating } = req.query;

    const filter = {};
    if (title) {
        filter.title = { $regex: title, $options: 'i' }; 
    }
    if (genre) {
        filter.genre = genre;
    }
    if (rating) {
        filter.rating = parseInt(rating);
    }
    const books = await BookModel.find(filter);
    /*const books = await BookModel.find({});*/
    res.status(200).json({ books })
});
app.get('/api/books/:id', async (req, res) => {
    const book = await BookModel.findById(req.params.id);
    res.json(book);
})
app.put('/api/book/:id', async (req, res) => {
    const book = await BookModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(book);
})
app.delete('/api/book/:id', async (req, res) => {

    console.log('Deleting movie with ID:', req.params.id);
    const book = await BookModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Movie deleted successfully", book });

});
app.post('/api/books', async (req, res) => {
    console.log(req.body.id);
    const { title,cover, author, genre, rating, status, review } = req.body;

    const newBook = new BookModel({ title,cover, author, genre, rating, status, review });
    await newBook.save();

    res.status(201).json({ "message": "Book Added!", Book: newBook });
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


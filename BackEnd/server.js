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
//importing Mongoose to connect to MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0.lznv8.mongodb.net/')

//schema structure
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
//fetch books with optional filters
app.get('/api/books', async (req, res) => {
    const { title, genre, rating } = req.query;//extract params from the query
    //build filter based on query
    const filter = {};
    if (title) {
        filter.title = { $regex: title, $options: 'i' }; //case insensitve search for title
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
//get endpoint to fetch a book by its id
app.get('/api/books/:id', async (req, res) => {
    const book = await BookModel.findById(req.params.id);
    res.json(book);
})
//put endpoint for update specific book by id
app.put('/api/book/:id', async (req, res) => {
    const book = await BookModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(book);
})
//delete endpoit for specific book by 
app.delete('/api/book/:id', async (req, res) => {
    console.log('Deleting movie with ID:', req.params.id);
    const book = await BookModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Movie deleted successfully", book });

});
//post endpoint to add a new book
app.post('/api/books', async (req, res) => {
    console.log(req.body.id);
    //extract data from req body
    const { title,cover, author, genre, rating, status, review } = req.body;
    //Create new instance of book model
    const newBook = new BookModel({ title,cover, author, genre, rating, status, review });
    //Save the new book to the database
    await newBook.save();

    res.status(201).json({ "message": "Book Added!", Book: newBook });
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


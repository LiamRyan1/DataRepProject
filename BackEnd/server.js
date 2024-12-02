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
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0.lznv8.mongodb.net/')
const bookSchema = new mongoose.Schema({
    title: String,
    author:String,
    genre:String,
    rating:Number,
    status:String,
    review:String,
});
const BookModel = mongoose.model('Book',bookSchema);

app.get('/api/books', async (req, res) => {
    const books = await BookModel.find({});
    res.status(200).json({books})
});
app.get('/api/books/:title', async (req ,res)=>{
    const book = await BookModel.findById(req.params.title);
    res.json(book);
})
app.put('/api/book/:title', async (req, res)=>{
    const book = await BookModel.findByIdAndUpdate(req.params.title, req.body, {new:true});
    res.send(book);
})
app.delete('/api/book/:title', async (req, res) => {
  
    console.log('Deleting movie with ID:', req.params.title);
    const book = await BookModel.findByIdAndDelete(req.params.book);
    res.status(200).send({ message: "Movie deleted successfully", book });
  
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
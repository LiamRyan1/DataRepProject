const express = require('express');
const app = express();
//port connecting to
const port = 4000;
//import and enable cors
const cors = require('cors');
app.use(cors());

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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
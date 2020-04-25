const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BooksSchema = new Schema({
    name: String,
    author: Number,
    genre: String
})

module.exports = mongoose.model('Books', BooksSchema);

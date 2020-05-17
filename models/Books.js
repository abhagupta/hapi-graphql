const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BooksSchema = new Schema({
    name: String,
    authorId: String,
    genre: String
})

module.exports = mongoose.model('Books', BooksSchema);

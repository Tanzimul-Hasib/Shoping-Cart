const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var product = new Schema({
    title: String,
    price: Number,
    likes: {type: Number, default: 0}
});

module.exports = mongoose.model('Product', product);
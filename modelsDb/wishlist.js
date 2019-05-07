const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const wishlist= new Schema({
	title: {type:String, default:"My Wish list"},
	products: {type: ObjectId, ref: 'product'}
});

module.exports = mongoose.model('wishlist',wishlist);
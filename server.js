const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded({extended: true}));//parser

// Using Node.js `require()`
const mongoose = require('mongoose');
db=mongoose.connect('mongodb://localhost/Swagshop', {useNewUrlParser: true});
//Import models
const Product= require('./modelsDb/product');
const Wishlist= require('./modelsDb/wishlist');

app.post('/product', (req, res)=>{
	const product = new Product();
	product.title=req.body.title;
	product.price=req.body.price;
	product.save((err, savedProduct)=>{
		if(err){res.send({error:"Could not save product"})}
		else{res.send(savedProduct)}
	});
});




app.get('/', (req, res) => res.send('Hello World!'));



app.listen(port, () => console.log(`Swag shop app listening on port ${port}!`))

const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true })) //parser
app.use(express.json()) //parser

// Using Node.js `require()`
const mongoose = require('mongoose')
const db = mongoose.connect('mongodb://localhost/Swagshop', {
    useNewUrlParser: true,
})
//Import models
const Product = require('./modelsDb/product')
const Wishlist = require('./modelsDb/wishlist')






// ****************Product Section*****************
app.post('/product', (req, res) => {
    const product = new Product()
    product.title = req.body.title
    product.price = req.body.price
    product.save((err, savedProduct) => {
        if (err) {
            res.send({ error: 'Could not save product' })
        } else {
            res.send(savedProduct)
        }
    })
})


app.get('/product', (req, res) =>{

	Product.find({}, (err,products)=>{
		if (err) {res.send({error:"Couldnot fetch products"})}
		else{res.send(products)}

	})
})

// ****************Wishlist Section*****************
app.post('/wishlist',(req,res)=>{

	const wishlist=new Wishlist()

	wishlist.title = req.body.title
	wishlist.save((err, savedWishlist) => {
        if (err) {
            res.send({ error: 'Could not save Wishlist' })
        } else {
            res.send(savedWishlist)
        }
    })

})

app.get('/wishlist', (req, res) =>{

	Wishlist.find({}).populate({path:'products', model:'Product'}).exec((err,wishlists)=>{
		if (err) {res.send({error:"Could not fetch wishlist"})} 
		else {res.send(wishlists)}
	})
})

app.put('/wishlist/product/add', (req, res)=> {
   Product.findOne({_id: req.body.productId}, (err, product)=> {
        if (err) {res.send({error:"Could not add item to wishlist"})} 
   		else {
           Wishlist.update({_id:req.body.wishListId}, {$addToSet:{products: product._id}}, (err, wishList)=>{
               if (err) { res.send({error:"Could not add item to wishlist"})}
               else { res.send("Successfully added to wishlist")}
           })
       }
   })
})




























app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Swag shop app listening on port ${port}!`))

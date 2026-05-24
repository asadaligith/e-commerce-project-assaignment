const express = require('express');
const cors = require('cors')
const {config} = require('dotenv')
const productData = require('./product.json');

config();
const port = process.env.PORT || 4000;

const app = express()
app.use(cors())
app.use(express.json());


let products = productData.products;

app.get('/', (req, res)=>{
    res.send("API Running.....")

})

app.get('/products', (req,res)=>{
    res.json({
           products
    })

})


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
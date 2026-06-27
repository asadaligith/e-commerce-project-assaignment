const Stripe = require("stripe");
const mongoose = require("mongoose");
const Product = require("../models/product");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.checkout = async (req, res, next) => {
    try {

        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({
                success:false,
                message:"Product id is required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                success:false,
                message:"Invalid Product Id"
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success:false,
                message:"Product not found"
            });
        }

        if (product.isSold) {
            return res.status(400).json({
                success:false,
                message:"Product already sold"
            });
        }

        if (product.price <= 0) {
            return res.status(400).json({
                success:false,
                message:"Invalid Product Price"
            });
        }

        const session = await stripe.checkout.sessions.create({

            payment_method_types:["card"],

            mode:"payment",

            line_items:[
                {
                    price_data:{
                        currency:"usd",

                        product_data:{
                            name:product.title,
                            description:product.description,
                        },

                        unit_amount:product.price * 100
                    },

                    quantity:1
                }
            ],

            success_url:`${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

            cancel_url:`${process.env.CLIENT_URL}/payment-cancel`

        });

        return res.status(200).json({
            success:true,
            url:session.url
        });

    } catch (error) {

        next(error);

    }
};
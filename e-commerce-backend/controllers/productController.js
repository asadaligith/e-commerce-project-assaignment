const Product = require("../models/product");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

exports.createProduct = async (req, res, next) => {
  try {
    const { title, description, price, phoneNumber } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Image required",
      });
    }

    const uploadFromBuffer = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "olx-products",
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const uploadedImage = await uploadFromBuffer();

    const product = await Product.create({
      title,
      description,
      price,
      phoneNumber,
      imageUrl: uploadedImage.secure_url,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};
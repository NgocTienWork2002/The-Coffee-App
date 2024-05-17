const Product = require("../models/productModel");

const searchProduct = async (req, res) => {
    try {
        res.status(200).json(req.query);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = { searchProduct };

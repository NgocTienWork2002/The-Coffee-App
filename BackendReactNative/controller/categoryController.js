const Category = require("../models/categoryModel");

const getCategory = async (req, res) => {
    try {
        let result = await Category.find();
        res.json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const createCategory = async (req, res) => {
    try {
        let newCategory = new Category({ categoryName: req.body.categoryName });
        let result = await newCategory.save();
        res.status(200).json({ message: "Thêm danh mục thành công", data: result });
    } catch (error) {
        res.status(500).json(error);
    }
};

const getCategoryDetail = async (req, res) => {
    try {
        let result = await Category.findById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = { getCategory, createCategory, getCategoryDetail };

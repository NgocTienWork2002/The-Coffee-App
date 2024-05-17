const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const {
  handleSortBy,
  getPriceOfSize,
  handleAmount,
  hanldeTotalAmount,
} = require("../utils/utils");

const getProduct = async (req, res) => {
  try {
    let data = await Product.find().populate("category");
    res.status(200).json({ message: "Lấy sản phẩm thành công", data: data });
  } catch (error) {
    res.status(500).json(error);
  }
};
const getProductHome = async (req, res) => {
  try {
    let data = await Product.aggregate([{ $sample: { size: 7 } }]);
    res.status(200).json({ message: "Lấy sản phẩm thành công", data: data });
  } catch (error) {
    res.status(500).json(error);
  }
};


const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    let result = await newProduct.save();
    res.status(200).json({
      message: "Thêm sản phẩm thành công",
      data: result,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};


const getProductDetail = async (req, res) => {
  try {
    const result = await Product.findById(req.params.id).populate("category");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};


const getProductByCategory = async (req, res) => {
  try {
    const dataList = [];
    const categoryResult = await Category.find();
    for (let i = 0; i < categoryResult.length; i++) {
      let productResult = await Product.find({
        category: categoryResult[i]._id,
      });
      dataList.push({
        title: categoryResult[i].categoryName,
        data: productResult,
      });
    }
    res.status(200).json(dataList);
  } catch (error) {
    res.status(500).json(error);
  }
};

const searchProduct = async (req, res) => {
  try {
    let nameProduct = req.query.name || "";
    // await Product.createIndex(
    //   { name: "text" },
    //   { default_languge: "vietnamse" }
    // );
    const result = await Product.find({
      name: { $regex: nameProduct, $options: "i" },
    });
    res.status(200).json({
      message: "Lấy sản phẩm thành công",
      data: result,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProductListCart = async (req, res) => {
  try {
    let { cart } = req.body;
    handleSortBy(cart);
    let idList = cart.map((item) => {
      return item._id;
    });

    const productList = await Product.find({ _id: { $in: idList } }).sort({
      name: 1,
    });

    const productListCart = productList.map((product, index) => {
      const sizePrice = getPriceOfSize(product.option, cart[index].size);
      return {
        _id: product._id,
        name: product.name,
        option: product.option,
        quantity: cart[index].quantity,
        chooseSize: cart[index].size,
        amount: handleAmount(sizePrice, cart[index].quantity),
      };
    });
    const totalAmount = hanldeTotalAmount(productListCart);

    res.status(200).json({
      message: "Lấy giỏ hàng thành công",
      data: {
        totalAmount,
        productListCart,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getProduct,
  getProductHome,
  addProduct,
  getProductDetail,
  getProductByCategory,
  searchProduct,
  getProductListCart,
};

const Order = require("../models/orderModel");
const OrderDetail = require("../models/orderDetailModel");

const getOrderList = async (req, res) => {
    try {
        let data = await Order.find();
        res.status(200).json({ message: "Lấy danh sách đơn hàng thành công", data: data });
    } catch (error) {
        res.status(500).json(error);
    }
};

const getOrderByUserID = async (req, res) => {
    try {
        let data = await Order.find({ userId: req.params.id });
        res.status(200).json({ message: "Lấy đơn hàng thành công", data: data });
    } catch (error) {
        res.status(500).json(error);
    }
};

const getOrderDetail = async (req, res) => {
    try {
        let data = await OrderDetail.find({ orderID: req.params.id }).populate("productID");
        res.status(200).json({ message: "Lấy chi tiết đơn hàng thành công", data: data });
    } catch (error) {
        res.status(500).json(error);
    }
};

const handleOrder = async (req, res) => {
    try {
        const { paymentMethod, totalAmount, productListCart, userId } = req.body;
        let newOrder = new Order({ totalAmount: totalAmount, paymentMethod: paymentMethod, userId: userId });
        let result = await newOrder.save();

        for (let i = 0; i < productListCart.length; i++) {
            let newOrderDetail = new OrderDetail({
                orderID: result._id,
                productID: productListCart[i]._id,
                amount: productListCart[i].amount,
                quantity: productListCart[i].quantity,
                size: productListCart[i].chooseSize,
            });
            await newOrderDetail.save();
        }
        res.status(200).json({ message: "Đặt hàng thành công", data: result });
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = { getOrderList, handleOrder, getOrderByUserID, getOrderDetail };

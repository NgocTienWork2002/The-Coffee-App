const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        voucher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Promo",
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "Đang thực hiện",
        },
        totalAmount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

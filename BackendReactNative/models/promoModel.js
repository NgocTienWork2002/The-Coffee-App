const mongoose = require("mongoose");

const promoSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        value: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        condition: {
            type: Number,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Promo", promoSchema);

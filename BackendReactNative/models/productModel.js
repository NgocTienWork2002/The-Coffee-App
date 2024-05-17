const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        option: [
            {
                size: String,
                price: Number,
            },
        ],
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            require: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

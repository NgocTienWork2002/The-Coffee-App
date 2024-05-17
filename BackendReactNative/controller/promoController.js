const Promo = require("../models/promoModel");
const lodash = require("lodash");

const getPromo = async (req, res) => {
    try {
        let data = await Promo.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
};

const addPromo = async (req, res) => {
    try {
        let newPromo = new Promo(req.body);
        let data = await newPromo.save();
        res.status(200).json({ message: "Thêm voucher thành công", data: data });
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = { getPromo, addPromo };

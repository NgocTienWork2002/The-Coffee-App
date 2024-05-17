const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const lodash = require("lodash");

const getUser = async (req, res) => {
    try {
        let data = await User.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
};

const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let findUser = await User.findOne({ email: email });
        if (findUser === null) {
            res.status(422).json({ message: "Email không tồn tại" });
        } else {
            let isValid = await bcrypt.compare(password, findUser.password);
            if (isValid) {
                res.status(200).json({
                    message: "Đăng nhập thành công",
                    data: lodash.omit(findUser.toObject(), "password"),
                });
            } else {
                res.status(422).json({
                    message: "Email hoặc password không đúng",
                });
            }
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const register = async (req, res) => {
    try {
        let { email, password } = req.body;
        let findUser = await User.findOne({ email: email });

        if (findUser) {
            res.status(422).json({ message: "Email đã tồn tại" });
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            let newUser = new User({ email: email, password: hashPassword });
            let result = await newUser.save();
            res.status(200).json({
                message: "Đăng ký tài khoản thành công",
                data: lodash.omit(result.toObject(), "password"),
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const updateUser = async (req, res) => {
    try {
        let findUser = await User.findOne({ _id: req.params.id });
        if (findUser) {
            await findUser.updateOne({ $set: lodash.omit(req.body, "email") });
            let data = await User.findOne({ _id: req.params.id });
            res.status(200).json({
                message: "Cập nhật tài khoản thành công",
                data: lodash.omit(data.toObject(), "password"),
            });
        } else {
            res.status(422).json({ message: "Email không tồn tại" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const getUserDetail = async (req, res) => {
    try {
        let data = await User.findOne({ _id: req.params.id });
        if (data) {
            res.status(200).json({
                message: "Lấy tài khoản thành công",
                data: lodash.omit(data.toObject(), "password"),
            });
        } else {
            res.status(422).json({ message: "Tài khoản không tồn tại" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = { getUser, register, login, updateUser, getUserDetail };

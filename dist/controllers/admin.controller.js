"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const addProduct = async (req, res) => {
    try {
        const { name, image, price, rating, description } = req.body;
        if (!name || !image || !price || !rating || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const existingProduct = await product_model_1.default.findOne({ name });
        if (existingProduct) {
            return res.status(409).json({
                success: false,
                message: "Product already exists",
            });
        }
        const newProduct = await product_model_1.default.create({
            name,
            image,
            price,
            rating,
            description,
        });
        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: newProduct,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error",
        });
    }
};
exports.addProduct = addProduct;

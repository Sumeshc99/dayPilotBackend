"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.getProduct = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const getProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required",
            });
        }
        const product = await product_model_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: product,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error",
        });
    }
};
exports.getProduct = getProduct;
const updateProduct = async (req, res) => {
    try {
        const { productId, name, image, price, rating, description } = req.body;
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required",
            });
        }
        if (!name || !image || !price || !rating || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const product = await product_model_1.default.findByIdAndUpdate(productId, { name, image, price, rating, description }, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error",
        });
    }
};
exports.updateProduct = updateProduct;

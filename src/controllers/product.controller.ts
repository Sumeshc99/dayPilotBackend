import { Response } from "express";
import ProductModel from "../models/product.model";
import { AuthRequest } from "../middlewares/auth.middleware";

export const getProduct = async (req: AuthRequest, res: Response) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const product = await ProductModel.findById(productId);

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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
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

    const product = await ProductModel.findByIdAndUpdate(
      productId,
      { name, image, price, rating, description },
      { new: true, runValidators: true }
    );

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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

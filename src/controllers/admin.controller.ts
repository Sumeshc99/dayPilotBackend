import { Request, Response } from "express";
import ProductModel from "../models/product.model";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, image, price, rating, description } = req.body;

    if (!name || !image || !price || !rating || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingProduct = await ProductModel.findOne({ name });
    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message: "Product already exists",
      });
    }

    const newProduct = await ProductModel.create({
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

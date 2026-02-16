import { Router } from "express";
import { getProduct, updateProduct } from "../controllers/product.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * /product/getProduct/{id}:
 *   get:
 *     tags: [Product]
 *     summary: Get product details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Product fetched
 *       401:
 *         description: Unauthorized or invalid token
 *       404:
 *         description: Product not found
 */
router.get("/getProduct/:id", authenticate, getProduct);

/**
 * @swagger
 * /product/updateProduct:
 *   post:
 *     tags: [Product]
 *     summary: Update product details
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - name
 *               - image
 *               - price
 *               - rating
 *               - description
 *             properties:
 *               productId:
 *                 type: string
 *                 description: Product ID to update
 *               name:
 *                 type: string
 *                 description: Product name
 *               image:
 *                 type: string
 *                 description: Product image URL or base64
 *               price:
 *                 type: number
 *                 description: Product price
 *               rating:
 *                 type: string
 *                 description: Product rating
 *               description:
 *                 type: string
 *                 description: Product description
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: All fields are required
 *       401:
 *         description: Unauthorized or invalid token
 *       500:
 *         description: Internal server error
 */
router.post("/updateProduct", authenticate, updateProduct);

export default router;

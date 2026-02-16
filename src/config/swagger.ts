import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import path from "path";

export const swaggerOptions = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce Backend API",
      version: "1.0.0",
      description:
        "API documentation for the ecommerce backend using TypeScript, Express, and MongoDB",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local development server",
      },
    ],

    // 🔐 GLOBAL SECURITY ENABLED HERE
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [path.join(__dirname, "../routes/*.ts")],
});

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));
};

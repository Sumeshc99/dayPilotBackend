"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = exports.swaggerOptions = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
exports.swaggerOptions = (0, swagger_jsdoc_1.default)({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Ecommerce Backend API",
            version: "1.0.0",
            description: "API documentation for the ecommerce backend using TypeScript, Express, and MongoDB",
        },
        servers: [
            {
                url: process.env.RAILWAY_PUBLIC_DOMAIN
                    ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}/api`
                    : "http://localhost:3000/api",
                description: process.env.RAILWAY_PUBLIC_DOMAIN
                    ? "Production server"
                    : "Local development server",
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
    apis: [
        path_1.default.join(__dirname, "../routes/*.ts"),
        path_1.default.join(__dirname, "../routes/*.js"),
    ],
});
const setupSwagger = (app) => {
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(exports.swaggerOptions));
};
exports.setupSwagger = setupSwagger;

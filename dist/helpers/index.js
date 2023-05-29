"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = exports.getBearerTokenFromHeader = exports.decoedToken = exports.generateJsonToken = exports.criptPass = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY || "";
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const saltRounds = 10;
const criptPass = async (pass) => {
    const res = await bcrypt_1.default.hash(pass, saltRounds);
    return res;
};
exports.criptPass = criptPass;
const generateJsonToken = (id) => {
    const token = jwt.sign({ id }, SECRET_KEY, {
        expiresIn: "2 days",
    });
    return token;
};
exports.generateJsonToken = generateJsonToken;
const decoedToken = (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
    }
    catch (err) {
        return false;
    }
};
exports.decoedToken = decoedToken;
const getBearerTokenFromHeader = (authToken) => {
    return authToken.split(" ")[1];
};
exports.getBearerTokenFromHeader = getBearerTokenFromHeader;
const getToken = (authorization) => {
    const token = getBearerTokenFromHeader(authorization);
    const result = decoedToken(token);
    return result;
};
exports.getToken = getToken;

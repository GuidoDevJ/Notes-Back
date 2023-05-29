"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.validate = exports.loggin = exports.createUser = void 0;
const users_1 = require("../models/users");
const mongoose_1 = __importDefault(require("mongoose"));
const helpers_1 = require("../helpers");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Variables
const connec = mongoose_1.default.connection;
const createUser = async (req, res) => {
    const body = req.body;
    const { email } = body;
    let bodyToDb = {
        ...body,
        password: await (0, helpers_1.criptPass)(body.password),
    };
    const user = await users_1.modelUser.findOne({ email });
    if (user === null) {
        users_1.modelUser
            .create(bodyToDb)
            .then((result) => {
            const token = (0, helpers_1.generateJsonToken)(result.id);
            connec.close();
            return res.status(201).json({ result, token });
        })
            .catch((error) => {
            res.status(400).json(error);
        });
    }
    else {
        res.status(401).json({
            ok: false,
            msg: "El usuario ya existe",
        });
    }
};
exports.createUser = createUser;
const loggin = async (req, res) => {
    const body = req.body;
    const { email, password } = body;
    const user = await users_1.modelUser.findOne({ email });
    if (user === null) {
        connec.close();
        return res.json({
            ok: false,
            msg: "Usuario o contraseña incorrectos",
        });
    }
    else {
        const isMatch = bcrypt_1.default.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                ok: false,
                msg: "Usuario o contraseña incorrectas",
            });
        }
        else {
            // Generar Token
            const token = (0, helpers_1.generateJsonToken)(user.id);
            res.status(200).json({
                ok: true,
                token,
            });
        }
    }
};
exports.loggin = loggin;
const validate = (req, res) => {
    const { authorization } = req.headers;
    const result = (0, helpers_1.getToken)(authorization);
    if (!result) {
        return res.status(404).json({ ok: false, msg: "Token invalido" });
    }
    else {
        const { id } = result;
        return res.status(200).json({ id });
    }
};
exports.validate = validate;
const getUser = async (req, res) => {
    const { authorization } = req.headers;
    const result = (0, helpers_1.getToken)(authorization);
    if (!result) {
        res.status(401).json({ ok: false, msg: "Token incorrecto" });
    }
    else {
        const { id } = result;
        const results = await users_1.modelUser.findById(id).populate("notes", {
            id: 1,
            content: 1,
            title: 1,
        });
        res.status(200).json(results);
    }
};
exports.getUser = getUser;

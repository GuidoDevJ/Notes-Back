"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { email } = body;
    let bodyToDb = Object.assign(Object.assign({}, body), { password: yield (0, helpers_1.criptPass)(body.password) });
    const user = yield users_1.modelUser.findOne({ email });
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
});
exports.createUser = createUser;
const loggin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { email, password } = body;
    const user = yield users_1.modelUser.findOne({ email });
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
});
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
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    const result = (0, helpers_1.getToken)(authorization);
    if (!result) {
        res.status(401).json({ ok: false, msg: "Token incorrecto" });
    }
    else {
        const { id } = result;
        const results = yield users_1.modelUser.findById(id).populate("notes", {
            id: 1,
            content: 1,
            title: 1,
        });
        res.status(200).json(results);
    }
});
exports.getUser = getUser;
//# sourceMappingURL=user.js.map
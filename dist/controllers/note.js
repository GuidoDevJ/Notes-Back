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
exports.deleteNoteById = exports.updateNoteById = exports.createNote = void 0;
const helpers_1 = require("../helpers");
const mongoose_1 = __importDefault(require("mongoose"));
const notes_1 = require("../models/notes");
const users_1 = require("../models/users");
const connec = mongoose_1.default.connection;
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { authorization } = req.headers;
    const { id } = (0, helpers_1.getToken)(authorization);
    const user = (yield users_1.modelUser.findById(id)) || {};
    const noteResult = yield notes_1.modelNote.create(Object.assign(Object.assign({}, body), { user: id }));
    user.notes = user === null || user === void 0 ? void 0 : user.notes.concat(noteResult.id);
    yield (user === null || user === void 0 ? void 0 : user.save());
    connec.close();
    res.status(201).json(noteResult);
});
exports.createNote = createNote;
const updateNoteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { id } = req.params;
    try {
        const result = yield notes_1.modelNote.findByIdAndUpdate(id, Object.assign({}, body), { new: true });
        res.status(200).json({ result });
    }
    catch (error) {
        if (error.name === "CastError")
            res.status(400).json({
                ok: false,
                msg: "Id incorrecto",
            });
    }
});
exports.updateNoteById = updateNoteById;
const deleteNoteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield notes_1.modelNote.findByIdAndDelete(id);
        if (result === null) {
            return res.status(404).json({
                ok: false,
                msg: "Id incorrecto",
            });
        }
        res.json({
            ok: true,
            msg: "Nota eliminada",
        });
    }
    catch (error) {
        if (error.name === "CastError")
            res.status(404).json({
                ok: false,
                msg: "Id incorrecto",
            });
    }
});
exports.deleteNoteById = deleteNoteById;
//# sourceMappingURL=note.js.map
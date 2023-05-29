"use strict";
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
const createNote = async (req, res) => {
    const body = req.body;
    const { authorization } = req.headers;
    const { id } = (0, helpers_1.getToken)(authorization);
    const user = (await users_1.modelUser.findById(id)) || {};
    const noteResult = await notes_1.modelNote.create({ ...body, user: id });
    user.notes = user?.notes.concat(noteResult.id);
    await user?.save();
    connec.close();
    res.status(201).json(noteResult);
};
exports.createNote = createNote;
const updateNoteById = async (req, res) => {
    const body = req.body;
    const { id } = req.params;
    try {
        const result = await notes_1.modelNote.findByIdAndUpdate(id, { ...body }, { new: true });
        res.status(200).json({ result });
    }
    catch (error) {
        if (error.name === "CastError")
            res.status(400).json({
                ok: false,
                msg: "Id incorrecto",
            });
    }
};
exports.updateNoteById = updateNoteById;
const deleteNoteById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await notes_1.modelNote.findByIdAndDelete(id);
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
};
exports.deleteNoteById = deleteNoteById;

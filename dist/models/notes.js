"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelNote = void 0;
const mongoose_1 = require("mongoose");
const noteSchema = new mongoose_1.Schema({
    content: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    }
});
noteSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
const modelNote = (0, mongoose_1.model)("Note", noteSchema);
exports.modelNote = modelNote;
//# sourceMappingURL=notes.js.map
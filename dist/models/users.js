"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelUser = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    notes: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Note",
        }]
});
userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
const modelUser = (0, mongoose_1.model)("User", userSchema);
exports.modelUser = modelUser;
//# sourceMappingURL=users.js.map
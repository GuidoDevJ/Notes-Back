"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
// Importaciones
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middleware_1 = require("../middleware");
const user_1 = require("../controllers/user");
const note_1 = require("../controllers/note");
// Variables
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", (req, res) => {
    res.send("hola");
});
router.post("/create/user", (0, express_validator_1.check)("name", "El nombre del usuario es obligatorio").not().isEmpty(), (0, express_validator_1.check)("email", "El email es obligatorio").isEmail(), (0, express_validator_1.check)("password", "La contraseña es obligaria").not().isEmpty(), middleware_1.checkErrors, user_1.createUser);
router.post("/auth/token", (0, express_validator_1.check)("email", "El email es obligatorio").isEmail(), (0, express_validator_1.check)("password", "La contraseña es obligaria").not().isEmpty(), middleware_1.checkErrors, user_1.loggin);
router.get("/user", user_1.getUser);
router.get("/validate/token", user_1.validate);
router.post("/create/note", (0, express_validator_1.check)("content", "El contenido es obligatorio").isLength({ min: 4 }), (0, express_validator_1.check)("title", "El titulo es obligatorio").not().isEmpty(), middleware_1.checkErrors, note_1.createNote);
router.patch("/update/:id", note_1.updateNoteById);
router.delete("/delete/:id", note_1.deleteNoteById);
//# sourceMappingURL=index.js.map
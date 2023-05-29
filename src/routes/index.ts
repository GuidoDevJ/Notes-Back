// Importaciones
import { Router } from "express";
import { check } from "express-validator";
import { checkErrors } from "../middleware";
import { createUser, getUser, loggin, validate } from "../controllers/user";
import {
  createNote,
  deleteNoteById,
  updateNoteById,
} from "../controllers/note";

// Variables
const router = Router();
router.get("/",(req,res)=>{
  res.send("hola")
})
router.post(
  "/create/user",
  check("name", "El nombre del usuario es obligatorio").not().isEmpty(),
  check("email", "El email es obligatorio").isEmail(),
  check("password", "La contraseña es obligaria").not().isEmpty(),
  checkErrors,
  createUser
);

router.post(
  "/auth/token",
  check("email", "El email es obligatorio").isEmail(),
  check("password", "La contraseña es obligaria").not().isEmpty(),
  checkErrors,
  loggin
);

router.get("/user", getUser);
router.get("/validate/token", validate);
router.post("/create/note",
  check("content", "El contenido es obligatorio").isLength({ min: 4 }),
  check("title", "El titulo es obligatorio").not().isEmpty(),
  checkErrors,
  createNote);
router.patch("/update/:id", updateNoteById);
router.delete("/delete/:id", deleteNoteById);

export { router };

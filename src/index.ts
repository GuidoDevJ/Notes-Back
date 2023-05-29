import * as dotenv from "dotenv";
dotenv.config();
// Importaciones
import { Connection } from "./database/mongodb";
import { app } from "../src/app";

// Estableciendo la coneccion
Connection();

// Variables
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Escuchando",PORT);
});

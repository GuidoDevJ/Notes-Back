import express from "express";
import { router } from "./api/index";
import cors from 'cors';
const app = express();
app.use(cors({
    origin: "*",
  }))
  app.use(express.json());
  app.use(router);
export {app}
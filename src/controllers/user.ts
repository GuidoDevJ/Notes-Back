import { Request, Response } from "express";
import { User, modelUser } from "../models/users";
import mongoose from "mongoose";
import { criptPass, generateJsonToken, getToken } from "../helpers";
import bcrypt from "bcrypt";
import { couldStartTrivia } from "typescript";
// Variables
const connec = mongoose.connection;

const createUser = async (req: Request, res: Response) => {
  const body: User = req.body;
  const { email } = body;
  let bodyToDb = {
    ...body,
    password: await criptPass(body.password),
  };
  const user = await modelUser.findOne({ email });
  if (user === null) {
    modelUser
      .create(bodyToDb)
      .then((result) => {
        const token = generateJsonToken(result.id);
        connec.close();
        return res.status(201).json({ result, token });
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(401).json({
      ok: false,
      msg: "El usuario ya existe",
    });
  }
};

const loggin = async (req: Request, res: Response) => {
  const body = req.body;
  const { email, password } = body;
  const user = await modelUser.findOne({ email });
  if (user === null) {
    connec.close();
    return res.json({
      ok: false,
      msg: "Usuario o contraseña incorrectos",
    });
  } else {
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        ok: false,
        msg: "Usuario o contraseña incorrectas",
      });
    } else {
      // Generar Token
      const token = generateJsonToken(user.id);
      res.status(200).json({
        ok: true,
        token,
      });
    }
  }
};

const validate = (req: Request, res: Response) => {
  const { authorization } = req.headers;
  const result = getToken(authorization as string) as any;
  if(!result){
    return res.status(404).json({ ok:false,msg:"Token invalido" });
  }else{
    const { id } = result;
    return res.status(200).json({id})
  }
};

const getUser = async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  const result = getToken(authorization as string);
  if (!result) {
    res.status(401).json({ ok: false, msg: "Token incorrecto" });
  } else {
    const { id } = result;
    const results = await modelUser.findById(id).populate("notes", {
      id: 1,
      content: 1,
      title: 1,
    });
    res.status(200).json(results);
  }
};

export { createUser, loggin, validate, getUser };

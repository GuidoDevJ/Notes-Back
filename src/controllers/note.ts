import { Request, Response } from "express";
import { getToken } from "../helpers";
import mongoose from "mongoose";
import { modelNote } from "../models/notes";
import { modelUser } from "../models/users";
const connec = mongoose.connection;

interface Note {
  content: string;
  priority: boolean;
}

const createNote = async (req: Request, res: Response) => {
  const body: Note = req.body;
  const { authorization } = req.headers;
  const {id} = getToken(authorization as string) as any;
  const user = (await modelUser.findById(id)) || ({} as any);
  const noteResult = await modelNote.create({ ...body, user: id });
  user.notes = user?.notes.concat(noteResult.id);
  await user?.save();
  connec.close();
  res.status(201).json(noteResult);
};

const updateNoteById = async (req: Request, res: Response) => {
  const body = req.body;
  const { id } = req.params;
  try {
    const result = await modelNote.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    );
    res.status(200).json({ result });
  } catch (error: any) {
    if (error.name === "CastError")
      res.status(400).json({
        ok: false,
        msg: "Id incorrecto",
      });
  }
};
const deleteNoteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await modelNote.findByIdAndDelete(id);
    if(result === null){
      return res.status(404).json({
        ok: false,
        msg: "Id incorrecto",
      })
    }
    res.json({
      ok: true,
      msg: "Nota eliminada",
    });
  } catch (error: any) {
    if (error.name === "CastError")
      res.status(404).json({
        ok: false,
        msg: "Id incorrecto",
      });
  }
};

export { createNote, updateNoteById, deleteNoteById };

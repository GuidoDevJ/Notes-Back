import { Schema, model } from "mongoose";
export interface User {
  name: string;
  email: string;
  password: string;
  notes:[]
}

const userSchema = new Schema<User>({
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
  notes:[{
    type:Schema.Types.ObjectId,
    ref:"Note",
  }]
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const modelUser = model("User", userSchema);

export { modelUser };

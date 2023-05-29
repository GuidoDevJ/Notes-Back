import {Schema,model} from "mongoose"

interface Note{
    content:string,
    title:string,
    user:Schema.Types.ObjectId
}

const noteSchema = new Schema<Note>({
    content:{
        type:String,
        required:true
    },
    title:{
        type:String
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})
noteSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id;
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });

const modelNote = model("Note",noteSchema)

export {
    modelNote
}
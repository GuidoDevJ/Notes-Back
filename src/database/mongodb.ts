import * as dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"
const dbUrl:string = process.env.DB_CONN || ""

const Connection = async()=>{
   try {
    await mongoose.connect(dbUrl)
   } catch (error) {
    throw new Error("Error a la hora de inicializar la base de datos")
   }
}
export {
    Connection
}


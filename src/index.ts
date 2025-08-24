import dotenv from "dotenv"
dotenv.config()
import express from "express"
import path from "path";
import { connectDatabase } from "./config/db";
import todoRoutes from "./routes/routes"
import { errorHandler } from "./middlewares/error-handler.middleware";
const app = express()
connectDatabase()
app.use(express.json())
app.set("views", path.join(__dirname,'views'))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname,"public")));
app.use("/", todoRoutes)
app.use(errorHandler)
app.listen(process.env.PORT as string,()=>console.log("Sever is running"))
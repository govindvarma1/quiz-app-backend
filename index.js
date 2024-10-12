import express from "express"
import dotenv from 'dotenv';
import router from "./routes/routes.js";
import DBConnect from "./config/db.js";

const app = express();
app.use(express.json());
dotenv.config();

app.use("/", router);

DBConnect();

app.listen(process.env.PORT, (req, res) => {
    console.log(`server is running on port ${process.env.PORT}`);
})
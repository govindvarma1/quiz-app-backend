import express from "express"
import mongoose from "mongoose";
import router from "./routes/routes.js";
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
dotenv.config();

app.use("/", router);

async function DBConnect(req, res) {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to database successfully");
    } catch (err) {
        console.error(`The following error occurred: ${err}`);
        process.exit(1)
    }
}
DBConnect();

app.listen(process.env.PORT, (req, res) => {
    console.log(`server is running on port ${process.env.PORT}`);
})
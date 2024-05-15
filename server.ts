import express  from "express";
import dotenv from "dotenv";

dotenv.config();

const  PORT = process.env.PORT || 5000;
const app = express()

app.get("/", (req, res) => {
    res.send("CIRCEL APP - API");
});

app.listen(5000, () => {
    console.log("server is running at port" + 5000);
});
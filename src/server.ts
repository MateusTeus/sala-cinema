import express, { Request, Response } from "express";
import getMongoConn from "./db";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import salaCinema from "./models/salaCinema";
import routers from "./routes";

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());


app.use("/salas-cinema", routers.salaCinemasRouter);

app.listen(port, () => {
    console.log(`Servidor sendo executado na porta ${port}`);
});



import { MongoClient } from "mongodb";

const uri = "mongodb://admin:admin@127.0.0.1:27017/salaCinema";


const getMongoConn = async (): Promise<MongoClient> => {
    const client = new MongoClient(uri);
    const conn = await client.connect();
    return conn;
}



export default getMongoConn


//funcao concetar banco
import express, { Request, Response } from "express";
import getMongoConn from "./db";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import salaCinema from "./models/salaCinema";

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());


app.use(express.json());

app.get("/salas-cinema", async (req: Request, res: Response) => {
    const { sala } = req.query;

    try {
        if (typeof sala === "undefined") {
            throw new Error("O parâmetro sala não foi informado");
        }

        const numeroSala = parseInt(sala as string);
        if (isNaN(numeroSala)) {
            throw new Error("O parâmetro não é um número");
        }

        let conn: MongoClient | null = null;
        try {
            conn = await getMongoConn();
            const db = conn.db();
            const salasCinema = db.collection("salaCinema");
            const docs = await salasCinema.find({
                numeroSala: { $gte: numeroSala }
            }).toArray();
            res.status(200).json(docs);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        } finally {
            conn?.close();
        }
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
});

app.post("/salas-cinema", async (req: Request, res: Response) => {
    const salaData = req.body;

    try {

    if (typeof salaData.numeroSala === "undefined" || typeof salaData.capacidade === "undefined") {
            throw new Error("Número da sala e/ou capacidade não foram informados");
        }
        if (typeof salaData.numeroSala !== "number" || salaData.numeroSala < 0) {
            throw new Error("Número da sala deve ser um número maior ou igual a zero");
        }
        if (typeof salaData.capacidade !== "number" || salaData.capacidade < 0) {
            throw new Error("Capacidade deve ser um número maior ou igual a zero");
        }
    if (salaData.tipoSala === "" || typeof salaData.tipoSala !== "string" ) {
      throw new Error("Tipo de sala não é válido");
    }
    if (typeof salaData.andar !== "number" || salaData.andar < 0) {
        throw new Error("Andar deve ser um número maior ou igual a zero");
    }
    if (salaData.classificacaoEtaria === "" || typeof salaData.classificacaoEtaria !== "string" ) {
        throw new Error("Classificação Etaria da sala não é válido");
      }
    if (salaData.acessibilidade === "" || typeof salaData.acessibilidade !== "string" ) {
        throw new Error("Acessibilidade da sala não é válido");
      }
      if (salaData.legenda === "" || typeof salaData.legenda !== "string" ) {
        throw new Error("legenda da sala não é válido");
      }
      if (salaData.idiomaLegenda === "" || typeof salaData.idiomaLegenda !== "string" ) {
        throw new Error("Idioma Legenda da sala não é válido");
      }

      if (salaData.dublagem === "" || typeof salaData.dublagem !== "string" ) {
        throw new Error("dublagem da sala não é válido");
      }
      if (salaData.idiomaDublagem === "" || typeof salaData.idiomaDublagem !== "string" ) {
        throw new Error("Idioma dublagem da sala não é válido");
      }
      if (typeof salaData.assentosCadeirantes !== "number" || salaData.assentosCadeirantes < 0) {
        throw new Error("Andar deve ser um número maior ou igual a zero");
    }
    if (salaData.tipoTela === "" || typeof salaData.tipoTela !== "string" ) {
        throw new Error("dublagem da sala não é válido");
      }
      if (salaData.tamanhoTela === "" || typeof salaData.tamanhoTela !== "string" ) {
        throw new Error("tamanho de tela da sala não é válido");
      }

      if (typeof salaData.reservas !== "number" || salaData.reservas < 0) {
        throw new Error("Andar deve ser um número maior ou igual a zero");
    }
  }catch (error) {
    res.status(400).json({ message: (error as Error).message });
    return;
}
    let conn: MongoClient | null = null;

    try {
        conn = await getMongoConn();
        const db = conn?.db();
        const salasCinema = db?.collection("salaCinema");

        const SalaCinema = new salaCinema(salaData.numeroSala, salaData.capacidade,salaData.tipoSala, salaData.andar,
            salaData.classificacaoEtaria, salaData.acessibilidade,salaData.legenda, salaData.idiomaLegenda,salaData.dublagem,
             salaData.idiomaDublagem,salaData.assentosCadeirantes, salaData.tipoTela, salaData.tamanhoTela, salaData.reservas);
        const result = await salasCinema?.insertOne(SalaCinema);
        const insertedId = result?.insertedId;
        if (insertedId) {
            res.status(201).json({ _id: insertedId });
        } else {
            throw new Error("Erro ao inserir Sala de cinema");
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    } finally {
        conn?.close();
    }
    });


    app.put("/salas-cinema/:id", async (req: Request, res: Response) => {
        const objectId = new ObjectId(req.params.id);
        try {
            const objectId = new ObjectId(req.params.id);
        } catch (error) {
            res.status(400).json({ message: "O ID não é válido" });
            return;
        }
    
        const salaData = req.body;

        try {
          if (typeof salaData.numeroSala === "undefined" || typeof salaData.capacidade === "undefined") {
            throw new Error("Número da sala e/ou capacidade não foram informados");
          }
          if (typeof salaData.numeroSala !== "number" || salaData.numeroSala < 0) {
              throw new Error("Número da sala deve ser um número maior ou igual a zero");
          }
          if (typeof salaData.capacidade !== "number" || salaData.capacidade < 0) {
              throw new Error("Capacidade deve ser um número maior ou igual a zero");
          }
          if (salaData.tipoSala === "" || typeof salaData.tipoSala !== "string" ) {
            throw new Error("Tipo de sala não é válido");
          }
          if (typeof salaData.andar !== "number" || salaData.andar < 0) {
              throw new Error("Andar deve ser um número maior ou igual a zero");
          }
          if (salaData.classificacaoEtaria === "" || typeof salaData.classificacaoEtaria !== "string" ) {
              throw new Error("Classificação Etaria da sala não é válido");
            }
          if (salaData.acessibilidade === "" || typeof salaData.acessibilidade !== "string" ) {
              throw new Error("Acessibilidade da sala não é válido");
            }
            if (salaData.legenda === "" || typeof salaData.legenda !== "string" ) {
              throw new Error("legenda da sala não é válido");
            }
            if (salaData.idiomaLegenda === "" || typeof salaData.idiomaLegenda !== "string" ) {
              throw new Error("Idioma Legenda da sala não é válido");
            }
      
            if (salaData.dublagem === "" || typeof salaData.dublagem !== "string" ) {
              throw new Error("dublagem da sala não é válido");
            }
            if (salaData.idiomaDublagem === "" || typeof salaData.idiomaDublagem !== "string" ) {
              throw new Error("Idioma dublagem da sala não é válido");
            }
            if (typeof salaData.assentosCadeirantes !== "number" || salaData.assentosCadeirantes < 0) {
              throw new Error("Andar deve ser um número maior ou igual a zero");
          }
          if (salaData.tipoTela === "" || typeof salaData.tipoTela !== "string" ) {
              throw new Error("dublagem da sala não é válido");
            }
            if (salaData.tamanhoTela === "" || typeof salaData.tamanhoTela !== "string" ) {
              throw new Error("tamanho de tela da sala não é válido");
            }
      
            if (typeof salaData.reservas !== "number" || salaData.reservas < 0) {
              throw new Error("Andar deve ser um número maior ou igual a zero");
          }
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
            return;
        }
    
        let conn: MongoClient | null = null;
        try {
            conn = await getMongoConn();
            const db = conn?.db();
            const salasCinema = db?.collection("salaCinema");
    
            const SaladeCinema = new salaCinema(salaData.numeroSala, salaData.capacidade,salaData.tipoSala, salaData.andar,
                salaData.classificacaoEtaria, salaData.acessibilidade,salaData.legenda, salaData.idiomaLegenda,salaData.dublagem,
                 salaData.idiomaDublagem,salaData.assentosCadeirantes, salaData.tipoTela, salaData.tamanhoTela, salaData.reservas);
            const result = await salasCinema?.updateOne(
                { _id: objectId }, // Use a variável objectId
                { $set: SaladeCinema }
            );
            if (result?.modifiedCount === 1) {
                res.status(200).json({ message: "Registro atualizado com sucesso" });
            } else {
                res.status(404).json({ message: "Registro não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        } finally {
            conn?.close();
        }
    });
      









app.delete("/salas-cinema/:id", async (req: Request, res: Response) => {
    const objectId = new ObjectId(req.params.id);
    try {
        const objectId = new ObjectId(req.params.id);
    } catch (error) {
        res.status(400).json({ message: "O ID não é válido" });
        return;
    }

    let conn: MongoClient | null = null;
    try {
        conn = await getMongoConn();
        const db = conn?.db();
        const salasCinema = db?.collection("salaCinema");
        const result = await salasCinema?.deleteOne({ _id: objectId }); // Use a variável objectId
        if (result?.deletedCount === 1) {
            res.status(200).json({ message: "Registro excluído com sucesso" });
        } else {
            res.status(404).json({ message: "Registro não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    } finally {
        conn?.close();
    }
});

app.listen(port, () => {
  console.log(`Servidor sendo executado na porta ${port}`);
});

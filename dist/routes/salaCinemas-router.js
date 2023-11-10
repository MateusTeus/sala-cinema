"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const mongodb_1 = require("mongodb");
const salaCinema_1 = __importDefault(require("../models/salaCinema"));
const salaCinemasRouter = express_1.default.Router();
salaCinemasRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sala } = req.query;
    try {
        if (typeof sala === "undefined") {
            throw new Error("O parâmetro sala não foi informado");
        }
        const numeroSala = parseInt(sala);
        if (isNaN(numeroSala)) {
            throw new Error("O parâmetro não é um número");
        }
        let conn = null;
        try {
            conn = yield (0, db_1.default)();
            const db = conn.db();
            const salasCinema = db.collection("salaCinema");
            const docs = yield salasCinema.find({
                numeroSala: { $gte: numeroSala }
            }).toArray();
            res.status(200).json(docs);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
        finally {
            conn === null || conn === void 0 ? void 0 : conn.close();
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
salaCinemasRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (salaData.tipoSala === "" || typeof salaData.tipoSala !== "string") {
            throw new Error("Tipo de sala não é válido");
        }
        if (typeof salaData.andar !== "number" || salaData.andar < 0) {
            throw new Error("Andar deve ser um número maior ou igual a zero");
        }
        if (salaData.classificacaoEtaria === "" || typeof salaData.classificacaoEtaria !== "string") {
            throw new Error("Classificação Etaria da sala não é válido");
        }
        if (salaData.acessibilidade === "" || typeof salaData.acessibilidade !== "string") {
            throw new Error("Acessibilidade da sala não é válido");
        }
        if (salaData.legenda === "" || typeof salaData.legenda !== "string") {
            throw new Error("legenda da sala não é válido");
        }
        if (salaData.idiomaLegenda === "" || typeof salaData.idiomaLegenda !== "string") {
            throw new Error("Idioma Legenda da sala não é válido");
        }
        if (salaData.dublagem === "" || typeof salaData.dublagem !== "string") {
            throw new Error("dublagem da sala não é válido");
        }
        if (salaData.idiomaDublagem === "" || typeof salaData.idiomaDublagem !== "string") {
            throw new Error("Idioma dublagem da sala não é válido");
        }
        if (typeof salaData.assentosCadeirantes !== "number" || salaData.assentosCadeirantes < 0) {
            throw new Error("Andar deve ser um número maior ou igual a zero");
        }
        if (salaData.tipoTela === "" || typeof salaData.tipoTela !== "string") {
            throw new Error("Tipo de tela da sala não é válido");
        }
        if (salaData.tamanhoTela === "" || typeof salaData.tamanhoTela !== "string") {
            throw new Error("tamanho de tela da sala não é válido");
        }
        if (typeof salaData.reservas !== "number" || salaData.reservas < 0) {
            throw new Error("Andar deve ser um número maior ou igual a zero");
        }
        if (!(salaData.dataReserva instanceof Date) && isNaN(Date.parse(salaData.dataReserva))) {
            throw new Error("Data de reserva inválida");
        }
        if (!Array.isArray(salaData.letrasFileira) || !salaData.letrasFileira.every((item) => typeof item === 'string')) {
            throw new Error("Letras de fileira inválidas");
        }
        if (!Array.isArray(salaData.numerosAssento) || salaData.numerosAssento.some((num) => typeof num !== 'number' || isNaN(num) || num < 0)) {
            throw new Error("Números de assentos devem ser um array de números");
        }
        if (!salaData.numeroSala || !salaData.capacidade || !salaData.tipoSala) {
            res.status(400).json({ message: "Campos obrigatórios não foram preenchidos" });
            return;
        }
        if (!salaData.dataReserva) {
            throw new Error("Data de reserva não informada");
        }
        if (typeof salaData.nomeFilme !== "string" || salaData.nomeFilme.trim() === "") {
            throw new Error("Nome do filme inválido");
        }
        if (typeof salaData.cadeirasEspeciais !== "number" || salaData.cadeirasEspeciais < 0) {
            throw new Error("Cadeiras especiais devem ser um número maior ou igual a zero");
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
        return;
    }
    let conn = null;
    try {
        conn = yield (0, db_1.default)();
        const db = conn === null || conn === void 0 ? void 0 : conn.db();
        const salasCinema = db === null || db === void 0 ? void 0 : db.collection("salaCinema");
        const SalaCinema = new salaCinema_1.default(salaData.numeroSala, salaData.capacidade, salaData.tipoSala, salaData.andar, salaData.classificacaoEtaria, salaData.acessibilidade, salaData.legenda, salaData.idiomaLegenda, salaData.dublagem, salaData.idiomaDublagem, salaData.assentosCadeirantes, salaData.tipoTela, salaData.tamanhoTela, salaData.reservas, salaData.letrasFileira, salaData.numerosAssento, salaData.nomeFilme, salaData.cadeirasEspeciais, salaData.dataReserva);
        const result = yield (salasCinema === null || salasCinema === void 0 ? void 0 : salasCinema.insertOne(SalaCinema));
        const insertedId = result === null || result === void 0 ? void 0 : result.insertedId;
        if (insertedId) {
            res.status(201).json({ _id: insertedId });
        }
        else {
            throw new Error("Erro ao inserir Sala de cinema");
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
    finally {
        conn === null || conn === void 0 ? void 0 : conn.close();
    }
}));
salaCinemasRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongodb_1.ObjectId(req.params.id);
    try {
        const objectId = new mongodb_1.ObjectId(req.params.id);
    }
    catch (error) {
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
        if (salaData.tipoSala === "" || typeof salaData.tipoSala !== "string") {
            throw new Error("Tipo de sala não é válido");
        }
        if (typeof salaData.andar !== "number" || salaData.andar < 0) {
            throw new Error("Andar deve ser um número maior ou igual a zero");
        }
        if (salaData.classificacaoEtaria === "" || typeof salaData.classificacaoEtaria !== "string") {
            throw new Error("Classificação Etaria da sala não é válido");
        }
        if (salaData.acessibilidade === "" || typeof salaData.acessibilidade !== "string") {
            throw new Error("Acessibilidade da sala não é válido");
        }
        if (salaData.legenda === "" || typeof salaData.legenda !== "string") {
            throw new Error("legenda da sala não é válido");
        }
        if (salaData.idiomaLegenda === "" || typeof salaData.idiomaLegenda !== "string") {
            throw new Error("Idioma Legenda da sala não é válido");
        }
        if (salaData.dublagem === "" || typeof salaData.dublagem !== "string") {
            throw new Error("dublagem da sala não é válido");
        }
        if (salaData.idiomaDublagem === "" || typeof salaData.idiomaDublagem !== "string") {
            throw new Error("Idioma dublagem da sala não é válido");
        }
        if (typeof salaData.assentosCadeirantes !== "number" || salaData.assentosCadeirantes < 0) {
            throw new Error("Andar deve ser um número maior ou igual a zero");
        }
        if (salaData.tipoTela === "" || typeof salaData.tipoTela !== "string") {
            throw new Error("Tipo de tela da sala não é válido");
        }
        if (salaData.tamanhoTela === "" || typeof salaData.tamanhoTela !== "string") {
            throw new Error("tamanho de tela da sala não é válido");
        }
        if (typeof salaData.reservas !== "number" || salaData.reservas < 0) {
            throw new Error("Andar deve ser um número maior ou igual a zero");
        }
        if (!(salaData.dataReserva instanceof Date) && isNaN(Date.parse(salaData.dataReserva))) {
            throw new Error("Data de reserva inválida");
        }
        if (!Array.isArray(salaData.letrasFileira) || !salaData.letrasFileira.every((item) => typeof item === 'string')) {
            throw new Error("Letras de fileira inválidas");
        }
        if (!Array.isArray(salaData.numerosAssento) || salaData.numerosAssento.some((num) => typeof num !== 'number' || isNaN(num) || num < 0)) {
            throw new Error("Números de assentos devem ser um array de números");
        }
        if (typeof salaData.nomeFilme !== "string" || salaData.nomeFilme.trim() === "") {
            throw new Error("Nome do filme inválido");
        }
        if (typeof salaData.cadeirasEspeciais !== "number" || salaData.cadeirasEspeciais < 0) {
            throw new Error("Cadeiras especiais devem ser um número maior ou igual a zero");
        }
        if (!salaData.numeroSala || !salaData.capacidade || !salaData.tipoSala) {
            res.status(400).json({ message: "Campos obrigatórios não foram preenchidos" });
            return;
        }
        if (!salaData.dataReserva) {
            throw new Error("Data de reserva não informada");
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
        return;
    }
    let conn = null;
    try {
        conn = yield (0, db_1.default)();
        const db = conn === null || conn === void 0 ? void 0 : conn.db();
        const salasCinema = db === null || db === void 0 ? void 0 : db.collection("salaCinema");
        const SaladeCinema = new salaCinema_1.default(salaData.numeroSala, salaData.capacidade, salaData.tipoSala, salaData.andar, salaData.classificacaoEtaria, salaData.acessibilidade, salaData.legenda, salaData.idiomaLegenda, salaData.dublagem, salaData.idiomaDublagem, salaData.assentosCadeirantes, salaData.tipoTela, salaData.tamanhoTela, salaData.reservas, salaData.letrasFileira, salaData.numerosAssento, salaData.nomeFilme, salaData.cadeirasEspeciais, salaData.dataReserva);
        const result = yield (salasCinema === null || salasCinema === void 0 ? void 0 : salasCinema.updateOne({ _id: objectId }, { $set: SaladeCinema }));
        if ((result === null || result === void 0 ? void 0 : result.modifiedCount) === 1) {
            res.status(200).json({ message: "Registro atualizado com sucesso" });
        }
        else {
            res.status(404).json({ message: "Registro não encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
    finally {
        conn === null || conn === void 0 ? void 0 : conn.close();
    }
}));
salaCinemasRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongodb_1.ObjectId(req.params.id);
    try {
        const objectId = new mongodb_1.ObjectId(req.params.id);
    }
    catch (error) {
        res.status(400).json({ message: "O ID não é válido" });
        return;
    }
    let conn = null;
    try {
        conn = yield (0, db_1.default)();
        const db = conn === null || conn === void 0 ? void 0 : conn.db();
        const salasCinema = db === null || db === void 0 ? void 0 : db.collection("salaCinema");
        const result = yield (salasCinema === null || salasCinema === void 0 ? void 0 : salasCinema.deleteOne({ _id: objectId }));
        if ((result === null || result === void 0 ? void 0 : result.deletedCount) === 1) {
            res.status(200).json({ message: "Registro excluído com sucesso" });
        }
        else {
            res.status(404).json({ message: "Registro não encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
    finally {
        conn === null || conn === void 0 ? void 0 : conn.close();
    }
}));
exports.default = salaCinemasRouter;

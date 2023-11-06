"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class salaCinema {
    constructor(numeroSala, capacidade, tipoSala, andar, classificacaoEtaria, acessibilidade, legenda, idiomaLegenda, dublagem, idiomaDublagem, assentosCadeirantes, tipoTela, tamanhoTela, reservas) {
        this.numeroSala = numeroSala;
        this.capacidade = capacidade;
        this.tipoSala = tipoSala;
        this.andar = andar;
        this.classificacaoEtaria = classificacaoEtaria;
        this.acessibilidade = acessibilidade;
        this.legenda = legenda;
        this.idiomaLegenda = idiomaLegenda;
        this.dublagem = dublagem;
        this.idiomaDublagem = idiomaDublagem;
        this.assentosCadeirantes = assentosCadeirantes;
        this.tipoTela = tipoTela;
        this.tamanhoTela = tamanhoTela;
        this.reservas = reservas;
    }
}
exports.default = salaCinema;

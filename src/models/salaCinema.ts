export default class salaCinema {
    numeroSala: number;
    capacidade: number;
    tipoSala: string;  //sala padrão, 3d ou IMAXX
    andar: number;
    classificacaoEtaria: string;
    acessibilidade: string;
    legenda: string;
    idiomaLegenda: string;
    dublagem: string;
    idiomaDublagem: string;
    assentosCadeirantes: number;
    tipoTela: string  // Tela plana, fixa, 3d, tel grande
    tamanhoTela: string;
    reservas: number;


    constructor(numeroSala: number, capacidade: number, tipoSala: string, andar: number, classificacaoEtaria: string, acessibilidade: string, legenda: string, idiomaLegenda: string, dublagem: string, idiomaDublagem: string, assentosCadeirantes: number, tipoTela: string, tamanhoTela: string, reservas: number) {
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
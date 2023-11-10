export default class SalaCinema {
    numeroSala: number;
    capacidade: number;
    tipoSala: string;  // Sala padrão, 3D ou IMAX
    andar: number;
    classificacaoEtaria: string;
    acessibilidade: string;
    legenda: string;
    idiomaLegenda: string;
    dublagem: string;
    idiomaDublagem: string;
    assentosCadeirantes: number;
    tipoTela: string;  // Tela plana, fixa, 3D, tela grande
    tamanhoTela: string;
    reservas: number;
    letrasFileira: string[];  // Array de letras para as fileiras
    numerosAssento: number[];  // Array de números para os assentos
    nomeFilme: string;
    cadeirasEspeciais: number;  // Número de cadeiras especiais
    dataReserva: Date;

    constructor(numeroSala: number, capacidade: number, tipoSala: string, andar: number, classificacaoEtaria: string, acessibilidade: string, legenda: string, idiomaLegenda: string, dublagem: string, idiomaDublagem: string, assentosCadeirantes: number, tipoTela: string, tamanhoTela: string, reservas: number, letrasFileira: string[], numerosAssento: number[], nomeFilme: string, cadeirasEspeciais: number, dataReserva: Date) {
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
        this.letrasFileira = letrasFileira;
        this.numerosAssento = numerosAssento;
        this.nomeFilme = nomeFilme;
        this.cadeirasEspeciais = cadeirasEspeciais;
        this.dataReserva = dataReserva;
    }
}

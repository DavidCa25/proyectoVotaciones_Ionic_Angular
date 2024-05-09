import { Propuesta } from "./propuesta";

export class Candidato{
    _id?: number;
    candidato: String;
    propuestas: Propuesta[];
    voto: number;

    constructor(_candidato: String, _propuestas: Propuesta[], _voto: number){
        this.candidato = _candidato,
        this.propuestas = _propuestas;
        this.voto = _voto;
    }
}

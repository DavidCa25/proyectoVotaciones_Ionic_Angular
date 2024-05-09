import { Propuesta } from "./propuesta";

export class Candidato{
    _id?: number;
    candidato: String;
    propuesta: Propuesta[];
    voto: number;

    constructor(_candidato: String, _propuesta: Propuesta[], _voto: number){
        this.candidato = _candidato,
        this.propuesta = _propuesta;
        this.voto = _voto;
    }
}

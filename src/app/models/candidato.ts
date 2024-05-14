// Importación del modelo de Propuesta
import { Propuesta } from "./propuesta";


export class Candidato{
    _id?: number;
    candidato: String;
    propuestas: Propuesta[];
    voto: number;
    imgFoto:string;

    constructor(_candidato: String, _propuestas: Propuesta[], _voto: number, _imgFoto:string){
        this.candidato = _candidato,
        this.propuestas = _propuestas;
        this.voto = _voto;
        this.imgFoto = _imgFoto;

// Definición de la clase Candidato
    }
}

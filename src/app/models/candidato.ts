// Importación del modelo de Propuesta
import { Propuesta } from "./propuesta";


export class Candidato{
    _id?: number;
    candidato: String;
    propuestas: Propuesta[];
    voto: number;
    imgFoto:string;
    partido: string;

    constructor(_candidato: String, _propuestas: Propuesta[], _voto: number, _imgFoto:string, _partido:string){
        this.candidato = _candidato,
        this.propuestas = _propuestas;
        this.voto = _voto;
        this.imgFoto = _imgFoto;
        this.partido = _partido;

// Definición de la clase Candidato
    }
}

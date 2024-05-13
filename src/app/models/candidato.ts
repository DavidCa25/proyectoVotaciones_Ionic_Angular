// Importación del modelo de Propuesta
import { Propuesta } from "./propuesta";

// Definición de la clase Candidato
export class Candidato {
    _id?: number; // ID opcional del candidato
    candidato: String; // Nombre del candidato
    propuestas: Propuesta[]; // Lista de propuestas del candidato
    voto: number; // Número de votos recibidos por el candidato

    // Constructor de la clase Candidato
    constructor(_candidato: String, _propuestas: Propuesta[], _voto: number) {
        // Inicialización de las propiedades con los valores proporcionados
        this.candidato = _candidato; // Asignación del nombre del candidato
        this.propuestas = _propuestas; // Asignación de la lista de propuestas
        this.voto = _voto; // Asignación del número de votos
    }
}


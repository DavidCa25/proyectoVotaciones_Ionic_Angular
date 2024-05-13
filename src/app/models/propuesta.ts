// Definición de la clase Propuesta
export class Propuesta {
    _id?: number; // ID opcional de la propuesta
    titulo: String; // Título de la propuesta

    // Constructor de la clase Propuesta
    constructor(_titulo: String) {
        // Inicialización de la propiedad con el título proporcionado
        this.titulo = _titulo; // Asignación del título de la propuesta
    }
}

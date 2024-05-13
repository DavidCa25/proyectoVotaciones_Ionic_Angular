// Importaciones necesarias
import { HttpClient } from '@angular/common/http'; // Importación del módulo HttpClient
import { Injectable } from '@angular/core'; // Decorador Injectable para indicar que este servicio puede ser inyectado en otros componentes
import { Observable } from 'rxjs'; // Importación de Observable desde RxJS

@Injectable({
  providedIn: 'root' // Decorador Injectable con providedIn: 'root' para registrar el servicio en el nivel raíz del módulo
})
export class CandidatoService { // Definición de la clase CandidatoService

    url = 'https://75hdq3d1rac9.share.zrok.io/api/candidatos/'; // URL base para las solicitudes al backend

    constructor(private http: HttpClient) {} // Constructor del servicio, inyecta el módulo HttpClient

    // Función para obtener la lista de candidatos
    getCandidatos(): Observable<any> {
        return this.http.get(this.url); // Realiza una solicitud GET a la URL especificada y devuelve un Observable con la respuesta
    }

    // Función para eliminar un candidato por su ID
    eliminarCandidatos(id: string): Observable<any> {
        return this.http.delete(this.url + id); // Realiza una solicitud DELETE a la URL del candidato especificado y devuelve un Observable con la respuesta
    }

    // Función para obtener un candidato por su ID
    obtenerCandidatoPorId(id: string): Observable<any> {
        return this.http.get(this.url + id); // Realiza una solicitud GET a la URL del candidato especificado y devuelve un Observable con la respuesta
    }

    // Función para votar por un candidato por su ID
    votarPorCandidato(id: string): Observable<any> {
        return this.http.put(this.url + id, {}); // Realiza una solicitud PUT a la URL del candidato especificado con un cuerpo vacío y devuelve un Observable con la respuesta
    }
}


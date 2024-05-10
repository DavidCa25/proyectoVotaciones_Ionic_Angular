import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CandidatoService{

    url = 'http://localhost:4000/api/candidatos'

    constructor(private http: HttpClient) {}

    getCandidatos(): Observable<any> {
        return this.http.get(this.url);
    }
    eliminarCandidatos(id:string): Observable<any>{
        return this.http.delete(this.url + id);
    }
    obtenerCandidatoPorId(id:string): Observable<any>{
        return this.http.get(this.url + id);
    }
}


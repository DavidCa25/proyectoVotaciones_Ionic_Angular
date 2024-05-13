import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CandidatoService{

    url = 'https://75hdq3d1rac9.share.zrok.io/api/candidatos/'

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
    votarPorCandidato(id:string): Observable<any>{
        return this.http.put(this.url + id, {});
    }
    
}


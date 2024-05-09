import { Component, OnInit, ViewChild } from '@angular/core';
import { Candidato } from '../models/candidato';
import { CandidatoService } from '../services/candidato.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  listCandidatos: Candidato[] = []


  constructor(private _candidatoServices: CandidatoService) {
   
    this.obtenerCandidatos();
  }

  ngOnInit(): void {
   
  }
  obtenerCandidatos(){
    this._candidatoServices.getCandidatos().subscribe(data => {
        this.listCandidatos = data;
    }, error =>{
        console.log(error)
    })
  }
  eliminarCandidato(id: any){
    this._candidatoServices.eliminarCandidatos(id).subscribe(data => {
      this.obtenerCandidatos();
      
    }, error =>{
        console.log(error);
    })
  }
}

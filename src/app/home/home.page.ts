import { Component, OnInit, ViewChild } from '@angular/core';
import { Candidato } from '../models/candidato';
import { CandidatoService } from '../services/candidato.service';
import { ToastrService } from 'ngx-toastr';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  listCandidatos: Candidato[] = []
  isModalOpen = false;
  isModalOpenV = false;
  candidatoSeleccionado!: Candidato;
  @ViewChild("chart") chart!: ChartComponent;

  
  public chartOptions: Partial<ChartOptions> = {
    series: [
      {
        name: "My-series",
        data: [],
      }
    ],
    chart: {
      height: 350,
      type: "bar"
    },
    title: {
      text: "My First Angular Chart"
    },
    xaxis: {
      categories: [this.obtenerCandidatos()]
    }
  };

  


  constructor(private _candidatoServices: CandidatoService) {
   
    this.obtenerCandidatos();
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
   
  }
  obtenerCandidatos() {
    console.log('URL de la solicitud:', this._candidatoServices.url);
    this._candidatoServices.getCandidatos().subscribe(
      candidatos => {
        console.log(candidatos);
        this.listCandidatos = candidatos;
        // Extracting candidate names to use as categories for the chart
      const categories = this.listCandidatos.map(candidato => {
        const nombreParts = candidato.candidato.split(' ');
        // Taking the first part as the first name
        return nombreParts[0]
      });
      // Assigning categories to chartOptions
      this.chartOptions.xaxis = { categories };

       // Building data for the chart series based on candidate votes
       const data = this.listCandidatos.map(candidato => candidato.voto);
       // Assigning data to chartOptions
       this.chartOptions.series = [{ data }];
      },
      error => {
        console.error('Error en la solicitud:', error);
        if (error.error instanceof ErrorEvent) {
          console.error('Error del lado del cliente:', error.error.message);
        } else {
          console.error(`Código de error ${error.status}, cuerpo: `, error.error);
        }
      }
    );
  }
  votarPorCandidato(id: string, voto:number): void {
    this._candidatoServices.votarPorCandidato(id, voto).subscribe(
      () => {
        this.obtenerCandidatos();
      },
      error => {
        console.error('Error al votar por el candidato:', error);
      }
    );
  }
  
  
  eliminarCandidato(id: any){
    this._candidatoServices.eliminarCandidatos(id).subscribe(() => {
      this.obtenerCandidatos();
      
    }, error =>{
        console.log(error);
    })
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;

  }
  setCandidatoSeleccionado(candidato: Candidato) {
    this.candidatoSeleccionado = candidato;
    this.setOpen(true); // Abre el modal cuando se selecciona un candidato
  }



  setOpen1(isOpen: boolean) {
    this.isModalOpenV = isOpen;

  }

}

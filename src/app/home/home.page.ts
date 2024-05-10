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

  @ViewChild("chart")
  chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {
    series: [
      {
        name: "My-series",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
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
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
    }
  };
  



  constructor(private _candidatoServices: CandidatoService) {
   
    this.obtenerCandidatos();
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
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

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;

  }

  setOpen1(isOpen: boolean) {
    this.isModalOpenV = isOpen;

  }

}

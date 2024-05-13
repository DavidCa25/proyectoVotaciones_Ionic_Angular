// Importaciones de Angular Core y otros módulos
import { Component, OnInit, ViewChild } from '@angular/core';
import { Candidato } from '../models/candidato'; // Importación del modelo de Candidato
import { CandidatoService } from '../services/candidato.service'; // Importación del servicio de Candidato
import { ToastrService } from 'ngx-toastr'; // Importación del servicio Toastr para notificaciones

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts"; // Importaciones necesarias para utilizar gráficos ApexCharts

// Definición de tipo para las opciones del gráfico
export type ChartOptions = {
  series: ApexAxisChartSeries; // Series de datos del gráfico
  chart: ApexChart; // Configuración del gráfico
  xaxis: ApexXAxis; // Configuración del eje X del gráfico
  title: ApexTitleSubtitle; // Título del gráfico
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit { // Clase principal de la página Home, implementa OnInit
  // Propiedades de la clase
  listCandidatos: Candidato[] = []; // Lista de candidatos
  isModalOpen = false; // Estado del modal para mostrar propuestas
  isModalOpenV = false; // Estado del modal para mostrar encuestas
  candidatoSeleccionado!: Candidato; // Candidato seleccionado
  @ViewChild("chart") chart!: ChartComponent; // Referencia al componente de gráfico

  // Opciones del gráfico inicializadas con valores por defecto
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
      categories: [this.obtenerCandidatos()] // Categorías del eje X inicializadas con la función obtenerCandidatos()
    }
  };

  // Constructor de la clase, inyecta el servicio de Candidato
  constructor(private _candidatoServices: CandidatoService) {
    this.obtenerCandidatos(); // Llamada a la función para obtener los candidatos al inicializar la página
  }

  // Método OnInit, ejecutado al inicializar el componente
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    // No hay implementaciones adicionales en este método
  }

  // Función para obtener la lista de candidatos desde el servicio
  obtenerCandidatos() {
    console.log('URL de la solicitud:', this._candidatoServices.url); // Imprime la URL de la solicitud al servicio
    this._candidatoServices.getCandidatos().subscribe(
      candidatos => { // Callback de éxito, recibe la lista de candidatos
        console.log(candidatos); // Imprime la lista de candidatos en la consola
        this.listCandidatos = candidatos; // Asigna la lista de candidatos a la propiedad de la clase

        // Obtiene las categorías y los datos para el gráfico a partir de la lista de candidatos
        const categories = this.listCandidatos.map(candidato => {
          const nombreParts = candidato.candidato.split(' '); // Divide el nombre del candidato en partes
          return nombreParts[0]; // Devuelve el primer nombre del candidato como categoría
        });
        this.chartOptions.xaxis = { categories }; // Asigna las categorías al eje X del gráfico

        const data = this.listCandidatos.map(candidato => candidato.voto); // Obtiene los datos de votos de los candidatos
        this.chartOptions.series = [{ data }]; // Asigna los datos al series del gráfico
      },
      error => { // Callback de error, recibe el error
        console.error('Error en la solicitud:', error); // Imprime el error en la consola
        if (error.error instanceof ErrorEvent) {
          console.error('Error del lado del cliente:', error.error.message); // Imprime el mensaje de error del lado del cliente
        } else {
          console.error(`Código de error ${error.status}, cuerpo: `, error.error); // Imprime el código de error y el cuerpo del error
        }
      }
    );
  }

  // Función para votar por un candidato
  votarPorCandidato(id: any): void {
    // Llama al servicio para votar por el candidato con el ID proporcionado
    this._candidatoServices.votarPorCandidato(id).subscribe(
      () => {
        this.obtenerCandidatos(); // Vuelve a obtener la lista de candidatos después de votar
      },
      error => {
        console.error('Error al votar por el candidato:', error); // Imprime el error en la consola si ocurre un error al votar
      }
    );
    this.setOpen1(true); // Abre el modal para mostrar encuestas después de votar
  }

  // Función para eliminar un candidato
  eliminarCandidato(id: any){
    // Llama al servicio para eliminar el candidato con el ID proporcionado
    this._candidatoServices.eliminarCandidatos(id).subscribe(() => {
      this.obtenerCandidatos(); // Vuelve a obtener la lista de candidatos después de eliminar uno
    }, error =>{
        console.log(error); // Imprime el error en la consola si ocurre un error al eliminar un candidato
    })
  }

  // Función para establecer el estado del modal de propuestas
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  // Función para establecer el candidato seleccionado y abrir el modal de propuestas
  setCandidatoSeleccionado(candidato: Candidato) {
    this.candidatoSeleccionado = candidato;
    this.setOpen(true); // Abre el modal de propuestas
  }

  // Función para establecer el estado del modal de encuestas
  setOpen1(isOpen: boolean) {
    this.isModalOpenV = isOpen;
  }

}

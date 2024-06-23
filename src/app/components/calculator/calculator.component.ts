import {Component, OnInit} from '@angular/core';
import {Cronograma} from "../../models/Cronograma";
import {CronogramaService} from "../../services/cronograma.service";
import {ActivatedRoute, Router, convertToParamMap} from "@angular/router";
import { DateAdapter } from '@angular/material/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit{

  minDate = new Date()
  cronograma: Cronograma = new Cronograma();
  customerId!: number;

  constructor(private cronogramaService: CronogramaService,private router: Router,private activated: ActivatedRoute,private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB')
  }

  ngOnInit() {
    this.customerId = this.activated.snapshot.params['customerId'];
    this.cronograma.porcentajeSeguroVehicular = 0;
    this.cronograma.portes=0;
    this.cronograma.costosRegistrales=0;
    this.cronograma.costosNotariales=0;
    this.cronograma.tiempoSeguroVehicular="ANUAL";
    this.cronograma.porcentajeCuotaFinal=0;
    this.cronograma.porcentajeTasaInteres=0;
    this.cronograma.tiempoSeguroDesgravamen="ANUAL";
  }

  onDateChange(event: any) {
    const date = new Date(event.value);
    this.cronograma.fechaInicio = this.formatDateToGB(date);
    console.log('Fecha de inicio seleccionada:', this.cronograma.fechaInicio);
  }

  formatDateToGB(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }


  enviarDatos(): void {


    this.cronogramaService
      .calcularCronograma(this.customerId, this.cronograma)
      .subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response);
          this.router.navigate(['/cotizaciones', this.customerId]);


        },
        (error) => {
          console.error('Error al enviar datos:', error);
        }
      );
  }

  logout() {
    sessionStorage.removeItem('userid');
    console.log('FUNCIONAAAAAA');
  }
}

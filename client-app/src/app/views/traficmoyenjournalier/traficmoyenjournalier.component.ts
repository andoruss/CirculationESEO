import { Component, OnInit } from '@angular/core';
import { SensorDTO } from '../../models/DTOs/SensorDTO';
import { SensorService } from '../../services/sensor.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Hoursformat } from '../../pipe/hoursformat.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { MeasureService } from '../../services/measure.service';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

import { MeasureDTO } from '../../models/DTOs/MeasureDTO';
import { TraficmoyenhistogrammeComponent } from '../../shared/traficmoyenhistogramme/traficmoyenhistogramme.component';
import { merge } from 'highcharts';

@Component({
  selector: 'app-traficmoyenjournalier',
  standalone: true,
  providers: [
    provideNativeDateAdapter()
  ],
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatDatepickerModule,
    Hoursformat,
    ReactiveFormsModule,
    MatSelectModule,
    TraficmoyenhistogrammeComponent,
  ],
  templateUrl: './traficmoyenjournalier.component.html',
  styleUrls: ['./traficmoyenjournalier.component.scss']
})
export class TraficmoyenjournalierComponent implements OnInit {
  //affichage de la liste des capteurs
  dropdownOpen = false;
  // Charge les capteurs à l'initialisation de la page
  sensors: SensorDTO[] = [];
  sensor!: number;;
  years: number[] = [];
  actualYear = new Date().getFullYear();
  measures: MeasureDTO[] = [];
  dataMeasureTMJM: Array<number> = [];
  dataMeasureTMJO: Array<number> = [];
  date: string = '';

  constructor(private sensorService: SensorService, private measureService: MeasureService) { }

  ngOnInit(): void {
    this.sensorService.GetCapteurs().subscribe({
      next: (data: SensorDTO[]) => {
        this.sensors = data;
        this.sensor = this.sensors[0].sensorId;
        this.generateYears(1900, 3000);
        this.findMeasure();
      },
      error: (error) => {
        console.error('Error fetching sensors data', error);
      }
    });
    
  }

  generateYears(startYear: number, endYear: number) {
    for (let year = startYear; year <= endYear; year++) {
      this.years.push(year);
    }
  }

  findMeasure() {
    this.measureService.getMeasuresByYearTMJM(this.sensor, this.actualYear).subscribe(data => {
      this.dataMeasureTMJM = [0,0,0,0,0,0,0,0,0,0,0,0]; 
      this.measures = {...data};
      data.forEach((measure) => {
        const date:Date = new Date(measure.date);
        this.dataMeasureTMJM[date.getMonth()] = this.dataMeasureTMJM[date.getMonth()] + measure.nbCar;
      });
      
    });

    this.measureService.getMeasuresByYearTMJO(this.sensor, this.actualYear).subscribe(data => {
      this.dataMeasureTMJO = [0,0,0,0,0,0,0,0,0,0,0,0];
      this.measures = {...data};
      data.forEach((measure) => {
        const date:Date = new Date(measure.date);
        this.dataMeasureTMJO[date.getMonth()] = this.dataMeasureTMJO[date.getMonth()] + measure.nbCar;
      });
    });
  }

}

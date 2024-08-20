import { Component, OnInit } from '@angular/core';
import { SensorDTO } from '../../models/DTOs/SensorDTO';
import { SensorService } from '../../services/sensor.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { Hoursformat } from '../../pipe/hoursformat.pipe';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MeasureDTO } from '../../models/DTOs/MeasureDTO';
import { MeasureService } from '../../services/measure.service';
import{HourlyCarCount} from '../../models/interfaces/HourlyCarCount';
import { DatePickerWeekComponent } from '../../shared/date-picker-week/date-picker-week.component';
import { WeekGraphComponent } from '../../shared/week-graph/week-graph.component';
import { Observer, Subject } from 'rxjs';
import { WeeklyCarCount } from '../../models/interfaces/WeeklyCarCount';

@Component({
    selector: 'app-histogrammes',
    standalone: true,
    providers: [provideNativeDateAdapter()],
    templateUrl: './histogrammes.component.html',
    styleUrl: './histogrammes.component.scss',
    imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, Hoursformat,ReactiveFormsModule, DatePickerWeekComponent, WeekGraphComponent]
})

export class HistogrammesComponent implements OnInit {
  hours: number[] = Array.from({ length: 24 }, (_, i) => i);
  updateGraph: Subject<WeeklyCarCount[]> = new Subject();
 
  constructor(private sensorService: SensorService, private measureService:MeasureService) { }

  // Charge les capteurs à l'initialisation de la page
  sensors: SensorDTO[] = [];
  ngOnInit(): void {
    this.sensorService.GetCapteurs().subscribe({
      next: (data: SensorDTO[]) => {
        this.sensors = data;
        console.log(this.sensors);
      },
      error: (error) => {
        console.error('Error fetching sensors data', error);
      }
    });

    this.updateGraph.subscribe( data => {
      this.isMeasuresLoad = true;
    })
  }

  // Display la liste des capteurs
  dropdownOpen = false;
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Gère le tableau des capteurs cochés
  currentSensor: SensorDTO | null = null;
  checkedSensors : SensorDTO[]=[];
  CheckedSensor(event: any, sensor: SensorDTO) {
    //event récupère le cochage ou le décochage
    // si un capteur est coché
    if (event.target.checked) {
      // si c'est le premier capteur du tableau
      if (this.checkedSensors.length === 0) {
        // met la class active
        sensor.isActive = true; 
        // sauvegarde l'objet 
        this.currentSensor = sensor;
      } 
      else {
        sensor.isActive = false;
      }
      // ajout du sensor au tableau 
      this.checkedSensors.push(sensor);
    } 
    // le capteur est déselectionné
    else {
      // on récuère son index
      let index = this.checkedSensors.indexOf(sensor);
      if (index !== -1) {
        // retire l'element du tableau
        this.checkedSensors.splice(index, 1);
        // Vérifiez si aucun élément n'est actif et mettez le premier élément à actif
        if (!this.checkedSensors.some(s => s.isActive) && this.checkedSensors.length > 0) {
          this.checkedSensors[0].isActive = true;
          // recupèrer les infos du sensor actif
          this.currentSensor = this.checkedSensors[0];
        } else if (this.checkedSensors.length === 0) {
          this.currentSensor = null;
        }
      }
    }
  }
  
  // Recupère les mesures pour une date précise
  measures: MeasureDTO[] = [];
  isMeasuresLoad : boolean = false;
  date = new FormControl();
  startDate : Date = new Date();
  endDate : Date = new Date();
  dateFormat : string ="";
  Visualise() {
    if(this.checkedSensors.length === 0 || this.startDate == null || this.endDate == null){
      console.log('capteurs non coché ou date non sélectionné');
    }
    else{

      this.measureService.GetMeasuresByDateRange(this.startDate, this.endDate).subscribe({
        next: (data: MeasureDTO[]) => {
          this.measures = data;
          this.currentMeasures = [];
          this.trimMeasures(this.currentSensor)  
          this.dateFormat = this.formatDate(this.date.value)
          this.dropdownOpen = false;
          this.updateGraph.next(this.weeklyCarCount);
          console.log("Les bonnes mesures")
          console.log(this.measures);
        },
        error: (error) => {
          console.error('Error fetching measures data', error);
        }
      }); 
    }
    // console.log(this.date.value);
  }

  

  // Met le sensor selectionné en actif
  currentMeasures : MeasureDTO[] = [];
  setActiveSensor(sensor: SensorDTO) {
    // Réinitialiser currentMeasures
    this.currentMeasures = [];
    
    // Désactiver tous les capteurs
    this.checkedSensors.forEach(s => s.isActive = false);
    
    // Activer le capteur sélectionné
    sensor.isActive = true;
    
    // Mettre à jour le capteur actuel
    this.currentSensor = sensor;

    this.trimMeasures(sensor)  
  }


  weeklyCarCount: WeeklyCarCount[] = [];
  trimMeasures(sensor: any) {
    if (sensor != null) {
        // Ajouter les mesures correspondantes au capteur actif
        this.currentMeasures = this.measures.filter(measure => measure.sensorId === sensor.sensorId);
        this.weeklyCarCount = this.aggregateNbCarByDay(this.currentMeasures);
         // Trier les résultats par heure
         this.weeklyCarCount.sort((a, b) => a.day.localeCompare(b.day));
         console.log(this.weeklyCarCount); // Afficher le résultat agrégé
    }
  }

  aggregateNbCarByDay(measures: MeasureDTO[]): WeeklyCarCount[] {
    // Dictionnaire pour stocker le nombre de voitures par heure
    const dayCounts: { [day: string]: number } = {};

    measures.forEach(measure => {
        // Extraire l'heure entière de la date de la mesure
        const date = new Date(measure.date);
        const day = date.getDay()

        // Ajouter le nombre de voitures à l'heure correspondante
        if (!dayCounts[day]) {
            dayCounts[day] = 0;
        }
        dayCounts[day] += measure.nbCar;
    });

    // Convertir le dictionnaire en tableau d'objets HourlyCarCount
    return Object.keys(dayCounts).map( day=> ({
        day: day,
        nbCar: dayCounts[day]
    }));
}

  // Formate la date
  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    };
    return new Intl.DateTimeFormat('fr-FR', options).format(date);
  }

  receiveFromChild(event: any[]){
    this.startDate = event[0];
    this.endDate = event[1];
  }
}
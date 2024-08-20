import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, HostListener } from '@angular/core';
import { SensorDTO } from '../../models/DTOs/SensorDTO';
import { SensorService } from '../../services/sensor.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Hoursformat } from '../../pipe/hoursformat.pipe';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MeasureDTO } from '../../models/DTOs/MeasureDTO';
import { MeasureService } from '../../services/measure.service';
import { HourlyCarCount } from '../../models/interfaces/HourlyCarCount';
import * as Highcharts from 'highcharts';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-courbejournaliere',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  templateUrl: './courbejournaliere.component.html',
  styleUrls: ['./courbejournaliere.component.scss'],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, Hoursformat, ReactiveFormsModule,CommonModule]
})

export class CourbejournaliereComponent implements OnInit, AfterViewInit {
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;

  isSideBareSensorButtonVisible: boolean = false;
  SideBareSensor: boolean = false;
  

  hours: number[] = Array.from({ length: 24 }, (_, i) => i);
  sensors: SensorDTO[] = [];
  measures: MeasureDTO[] = [];
  isMeasuresLoad: boolean = false;
  date = new FormControl();
  dateFormat: string = "";
  dropdownOpen = false;
  currentSensor: SensorDTO | null = null;
  checkedSensors: SensorDTO[] = [];
  currentMeasures: MeasureDTO[] = [];
  hourlyCarCount: HourlyCarCount[] = [];

  constructor(
    private sensorService: SensorService, 
    private measureService: MeasureService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) { 
    this.checkScreenWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    const width = window.innerWidth;
    if (width >= 768) { // Correspond à la taille de l'écran 'md' en Tailwind CSS
      this.SideBareSensor = true;
    } else {
      this.SideBareSensor = false;
    }
  }

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
  }

  ngAfterViewInit(): void {
    // Check if the chart should be initialized
    if (this.currentSensor?.sensorId && this.isMeasuresLoad) {
      this.deferInitializeChart();
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  CheckedSensor(event: any, sensor: SensorDTO) {
    if (event.target.checked) {
      if (this.checkedSensors.length === 0) {
        sensor.isActive = true;
        this.currentSensor = sensor;
      } else {
        sensor.isActive = false;
      }
      this.checkedSensors.push(sensor);
    } else {
      let index = this.checkedSensors.indexOf(sensor);
      if (index !== -1) {
        this.checkedSensors.splice(index, 1);
        if (!this.checkedSensors.some(s => s.isActive) && this.checkedSensors.length > 0) {
          this.checkedSensors[0].isActive = true;
          this.currentSensor = this.checkedSensors[0];
        } else if (this.checkedSensors.length === 0) {
          this.currentSensor = null;
        }
      }
    }
  }

  Visualise() {
    if (this.checkedSensors.length === 0 || this.date.value == null) {
      console.log('capteurs non coché ou date non sélectionné');
    } else {
      this.measureService.GetMeasuresByDate(this.date.value).subscribe({
        next: (data: MeasureDTO[]) => {
          this.measures = data;
          this.currentMeasures = [];
          this.trimMeasures(this.currentSensor);
          this.isMeasuresLoad = true;
          this.dateFormat = this.formatDate(this.date.value);
          this.dropdownOpen = false;
          this.isSideBareSensorButtonVisible = true;
          console.log(this.measures);
          // Detect changes and initialize the chart
          this.cdr.detectChanges();
          this.deferInitializeChart(); 
        },
        error: (error) => {
          console.error('Error fetching measures data', error);
        }
      });
    }
  }

  setActiveSensor(sensor: SensorDTO) {
    this.currentMeasures = [];
    this.checkedSensors.forEach(s => s.isActive = false);
    sensor.isActive = true;
    this.currentSensor = sensor;
    this.trimMeasures(sensor);
    this.initializeChart()
  }

  trimMeasures(sensor: any) {
    if (sensor != null) {
      this.currentMeasures = this.measures.filter(measure => measure.sensorId === sensor.sensorId);
      this.hourlyCarCount = this.aggregateNbCarByHour(this.currentMeasures);
      this.hourlyCarCount.sort((a, b) => a.hour.localeCompare(b.hour));
      console.log(this.hourlyCarCount);
    }
  }

  aggregateNbCarByHour(measures: MeasureDTO[]): HourlyCarCount[] {
    const hourlyCounts: { [hour: string]: number } = {};

    measures.forEach(measure => {
      const date = new Date(measure.date);
      const hour = date.getHours().toString().padStart(2, '0');

      if (!hourlyCounts[hour]) {
        hourlyCounts[hour] = 0;
      }
      hourlyCounts[hour] += measure.nbCar;
    });

    return Object.keys(hourlyCounts).map(hour => ({
      hour: hour,
      nbCar: hourlyCounts[hour]
    }));
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    return new Intl.DateTimeFormat('fr-FR', options).format(date);
  }

  deferInitializeChart() {
    setTimeout(() => {
      this.initializeChart();
    }, 0);
  }

  initializeChart() {
    if (this.currentSensor?.sensorId && this.isMeasuresLoad && this.chartContainer) {
      const chartOptions: Highcharts.Options = {
        chart: {
          renderTo: this.chartContainer.nativeElement,
          type: 'line'
        },
        title: {
          text: 'Débit du capteur ' + this.currentSensor.sensorName + ' pour le ' + this.dateFormat + ' sur 24H (Courbe)',
          align: 'left' as Highcharts.AlignValue
        },
         credits: {
        enabled: false
        },
        yAxis: {
          title: {
            text: 'Nombres de voitures'
          }
        },
        xAxis: {
          tickInterval: 1,  
          labels: {
            formatter: function(this: Highcharts.AxisLabelsFormatterContextObject): string {
              return this.value + ' h';
            }
          },
          title: {
            text: 'Heures par heures sur 24H'
          },
          type: 'linear',
          max: 23,
          endOnTick: false
        },
        legend: {
          layout: 'vertical',
          align: 'right' as Highcharts.AlignValue,
          verticalAlign: 'middle' as Highcharts.VerticalAlignValue
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: 0
          }
        },
        series: [{
          type: 'line', // Specify the type of series
          name: this.currentSensor.sensorName ?? "defaultName" ,
          data: this.hourlyCarCount.map(h => h.nbCar)
        }],
        responsive: {  
          rules: [{  
            condition: {  
              maxWidth: 500  
            },  
            chartOptions: {  
              legend: {  
                enabled: false  
              }  
            }  
          }]  
        }
      };

      Highcharts.chart(this.chartContainer.nativeElement, chartOptions);
    }
  }

  toggleSensorSidebar() {
    this.SideBareSensor = !this.SideBareSensor;
    this.dropdownOpen = false;
  }

}

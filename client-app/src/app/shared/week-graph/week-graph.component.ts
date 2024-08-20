import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import Drilldown from 'highcharts/modules/drilldown';
import { MeasureDTO } from '../../models/DTOs/MeasureDTO';
import { Subject } from 'rxjs';
import { PointOptionsType } from 'highcharts';
import { WeeklyCarCount } from '../../models/interfaces/WeeklyCarCount';

Drilldown(Highcharts);

@Component({
  selector: 'app-week-graph',
  templateUrl: './week-graph.component.html',
  styleUrls: ['./week-graph.component.scss'],
  standalone: true,
})
export class WeekGraphComponent implements OnInit {

  @Input()
  dataInput: Subject<WeeklyCarCount[]> = new Subject<WeeklyCarCount[]>();

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      align: 'left',
      text: 'Graphique de la semaine'
    },
    accessibility: {
      announceNewData: {
        enabled: true
      }
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: {
        text: 'Nombre de voitures'
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y}'
        }
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> au total<br/>'
    },
    series: [
      {
        type: 'column',
        name: 'Voitures par jour',
        colorByPoint: true,
        data: [
          { name: 'Lundi', y: 25 },
          { name: 'Mardi', y: 25 },
          { name: 'Mercredi', y: 25},
          { name: 'Jeudi', y: 25},
          { name: 'Vendredi', y: 2.33},
        ]
      }
    ],
  };

  chart: Highcharts.Chart | undefined;

  constructor() {
  }

  ngOnInit(): void {
    this.dataInput.subscribe((data: WeeklyCarCount[]) => { 
      if (this.chartOptions && this.chartOptions.series && this.chartOptions.series[0] ) {
        console.log("Re-render chart")
        //Calcule le nombre max de voitures
        let maxCar: number = Math.max(...data.map(measure => measure.nbCar))
        
        let chartData: any[]= []
        console.log(data)
        data.forEach( (measure) => {
          console.log(measure)
          chartData.push({ name: measure.day, y: measure.nbCar})
        })

        let series: Highcharts.SeriesOptionsType =  
        {
          type: 'column',
          name: 'Voitures par jour',
          colorByPoint: true,
          mapData: chartData
        }
        
        if(this.chart === undefined){
          console.log("INIT CHART")
          this.chartOptions.series[0] = series
          this.chart = Highcharts.chart('container', this.chartOptions);
        }
        else{
          console.log("UPDATE CHART")
          this.chart.series.at(0)?.setData(chartData)
        }
      }
    })
  }
}
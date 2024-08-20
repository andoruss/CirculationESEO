import { Component, Input, SimpleChanges, input } from '@angular/core';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-traficmoyenhistogramme',
  standalone: true,
  imports: [],
  templateUrl: './traficmoyenhistogramme.component.html',
  styleUrl: './traficmoyenhistogramme.component.scss'
})
export class TraficmoyenhistogrammeComponent{
  @Input() dataMeasureTMJM!: Array<number>;
  @Input() dataMeasureTMJO!: Array<number>;

  ngOnInit(): void {
    Highcharts.chart('container', this.chartOptions);
  }

  chart!: Highcharts.Chart;

  ngOnChanges(): void {
    console.log(this.dataMeasureTMJM)
    console.log(this.dataMeasureTMJO)
 
    this.chart = Highcharts.chart('container', this.chartOptions);
    this.updateSeriesData(0, this.dataMeasureTMJM);
    this.updateSeriesData(1, this.dataMeasureTMJO);
  }

  private updateSeriesData(seriesIndex: number, data: number[]): void {
    this.chart.series[seriesIndex].update({
      data: data
    } as Highcharts.SeriesColumnOptions, true);
  }

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    credits: {
      enabled: false
    },
    title: {
      text: `TMJM et TMJO`,
      align: 'left'
    },
    xAxis: {
      categories: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      crosshair: true,
      accessibility: {
        description: 'Countries'
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Nb voitures'
      },
      tickInterval: 100 
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [
      {
        name: 'TMJM',
        type: 'column',
        data: []
      },
      {
        name: 'TMJO',
        type: 'column',
        data: []
      }
    ]
  };
}

import { Component } from '@angular/core';

import {Chart, ChartModule} from 'angular-highcharts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [ ChartModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {


  pieChart = new Chart({
    chart: {
      type: 'pie'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Line 1',
        data: [1, 1, 1]
      }as any
    ],
    title: {
      text: 'Linechart'
    }
  });

  add() {
    this.pieChart.addPoint(Math.floor(Math.random() * 10));
  }
}

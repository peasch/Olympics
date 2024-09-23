import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import { ChartModule } from 'primeng/chart';
import {OlympicService} from "../../core/services/olympic.service";

@Component({
  selector: 'app-details',
  standalone: true,
    imports: [
        RouterLink, ChartModule
    ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  data: any;

  options: any;
  constructor(private olympicService: OlympicService,
              private router:Router) {
  }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Number of entries',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.2
        },
        {
          label: 'Total number medals',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          tension: 0.2
        },{
          label: 'Total number of athlets',
          data: [10, 12, 50, 3, 125, 89, 37],
          fill: false,
          borderColor: '#956065',
          tension: 0.2
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }
  navigateToHome(){
    this.router.navigateByUrl('home');
  }
}

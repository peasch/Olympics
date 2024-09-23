import { Component, OnInit } from '@angular/core';
import {map, Observable, of, Subscription} from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import {Olympic} from "../../core/models/Olympic";
import {OrganizationChartModule} from "primeng/organizationchart";
import {tap} from "rxjs/operators";
import _default from "chart.js/dist/plugins/plugin.legend";
import labels = _default.defaults.labels;



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$!: Observable<Olympic[]>;
  olympics!:Olympic[];
  olympic! : Olympic;
  names!: String[];
  data: any;
  options:any;
  subscription!: Subscription;
  countryCount!:Number;
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.setData();

  }

  setData(): void{
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.olympics$.pipe().subscribe((olympics:Olympic[]) => {
      olympics.map((olympic: Olympic) => {

          this.data = {
            labels: olympic.country,
            datasets: [
              {
                data: olympic.participations.id,
                backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500'),'#793d52', documentStyle.getPropertyValue('--yellow-500'), ],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
              }
            ]
          }
        /*console.log(this.data.labels);
        console.log(this.data.datasets);*/
        }

      )

    });


    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };

  }
  getOlympics():Observable<Olympic[]>{
    return this.olympics$.pipe(
      map((data:Olympic[]) => data as Olympic[])
    )
  };


}

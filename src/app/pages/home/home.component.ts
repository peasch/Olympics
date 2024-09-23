import {Component, OnInit} from '@angular/core';
import {map, Observable, of, Subscription, take} from 'rxjs';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {Olympic} from "../../core/models/Olympic";
import {OrganizationChartModule} from "primeng/organizationchart";
import {tap} from "rxjs/operators";
import _default from "chart.js/dist/plugins/plugin.legend";
import labels = _default.defaults.labels;
import {Router} from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$!: Observable<Olympic[]>;
  olympics!: Olympic[];
  olympic!: Olympic;
  data: any;
  options: any;

  constructor(private olympicService: OlympicService,
              private router:Router) {
  }
/* couleurs des pays
italy :#956065
germany:#793D52
spain:#B8CBE7
United Kingdom:#BFE0F1
United States:#89A1DB
France:#9780A1
 */
  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympicService.getOlympics().subscribe( res =>{
        this.olympics=res;
        console.log(this.olympics);
    }
    );

    this.setData();


  }

  setData(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {

      labels: ['Italy', 'Spain', 'United States','Germany', 'France'],
      datasets: [
        {
          data: [540, 325, 702, 125, 456],
          backgroundColor: ['#956065','#B8CBE7', '#89A1DB','#793d52','#9780A1'],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    }
    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.5,
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

  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.pipe(
      map((data: Olympic[]) => data as Olympic[])
    )
  };

  navigateToCountry(){
    this.router.navigateByUrl('detail');
  }
}

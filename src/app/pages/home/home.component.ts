import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {Olympic} from "../../core/models/Olympic";
import {Router} from "@angular/router";
import {Participation} from "../../core/models/Participation";


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
  uniqueYears!: number[];


  constructor(private olympicService: OlympicService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.setData();

  }

  setData(): void {
    // Couleurs des pays dans le Pie Chart
    const ITALY = '#956065';
    const GERMANY = '#793D52';
    const SPAIN = '#B8CBE7';
    const USA = '#89A1DB';
    const FRANCE = '#9780A1';
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.olympicService.getOlympics().subscribe((response: Olympic[]) => {
      this.olympics = response;
      const labels = response?.map(olympic => olympic.country);
      const datas = response?.map((olympic: Olympic) =>
        olympic.participations.reduce((acc: number, participation: Participation) => acc + participation.medalsCount, 0));

      this.uniqueYears = Array.from(new Set(
        response?.map((olympic: Olympic) =>
          olympic.participations.map((i: Participation) => i.year) ?? []).flat()));

      this.data = {
        labels: labels,
        datasets: [
          {
            data: datas,
            backgroundColor: [ITALY, SPAIN, USA, GERMANY, FRANCE],
            hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
          }
        ]
      }

    });

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

  onChartClick(e: any) {
    const elementIndex = e.element.index;
    const countryId = this.olympics[elementIndex].id;
    if (countryId) {
      this.router.navigateByUrl(`detail/${countryId}`);
    }

  }
}

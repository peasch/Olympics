import {Component, OnInit} from '@angular/core';
import {map, Observable} from 'rxjs';
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
  countryIds:number[]=[];



  constructor(private olympicService: OlympicService,
              private router: Router) {
  }

  /* couleurs des pays

   */
  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.setData();

  }

  setData(): void {
    const ITALY = '#956065';
    const GERMANY = '#793D52';
    const SPAIN = '#B8CBE7';
    const USA = '#89A1DB';
    const FRANCE = '#9780A1';
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.olympicService.getOlympics().subscribe((response: Olympic[]) => {

      const labels = response?.map(olympic => olympic.country);
      const datas = response?.map((olympic:Olympic) =>
        olympic.participations.reduce((acc: number, participation: Participation) => acc + participation.medalsCount, 0));

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

  navigateToCountry() {
    this.router.navigateByUrl('detail');
  }

  // Fonction appelée lorsque l'utilisateur clique sur un segment du PieChart
  onChartClick(event: any) {
    const elementIndex = event.element._index; // Récupérer l'index du segment cliqué
    const countryId = this.countryIds[elementIndex];
    // Récupérer l'ID du pays correspondant
    if (countryId) {
      this.router.navigateByUrl(`detail/${countryId}`);
      console.log(`detail/${countryId}`)// Naviguer vers la page de détail
    }

  }
}

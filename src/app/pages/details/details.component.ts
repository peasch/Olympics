import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ChartModule} from 'primeng/chart';
import {OlympicService} from "../../core/services/olympic.service";
import {Olympic} from "../../core/models/Olympic";
import {Observable} from "rxjs";
import {Participation} from "../../core/models/Participation";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    RouterLink, ChartModule, AsyncPipe
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  public olympics$!: Observable<Olympic[]>;
  data: any;
  olympics!: Olympic[];
  olympic!: Olympic;
  options: any;
  countryName: string = '';
  numberOfEntries!: number;
  totalMedals!: number;
  totalAthlets!: number;


  constructor(private olympicService: OlympicService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.olympics$ = this.olympicService.getOlympics();
    const countryId = this.route.snapshot.params['id'];
    this.getCountryById(countryId);

  }

  getCountryById(id: number): void {

    this.olympicService.getOlympics().subscribe((response: Olympic[]) => {
      this.olympics = response;

      this.olympics.forEach(olympic => {
        if (olympic.id == id) {
          this.olympic = olympic;
          this.numberOfEntries = olympic.participations.length;
          this.totalMedals = olympic.participations.reduce((acc: number, participation: Participation) => acc + participation.medalsCount, 0);
          this.totalAthlets = olympic.participations.reduce((acc: number, participation: Participation) => acc + participation.athleteCount, 0);
          this.countryName = this.olympic.country;
        }
      })
      if (this.olympic) {
        this.setData();
      } else {
        console.error("Olympic non trouvé pour l'id", id);
      }
    });

  }

  setData(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const years = this.olympic.participations.map((i: Participation) => i.year) ?? [];
    const yearAthlets = this.olympic.participations.map((i: Participation) => i.athleteCount ??0);


    this.data = {
      labels: years,
      datasets: [
        {
          label: 'Athlets per Entry',
          data: yearAthlets,
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.2
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 1.2,
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

  navigateToHome() {
    this.router.navigateByUrl('home');
  }


}

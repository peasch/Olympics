import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private olympicService: OlympicService,
              private primengConfig :PrimeNGConfig) {}

  ngOnInit(): void {
    // on ne demande qu'une valeur à l'observable
    this.olympicService.loadInitialData().pipe(take(1)).subscribe();
    this.primengConfig.ripple = true;
  }
}



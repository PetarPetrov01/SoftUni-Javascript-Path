import { Component, OnInit } from '@angular/core';
import { PlanetsService } from './planets.service';
import { Planet } from '../types/planet';
import { NgFor, NgIf } from '@angular/common';
import { LoaderComponent } from '../shared/loader/loader.component';

@Component({
  selector: 'app-planets',
  standalone: true,
  imports: [NgFor, NgIf, LoaderComponent],
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.css',
})
export class PlanetsComponent implements OnInit {
  planets: Planet[] = [];
  isLoading: boolean = false;

  constructor(private planetsService: PlanetsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.planetsService.getPlanets().subscribe({
      next: (result) => {
        this.planets = result.results.slice(0, 10);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
}

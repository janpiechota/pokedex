import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from "../types/pokemon";

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {

  @Input() pokemon: Pokemon | null = null;

  get hp() {
    return this.pokemon?.stats.find((stat) => {
      return stat.name === 'hp'
    }).value ?? 0
  }

  constructor() { }

  ngOnInit(): void {
  }

}

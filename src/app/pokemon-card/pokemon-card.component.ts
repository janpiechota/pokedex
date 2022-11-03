import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from "../types/pokemon";

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {

  @Input() pokemon: Pokemon | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}

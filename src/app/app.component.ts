import { Component } from '@angular/core';
import {Pokemon} from "./types/pokemon";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  pokemonCard: Pokemon | null = null;

  get isPokemonCardVisible() {
    return this.pokemonCard !== null;
  }

  pokemonCardChangeHandler(pokemon: Pokemon) {
    this.pokemonCard = pokemon;
  }

}

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { PokemonSearchService } from '../pokemon-search.service';
import {Pokemon} from "../types/pokemon";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  @Output() changed = new EventEmitter<Pokemon>();
  pokemon: Pokemon | null = null;

  constructor(private pokemonSearchService: PokemonSearchService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSearch(name: string) {
    this.pokemonSearchService.getPokemon(name).subscribe((res: any) => {
      this.pokemon = {
        name: res.name,
        image: res.sprites.other.dream_world.front_default,
        type: res.types[0].type.name,
        stats: {
          hp: res.stats[0].base_stat,
          attack: res.stats[1].base_stat,
          defense: res.stats[2].base_stat,
          specialAttack: res.stats[3].base_stat,
          specialDefense: res.stats[4].base_stat,
          speed: res.stats[5].base_stat,
        }
      }
      this.changed.emit(this.pokemon);
    }, (error) => this.snackBar.open('Pokemon was not found', 'Cancel', {
      panelClass: ['snackbar']
    }))
  }

}

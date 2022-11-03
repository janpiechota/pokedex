import { Component, OnInit } from '@angular/core';
import { PokemonSearchService } from '../pokemon-search.service';

type Pokemon = {
  name: string,
  image: string,
  type: string,
  stats: {
    hp: number,
    attack: number,
    defense: number,
    specialAttack: number,
    specialDefense: number,
    speed: number
  }
}

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  pokemon!: Pokemon;
  show: boolean = false;

  constructor(private pokemonSearchService: PokemonSearchService) { }

  ngOnInit(): void {
  }

  onSearch(name: string) {
    this.show = true;
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
    })
  }

}

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { PokemonSearchService } from '../pokemon-search.service';
import {Pokemon} from "../types/pokemon";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-pokemon-input',
  templateUrl: './pokemon-input.component.html',
  styleUrls: ['./pokemon-input.component.css']
})
export class PokemonInputComponent implements OnInit {

  @Output() changed = new EventEmitter<Pokemon>();
  pokemon: Pokemon | null = null;
  pokemonList: any[] = [];
  pokemonName = new FormControl('');
  filteredOptions!: Observable<any[]>;

  constructor(private pokemonSearchService: PokemonSearchService, private snackBar: MatSnackBar) {
    pokemonSearchService.getPokemonList().subscribe((res) => {
      this.pokemonList = res;
    });
  }

  ngOnInit(): void {
    this.filteredOptions = this.pokemonName.valueChanges.pipe(startWith(''), map(value => this.filter(value || '')))
  }

  filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(filterValue));
  }

  onSearch(name: string) {
    this.pokemonSearchService.getPokemon(name).subscribe((res: any) => {
      this.pokemon = {
        name: res.name,
        image: res.sprites.other.dream_world.front_default,
        altImage: res.sprites.front_default,
        types: res.types.map(({type}: any) => type.name),
        stats: res.stats.map(({base_stat, stat: { name} }: any)=> ({
            name,
            value: base_stat
          }))
      }
      this.changed.emit(this.pokemon);
    }, (error) => this.snackBar.open('Pokemon was not found', 'Cancel', {
      duration: 3000,
      panelClass: ['snackbar']
    }));

  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, of, tap} from "rxjs";

const POKEMON_LIST_CACHE_KEY = 'pokemon-list'

@Injectable({
  providedIn: 'root'
})
export class PokemonSearchService {

  constructor(private http: HttpClient) { }

  getPokemon(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

  getPokemonList() {
    const pokemonList = localStorage.getItem(POKEMON_LIST_CACHE_KEY);
    if(pokemonList) {
      return of(JSON.parse(pokemonList));
    }
    return this.http.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0').pipe(
      tap((results: any)=> {
        localStorage.setItem(POKEMON_LIST_CACHE_KEY, JSON.stringify(results.results));
      }),
      map((results) => results.results)
    )
  }

}

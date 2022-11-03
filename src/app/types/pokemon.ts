export type Pokemon = {
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

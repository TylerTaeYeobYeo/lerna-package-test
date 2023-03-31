import Subject from '@tyeo/subject'

export interface Pokemon {
  name: string
  skill: [string, string, string, string]
}

export const pokemonSubject = new Subject<Pokemon>()

export default pokemonSubject

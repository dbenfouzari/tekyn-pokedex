import {EndPointResult, PokeAPI} from "./types";
import axios from "axios";

const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
})

/**
 * Search a Pokémon from its ID or name
 * @param {string | number} idOrName
 */
export const getPokemon = async (idOrName: string | number) => {
  const { data } = await pokeApi.get<PokeAPI.Pokemon>(`/pokemon/${idOrName}`);
  return data
}
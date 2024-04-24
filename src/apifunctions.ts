import axios from "axios";
import { PokemonDataTwo } from "./types";
import { Movetypes } from "./types/moveTypes";
const baseUrl = "https://pokeapi.co/api/v2/";

// async function fetchRandomPokemon() {
//   try {
//     const response = await axios.get<types.PokemonDataTwo>(
//       `${baseUrl}pokemon/${Math.floor(Math.random() * 1302)}`
//     );
//     console.log(response.data);
//     return response.data;
//   } catch (e) {
//     console.error(e);
//   }
// }
async function searchPokemonName(name: string) {
  try {
    const response = await axios.get<PokemonDataTwo>(
      `${baseUrl}pokemon/${name}`
    );
    //console.log(response.data);
    return response.data;
  } catch (e) {
    console.error(e + "Did you enter an existing pokemon?");
  }
}
async function searchPokemonId(id: string) {
  try {
    const response = await axios.get<PokemonDataTwo>(`${baseUrl}pokemon/${id}`);
    //console.log(response.data);
    return response.data;
  } catch (e) {
    console.error(e + "Did you enter an existing pokemon?");
  }
}
async function searchMove(id: string) {
  try {
    const response = await axios.get<Movetypes>(`${baseUrl}/move/${id}`);
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
// async function pokemonAbilityDescription(abilityUrls: types.Ability[]) {
//   let abilityArray: string[] = [];
//   for (let i = 0; i < abilityUrls.length; i++) {
//     try {
//       const response = await axios.get<types.PokemonAbility>(
//         abilityUrls[i].ability.url
//       );
//       abilityArray.push(response.data.effect_entries[1].effect);
//     } catch (e) {
//       console.error(e + "knas");
//     }
//   }
//   return abilityArray;
// }

export { searchPokemonName, searchPokemonId, searchMove };

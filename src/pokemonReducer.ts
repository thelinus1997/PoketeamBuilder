import { configureStore } from "@reduxjs/toolkit";
import { Reducer } from "redux";
import { PokemonDataTwo } from "./types";

const initialState = {
  pokemons: [],
};
type AddPokemonAction = {
  type: "ADD_POKEMON";
  payload: PokemonDataTwo;
};
type RemovePokemonAction = {
  type: "REMOVE_POKEMON";
  payload: PokemonDataTwo;
};

type State = {
  pokemons: PokemonDataTwo[];
};
export type UnionAction = AddPokemonAction | RemovePokemonAction;

export const pokemonReducer: Reducer<State, UnionAction> = (
  state: State = initialState,
  action: UnionAction
) => {
  switch (action.type) {
    case "ADD_POKEMON":
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
      };
    case "REMOVE_POKEMON":
      return {
        ...state,
        pokemons: state.pokemons.filter((string) => string !== action.payload),
      };

    default:
      return state;
  }
};

// export const store = configureStore({
//   reducer: pokemonReducer,
// });

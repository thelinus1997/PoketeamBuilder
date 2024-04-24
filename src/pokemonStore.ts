import { configureStore } from "@reduxjs/toolkit";
import { pokemonReducer } from "./pokemonReducer";

export const store = configureStore({
  reducer: pokemonReducer,
});

import React, { useState, useEffect, ChangeEvent } from "react";
import { store } from "../../pokemonStore";
import { Move, PokemonDataTwo } from "../../types";
import "./teamContainer.scss";
import PokemonCard from "../pokemonCard/PokemonCard";
import { current } from "@reduxjs/toolkit";

const TeamContainer = () => {
  const [currentTeam, setCurrentTeam] = useState<PokemonDataTwo[]>([]);
  const [move, setMove] = useState<Move[][]>([]);
  const [chosenMove, setChosenMove] = useState([{ id: 0, moves: [""] }]);

  // Subscribe to store updates
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const updatedTeam = store.getState().pokemons; // Assuming 'pokemons' is the key in your state
      setCurrentTeam(updatedTeam);

      const moveList = (store.getState().pokemons as PokemonDataTwo[]).map(
        (pokemon) => pokemon.moves
      );

      setMove(moveList);
    });

    // Unsubscribe when component unmounts to prevent memory leaks
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    setCurrentTeam(store.getState().pokemons);
  }, [chosenMove]);
  return (
    <>
      <div className="teamContainer">
        {currentTeam.map((pokemon, index) => (
          <PokemonCard data={pokemon} key={index} />
        ))}
      </div>
    </>
  );
};

export default TeamContainer;

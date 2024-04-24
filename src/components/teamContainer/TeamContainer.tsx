import React, { useState, useEffect } from "react";
import { store } from "../../pokemonReducer";
import { Move, PokemonDataTwo } from "../../types";

const TeamContainer = () => {
  const [currentTeam, setCurrentTeam] = useState<PokemonDataTwo[]>([]);
  const [selectedMove, setSelectedMove] = useState<Move>();
  const [move, setMove] = useState<Move[][]>([]);
  // Subscribe to store updates
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const updatedTeam = store.getState().pokemons; // Assuming 'pokemons' is the key in your state
      setCurrentTeam(updatedTeam);

      console.log(updatedTeam);
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
    console.log(move); // Log the current moves whenever 'move' state changes
  }, [move]); // Run effect only once on component mount
  // const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedMoveName = event.target.value;
  //   const chosenMove = move.find((move) => move.move.name === selectedMoveName);
  //   setSelectedMove(chosenMove);
  // };
  return (
    <>
      <div>Teamcontainer</div>
      <ul>
        {currentTeam.map((pokemon, index) => (
          <li key={index}>
            {pokemon.name}{" "}
            <select name="moveSelect" id={`${index}`}>
              {move[index].map((move, index) => (
                <option key={index}>{move.move.name}</option>
              ))}
            </select>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TeamContainer;

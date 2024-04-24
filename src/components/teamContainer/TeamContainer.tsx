import React, { useState, useEffect, ChangeEvent } from "react";
import { store } from "../../pokemonStore";
import { Move, PokemonDataTwo } from "../../types";
import "./teamContainer.scss";
import PokemonCard from "../pokemonCard/PokemonCard";

const TeamContainer = () => {
  const [currentTeam, setCurrentTeam] = useState<PokemonDataTwo[]>([]);
  const [move, setMove] = useState<Move[][]>([]);
  const [chosenMove, setChosenMove] = useState([{ id: 0, moves: [""] }]);

  // Subscribe to store updates
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const updatedTeam = store.getState().pokemons; // Assuming 'pokemons' is the key in your state
      setCurrentTeam(updatedTeam);
      if (chosenMove.length === 0) {
        console.log("its 0 long");
      } else {
        console.log(chosenMove.length);
      }

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
  const handleChange = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
    // Copy the current chosenMove array
    const updatedChosenMove = [...chosenMove];

    // Find the index of the chosenMove object for the current Pokemon
    const chosenMoveIndex = updatedChosenMove.findIndex(
      (item) => item.id === index
    );

    // If the object for the current Pokemon exists in chosenMove, update its moves array
    if (chosenMoveIndex !== -1) {
      updatedChosenMove[chosenMoveIndex] = {
        ...updatedChosenMove[chosenMoveIndex],
        moves: [...updatedChosenMove[chosenMoveIndex].moves, e.target.value],
      };
    } else {
      // If the object for the current Pokemon doesn't exist, create a new one
      updatedChosenMove.push({ id: index, moves: [e.target.value] });
    }

    // Update the chosenMove state with the modified array
    setChosenMove(updatedChosenMove);
  };
  useEffect(() => {
    console.log(chosenMove);
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
// {currentTeam.map((pokemon, index) => (
//   <li key={index} id={`${index}`}>
//     <img src={pokemon.sprites.front_default}></img>
//     {pokemon.name}{" "}
//     <select
//       name="moveSelect"
//       id={`${index}`}
//       onChange={(e) => handleChange(e, index)}
//     >
//       {move[index].map((move, index) => (
//         <option key={index}>{move.move.name}</option>
//       ))}
//     </select>
//     <button
//       onClick={() =>
//         dispatch({ type: "REMOVE_POKEMON", payload: pokemon })
//       }
//     >
//       Remove pokemon
//     </button>
//     {chosenMove.map((item) => {
//       if (item.id === index) {
//         console.log(item);
//         return <p>{item.moves}</p>;
//       }
//     })}
//   </li>
// ))}

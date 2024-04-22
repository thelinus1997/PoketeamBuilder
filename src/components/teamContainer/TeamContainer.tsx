import React, { useState, useEffect } from "react";
import { store } from "../../pokemonReducer";

const TeamContainer = () => {
  const [currentTeam, setCurrentTeam] = useState<string[]>([]);

  // Subscribe to store updates
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const updatedTeam = store.getState().pokemons; // Assuming 'pokemons' is the key in your state
      setCurrentTeam(updatedTeam);
    });

    // Unsubscribe when component unmounts to prevent memory leaks
    return () => {
      unsubscribe();
    };
  }, []); // Run effect only once on component mount

  return (
    <>
      <div>Teamcontainer</div>
      <ul>
        {currentTeam.map((pokemon, index) => (
          <li key={index}>{pokemon}</li>
        ))}
      </ul>
    </>
  );
};

export default TeamContainer;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchPokemonId } from "../../apifunctions";
import { PokemonDataTwo } from "../../types";
import "./pokemonInDepth.scss";
const PokemonInDepth = () => {
  const [pokemonData, setPokemonData] = useState<PokemonDataTwo>();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      try {
        const fetchData = async () => {
          const response = await searchPokemonId(id);
          if (response) {
            setPokemonData(response);
          }
        };
        fetchData();
      } catch (e) {
        console.error(e);
      }
    }
  }, []);
  useEffect(() => {
    if (id) {
      try {
        const fetchMoves = async () => {};
      } catch (e) {
        console.error(e);
      }
    }
  });

  return (
    <div className="pokemonData">
      {pokemonData && (
        <div className="pointlessContainer">
          <div className="nameContainer">
            {pokemonData.name}
            <img src={pokemonData.sprites.front_default} alt="" />
          </div>
          <div className="infoContainer">
            <div className="statContainer">
              {pokemonData.stats.map((stat, index) => (
                <p key={index}>
                  {stat.base_stat} {stat.stat.name}
                </p>
              ))}
            </div>
            <div className="abilityContainer">
              {pokemonData.abilities.map((ability, index) => (
                <p key={index}>{ability.ability.name}</p>
              ))}
            </div>
            <div className="movesListContainer">
              {pokemonData.moves.map((move, index) => (
                <p key={index}>{move.move.name}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PokemonInDepth;

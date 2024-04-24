import React, { useEffect, useState } from "react";
import { PokemonDataTwo } from "../../types";
import { useDispatch } from "react-redux";
import "./pokemonCard.scss";
import bug from "../../assets/bug.svg";
import dark from "../../assets/dark.svg";
import dragon from "../../assets/dragon.svg";
import electric from "../../assets/electric.svg";
import fairy from "../../assets/fairy.svg";
import fighting from "../../assets/fighting.svg";
import fire from "../../assets/fire.svg";
import flying from "../../assets/flying.svg";
import ghost from "../../assets/ghost.svg";
import grass from "../../assets/grass.svg";
import ground from "../../assets/ground.svg";
import ice from "../../assets/ice.svg";
import normal from "../../assets/normal.svg";
import poison from "../../assets/poison.svg";
import psychic from "../../assets/psychic.svg";
import rock from "../../assets/rock.svg";
import steel from "../../assets/steel.svg";
import water from "../../assets/water.svg";

interface PokeProp {
  data: PokemonDataTwo;
}

const PokemonCard: React.FC<PokeProp> = ({ data }) => {
  const [numberOfMoves, setNumberOfMoves] = useState(1);
  const [moves, setMoves] = useState<string[]>([]);
  const dispatch = useDispatch();
  console.log(data);
  const pokemonTypes: string[] = data.types.map(
    (type, index) => type.type.name
  );
  // const typeImageArray = [
  //   bug,
  //   dark,
  //   dragon,
  //   electric,
  //   fairy,
  //   fighting,
  //   fire,
  //   flying,
  //   ghost,
  //   grass,
  //   ground,
  //   ice,
  //   normal,
  //   poison,
  //   psychic,
  //   rock,
  //   steel,
  //   water,
  // ];
  const svgImages: { [key: string]: any } = {
    bug: bug,
    dark: dark,
    dragon: dragon,
    electric: electric,
    fairy: fairy,
    fighting: fighting,
    fire: fire,
    flying: flying,
    ghost: ghost,
    grass: grass,
    ground: ground,
    ice: ice,
    normal: normal,
    poison: poison,
    psychic: psychic,
    rock: rock,
    steel: steel,
    water: water,
  };

  const pokemonSVGs = pokemonTypes.map((type) => svgImages[type]);
  console.log(pokemonSVGs);
  const handleMoveChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (numberOfMoves < 5) {
      const moveName = e.target.value;
      if (moves[0] === "") {
        setMoves([moveName]);
      } else {
        console.log(moveName);
        setMoves([...moves, moveName]);
        setNumberOfMoves(numberOfMoves + 1);
      }
    }
    // Handle move selection here if needed
  };
  const handleRemoveMove = (moveName: string) => {
    const updatedMoves = moves.filter((move) => move !== moveName);
    setMoves(updatedMoves);
    setNumberOfMoves(numberOfMoves - 1);
  };
  useEffect(() => {
    console.log(moves);
  }, [moves]);
  return (
    <>
      <div className="pokemonCardContainer">
        <span>
          <img src={data.sprites.front_default} alt="" /> <h2>{data.name}</h2>
        </span>
        <div>
          <p>
            Types:
            {pokemonSVGs.map((svg) => (
              <img src={svg}></img>
            ))}
            {/* {typeImageArray.map((type, index) => {
                if (type === pokemonTypes[index].name) {
                  return <img src={type}></img>;
                }
              })} */}
          </p>
        </div>
        <div className="moveContainer">
          <h3>Choose moves:</h3>
          {numberOfMoves < 5 && (
            <div>
              <span>Move slot #{numberOfMoves}:</span>
              <select name="" id="" onChange={(e) => handleMoveChange(e)}>
                {data.moves.map((item, moveIndex) => (
                  <option key={moveIndex}>{item.move.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div>
          Moves:
          {moves.map((moveName, index) => (
            <p key={index}>
              {moveName}{" "}
              <button onClick={() => handleRemoveMove(moveName)}>x</button>
            </p>
          ))}
        </div>
        <button
          onClick={() => dispatch({ type: "REMOVE_POKEMON", payload: data })}
        >
          Remove pokemon
        </button>
      </div>
    </>
  );
};

export default PokemonCard;

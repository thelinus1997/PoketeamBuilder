import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchPokemonName } from "../../apifunctions";
import useDebounce from "../../hooks/useDebounce";
import { PokemonDataTwo } from "../../types";
import { store } from "../../pokemonStore";
import "./searchBar.scss";
const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchterm: string = useDebounce(searchTerm, 500);
  const dispatch = useDispatch();
  useEffect(() => {
    if (debouncedSearchterm) {
      console.log("search term found");
      try {
        const fetchData = async () => {
          const response = (await searchPokemonName(
            debouncedSearchterm
          )) as PokemonDataTwo;
          if (response) {
            const currentTeam = store.getState().pokemons;
            if (currentTeam.length < 6) {
              dispatch({ type: "ADD_POKEMON", payload: response });
            } else {
              alert("Only 6 pokemon allowed in a team!");
            }
          }
        };
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  }, [debouncedSearchterm]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("change");
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <h2 id="searchTitle">Add a pokemon to your team</h2>
      <input
        type="text"
        name="search"
        id="searchBar"
        value={searchTerm}
        onChange={handleChange}
      />
    </>
  );
};

export default SearchBar;

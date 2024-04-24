import "./App.scss";
import TeamContainer from "./components/teamContainer/TeamContainer";
import SearchBar from "./components/searchBar/SearchBar";
import bannerImg from "./assets/banner.png";
import { store } from "./pokemonStore";
import { useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import PokemonInDepth from "./components/pokemonInDepth/PokemonInDepth";
import HomePage from "./components/homePage/HomePage";
function App() {
  const [teamSize, setTeamSize] = useState(0);
  console.log(store.getState().pokemons);
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const updatedTeam = store.getState().pokemons;
      setTeamSize(updatedTeam.length);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <>
      <div className="imageContainer">
        <Link to="/">
          <img src={bannerImg} alt="" />
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/indepth/:id" element={<PokemonInDepth />} />
      </Routes>
    </>
  );
}

export default App;

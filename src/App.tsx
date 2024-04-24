import "./App.scss";
import TeamContainer from "./components/teamContainer/TeamContainer";
import * as API from "./apifunctions";
import SearchBar from "./components/searchBar/SearchBar";
import bannerImg from "./assets/banner.png";
import { store } from "./pokemonStore";
import { useEffect, useState } from "react";
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
      {teamSize === 0 && (
        <div className="imageContainer">
          <img src={bannerImg} alt="" />
        </div>
      )}
      {teamSize < 6 && <SearchBar />}
      <TeamContainer />
    </>
  );
}

export default App;

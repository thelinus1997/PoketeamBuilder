import "./App.scss";
import TeamContainer from "./components/teamContainer/TeamContainer";
import * as API from "./apifunctions";
import SearchBar from "./components/searchBar/SearchBar";
import bannerImg from "./assets/banner.png";
function App() {
  return (
    <>
      <div className="imageContainer">
        <img src={bannerImg} alt="" />
      </div>
      <SearchBar />
      <TeamContainer />
    </>
  );
}

export default App;

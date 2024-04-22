import "./App.scss";
import TeamContainer from "./components/teamContainer/TeamContainer";
import * as API from "./apifunctions";
import SearchBar from "./components/searchBar/SearchBar";
function App() {
  return (
    <>
      <h1>pokemon team builder</h1>
      <SearchBar />
      <TeamContainer />
    </>
  );
}

export default App;

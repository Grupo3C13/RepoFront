import { Categories } from "../components/Categories";
import { Recommends } from "../components/Recommends";
import { SearchBar } from "../components/SearchBar";
import "../routes/Home.modules.css";
import { useState } from 'react';
import SearchResultComponent from "../components/SearchResultComponent";

export function Home() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="home">
      
      <SearchBar setSearchResults={setSearchResults}/>
      <Categories />
      {searchResults.length > 0 && (
        <SearchResultComponent results={searchResults} />
      )}
      <Recommends/>
    </div>
  );
}

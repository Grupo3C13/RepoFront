import { Categories } from "../../components/Categories/Categories";
import { Recommends } from "../../components/Recommends/Recommends";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import "../Home/Home.modules.css";
import { useState } from 'react';
import SearchResultComponent from "../../components/SearchBar/SearchResultComponent";

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

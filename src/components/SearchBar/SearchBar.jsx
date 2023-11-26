import "../../components/SearchBar/SearchBar.modules.css";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Autosuggest from "react-autosuggest";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import SearchResultComponent from "./SearchResultComponent";

// Datos de ejemplo para las sugerencias de autocompletar
const suggestions = [
  "guitarra",
  "saxofon",
  "ukelele",
  "bateria",
  "funda para guitarra",
  "funda para teclado",
  "flauta",
];

export function SearchBar() {
  // Estados para manejar las fechas, la entrada de búsqueda y las sugerencias
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8090?q=${searchTerm}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    }
  };

  // Manejador de cambio de fecha
  const handleDateChange = (date, isStartDate) => {
    if (isStartDate) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  // Manejador de cambios en la entrada de búsqueda
  const handleSearchChange = (_, { newValue }) => {
    setSearchTerm(newValue);
  };

  // Función para renderizar las sugerencias de autocompletar
  const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

  // Función para obtener sugerencias basadas en la entrada de búsqueda
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : suggestions.filter(
          (suggestion) =>
            suggestion.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  // Manejador para actualizar las sugerencias al cambiar la entrada de búsqueda
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestionsList(getSuggestions(value));
  };

  // Manejador para limpiar las sugerencias al borrar la entrada de búsqueda
  const onSuggestionsClearRequested = () => {
    setSuggestionsList([]);
  };

  // Configuración del autocompletar
  const autosuggestProps = {
    suggestions: suggestionsList,
    onSuggestionsFetchRequested,
    onSuggestionsClearRequested,
    getSuggestionValue: (suggestion) => suggestion,
    renderSuggestion,
  };

  return (
    <div className="buscador">
      <h2>Busca el instrumento que necesitas</h2>
      {/* <form action="">
                <input type="search" />
                <input type="date" />
                <button>Buscar</button>
            </form> */}
            <div className="buscador-inputs">
      <Autosuggest
        inputProps={{
          placeholder: "Ingrese su búsqueda",
          value: searchTerm,
          onChange: handleSearchChange,
        }}
        {...autosuggestProps}
      />
      <DatePicker
        selected={startDate}
        onChange={(date) => handleDateChange(date, true)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Fecha de inicio"
      />

      <DatePicker
        selected={endDate}
        onChange={(date) => handleDateChange(date, false)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        placeholderText="Fecha de fin"
      />

      <button onClick={handleSearch}>Buscar</button>
      </div>
      {/* Mostrar resultados de la búsqueda */}
      {/* {searchResults.length > 0 && (
        <SearchResultComponent results={searchResults} />
      )} */}
    </div>
  );
}

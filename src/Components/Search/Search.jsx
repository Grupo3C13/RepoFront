import React, { useEffect, useState, useContext } from "react";
import "./Search.css";
import { GlobalContext } from "../../Context/globalContext";
import Pagination from "../Pagination/Pagination"
import Recommended from "../Recommended/Recommended";
import SearchBar from "../SearchBar/SearchBar";

const Search =() => {
  const {
    productsList,
    isLoading,
    categoriesList,
    fetchFiltroRent,
    rentInstrument,
    fetchData,
  } = useContext(GlobalContext);
  const [randomList, setRandomList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [listarentInstrument, setListarentInstrument] = useState([]);
  const [instrumentosDisponibles, setInstrumentosDisponibles] = useState([]);
  const [instrumentosReservados, setInstrumentosReservados] = useState([]);

  const selectInstrumentosAleatorios = (instrumentos, cantidad) => {
    const instrumentosSeleccionados = [];
    while (instrumentosSeleccionados.length < cantidad) {
      const randomIndex = Math.floor(Math.random() * instrumentos.length);
      if (!instrumentosSeleccionados.includes(instrumentos[randomIndex])) {
        instrumentosSeleccionados.push(instrumentos[randomIndex]);
      }
    }
    return instrumentosSeleccionados;
  };

  const handleCategoryChange = (category) => {
    if (selectedCategory.includes(category)) {
      setSelectedCategory(selectedCategory.filter((c) => c !== category));
    } else {
      setSelectedCategory([...selectedCategory, category]);
    }
  };

  useEffect(() => {
    const randomList = selectInstrumentosAleatorios(
      productsList,
      productsList.length
    );
    setRandomList(randomList);
  }, [productsList]);

  useEffect(() => {
    const filterList = randomList.filter((product) => {
      if (selectedCategory.length === 0 || selectedCategory === "") {
        return true;
      } else {
        return (
          product.categories &&
          product.categories.some((category) =>
            selectedCategory.includes(category.name)
          )
        );
      }
    });
    setFilteredProducts(filterList);
  }, [selectedCategory, randomList]);

  const renderCategoryOptions = () => {
    const categories = categoriesList;
    return categories.map((category, index) => (
      <div
        key={index}
        className={`category-square  ${selectedCategory.includes(category.name) ? "selected" : ""
          }`}
      >
        <img
          src={category.imagen}
          alt={category.name}
          onClick={() => handleCategoryChange(category.name)}
        />
        <label value={category.name}>{category.name}</label>
      </div>
    ));
  };
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [instrumentosFilter, setInstrumentosFilter] = useState("");

  const getData = (inicio, fin) => {
    setStartDate(inicio);
    setEndDate(fin);
    setInstrumentosReservados([]);
  };

  const getDataFilter = (instrumentosFilter) => {
    setInstrumentosFilter(instrumentosFilter)
  }

  useEffect(() => {
    setInstrumentosDisponibles(productsList);
  }, [productsList]);

  useEffect(() => {
    const data = rentInstrument;
    setListarentInstrument(data);
    console.log(listarentInstrument);
    if (!listarentInstrument.length == 0 && startDate!=="") {
      listarentInstrument.map((renta) => {
        const returnDate = new Date(renta.returnDate.split("T")[0]);
        const startDate = new Date(renta.startDate.split("T")[0]);
        const startDate2 = new Date(startDate);
        const endDate2 = new Date(endDate);
        startDate2.setDate(startDate2.getDate() + 1);
        endDate2.setDate(endDate2.getDate() + 1);
        if (
          new Date(startDate2) < startDate &&
          new Date(endDate2) < startDate
        ) {
        } else if (new Date(startDate2) > returnDate) {
        } else {
          console.log(renta.instrument.id);
          setInstrumentosReservados((prevLista) => [...prevLista, renta.instrument.id]);
        }
      });
    }
  }, [productsList, startDate, endDate]);

  return (
    <div>
      <SearchBar getData={getData} getDataFilter={getDataFilter} productsList={productsList}></SearchBar>
      <h2 className="category-title">Categorias</h2>
      <div className="search-container">
            <div className="category-title-button">
  
            </div>
            <div className="category-select">{renderCategoryOptions()}</div>
            <div>
              
        </div>
        <Recommended instrumentos={productsList}></Recommended>
        <Pagination
          totalinstrumentos={productsList.length}
          instrumentos={filteredProducts}
          isLoading={isLoading}
          startDate={startDate}
          endDate={endDate}
          instrumentosReservados={instrumentosReservados}
          instrumentosFilter={instrumentosFilter}
        ></Pagination>
      </div>
    </div>
  );
};
export default Search;

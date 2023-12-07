import { useEffect, useState } from "react";
import Calendar from "react-multi-date-picker";
import Suggestion from "./Suggestion";
import "./SearchBar.css";

function SearchBar({ getData, productsList, getDataFilter }) {
  const [values, setValues] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchBar, setSearchBar] = useState("");
  const [instrumentosFilter, setInstrumentosFilter] = useState([]);

  const [show, setShow] = useState(false)

  function handleSubmit(e) {
    e.preventDefault();
    if (values != null) {
      setStartDate(values.toString().split(",")[0]);
      setEndDate(values.toString().split(",")[1]);
    } else {
      setStartDate("");
      setEndDate("");
    }
  }

  useEffect(() => {
    getData(startDate, endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    getDataFilter(instrumentosFilter);
  }, [instrumentosFilter]);

  const getFilterData = (instrumentosFilter) => {
    setInstrumentosFilter(() => instrumentosFilter);
  };
  const updateSearchBar = (products)=>{
    setSearchBar(products);
    setShow(false)
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchBar(value);
  };
  const handlesearching=()=>{
    setShow(true)
  }

  return (
    <>
      <section className="buscador-section">
          <form onSubmit={(e) => handleSubmit(e)}>
            <h2 className="buscador-title">Busqueda</h2>
            <div className="searchContainer">
              <div className="searchTituloContainer">
                <label>Productos:</label>
                <input
                  className="inputsearch"
                  type="text"
                  name="search"
                  id="search"
                  autoComplete="on"
                  value={searchBar}
                  onChange={handleChange}
                  onMouseDown={handlesearching}
                />
                <ul className="options-list">
                    <Suggestion
                      productsList={productsList}
                      search={searchBar}
                      getFilterData={getFilterData}
                      updateSearchBar={updateSearchBar}
                      searching={show}
                    />
                </ul>
              </div>

              <div className="searchFechaContainer">
                <label>Selecciona la fecha de tu reserva</label>
                <div className="fecha-botonContainer">
                <Calendar
                  format="YYYY-MM-DD"
                  value={values}
                  onChange={setValues}
                  range
                  highlightToday={false}
                  numberOfMonths={2}
                />

                <button>Buscar</button>
                </div>
                
              </div>
            </div>
          </form>
      </section>
    </>
  );
}
export default SearchBar;

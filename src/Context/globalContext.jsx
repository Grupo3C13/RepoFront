import { useState, useEffect, createContext } from "react";

export const GlobalContext = createContext();

export const InstrumentProvider = ({ children }) => {

  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoriesList, setCategoriesList] = useState([]);
  const [reviewList, setReviewList] = useState([])
  const [charList, setCharList] = useState([]);
  const [rentInstrument, setRentInstrument] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token') || '');


const url = `http://localhost:8090/products/listeverything`;
const urlCategories = `http://localhost:8090/categories/listar`;
const urlCharacteristics = `http://localhost:8090/characteristics/listar`;
const urlFiltro= `http://localhost:8090/products/listar`
const urlProductId= `http://localhost:8090/products/`


  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista.");
      }
      const data = await response.json();
      setProductsList(data);
      setIsLoading(false);
      return data
    } catch (error) {
      console.error("Error al cargar la lista de instrumentos:", error);
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(urlCategories);
      if (!response.ok) {
        throw new Error("No se pudo obtener las categorias.");
      }
      const data = await response.json();
      setCategoriesList(data);
    } catch (error) {
      console.error("Error con la lista de instrumentos:", error);
    }
  };

  const fetchCharacteristics = async () => {
    try {
      const response = await fetch(urlCharacteristics);
      if (!response.ok) {
        throw new Error("No se pudo obtener.");
      }
      const data = await response.json();
      setCharList(data);
    } catch (error) {
      
      console.error("Error al cargar:", error);
    }
  };


  const fetchProductsById = async (id) => {
    try {
       const response = await fetch(`${urlProductId}${id}`);
      if (!response.ok) {
        throw new Error("No se pudo obtener el instrumento.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al cargar el instrumento:", error);
      return null;
    }
  };
  

  const fetchGetReview = async (productId) => {
    const url = `http://localhost:8090/review/product/${productId}`;
    console.log("fetch get Reviews")

    const settings = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(url, settings);
      const data = await response.json();
      setReviewList(data);
      return data
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  const updateProductsList = async () => {
    await fetchData();
  };

  const updateCategories = async () => {
    await fetchCategories();
  };



  const fetchFiltroRent= async()=>{
    const settings = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    };
    try {
      const response = await fetch(urlFiltro,settings);
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de reservas");
      }
      const data = await response.json();
      setRentInstrument(data);
      console.log(data)
      return data;
    } catch (error) {
      console.error("Error con la lista de resevas:", error);
    }
  }

  useEffect(() => {
    fetchData();
    fetchCategories();
    fetchCharacteristics();
    fetchFiltroRent()
  }, []);



  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('userData');

  };


  return (
    <GlobalContext.Provider value={{ categoriesList, productsList, isLoading, reviewList, updateProductsList,updateCategories, fetchProductsById, logout, fetchCharacteristics, charList, fetchFiltroRent, rentInstrument,fetchData, fetchGetReview }}>
      {children}
    </GlobalContext.Provider>
  );
};

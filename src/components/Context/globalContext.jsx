import { useState, useEffect, createContext } from "react";

export const GlobalContext = createContext();

export const ProductProvider = ({ children }) => {

  const [listaProducts, setListaProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [listaResenias, setListaResenias] = useState([])
  const [listaCaracteristicas, setListaCaracteristicas] = useState([]);
  const [rentProduct, setRentProduct] = useState([])
  const [token, setToken] = useState(sessionStorage.getItem('token') || '');

 const API_URL= import.meta.env.VITE_API_URL


const url = `${API_URL}product/listarexpress`;
const urlCategorias = `${API_URL}categoria/listar`;
const urlCaracteristicas = `${API_URL}caracteristica/listar`;
const urlFiltro= `${API_URL}productRent/listar`
const urlProductId= `${API_URL}product/`


  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de instrumentos.");
      }
      const data = await response.json();
      setListaProducts(data);
      setIsLoading(false);
      return data
    } catch (error) {
      console.error("Error al cargar la lista de instrumentos:", error);
      setIsLoading(false);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await fetch(urlCategorias);
      if (!response.ok) {
        throw new Error("No se pudieron obtener las categorias.");
      }
      const data = await response.json();
      setListaCategorias(data);
    } catch (error) {
      console.error("Error al cargar la lista de instrumentos:", error);
    }
  };

  const fetchCaracteristicas = async () => {
    try {
      const response = await fetch(urlCaracteristicas);
      if (!response.ok) {
        throw new Error("No se pudieron obtener las caracteristicas.");
      }
      const data = await response.json();
      setListaCaracteristicas(data);
    } catch (error) {
      
      console.error("Error al cargar las caracteristicas:", error);
    }
  };


  const fetchProductById = async (id) => {
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
  

  const fetchObtenerResenias = async (productId) => {
    const url = `${API_URL}resenia/product/${productId}`;
    console.log("FETCH GET RESENIA")

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
      setListaResenias(data);
      return data
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  const actualizarListaProducts = async () => {

    await fetchData();
  };

  const actualizarCategorias = async () => {
    await fetchCategorias();
  };



  const fetchFiltroRent= async()=>{
    const settings = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    };
    try {
      const response = await fetch(urlFiltro,settings);
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de RentProducts");
      }
      const data = await response.json();
      setRentProduct(data);
      console.log(data)
      return data;
    } catch (error) {
      console.error("Error al cargar la lista de RentProducts:", error);
    }
  }

  useEffect(() => {
    fetchData();
    fetchCategorias();
    fetchCaracteristicas();
    fetchFiltroRent()
  }, []);

  const logout = () => {
    setToken('');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userData');

  };

  return (
    <GlobalContext.Provider value={{ listaCategorias, listaProducts, isLoading, listaResenias, actualizarListaProducts, actualizarCategorias, fetchProductById, logout, fetchCaracteristicas, listaCaracteristicas, fetchFiltroRent, rentProduct,fetchData, fetchObtenerResenias }}>
      {children}
    </GlobalContext.Provider>
  );
};
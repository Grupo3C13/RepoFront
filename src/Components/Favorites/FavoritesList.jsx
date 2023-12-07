import React, { useEffect, useState } from "react";
import Favorites from "./Favorites";
import { useAccount } from "../../Context/accountContext";
import { GlobalContext } from "../../Context/globalContext";
import Card from "../Card/Card";
import './FavoritesList.css'

const FavoritesList = () => {
  const { usersData } = useAccount();
  const API_URL = import.meta.env.VITE_API_URL;
  const [instrumentosFavoritos, setInstrumentosFavoritos] = useState([]);


  useEffect(() => {
    fetchDataShow();
  }, [usersData]); 

  const fetchDatashow = async () => {
    try {
      if (usersData) {
        const usersId = usersData.id;
        const token = localStorage.getItem("token");

        const url = `http://localhost:8090/users/mostrarFav/${usersId}`;
        const set = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(url, set);
        const data = await response.json();

        if (response.ok) {
          setInstrumentosFavoritos(data);
        } else {
          throw new Error("Error");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
    
  const updateListaFav = () => {
    fetchDatashow();
  };
  
  const renderList = () => {
  return (
    <div className="listado">
      <h2>Instrumentos Favoritos:</h2>
      <ul className="cardFavs">
        {instrumentosFavoritos.map((productId) => (
          <li key={productId.id}>
            <Card
              key={productId.id}
              {...productId}
              isFavorite={true}
              updateListaFav={updateListaFav}
            />
          </li>
        ))}
      </ul>
    </div>
  );
  }
  
            useEffect(() => {
              renderList();
            }, [instrumentosFavoritos]);
  


  return (
    <div>{renderList()}</div>
  );
};

export default FavoritesList;
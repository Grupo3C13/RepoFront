import React, { useEffect, useState } from "react";
//import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart as farHeart,faHeart as fasHeart,} from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { useAccount } from "../../Context/accountContext";
import { GlobalContext } from "../../Context/globalContext";

const Favorites = (props) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [favorite, setFavorite] = useState(props.isFavorite);
  const { usersData } = useAccount();
  const {updateListaFav} = props

  const productId = props.variable;
  const token = localStorage.getItem("token");
  const users = JSON.parse(localStorage.getItem("userData"));
  const userId = users ? users.id : null;


  const fetchDataAgregar = async () => {
    try {
      const url = `http://localhost:8090/users/${userId}/agregarFav/${productId}`;
      const set = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, set);
      if (response.ok) {
        setFavorite(true);
      }
      if (!response.ok) {
        throw new Error("Error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchDataEliminar = async () => {
    try {
      const url = `http://localhost:8090/users/${userId}/eliminarFav/${productId}`;
      const set = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, set);
      if (response.ok) {
        setFavorite(false);
      }
      if (!response.ok) {
        throw new Error("Error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const handleToggleFavorite = async () => {
    if (usersData) {
      favorite ? await fetchDataEliminar() : await fetchDataAgregar();
      await updateListaFav()
      
    } else {
      window.location.href = "/auth/login";
    }
  };


  return (
    <FontAwesomeIcon
      icon={favorite ? solidHeart : farHeart}
      onClick={handleToggleFavorite}
      style={{ cursor: "pointer", color: favorite? "red" : "gray" }}
    />
  );
};

export default Favorites;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import style from "./Review.module.css";
import { GlobalContext } from "../../Context/globalContext";
import { useState, useContext } from "react";
import Swal from 'sweetalert2'

function Review({ id }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const users = JSON.parse(localStorage.getItem("userData"));

  const usersId = users ? users.id : null;
  const productId = id;

  const { fetchGetReviews } = useContext(GlobalContext);

  const [star, setStar] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  const [formData, setFormData] = useState({
    users: {
      id: usersId,
    },
    instrument: {
      id: productId,
    },
    comment: "",
    puntuacion: 0,
    dateReview: "",
  });
  const handleStar = (star) => {
    setStar(star);
    setFormData({
      ...formData,
      puntuacion: star,
    });
  };

  const renderStars = (stars) => {
    return stars.map((star) => (
      <li key={star} onClick={() => handleStar(star)}>
        <FontAwesomeIcon
          icon={star <= star ? faStarSolid : faStar}
          className={style.starIcon}
        />
      </li>
    ));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const date = new Date(Date.now());
    const dateFormat = date.toISOString();
    setFormData({
      ...formData,
      [name]: value,
      dateReview: dateFormat,
    });
  };

  const fetchSendReview = async () => {

    const url = `http://localhost:8090/review/agregar`;
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch(url, settings);
      const data = await response.text();
      console.log("Se creo la reseña con id: " + data);
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  const verifiedUser = async() => {
    const url = `http://localhost:8090/reservation/users/${usersId}`;
    const settings = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, settings);
      const reservationList = await response.json();
      console.log(reservationList)

      const lista = reservationList.map((products)=>{
        if(products.instrument.id == productId)
        return true
      })
      const hasBooked = lista.some(booleanos => booleanos ===true)
      console.log("Dentro verificar Usuario")
      console.log(hasBooked)
      return hasBooked

    }catch(error){
      console.error("ERROR: ", error)
    }
    

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      comment: "",
      puntuacion: 0,
    });
    setStar(0);

    const resultado = await verifiedUsers();
    console.log("HANDLE SUBMIT")
    console.log(resultado)
    if(resultado){
      Swal.fire({
        position: "top-end",
        icon: "success",
        text: 'Review Send',
        showConfirmButton: false,
        timer: 3500
      });
      
      await fetchSendReview();
      await fetchGetReviews(productId);
      
    }else{
      Swal.fire({
        position: "top-end",
        text: 'Primero debes reservarlo',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000
      });
    }
    console.log(formData);
  };

  return (
    <section className={style.reviewSection}>
      <h2 className={style.title}>Enviar Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="comment">Comentario:</label>
          <div>

          
        <textarea
          id="comment"
          name="comment"
          value={formData.comment }
          cols={50}
          rows={4}
          onChange={handleChange}
        ></textarea></div>
        </div>
        
        <div>

        
        <label htmlFor="valoracion">Puntuación:</label>
        <div>
          <ul className={style.listaStars}>{renderStars(stars)}</ul>
        </div>
        </div>
        <button>Enviar Review</button>
      </form>
    </section>
  );
}
export default Review;

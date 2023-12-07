import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import Favorites from "../Favorites/Favorites";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";

const Card = ({
  id,
  imgUrl,
  name,
  price,
  score,
  cantReviews,
  isFavorite,
  updateListaFav,
}) => (
  <div className="body-cards">
    <div className="card">

      <div className="card-img">
        <Link to={`/detail/${id}`}>
          <img src={imgUrl} alt={name} />
        </Link>
      </div>
      <div className="card-name">
        <h3>{name}</h3>
      </div>
      <div className="card-details">
        <div className="price">
          <span className="price_p">Precio</span>
         <p>${price}</p>          

        </div>  </div>  
          {/* <p className="card-info">
      <FontAwesomeIcon icon={faStarSolid} className="card-star" />
        {score}
      </p></div> */}
      <div className="buttonFavContainer">
      <button className="buttonComprar"><Link to={`/detail/${id}`} className="buttonComprar"> Reservar</Link></button>
        <div className="FavCardCorazon">
          <Favorites
            variable={id}
            isFavorite={isFavorite}
            updateListaFav={updateListaFav}
          />
        </div>
      </div>

      </div>
    </div>
);

export default Card;

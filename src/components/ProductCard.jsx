/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "../components/ProductCard.modules.css";
import emptyStar from "../images/icons8-estrella-50.png";
import fullStar from "../images/icons8-estrella-50 (1).png";

export function ProductCard({
  img_src,
  titulo,
  descripcion,
  precio,
  categoria,
  id,
}) {
  return (
    <div className="prod_card">
      <div>
        <img className="img_prod" src={img_src} alt={titulo} />
      </div>
     {/* {Array.isArray(img_src) && img_src.length > 0 && (
        <div>
          {img_src.map((url, index) => (
            <img key={index} src={url} alt={`${titulo}-img-${index}`} />
          ))}
        </div>
      )} */}
      <div className="prod_detail">
      <h3>{titulo}</h3>
        <div className="stars">
          <img src={fullStar} alt="" />
          <img src={fullStar} alt="" />
          <img src={fullStar} alt="" />
          <img src={fullStar} alt="" />
          <img src={emptyStar} alt="" />
        </div>
        
        <p>{descripcion}</p>
        <p>Categoría: {categoria}</p>
        <p className="precio">Precio de alquiler: {precio}</p>
        <Link to={`/producto/${id}`}>
          <button>Ver mas</button>
        </Link>
      </div>
    </div>
  );
}

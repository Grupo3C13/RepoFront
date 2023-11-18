/* eslint-disable react/prop-types */
import "../components/CategoriesCard.modules.css";
import { Link } from "react-router-dom";

export function CategoriesCard({ img_src, titulo, descripcion, id }) {
  return (
    <div className="cat_card">
      <Link to={`/categories/${id}`}>
        <img src={img_src} alt="" />
        <h4>{titulo}</h4>
        <p>{descripcion}</p>
      </Link>
    </div>
  );
}

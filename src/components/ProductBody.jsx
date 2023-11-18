/* eslint-disable react/prop-types */
import "../components/ProductBody.modules.css";

import { Gallery } from "./Gallery";

export function ProductBody({
  titulo,
  img_src,
  descripcion,
  precio,
  categoria,
}) {
  return (
    <div className="prod_chars">
      <h3>{titulo}</h3>
      <img src={img_src} alt="" />
      {/* <Gallery img_src={img_src}/> */}
      <div className="container">
        <h4>Categoría</h4>
        <p>{categoria}</p>
        <h4>Descripción</h4>
        <p>{descripcion}</p>
        
        <p className="precio">Precio de alquiler: {precio}</p>
      </div>
      {/* <button>Reservar</button> */}
    </div>
  );
}

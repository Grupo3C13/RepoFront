/* eslint-disable react/prop-types */
import "../components/ProductBody.modules.css";

import { Gallery } from "./Gallery";

export function ProductBody({
  titulo,
  img_src,
  descripcion,
  precio,
  categoria,
  id,
}) {
  return (
    <div className="prod_chars">
      <h3>{titulo}</h3>
      {/* {Array.isArray(img_src) && img_src.length > 0 && (
        <div>
          {img_src.map((url, index) => (
            <img key={index} src={url} alt={`${titulo}-img-${index}`} />
          ))}
        </div>
      )} */}
      <img src={img_src} alt={`${titulo}-img-${id}`} />
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

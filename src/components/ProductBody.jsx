/* eslint-disable react/prop-types */
import "../components/ProductBody.modules.css";

import { Gallery } from "./Gallery";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function ProductBody({
  titulo,
  img_src,
  descripcion,
  precio,
  categoria,
  id,
}) 
{

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const sliderStyle = {
    maxWidth: '100%',  // Ajusta el ancho máximo del carrusel
    margin: '0 auto',  // Centra el carrusel en el contenedor
  };
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
      {/* <img src={img_src} alt={`${titulo}-img-${id}`} /> */}
      {/* <Gallery img_src={img_src}/> */}
      <div>
      {/* <Slider {...settings}> */}
        {img_src &&
          img_src.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`${titulo}-img-${index}`}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          ))}
      {/* </Slider> */}
      </div>
      <div className="container">
        <h4>Categoría</h4>
        <p className="prod-par">{categoria}</p>
        <h4>Descripción</h4>
        <p className="prod-par">{descripcion}</p>

        <p className="precio">Precio de alquiler: {precio}</p>
      </div>
      {/* <button>Reservar</button> */}
    </div>
  );
}

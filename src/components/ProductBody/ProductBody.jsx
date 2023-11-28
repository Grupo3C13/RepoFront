/* eslint-disable react/prop-types */
import "./ProductBody.modules.css";
import { useEffect, useState } from "react";
import { Gallery } from "../Gallery/Gallery";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaShare } from "react-icons/fa";
import ProductShareDialog from "../../components/ProductBody/ProductoShareDialog";

export function ProductBody({
  id,
  name,
  description,
  img_src,
  category,
  price,
}) {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [modal, setModal] = useState(false);
  const [imagenActual, setImagenActual] = useState(0);

  const onShareClick = () => {
    setIsShareDialogOpen(true);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const sliderStyle = {
    maxWidth: "100%", // Ajusta el ancho máximo del carrusel
    margin: "0 auto", // Centra el carrusel en el contenedor
  };

  const toggleModal = () => {
    setModal(!modal);
    setShowPopup(!showPopup);
  };

  const toggleGalleryModal = () => {
    setShowGalleryModal(!showGalleryModal);
    setShowPopup(!showPopup);
  };

  const avanzarImagen = () => {
    setImagenActual((imagenActual + 1) % img_src.length);
  };

  const retrocederImagen = () => {
    setImagenActual((imagenActual - 1 + img_src.length) % img_src.length);
  };

  return (
    <div className="prod_chars">
      <h3>{name}</h3>
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
        <div className="section">
          <div className="principal">
            <img className="mainimg" src={img_src} alt={name} />
          </div>
          <div className="galeria">
            {img_src &&
              img_src
                .slice(1, 5)
                .map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`${name}-img-${index}`}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                ))}
          </div>
        </div>
        <button className="btnVer" onClick={toggleGalleryModal}>
                Ver más
              </button>
        {/* </Slider> */}
      </div>
      {showGalleryModal && (
                <div className="modal">
                  <div onClick={toggleModal} className="overlay"></div>
                  <div className="modalcontent">
                    <div
                      className="carrusel"
                    >
                      <button
                        className="btnBack"
                        onClick={retrocederImagen}
                      >
                        &lt;
                      </button>
                      <img
                        className="imagenCarrusel"
                        src={img_src[imagenActual]}
                        alt={name}
                      />

                      <button
                        className="btnNext"
                        onClick={avanzarImagen}
                      >
                        &gt;
                      </button>
                    </div>
                    <button
                      className="closemodal"
                      onClick={toggleGalleryModal}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              )}


      <div className="container">
        <h4>Categoría</h4>
        <p className="prod-par">{category}</p>
        <h4>Descripción</h4>
        <p className="prod-par">{description}</p>

        <p className="precio">Precio de alquiler: {price}</p>
      </div>
      {/* <button>Reservar</button> */}
      <button onClick={onShareClick}>
        <FaShare /> Compartir
      </button>
      {isShareDialogOpen && (
        <ProductShareDialog product={(name, description, price, img_src)} />
      )}
    </div>
  );
}

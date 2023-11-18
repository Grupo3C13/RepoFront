import { ProductBody } from "../components/ProductBody";
import { TitleBar } from "../components/TitleBar";
import flecha from "../images/ico-flecha.png";
import data from "../data";
import "../routes/ProductDetail.modules.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Gallery } from "../components/Gallery";
//import { Characteristics } from "../components/Characteristics";
import ico_marca from "../images/flag-solid.svg";
import ico_modelo from "../images/asterisk-solid.svg";
import ico_electrico from "../images/bolt-solid.svg";
import ico_protector from "../images/gift-solid.svg";

export function ProductDetail() {
  const { id } = useParams();
  const [detalle, setDetalle] = useState([]);

  function getData() {
    //data.id = id;
    const response = data[id - 1];
    setDetalle(response);
  }
  //console.log(detalle.titulo);

  useEffect(() => {
    getData();
  });

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="block">
      <TitleBar titulo="Detalle del Producto" />
      <a href="#" className="flecha" onClick={handleGoBack}>
        <img src={flecha} alt="" />
      </a>
      <ProductBody
        img_src={detalle.img}
        titulo={detalle.titulo}
        categoria={detalle.categoria}
        descripcion={detalle.descripcion}
        precio={detalle.precio}
      >
        {/* <Gallery img_src={detalle.img} /> */}
      </ProductBody>

      {/* <Caracteristicas
        marca={detalle.marca}
        modelo={detalle.modelo}
        electrico={detalle.electrico}
        protector={detalle.protector}
      /> */}

      <div>
        <h4>Características</h4>
        <div className="caracteristicas iconos">
          <div className="celda">
            <img src={ico_marca} alt="" />
            <p>Marca: </p>
            <p> {detalle.marca}</p>
          </div>
          <div className="celda">
            <img src={ico_modelo} alt="" />
            <p>Modelo: </p>
            <p> {detalle.modelo}</p>
          </div>
          <div className="celda">
            <img src={ico_electrico} alt="" />
            <p>Está en stock: </p>
            <p> {detalle.stock}</p>
          </div>
          {/* <div className="celda">
            <img src={ico_protector} alt="" />
            <p>Tiene protector: </p>
            <p> {detalle.protector}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

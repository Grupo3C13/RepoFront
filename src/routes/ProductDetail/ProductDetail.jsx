import { ProductBody } from "../../components/ProductBody/ProductBody";
import { TitleBar } from "../../components/TitleBar/TitleBar";
//import flecha from "../images/ico-flecha.png";
//import data from "../../data";
import "../ProductDetail/ProductDetail.modules.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Gallery } from "../../components/Gallery/Gallery";
//import { Characteristics } from "../components/Characteristics";
//import ico_marca from "../images/flag-solid.svg";
//import ico_modelo from "../images/asterisk-solid.svg";
//import ico_electrico from "../images/bolt-solid.svg";
//import ico_protector from "../images/gift-solid.svg";
import { Policies } from "../../components/Policies/Policies";


export function ProductDetail() {
  const { id } = useParams();
  const [detalle, setDetalle] = useState([]);
  

  async function getData() {
    const response = await fetch(`http://127.0.0.1:8090/products/${id}`);
    const data = await response.json();
    setDetalle(data);
  }
  //console.log(detalle.titulo);

  useEffect(() => {
    getData();
  }, []);

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
          key={detalle.id}
          img_src={detalle.images}
          name={detalle.name}
          category={detalle.category && detalle.category.name}
          description={detalle.description}
          price={detalle.price}
        />

     

      {/* <Caracteristicas
        marca={detalle.marca}
        modelo={detalle.modelo}
        electrico={detalle.electrico}
        protector={detalle.protector}
      /> */}

      <div>
        <h4 className="caract-title">Características</h4>
        <div className="caracteristicas iconos">
          <div className="celda">
            <img src={ico_marca} alt="" />
            <p>Marca: </p>
            <p> {detalle.brand}</p>
          </div>
          <div className="celda">
            <img src={ico_modelo} alt="" />
            <p>Modelo: </p>
            <p> {detalle.model}</p>
          </div>
          <div className="celda">
            <img src={ico_electrico} alt="" />
            <p>Está en stock: </p>
            {/* <p> {detalle.active}</p> */}
            <p> Si</p>
          </div>
          
        </div>
      </div>

      
      <Policies />
    </div>
  );
}
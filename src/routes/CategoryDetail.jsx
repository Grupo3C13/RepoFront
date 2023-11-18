import { ProductCard } from "../components/ProductCard";
import { TitleBar } from "../components/TitleBar";
import instrumentos from "../images/instrumentos.jpg";
import "../routes/CategoryDetail.modules.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function CategoryDetail() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  async function fetchData() {
    const response = await fetch(`http://127.0.0.1:8090/categories${id}`);
    const data = await response.json();
    setData(data);
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="block">
      <TitleBar titulo="Productos de la Categoría" />
      <div className="card_container">
      {/* <ProductCard
        img_src={instrumentos}
        titulo="Lorem ipsum"
        descripcion="Lorem ipsum dolor sit amet."
        precio="$550"
      />
      <ProductCard
        img_src={instrumentos}
        titulo="Lorem ipsum"
        descripcion="Lorem ipsum dolor sit amet."
        precio="$550"
      /> */}
      </div>
    </div>
  );
}

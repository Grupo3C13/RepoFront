import "../components/Categories.modules.css";
import { CategoriesCard } from "./CategoriesCard";
import accesorios from "../images/accesorios.jpg";
import cuerda from "../images/cuerda.jpg";
import percusion from "../images/percusion.jpg";
import viento from "../images/viento.jpg";
import { useState, useEffect } from "react";

export function Categories() {
  const [data, setData] = useState([]);

  async function fetchData() {
    const response = await fetch("http://127.0.0.1:8090/categories");
    const data = await response.json();
    setData(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  
  return (
    <div>
      <h3>Categorias de instrumentos</h3>
      <div className="categorias">
      
        {data.map(function (item) {
          return (
            <CategoriesCard
              key={item.id}
              titulo={item.name}
              descripcion={item.description}
              img_src={item.url}
              id={item.id}
            />
          );
        })}
        
        
        {/* <CategoriesCard 
                    titulo="Accesorios"
                    img_src={accesorios}
                    descripcion="Gran variedad de accesorios"
                />
                <CategoriesCard 
                    titulo="Cuerda"
                    img_src={cuerda}
                    descripcion="Instrumentos de cuerda"
                />
                <CategoriesCard 
                    titulo="Percusión"
                    img_src={percusion}
                    descripcion="Instrumentos de percusión"
                />
                <CategoriesCard 
                    titulo="Viento"
                    img_src={viento}
                    descripcion="Instrumentos de viento"
                /> */}
      </div>
    </div>
  );
}

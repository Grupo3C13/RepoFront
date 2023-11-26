import { ProductCard } from "../../components/ProductBody/ProductCard";
//import instrumentos from "../images/instrumentos.jpg";
//import data from "../data";
import "../../components/Recommends/Recommends.modules.css";
import shuffle from "lodash.shuffle";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

export function Recommends() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 10; // Número de elementos por página

  async function fetchData() {
    const response = await fetch("http://127.0.0.1:8090/products");
    const data = await response.json();
    setData(data);
  }
  console.log("Data:", data);

  useEffect(() => {
    fetchData();
  }, []);

  // Función para barajar los datos
  const shuffledData = shuffle(data);
  
  // Función para dividir los datos en páginas aleatorias
  const getItemsForPage = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return shuffledData.slice(startIndex, endIndex);
  };

  // Calcular la cantidad total de páginas
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  /* const cards = data.map((item) => {
    return (
      <ProductCard
        key={item.id}
        img_src={item.img}
        titulo={item.titulo}
        descripcion={item.descripcion}
        precio={item.precio}
        categoria={item.categoria}
        id={item.id}
      />
    );
  }); */
  return (
    <div>
      <h3>Recomendaciones</h3>
      
      
      {data.length > 0 ? (
        <div className="grid-container">
          {getItemsForPage(currentPage).map((item) => (
            <ProductCard
              key={item.id}
              img_src={item.images?.[0]?.url}
              titulo={item.name}
              descripcion={item.description}
              precio={item.price}
              categoria={item.category?.name}
              id={item.id}
            />
          ))}
        </div>
      ) : (
        <p>Cargando...</p>
      )}

      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Siguiente"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

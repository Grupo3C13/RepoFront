import { ProductCard } from "../components/ProductCard";
import { TitleBar } from "../components/TitleBar";
import instrumentos from "../images/instrumentos.jpg";
import "../routes/CategoryDetail.modules.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import shuffle from "lodash.shuffle";
import ReactPaginate from "react-paginate";

export function CategoryDetail() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 10; // Número de elementos por página

  async function fetchData() {
    const response = await fetch(`http://127.0.0.1:8090/products/categories/${id}`);
    const data = await response.json();
    setData(data);
  }

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


  return (
    <div className="block">
      <TitleBar titulo="Productos de la Categoría" />
      {/* <div className="card_container"> */}
      {data.length > 0 ? (
        <div className="grid-container">
          {getItemsForPage(currentPage).map((item) => (
            <ProductCard
              key={item.id}
              img_src={item.images && item.images[0].url}
              titulo={item.name}
              descripcion={item.description}
              precio={item.price}
              categoria={item.category && item.category.name}
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
      {/* </div> */}
    </div>
  );
}

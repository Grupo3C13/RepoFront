import { useContext, useEffect, useState, memo } from "react";
import { GlobalContext } from "../../Context/globalContext";
import { Link } from "react-router-dom";
import "../Pagination/Pagination.css";
import style from "./Recommended.module.css";
import '../Loading/Loading.css'

const Recommended = memo(( {instrumentos} ) => {

  const { isLoading } = useContext(GlobalContext);
  const [instrumentosAleatorios, setInstrumentosAleatorios] = useState([]);


  const selectInstrumentosAleatorios = (instrumentos, cantidad) => {
    const instrumentosSeleccionados = [];
    while (instrumentosSeleccionados.length < cantidad) {
      const randomIndex = Math.floor(Math.random() * instrumentos.length);
      if (!instrumentosSeleccionados.includes(instrumentos[randomIndex])) {
        instrumentosSeleccionados.push(instrumentos[randomIndex]);
      }
    }
    return instrumentosSeleccionados;
  };

useEffect(() => {
  if (!isLoading && instrumentos && instrumentos.length > 0) {
    setInstrumentosAleatorios(selectInstrumentosAleatorios(instrumentos, 3));
  }
}, [instrumentos, isLoading]);

  return (
    <div>
        <h1 className={style.recomendacion}>Instrumentos Recomendados</h1>
        <ul className="listaReco">
          {instrumentosAleatorios.map((instrumento) => {
            return (
              <li key={instrumento.id}>
                <Link to={`/detail/${instrumento.id}`}>
                  <img src={instrumento.imgUrl} 
                  alt={instrumento.name}
                  style={{
                    backgroundColor: "#623cea",
                    color: "white",
                    margin: 10,
                    height: 300,
                    width:  400,
                    border: "1px solid #fff",
                    borderRadius: "10px",
                    padding: "10px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                />
                </Link>
                <p>{instrumento.name}</p>
                <p>${instrumento.price}</p>
              </li>
            );
          })}
        </ul>
    </div>
  );
});

export default Recommended;

import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from "../../Context/globalContext";
import './InstrumentChar.css';

const InstrumentChar = ({ id }) => {
  const { fetchProductsById } = useContext(GlobalContext);
  const [instrumentData, setInstrumentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInstrument = async () => {
      setIsLoading(true);
      const data = await fetchProductsById(id);
      if (data) {
        setInstrumentData(data);
      }
      setIsLoading(false);
    };

    loadInstrument();
  }, [fetchProductsById, id]);

  return (
    <div className='divAmplio'>
      <h4 className='caract'>Caracteristicas</h4>
      {isLoading ? (
        <p>Obteniendo Info</p>
      ) : instrumentData && instrumentData.characteristics ? (
        <div>
          <ul className='listaCarac'>
            {instrumentData.characteristics.map((characteristics, index) => (
              <li className='listaIcon' key={index}>
                <img src={characteristics.icono} alt={characteristics.title} className='imgIcono'/> 
                <p>
                  <strong>{characteristics.title}</strong> 
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>El instrumento no tiene caracteristica.</p>
      )}

    </div>
  );
}

export default InstrumentChar;

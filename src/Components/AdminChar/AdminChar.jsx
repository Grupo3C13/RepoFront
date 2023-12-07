import React, { useContext, useEffect, useState } from 'react';
import './AdminChar.css'
import { GlobalContext } from "../../Context/globalContext";
import CreateChar from "../AdminChar/CreateChar";
import Swal from 'sweetalert2'

const AdminChar = () => {
  const {charList,fetchCharacteristics } = useContext(GlobalContext);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [editCharacteristics, setEditCharacteristics ] = useState({ id: 0, title: "", icono: "" });
  const[update, setUpdate] = useState(false)
  const API_URL= import.meta.env.VITE_API_URL

  async function eliminarCharacteristics(id) {
    const confirmacion = await Swal.fire({
      text: "¿Estás seguro de que deseas eliminar esta característica?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    });

    if (confirmacion.isConfirmed) {
  const url = `http://localhost:8090/characteristics/eliminar/${id}`;
    const token = localStorage.getItem('token');
    const config = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, config);

      if (response.status === 200) {
        console.log("Se eliminó la característica");
        update==true?setUpdate(false):setUpdate(true)
        Swal.fire({
          text: 'Eliminada',
          icon: 'success',
        });
      } else {
        console.error('Error al eliminar');
        // show mensaje de error
        Swal.fire({
          text: 'Error al eliminar',
          icon: 'error',
        });
      } 
    } catch (error) {
      console.error('Error de red:', error);
    }
  }
  }
  function abrirPopupEdicion(characteristics) {
    setEditCharacteristics(characteristics);
    setEditPopupOpen(true);
  }

  function cerrarPopupEdicion() {
    setEditPopupOpen(false);
  }

  async function updateCharacteristics() {
    const url = `http://localhost:8090/characteristics/modificar`;
    const token = localStorage.getItem('token');
    const config = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editCharacteristics),
    };

    try {
      const response = await fetch(url, config);

      if (response.status === 200) {
        console.log("Se editó la característica");
        update==true?setUpdate(false):setUpdate(true)
        cerrarPopupEdicion();
        Swal.fire({
          text: 'Característica editada',
          icon: 'success',
        });
      } else {
        console.error('Error al editar');
        Swal.fire({
          text: 'Error al editar',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  useEffect(()=>{
    fetchCharacteristics();

  },[update])


  return (
    <div>
            <h2 className='listadecaracteristicas'>Lista de Caracteristicas: </h2>
    <div className="listCaract">

      <ul className="elementsCaract">
        {charList.map((characteristics) => (
          <li className='listId' key={characteristics.id}>
            <div className='idAdminCaract'>{characteristics.id}</div>
            <div className='listaTitle'>{characteristics.title}</div>
            <div className='admin-btn-container'>
              <button
                className='btnDelete'
                onClick={() => eliminarCharacteristics(characteristics.id)}
              >
                Eliminar
              </button>
              <button className='btnEditcharacteristics' onClick={() => abrirPopupEdicion(characteristics)}>
                Editar
              </button>
              
            </div>
          </li>
        ))}
      </ul>
      {editPopupOpen && (
        <div className="editPopup">
          <h3>Editar Característica</h3>
          <label>Título:</label>
          <input
            type="text"
            value={editCharacteristics.title}
            onChange={(e) => setEditCharacteristics({ ...editCharacteristics, title: e.target.value })}
          />
          <button onClick={updateCharacteristics}>Guardar</button>
          <button onClick={cerrarPopupEdicion}>Cancelar</button>
        </div>
      )}
      <CreateChar />
    </div>
    </div>
  );
}

export default AdminChar;
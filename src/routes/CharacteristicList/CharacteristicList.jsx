import { TitleBar } from "../../components/TitleBar/TitleBar";
import Sidebar from "../../components/SideBar/Sidebar";
import { useState, useEffect } from "react";
import "../CharacteristicList/CharacteristicList.modules.css";
import axios from 'axios';

export function CharacteristicList() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFeature, setNewFeature] = useState({ name: '', icon: '' });
  const [editingFeature, setEditingFeature] = useState(null);
  const [mensaje, setMensaje] = useState("");

  async function fetchData() {
    const response = await fetch("http://127.0.0.1:8090/categories"); //ver bien el endpoint aca!
    const data = await response.json();
    setData(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMensaje("")
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeature({ ...newFeature, [name]: value });
  };

  const handleAddFeature = () => {
    // Enviar los datos al servidor
    axios.post('http://127.0.0.1:8090/categories', newFeature) //ver bien el endpoint aca!
      .then((response) => {
        setNewFeature({name: '', icon: ''})
        console.log('Característica guardada con éxito:', response.data);
        setMensaje("Característica registrada con éxito!")
        fetchData(); // Vuelve a cargar las características
        // closeModal();
      })
      .catch((error) => {
        // setNewFeature({name: '', icon: ''})
        console.error('Error al guardar la característica:', error);
        setMensaje("Error al guardar la característica!")
      });
  };

  const handleEditFeature = () => {
    axios
    .put(`http://127.0.0.1:8090/categories/${editingFeature.id}`, newFeature) //ver bien el endpoint aca!
    .then((response) => {
      setEditingFeature(null);
      setNewFeature({name: '', icon: ''})
      console.log('Característica editada con éxito:', response.data);
      setMensaje("Característica editada con éxito!")
      closeModal(); // Cierra el modal después de editar
      fetchData(); // Vuelve a cargar las características
    })
    .catch((error) => {
      // Manejo de errores
      console.error('Error al editar la característica:', error);
      setMensaje("Error al editar la característica!")
    });
  };

  const handleDeleteFeature = (featureId) => {
    const shouldDelete = window.confirm('¿Estás seguro de que quieres eliminar esta característica?');
    if (shouldDelete) {
    axios
      .delete(`http://127.0.0.1:8090/categories/${featureId}`) //ver bien el endpoint aca!
      .then((response) => {
        // Procesar la respuesta y realizar acciones necesarias
        console.log('Característica eliminada con éxito:', response.data);
        setMensaje("Característica eliminada con éxito!")
        fetchData(); // Vuelve a cargar las características
      })
      .catch((error) => {
        // Manejo de errores
        console.error('Error al eliminar la característica:', error);
        setMensaje("Error al eliminar la característica!")
      });
    }
  };

  return (
    <div>
      <TitleBar titulo="Lista de Características" />
      <div className="vista menu">
        <Sidebar />
        <div className="bloque">
          <button onClick={openModal}>Añadir Nueva</button>
        

        <table id="characteristics">
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Icono</th>

            <th>Acciones</th>
          </tr>
          <tbody>
            {data.map(function (item) {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <img src={item.icon} alt="Icono" />
                  </td>

                  <td>
                    <button onClick={() => handleEditFeature(item)}>Editar</button>
                    <button onClick={() => handleDeleteFeature(item.id)}>Eliminar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        {isModalOpen && (
        <div className="modal open">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h3>Añadir Nueva Característica</h3>
            <form>
              <div>
                <label>Nombre:</label>
                <input
                  type="text"
                  name="name"
                  value={newFeature.name}
                  onChange={handleInputChange}
                  className="large-input"
                />
              </div>
              <div>
                <label>Ícono (URL):</label>
                <input
                  type="text"
                  name="icon"
                  value={newFeature.icon}
                  onChange={handleInputChange}
                  className="large-input"
                />
              </div>
              <button type="button" onClick={handleAddFeature}>
                Guardar
              </button>
            </form>
            {mensaje && <p>{mensaje}</p>}
          </div>
        </div>
        )}

      </div>
      
    </div>
  );
}

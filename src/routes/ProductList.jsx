import Sidebar from "../components/Sidebar";
import { TitleBar } from "../components/TitleBar";
import "../routes/ProductList.modules.css";
import { useState, useEffect } from "react";
import axios from 'axios';

export function ProductList() {
  const [data, setData] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', brand: '', model: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [mensaje, setMensaje] = useState("");

  async function fetchData() {
    const response = await fetch("http://127.0.0.1:8090/products");
    const data = await response.json();
    setData(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditProduct = () => {
    axios
    .put(`http://127.0.0.1:8090/products/${editingProduct.id}`, newProduct) 
    .then((response) => {
      setEditingProduct(null);
      setNewProduct({name: '', description: '', price: '', brand: '', model: ''})
      console.log('Producto editado con éxito:', response.data);
      setMensaje("Producto editado con éxito!")
      
      fetchData(); // Vuelve a cargar los Productos
    })
    .catch((error) => {
      // Manejo de errores
      console.error('Error al editar el Producto:', error);
      setMensaje("Error al editar el Producto!")
    });
  };

  const handleDeleteProduct = (productId) => {
    const shouldDelete = window.confirm('¿Estás seguro de que quieres eliminar este Producto?');
    if (shouldDelete) {
    axios
      .delete(`http://127.0.0.1:8090/products/${productId}`) 
      .then((response) => {
        // Procesar la respuesta y realizar acciones necesarias
        console.log('Producto eliminado con éxito:', response.data);
        setMensaje("Producto eliminado con éxito!")
        fetchData(); // Vuelve a cargar los Productos
      })
      .catch((error) => {
        // Manejo de errores
        console.error('Error al eliminar el Producto:', error);
        setMensaje("Error al eliminar el Producto!")
      });
    }
  };

  return (
    <div>
      <TitleBar titulo="Lista de Productos" />
      <div className="vista menu">
        <Sidebar />
        <table id="products">
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            {/* <th>Categoria</th> */}
            <th>Acciones</th>
          </tr>
          <tbody>
            {data.map(function (item) {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  {/* <td>{item.category}</td> */}
                  <td>
                    <button onClick={() => handleEditProduct(item)}>Editar</button>
                    <button onClick={() => handleDeleteProduct(item.id)}>Eliminar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {mensaje && <p>{mensaje}</p>}
      <div className="mensaje-de-advertencia">
        <p>
          Este panel no está optimizado para pantallas de tamaño pequeño. Por
          favor, utiliza una pantalla de tamaño medio o superior.
        </p>
      </div>
    </div>
  );
}

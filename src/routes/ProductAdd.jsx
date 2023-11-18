/* eslint-disable no-unused-labels */
import { useState, useEffect } from "react";
import "../routes/ProductAdd.modules.css";
import { TitleBar } from "../components/TitleBar";
import Sidebar from "../components/Sidebar";
import axios from "axios";

export function ProductAdd() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    brand: "",
    model: "",
    category: "",
    policies: [],          
    images: [],
    reservations: [],
    scores: [],
  });
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

   const handleImagenesChange = (e) => {
    // Maneja la subida de imágenes y actualiza el estado "imagenes"
    const selectedFiles = Array.from(e.target.files);
    setProduct({ images: selectedFiles });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realizar una solicitud POST a la API con los datos del producto
    axios
      .post("http://localhost:8090/products", product)
      .then((response) => {
        console.log("Producto registrado con éxito:", response.data);
        setProduct({
          id: 0,
          name: "",
          description: "",
          active: true,
          price: 0,
          brand: "",
          model: "",
          category: 0,
          policies: [],          
          images: [],
          reservations: [],
          scores: [],
        });
        setMensaje("Producto registrado con éxito!")
        setError('')
      })
      .catch((error) => {
        console.error("Error al registrar el producto:", error);
        setError("Error al registrar el producto!")
      });
  };

  /* useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => {
        setNombre("");
        setDescripcion: "";
        setImagenes: [];
        setMensaje("");
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [mensaje]); */

  return (
    <div className="formulario">
      <TitleBar titulo="Agregar Producto" />
      <div className="vista menu">
        <Sidebar />
        <form onSubmit={handleSubmit} className="product-form">
          <div>
            <label>Nombre del producto</label>
            <input type="text" value={product.name} onChange={(e) => setProduct({name: e.target.value})} />
            {/* {error && <p style={{ color: "red" }}>El nombre ya está en uso.</p>} */}
          </div>
          <div>
            <label>Descripción</label>
            <textarea value={product.description} onChange={(e) => setProduct({description: e.target.value})} />
          </div>
          {/* <div>
            <label>Imágenes del producto</label>
            <input
              className="boton"
              type="file"
              accept="image/*"
              multiple
              value={product.images}
              onChange={handleImagenesChange}
              // onChange={handleChange}
            />
          </div> */}
          <div>
            <label>Precio</label>
            <input
              type="number"
              value={product.price}
              onChange={(e) => setProduct({price: e.target.value})}
            />
          </div>
          <div>
            <label>Marca</label>
            <input type="text" value={product.brand} onChange={(e) => setProduct({brand: e.target.value})} />
          </div>
          <div>
            <label>Modelo</label>
            <input type="text" value={product.model} onChange={(e) => setProduct({model: e.target.value})} />
          </div>
          <div>
            <label htmlFor="">Categoria</label>
            <input
              type="number"
              value={product.category}
              onChange={(e) => setProduct({category: e.target.value})}
            />
          </div>
          <button type="submit" className="btn-form">Agregar Producto</button>
          {error && <p className="error">{error}</p>}
          {mensaje && <p className="enviado">{mensaje}</p>}
        </form>
      </div>
      <div className="mensaje-de-advertencia">
        <p>
          Este panel no está optimizado para pantallas de tamaño pequeño. Por
          favor, utiliza una pantalla de tamaño medio o superior.
        </p>
      </div>
    </div>
  );
}

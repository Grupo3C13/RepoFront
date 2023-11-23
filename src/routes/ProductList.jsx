import Sidebar from "../components/Sidebar";
import { TitleBar } from "../components/TitleBar";
import "../routes/ProductList.modules.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Modal, Form } from "react-bootstrap";

export function ProductList() {
  const [data, setData] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', brand: '', model: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function fetchData() {
    try{
    setLoading(true);
    // const response = await fetch("http://127.0.0.1:8090/products");
    // const data = await response.json();
    const response = await axios.get(
      `http://127.0.0.1:8090/products`
    );
    // setData(data);
    setProducts(response.data);
    setLoading(false);
    } catch(error){
      console.error(error);
        setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    // setLargeImage(product.imagenes[0]);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct({});
    // setSelectedImages('');
  };

  // const handleEditProduct = () => {
  //   axios
  //   .put(`http://127.0.0.1:8090/products/${editingProduct.id}`, newProduct) 
  //   .then((response) => {
  //     setEditingProduct(null);
  //     setNewProduct({name: '', description: '', price: '', brand: '', model: ''})
  //     console.log('Producto editado con éxito:', response.data);
  //     setMensaje("Producto editado con éxito!")
      
  //     fetchData(); // Vuelve a cargar los Productos
  //   })
  //   .catch((error) => {
  //     // Manejo de errores
  //     console.error('Error al editar el Producto:', error);
  //     setMensaje("Error al editar el Producto!")
  //   });
  // };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct({
      ...selectedProduct,
      [name]: value,
    });
  };

  const handleEditSave = async () => {
    try {
      setSaving(true);
      await axios.put(
        `http://127.0.0.1:8090/products`,
        selectedProduct
      );
      closeModal();
      const updatedProducts = products.map((product) =>
        product.id === selectedProduct.id ? selectedProduct : product
      );
      setProducts(updatedProducts);
      setSaving(false);
    } catch (error) {
      console.error(error);
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro que quieres eliminar este producto?")) {
      try {
        await axios.delete(
          `http://127.0.0.1:8090/products/${id}`
        );
        const updatedProducts = products.filter((product) =>
          product.id !== id
        );
        setProducts(updatedProducts);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // const handleDeleteProduct = (productId) => {
  //   const shouldDelete = window.confirm('¿Estás seguro de que quieres eliminar este Producto?');
  //   if (shouldDelete) {
  //   axios
  //     .delete(`http://127.0.0.1:8090/products/${productId}`) 
  //     .then((response) => {
  //       // Procesar la respuesta y realizar acciones necesarias
  //       console.log('Producto eliminado con éxito:', response.data);
  //       setMensaje("Producto eliminado con éxito!")
  //       fetchData(); // Vuelve a cargar los Productos
  //     })
  //     .catch((error) => {
  //       // Manejo de errores
  //       console.error('Error al eliminar el Producto:', error);
  //       setMensaje("Error al eliminar el Producto!")
  //     });
  //   }
  // };

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
            {products.map((product) =>(
              
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  {/* <td>{item.category}</td> */}
                  <td>
                    <button onClick={() => openModal(product)}>Editar</button>
                    <button onClick={() => handleDelete(product.id)}>Eliminar</button>
                  </td>
                </tr>
              
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>
            {/* {selectedProduct.id ? "Editar producto" : "Agregar producto"} */}
            Editar producto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={selectedProduct.name || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            {/* <Form.Group controlId="categoria">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                // as="select"
                type="text"
                name="categoria"
                value={selectedProduct.category || ""}
                onChange={handleEditChange}
              >
                <option value="" disabled>
                  Seleccione una categoría
                </option>
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option> 
                ))}
              </Form.Control>
            </Form.Group> */}
            <Form.Group controlId="descripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                value={selectedProduct.description || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            {/* <Form.Group controlId="imagenes">
              <Form.Label>Imágenes (URL separadas por coma)</Form.Label>
              <Form.Control
                type="text"
                name="imagenes"
                value={selectedImages}
                onChange={(e) => setSelectedImages(e.target.value)}
              />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={closeModal}> */}
          <button onClick={closeModal}>Cancelar</button>  
          {/* </Button> */}
          {/* <Button
            variant="secondary"
            onClick={selectedProduct.id ? handleEditSave : handleAddNew}
          > */}
            {/* {saving ? "Guardando..." : "Guardar"} */}
          <button onClick={handleEditSave}>Guardar</button>  
          {/* </Button> */}
        </Modal.Footer>
      </Modal>
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

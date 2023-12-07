import React, { useContext, useEffect, useState } from "react";
import "./productList.css";
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import { GlobalContext } from "../../Context/globalContext";
import EditProduct from "../EditProduct/EditProduct";
import Swal from 'sweetalert2'
import { Button, ButtonToolbar } from "react-bootstrap";

const ProductsList = () => {
  const { productsList, updateProductsList,fetchProductsById } = useContext(GlobalContext);
  const [product, setProduct] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const token = localStorage.getItem('token')


  const handleEditOpen = async (products) => {
    const instrument = await fetchProductsById(products.id)
    console.log(instrument)
    setSelectedProduct(instrument);
    
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleUpdateList = async () => {
    await updateProductsList();
  };


  ////////////////////////////////////////////////////////////////

  useEffect(() => {
    setProduct(productsList)
  }, [productsList, product])

  const fetchData = async (url, settings) => {
    try {
      const res = await fetch(url, settings);
      if (!res.ok) {
        throw new Error("Error");
      }
      const data = await res.text();
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmacion = await Swal.fire({
      text: "¿Estás seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí!"
    });
  
    if (confirmacion.isConfirmed) {
      const updatedProducts = product.filter(
        (instrumento) => instrumento.id !== id
      );
      const settings = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
       const url = `http://localhost:8090/products/eliminar/${id}`;
    try{
      await fetchData(url, settings);
      await updateProductsList();
      setProduct(updatedProducts)
      Swal.fire({
        text: 'Eliminado',
        icon: 'success',
      });
    } catch (error) {
      console.error('Error de red:', error);
      Swal.fire({
        text: 'Error',
        icon: 'error',
      });
    }
    }
  }
  return (
    <div className="listaProductosAdmin">
      <h2 className="tituloListaAdmin">Productos</h2>
      <ul className="listaContainerAdmin">
        {product.map((products) => (
          
          <li className="lista" key={products.id}>
            <div className="id">{products.id}</div>
            <div className="nombre">{products.name}</div>
            <div className="admin-btn-container">
              <Button
                className="btnEliminar"
                onClick={() => handleDelete(products.id)}
              >
                Eliminar
              </Button>
              <Button
                className="btnEdit"
                onClick={() => handleEditOpen(products)}
              >
                Editar
              </Button>
            </div>
          </li>
        ))}

        <Dialog open={editOpen} onClose={handleEditClose} maxWidth="md" fullWidth>
          <DialogContent>
            {selectedProduct && <EditProduct product={selectedProduct} onUpdateList={handleUpdateList} />}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </ul>
    </div>
  );
};
export default ProductsList;
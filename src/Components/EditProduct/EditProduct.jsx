import React, { useEffect, useState, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import "./EditProduct";
import { GlobalContext } from "../../Context/globalContext";
import Swal from 'sweetalert2'

const EditProduct = ({ product, onUpdateList }) => {
  const { categoriesList, charList, updateCategories } =
    useContext(GlobalContext);
  const [formData, setFormData] = useState(product);
  const [selectedCategory, setSelectedCategory] = useState(product.categories);
  const [selectedChar, setSelectedChar] = useState(
    product.characteristics
  );
  const [editOpen, setEditOpen] = useState(false);
  const [editCharacteristicsOpen, setEditCharacteristicsOpen] = useState(false);
  const [launchFetch, setLaunchFetch] = useState(false);
  const API_URL= import.meta.env.VITE_API_URL

  const updateProductUrl = `http://localhost:8090/products/modificar`;

  const token = localStorage.getItem("token");

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEditCharacteristicsClose = () => {
    setEditCharacteristicsOpen(false);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory((prevSelectedCategory) => {
      if (prevSelectedCategory.some((obj) => obj.name === category.name)) {
        return prevSelectedCategory.filter((c) => c.name !== category.name);
      } else {
        return [...prevSelectedCategory, category];
      }
    });
  };

  const handleCharacteristicsChange = (characteristics) => {
    setSelectedChar((prevSelectedChar) => {
      if (
        prevSelectedChar.some(
          (obj) => obj.title === characteristics.title
        )
      ) {
        return prevSelectedChar.filter(
          (c) => c.title !== characteristics.title
        );
      } else {
        return [...prevSelectedChar, characteristics];
      }
    });
  };

  const renderCharOptions = useMemo(() => {
    const characteristics = charList;
    return characteristics.map((characteristics, index) => {
      const isSelected = selectedChar.some(
        (obj) => obj.title == characteristics.title
      );
      return (
        <div
          key={index}
          className={`${isSelected ? "selected" : ""}`}
          onClick={() => handleCharacteristicsChange(characteristics)}
        >
          <label value={characteristics}>{characteristics.title}</label>
        </div>
      );
    });
  }, [product, charList, selectedChar]);

  const renderCategoryOptions = useMemo(() => {
    const categories = categoriesList;
    return categories.map((category, index) => {
      const isSelected = selectedCategory.some(
        (obj) => obj.name == category.name
      );
      return (
        <div
          key={index}
          className={`${isSelected ? "selected" : ""}`}
          onClick={() => handleCategoryChange(category)}
        >
          <label value={category}>{category.name}</label>
        </div>
      );
    });
  }, [product, categoriesList, selectedCategory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function fetchCategory(productsId, categoriesId) {
    const token = localStorage.getItem("token");
    const settings = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `http://localhost:8090/products/${productsId}/categories/${categoriesId}`;
    try {
      const response = await fetch(url, settings);
      const data = await response.text();
    } catch (error) {
      console.error("ERROR:", error);
    }
  }

  async function fetchCharacteristics(productsId, characteristicId) {
    const token = localStorage.getItem("token");
    console.log(characteristicId)
    const settings = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `http://localhost:8090/products/${productsId}/characteristics/${characteristicId}`;
    try {
      const response = await fetch(url, settings);
      const data = await response.text();
    } catch (error) {
      console.error("ERROR:", error);
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    await setFormData({
      ...formData,
      categories: [],
      characteristics:[]
    });
    setLaunchFetch(true)
    
  };


  useEffect(() => {
    const fetchData = async () => {
      const settings = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      };

      try {
        const response = await fetch(updateProductUrl, settings);
        if (response.ok) {
          for (const category of selectedCategory) {
            await fetchCategory(product.id, category.id);
          }
          for (const characteristics of selectedChar) {
            await fetchCharacteristics(product.id, characteristics.id);
          }
          onUpdateList();
         Swal.fire({
          position: "top-end",
          icon: "success",
          text: 'Producto modificado',
          showConfirmButton: false,
          timer: 1500
        });
    } else {
      console.error("Error");
      Swal.fire({
        position: "top-end",
        text: 'Error',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          position: "top-end",
          text: 'Error',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    };
    if(launchFetch){
      fetchData();
      setLaunchFetch(false)
    }
  }, [launchFetch]);

  return (
    <div>
      {product && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Instrumento:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="brand">Marca:</label>
            <input
              type="text"
              name="marca"
              value={formData.brand}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="score">Puntuación:</label>
            <input
              type="number"
              name="score"
              value={formData.score}
              onChange={handleInputChange}
            />
          </div>
          {
            //CORREGIR MAS TARDE
            /*
            <div className="form-group">
            <label htmlFor="imagesBase64">Imagen:</label>
            <input
              type="text"
              name="imagesBase64"
              value={formData.imagesBase64}
              onChange={handleInputChange}
            />
          </div>
            */
          }
          <div className="form-group">
            <label htmlFor="categories">Categoría:</label>
            <button type="button" onClick={() => setEditOpen(true)}>
              Editar
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="characteristics">Características:</label>
            <button
              type="button"
              onClick={() => setEditCharacteristicsOpen(true)}
            >
              Editar
            </button>
          </div>
          <button className="btn-dialog" type="submit">
            Guardar
          </button>
        </form>
      )}
      <Dialog open={editOpen} onClose={handleEditClose} maxWidth="md" fullWidth>
        <DialogContent>
          {categoriesList && renderCategoryOptions}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={editCharacteristicsOpen}
        onClose={handleEditCharacteristicsClose}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          {charList && renderCharOptions}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCharacteristicsClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditProduct;
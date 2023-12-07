import { useContext, useState } from "react";
import "./Addproduct.css";
import { GlobalContext } from "../../Context/globalContext";
import Swal from "sweetalert2";

function AddProduct() {

  const { fetchData, categoriesList, charList } = useContext(GlobalContext);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedCharacteristic, setSelectedCharacteristic] = useState([]);

  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    score: 0,
    price: 0,
    imagesBase64: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
  const handleImageChange = async (e) => {
    const files = e.target.files;
    const base64Array = [];

    for (const file of files) {
      if (file.size <= MAX_IMAGE_SIZE) {
      const base64Data = await readFileAsBase64(file);
      base64Array.push(base64Data);
    }else {
      console.warn(`Imagen ${file.name} excede el tamaño máximo permitido.`);
    }

  }

    setFormData((prevData) => {
      return {
        ...prevData,
        imagesBase64: base64Array,
      };
    });
  };

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64WithoutPrefix = reader.result.split(",")[1];
        resolve(base64WithoutPrefix);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productsList = await fetchData();
    const formatProduct = productsList.map((products) =>
      products.name.toLowerCase()
    );
    const newProduct = formData.name.toLowerCase();

    if (formatProduct.includes(newProduct)) {
      Swal.fire({
        text: "Error: el producto ya existe.",
        icon: "error",
      });
    } else {
      const url = `http://localhost:8090/products/add`;
      
      const settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      };{
          try {
            const response = await fetch(url, settings);
            const data = await response.text();
            console.log(data);
            for (const category of selectedCategory) {
              await fetchCategory(data, category.id);
            }
            for (const characteristics of selectedCharacteristic) {
              await fetchCharacteristics(data, characteristics.id);
            }
           
            Swal.fire({
              text: "Instrumento cargado con éxito",
              icon: "success",
            });
            setFormData({
              id: 0,
              name: "",
              brand: "",
              description: "",
              score: 0,
              price: 0,
              imagesBase64: [],
            });

            
            await fetchData();
          } catch (error) {
            console.log(error);
          }
        }
    }
  }

    async function fetchCategory(productsId, categoriesId) {

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
        console.log(data);
      } catch (error) {
        console.error("ERROR:", error);
      }
    }

    async function fetchCharacteristics(productsId, characteristicId) {
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
        console.log(data);
      } catch (error) {
        console.error("ERROR:", error);
      }
    }

    const renderCategoryOptions = () => {
      const categories = categoriesList;
      return categories.map((category, index) => (
        <div
          key={index}
          className={`${selectedCategory.includes(category) ? "selected" : ""}`}
          onClick={() => handleCategoryChange(category)}
        >
          <label value={category}>{category.name}</label>
        </div>
      ));
    };

    const renderCharacteristicsOptions = () => {
      const characteristics = charList;
      return characteristics.map((characteristic, index) => (
        <div
          key={index}
          className={`${
            selectedCharacteristic.includes(characteristic) ? "selected" : ""
          }`}
          onClick={() => handleCharacteristicChange(characteristic)}
        >
          <label value={characteristic}>
            {characteristic.title}
          </label>
        </div>
      ));
    };

    const handleCategoryChange = (category) => {
      if (selectedCategory.includes(category)) {
        setSelectedCategory(
          selectedCategory.filter((c) => c.name !== category.name)
        );
      } else {
        setSelectedCategory([...selectedCategory, category]);
      }
    };

    const handleCharacteristicChange = (characteristic) => {
      if (selectedCharacteristic.includes(characteristic)) {
        setSelectedCharacteristic(
          selectedCharacteristic.filter((c) => c.title !== characteristic.title)
        );
      } else {
        setSelectedCharacteristic([...selectedCharacteristic, characteristic]);
      }
    };
    window.scrollTo(0,0)

    return (
      <div>
        <h2 className="titulo">Agregar producto</h2>
        <div className="Container">
          <form className="formulario" onSubmit={handleSubmit}>
            <div className="div">
              <label className="labels" htmlFor="name">
                Nombre:
              </label>
              <input
                className="input"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="div">
            <label className="labels" htmlFor="brand">
                Marca:
              </label>
              <input
                className="input"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
              />
            </div>
            <div className="div">
              <label className="labels" htmlFor="description">
                Descripción:
              </label>
              <textarea
                className="input"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="div">
              <label className="labels" htmlFor="price">
                Precio:
              </label>
              <input
                className="input"
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="ccSelect">
              <div className="divSelect">
                <label className="labels" htmlFor="categorias">
                  Categorías:
                </label>
                <>{renderCategoryOptions()}</>
              </div>

              <div className="divSelect">
                <label className="labels" htmlFor="caracteristicas">
                  Características:
                </label>
                <>{renderCharacteristicsOptions()}</>
              </div>
            </div>

            <div className="div">
              <label className="labels" htmlFor="image">
                Imagen:
              </label>
              <input
         style={{
          backgroundColor: "#623cea",
          color: "white",
          margin: 10,
          border: "1px solid #fff",
          borderRadius: "10px",
          padding: "10px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
                type="file"
                multiple
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <button className="FormBtn" type="submit">
              Guardar Instrumento
            </button>
          </form>
        </div>
      </div>
    );
}
export default AddProduct;
import { useState, useContext, useRef } from "react";
import "./AddCategory.css";
import { GlobalContext } from "../../Context/globalContext";
import Swal from "sweetalert2";

function AddCategory() {
  const token = localStorage.getItem("token");

  const { updateCategories } = useContext(GlobalContext);
  const formRef = useRef(null);

  const [category, setCategory] = useState({
    name: "",
    description: "",
    imagen: null,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value,
    });
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const base64Data = await readFileAsBase64(file);
    setCategory(() => {
      return {
        ...category,
        imagen: base64Data,
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
  async function handleSubmit(e) {
    e.preventDefault();
     const url = `http://localhost:8090/categories/agregar`;
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    };
    try {
      const res = await fetch(url, config);

      if (res.status === 200) {
        await updateCategories();
        formRef.current.reset();

        setCategory({
          name: "",
          description: "",
        });
        Swal.fire({
          text: "Categoría creada",
          icon: "success",
        });
      } else {
        Swal.fire({
          text: "Error al crear",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div>
      <h2 className="AddCategory">Agregar Categoría</h2>
      
      <div className="agregar-category">
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="agregar-category-div">
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={category.name}
            onChange={handleChange}
          />
        </div>
        <div className="agregar-category-div">
          <label>Descriptión:</label>
          <textarea
            name="description"
            value={category.description}
            onChange={handleChange}
          />
        </div>
        <div className="agregar-category-div">
          <label>Agregar imagen:</label>
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
            name="imagen"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
    </div>
  );
}
export default AddCategory;
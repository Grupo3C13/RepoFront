import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../Context/globalContext";
import Swal from "sweetalert2";

function CreateChar() {
  const token = localStorage.getItem("token");
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [characteristics, setcharacteristics] = useState({
    title: "",
    icono: null,
  });

  const [update, setUpdate] = useState(false);
  const { charList, fetchCharacteristics } =
    useContext(GlobalContext);

  const handlePopUp = (e) => {
    editPopupOpen==true?setEditPopupOpen(false):setEditPopupOpen(true)
  };
  function cerrarPopupCrear() {
    setEditPopupOpen(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcharacteristics({
      ...characteristics,
      [name]: value,
    });
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const base64Data = await readFileAsBase64(file);
    setcharacteristics(() => {
      return {
        ...characteristics,
        icono: base64Data,
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
    const url = `http://localhost:8090/characteristics/agregar`;
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(characteristics),
    };

    try {
      const res = await fetch(url, config);
      console.log(res.status)
      if (res.status === 200) {
        console.log("Característica creada");
        update == true ? setUpdate(false) : setUpdate(true);
        Swal.fire({
          text: "Característica creada",
          icon: "success",
        });
      } else {
        console.log("Error al crearla");
        Swal.fire({
          text: "Error al crearla",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
    setcharacteristics({
      title: "",
      icono: "",
    });
  }
  useEffect(() => {
    fetchCharacteristics();
  }, [update]);

  return (
    <>
      {editPopupOpen && (
        <div className="editPopup">
          <h3>Crear Caracteristica</h3>

          <label>Nombre</label>
          <input className="inputTitCaract"
            type="text"
            name="title"
            value={characteristics.title}
            onChange={handleChange}
          />
          <label>Imagen</label>
          <input
            className="input"
            type="file"
            name="icono"
            onChange={handleImageChange}
          />
          <button onClick={handleSubmit} type="submit">Crear</button>
        </div>
      )}
      <button  className="btncrearChar" onClick={() => handlePopUp()} type="submit">
        {
          editPopupOpen?"Cerrar":"Agregar"
        }
        
      </button>
    </>
  );
}

export default CreateChar;

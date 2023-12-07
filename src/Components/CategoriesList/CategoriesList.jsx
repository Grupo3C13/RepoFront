import React, { useContext, useEffect,useState } from 'react';
import { GlobalContext } from "../../Context/globalContext";
import './CategoriesList.css';
import '../AdminChar/AdminChar'
import Swal from 'sweetalert2'



const CategoriesList = () => {
    const { categoriesList, updateCategories } = useContext(GlobalContext);
    const API_URL= import.meta.env.VITE_API_URL
    const[update, setUpdate] = useState(false)



    async function deletecategories(id) {
        const confirmacion = await Swal.fire({
          text: "¿seguro de eliminarla?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, eliminar!",
        });
    
        if (confirmacion.isConfirmed) {
      const url = `http://localhost:8090/categories/eliminar/${id}`;
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
            console.log("Se eliminó");
            update==true?setUpdate(false):setUpdate(true)
            Swal.fire({
              text: 'Eliminada',
              icon: 'success',
            });
          } else {
            console.error('Error');
            Swal.fire({
              text: 'Error',
              icon: 'error',
            });
          } 
        } catch (error) {
          console.error('Error de red:', error);
        }
      }
    }

    useEffect(()=>{
        updateCategories();
    
      },[update])


      
    return (
<div>
          <h2 className='listacategorias'>Lista de Categorías:</h2>

      <div className="listCaract">
            <ul className="elementsCaract">
                {categoriesList.map((categories) => (
                    <li className='listId' key={categories.id}>
                    <div>{categories.id}</div>
                    <div className='listaTitle'>{categories.name}</div>
                    <div className='btnContainer'>
                      <button
                        className='btnDelete'
                        onClick={() => deletecategories(categories.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                    </li>

                ))}
            </ul>
        </div>
        </div>
    );
}

export default CategoriesList;

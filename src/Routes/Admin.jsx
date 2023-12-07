import React, { useState } from 'react'
import './Admin.css'
import AddCategory from '../Components/AddCategory/AddCategory';
import AddProduct from '../Components/AddProduct/AddProduct';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import UsersList from '../Components/UsersList/UsersList';
import AdminChar from '../Components/AdminChar/AdminChar';
import CategoriesList from '../Components/CategoriesList/CategoriesList';
import ProductsList from '../Components/ProductList/ProductList';
import { Button } from 'react-bootstrap';


const Admin = () => {

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);


  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedItem(null);
    setOpen(false);
  };


  return (
    <div className="panel">
      <div className="admin-panel">
        <div className="buttons-container">
          <div className='welcome-admin'>
          </div>
          <Button onClick={() => handleOpen(<AddProduct />)}>
            <div className="add-product">
              <h3>Agregar Producto </h3>
            </div>
          </Button>
          <Button onClick={() => handleOpen(<ProductsList />)}>
            <div className="add-category">
              <h3>Lista de Productos </h3>
            </div>
          </Button>
          <Button onClick={() => handleOpen(<AddCategory />)}>
            <div className="add-category">
              <h3>Agregar Categoría </h3>
            </div>
          </Button>
          <Button onClick={() => handleOpen(<CategoriesList/>)}>
            <div className="add-category">
              <h3>Lista de Categoria</h3>
            </div>
          </Button>
          <Button onClick={() => handleOpen(<AdminChar/>)}>
            <div className="add-feature">
              <h3>Lista de Características</h3>
            </div>
          </Button>
          <Button onClick={() => handleOpen(<UsersList/>)}>
            <div className="add-feature">
              <h3>Lista de Usuarios</h3>
            </div>
          </Button>
        </div>
        <div className="selected-item">
          {selectedItem}
        </div>
      </div>
    </div>
  )
}

export default Admin;
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import "./UsersList.css";
import Swal from 'sweetalert2'

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const token = localStorage.getItem("token");
  const API_URL= import.meta.env.VITE_API_URL

   const urlListar = `http://localhost:8090/users/listar`;
   const urlModificar = `http://localhost:8090/users/modificar`;

  const fetchDataList = async () => {
    try {
      const settings = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(urlListar, settings);

      if (!response.ok) {
        throw new Error("No se obtuvo.");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const fetchDataEditRole = async (users) => {
    try {
      users.role = users.role === "USER" ? "ADMIN" : "USER";
      const settings = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(users),
      };
      const response = await fetch(urlModificar, settings);
      if(response.ok)
      if (!response.ok) {
        throw new Error("Error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditRole = async (users) => {
    await fetchDataEditRole(users);
    fetchDataList();
  };

  const handleDelete = async (id) => {
    Swal.fire({
      text: "¿Deseas eliminar este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updatedUsers = users.filter((usuario) => usuario.id !== id);
          const settings = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          const url = `http://localhost:8090/users/eliminar/${id}`;
          const response = await fetch(url, settings);
  
          if (!response.ok) {
            throw new Error("No se elimino el usuario.");
          }
  
          setUsers(updatedUsers);
        } catch (error) {
          console.error("Error al eliminar:", error);

        }
      }
    });
  };

  useEffect(() => {
    fetchDataList();
  }, []);

  return (
    <div className="listaProductosAdmin">
      <h2 className="tituloListaAdmin">Listado de usuarios</h2>
      <ul className="listaContainerAdmin">
        {users.map((users) => (
          <li className="lista" key={users.id}>
            <div className="id">{users.id}</div>
            <div className="nombre">{users.email}</div>
            <div className="nombre">{users.role}</div>
            <div className="admin-btn-container">
              <Button
                variant="outlined"
                color="error"
                className="btnDelete"
                onClick={() => handleDelete(users.id)}
              >
                Eliminar
              </Button>
              <Button
                variant="outlined"
                color="success"
                className="btnEdit"
                onClick={() => handleEditRole(users)}
              >
                Modificar Rol
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;

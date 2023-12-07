import styles from "./Reservation.module.css";
import { useLocation } from "react-router-dom";
import { useAccount } from "../../Context/accountContext";
import { useEffect, useState } from "react";
import Card from "../Card/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import emailjs from '@emailjs/browser';

const Reservation = () => {
  //const { userData } = useAccount();
  window.scrollTo(0,0)
  const user = JSON.parse(localStorage.getItem("userData"));
  const userId = user ? user.id : null;
  const [formData, setFormData] = useState(null);
  const token = localStorage.getItem("token");

  const location = useLocation();
  const { instrumento } = location.state || {};
  const { start } = location.state || {};
  const { end } = location.state || {};
  const [disable, setDisable] = useState(false)

  console.log(instrumento);

  const onInputChange = (e) => {
    const { value } = e.target;
  };

  const onReservation = async (e) => {
    console.log(userId);
    e.preventDefault();
    setFormData({
      user: {
        id: userId,
      },
      product: {
        id: instrumento.id,
      },
      startDate: start,
      returnDate: end,
    });
    setDisable(true);
  };

  useEffect(() => {
    if (formData != null) {
      const fetchProductRent = async () => {
        const url = `http://localhost:8090/reservation/agregar`;
        const settings = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        };
        try {
          const response = await fetch(url, settings);
          if (response.status == 200) {
            
            // sendConfirmationEmail();
            Swal.fire({
              text: "Se reservo el instrumento",
              icon: "success",
            });
          } else {
            Swal.fire({
              text: "no se pudo reservar",
              icon: "error",
            });
          }
        } catch (error) {
          console.log("Error: ", error);
        }
      };
      fetchProductRent();
    }
  }, [formData]);

  // console.log(instrumento.caracteristicas);
  // console.log(instrumento.categorias);

  return (
    <>
      <form className={styles.form} onSubmit={onReservation}>
        <h2 className={styles.title}>Reservar</h2>

        <div className={styles.all}>
          <div className={styles.imput}>
            <div>
              <label
              className="datos" htmlFor="name">
                Nombre
              </label>
              <input
                type="name"
                name="name"
                id="name"
                className={styles.input}
                value={user.name}
                onChange={(e) => {
                  onInputChange(e);
                }}
                disabled
                required
                autoComplete="off"
                placeholder="Nombre"
              />
            </div>

            <div>
              <label htmlFor="lastname"
              className="datos">
              Apellido
              </label>
              <input
                type="lastname"
                name="lastname"
                id="lastname"
                className={styles.input}
                value={user.lastname}
                onChange={(e) => {
                  onInputChange(e);
                }}
                disabled
                required
                autoComplete="off"
                placeholder="Apellido"
              />
            </div>

            <div>
              <label className="datos" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={styles.input}
                value={user.email}
                onChange={(e) => {
                  onInputChange(e);
                }}
                disabled
                required
                autoComplete="off"
                placeholder="Email"
              />
            </div>

            <div>
              <label className="datos" htmlFor="periodoAlq">
                Fecha de Reserva
              </label>
              <input
                type="periodoAlq"
                name="periodoAlq"
                id="periodoAlq"
                className={styles.input}
                value={start + " , " + end}
                onChange={(e) => {
                  onInputChange(e);
                }}
                disabled
                required
                autoComplete="off"
                placeholder=" "
              />
            </div>
          </div>

          <div>
            <div className={styles.card}>
              <div className={styles.imgUrl}>
                <img
                  className={styles.img}
                  src={instrumento.imgUrl}
                  alt={instrumento.name}
                />
              </div>
              <div className={styles.title}>
                <h3>{instrumento.name}</h3>
              </div>
              <div>
                <h5 className={styles.brand}>{instrumento.brand}</h5>
                <p className={styles.description}>{instrumento.description}</p>
                <h3 className={styles.titleCategorias}>Categorias</h3>
                <ul className={styles.categorias}>
                  {instrumento.categories.map((categories) => (
                    <li key={categories.id}>{categories.name}</li>
                  ))}
                </ul>
                <h3 className={styles.titleCaracteristicas}>Caracteristicas</h3>
                <ul className={styles.caracteristicas}>
                  {instrumento.characteristics.map((characteristics) => (
                    <li key={characteristics.id}>{characteristics.title}</li>
                  ))}
                </ul>
              </div>

              <div>
                <div className={styles.price}>
                  <span>Precio</span>
                  <p>${instrumento.price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className={`${styles.btn} ${disable ? styles['btn-disabled'] : ''}`} disabled={disable}>
      Reservar
    </button>
      </form>
    </>
  );
};

export default Reservation;

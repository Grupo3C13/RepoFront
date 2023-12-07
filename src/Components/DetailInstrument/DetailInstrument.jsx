import React, { useState, useContext, useEffect } from "react";
import InstrumentChar from "../InstrumentsChar/InstrumentChar";
import styles from "./DetailInstrument.module.css";
import Calendar from "react-multi-date-picker";
import Swal from 'sweetalert2'
import SharePopup from "./SharePopup";
import { GlobalContext } from "../../Context/globalContext";
import stylesM from "./Modal.module.css";
import Policies from "../Policies/Policies";
import ShowReservation from "./ShowReservation";
import GenerateDates from "./GenerateDates";
import Modal from "./ModalShare";

import { useNavigate, useLocation } from "react-router-dom";

function DetailInstrument({ id }) {

  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupShare, setShowPopupShare] = useState(false);
  const [modal, setModal] = useState(false);
  const [actualImage, setActualImage] = useState(0);
  const {fetchProductsById } = useContext(GlobalContext);
  const [product, setProduct] = useState(null);
  const [values, setValues] = useState([]);
  const [bookedDate, setDate] = useState([]);
  const [bookInstrument, setBookInstrument] = useState([])
  const [endDate, setEndDate] = useState("")
  const [startDate, setStartDate] = useState("")
  const [notAvailable, setNotAvailable] = useState(false)
  
  const navigate = useNavigate();
  const location = useLocation();
  const today = new Date().getDate();
  console.log(today);

  
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [shareData, setShareData] = useState({
    title: "",
    description: "",
    image: "",
    link: `https://localhost:8090/products/${id}`,
  });

  const toggleModal = () => {
    setModal(!modal);
    setShowPopup(!showPopup);
  };

  const toggleGalleryModal = () => {
    setShowGalleryModal(!showGalleryModal);
    setShowPopup(!showPopup);
  };

  const toggleShareModal = () => {
    setShowShareModal(!showShareModal);
    setShowPopupShare(true);
  };

  const nextImage = () => {
    setActualImage((actualImage + 1) % product.listImgUrl.length);
  };

  const backImage = () => {
    setActualImage((actualImage - 1 + product.listImgUrl.length) % product.listImgUrl.length);
  };

  useEffect(() => {
    if (location.state != null) {
      setValues([location.state.start, location.state.end]);
    }
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      const productsData = await fetchProductsById(id);
      setProduct(productsData);
      setShareData({
        name: productsData.name,
        description: productsData.description,
        image: productsData.listImgUrl[0],
        link: `https://localhost:8090/products/${id}`,
      });
    };
    getProduct();
  }, [id, fetchProductsById]);


  const getDates = (datos) => {
    setDate(datos);
  };

  const getProductBooking = (datos) => {
    setBookInstrument(datos);
  };

  const HandleBooking = (reserva) => {
    if (reserva.length !== 0) {
      setEndDate(reserva[0].returnDate);
      setStartDate(reserva[0].startDate);
    }
  }

  useEffect(() => {
    HandleBooking(bookInstrument)
  }, [bookInstrument])

  useEffect(()=>{
    console.log(values)
    console.log(bookedDate)
    setNotAvailable(validarFechaReservada(values[0],values[1],bookedDate))

  },[values])

  useEffect(()=>{
if(notAvailable){
      Swal.fire({
        position: "top-end",
        text: "Fecha no Disponible",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  },[notAvailable])


  const validarFechaReservada=(start, end, bookedDate)=>{
    for(let i=0; i<bookedDate.length;i++){
      if(bookedDate[i]>=start&&bookedDate[i]<=end){
        return true
      }
    }
    return false
  }


  const handleShareClick = () => {
    setShowPopupShare(true);
    setModal(true);
  };


  const handlereservation = (e) => {
    console.log(values);
    if (values.length > 1 && values[0] != "") {
      e.preventDefault();
      console.log(product);
      const start = values.toString().split(",")[0];
      const end = values.toString().split(",")[1];

      if (userData) {
        navigate("/reservation", {
          replace: true,
          state: {
            instrumento: product,
            logged: true,
            start: start,
            end: end,
          },
        });
      } else {
        navigate("/auth/login", {
          state: {
            msg: "Debes iniciar sesion primero",
          },
        });
      }

      console.log("adentro handle");
    } else {
      Swal.fire({
        position: "top-end",
        text: "Selecciona la fecha deseada",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const clearCalendar = () => {
    setValues([]);
  };

  return (
    <div>
      {product != null ? (
        <>
          <div className={styles.detailcontainer}>
              <button
              className={styles.btnAtras}
              onClick={() => window.history.back()}
            >
              Atras
            </button>
            <div className={styles.instrumentcontainer}>
              <div className={styles.section}>
                <div className={styles.instrument}>
                  <img
                    className={styles.mainimg}
                    src={product.listImgUrl[0]}
                    alt={product.name}
                  />
                </div>
                <div className={styles.galeria}>
                  {product.listImgUrl.slice(1, 5).map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`${product.name} - Imagen ${index + 1}`}
                      className={index === actualImage ? styles.active : ""}
                    />
                  ))}
                </div>
              </div>

              <button className={styles.btnVer} onClick={toggleGalleryModal}>
                Ver mas
              </button>

              {showGalleryModal && (
                <div className={stylesM.modal}>
                  <div onClick={toggleModal} className={stylesM.overlay}></div>
                  <div className={stylesM.modalcontent}>
                    <div
                      className={
                        stylesM.carrusel
                      }
                    >
                      <button
                        className={stylesM.btnBack}
                        onClick={backImage}
                      >
                        &lt;
                      </button>
                      <img
                        className={stylesM.imagenCarrusel}
                        src={product.listImgUrl[actualImage]}
                        alt={product.name}
                      />

                      <button
                        className={stylesM.btnNext}
                        onClick={nextImage}
                      >
                        &gt;
                      </button>
                    </div>
                    <button
                      className={stylesM.closemodal}
                      onClick={toggleGalleryModal}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              )} 
            </div>
           
            <label className={styles.dispo}>Disponibilidad</label>
            <ShowReservation id={id} getProductBooking={getProductBooking}></ShowReservation>
            <div className={styles.calendarioBtn}>
              <Calendar
              
              placeholder="Seleccione fechas"
              format="YYYY-MM-DD"
              value={values}
              onChange={setValues}
              range
              highlightToday={false}
              numberOfMonths={2}
              mapDays={({ date, isSameDate }) => {
                let props = {};
                bookedDate.map(fecha => {
                  if (isSameDate(fecha, date)) {
                    props.disabled = true;
                      props.style = {
                      ...props.style,
                      color: "white",
                      backgroundColor: "#623cea",
                      fontWeight: "bold",
                    };
                      props.onClick = () => {
                        Swal.fire({
                        position: "top-end",
                        text: "No esta Disponible",
                        icon: "error",
                        showConfirmButton: false,
                        timer: 3000,
                      });
                    }
                  }
                })

                return props;
              }}
            />
       <button
    className="btnRese"
    type="submit"
    style={{
    backgroundColor: "blue",
    color: "white",
    margin: 10,
    border: "1px solid #fff",
    borderRadius: "10px",
    padding: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  }}
  onClick={handlereservation}
>
  Reservar
</button>
                <button className={styles.borrarButton}   style={{
    backgroundColor: "red",
    color: "white",
    margin: 10,
    border: "1px solid #fff",
    borderRadius: "10px",
    padding: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  }} onClick={clearCalendar}>
                  Borrar
                </button>
              </div>
            </div>

            <GenerateDates startDate={startDate} endDate={endDate} reservas={bookInstrument} getDates={getDates} />
            <div className={styles.sectionDetalles}>
              <div className={styles.titles}>
                <h1 className={styles.instrumenth1}>{product.name}</h1>
                <p className={styles.instrumentp}>{product.brand}</p>
                <p className={styles.instrumentp}>{product.description}</p>
              </div>
         
              {/* <button className={styles.customButton} onClick={toggleShareModal}>
                <FaShare className={styles.shareIcon} />
                <span style={{ fontSize: '25px', fontWeight: 'italic' ,marginLeft: '5px' }}>Compartir</span>
                
              </button> */}


              {showShareModal && (
                <Modal onClose={() => setShowShareModal(false)}>
                  {showPopupShare && (
                    <SharePopup shareData={shareData} onClose={() => setShowPopupShare(false)} />
                  )}
                </Modal>
              )}
              {console.log('Instrumento: ' + shareData.name)}
              {console.log('Instrumento: ' + shareData.description)}
            </div>
            {product.categories ? (
              <div>
                <h4 className={styles.categ}>Categorias</h4>
                <ul className="listaCateg">
                  {product.categories.map((category, index) => (
                    <li className={styles.listaIcon} key={index}>
                      <p className={styles.pCat}>{category.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <InstrumentChar id={id} />
          <div>
            <Policies />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default DetailInstrument;

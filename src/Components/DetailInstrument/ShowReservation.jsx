import { useEffect, useState } from "react"

function ShowReservation({id, getProductBooking}){

    const API_URL= import.meta.env.VITE_API_URL
    const url = `http://localhost:8090/reservation/product/${id}`;
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [reservation, setReservation] = useState([])

    const fetchAvailable = async () => {
        const settings = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            }
          };
        try {
          const response = await fetch(url,settings);
          if (!response.ok) {
            throw new Error("No existe reserva.");
          }
          const data = await response.json();
          setReservation(data);
        } catch (error) {
          console.error("Error:", error);
        }
      };

    useEffect(()=>{
        fetchAvailable()

    },[])

    useEffect(()=>{
        getProductBooking(reservation)
    },[reservation])

    return(
        <>
        </>
    )
}
export default ShowReservation
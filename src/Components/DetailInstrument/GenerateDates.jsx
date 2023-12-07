import React, { useState, useEffect } from 'react';
import DateObject from 'react-date-object';

const GenerateDates = ({ startDate, endDate, reservas, getDates}) => {
 const [dates, setDates] = useState([]);
 console.log(reservas)
 

 useEffect(() => {
    let newDates = [];
    reservas.map((reserva)=>{
        let currentDate = new Date(reserva.startDate);
        let finishDate = new Date(reserva.returnDate)
        finishDate.setDate(finishDate.getDate())
        currentDate.setDate(currentDate.getDate())
        while (currentDate <= finishDate) {
            const formattedDate = `${currentDate.getFullYear()}-${
                currentDate.getMonth() + 1
            }-${currentDate.getDate()}`;  
        newDates.push(new DateObject(formattedDate));
        currentDate.setDate(currentDate.getDate()+1);
        }
        setDates(newDates);
    })
    
}, [reservas]);

useEffect(()=>{
     getDates(dates)

 },[dates])

 return (
    <></>
 );
};

export default GenerateDates;
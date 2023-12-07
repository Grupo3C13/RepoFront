import "./Policies.modules.css";



    export function Policies(){

        return(
            <>
            <h3 className="pol-title">Políticas del Producto</h3>
            <div className="politicas">
                <div className="pol-par">
                <h4>Politica de alquiler</h4>
                <p>La formalizacion del contrato de alquiler se llevara a cabo personal y fisicamente en el lugar indicado por Nota Segura.</p>
                </div>
                <div className="pol-par">
                <h4>Politica de cambio</h4>
                <p>Para cualquier cambio, reparación o devolución del instrumento deberás dirigirte al mismo lugar donde lo alquilaste.</p>
                </div>
                <div className="pol-par">
                <h4>Politica de cancelación</h4>
                <p>El tiempo de cancelación es de una semana antes de la fecha de reserva. En caso de no poder avisar con la debida antelación, se cobrará un recargo del 10% sobre el precio del alquiler.</p>
                </div>
            </div>
    </>
    )
    }




export default Policies;
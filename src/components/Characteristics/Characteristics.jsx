//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ico_marca from '../images/flag-solid.svg'
import ico_modelo from '../images/asterisk-solid.svg'
import ico_electrico from '../images/bolt-solid.svg'
import ico_protector from '../images/gift-solid.svg'
import '../components/Characteristics.modules.css'

export function Caracteristicas(marca, modelo, electrico, protector){

    return(
        <div className='characteristics'>
           <h4>Características</h4>
           <img src={ico_marca} alt="" />
           <p>Marca:</p>
           <p>{marca}</p>
           <img src={ico_modelo} alt="" />
           <p>Modelo:</p>
           <p>{modelo}</p>
           <img src={ico_electrico} alt="" />
           <p>Está en stock:</p>
           <p>{electrico}</p>
           {/* <img src={ico_protector} alt="" />
           <p>Tiene protector:</p>
           <p>{protector}</p> */}
        </div>
    )
}
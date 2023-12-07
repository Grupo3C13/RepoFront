import { Link } from 'react-router-dom'
import { routes } from '../../Utils/routes.js'
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faYoutube, faXTwitter } from '@fortawesome/free-brands-svg-icons';



const Footer = () => {

    return (
        <footer>
            <div className='footer-container'>
                <div className='footer-left'>
                    <img className='logo-footer'
                        style={{
                            width: "150px",
                        }}
                        src= "src\assets\notas.svg" alt="Logo" />
                    {}
                    <p className='copyright'>Copyright:</p>
                    <p className='copyright'>&copy; {new Date().getFullYear()} NotaSegura- Grupo3</p>
                </div>
                <div className='footer-mid'>
                </div>
                <div className='footer-right'>
                    <ul>
                        <li className="item">
                            <a href="https://x.com" target="_blank">
                                <FontAwesomeIcon className='icon' icon={faXTwitter} />
                            </a>
                        </li>
                        <li className="item">
                            <a href="https://www.facebook.com" target="_blank">
                                <FontAwesomeIcon className='icon' icon={faFacebook} />
                            </a>
                        </li>
                        <li className="item">
                            <a href="https://www.youtube.com" target="_blank">
                                <FontAwesomeIcon className='icon' icon={faYoutube} />
                            </a>
                        </li>
                        <li className="item">
                            <a href="https://www.instagram.com/" target="_blank">
                                <FontAwesomeIcon className='icon' icon={faInstagram} />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
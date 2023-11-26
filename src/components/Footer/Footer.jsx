import "../../components/Footer/Footer.modules.css";
import face from "../../images/ico-facebook.png";
import ig from "../../images/ico-instagram.png";
import ln from "../../images/ico-linkedin.png";
import tw from "../../images/ico-twitter.png";

export function Footer() {
  return (
    <footer>
      <div>
        <small>© 2023 - Nota Segura - Alquiler de Instrumentos Musicales</small>
      </div>
      <div className="images">
        <a className="button-class" href="https://www.facebook.com/">
          <img src={face} alt="Facebook" />
        </a>
        <a className="button-class" href="https://www.instagram.com/">
          <img src={ig} alt="Instagram" />
        </a>
        <a className="button-class" href="https://www.linkedin.com/">
          <img src={ln} alt="Linkedin" />
        </a>
        <a className="button-class" href="https://twitter.com/">
          <img src={tw} alt="Twitter" />
        </a>
      </div>
    </footer>
  );
}

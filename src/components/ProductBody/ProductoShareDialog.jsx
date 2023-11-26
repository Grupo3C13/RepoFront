import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const ProductShareDialog = ({ product }) => {
  const [selectedSocialNetwork, setSelectedSocialNetwork] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Carga la imagen del producto
    // const imageUrl = product.images[0].url;
    setSelectedSocialNetwork("");
    setMessage("");
  }, [product]);

  const onShare = () => {
    // Redirige o se integra con la API de la red social seleccionada
    switch (selectedSocialNetwork) {
      case "facebook":
        // Abre una nueva pestaña en el navegador con el producto compartido en Facebook
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${product.url}`,
          "_blank"
        );
        break;
      case "twitter":
        // Abre una nueva pestaña en el navegador con el producto compartido en Twitter
        window.open(
          `https://twitter.com/intent/tweet?text=${message}&url=${product.url}`,
          "_blank"
        );
        break;
      case "instagram":
        // Abre una nueva pestaña en el navegador con el producto compartido en Instagram
        window.open(
          `https://www.instagram.com/?url=${product.url}`,
          "_blank"
        );
        break;
    }
  };

  return (
    <div className="product-share-dialog">
      <h2>Compartir producto</h2>
      <div className="product-share-image">
        {/* <img src={imageUrl} alt="Imagen del producto" /> */}
      </div>
      <div className="product-share-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <Link to={product.url}>Ver producto</Link>
      </div>
      <div className="product-share-options">
        <div className="product-share-option">
          <FaFacebook />
          <input type="radio" name="socialNetwork" value="facebook" checked={selectedSocialNetwork === "facebook"} onChange={() => setSelectedSocialNetwork("facebook")} />
        </div>
        <div className="product-share-option">
          <FaTwitter />
          <input type="radio" name="socialNetwork" value="twitter" checked={selectedSocialNetwork === "twitter"} onChange={() => setSelectedSocialNetwork("twitter")} />
        </div>
        <div className="product-share-option">
          <FaInstagram />
          <input type="radio" name="socialNetwork" value="instagram" checked={selectedSocialNetwork === "instagram"} onChange={() => setSelectedSocialNetwork("instagram")} />
        </div>
      </div>
      <div className="product-share-message">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button onClick={onShare}>Compartir</button>
    </div>
  );
};

export default ProductShareDialog;

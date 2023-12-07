import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../Context/globalContext";
import style from "./ReviewList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";

function ReviewList({ id }) {
  const productId = id;

  const { fetchGetReview, reviewList } = useContext(GlobalContext);

  useEffect(() => {
    fetchGetReview(productId);
  }, [productId]);

  const renderReview = (listaMap) => {
    return listaMap.map((review) => (
      <li key={review.id}>
        <div>
          <h3>
            {review.users.name} {review.users.lastname}
          </h3>
          <div>
            <span>{review.puntuacion}</span>
            <FontAwesomeIcon icon={faStarSolid} className={style.starIcon} />
          </div>
        </div>
        <p>{review.comentario}</p>
        <p>{review.reviewDate.split("T")[0]}</p>
      </li>
    ));
  };

  return (
    <section className={style.reviewListection}>
      <h2>Reviews:</h2>
      <ul className={style.reviewList}>
        {reviewList.length > 0 ? (
          renderReview(reviewList)
        ) : (
          <p>Sin Reviews</p>
        )}
      </ul>
    </section>
  );
}
export default ReviewList;

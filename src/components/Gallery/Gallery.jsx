/* eslint-disable react/prop-types */
import "../../components/Gallery/Gallery.modules.css";

export function Gallery({ img_src }) {
  return (
    <>
      <div className="image-block">
        <img src={img_src} alt="" />
        <div className="image-grid">
          {/* <div className="image item1">
            <img src={img_src} alt="" />
          </div> */}
          <div className="image">
            <img src={img_src} alt="" />
          </div>
          <div className="image">
            <img src={img_src} alt="" />
          </div>
          <div className="image">
            <img src={img_src} alt="" />
          </div>
          <div className="image">
            <img src={img_src} alt="" />
          </div>
        </div>
      </div>
      <p className="link">Ver más</p>
    </>
  );
}

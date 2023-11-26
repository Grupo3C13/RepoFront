import Sidebar from "../../components/SideBar/Sidebar";
import "../PanelAdmin/PanelAdmin.modules.css";

export function PanelAdmin() {
  return (
    <>
      <div className="menu">
        <Sidebar />
      </div>
      <div className="mensaje-de-advertencia">
        <p>
          Este panel no está optimizado para pantallas de tamaño pequeño. Por
          favor, utiliza una pantalla de tamaño medio o superior.
        </p>
      </div>
    </>
  );
}

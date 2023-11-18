import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { CategoryDetail } from "./routes/CategoryDetail";
import {ProductDetail} from "./routes/ProductDetail";
import { Home } from "./routes/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PanelAdmin } from "./routes/PanelAdmin";
import { ProductList } from "./routes/ProductList";
import { ProductAdd } from "./routes/ProductAdd";
import { CharacteristicList } from "./routes/CharacteristicList";
import { Login } from "./routes/Login";
import { Registro } from "./routes/Registro";
import {CategoryList} from "./routes/CategoryList";
//import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/registro" element={<Registro/>}/>
        <Route path="/categoria/:id" element={<CategoryDetail/>}/>
        <Route path="/producto/:id" element={<ProductDetail/>}/>
        <Route path="/administracion" element={<PanelAdmin />}/>
        <Route path="/administracion/listaproductos" element={<ProductList/>}/> 
        <Route path="/administracion/agregarproducto" element={<ProductAdd/>}/>
        <Route path="/administracion/listarcaracteristicas" element={<CharacteristicList />}/>
        <Route path="/administracion/listarcategorias" element={<CategoryList />}/>
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

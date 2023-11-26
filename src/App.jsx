import {Footer} from './components/Footer/Footer';
import { Header } from "./components/Header/Header";
import { CategoryDetail } from "./routes/Category/CategoryDetail";
import {ProductDetail} from "./routes/ProductDetail/ProductDetail";
import { Home } from "./routes/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PanelAdmin } from "./routes/PanelAdmin/PanelAdmin";
import { ProductList } from "./routes/ProductList/ProductList";
import { ProductAdd } from "./routes/ProductAdd/ProductAdd";
import { CharacteristicList } from "./routes/CharacteristicList/CharacteristicList";
import { Login } from "./routes/LogIn/Login";
import { Registro } from "./routes/LogIn/Registro";
import {CategoryList} from "./routes/Category/CategoryList";
//import { AccountProvider } from './components/Context/accountContext';
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

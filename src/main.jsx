import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { AccountProvider } from './Context/accountContext.jsx';
import { InstrumentProvider }  from "./Context/globalContext.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AccountProvider>
      <InstrumentProvider>
        <App />
      </InstrumentProvider>
    </AccountProvider>
  </BrowserRouter>
);

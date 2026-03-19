import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from 'react-redux'
import { store } from './Redux/Store.js'
import "@sajanm/nepali-date-picker/dist/nepali.datepicker.v5.0.6.min.css"
import "@sajanm/nepali-date-picker/dist/nepali.datepicker.v5.0.6.min.js"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)

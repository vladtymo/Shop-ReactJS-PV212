import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { ProductsProvider } from './contexts/products.context.jsx'

createRoot(document.getElementById('root')).render(
  <ProductsProvider>
    <BrowserRouter>
      {/* <StrictMode> */}
      <App />
      {/* </StrictMode> */}
    </BrowserRouter>
  </ProductsProvider>
)

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import Home from "./pages/Home"
import ProductsList from "./pages/ProductsList"
import ProductsDetail from "./pages/ProductsDetail"
import SalesList from "./pages/SalesList"
import SalesCreate from "./pages/SalesCreate"
import SalesDetail from "./pages/SalesDetail"
import { SalesProvider } from "./context/SalesProvider"

const App = () => {
  return (
    <BrowserRouter>
      <SalesProvider>  
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="products" element={<ProductsList />} />
            <Route path="products/:id" element={<ProductsDetail />} />
            <Route path="sales" element={<SalesList />} />
            <Route path="sales/new" element={<SalesCreate />} />
            <Route path="sales/:id" element={<SalesDetail />} />
          </Route>
        </Routes>
      </SalesProvider>
    </BrowserRouter>
  )
}

export default App

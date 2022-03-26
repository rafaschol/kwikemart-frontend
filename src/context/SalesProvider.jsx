import { useState, useEffect, createContext } from "react"

const SalesContext = createContext()

const SalesProvider = ({children}) => {

  const [products, setProducts] = useState({})
  const [sales, setSales] = useState([])
  const [loadingProvider, setLoadingProvider] = useState(true)

  const updateProducts = async () => {
    setLoadingProvider(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
      const data = await response.json()

      const productsObject = data.reduce((result, product) => {
        result[product._id] = product
        return result
      }, {})
      setProducts(productsObject)
    } catch (error) {
      console.log(error)
    }
    setLoadingProvider(false)
  }

  const updateSales = async () => {
    setLoadingProvider(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sales`)
      const data = await response.json()
      setSales(data)
    } catch (error) {
      console.log(error)
    }
    setLoadingProvider(false)
  }

  useEffect(() => {    
    updateProducts()
    updateSales()
  }, [])

  return (
    <SalesContext.Provider
      value={{
        products,
        sales,
        updateProducts,
        updateSales,
        loadingProvider
      }}
    >
      {children}
    </SalesContext.Provider>
  )
}

export { SalesProvider }
export default SalesContext
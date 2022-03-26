import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useSales from "../hooks/useSales"
import SaleItem from "../components/SaleItem"
import Spinner from "../components/Spinner"
import { formatDate, formatCurrency } from "../helpers"
import styles from "../styles/SalesDetail.module.css"

const SalesDetail = () => {

  const { id } = useParams()

  const [sale, setSale] = useState({})
  const [loading, setLoading] = useState(false)

  const { loadingProvider } = useSales()

  useEffect(() => {
    const fetchSale = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sales/${id}`)
        const data = await response.json()
        setSale(data)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }

    fetchSale()
  }, [])

  return (
    <>
    {(loading || loadingProvider) ? <Spinner /> : (
      <>
        {sale._id ? (
          <>
            <h2 className="heading">Sale info</h2>

            {sale._id && (
              <>
                <div className={styles.generalInfo}>
                  <p>Date: <span>{formatDate(sale.createdAt)}</span></p>
                  <p>Total: <span>{formatCurrency(sale.total)}</span></p>
                </div>
      
                <ul className={styles.list}>
                  {sale.saleItems.map(saleItem =>
                    <SaleItem
                      key={saleItem.productId}
                      saleItem={saleItem}
                    />
                  )}
                </ul>
              </>
            )}
          </>
        ) : (
          <h2 className="heading">Sale not found</h2>
        )}
        
      </>
    )}
    </>
  )
}

export default SalesDetail
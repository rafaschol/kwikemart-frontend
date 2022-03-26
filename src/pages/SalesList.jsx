import { useState } from "react"
import { Link } from "react-router-dom"
import useSales from "../hooks/useSales"
import Alert from "../components/Alert"
import { formatDate, formatCurrency } from "../helpers"
import Spinner from "../components/Spinner"
import styles from "../styles/SalesList.module.css"

const SalesList = () => {

  const [alert, setAlert] = useState({ alert: false })
  const [loading, setLoading] = useState(false)

  const { sales, updateSales, loadingProvider } = useSales()

  const handleDeleteSale = async saleId => {
    setLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sales/${saleId}`, {method: "DELETE"})
      const { message } = await response.json()
      await updateSales()
      setAlert({ alert: true, message, type: "success" })
    } catch (error) {
      console.log(error)
      setAlert({ alert: true, message: "Error while deleting the Sale", type: "error" })
    }
    setLoading(false)
  }

  return (
    <>
    {(loading || loadingProvider) ? <Spinner /> : (
      <>
        {alert.alert && <Alert alert={alert} setAlert={setAlert} />}

        <h2 className="heading">Sales</h2>

        <Link
          to="/sales/new"
          className={styles.newSaleButton}
        >New sale</Link>

        {sales.length > 0 ? (
          <>
            <table className={styles.table}>
              <thead>
                <tr className={styles.element}>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Details</th>
                </tr>
              </thead>

              <tbody>
                {sales.map(sale => (
                  <tr key={sale._id} className={styles.element}>
                    <td>{formatDate(sale.createdAt)}</td>
                    <td>{formatCurrency(sale.total)}</td>
                    <td><Link to={`/sales/${sale._id}`}>Details</Link></td>
                    <td>
                      <button
                        className={styles.deleteSaleButton}
                        onClick={() => handleDeleteSale(sale._id)}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p className="pageInfo">There's nothing to show... start creating a sale</p>
        )}
        
      </>
    )}
    </>
  )
}

export default SalesList
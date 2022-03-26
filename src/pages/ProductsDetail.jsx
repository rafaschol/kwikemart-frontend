import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useSales from "../hooks/useSales"
import Alert from "../components/Alert"
import Spinner from "../components/Spinner"
import styles from "../styles/ProductsDetail.module.css"

const ProductsDetail = () => {

  const { id } = useParams()

  const [product, setProduct] = useState({})
  const [editing, setEditing] = useState(false)
  const [price, setPrice] = useState(0)
  const [currentStock, setCurrentStock] = useState(0)
  const [alert, setAlert] = useState({ alert: false })
  const [loading, setLoading] = useState(false)

  const { updateProducts, loadingProvider } = useSales()

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`)
        const data = await response.json()
        setProduct(data)
        setPrice(data.price)
        setCurrentStock(data.currentStock)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }

    fetchProduct()
  }, [])

  const handleEditButton = async () => {
    if (editing) {
      setLoading(true)
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${product._id}`, {
          method: "PUT",
          body: JSON.stringify({price, currentStock}),
          headers: {
            "Content-Type": "application/json"
          }
        })
        const { message } = await response.json()
        await updateProducts()
        setAlert({ alert: true, message, type: "success" })
      } catch (error) {
        console.log(error)
        setAlert({ alert: true, message: "Error while updating the Product", type: "error" })
      }
      setLoading(false)
    }

    setEditing(!editing)
  }

  return (
    <>
      {(loading || loadingProvider) ? (
        <Spinner />
      ) : (
        <>
        {product._id ? (
          <>
            {alert.alert && <Alert alert={alert} setAlert={setAlert} /> }
  
            <h2 className="heading">Product info</h2>
  
            {product._id && (
              <div className={styles.productDetailContainer}>
                <img src={product.image} alt={product.name} />
  
                <div className={styles.productInfo}>
                  <p className={styles.name}>{product.name}</p>
  
                  <form className={styles.productForm}>
                    <div>
                      <label htmlFor="price">Price: $</label>
                      {editing ? (
                        <input
                          type="number"
                          name="price"
                          id="price"
                          min={0.01}
                          step={0.01}
                          className={`${styles.price} ${styles.editing}`}
                          value={price}
                          onChange={e => setPrice(parseFloat(e.target.value))}
                        />
                      ) : (
                        <input
                          type="number"
                          name="price"
                          id="price"
                          value={price}
                          readOnly={true}
                        />
                      )}
                    </div>
  
                    <div>
                      <label htmlFor="price">Current stock: </label>
                      {editing ? (
                        <input
                          type="number"
                          name="stock"
                          id="stock"
                          min={0}
                          className={`${styles.stock} ${styles.editing}`}
                          value={currentStock}
                          onChange={e => setCurrentStock(parseInt(e.target.value))}
                        />
                      ) : (
                        <input
                          type="number"
                          name="stock"
                          id="stock"
                          value={currentStock}
                          readOnly={true}
                        />
                      )}
                    </div>
                  </form>
  
                  <button
                    className={styles.editButton}
                    onClick={handleEditButton}
                  >{editing ? "Save" : "Edit product"}</button>
  
                </div>
              </div>
            )}
          </>
        ) : (
          <h2 className="heading">Product not found</h2>
        )}
        </>
      )}
    </>
  )
}

export default ProductsDetail
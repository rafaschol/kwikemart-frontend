import { useState, useEffect } from "react"
import useSales from "../hooks/useSales"
import Modal from "../components/Modal"
import Error from "../components/Error"
import Alert from "../components/Alert"
import SaleItem from "../components/SaleItem"
import Spinner from "../components/Spinner"
import styles from "../styles/SalesCreate.module.css"

const SalesCreate = () => {

  const [modal, setModal] = useState(false)
  const [currentSale, setCurrentSale] = useState([])
  const [item, setItem] = useState({ productId: "", quantity: 1 })
  const [error, setError] = useState("")
  const [alert, setAlert] = useState({ alert: false })
  const [loading, setLoading] = useState(false)
  
  const { products, updateSales, loadingProvider } = useSales()

  useEffect(() => {
    const currentSaleLS = JSON.parse(localStorage.getItem("currentSale") ?? [])
    setCurrentSale(currentSaleLS)
  }, [])

  useEffect(() => {
    localStorage.setItem("currentSale", JSON.stringify(currentSale))
  }, [currentSale])

  const handleAddItem = e => {
    e.preventDefault()

    if (!item.productId) {
      setError("Product cannot be empty")
      return
    }

    if (currentSale.some(saleItem => saleItem.productId === item.productId)) {
      const updatedCurrentSale = currentSale.map(
        saleItem => saleItem.productId === item.productId ? {...saleItem, quantity: saleItem.quantity + parseInt(item.quantity) } : saleItem
      )
      setCurrentSale(updatedCurrentSale)
    } else {
      setCurrentSale([...currentSale, item])
    }

    setError("")
    setItem({ productId: "", quantity: 1 })
    setModal(false)
  }

  const handleChangeItemQuantity = (productId, newQuantity) => {
    const updatedCurrentSale = currentSale.map(saleItem => saleItem.productId === productId ? {...saleItem, quantity: newQuantity} : saleItem)
    setCurrentSale(updatedCurrentSale)
  }

  const handleDeleteItemFromSale = productId => {
    const updatedCurrentSale = currentSale.filter(saleItem => saleItem.productId !== productId)
    setCurrentSale(updatedCurrentSale)
  }

  const handleCreateSale = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sales`, {
        method: "POST",
        body: JSON.stringify({saleItems: currentSale}),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const { message } = await response.json()
      if (!response.ok) {
        setAlert({ alert: true, message, type: "error" })
        return
      }

      await updateSales()
      setAlert({ alert: true, message, type: "success" })
      setCurrentSale([])
    } catch (error) {
      setAlert({ alert: true, message: "Error while creating the Sale", type: "error" })
    }
    setLoading(false)
  }

  return (
    <>
    {(loading || loadingProvider) ? <Spinner /> : (
      <>
      {alert.alert && <Alert alert={alert} setAlert={setAlert} />}

      <h2 className="heading">New sale</h2>

      <button
        className={styles.addItem}
        onClick={() => setModal(true)}
      >Add item</button>

      {currentSale.length > 0 ? (
        <>
          <ul className={styles.list}>

            {currentSale.map(saleItem => 
              <SaleItem
                key={saleItem.productId}
                saleItem={saleItem}
                handleChangeItemQuantity={handleChangeItemQuantity}
                handleDeleteItemFromSale={handleDeleteItemFromSale}
              />
            )}

            </ul>

            <button
              className={styles.createSaleButton}
              onClick={handleCreateSale}
            >
              Create sale
            </button>
        </>
      ) : (
        <p className="pageInfo">There's nothing to show... start adding products</p>
      )}

      {modal && (
        <Modal setModal={setModal} >
          <h4 className={styles.modalTitle}>Add item</h4>

          {error && (
            <Error message={error} />
          )}

          <form
            className={styles.addItemForm}
            onSubmit={handleAddItem}
          >
            <div>
              <label htmlFor="item">Product</label>
              <select
                name="productId"
                id="item"
                value={item.productId}
                onChange={e => setItem({...item, [e.target.name]: e.target.value})}
              >
                <option value="">Choose option</option>
                {Object.values(products).map(product => (
                  <option
                    key={product._id}
                    value={product._id}
                  >{product.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                min={1}
                value={item.quantity}
                onChange={e => setItem({...item, [e.target.name]: parseInt(e.target.value)})}
              />
            </div>

            <input
              type="submit"
              value="Add"
            />
          </form>
        </Modal>
      )}
      
    </>
    )}
    </>
  )
}

export default SalesCreate
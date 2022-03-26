import useSales from "../hooks/useSales"
import { formatCurrency } from "../helpers"
import styles from "../styles/SaleItem.module.css"

const SaleItem = ({ saleItem, handleChangeItemQuantity, handleDeleteItemFromSale }) => {

  const { products } = useSales()
  const product = products[saleItem.productId]

  if (!product) return null

  return (
    <li className={styles.element}>
      <img src={product.image} alt={product.name} />
      <div className={styles.productInfo}>
        <p className={styles.productName}>{product.name}</p>
          {handleChangeItemQuantity ? (
            <>
              <div className={styles.productQuantity}>
                <label htmlFor="quantity">Units </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  min={1}
                  value={saleItem.quantity}
                  onChange={e => handleChangeItemQuantity(product._id, parseInt(e.target.value))}
                />
              </div>
            </>
          ) : (
            <p className={styles.productPrice}>Units: <span>{saleItem.quantity}</span></p>
          )}
          
        <p className={styles.productPrice}>Unit price: <span>{formatCurrency(handleChangeItemQuantity ? product.price : saleItem.productPrice)}</span></p>
        <p className={styles.productPrice}>Subtotal: <span>{formatCurrency((handleChangeItemQuantity ? product.price : saleItem.productPrice) * saleItem.quantity)}</span></p>
        <p></p>
      </div>

      {handleDeleteItemFromSale && (
        <button
          className={styles.delete}
          onClick={() => handleDeleteItemFromSale(product._id)}
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      )}  
    </li>
  )
}

export default SaleItem
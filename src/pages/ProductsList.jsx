import { Link } from "react-router-dom"
import Spinner from "../components/Spinner"
import useSales from "../hooks/useSales"
import styles from "../styles/ProductsList.module.css"

const ProductsList = () => {

  const { products, loadingProvider } = useSales()

  return (
    <>
    {loadingProvider ? <Spinner /> : (
      <>
        <h2 className="heading">Products</h2>

        <ul className={styles.list}>

          {Object.values(products).map(product => (
            <Link key={product._id} to={`/products/${product._id}`}>
              <li className={styles.element}>
                <img src={product.image} alt={`${product.name}`} />
                <p>{ product.name }</p>
              </li>
            </Link>
          ))}

        </ul>
      </>
    )}
    </>
  )
}

export default ProductsList
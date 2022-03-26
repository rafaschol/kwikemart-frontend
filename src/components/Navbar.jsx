import { useState } from "react"
import { Link } from "react-router-dom"
import styles from "../styles/Navbar.module.css"

const Navbar = () => {

  const [collapsed, setCollapsed] = useState(true)

  return (
    <nav className={styles.navbar}>
      <div className={`${styles.menuItems}${collapsed ? ` ${styles.collapsed}` : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/sales">Sales</Link>
      </div>
      <button
        className={styles.menuButton}
        onClick={() => setCollapsed(!collapsed)}
      >
        <i className="fa-solid fa-bars" style={{ color: "#fff" }}></i>
      </button>
    </nav>
  )
}

export default Navbar
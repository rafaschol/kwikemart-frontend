import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import styles from "../styles/Layout.module.css"

const Layout = () => {
  return (
    <>
      <Navbar />

      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
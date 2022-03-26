import { useState, useEffect } from "react"
import styles from "../styles/Alert.module.css"

const Alert = ({alert, setAlert}) => {

  const [hidden, setHidden] = useState(true)
  
  useEffect(() => {
    setTimeout(() => {
      setHidden(false)
    }, 100)

    setTimeout(() => {
      dismissAlert()
    }, 5000)
  }, [])

  const dismissAlert = () => {
    setHidden(true)

    setTimeout(() => {
      setAlert({ alert: false })
    }, 1000)
  }

  return (
    <div className={`${styles.alert} ${alert.type === "success" ? styles.success : styles.error} ${hidden && styles.hidden}`}>
      {alert.message}

      <button
        className={styles.close}
        onClick={dismissAlert}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  )
}

export default Alert
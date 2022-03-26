import styles from "../styles/Error.module.css"

const Error = ({message}) => {
  return (
    <div className={styles.error}>
      {message}
    </div>
  )
}

export default Error
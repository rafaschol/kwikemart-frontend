import styles from "../styles/Modal.module.css"

const Modal = ({children, setModal}) => {
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modal}>
        {children}

        <button
          className={styles.close}
          onClick={() => setModal(false)}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  )
}

export default Modal
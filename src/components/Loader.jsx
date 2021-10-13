import styles from '../css_modules/Loader.module.css'

const Loader = ({ size }) => {
  return (
    <div className={!size ? styles.loading : styles.loadingS}>
      <div className={!size ? styles.loader : styles.loaderS} />
      {!size && <p>Loading...</p>}
    </div>
  )
}

export default Loader

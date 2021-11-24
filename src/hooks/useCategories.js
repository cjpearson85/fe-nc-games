import { useState, useEffect } from 'react'
import { getCategories } from '../api'

function useCategories() {
  const [categoriesLoaded, setCategoriesLoaded] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    setCategoriesLoaded(false)
    getCategories().then((categories) => {
      setCategories(categories)
      setCategoriesLoaded(true)
    })
  }, [])

  return {
    categoriesLoaded,
    categories,
  }
}

export default useCategories

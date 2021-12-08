import { useState, useCallback } from 'react'

function useToggle(initialValue = false) {
  const [state, setState] = useState(initialValue)

  const toggle = useCallback((event) => {
    setState((state) => !state)
  }, [])

  return [state, toggle]
}

export default useToggle

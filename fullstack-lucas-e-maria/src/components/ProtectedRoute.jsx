// src/components/ProtectedRoute.tsx
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://localhost:8000';

export function ProtectedRoute({ children }) {
  const [isValid, setIsValid] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return setIsValid(false)

    fetch(`${API_BASE_URL}/login/validate-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Token inválido")
        return res.json()
      })
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false))
  }, [])

  if (isValid === null) return null // ou loading
  if (!isValid) return <Navigate to="/login" replace />
  return children
}

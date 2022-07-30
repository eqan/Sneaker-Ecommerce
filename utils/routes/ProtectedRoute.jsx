import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("access_token");
  return (
      isAuthenticated ? <Outlet/> : <Navigate to='/login'/>
    )
}
export default ProtectedRoute;
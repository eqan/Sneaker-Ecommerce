import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({profileData}) => {
  return (
      profileData ? <Outlet/> : <Navigate to='/login'/>
    )
}
export default ProtectedRoute;
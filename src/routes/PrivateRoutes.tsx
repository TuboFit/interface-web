
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";


const PrivateRoutes = () => {
    let auth = false
    const { userLooged } = useAuth();
    userLooged()

    if (!userLooged()) {
        return <Navigate to="/" />
    }
    auth = true
    return auth ? <Outlet /> : <Navigate to="/" />;
}
export default PrivateRoutes
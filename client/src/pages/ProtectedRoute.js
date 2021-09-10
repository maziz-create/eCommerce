import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

//component => gösterilecek ekran. Component olarak almazsak aşağıda çalışmıyor.
//rest => girilmiş property varsa hepsini rest altında topluyoruz.
function ProtectedRoute({ component: Component, admin, ...rest }) { //admin propunu aldık.
    const { loggedIn, user } = useAuth();
    return (
        <Route {...rest} render={(props) => {

            if (admin && user.role !== 'admin') {
                return <Redirect to={{ pathname: "/" }} />
            }

            if (loggedIn) {
                return <Component {...props} />
            }
            return <Redirect to={{ pathname: "/" }} /> //direkt to="/" olarak da yazılabiliyor.
        }} />
    )
}

export default ProtectedRoute   
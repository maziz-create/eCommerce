import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

//component => gösterilecek ekrange
//rest => girilmiş property varsa hepsini rest altında topluyoruz.
function ProtectedRoute({ component: Component, ...rest }) {
    const { loggedIn } = useAuth();
    return (
        <Route {...rest} render={(props) => {
            if (loggedIn) {
                return <Component {...props} />
            }
            return <Redirect to="/" />
        }} />
    )
}

export default ProtectedRoute
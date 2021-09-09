import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ProtectedRoute from './pages/ProtectedRoute'
import Navbar from './components/Navbar';
import Signin from './pages/Auth/Signin';
import Signup from './pages/Auth/Signup';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import Basket from './pages/Basket';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div id="content">
          <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/product/:product_id" component={ProductDetail} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/basket" component={Basket} />

            {/* profil sayfasına yetkisi olmayan kullanıcının girememesini istiyoruz. */}
            <ProtectedRoute path="/profile" component={Profile} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

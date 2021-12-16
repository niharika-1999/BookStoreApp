import './App.css';
import Registration from './pages/Registration';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/CartPage";
import OrderComplete from "./pages/OrderPage" ;
import { BrowserRouter as Router, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
          <Route path="/" exact component={Registration} />
          <Route path="/login" exact component={Login} />
          <Route path="/forgot" exact component={ForgotPassword} />
          <Route path="/reset/:token" exact component={ResetPassword} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/cart" exact component={Cart} /> 
          <Route path="/orderComplete" exact component={OrderComplete} />
      </Router>
    </div>
  );
}
export default App;
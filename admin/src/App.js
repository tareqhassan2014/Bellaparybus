import {
  Routes,
  Route
} from "react-router-dom";
import Main from './layouts/Main';
import Booking from "./layouts/Booking";
import History from "./layouts/History";
import Occasions from "./layouts/Occasions";
import Vehicles from "./layouts/Vehicles";
import Users from "./layouts/Users";
import Account from "./layouts/Account";
import Redirect from "./components/Redirect";

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="admin" element={<Main />}>
        <Route index element={<Redirect to="/admin/booking" />} />
        <Route path="booking" element={<Booking />} />
        <Route path="history" element={<History />} />
        <Route path="occasions" element={<Occasions />} />
        <Route path="vehicles" element={<Vehicles />} />
        <Route path="users" element={<Users />} />
        <Route path="account" element={<Account />} />
      </Route>
      <Route
        path="*"
        element={
          <Redirect to="/admin/booking" />
        }
      />
    </Routes>
  );
}

export default App;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import { setIsAuthenticated } from "./app/dataReducer";

import LoginContainer from "./Components/Login/LoginContainer";

import DetailedView from "./Components/Detailed_View/DetailedView";
import TableView from "./Components/Table_View/TableView";
import VisualizationView from "./Components/Visualization_View/VisualizationView";
import AddInventory from "./Components/Inventory/AddInventory";
import ImportInventory from "./Components/ImportInventory/ImportInventory";

function App() {
  const dispatch  = useDispatch()
  const isAuthenticated = useSelector(
    (state) => state.dataReducer.isAuthenticated
  );
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();
      if (parseRes == true) {
        console.log("PARSERES: ",parseRes)
      }
      console.log("PARSERES: ",parseRes);
      parseRes === true
        ? dispatch(setIsAuthenticated(true))
        : dispatch(setIsAuthenticated(false));
    } catch (err) {
      console.error(err.message);
    }
  };
  const PrivateRoutes = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
  };
  const AnonymousRoute = () => {
    return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
  };

  useEffect(()=>{
    checkAuthenticated()
  },[])
  return (
    <Router>
      <div>
        {/* <Sidebar/> */}
        <Routes>
          {/* <Route exact path='/dashboard' element={<Dashboard/>} /> */}
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard/detailed_view" element={<DetailedView />} />
            <Route path="/dashboard/table_view" element={<TableView />} />
            <Route
              path="/dashboard/visualization_view"
              element={<VisualizationView />}
            />
            <Route path="/dashboard/addInventoryData" element={<AddInventory/>} />
            <Route path="/dashboard/importInventoryData" element={<ImportInventory/>} />
            <Route path="/" element={<DetailedView />} />
          </Route>
          <Route element={<AnonymousRoute />}>
            <Route exact path="/auth" element={<LoginContainer />} />
          </Route>
          {/* <Route exact path='/' element={<DetailedView/>} />
              <Route path='/dashboard/detailed_view' element={<DetailedView/>} />
              <Route path='/dashboard/table_view' element={<TableView/>} />
              <Route path='/dashboard/visualization_view' element={<VisualizationView/>} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

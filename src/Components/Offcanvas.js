import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useSelector, useDispatch } from "react-redux";
import Logout from "./Logout";
import {
  changeDetailedTab,
  changeTableTab,
  changeVisualizationTab,
  changeAddInventoryTab,
  changeImportInventoryTab
} from "../app/uiReducer";
import { clearSelectedData } from "../app/dataReducer";
import { imageMetaData } from "./constants";
import styles from "./../Styles/offcanvas.module.css";

function Sidebar() {
  const shop = "Panera"; // should come as a prop
  const detailedTab = useSelector((state) => state.uiReducer.detailedTab);
  const tableTab = useSelector((state) => state.uiReducer.tableTab);
  const addInventoryTab = useSelector((state) => state.uiReducer.addInventoryTab);
  const importInventoryTab = useSelector((state) => state.uiReducer.importInventoryTab);

  const userDetails = useSelector((state)=>state.dataReducer.userDetails)
  console.log("USERDETAILS:" ,userDetails)
  const visualizationTab = useSelector(
    (state) => state.uiReducer.visualizationTab
  );
  const dispatch = useDispatch();

  return (
    <>
      <Navbar
        key="false"
        expand="false"
        className={`${styles[`${shop}_navbar`]} mb-3`}
      >
        <Container fluid>
          <Navbar.Brand className={`${styles[`${shop}_navbar_brand`]}`}>
            <Nav.Link>
              <Link to={"/"}>
                <img
                  alt=""
                  src={require(`${imageMetaData[`${shop}`].url}`)}
                  width={imageMetaData[`${shop}`].width}
                  height={imageMetaData[`${shop}`].height}
                  className="d-inline-block align-top"
                ></img>
            </Link>
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-false`}
            className={`${styles[`${shop}_navbar_toggle`]}`}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-'false'`}
            aria-labelledby={`offcanvasNavbarLabel-expand-false`}
            placement="end"
            className={`${styles[`${shop}_navbar_offcanvas`]}`}
          >
            <Offcanvas.Header
              className={`${styles[`${shop}_navbar_offcanvas_header`]}`}
              closeButton
            >
              <Navbar.Brand id={`offcanvasNavbarLabel-expand-false`}>
                <img
                  alt=""
                  src={require(`${imageMetaData[`${shop}`].url}`)}
                  width={imageMetaData[`${shop}`].width}
                  height={imageMetaData[`${shop}`].height}
                  className="d-inline-block align-top"
                ></img>
              </Navbar.Brand>
            </Offcanvas.Header>
            <Offcanvas.Body className={`flex-grow-1 pe-3 ${
                  styles[`${shop}_navbar_offcanvas_body`]
                }`}>
              <Nav
                
              >
                <Nav.Link
                  onClick={() => {
                    dispatch(changeDetailedTab());
                  }}
                  to={"/dashboard/detailed_view"}
                  className={`${
                    detailedTab
                      ? styles[`${shop}_navbar_offcanvas_body_active`]
                      : ""
                  } ${styles[`${shop}_navbar_offcanvas_body_nav`]}`}
                >
                  <Link className="nav-link" to={"/dashboard/detailed_view"}>
                    Data Entry
                  </Link>
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    dispatch(changeTableTab());
                    dispatch(clearSelectedData());
                  }}
                  className={`${
                    tableTab
                      ? styles[`${shop}_navbar_offcanvas_body_active`]
                      : ""
                  } ${styles[`${shop}_navbar_offcanvas_body_nav`]}`}
                >
                  <Link className="nav-link" to={"/dashboard/table_view"}>
                    Table View
                  </Link>
                </Nav.Link>
                <Nav.Link onClick={() => {
                  dispatch(changeAddInventoryTab());
                }} className={`${
                    addInventoryTab
                      ? styles[`${shop}_navbar_offcanvas_body_active`]
                      : ""
                  } ${styles[`${shop}_navbar_offcanvas_body_nav`]}`}>
                  <Link className="nav-link" to={"/dashboard/addInventoryData"}>
                    Add Inventory
                  </Link>
                </Nav.Link>
                <Nav.Link onClick={()=>{
                  dispatch(changeImportInventoryTab());
                }} className={`${importInventoryTab ? styles[`${shop}_navbar_offcanvas_body_active`] : ""}
                               ${styles[`${shop}_navbar_offcanvas_body_nav`]}`}> 
                    <Link className="nav-link" to={"/dashboard/importInventoryData"}>
                      Import Inventory
                    </Link>
                </Nav.Link>
                <Nav.Link onClick={()=>{
                  dispatch(changeVisualizationTab());
                }} className={`${visualizationTab ? styles[`${shop}_navbar_offcanvas_body_active`] : ""}
                               ${styles[`${shop}_navbar_offcanvas_body_nav`]}`}>
                  <Link className="nav-link" to={"/dashboard/visualization_view"}>
                    Visualization
                  </Link>
                </Nav.Link>
              </Nav>
              <Nav className={`flex-grow-1 pe-3 ${
                  styles[`${shop}_offcanvas_logout_container`]
                }`}>
                  <div className={`${styles[`${shop}_username`]}`}>Hi! {userDetails["user_name"]}</div>
                <Logout/>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default Sidebar;

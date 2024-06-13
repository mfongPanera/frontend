import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./../../Styles/detailedview.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setCase_, setAdjustedPar, setBag, setEa, setGal, setLbs, setOpenOrders, setOz, setSleeves, setTotalCases, setTray, setOrder, setAdjustedOrder, setSales,
setYield, refetchUpdatedData, updateToastMessage, setTotalOz, setTotalLBS, setTotalLiters, setTotalTray, setTotalML, setTotalGAL, setTotalGM, setTotalEach, setTotalSleeves,
setTotalBags} from "../../app/dataReducer";
import Form from "react-bootstrap/Form";

function InventoryForm() {

  const shop = "Panera";
  const order_ = useSelector((state) => state.dataReducer.order_);
  const adjusted_order_ = useSelector((state) => state.dataReducer.adjustedOrder);
  const openOrders = useSelector((state) => state.dataReducer.openOrders);
  const adjustedPar = useSelector((state) => state.dataReducer.adjustedPar);
  const case_ = useSelector((state) => state.dataReducer.case_);
  const lbs = useSelector((state) => state.dataReducer.lbs);
  const bag = useSelector((state) => state.dataReducer.bag);
  const tray = useSelector((state) => state.dataReducer.tray);
  const ea = useSelector((state) => state.dataReducer.ea);
  const oz = useSelector((state) => state.dataReducer.oz);
  const gal = useSelector((state) => state.dataReducer.gal);
  const gm = useSelector((state)=>state.dataReducer.gm);
  const sleeves = useSelector((state) => state.dataReducer.sleeves);
  const totalCases = useSelector((state) => state.dataReducer.totalCases);
  const sales = useSelector((state) => state.dataReducer.sales);
  const yield_ = useSelector((state) => state.dataReducer.yield);
  const selectedData = useSelector((state) => state.dataReducer.selectedData);
  const dispatch = useDispatch();
  const unlock = selectedData.unlock.split("-");
  const totalEach = useSelector((state) => state.dataReducer.totalEach);
  const totalTray = useSelector((state) => state.dataReducer.totalTray);
  const totalSleeves = useSelector((state)=> state.dataReducer.totalSleeves);
  const totalOZ = useSelector((state)=> state.dataReducer.totalOZ);
  const totalLBS = useSelector((state) => state.dataReducer.totalLBS);
  const totalLiters = useSelector((state) => state.dataReducer.totalLiters);
  const totalML = useSelector((state)=> state.dataReducer.totalML);
  const totalGAL = useSelector((state)=> state.dataReducer.totalGAL);
  const totalGM = useSelector((state)=> state.dataReducer.totalGM);
  const totalBags = useSelector((state)=> state.dataReducer.totalBags);
  const username = useSelector((state)=>state.dataReducer.userName);

  const getConversions = async () => {
    try {
      const uri='http://localhost:5000/getConversions';
      const responses = await fetch(uri);
      const conversions = await responses.json();
      return conversions;
    } catch(err) {
      console.log(err)
    }
  };

  const calculateFields = async (unlock) => {
    let caSe = case_ === '' ? parseFloat(selectedData.case_) : parseFloat(case_); 
    let each = ea === '' ? parseFloat(selectedData.ea) : parseFloat(ea)  
    let ounce = oz === '' ? parseFloat(selectedData.oz) : parseFloat(oz) 
    let pounds = lbs==='' ? parseFloat(selectedData.lb) : parseFloat(lbs)
    let bags = bag===''? parseFloat(selectedData.bag): parseFloat(bag)
    let gallons = gal===''?parseFloat(selectedData.gal):parseFloat(gal)
    let trays = tray=='' ? parseFloat(selectedData.tray):parseFloat(tray)
    let sleeve = sleeves==''? parseFloat(selectedData.sleeves):parseFloat(sleeves)
    let gram = gm==''? parseFloat(selectedData.gm):parseFloat(gm)
    let pack = parseFloat(selectedData.pack)
    let size = parseFloat(selectedData.size_)
    let unitOfMeasurement = selectedData.uom
    let unlocks = unlock.split('-')
    let totalCase=0
    let totalEach=0
    let totalLBS=0
    let totalOZ = 0
    let totalBags=0
    let totalGal=0
    let totalTray=0
    let totalSleeve = 0
    let totalGM =0
    const conversions = await getConversions();
    let oztolbs = parseFloat(conversions.oztolbs);
    let mltoltr = parseFloat(conversions.mltoltr);
    let ltrtooz = parseFloat(conversions.ltrtooz);
    let mltooz = parseFloat(conversions.mltooz);
    let ltrtogal = parseFloat(conversions.ltrtogal);
    let grtooz = parseFloat(conversions.grtooz);
    for(let i=0;i<unlocks.length;i++) {
      if(unlocks[i]==='CASE') {
        totalCase+=caSe
        
      }
      else if(unlocks[i] === 'EA') {
        if(unitOfMeasurement == 'CT') {
          totalCase+=(each/(pack*size))
        } else {
          totalCase+=(each/pack)
        }
      }
      else if(unlocks[i]==='BAGS') {
        totalCase+=(bags/pack)
      }
      
      else if(unlocks[i] === 'LBS') {
        if(unitOfMeasurement==='OZ') {
          totalCase+=(pounds*oztolbs/(pack*size))
        } else {
          totalCase+=(pounds/(pack*size))
        }
      }
      else if(unlocks[i] === 'OZ') {
        if(unitOfMeasurement==='LBS') {
          totalCase+=(ounce/(pack*size*oztolbs))
        } else {
          totalCase+=(ounce/(pack*size))
        }
      }
      else if(unlocks[i] === 'GAL') {
        totalCase+=(gallons/(pack*size))
      }
      else if(unlocks[i]==='TRAY') {
        totalCase+=(trays/4)
      }
      else if(unlocks[i]==='SLEEVE') {
        console.log(sleeve)
        totalCase+=(sleeve/pack)
      }
      else if(unlocks[i]==='GRAM') {
        
      }
    }
    if(unlocks.includes('EA')) {
      if(unitOfMeasurement =='OZ' || unitOfMeasurement=='LBS' || unitOfMeasurement=='GAL' || unitOfMeasurement=='GM' 
      || unitOfMeasurement=='ML') {
        totalEach=totalCase*pack
      } else {
        totalEach=totalCase*pack*size
      }
    }
    if(unlocks.includes('BAGS')) {
      totalBags= totalCase*pack
    }
    if(unlocks.includes('LBS')) {
      totalLBS=totalCase*pack*size
      if(unitOfMeasurement==='OZ'){
        totalLBS=totalLBS/oztolbs
      }
    }
    if(unlocks.includes('OZ')) {
      totalOZ = totalCase*pack*size
      if(unitOfMeasurement==='LBS') {
        totalOZ=totalOZ*oztolbs
      }
    }
    if(unlocks.includes('GAL')) {
      totalGal = totalCase*pack*size
    }
    if(unlocks.includes('TRAY')) {
      totalTray = totalCase*4
    }
    if(unlocks.includes('SLEEVE')) {
      totalSleeve = totalCase*pack;
    }
    
    dispatch(setTotalBags(totalBags))
    dispatch(setTotalCases(totalCase))
    dispatch(setTotalLBS(totalLBS))
    dispatch(setTotalOz(totalOZ))
    dispatch(setTotalEach(totalEach))
    dispatch(setTotalGAL(totalGal))
    dispatch(setTotalTray(totalTray))
    dispatch(setTotalSleeves(totalSleeve))
    console.log(selectedData)
  }

  //for dynamically disabling fields 
  const disable = (unlockfields,feild)=>{
    if(unlockfields===null) {
      return false 
    } else {
      if(unlockfields[0]==='N/A') {
        return false
      } else {
        if(unlockfields.find((element)=> element===feild)) {
          return false 
        } else {
          return true
        }
      } 
    }
  }

  // For live calculations of adjusted order and order
  useEffect(() => {
    if (selectedData) {
      if (selectedData.totalcase) {
        dispatch(
          setTotalCases(totalCases ? totalCases : selectedData.totalcase)
        );
      }
    }
  }, [selectedData]);

  //for loading images
  const tryRequire = () => {
    try {
      return require(`./../images/${selectedData.location_}/${selectedData.vendor_id}.jpg`);
    } catch (err) {
      return require(`./../images/${selectedData.shopid}.svg`);
    }
  };

  useEffect(() => {
    if (selectedData) {
      // ORDER //
      let _order_;
      if (selectedData.order_) {
        _order_ = selectedData.order_;
      } else if (selectedData.system_par) {
        if (selectedData.totalcase)
          _order_ = selectedData.system_par - selectedData.totalcase;
        else if (totalCases) _order_ = selectedData.system_par - totalCases;
        else {
          _order_ = selectedData.system_par;
        }
      } else {
        _order_ = 0;
      }
      if (totalCases) {
        if (selectedData.system_par) {
          _order_ = selectedData.system_par - totalCases;
        }
      }

      // ADJUSTED ORDER //
      let _adjusted_order_;
      if (selectedData.adjustedorder) {
        _adjusted_order_ = selectedData.adjustedorder;
      } else if (selectedData.adjustedpar) {
        if (selectedData.totalcase)
          _adjusted_order_ =
            selectedData.adjustedpar - selectedData.totalcase;
        else if (selectedData.totalcase && adjustedPar)
          _adjusted_order_ = adjustedPar - selectedData.totalcase;
        else if (adjustedPar && totalCases)
          _adjusted_order_ = adjustedPar - totalCases;
        else {
          _adjusted_order_ = selectedData.adjustedpar;
        }
      } else {
        _adjusted_order_ = 0;
      }
      if (adjustedPar) {
        if (selectedData.totalcase) {
          _adjusted_order_ = adjustedPar - selectedData.totalcase;
        }
      }
      if (totalCases) {
        _adjusted_order_ = -totalCases;
        if (selectedData.adjustedpar) {
          _adjusted_order_ = selectedData.adjustedpar - totalCases;
        }
        if (adjustedPar) {
          _adjusted_order_ = adjustedPar - totalCases;
        }
      }
      dispatch(setOrder(_order_));
      dispatch(setAdjustedOrder(_adjusted_order_));
    }
  }, [totalCases, adjustedPar, order_]);

  // For live calculations of total cases
  useEffect(() => {
    if (selectedData) {
      let unlock = selectedData.unlock;
      calculateFields(unlock)
     }
  }, [case_, lbs, bag, tray, ea, oz, gal, sleeves, totalCases]);
  useEffect(() => {
    if (selectedData) {
      dispatch(setCase_(""));
      dispatch(setTray(""));
      dispatch(setAdjustedPar(""));
      dispatch(setBag(""));
      dispatch(setEa(""));
      dispatch(setGal(""));
      dispatch(setLbs(""));
      dispatch(setOpenOrders(""));
      dispatch(setOz(""));
      dispatch(setSleeves(""));
      dispatch(setTotalCases(totalCases ? totalCases : selectedData.totalcase));
      dispatch(setAdjustedOrder(""));
      dispatch(setOrder(""));
      dispatch(setSales(""));
      dispatch(setYield(""));
      dispatch(setTotalGM(totalGM ? totalGM : selectedData.totalgm))
      dispatch(setTotalTray(totalTray ? totalTray : selectedData.tataltray))
      dispatch(setTotalML(totalML ? totalML : selectedData.totalml))
      dispatch(setTotalLiters(totalLiters ? totalLiters : selectedData.totalltr))
      dispatch(setTotalOz(totalOZ ? totalOZ : selectedData.totaloz))
      dispatch(setTotalLBS(totalLBS ? totalLBS : selectedData.totallbs))
      dispatch(setTotalGAL(totalGAL ? totalGAL : selectedData.totalgal))
      dispatch(setTotalEach(totalEach ? totalEach : selectedData.totalea))
      dispatch(setTotalSleeves(totalSleeves ? totalSleeves : selectedData.totalsleeves))
    }
  }, [selectedData]);

  //For updatinf Inventory in DB
  const updateInventory = async (e) => {
    e.preventDefault();
    const foodpro_id = selectedData.foodpro_id;
    //const date = addDays(new Date(selectedData.created_date),1).toLocaleDateString("en-US").replaceAll("/", "-")
    const date = selectedData.created_date;
    let _case_ = case_ === "" ? selectedData.case_ : case_;
    let lbs_ = lbs === "" ? selectedData.lb : lbs;
    let bag_ = bag === "" ? selectedData.bag : bag;
    let tray_ = tray === "" ? selectedData.tray : tray;
    let ea_ = ea === "" ? selectedData.ea : ea;
    let oz_ = oz === "" ? selectedData.oz : oz;
    let gal_ = gal === "" ? selectedData.gal : gal;
    let sleeves_ = sleeves === "" ? selectedData.sleeves : sleeves;
    let adjusted_par = adjustedPar ? adjustedPar : selectedData.adjustedpar;
    let open_orders = openOrders ? openOrders : selectedData.openorders;
    let sales_ = sales ? sales : selectedData.sales;
    let _yield_ = yield_ ? yield_ : selectedData.yeild;
    let adjusted_order = adjusted_order_ ? adjusted_order_ : selectedData.adjustedorder;
    
    try {
      const response = await fetch(`http://localhost:5000/update_existing_inventory/${foodpro_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: date,
            case_: _case_,
            lb: lbs_,
            bag: bag_,
            sleeves: sleeves_,
            tray: tray_,
            gal: gal_,
            oz: oz_,
            adjusted_par: adjusted_par,
            ea: ea_,
            open_orders: open_orders,
            order_: order_,
            adjusted_order: adjusted_order,
            total_case: totalCases,
            total_lb: totalLBS,
            total_bags: totalBags,
            total_ea:totalEach,
            total_oz:totalOZ,
            total_gal:totalGAL,
            total_tray:totalTray,
            total_sleeve:totalSleeves,
            total_gm:totalGM,
            sales: sales_,
            yield: _yield_,
            updatedBy:username
          }),
        }
      );
      console.log(selectedData)
      dispatch(
        updateToastMessage({
          type: "SUCCESS",
          msg: `Data for ${selectedData.foodpro_id} was updated`,
        })
      );
      fetchUpdatedData(date);
    } catch (err) {
      dispatch(updateToastMessage({ type: "ERROR", msg: err.message }));
      console.error(err.message);
    }
  };
  const fetchUpdatedData = async (date) => {
    try {
      const response = await fetch(
        `http://localhost:5000/get_inventory_data/${date}`
      );
      const requestedData = await response.json();
      dispatch(refetchUpdatedData(requestedData));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Container className={`${styles[`${shop}_detailed_view_inventory_form_container`]}`}>
      <Form onSubmit={(e) => {updateInventory(e);}}>
        <Row>
          <Col md={{ span: 12, offset: 0 }} className={`${styles[`${shop}_detailed_view_inventory_form_title`]}`}>
            {selectedData ? selectedData.vendor_id : "VENDOR ID"} -{" "}
            {selectedData ? selectedData.description : "INVENTORY DESCRIPTION"}
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 12, offset: 0 }}>
            <Row style={{ paddingTop: 1.75 }}>
              <Col className={`${styles[`${shop}_detailed_view_inventory_form_image`]}`} md={{ span: 6, offset: 0 }} xl={{ span: 4, offset: 0 }}>
                <Image style={{ aspectRatio: 1, maxHeight: "90%", maxWidth: "90%" }} src={tryRequire()} rounded sizes="50"></Image>
              </Col>
              <Col md={6} className={`${styles[`${shop}_ipad_view`]}`}>
                <Row>
                  <Row className={`${styles[`${shop}_detailed_view_inventory_form_ipad_view_input_row`]}`}>
                    <Col className={`${styles[`${shop}_detailed_view_inventory_form_ipad_View_label`]}`}>
                      SALES
                    </Col>
                  </Row>
                  <Row className={`${styles[`${shop}_detailed_view_inventory_form_ipad_view_input_row`]}`}>
                    <Col className={`${styles[`${shop}_detailed_view_inventory_form_ipad_view_col`]}`}>
                      <Form.Control name={"SALES"} placeholder={selectedData ? selectedData.openorders : ""}
                        className={`${styles[`${shop}_detailed_view_inventory_form_ipad_view_input`]}`}
                        pattern="^[0-9]*$" value={sales}
                        onChange={(e) => {
                          if (!e.target.validity.patternMismatch) {
                            dispatch(setSales(e.target.value));
                          }}}
                      ></Form.Control>
                    </Col>
                  </Row>
                  <Row className={`${styles[`${shop}_detailed_view_inventory_form_ipad_view_input_row`]}`}>
                    <Col className={`${styles[`${shop}_detailed_view_inventory_form_ipad_View_label`]}`}>
                      ADJUSTED SALES
                    </Col>
                  </Row>
                  <Row className={`${styles[`${shop}_detailed_view_inventory_form_ipad_view_input_row`]}`}>
                    <Col className={`${styles[`${shop}_detailed_view_inventory_form_ipad_view_col`]}`}>
                      <Form.Control name={"ADJUSTED_SALES"} placeholder={"Calculated Adjusted Sales"}
                        className={`${styles[`${shop}_detailed_view_inventory_form_ipad_view_input`]}`}
                        disabled
                      ></Form.Control>
                    </Col>
                  </Row>
                  <Row className={`${styles[`${shop}_detailed_view_inventory_form_ipad_view_input_row`]}`}>
                    <Col className={`${styles[`${shop}_detailed_view_inventory_form_ipad_View_label`]}`}>
                      YIELD
                    </Col>
                  </Row>
                  <Row className={`${styles[`${shop}_detailed_view_inventory_form_ipad_view_input_row`]}`}>
                    <Col className={`${styles[`${shop}_detailed_view_inventory_form_ipad_view_col`]}`}>
                      <Form.Control style={{ marginBottom: 0 }} name={"YIELD"} pattern="^[0-9]*$"
                        placeholder={selectedData ? selectedData.yeild : ""} value={yield_}
                        className={`${styles[`${shop}_detailed_view_inventory_form_ipad_view_input`]}`}
                        onChange={(e) => {
                          if (!e.target.validity.patternMismatch) {
                            dispatch(setYield(e.target.value));
                          }}}
                      ></Form.Control>
                    </Col>
                  </Row>
                </Row>
              </Col>
              <Col md={12} xl={8}>
                <Row style={{ paddingTop: 0 }} className={`${styles[`${shop}_detailed_view_inventory_form_row`]}`}>
                  <Col xl={3} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                    PACK
                  </Col>
                  <Col xl={9} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                    <Form.Control name={"PACK"} value={selectedData ? selectedData.pack : ""}
                      className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`} disabled
                    ></Form.Control>
                  </Col>
                </Row>
                <Row className={`${styles[`${shop}_detailed_view_inventory_form_row`]}`}>
                  <Col xl={3} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                    SIZE
                  </Col>
                  <Col xl={3} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                    <Form.Control name={"SIZE"} value={selectedData ? selectedData.size_ : ""} disabled
                      className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`}
                    ></Form.Control>
                  </Col>
                  <Col xl={4} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                    MEASUREMENT
                  </Col>
                  <Col xl={2} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                    <Form.Control name={"MEASUREMENT"} value={selectedData ? selectedData.measurement : ""}
                      className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`} disabled
                    ></Form.Control>
                  </Col>
                </Row>
                <Row className={`${styles[`${shop}_detailed_view_inventory_form_row`]}`}>
                  <Col xl={3} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                    UOM
                  </Col>
                  <Col xl={3} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                    <Form.Control name={"UOM"} value={selectedData ? selectedData.uom : ""} disabled
                      className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`}
                    ></Form.Control>
                  </Col>
                  <Col xl={4} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                    SYSTEM PAR
                  </Col>
                  <Col xl={2} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                    <Form.Control name={"SYSTEM_PAR"} value={selectedData ? selectedData.system_par : ""}
                      className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`} disabled
                    ></Form.Control>
                  </Col>
                </Row>
                <Row className={`${styles[`${shop}_detailed_view_inventory_form_row`]}`}>
                  <Col xl={3} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                    SYGMA STATUS
                  </Col>
                  <Col xl={3} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                    <Form.Control name={"SYGMA_STATUS"} value={selectedData ? selectedData.sygma_status : ""} disabled
                      className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`}
                    ></Form.Control>
                  </Col>
                  <Col xl={4} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                    IBOH STATUS
                  </Col>
                  <Col xl={2} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                    <Form.Control name={"IBOH_STATUS"} value={selectedData ? selectedData.iboh_status : ""}
                      className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`} disabled
                    ></Form.Control>
                  </Col>
                </Row>
                <Row className={`${styles[`${shop}_detailed_view_inventory_form_row`]}`}>
                  <div className={`${styles[`${shop}_detailed_view_inventory_form_horizontal_line`]}`}></div>
                </Row>
                <Row className={`${styles[`${shop}_detailed_view_inventory_form_row`]}`}>
                  <Col xl={6} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                    OPEN ORDERS
                  </Col>
                  <Col xl={6} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                    <Form.Control name={"OPEN_ORDERS"} placeholder={selectedData ? selectedData.openorders : ""}
                      value={openOrders} pattern="^[0-9\.]*$"
                      className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`}
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setOpenOrders(e.target.value));
                        }}}
                    ></Form.Control>
                  </Col>
                </Row>
                <Row className={`${styles[`${shop}_detailed_view_inventory_form_row`]}`}>
                  <Col xl={6} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                    ADJUSTED PAR
                  </Col>
                  <Col xl={6} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                    <Form.Control placeholder={selectedData ? selectedData.adjustedpar : ""}
                      name={"ADJUSTED_PAR"} value={adjustedPar} pattern="^[0-9\.]*$"
                      className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`}
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setAdjustedPar(e.target.value));
                        }}}
                    ></Form.Control>
                  </Col>
                </Row>
                <Row className={`${styles[`${shop}_detailed_view_inventory_form_row`]}`}>
                  <div className={`${styles[`${shop}_detailed_view_inventory_form_horizontal_line`]}`}></div>
                </Row>
                <Row className={`${styles[`${shop}_detailed_view_inventory_form_row`]}`}>
                  <Col xl={12} md={12} style={{ justifyContent: "center" }}
                    className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                    ON-HAND INVENTORY
                  </Col>
                </Row>
                <Row className={`${styles[`${shop}_detailed_view_inventory_form_row`]}`}>
                  <Col xl={2} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                    CASE
                  </Col>
                  <Col xl={2} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                    <Form.Control placeholder={selectedData ? selectedData.case_ : ""} value={case_}
                      className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`}
                      pattern="^[0-9\.]*$"
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setCase_(e.target.value));
                        }}}
                    ></Form.Control>
                  </Col>
                  <Col xl={2} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                    LBS
                  </Col>
                  <Col xl={2} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                    <Form.Control name={"LBS"} placeholder={selectedData ? selectedData.lb : ""} value={lbs}
                      disabled={disable(unlock,"LBS")}
                      className={`${ styles[`${shop}_detailed_view_inventory_form_input`]}`} pattern="^[0-9\.]*$"
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setLbs(e.target.value));
                        }}}
                    ></Form.Control>
                  </Col>
                  <Col xl={2} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                    BAG
                  </Col>
                  <Col xl={2} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                    <Form.Control name={"BAGS"} placeholder={selectedData ? selectedData.bag : ""} value={bag}
                      className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`} pattern="^[0-9\.]*$"
                      disabled={ disable(unlock,"BAGS")}
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setBag(e.target.value));
                        }}}
                    ></Form.Control>
                  </Col>
                </Row>
                <Row className={`${styles[`${shop}_detailed_view_inventory_form_row`]}`}>
                  <Col xl={2} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                    TRAY
                  </Col>
                  <Col xl={2} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                    <Form.Control name={"TRAY"} placeholder={selectedData ? selectedData.tray : ""} value={tray}
                      disabled={disable(unlock,"TRAY")}
                      className={`${ styles[`${shop}_detailed_view_inventory_form_input`] }`} pattern="^[0-9\.]*$"
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setTray(e.target.value));
                        }}}
                    ></Form.Control>
                  </Col>
                  <Col xl={2} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                    EA
                  </Col>
                  <Col xl={2} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                    <Form.Control name={"EA"} placeholder={selectedData ? selectedData.ea : ""}
                      disabled={disable(unlock,"EA")}
                      value={ea} className={`${ styles[`${shop}_detailed_view_inventory_form_input`]}`} pattern="^[0-9\.]*$"
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setEa(e.target.value));
                        }}}
                    ></Form.Control>
                  </Col>
                  <Col xl={2} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                    OZ
                  </Col>
                  <Col xl={2} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                    <Form.Control name={"OZ"} placeholder={selectedData ? selectedData.oz : ""} value={oz}
                      disabled={disable(unlock,"OZ")}
                      className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`}pattern="^[0-9\.]*$"
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setOz(e.target.value));
                        }}}
                    ></Form.Control>
                  </Col>
                </Row>
                <Row className={`${styles[`${shop}_detailed_view_inventory_form_row`]}`}>
                  <Col xl={2} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                    GAL
                  </Col>
                  <Col xl={4} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                    <Form.Control name={"GAL"} placeholder={selectedData ? selectedData.gal : ""} value={gal}
                      disabled={disable(unlock,"GAL")}
                      className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`} pattern="^[0-9\.]*$"
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setGal(e.target.value));
                        }}}
                    ></Form.Control>
                  </Col>
                  <Col xl={2} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                    SLEEVES
                  </Col>
                  <Col xl={4} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                    <Form.Control name={"SLEEVES"} placeholder={selectedData ? selectedData.sleeves : ""}
                      value={sleeves} className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`}
                      pattern="^[0-9\.]*$"
                      disabled={disable(unlock,"SLEEVE")}
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setSleeves(e.target.value));
                        }}}
                    ></Form.Control>
                  </Col>
                </Row>
                <Row className={`${styles[`${shop}_detailed_view_inventory_form_row`]}`}>
                </Row>
              </Col>
            </Row>
            <Row className={`${styles[`${shop}_detailed_view_inventory_form_row`]}`}>
              <div className={`${styles[`${shop}_detailed_view_inventory_form_horizontal_line`]}`}></div>
            </Row>
            <Row className={`${styles[`${shop}_detailed_view_inventory_form_row`]}`}>
                <Col xl={12} md={12} style={{justifyContent:"center"}}
                  className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                    TOTAL CALCULATED ON-HAND
                </Col>
            </Row>
            <Row className={`${styles[`${shop}_detailed_view_inventory_form_row`]}`}>
                <Col xl={1} xxl={1} lg={2} md={2}>
                  <Row>
                    <Col xs={12} style={{justifyContent:"center",borderRadius:"5px"}} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                        CASES
                    </Col>
                    <Col xs={12} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                      <Form.Control name={"TOTAL_CASES"} placeholder={"Calculated Total Cases"} value={totalCases ? totalCases.toFixed(2) : selectedData.totalcase.toFixed(2)} 
                        className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`} disabled>
                      </Form.Control>
                    </Col>
                  </Row>
                </Col>
                <Col xl={1} xxl={1} lg={2} md={2}>
                  <Row>
                    <Col xs={12} style={{justifyContent:"center",borderRadius:"5px"}} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                      BAGS
                    </Col>
                    <Col xs={12} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                      <Form.Control name={"TOTAL_Bags"} placeholder={"Calculated Total Bags"} value={totalBags ? totalBags.toFixed(2) : selectedData.totalbags.toFixed(2)}
                        className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`} disabled>
                      </Form.Control>
                    </Col>
                  </Row>
                </Col>
                <Col xl={1} xxl={1} lg={2} md={2}>
                  <Row>
                    <Col xs={12} style={{justifyContent:"center",borderRadius:"5px"}} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                      EACH
                    </Col>
                    <Col xs={12} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                      <Form.Control name={"EACH"} className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`} style={{borderRadius:"5px"}} disabled
                        placeholder={selectedData ? selectedData.totaleach : ""} value={totalEach ? totalEach.toFixed(1) : selectedData.totaleach.toFixed(1)}>
                      </Form.Control>
                    </Col>
                  </Row>
                </Col>
                <Col xl={1} xxl={1} lg={2} md={2}>
                  <Row>
                    <Col xs={12} style={{justifyContent:"center",borderRadius:"5px"}} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                      TRAY
                    </Col>
                    <Col xs={12} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                      <Form.Control name={"TRAY"} className={`${ styles[`${shop}_detailed_view_inventory_form_input`]}`} style={{borderRadius:"5px"}} disabled
                        placeholder={selectedData ? selectedData.totaltray : ""} value={totalTray ? totalTray.toFixed(1) : selectedData.totaltray.toFixed(1)}>
                      </Form.Control>
                    </Col>
                  </Row>
                </Col>
                <Col xl={2} xxl={2} lg={4} md={4}>
                  <Row>
                    <Col xs={12} style={{justifyContent:"center",borderRadius:"5px"}} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                      SLEEVES
                    </Col>
                    <Col xs={12} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                      <Form.Control name={"SLEEVES"} className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`} style={{borderRadius:"5px"}} disabled
                        placeholder={selectedData ? selectedData.totalsleeves : ""} value={totalSleeves ? totalSleeves.toFixed(1) : selectedData.totalsleeves.toFixed(1)}>
                      </Form.Control>
                    </Col>
                  </Row>
                </Col>
                <Col xl={1} xxl={1} lg={2}  md={2}>
                  <Row>
                    <Col xs={12} style={{justifyContent:"center",borderRadius:"5px"}} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                      LBS
                    </Col>
                    <Col xs={12} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                      <Form.Control name={"LBS"} className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`}
                        value={totalLBS ? totalLBS.toFixed(2) : selectedData.totallb.toFixed(2)} style={{borderRadius:"5px"}} disabled
                        placeholder={selectedData ? selectedData.totallb : ""} >
                      </Form.Control>
                    </Col>
                  </Row>
                </Col>
                <Col xl={1} xxl={1} lg={2} md={2}>
                  <Row>
                    <Col xs={12} style={{justifyContent:"center",borderRadius:"5px"}} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                      OZ
                    </Col>
                    <Col xs={12} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                      <Form.Control name={"OZ"} className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`} style={{borderRadius:"5px"}}
                        placeholder={selectedData ? selectedData.totaloz : ""} value={totalOZ ? totalOZ.toFixed(1) : selectedData.totaloz.toFixed(1)} disabled>
                      </Form.Control>
                    </Col>
                  </Row>
                </Col>
                <Col xl={1} xxl={1} lg={2} md={2}>
                  <Row>
                    <Col xs={12} style={{justifyContent:"center",borderRadius:"5px"}} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                      LTR
                    </Col>
                    <Col xs={12} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                      <Form.Control name={"LTR"} className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`} style={{borderRadius:"5px"}} disabled
                        placeholder={selectedData ? selectedData.totalltr : ""} value={totalLiters ? totalLiters.toFixed(1) : selectedData.totalltr.toFixed(1)}>
                      </Form.Control>
                    </Col>
                  </Row>
                </Col>
                <Col xl={1} xxl={1} lg={2} md={2}>
                  <Row>
                    <Col xs={12} style={{justifyContent:"center",borderRadius:"5px"}} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                      ML
                    </Col>
                    <Col xs={12} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                      <Form.Control name={"ML"} className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`} style={{borderRadius:"5px"}} disabled
                        placeholder={selectedData ? selectedData.totalml : ""} value={totalML ? totalML.toFixed(1) : selectedData.totalml.toFixed(1)}>
                      </Form.Control>
                    </Col>
                  </Row>
                </Col>
                <Col xl={1} xxl={1} lg={2} md={2}>
                  <Row>
                    <Col xs={12} style={{justifyContent:"center",borderRadius:"5px"}} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                      GAL
                    </Col>
                    <Col xs={12} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                      <Form.Control name={"GAL"} className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`} style={{borderRadius:"5px"}} disabled
                        placeholder={selectedData ? selectedData.totalgal : ""} value={totalGAL ? totalGAL.toFixed(1) : selectedData.totalgal.toFixed(1)}>
                      </Form.Control>
                    </Col>
                  </Row>
                </Col>
                <Col xl={1} xxl={1} lg={2} md={2}>
                  <Row>
                    <Col xs={12} style={{justifyContent:"center",borderRadius:"5px"}} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                      GM
                    </Col>
                    <Col xs={12} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                      <Form.Control name={"GM"} className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`} style={{borderRadius:"5px"}} disabled
                        placeholder={selectedData ? selectedData.totalgm : ""} value={totalGM ? totalGM.toFixed(1) : selectedData.totalgm.toFixed(1)}>
                      </Form.Control>
                    </Col>
                  </Row>
                </Col>
            </Row>
            <Row className={`${styles[`${shop}_detailed_view_inventory_form_row`]}`}>
              <div className={`${styles[`${shop}_detailed_view_inventory_form_horizontal_line`]}`}></div>
            </Row>
            <Row className={`${styles[`${shop}_detailed_view_inventory_form_row`]}`}>
              <Col xl={6} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                ORDER
              </Col>
              <Col xl={6} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                <Form.Control name={"ORDER"} value={order_} disabled 
                className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`}
                ></Form.Control>
              </Col>
            </Row>
            <Row className={`${styles[`${shop}_detailed_view_inventory_form_row`]}`}>
              <Col xl={6} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                ADJUSTED ORDER
              </Col>
              <Col xl={6} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                <Form.Control name={"ADJUSTED_ORDER"} value={adjusted_order_} disabled
                  className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`}
                ></Form.Control>
              </Col>
            </Row>
            <Row style={{ paddingTop: 1.75 }}>
              <div className={`${styles[`${shop}_detailed_view_inventory_form_horizontal_line`]}`}></div>
            </Row>
            <Row style={{ paddingTop: 1.75 }} className={`${styles[`${shop}_big_screen_view`]}`}>
              <Col xl={3} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                SALES
              </Col>
              <Col xl={3} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                <Form.Control name={"SALES"} pattern="^[0-9]*$"
                  onChange={(e) => {
                    if (!e.target.validity.patternMismatch) {
                      dispatch(setSales(e.target.value));
                    }}}
                  placeholder={selectedData ? selectedData.sales : ""} value={sales}
                  className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`}
                ></Form.Control>
              </Col>
              <Col xl={3} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                ADJUSTED SALES
              </Col>
              <Col xl={3} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                <Form.Control name={"ADJUSTED_SALES"} placeholder={"Calculated Adjusted Sales"}
                  className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`} disabled
                ></Form.Control>
              </Col>
            </Row>
            <Row style={{ paddingTop: 1.75 }} className={`${styles[`${shop}_big_screen_view`]}`}>
              <Col xl={3} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_label`]}`}>
                YIELD
              </Col>
              <Col xl={9} md={6} className={`${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}>
                <Form.Control name={"YIELD"} pattern="^[0-9]*$"
                  onChange={(e) => {
                    if (!e.target.validity.patternMismatch) {
                      dispatch(setYield(e.target.value));
                    }}}
                  placeholder={selectedData ? selectedData.yeild : ""} value={yield_}
                  className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`}
                ></Form.Control>
              </Col>
            </Row>

            <Row style={{ paddingTop: 1.75 }}>
              <div className={`${styles[`${shop}_detailed_view_inventory_form_horizontal_line`]}`}></div>
            </Row>
            <Row style={{ paddingTop: 0, paddingBottom: 10 }}>
              <Col className={`${styles[`${shop}_detailed_view_inventory_form_input_btn_col`]} ${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}
                xs={{ span: 4, offset: 4 }}>
                <Button bsPrefix={`${styles[`${shop}_detailed_view_inventory_form_update_button`]}`} type="submit">
                  Update Data
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default InventoryForm;

import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./../../Styles/detailedview.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setCase_,
  setAdjustedPar,
  setBag,
  setEa,
  setGal,
  setLbs,
  setOpenOrders,
  setOz,
  setSleeves,
  setTotalCases,
  setTray,
  setOrder,
  setAdjustedOrder,
  setSales,
  setYield,
  refetchUpdatedData,
  updateToastMessage,
  setTotalOz,
  setTotalLBS,
  setTotalLiters,
  setTotalTray,
  setTotalML,
  setTotalGAL,
  setTotalGM,
  setTotalEach,
  setTotalSleeves,
  setTotalBags,
} from "../../app/dataReducer";
import Form from "react-bootstrap/Form";

function InventoryForm() {
  const shop = "Panera";
  const order_ = useSelector((state) => state.dataReducer.order_);
  const adjusted_order_ = useSelector(
    (state) => state.dataReducer.adjustedOrder
  );
  const openOrders = useSelector((state) => state.dataReducer.openOrders);
  const adjustedPar = useSelector((state) => state.dataReducer.adjustedPar);
  const case_ = useSelector((state) => state.dataReducer.case_);
  const lbs = useSelector((state) => state.dataReducer.lbs);
  const bag = useSelector((state) => state.dataReducer.bag);
  const tray = useSelector((state) => state.dataReducer.tray);
  const ea = useSelector((state) => state.dataReducer.ea);
  const oz = useSelector((state) => state.dataReducer.oz);
  const gal = useSelector((state) => state.dataReducer.gal);
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

  const calculateTotalOZ = (selectedData) => {
    let total_oz = null;
    let measurement = selectedData.measurement;
    let pack = selectedData.pack;
    let size = selectedData.size_;
    let ltToOz = selectedData.ltrtooz;
    if(measurement === "OZ") {
      if(pack == null || size == null) {
        total_oz = 0;
      } else {
        total_oz = Number(pack)*Number(size)
      }
    } else if(measurement === "ML") {
      if(pack == null || size == null) {
        total_oz = 0;
      } else {
        total_oz = ((Number(pack)*Number(size))/1000)*Number(ltToOz)
      }
    } else {
      total_oz=0;
    }
    dispatch(setTotalOz(total_oz))
  }
  const calculateTotalLBS = (selectedData) => {
    let total_lbs = null;
    let measurement = selectedData.measurement;
    let pack = selectedData.pack;
    let size = selectedData.size_;
    let oztolbs = selectedData.oztolbs;
    if(measurement === "LB") {
      if(pack == null || size == null) {
        total_lbs = 0;
      } else {
        total_lbs = Number(pack) * Number(size);
      }
    } else if(measurement === 'OZ'){
      if(pack==null || size == null) {
        total_lbs=0;
      } else {
        total_lbs = (Number(pack)*Number(size))/Number(oztolbs);
      }
    } else {
      total_lbs = 0;
    }
    dispatch(setTotalLBS(total_lbs))
  }

  const calculateTotalLiters = (selectedData) => {
    let total_liters = null;
    let measurement = selectedData.measurement;
    let pack = selectedData.pack;
    let size = selectedData.size_;
    let mltol = selectedData.mltoltr;
    if(measurement === "L") {
      if(pack==null || size == null) {
        total_liters=0;
      } else {
        total_liters = (Number(pack)*Number(size));
      }
    } else if(measurement === "ML") {
      if(pack == null || size==null) {
        total_liters=0;
      } else {
        total_liters = (Number(pack)*Number(size))/Number(mltol);
      }
    } else {
      total_liters = 0;
    }
    dispatch(setTotalLiters(total_liters))
  }
  const calculateTotalTray = (selectedData) => {
    let total_tray = null;
    let measurement = selectedData.measurement;
    let pack = selectedData.pack;
    let size = selectedData.size_;
    if(measurement === "TRAY") {
      if(pack==null || size==null) {
        total_tray = 0;
      } else {
       total_tray = (Number(pack)*Number(size)); 
      }
    } else {
      total_tray = 0;
    }
    dispatch(setTotalTray(total_tray))
  }
  const calculateTotalML = (selectedData) => {
    let total_ml = null;
    let measurment = selectedData.measurement;
    let pack = selectedData.pack;
    let size = selectedData.size_;
    if(measurment === "ML") {
      if(pack==null || size==null) {
        total_ml =0;
      } else {
        total_ml = (Number(pack)*Number(size));
      }
    } else {
      total_ml = 0;
    }
    dispatch(setTotalML(total_ml))
  }
  const calculateTotalGAL = (selectedData) => {
    let total_GAL = null;
    let measurement = selectedData.measurement;
    let pack = selectedData.pack;
    let size = selectedData.size_;
    if(measurement === "GAL") {
      if(pack==null || size==null) {
        total_GAL = 0;
      } else {
        total_GAL = (Number(pack)*Number(size));
      }
    } else {
      total_GAL =0;
    }
    dispatch(setTotalGAL(totalGAL))
  }
  const calculateTotalGM = (selectedData) => {
    let total_GM = null;
    let measurement = selectedData.measurement;
    let pack = selectedData.pack;
    let size = selectedData.size_;
    if(measurement === "GM") {
      if(pack==null || size==null) {
        total_GM = 0;
      } else {
        total_GM = (Number(pack)*Number(size));
      }
    } else {
      total_GM = 0;
    }
    dispatch(setTotalGM(total_GM))
  }
  // For live calculations of total cases
  useEffect(() => {
    if (selectedData) {
      let total_cases_ = 0;
      let total_lbs_ = 0;
      let total_oz_ = 0;
      let total_bags_ =0;
      let _case_ = case_ == '' ? selectedData.case_ : case_;
      let lbs_ = lbs == '' ? selectedData.lb : lbs;
      let bag_ = bag =='' ? selectedData.bag : bag;
      let tray_ = tray == null ? selectedData.tray : tray;
      let ea_ = ea == null ? selectedData.ea : ea;
      let oz_ = oz == '' ? selectedData.oz : oz;
      let gal_ = gal == null ? selectedData.gal : gal;
      let sleeves_ = sleeves == null ? selectedData.sleeves : sleeves;
      let pack = selectedData.pack;
      let size = selectedData.size_;
      let measurement = selectedData.measurement;
      let oztolbs = selectedData.oztolbs;
      if (selectedData.pack == null || selectedData.size_ == null) {
        total_cases_ = case_;
      } else {
        /*total_cases_ =
          Number(_case_) +
          (Number(lbs_) +
            Number(bag_) +
            Number(tray_) +
            Number(ea_) +
            Number(oz_) +
            Number(gal_) +
            Number(sleeves_)) /
            Number(selectedData.pack);*/
        if(measurement === "LB") {
          total_cases_ = parseFloat(_case_)+(parseFloat(bag_)/(parseFloat(pack)*parseFloat(size)))+(parseFloat(lbs_)/(parseFloat(pack)*parseFloat(size)))
          total_lbs_ = parseFloat(lbs_) + (parseFloat(_case_)*(parseFloat(pack)*parseFloat(size)))+(parseFloat(bag_)*parseFloat(size))
          total_bags_ = parseFloat(bag_) + (parseFloat(_case_)*parseFloat(pack))+(parseFloat(lbs_)/parseFloat(size))
          total_oz_ = (parseFloat(lbs_)*oztolbs)+parseFloat(oz_)+(parseFloat(_case_)*(parseFloat(pack)*parseFloat(size)))
        } else if (measurement === "OZ") {
          total_cases_ = parseFloat(_case_) + (parseFloat(lbs_)/((parseFloat(pack)*parseFloat(size))/oztolbs))+
                         ((parseFloat(oz_)/oztolbs)/((parseFloat(pack)*parseFloat(size))/oztolbs));
          total_lbs_ = parseFloat(lbs_) + (parseFloat(oz_)/parseFloat(oztolbs)) +(parseFloat(_case_)*((parseFloat(pack)*parseFloat(size)/parseFloat(oztolbs))));
          total_oz_ = parseFloat(oz_)+(parseFloat(lbs_)*parseFloat(oztolbs))+(parseFloat(_case_)*(parseFloat(pack)*parseFloat(size)));
        }
      }

      dispatch(setTotalCases(total_cases_));
      dispatch(setTotalLBS(total_lbs_))
      dispatch(setTotalOz(total_oz_));
      dispatch(setTotalBags(total_bags_))
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
      dispatch(
        setTotalCases(totalCases ? totalCases : selectedData.totalcase)
      );
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
  const updateInventory = async (e) => {
    e.preventDefault();
    const foodpro_id = selectedData.foodpro_id;
    //const date = addDays(new Date(selectedData.created_date),1).toLocaleDateString("en-US").replaceAll("/", "-")
    const date = selectedData.created_date;
    let _case_ = case_ == "" ? selectedData.case_ : case_;
    let lbs_ = lbs == "" ? selectedData.lb : lbs;
    let bag_ = bag == "" ? selectedData.bag : bag;
    let tray_ = tray == "" ? selectedData.tray : tray;
    let ea_ = ea == "" ? selectedData.ea : ea;
    let oz_ = oz == "" ? selectedData.oz : oz;
    let gal_ = gal == "" ? selectedData.gal : gal;
    let sleeves_ = sleeves == "" ? selectedData.sleeves : sleeves;
    let adjusted_par = adjustedPar ? adjustedPar : selectedData.adjustedpar;
    let open_orders = openOrders ? openOrders : selectedData.openorders;
    let sales_ = sales ? sales : selectedData.sales;
    let _yield_ = yield_ ? yield_ : selectedData.yeild;
    let adjusted_order = adjusted_order_
      ? adjusted_order_
      : selectedData.adjustedorder;
    
    try {
      const response = await fetch(
        `http://localhost:5000/update_existing_inventory/${foodpro_id}`,
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
            sales: sales_,
            yield: _yield_,
            updatedBy:username
          }),
        }
      );
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
    <Container
      className={`${styles[`${shop}_detailed_view_inventory_form_container`]}`}
    >
      <Form
        onSubmit={(e) => {
          updateInventory(e);
        }}
      >
        <Row>
          <Col
            md={{ span: 12, offset: 0 }}
            className={`${
              styles[`${shop}_detailed_view_inventory_form_title`]
            }`}
          >
            {selectedData ? selectedData.vendor_id : "VENDOR ID"} -{" "}
            {selectedData ? selectedData.description : "INVENTORY DESCRIPTION"}
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 12, offset: 0 }}>
            <Row style={{ paddingTop: 1.75 }}>
              <Col
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_image`]
                }`}
                md={{ span: 6, offset: 0 }}
                xl={{ span: 4, offset: 0 }}
              >
                <Image
                  style={{ aspectRatio: 1, maxHeight: "90%", maxWidth: "90%" }}
                  src={tryRequire()}
                  rounded
                  sizes="50"
                ></Image>
              </Col>
              <Col md={6} className={`${styles[`${shop}_ipad_view`]}`}>
                <Row>
                  <Row
                    className={`${
                      styles[
                        `${shop}_detailed_view_inventory_form_ipad_view_input_row`
                      ]
                    }`}
                  >
                    <Col
                      className={`${
                        styles[
                          `${shop}_detailed_view_inventory_form_ipad_View_label`
                        ]
                      }`}
                    >
                      SALES
                    </Col>
                  </Row>
                  <Row
                    className={`${
                      styles[
                        `${shop}_detailed_view_inventory_form_ipad_view_input_row`
                      ]
                    }`}
                  >
                    <Col
                      className={`${
                        styles[
                          `${shop}_detailed_view_inventory_form_ipad_view_col`
                        ]
                      }`}
                    >
                      <Form.Control
                        name={"SALES"}
                        placeholder={
                          selectedData ? selectedData.openorders : ""
                        }
                        className={`${
                          styles[
                            `${shop}_detailed_view_inventory_form_ipad_view_input`
                          ]
                        }`}
                        pattern="^[0-9]*$"
                        onChange={(e) => {
                          if (!e.target.validity.patternMismatch) {
                            dispatch(setSales(e.target.value));
                          }
                        }}
                        value={sales}
                      ></Form.Control>
                    </Col>
                  </Row>
                  <Row
                    className={`${
                      styles[
                        `${shop}_detailed_view_inventory_form_ipad_view_input_row`
                      ]
                    }`}
                  >
                    <Col
                      className={`${
                        styles[
                          `${shop}_detailed_view_inventory_form_ipad_View_label`
                        ]
                      }`}
                    >
                      ADJUSTED SALES
                    </Col>
                  </Row>
                  <Row
                    className={`${
                      styles[
                        `${shop}_detailed_view_inventory_form_ipad_view_input_row`
                      ]
                    }`}
                  >
                    <Col
                      className={`${
                        styles[
                          `${shop}_detailed_view_inventory_form_ipad_view_col`
                        ]
                      }`}
                    >
                      <Form.Control
                        name={"ADJUSTED_SALES"}
                        placeholder={"Calculated Adjusted Sales"}
                        className={`${
                          styles[
                            `${shop}_detailed_view_inventory_form_ipad_view_input`
                          ]
                        }`}
                        disabled
                      ></Form.Control>
                    </Col>
                  </Row>
                  <Row
                    className={`${
                      styles[
                        `${shop}_detailed_view_inventory_form_ipad_view_input_row`
                      ]
                    }`}
                  >
                    <Col
                      className={`${
                        styles[
                          `${shop}_detailed_view_inventory_form_ipad_View_label`
                        ]
                      }`}
                    >
                      YIELD
                    </Col>
                  </Row>
                  <Row
                    className={`${
                      styles[
                        `${shop}_detailed_view_inventory_form_ipad_view_input_row`
                      ]
                    }`}
                  >
                    <Col
                      className={`${
                        styles[
                          `${shop}_detailed_view_inventory_form_ipad_view_col`
                        ]
                      }`}
                    >
                      <Form.Control
                        style={{ marginBottom: 0 }}
                        name={"YIELD"}
                        pattern="^[0-9]*$"
                        onChange={(e) => {
                          if (!e.target.validity.patternMismatch) {
                            dispatch(setYield(e.target.value));
                          }
                        }}
                        placeholder={selectedData ? selectedData.yeild : ""}
                        value={yield_}
                        className={`${
                          styles[
                            `${shop}_detailed_view_inventory_form_ipad_view_input`
                          ]
                        }`}
                      ></Form.Control>
                    </Col>
                  </Row>
                </Row>
              </Col>
              <Col md={12} xl={8}>
                <Row
                  style={{ paddingTop: 0 }}
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_row`]
                  }`}
                >
                  <Col
                    xl={3}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    PACK
                  </Col>
                  <Col
                    xl={9}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"PACK"}
                      value={selectedData ? selectedData.pack : ""}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      disabled
                    ></Form.Control>
                  </Col>
                </Row>
                <Row
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_row`]
                  }`}
                >
                  <Col
                    xl={3}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    SIZE
                  </Col>
                  <Col
                    xl={3}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"SIZE"}
                      value={selectedData ? selectedData.size_ : ""}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      disabled
                    ></Form.Control>
                  </Col>
                  <Col
                    xl={4}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    MEASUREMENT
                  </Col>
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"MEASUREMENT"}
                      value={selectedData ? selectedData.measurement : ""}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      disabled
                    ></Form.Control>
                  </Col>
                </Row>
                <Row
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_row`]
                  }`}
                >
                  <Col
                    xl={3}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    UOM
                  </Col>
                  <Col
                    xl={3}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"UOM"}
                      value={selectedData ? selectedData.uom : ""}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      disabled
                    ></Form.Control>
                  </Col>
                  <Col
                    xl={4}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    SYSTEM PAR
                  </Col>
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"SYSTEM_PAR"}
                      value={selectedData ? selectedData.system_par : ""}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      disabled
                    ></Form.Control>
                  </Col>
                </Row>
                <Row
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_row`]
                  }`}
                >
                  <div
                    className={`${
                      styles[
                        `${shop}_detailed_view_inventory_form_horizontal_line`
                      ]
                    }`}
                  ></div>
                </Row>
                <Row
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_row`]
                  }`}
                >
                  <Col
                    xl={6}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    OPEN ORDERS
                  </Col>
                  <Col
                    xl={6}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"OPEN_ORDERS"}
                      placeholder={selectedData ? selectedData.openorders : ""}
                      value={openOrders}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      pattern="^[0-9\.]*$"
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setOpenOrders(e.target.value));
                        }
                      }}
                    ></Form.Control>
                  </Col>
                </Row>
                <Row
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_row`]
                  }`}
                >
                  <Col
                    xl={6}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    ADJUSTED PAR
                  </Col>
                  <Col
                    xl={6}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      placeholder={
                        selectedData ? selectedData.adjustedpar : ""
                      }
                      name={"ADJUSTED_PAR"}
                      value={adjustedPar}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      pattern="^[0-9\.]*$"
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setAdjustedPar(e.target.value));
                        }
                      }}
                    ></Form.Control>
                  </Col>
                </Row>
                <Row
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_row`]
                  }`}
                >
                  <div
                    className={`${
                      styles[
                        `${shop}_detailed_view_inventory_form_horizontal_line`
                      ]
                    }`}
                  ></div>
                </Row>
                <Row
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_row`]
                  }`}
                >
                  <Col
                    xl={12}
                    md={12}
                    style={{ justifyContent: "center" }}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    ON-HAND INVENTORY
                  </Col>
                </Row>
                <Row
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_row`]
                  }`}
                >
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    CASE
                  </Col>
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      //name={"CASE"}
                      placeholder={selectedData ? selectedData.case_ : ""}
                      value={case_}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      pattern="^[0-9\.]*$"
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setCase_(e.target.value));
                        }
                      }}
                    ></Form.Control>
                  </Col>
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    LBS
                  </Col>
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"LBS"}
                      disabled={
                        unlock
                          ? unlock[0] == "N/A"
                            ? false
                            : unlock.find((element) => element == "LB")
                            ? false
                            : true
                          : false
                      }
                      placeholder={selectedData ? selectedData.lb : ""}
                      value={lbs}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      pattern="^[0-9\.]*$"
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setLbs(e.target.value));
                        }
                      }}
                    ></Form.Control>
                  </Col>
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    BAG
                  </Col>
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"BAG"}
                      placeholder={selectedData ? selectedData.bag : ""}
                      value={bag}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      pattern="^[0-9\.]*$"
                      disabled={
                        unlock
                          ? unlock[0] == "N/A"
                            ? false
                            : unlock.find((element) => element == "BAG")
                            ? false
                            : true
                          : false
                      }
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setBag(e.target.value));
                        }
                      }}
                    ></Form.Control>
                  </Col>
                </Row>
                <Row
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_row`]
                  }`}
                >
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    TRAY
                  </Col>
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"TRAY"}
                      placeholder={selectedData ? selectedData.tray : ""}
                      value={tray}
                      disabled={
                        unlock
                          ? unlock[0] == "N/A"
                            ? false
                            : unlock.find((element) => element == "TRAY")
                            ? false
                            : true
                          : false
                      }
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      pattern="^[0-9\.]*$"
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setTray(e.target.value));
                        }
                      }}
                    ></Form.Control>
                  </Col>
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    EA
                  </Col>
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"EA"}
                      placeholder={selectedData ? selectedData.ea : ""}
                      disabled={
                        unlock
                          ? unlock[0] == "N/A"
                            ? false
                            : unlock.find((element) => element == "EA")
                            ? false
                            : true
                          : false
                      }
                      value={ea}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      pattern="^[0-9\.]*$"
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setEa(e.target.value));
                        }
                      }}
                    ></Form.Control>
                  </Col>
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    OZ
                  </Col>
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"OZ"}
                      disabled={
                        unlock
                          ? unlock[0] == "N/A"
                            ? false
                            : unlock.find((element) => element == "OZ")
                            ? false
                            : true
                          : false
                      }
                      placeholder={selectedData ? selectedData.oz : ""}
                      value={oz}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      pattern="^[0-9\.]*$"
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setOz(e.target.value));
                        }
                      }}
                    ></Form.Control>
                  </Col>
                </Row>
                <Row
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_row`]
                  }`}
                >
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    GAL
                  </Col>
                  <Col
                    xl={4}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"GAL"}
                      disabled={
                        unlock
                          ? unlock[0] == "N/A"
                            ? false
                            : unlock.find((element) => element == "GAL")
                            ? false
                            : true
                          : false
                      }
                      placeholder={selectedData ? selectedData.gal : ""}
                      value={gal}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      pattern="^[0-9\.]*$"
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setGal(e.target.value));
                        }
                      }}
                    ></Form.Control>
                  </Col>
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    SLEEVES
                  </Col>
                  <Col
                    xl={4}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"SLEEVES"}
                      placeholder={selectedData ? selectedData.sleeves : ""}
                      value={sleeves}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      pattern="^[0-9\.]*$"
                      disabled={
                        unlock
                          ? unlock[0] == "N/A"
                            ? false
                            : unlock.find((element) => element == "SLEEVE")
                            ? false
                            : true
                          : false
                      }
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setSleeves(e.target.value));
                        }
                      }}
                    ></Form.Control>
                  </Col>
                </Row>
                <Row
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_row`]
                  }`}
                >
                  {/*<Col
                    xl={6}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    CALCULATED ON-HAND CASES
                  </Col>
                  <Col
                    xl={6}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"TOTAL_CASES"}
                      placeholder={"Calculated Total Cases"}
                      value={totalCases ? totalCases : selectedData.total_case}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      disabled
                    ></Form.Control>
                    </Col>*/}
                </Row>
                {/* UNDER DEVELOPMENT!!!!!
                <Row
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_row`]
                  }`}
                >
                  <Col
                    xl={6}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    CALCULATED ON-HAND EA
                  </Col>
                  <Col
                    xl={6}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"TOTAL_CASES"}
                      placeholder={"Calculated Total Cases"}
                      value={totalCases ? totalCases : selectedData.total_case}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      disabled
                    ></Form.Control>
                  </Col>
                </Row> */}
              </Col>
            </Row>
            <Row
              className={`${
                styles[`${shop}_detailed_view_inventory_form_row`]
              }`}
            >
              <div
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_horizontal_line`]
                }`}
              ></div>
            </Row>
            <Row 
            className={`${
              styles[`${shop}_detailed_view_inventory_form_row`]
            }`}>
                <Col 
                  xl={12}
                  md={12}
                  style={{justifyContent:"center"}}
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_label`]
                  }`}
                  >
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
                      <Form.Control name={"TOTAL_CASES"} placeholder={"Calculated Total Cases"} value={totalCases ? totalCases.toFixed(1) : selectedData.totalcase.toFixed(1)} 
                        className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`}>
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
                      <Form.Control name={"TOTAL_Bags"} placeholder={"Calculated Total Bags"} value={totalBags ? totalBags.toFixed(1) : selectedData.totalbags.toFixed(1)}
                        className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`}>
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
                      <Form.Control name={"EACH"} className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`} style={{borderRadius:"5px"}}
                        placeholder={selectedData ? selectedData.totaleach : ""}>
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
                      <Form.Control name={"TRAY"} className={`${ styles[`${shop}_detailed_view_inventory_form_input`]}`} style={{borderRadius:"5px"}}
                        placeholder={selectedData ? selectedData.totaltray : ""}>
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
                      <Form.Control name={"SLEEVES"} className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`} style={{borderRadius:"5px"}}
                        placeholder={selectedData ? selectedData.totalsleeves : ""}>
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
                        value={totalLBS ? totalLBS.toFixed(1) : selectedData.totallb.toFixed(1)} style={{borderRadius:"5px"}}
                        placeholder={selectedData ? selectedData.totallb : ""}>
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
                        placeholder={selectedData ? selectedData.totaloz : ""} value={totalOZ ? totalOZ.toFixed(1) : selectedData.totaloz.toFixed(1)}>
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
                      <Form.Control name={"LTR"} className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`} style={{borderRadius:"5px"}}
                        placeholder={selectedData ? selectedData.totalltr : ""}>
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
                      <Form.Control name={"ML"} className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`} style={{borderRadius:"5px"}}
                        placeholder={selectedData ? selectedData.totalml : ""}>
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
                      <Form.Control name={"GAL"} className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`} style={{borderRadius:"5px"}}
                        placeholder={selectedData ? selectedData.totalgal : ""}>
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
                      <Form.Control name={"GM"} className={`${styles[`${shop}_detailed_view_inventory_form_input`]}`} style={{borderRadius:"5px"}}
                        placeholder={selectedData ? selectedData.totalgm : ""}>
                      </Form.Control>
                    </Col>
                  </Row>
                </Col>
            </Row>
            <Row
              className={`${
                styles[`${shop}_detailed_view_inventory_form_row`]
              }`}
            >
              <div
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_horizontal_line`]
                }`}
              ></div>
            </Row>
            <Row
              className={`${
                styles[`${shop}_detailed_view_inventory_form_row`]
              }`}
            >
              <Col
                xl={6}
                md={6}
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_label`]
                }`}
              >
                ORDER
              </Col>
              <Col
                xl={6}
                md={6}
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_input_col`]
                }`}
              >
                <Form.Control
                  name={"ORDER"}
                  value={order_}
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_input`]
                  }`}
                  disabled
                ></Form.Control>
              </Col>
            </Row>
            <Row
              className={`${
                styles[`${shop}_detailed_view_inventory_form_row`]
              }`}
            >
              <Col
                xl={6}
                md={6}
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_label`]
                }`}
              >
                ADJUSTED ORDER
              </Col>
              <Col
                xl={6}
                md={6}
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_input_col`]
                }`}
              >
                <Form.Control
                  name={"ADJUSTED_ORDER"}
                  value={adjusted_order_}
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_input`]
                  }`}
                  disabled
                ></Form.Control>
              </Col>
            </Row>
            <Row style={{ paddingTop: 1.75 }}>
              <div
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_horizontal_line`]
                }`}
              ></div>
            </Row>
            <Row
              style={{ paddingTop: 1.75 }}
              className={`${styles[`${shop}_big_screen_view`]}`}
            >
              <Col
                xl={3}
                md={6}
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_label`]
                }`}
              >
                SALES
              </Col>
              <Col
                xl={3}
                md={6}
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_input_col`]
                }`}
              >
                <Form.Control
                  name={"SALES"}
                  pattern="^[0-9]*$"
                  onChange={(e) => {
                    if (!e.target.validity.patternMismatch) {
                      dispatch(setSales(e.target.value));
                    }
                  }}
                  placeholder={selectedData ? selectedData.sales : ""}
                  value={sales}
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_input`]
                  }`}
                ></Form.Control>
              </Col>
              <Col
                xl={3}
                md={6}
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_label`]
                }`}
              >
                ADJUSTED SALES
              </Col>
              <Col
                xl={3}
                md={6}
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_input_col`]
                }`}
              >
                <Form.Control
                  name={"ADJUSTED_SALES"}
                  placeholder={"Calculated Adjusted Sales"}
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_input`]
                  }`}
                  disabled
                ></Form.Control>
              </Col>
            </Row>
            <Row
              style={{ paddingTop: 1.75 }}
              className={`${styles[`${shop}_big_screen_view`]}`}
            >
              <Col
                xl={3}
                md={6}
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_label`]
                }`}
              >
                YIELD
              </Col>
              <Col
                xl={9}
                md={6}
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_input_col`]
                }`}
              >
                <Form.Control
                  name={"YIELD"}
                  pattern="^[0-9]*$"
                  onChange={(e) => {
                    if (!e.target.validity.patternMismatch) {
                      dispatch(setYield(e.target.value));
                    }
                  }}
                  placeholder={selectedData ? selectedData.yeild : ""}
                  value={yield_}
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_input`]
                  }`}
                ></Form.Control>
              </Col>
            </Row>

            <Row style={{ paddingTop: 1.75 }}>
              <div
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_horizontal_line`]
                }`}
              ></div>
            </Row>
            <Row style={{ paddingTop: 0, paddingBottom: 10 }}>
              <Col
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_input_btn_col`]
                } ${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}
                xs={{ span: 4, offset: 4 }}
              >
                <Button
                  bsPrefix={`${
                    styles[`${shop}_detailed_view_inventory_form_update_button`]
                  }`}
                  type="submit"
                >
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

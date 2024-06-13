import { createSlice } from "@reduxjs/toolkit";

export const dataReducer = createSlice({
  name: "dataReducer",
  initialState: {
    /* inventory form states */
    openOrders: '',
    onHand: '',
    order_:'',
    adjustedOrder:'',
    adjustedPar: '',
    case_: '',
    lbs: '',
    bag: '',
    tray: '',
    ea: '',
    oz: '',
    gal: '',
    gm:'',
    sleeves: '',
    totalCases: '',
    sales:'',
    yield:'',
    totalEach:'',
    totalTray:'',
    totalSleeves:'',
    totalOZ:'',
    totalLBS:'',
    totalLiters:'',
    totalML:'',
    totalGAL:'',
    totalGM:'',
    totalBags:'',
  /**************************/
    dates: null,
    requestedData: null,
    requestedLocations: null,
    selectedLocation:null,
    selectedData: null,
    selectedDate: null,
    selectedEndDate: null,
    instruction: "PLEASE SELECT A DATE OR SEARCH FOR ANY ITEM",
    toastMessage: "",
    isAuthenticated: false,
    userDetails:false,
    userName:null,
    selectedItem:"",
    loadingSpinner:false,
    tableData:null
  },
  reducers: {
    setTableData:(state,action)=> {
      state.tableData = action.payload;
    },
    setUserName:(state,action) => {
      state.userName = action.payload.userName;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload.selectedDate;
    },
    setShowAddForm: (state, action) => {
      state.showAddForm = action.payload.showAddForm;
    },
    setLoadingSpinner: (state, action) => {
      state.loadingSpinner = action.payload.loadingSpinner;
    },
    clearSelectedData:(state, action) => {
      state.selectedData = ""
    },
    updateSelectedDataForSelectedItem: (state, action) => {
      let requestedData = action.payload.requestedData;
      const distinct=(value, index,self)=>{
        return self.indexOf(value)===index;
      }
      let locations = requestedData.map(array=>array.location_)
      let uniqueLocations = locations.filter(distinct)
      uniqueLocations.push('ALL LOCATIONS')
      state.requestedLocations = uniqueLocations
      state.selectedItem = action.payload.selectedItem
      state.requestedData = action.payload.requestedData
    },
    updateSelectedDataForDescription: (state,action) => {
      let requestedData = action.payload.requestedData;
      const distinct=(value, index,self)=>{
        return self.indexOf(value)===index;
      }
      let locations = requestedData.map(array=>array.location_)
      let uniqueLocations = locations.filter(distinct)
      uniqueLocations.push('ALL LOCATIONS')
      state.requestedLocations = uniqueLocations
      state.requestedData = action.payload.requestedData
    },
    updateDataForSelectedDate: (state, action) => {
      const distinct=(value, index,self)=>{
        return self.indexOf(value)===index;
      }
      let requestedData = action.payload.requestedData;
      let locations = requestedData.map(array=>array.location_)
      let uniqueLocations = locations.filter(distinct)
      uniqueLocations.push('ALL LOCATIONS')
      state.requestedLocations = uniqueLocations
      state.requestedData = action.payload.requestedData;
      state.selectedDate = action.payload.selectedDate;
      state.selectedEndDate = action.payload.selectedEndDate;
    },
    createDatesArray: (state, action) => {
      let dates_array = [];
      for (const [key, value] of Object.entries(action.payload)) {
        dates_array.push(new Date(value["date"]));
      }
      dates_array.sort();
      state.dates = dates_array;
    },
    updateData: (state, action) => {
      state.selectedData = action.payload;
      state.selectedItem = action.payload.description
      state.order_ = action.payload.system_par;
    },
    setOpenOrders: (state, action) => {
      state.openOrders = action.payload;
    },
    setOnHand: (state, action) => {
      state.onHand = action.payload;
    },
    setCase_: (state, action) => {
      state.case_ = action.payload;
    },
    setTotalCases: (state, action) => {
      state.totalCases = action.payload;
    },
    setTotalEach: (state, action) => {
      state.totalEach = action.payload;
    },
    setTotalTray: (state, action) => {
      state.totalTray = action.payload;
    },
    setTotalSleeves: (state, action) => {
      state.totalSleeves = action.payload;
    },
    setTotalOz: (state, action) => {
      state.totalOZ = action.payload;
    },
    setTotalLBS: (state,action) => {
      state.totalLBS = action.payload;
    },
    setTotalLiters: (state, action) => {
      state.totalLiters = action.payload;
    },
    setTotalGM: (state, action) => {
      state.totalGM = action.payload;
    },
    setTotalML: (state, action) => {
      state.totalML = action.payload;
    },
    setTotalGAL: (state, action) => {
      state.totalGAL = action.payload;
    },
    setTotalBags: (state, action) => {
      state.totalBags = action.payload;
    },
    setAdjustedPar: (state, action) => {
      state.adjustedPar = action.payload;
    },
    setLbs: (state, action) => {
      state.lbs = action.payload;
    },
    setBag: (state, action) => {
      state.bag = action.payload;
    },
    setTray: (state, action) => {
      state.tray = action.payload;
    },
    setEa: (state, action) => {
      state.ea = action.payload;
    },
    setOz: (state, action) => {
      state.oz = action.payload;
    },
    setGal: (state, action) => {
      state.gal = action.payload;
    },
    setGm: (state, action) => {
      state.gm = action.payload;
    },
    setSleeves: (state, action) => {
      state.sleeves = action.payload;
    },
    setOrder:(state,action) =>{
      state.order_ = action.payload;
    },
    setAdjustedOrder:(state,action) =>{
      state.adjustedOrder = action.payload;
    },
    setSales:(state,action) =>{
      state.sales = action.payload;
    },
    setYield:(state,action) => {
      state.yield = action.payload;
    },
    setSelectedLocation:(state,action) =>{
      state.selectedLocation = action.payload
    },
    setInstructions:(state,action) =>{
      state.instruction = action.payload;
    },
    setSelectedData:(state,action) =>{
      state.selectedData = action.payload;
    },
    refetchUpdatedData:(state,action) =>{
      state.requestedData = action.payload
    },
    updateToastMessage:(state,action) => {
      state.toastMessage = action.payload
      console.log("dataReducer: ",state.toastMessage);
    },
    setIsAuthenticated:(state, action) =>{
      state.isAuthenticated = action.payload
    },
    setUserDetails:(state, action) =>{
      state.userDetails = action.payload
    },
    resetDataState:(state,action)=>{
      state.openOrders= ''
      state.onHand= ''
      state.order_=''
      state.adjustedOrder=''
      state.adjustedPar= ''
      state.case_= ''
      state.lbs= ''
      state.bag= ''
      state.tray= ''
      state.ea= ''
      state.oz= ''
      state.gal= ''
      state.gm=''
      state.sleeves= ''
      state.totalCases= ''
      state.totalEach=''
      state.totalTray=''
      state.totalSleeves=''
      state.totalOZ=''
      state.totalLBS=''
      state.totalLiters=''
      state.totalML=''
      state.totalGAL=''
      state.totalGM=''
      state.totalBags=''
      state.sales=''
      state.yield=''
      state.dates= null
      state.requestedData= null
      state.requestedLocations= null
      state.selectedLocation=null
      state.selectedData= null
      state.selectedEndDate = null
      state.selectedDate= null
      state.instruction= "PLEASE SELECT A DATE OR SEARCH FOR ANY ITEM"
      state.toastMessage= ""
      state.isAuthenticated= false
      state.userDetails=false
      state.loadingSpinner=false
      state.userName=null
      state.tableData=null
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSelectedDate,
  updateData,
  createDatesArray,
  updateSelectedDataForSelectedItem,
  updateDataForSelectedDate,
  setOpenOrders,
  setCase_,
  setAdjustedPar,
  setBag,
  setEa,
  setGal,
  setLbs,
  setOnHand,
  setOz,
  setSleeves,
  setTotalCases,
  setTotalEach,
  setTotalTray,
  setTotalSleeves,
  setTotalOz,
  setTotalLBS,
  setTotalLiters,
  setTotalGAL,
  setTotalGM,
  setTotalML,
  setTotalBags,
  setTray,
  setOrder,
  setAdjustedOrder,
  setSales,
  setYield,
  setSelectedLocation,
  setInstructions,
  refetchUpdatedData,
  setSelectedData,
  updateToastMessage,
  clearSelectedData,
  setIsAuthenticated,
  setUserDetails,
  resetDataState,
  setLoadingSpinner,
  setUserName,
  setTableData,
  updateSelectedDataForDescription,
  setGm
} = dataReducer.actions;


export default dataReducer.reducer;

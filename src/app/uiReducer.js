import { createSlice } from '@reduxjs/toolkit'

export const uiReducer = createSlice({
  name: 'uiReducer',
  initialState: {
    detailedTab:false,
    tableTab:false,
    visualizationTab:false,
    auth:"login",
    infoMessage:false,
    addInventoryTab:false,
    importInventoryTab:false
  },
  reducers: {
    changeImportInventoryTab: (state) => {
      state.detailedTab = false;
      state.tableTab = false;
      state.visualizationTab = false;
      state.addInventoryTab = false;
      state.importInventoryTab = true;
    },
    changeAddInventoryTab: (state) => {
      state.detailedTab = false;
      state.tableTab = false;
      state.visualizationTab = false;
      state.addInventoryTab = true;
      state.importInventoryTab = false;
    },
    changeDetailedTab: (state) => {
      state.detailedTab = true;
      state.tableTab = false;
      state.visualizationTab = false;
      state.addInventoryTab = false;
      state.importInventoryTab = false;
    },
    changeTableTab: (state) => {
        state.detailedTab = false;
        state.tableTab = true;
        state.visualizationTab = false;
        state.addInventoryTab = false;
        state.importInventoryTab = false;
    },
    changeVisualizationTab: (state) => {
        state.detailedTab = false;
        state.tableTab = false;
        state.visualizationTab = true;
        state.addInventoryTab = false;
        state.importInventoryTab = false;
    },
    toggleAuth:(state,action) =>{
      state.auth = action.payload 
    },
    setInfoMessage:(state, action) =>{
      state.infoMessage = action.payload
    },
    resetUiState:(state,action) =>{
      state.detailedTab=false
      state.tableTab=false
      state.visualizationTab=false
      state.auth="register"
      state.infoMessage=false
      state.addInventoryTab = false
      state.importInventoryTab = false
    }
  },
})

// Action creators are generated for each case reducer function
export const {changeDetailedTab, changeTableTab, changeVisualizationTab, toggleAuth, setInfoMessage, resetUiState, changeAddInventoryTab, changeImportInventoryTab} = uiReducer.actions

export default uiReducer.reducer
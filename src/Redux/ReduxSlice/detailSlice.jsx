import { createSlice } from '@reduxjs/toolkit'

const detailSlice = createSlice({
    name: 'chartdata',
    initialState: {
        chartDataFromserver: {},
        shapesStyles: {},
        ChartsInfo: [],
        imageInfo: [],
        imageDataFromserver: {},
        isImageSelected: false,
        ImageId: "",
        labelDataFromserver: {},
        labelInfo: [],
        isLabelSelected: false,
        LabelId: "",
        openPanel:false,
        panelIdIs:"",
        onPageClick:false,
        isDataFetched:false,
        notificationcount: 0,
        notificationDataIs:{},
    },
    reducers: {
        chartDataFromserver: (state, action) => {
            const { key, value } = action.payload;
            if (key) {
                state.chartDataFromserver = {
                    ...state.chartDataFromserver,
                    [key]: value
                };
            } else {
                state.chartDataFromserver = {
                    ...value
                };
            }
        },
        shapesStyles: (state, action) => {
            const { key, value } = action.payload;
            if (key) {
                state.shapesStyles = {
                    ...state.shapesStyles,
                    [key]: value
                };
            } else {
                state.shapesStyles = {
                    ...value
                };
            }
        },
        ChartsInfo: (state, action) => {
            state.ChartsInfo = action.payload
        },
        imageInfo: (state, action) => {
            state.imageInfo = action.payload
        },
        imageDataFromserver: (state, action) => {
            const { key, value } = action.payload;
            if (key) {
                state.imageDataFromserver = {
                    ...state.imageDataFromserver,
                    [key]: value
                };
            } else {
                state.imageDataFromserver = {
                    ...value
                };
            }
        },
        isImageSelected: (state, action) => {
            state.isImageSelected = action.payload
        },
        ImageId: (state, action) => {
            state.ImageId = action.payload
        },
        labelDataFromserver: (state, action) => {
            const { key, value } = action.payload;
            if (key) {
                state.labelDataFromserver = {
                    ...state.labelDataFromserver,
                    [key]: value
                };
            } else {
                state.labelDataFromserver = {
                    ...value
                };
            }
        },
        labelInfo: (state, action) => {
            state.labelInfo = action.payload
        },
        isLabelSelected: (state, action) => {
            state.isLabelSelected = action.payload
        },
        LabelId: (state, action) => {
            state.LabelId = action.payload
        },
        openPanel:(state,action)=>{
            state.openPanel = action.payload
        },
        panelIdIs:(state,action)=>{
            state.panelIdIs = action.payload
        },
        onPageClick:(state,action)=>{
            state.onPageClick = action.payload
        },
        isDataFetched:(state,action)=>{
            state.isDataFetched = action.payload
        },
        notificationcount:(state,action)=>{
            state.notificationcount = action.payload
        },
        notificationDataIs:(state,action)=>{
            state.notificationDataIs = action.payload
        },

    }
})

export const { chartDataFromserver, shapesStyles, ChartsInfo, imageInfo, isImageSelected, ImageId, imageDataFromserver, labelDataFromserver, labelInfo, isLabelSelected, LabelId,openPanel,panelIdIs,
    onPageClick,isDataFetched,notificationcount,notificationDataIs } = detailSlice.actions;


export default detailSlice.reducer

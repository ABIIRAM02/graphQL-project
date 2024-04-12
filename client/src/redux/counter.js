import { createSlice } from "@reduxjs/toolkit";
import { ADD_POSTDATA, ADD_POSTDATA_FULFILLED, ADD_POSTDATA_REJECTED, DELETE_POSTDATA, DELETE_POSTDATA_FULFILLED, DELETE_POSTDATA_REJECTED, FETCH_POSTDATA, FETCH_POSTDATA_FULFILLED, FETCH_POSTDATA_REJECTED, UPDATE_POSTDATA, UPDATE_POSTDATA_FULFILLED, UPDATE_POSTDATA_REJECTED } from "./constants";
import { UPDATE_POST } from "../graphQl/mutation";

const initialState = {
    postsData : [],
    loading : false,
    error : null
}

const counterSlice = createSlice({

    name : 'counter',
    initialState,

    reducers:{
    },
    extraReducers: ( builder ) => {
        builder
            // ? fetch
            .addCase( FETCH_POSTDATA , ( state , action ) => {
                state.loading = true
                state.error = null
            })
            .addCase( FETCH_POSTDATA_FULFILLED , ( state , action ) => {
                state.loading = false
                console.log( {'data' : action.payload});
                state.postsData = action.payload
            })
            .addCase( FETCH_POSTDATA_REJECTED , ( state , action ) => {
                state.loading = false
                state.error = action.payload
            })

            // ? Delete
            .addCase( DELETE_POSTDATA , ( state , action ) => {
                state.loading = true
                state.error = null
            })
            .addCase( DELETE_POSTDATA_FULFILLED , ( state , action ) => {
                state.loading = false
            })
            .addCase( DELETE_POSTDATA_REJECTED , ( state , action ) => {
                state.loading = false
                state.error = action.payload
            })

            // ? Add
            .addCase( ADD_POSTDATA , ( state , action )=>{
                state.loading = true
                state.error = null
            })
            .addCase( ADD_POSTDATA_FULFILLED , ( state , action )=>{
                state.loading = false
            })
            .addCase( ADD_POSTDATA_REJECTED , ( state , action )=>{
                state.loading = false
                state.error = action.payload
            })

            // ? Update
            .addCase( UPDATE_POSTDATA , ( state  )=>{
                state.loading = true
                state.error = null
            })
            .addCase( UPDATE_POSTDATA_FULFILLED , ( state  )=>{
                state.loading = false
            })
            .addCase( UPDATE_POSTDATA_REJECTED , ( state , action )=>{
                state.loading = false
                state.error = action.payload
            })
    }

})

export const { increment } = counterSlice.actions

export default counterSlice.reducer
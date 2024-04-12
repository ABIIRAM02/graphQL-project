import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import counterReducer from './counter'
import client from '../utils/utils'
import watchSagaActions from './sagaAction'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer:{
        counter: counterReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware) 
})

sagaMiddleware.run(watchSagaActions , client)
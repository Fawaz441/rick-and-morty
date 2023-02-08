import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import mainReducerSlice from "./main";
import mainSaga from "./main/saga";


const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: mainReducerSlice.reducer,
    middleware: [sagaMiddleware]
})

sagaMiddleware.run(mainSaga)

export default store
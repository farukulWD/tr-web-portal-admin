// import { configureStore } from "@reduxjs/toolkit";
// import { apiSlice } from "../api/apiSlice";

// export const store = configureStore({
//   reducer: {
//     [apiSlice.reducerPath]: apiSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
// });
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// src/redux/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "../api/productApi";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    // other reducers...
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

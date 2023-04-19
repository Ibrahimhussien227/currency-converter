import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { currencyApi } from "./services/currencyApi";

export const store = configureStore({
  reducer: {
    [currencyApi.reducerPath]: currencyApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(currencyApi.middleware),
});

setupListeners(store.dispatch);

/** @format */

import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import booksApi from "./features/books/booksApi";
import ordersApi from "./features/orders/orderApi";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, ordersApi.middleware),
});

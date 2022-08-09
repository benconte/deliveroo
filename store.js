import { configureStore } from '@reduxjs/toolkit'
import basektReducer from './features/basektSlice'
import restaurantReducer from './features/restaurantSlice'

export const store = configureStore({
  reducer: {
    // combining all slices together into one big store
    basket: basektReducer,
    restaurant: restaurantReducer,
  },
})
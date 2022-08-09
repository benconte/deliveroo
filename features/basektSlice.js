import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      // checking if the id we are trying to remove is in the basket
      const index = state.items.findIndex((items) => items.id === action.payload.id)

      // if it is, we remove it
      // we need a copy of the array to avoid mutating the original one
      let newBasket = [...state.items]

      if (index >= 0) {
        newBasket.splice(index, 1)
      } else {
        console.log(`Cant remove product {id: ${action.payload.id}} as its not in basket`)
      }

      state.items = newBasket
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions

// creating a selector. It allows us to select a part of the state
export const selectBasketItems = state => state.basket.items

export const selectBasketItemsWithId = (state, id) => 
state.basket.items.filter((item) => item.id === id);

export const selectBasketTotal = (state) => state.basket.items.reduce((total, item) => total += item.price, 0);

export default basketSlice.reducer

// reducer are the action that allow us to modify the store
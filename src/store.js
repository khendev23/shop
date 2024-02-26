import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice'


const cart = createSlice({
  name : 'cart',
  initialState : [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ],
  reducers : {
    increaseCount(state, action) {
      let 번호 = state.findIndex((a)=>{ return a.id == action.payload })
      state[번호].count++
    }
  }
})

export const { increaseCount } = cart.actions

export default configureStore({
  reducer: { 
    user : user.reducer,
    cart : cart.reducer
  }
})
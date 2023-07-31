import { combineReducers } from 'redux'

import accessoriesReducer from '@/containers/Home/accessoriesReducer'
import cartReducer from '@/containers/Cart/cartReducer'
import profileReducer from '@/containers/Profile/profileReducer'
import configurationsReducer from '@/containers/Builds/configurationsReducer'
import modalReducer from '@/components/Modal/ModalReducer'
import orderReducer from '@/containers/Orders/ordersReducer'
import pageLevelReducer from '@/containers/PageLevel/pageLevelReducer'

const appReducer = combineReducers({
  accessories: accessoriesReducer,
  cart: cartReducer,
  user: profileReducer,
  configurations: configurationsReducer,
  modal: modalReducer,
  orders: orderReducer,
  pageLevel: pageLevelReducer
})

const rootReducer = (state, action) => {

  return appReducer(state, action)
}

export default rootReducer

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createWrapper } from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './rootReducer'

export const wrapper = createWrapper(
  () => createStore(
    rootReducer,
    { ...{ accessories: {} } },
    composeWithDevTools(applyMiddleware(thunk))
  ), { debug: true })

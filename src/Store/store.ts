import {
    applyMiddleware,
    combineReducers,
    createStore,
    Reducer,
} from 'redux'
import thunk from 'redux-thunk'

import { reducer } from '../Reducers/Reducer'

const rootReducer: Reducer = combineReducers({reducer})

export default createStore(rootReducer, applyMiddleware(thunk))

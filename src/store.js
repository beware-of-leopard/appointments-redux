import { createStore } from 'redux'
import {rootReducer} from './reducers'

//if middleware was used, this is where it would happen
let store = createStore(rootReducer)

export default store;
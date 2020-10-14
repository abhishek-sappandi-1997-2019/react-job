import {createStore , combineReducers ,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import jobReducer from '../reducers/jobReducer'

const Configstore = () =>{
    const store = createStore(combineReducers({
        job : jobReducer 
    }), applyMiddleware(thunk))
    return store
}

export default Configstore
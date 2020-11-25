import { combineReducers } from 'redux'

import tweetsReducer from './tweets'

export default combineReducers({
    tweets: tweetsReducer
})
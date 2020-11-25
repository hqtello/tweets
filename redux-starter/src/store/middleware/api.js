import axios from 'axios'

import * as actions from '../api'

const api = ({dispatch}) => next => async action => {
    if (action.type !== actions.apiCallBegan.type)
        return next(action)
    
    const {url, headers, method, data, onStart, onSuccess, onError} = action.payload
    
    // Loader: tweetsRequested
    if (onStart)
        dispatch({type: onStart})
    
    // apiCallBegan
    next(action)
    
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    try {
        const response = await axios.request({
            baseURL: `${proxy}https://api.twitter.com/2/tweets/search`,
            url,
            method,
            headers,
            data
        })

        // General success action
        dispatch(actions.apiCallSuccess(response.data))

        // Specific success action
        if (onSuccess)
            dispatch({type: onSuccess, payload: response.data})
    } catch (error) {
        // General error action
        dispatch(actions.apiCallFailed(error.message))

        // Specific error action
        if (onError)
            dispatch({type: onError, payload: error.message})
    }
}

export default api
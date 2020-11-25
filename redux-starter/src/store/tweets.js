import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'

import { apiCallBegan } from './api'

const slice = createSlice({
    name: 'tweets',
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        tweetsRequested: (tweets, action) => {
            tweets.loading = true
        },

        tweetsRequestFailed: (tweets, action) => {
            tweets.loading = false
        },

        tweetsReceived: (tweets, action) => {
            tweets.list = action.payload.data
            tweets.loading = false
            tweets.lastFetch = Date.now()
        }
    }

})

const {tweetsRequested, tweetsRequestFailed,tweetsReceived} = slice.actions
export default slice.reducer

// Action Creators
const url = '/recent?query=from:realDonaldTrump&tweet.fields=created_at&expansions=author_id&user.fields=created_at&max_results=10'

export const loadTweets = () => (dispatch, getState) => {
    const {lastFetch} = getState().entities.tweets

    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')
    const cacheTime = 10
    if (diffInMinutes < cacheTime) return

    dispatch(
        apiCallBegan({
            url,
            onStart: tweetsRequested.type,
            headers: {'authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAIDKJwEAAAAAW3hcPO0uUWFUyy%2FGsPWQx2yI%2F%2F8%3DV3pY7c2SngukIqZVysVXojEMiEd9meG6Agw2wYHoXODArxe4HS'},
            method: 'get',
            onSuccess: tweetsReceived.type,
            onError: tweetsRequestFailed.type
        })
    )
}


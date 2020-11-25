import configureStore from './store/configureStore'
import { loadTweets } from './store/tweets'

const store = configureStore()

store.dispatch(loadTweets())

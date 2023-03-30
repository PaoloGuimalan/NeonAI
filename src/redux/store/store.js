import { createStore, combineReducers } from 'redux'
import { setmusicplayer, setneonenabled, setneonspeaking, setvoicetransmitresult } from '../actions/actions'

const combiner = combineReducers({
    neonenabled: setneonenabled,
    neonspeaking: setneonspeaking,
    voicetransmitresult: setvoicetransmitresult,
    musicplayer: setmusicplayer
})

const store = createStore(combiner);

export default store;
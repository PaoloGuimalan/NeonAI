import { SET_MUSIC_PLAYER, SET_NEON_ENABLED, SET_NEON_SPEAKING, SET_VOICE_TRANSMIT_RESULT } from "../types/types";

export const setneonenabled = (state = false, action) => {
    switch(action.type){
        case SET_NEON_ENABLED:
            return action.neonenabled;
        default:
            return state;
    }
}

export const setneonspeaking = (state = false, action) => {
    switch(action.type){
        case SET_NEON_SPEAKING:
            return action.neonspeaking;
        default:
            return state;
    }
}

export const setvoicetransmitresult = (state = "", action) => {
    switch(action.type){
        case SET_VOICE_TRANSMIT_RESULT:
            return action.voicetransmitresult;
        default:
            return state;
    }
}

export const setmusicplayer = (state = false, action) => {
    switch(action.type){
        case SET_MUSIC_PLAYER:
            return action.musicplayer;
        default:
            return state;
    }
}
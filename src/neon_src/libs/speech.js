import { beforesp, aftersp } from "./sound";
import { voicelistenerinit, abortListener, startListener } from "./voicelistener";

var voices;

function initVoices(){
    voices = window.speechSynthesis.getVoices()
}

function speechtext(text, callback, eject, extracall){
    abortListener()
    beforesp()
    setTimeout(() => {
        callback()
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;
        utterance.volume = 1;
        utterance.voice = voices[1]
        speechSynthesis.speak(utterance)
        utterance.addEventListener("end", () => {
            eject()
            aftersp()
            // voicelistenerinit((data) => { extracall(data) })
            startListener()
        })
    }, 1000)
}

export { speechtext, initVoices };
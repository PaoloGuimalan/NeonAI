import { actionResponseMain } from "./actionresponse"

var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
var recoginition = new SpeechRecognition()
recoginition.continuous = true
recoginition.interimResults = true
recoginition.lang = "en-US"

var isStarted = false;

var abort = () => { 
    if(isStarted){
        recoginition.abort()
    }
 };
var start = () => { 
    if(isStarted == false){
        console.log("will start...")
        recoginition.start()
    }
}

function voicelistenerinit(callback, initializeAction){ 

    recoginition.onstart = () => {
        // alert("has started")
        console.log("started....")
        isStarted = true
    }
    
    recoginition.onresult = (event) => {
        const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')

        console.log("on result.....")
    
        // var timeout = setTimeout(() => {
        //     initializeAction(transcript)
        // }, 2000)

        callback(transcript)
        
        recoginition.onend = () => {
            console.log('continue..')
            isStarted = false;
            // initializeAction(transcript)
            // start()
        }

        return () => {
            // clearTimeout(timeout)
        }
    }

    recoginition.onerror = err => {
        console.log(err)
    }

    // return () => {
    //     console.log("on abort return...")
    //     recoginition.abort()
    // }
}

function abortListener(){
    console.log("on abort...")
    abort()
}

function startListener(){
    console.log("on start listener...")
    start()
}

export { voicelistenerinit, abortListener, startListener }





/**
 * 
 * actionresponse keeps re-executing because the speech recognition keeps ending
 * 
 */
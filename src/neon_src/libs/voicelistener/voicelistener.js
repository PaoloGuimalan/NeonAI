var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
var recognition = new SpeechRecognition()
recognition.continous = true
recognition.interimResults = true
recognition.lang = "en-US"

recognition.onstart = () => {
    console.log("started....")
}

recognition.onresult = (event) => {
    console.log("on result...")
    const current = event.resultIndex;

    const transcript = event.results[current][0].transcript
    console.log(transcript)

    recognition.onend = () => {
        console.log("on end...")
        startListener()
    }
}

function startListener(){
    recognition.start()
}

function abortListener(){
    recognition.abort()
}

export { startListener, abortListener }
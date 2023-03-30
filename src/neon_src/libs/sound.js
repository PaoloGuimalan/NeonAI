const poweron =  require("../resources/sounds/poweron.wav")
const beforespeech = require("../resources/sounds/beforespeech.wav")
const afterspeech = require("../resources/sounds/afterspeech.wav")

function turnon(){
    var trn = new Audio(poweron)
    trn.play()
}

function beforesp(){
    var bfsp = new Audio(beforespeech)
    bfsp.play()
}

function aftersp(){
    var aftsp = new Audio(afterspeech)
    aftsp.play()
}

export { turnon, beforesp, aftersp }
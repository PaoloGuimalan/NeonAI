// const { parseFile } = require('music-metadata')
const music = require("../resources/sounds/musictest/Shoot to Thrill.mp3")

function playMusic(callback){
    var player = new Audio(music)
    player.addEventListener("loadeddata", (event) => {
        var m = event.path[0].duration / 60;
        var name = event.path[0].attributes.src.value.split("/")[3].split(".")[0]
        const data = {
            title: name,
            duration: m.toFixed(2),
            seconds: event.path[0].duration
        }

        callback(data)
        // console.log(2 / event.path[0].duration * 100)
    })

    // player.addEventListener("playing", (dataevent) => {
    //     console.log(dataevent)
    // })

    player.play()
}

export { playMusic }
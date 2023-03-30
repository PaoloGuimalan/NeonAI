import Axios from 'axios'
import { speechtext } from './speech'

function transmitIdentifiermain(data, callback, eject){
    // alert(data)
    const mapdata = data.split(" ")

    fetchDictionary(data.toLowerCase(), callback, eject)

    // const processData = (weights, data) => {

    // }

    // mapdata.map((wrd) => {
    //     // console.log(dictionary[wrd])
    //     fetchDictionary(wrd.toLowerCase())
    // })
}

function constructResponse(dataResponsem, callback, eject){
    speechtext(`Transmitted data consist of ${
        dataResponsem.map((item) => {
            return `, ${item.word} with ${
                item.content.map((cnt) => {
                    return `${cnt.count} ${cnt.name}`
                })
            }`
        })
    }`, () => { callback() }, () => { eject() }, () => { return; })
}

function fetchDictionary(wrd, callback, eject){
    Axios.get(`http://localhost:3001/dictionary/${wrd.replace(/[^a-zA-Z ]/g, "")}`).then((response) => {
        // console.log(response.data)
        constructResponse(response.data, callback, eject)
    }).catch((err) => {
        console.log(err)
    })
}

export { transmitIdentifiermain }
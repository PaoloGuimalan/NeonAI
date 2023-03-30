import Axios from 'axios'
import { speechtext } from './speech'

function initProcessMessage(data, callback, eject){
    Axios.post(`http://localhost:3001/processMessage`, {
        message: data
    }).then((response) => {
        if(response.data.status){
            console.log(response.data.result)
        }
    }).catch((err) => {
        console.log(err);
    })
}

export { initProcessMessage }
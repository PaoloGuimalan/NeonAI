import { speechtext } from "./speech"
import { abortListener } from "./voicelistener";
import Axios from 'axios'
import { URL_LOCAL } from "../resources/json/urls";

function actionResponseMain(data, callback1, callback2, executor){
    if(data.includes("neon")){
        speechtext("I am listening", () => { callback1(); }, () => { callback2(); }, () => { return; });
    }
    else if(data.includes("drop my needle")){
        callback1()
        callback2()
        executor("music")
    }
    else{
        speechtext("I cannot understand", () => { callback1(); }, () => { callback2(); }, () => { return; })
    }
}

// function actionResponseMain(data, callback1, callback2, executor){
//     // speechtext("I am listening", () => { callback1(); }, () => { callback2(); }, () => { return; });
//     Axios.get(`${URL_LOCAL}/testProcessMessage/${data}`).then((response) => {
//         if(response.data.status){

//         }
//         else{
//             speechtext("Message cannot be processed", () => { callback1(); }, () => { callback2(); }, () => { return; });
//         }
//     }).catch((err) => {
//         console.log(err)
//         speechtext(err.message, () => { callback1(); }, () => { callback2(); }, () => { return; });
//     })
// }

export { actionResponseMain }
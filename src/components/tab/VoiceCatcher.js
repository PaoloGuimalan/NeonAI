import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import '../../styles/tab/VoiceCatcher.css'
import { useDispatch, useSelector } from 'react-redux'
import { transmitIdentifiermain } from '../../neon_src/libs/transmitIdentifier'
import { SET_NEON_SPEAKING } from '../../redux/types/types'
import { initProcessMessage } from '../../neon_src/libs/processMessage'
import { actionResponseMain } from '../../neon_src/libs/actionresponse'

function VoiceCatcher() {

  const voicetransmitresult = useSelector(state => state.voicetransmitresult)
  const neonenabled = useSelector(state => state.neonenabled);

  const displayRef = useRef(null);
  const controllersRef = useRef(null);

  const dispatch = useDispatch()

  const [transmitText, settransmitText] = useState("")

  const setneonspeaking = (bool) => {
    dispatch({ type: SET_NEON_SPEAKING, neonspeaking: bool })
  }

  useEffect(() => {
    var timeout = setTimeout(() => {
      if(neonenabled){
        actionResponseMain(voicetransmitresult, () => { setneonspeaking(true) }, () => { 
          setneonspeaking(false)
            // startListenerRepeat()
        }, (cond) => {
            if(cond.includes("music")){
                dispatch({ type: SET_MUSIC_PLAYER, musicplayer: true })
                // abortListener()
            }
        }); 
      }
    },2000)

    return () => {
      clearTimeout(timeout)
    }
  },[voicetransmitresult])

  return (
    <motion.div
    animate={{
      height: neonenabled? "150px" : "2px",
      borderColor: neonenabled? "cyan" : "grey",
      color: neonenabled? "cyan" : "transparent",
      textShadow: neonenabled? "0px 0px 10px cyan" : "0px 0px 0px transparent"
    }}
    transition={{
      duration: 1,
      delay: neonenabled? 5 : 0
    }}
    // drag
    dragConstraints={{ top: "10px", bottom: "10px", right: "10px", left: "10px" }}
    id='div_voicecatcher'>
        <p id='p_label_voice_transmit'>Voice Transmit</p>
        <div id='div_text_container'>
            <p id='p_text'>{voicetransmitresult}</p>
            {/* <textarea id='textarea_voicetransmit' value={transmitText} onChange={(e) => { settransmitText(e.target.value) }}></textarea> */}
            {/* <button id='btn_voicetransmit_process' onClick={() => {
              transmitIdentifiermain(transmitText, () => { setneonspeaking(true) }, () => { setneonspeaking(false) })
              // initProcessMessage(transmitText, () => { setneonspeaking(true) }, () => { setneonspeaking(false) })
            }}>Process</button> */}
        </div>
    </motion.div>
  )
}

export default VoiceCatcher
import React, { useState, useEffect } from 'react'
import '../../styles/main/Home.css'
import { motion } from 'framer-motion'
import { initVoices, speechtext } from '../../neon_src/libs/speech'
import { turnon } from '../../neon_src/libs/sound'
import { useDispatch, useSelector } from 'react-redux'
import { SET_MUSIC_PLAYER, SET_NEON_ENABLED, SET_NEON_SPEAKING, SET_VOICE_TRANSMIT_RESULT } from '../../redux/types/types'
import VoiceCatcher from '../tab/VoiceCatcher'
import { abortListener, voicelistenerinit } from '../../neon_src/libs/voicelistener'
import { actionResponseMain } from '../../neon_src/libs/actionresponse'
import MusicPlayer from '../tab/MusicPlayer'

function Home() {

    const neonenabled = useSelector(state => state.neonenabled);
    const neonspeaking = useSelector(state => state.neonspeaking)
    const dispatch = useDispatch()
//   const [neonenabled, setneonenabled] = useState(false);
//   const [neonspeaking, setneonspeaking] = useState(false);

    const setneonenabled = (bool) => {
        dispatch({ type: SET_NEON_ENABLED, neonenabled: bool })
    }

    const setneonspeaking = (bool) => {
        dispatch({ type: SET_NEON_SPEAKING, neonspeaking: bool })
    }

    useEffect(() => {
        initVoices()

        // window.open('./voiceCatcherModule/index.html','winname','directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=350');
    }, [neonenabled])

    const neonWake = () => {
        if(!neonenabled){
            setneonenabled(!neonenabled)
            turnon()
            setTimeout(() => {
                speechtext("Welcome! System has new updates and on way for testing.", () => { setneonspeaking(true) }, () => { setneonspeaking(false) }, (data) => { dispatch({ type: SET_VOICE_TRANSMIT_RESULT, voicetransmitresult: data }) })
                voicelistenerinit((data) => { 
                    dispatch({ type: SET_VOICE_TRANSMIT_RESULT, voicetransmitresult: data });
                }, (data, startListenerRepeat) => {
                    // actionResponseMain(data, () => { setneonspeaking(true) }, () => { 
                    //     setneonspeaking(false)
                    //     // startListenerRepeat()
                    // }, (cond) => {
                    //     if(cond.includes("music")){
                    //         dispatch({ type: SET_MUSIC_PLAYER, musicplayer: true })
                    //         abortListener()
                    //     }
                    // }); 
                })
            }, 1000)
            // setTimeout(() => {
            //     voicelistenerinit((data) => { dispatch({ type: SET_VOICE_TRANSMIT_RESULT, voicetransmitresult: data }) })
            // }, 2000)
        }
        else{
            closeWindow()
        }
    }

    const closeWindow = () => {
        speechtext("System shutting down.", () => {
            setneonspeaking(true)
        }, () => {
            setneonspeaking(false)
            setneonenabled(false)
            setneonenabled(!neonenabled)
            turnon()
            setTimeout(() => {
                window.close()
            }, 3000)
        })
    }


  return (
    <div id='div_home'>
        <motion.div
        animate={{
            border: neonenabled? "solid 3px cyan" : "solid 3px transparent",
            boxShadow: neonenabled? "0px 0px 30px cyan, inset 0px 0px 70px cyan" : "0px 0px 30px transparent, inset 0px 0px 70px transparent"
        }}
        id='div_neon_interface'>
            <motion.div
            animate={neonenabled? {
                rotate: 360,
                borderTop: "solid 5px cyan",
                borderLeft: "solid 5px cyan",
                borderRight: "solid 5px cyan",
                borderBottom: "solid 5px cyan",
                borderRightStyle: "dashed",
                borderBottomStyle: "dashed"
            } : {
                borderTop: "solid 5px transparent",
                borderLeft: "solid 5px transparent",
                borderRight: "solid 5px transparent",
                borderBottom: "solid 5px transparent",
                borderRightStyle: "dashed",
                borderBottomStyle: "dashed"
            }}
            transition={{
                duration: 5,
                repeat: Infinity
            }}
            id='div_inner_neon'>
                <motion.div
                animate={neonenabled? {
                    rotate: -360,
                    borderTop: "solid 5px cyan",
                    borderLeft: "solid 5px cyan",
                    borderRight: "solid 5px cyan",
                    borderBottom: "solid 5px cyan",
                    borderRightStyle: "dashed",
                    borderBottomStyle: "dashed"
                } : {
                    borderTop: "solid 5px transparent",
                    borderLeft: "solid 5px transparent",
                    borderRight: "solid 5px transparent",
                    borderBottom: "solid 5px transparent",
                    borderRightStyle: "dashed",
                    borderBottomStyle: "dashed"
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity
                }}
                id='div_inner2_neon'>
                </motion.div>
            </motion.div>
            <motion.p
            animate={{
                color: neonenabled? "cyan" : "grey",
                textShadow: neonenabled? "0px 0px 10px cyan" : "0px 0px 10px transparent"
            }}
            id='p_label_neon' onClick={() => { neonWake() }}>NEON</motion.p>
        </motion.div>
        <div id='div_speaking_anim'>
            <motion.div
            animate={{
                maxHeight: neonspeaking? "50px" : "2px",
                backgroundColor: neonenabled? "cyan" : "grey",
                boxShadow: neonenabled? "0px 0px 10px cyan" : "0px 0px 10px transparent"
            }}
            transition={neonspeaking? {
                delay: 0.8,
                duration: 0.5,
                repeat: Infinity
            } : null}
            className='div_loader'></motion.div>
            <motion.div
            animate={{
                maxHeight: neonspeaking? "50px" : "2px",
                backgroundColor: neonenabled? "cyan" : "grey",
                boxShadow: neonenabled? "0px 0px 10px cyan" : "0px 0px 10px transparent"
            }}
            transition={neonspeaking? {
                delay: 0.7,
                duration: 0.5,
                repeat: Infinity
            } : null}
            className='div_loader'></motion.div>
            <motion.div
            animate={{
                maxHeight: neonspeaking? "50px" : "2px",
                backgroundColor: neonenabled? "cyan" : "grey",
                boxShadow: neonenabled? "0px 0px 10px cyan" : "0px 0px 10px transparent"
            }}
            transition={neonspeaking? {
                delay: 0.6,
                duration: 0.5,
                repeat: Infinity
            } : null}
            className='div_loader'></motion.div>
            <motion.div
            animate={{
                maxHeight: neonspeaking? "50px" : "2px",
                backgroundColor: neonenabled? "cyan" : "grey",
                boxShadow: neonenabled? "0px 0px 10px cyan" : "0px 0px 10px transparent"
            }}
            transition={neonspeaking? {
                delay: 0.5,
                duration: 0.5,
                repeat: Infinity
            } : null}
            className='div_loader'></motion.div>
            <motion.div
            animate={{
                maxHeight: neonspeaking? "50px" : "2px",
                backgroundColor: neonenabled? "cyan" : "grey",
                boxShadow: neonenabled? "0px 0px 10px cyan" : "0px 0px 10px transparent"
            }}
            transition={neonspeaking? {
                delay: 0.4,
                duration: 0.5,
                repeat: Infinity
            } : null}
            className='div_loader'></motion.div>
            <motion.div
            animate={{
                maxHeight: neonspeaking? "50px" : "2px",
                backgroundColor: neonenabled? "cyan" : "grey",
                boxShadow: neonenabled? "0px 0px 10px cyan" : "0px 0px 10px transparent"
            }}
            transition={neonspeaking? {
                delay: 0.3,
                duration: 0.5,
                repeat: Infinity
            } : null}
            className='div_loader'></motion.div>
            <motion.div
            animate={{
                maxHeight: neonspeaking? "50px" : "2px",
                backgroundColor: neonenabled? "cyan" : "grey",
                boxShadow: neonenabled? "0px 0px 10px cyan" : "0px 0px 10px transparent"
            }}
            transition={neonspeaking? {
                delay: 0.2,
                duration: 0.5,
                repeat: Infinity
            } : null}
            className='div_loader'></motion.div>
            <motion.div
            animate={{
                maxHeight: neonspeaking? "50px" : "2px",
                backgroundColor: neonenabled? "cyan" : "grey",
                boxShadow: neonenabled? "0px 0px 10px cyan" : "0px 0px 10px transparent"
            }}
            transition={neonspeaking? {
                delay: 0,
                duration: 0.5,
                repeat: Infinity
            } : null}
            className='div_loader'></motion.div>
            <motion.div
            animate={{
                maxHeight: neonspeaking? "50px" : "2px",
                backgroundColor: neonenabled? "cyan" : "grey",
                boxShadow: neonenabled? "0px 0px 10px cyan" : "0px 0px 10px transparent"
            }}
            transition={neonspeaking? {
                delay: 0.2,
                duration: 0.5,
                repeat: Infinity
            } : null}
            className='div_loader'></motion.div>
            <motion.div
            animate={{
                maxHeight: neonspeaking? "50px" : "2px",
                backgroundColor: neonenabled? "cyan" : "grey",
                boxShadow: neonenabled? "0px 0px 10px cyan" : "0px 0px 10px transparent"
            }}
            transition={neonspeaking? {
                delay: 0.3,
                duration: 0.5,
                repeat: Infinity
            } : null}
            className='div_loader'></motion.div>
            <motion.div
            animate={{
                maxHeight: neonspeaking? "50px" : "2px",
                backgroundColor: neonenabled? "cyan" : "grey",
                boxShadow: neonenabled? "0px 0px 10px cyan" : "0px 0px 10px transparent"
            }}
            transition={neonspeaking? {
                delay: 0.4,
                duration: 0.5,
                repeat: Infinity
            } : null}
            className='div_loader'></motion.div>
            <motion.div
            animate={{
                maxHeight: neonspeaking? "50px" : "2px",
                backgroundColor: neonenabled? "cyan" : "grey",
                boxShadow: neonenabled? "0px 0px 10px cyan" : "0px 0px 10px transparent"
            }}
            transition={neonspeaking? {
                delay: 0.5,
                duration: 0.5,
                repeat: Infinity
            } : null}
            className='div_loader'></motion.div>
            <motion.div
            animate={{
                maxHeight: neonspeaking? "50px" : "2px",
                backgroundColor: neonenabled? "cyan" : "grey",
                boxShadow: neonenabled? "0px 0px 10px cyan" : "0px 0px 10px transparent"
            }}
            transition={neonspeaking? {
                delay: 0.6,
                duration: 0.5,
                repeat: Infinity
            } : null}
            className='div_loader'></motion.div>
            <motion.div
            animate={{
                maxHeight: neonspeaking? "50px" : "2px",
                backgroundColor: neonenabled? "cyan" : "grey",
                boxShadow: neonenabled? "0px 0px 10px cyan" : "0px 0px 10px transparent"
            }}
            transition={neonspeaking? {
                delay: 0.7,
                duration: 0.5,
                repeat: Infinity
            } : null}
            className='div_loader'></motion.div>
            <motion.div
            animate={{
                maxHeight: neonspeaking? "50px" : "2px",
                backgroundColor: neonenabled? "cyan" : "grey",
                boxShadow: neonenabled? "0px 0px 10px cyan" : "0px 0px 10px transparent"
            }}
            transition={neonspeaking? {
                delay: 0.8,
                duration: 0.5,
                repeat: Infinity
            } : null}
            className='div_loader'></motion.div>
        </div>
        <VoiceCatcher />
        <MusicPlayer />
    </div>
  )
}

export default Home
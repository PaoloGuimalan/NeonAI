import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import '../../styles/tab/MusicPlayer.css'
import { useSelector } from 'react-redux'
import { playMusic } from '../../neon_src/libs/musicplayerlib';

function MusicPlayer() {

  const musicplayer = useSelector(state => state.musicplayer)
//   const musicplayer = true;
  const [musicData, setmusicData] = useState({
    title: "",
    duration: "",
    seconds: ""
  })
  const [secondsPassed, setsecondsPassed] = useState(0);

  useEffect(() => {
    musicInit()
  },[musicplayer])

  const musicInit = () => {
    if(musicplayer){
        setTimeout(() => {
            playMusic((data) => {
                setmusicData(data)
                setInterval(() => {
                    setsecondsPassed(sec => sec + 1)
                }, 2000)
            })
        }, 1000)
    }
  }

  return (
    <motion.div
    animate={{
        height: musicplayer? "200px" : "2px",
        borderColor: musicplayer? "cyan" : "grey",
        color: musicplayer? "cyan" : "transparent",
        textShadow: musicplayer? "0px 0px 10px cyan" : "0px 0px 0px transparent"
      }}
      transition={{
        duration: 1,
        delay: 0
      }}
    id='div_musicplayer'>
        <p id='p_label_voice_transmit'>Music Player</p>
        <div id='div_musicInterface'>
            <div id='div_spinner'>
                <motion.div
                animate={{
                    rotate: 360
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity
                }}
                id='div_spinner_anim'>
                    <div id='div_spinner_whole'></div>
                </motion.div>
            </div>
            <div id='div_music_info'>
                <p>{musicData.title}</p>
            </div>
        </div>
        <div id='div_duration'>
            <p className='p_durations'>{parseFloat(secondsPassed / 60).toFixed(2)}</p>
            <div id='duration_counter_container'>
                <motion.div
                animate={{
                    width: `${secondsPassed / musicData.seconds * 100}%`
                }}
                id='div_duration_counter'></motion.div>
            </div>
            <p className='p_durations'>{musicData.duration}</p>
        </div>
    </motion.div>
  )
}

export default MusicPlayer
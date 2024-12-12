import Head from 'next/head'
import Image from 'next/image'
import { useUser } from '../context/Context.js'
import { WithoutAuth } from '../../HOCs/WithoutAuth'
import Button from '../components/Button'

import Link from 'next/link'
import FormAdds from '../components/FormAdds'
import Layout from '../layout/Layout'

import Section from '../components/Section'
import Date from '../components/Date'
import Header from '../components/Header'

import styles from '../styles/Home.module.css'
import { handleSignOut } from '../firebase/utils'
import { uploadIMG } from '../firebase/storage'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { listAll } from 'firebase/storage'
import Temporizador from '../components/Temporizador'
import EdicionDigital from '../components/EdicionDigital'
import VideosSolicitados from '../components/VideosSolicitados'

const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems'
const YOUTUBE_API_KEY = "AIzaSyBZkk7x_tGRbf-Yg_A7Y9QYcBQe7T9QtWU"

var fetch_url = `${YOUTUBE_PLAYLIST_ITEMS_API}`


function Home() {
    const { userDB, setUserData, monthAndYear, setUserSuccess, success, postsIMG, showImg, showVideo, date, setUserDate, zoomIMG, setZoomIMG, bgOpacity, setBgOpacity, timer } = useUser()
    const router = useRouter()
    const pathname = usePathname()
    const [listYT, setListYT] = useState(false);


    // const [zoomIMG, setZoomIMG] = useState(undefined)
    const [modalsInterval, setModalsInterval] = useState(false)

    async function getYB() {
        const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=8&playlistId=UULFXFA6pzESb1NQMsepmhC6Vw&key=${YOUTUBE_API_KEY}`)
        const data = await res.json();
        setListYT(data)
    }

    function redirectYT() {
        window.open('https://www.youtube.com/@periodicohoybolivia2201/videos', '_blank')
    }

    useEffect(() => {
        getYB()
    }, [])



    function redirect(ruta) {
        ruta != '#' ? window.open(ruta, '_blank') : ''
    }

    function closeZoom() {
        setZoomIMG(undefined)
        setBgOpacity(false)
        // zoomIMG.lateral !== true ? console.log('nolaterla') : console.log('lateral')
        zoomIMG.lateral !== true && userDB && userDB['Inicio'] && userDB['Inicio']['Modals'] && Object.values(userDB['Inicio']['Modals']).length > 0 && setUserModalsInterval(5000)
        // zoomIMG.lateral !== true && userDB && userDB['Inicio'] && userDB['Inicio']['Modals'] && Object.values(userDB['Inicio']['Modals']).length > 0 && setUserModalsInterval(userDB, zoomIMG, setZoomIMG, setBgOpacity, 5000)

    }
    // const setUserModalsInterval = (time) => {
    //   console.log('interval')
    //   timer.current = setTimeout(() => {
    //     console.log(zoomIMG)
    //     if (Object.values(userDB['Inicio']['Modals'])[0]) {
    //       setZoomIMG(Object.values(userDB['Inicio']['Modals'])[getRandomInt(userDB['Inicio']['Modals'] && Object.values(userDB['Inicio']['Modals']).length)])
    //       setBgOpacity(true)
    //     }
    //   }, time)

    //   return () => {
    //     clearTimeout(timer.current)
    //   }
    // }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }








    return (
        <>
            <Layout>
                <div className={styles.main}>
                    <Header></Header>
                    <VideosSolicitados />
                    {showVideo === 'EdicionDigital' && <EdicionDigital></EdicionDigital>}
                </div>
            </Layout>
            <Temporizador />
        </>
    )
}

export default WithoutAuth(Home)
